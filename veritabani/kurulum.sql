-- =====================================================================
--  MASTER CLASS · Sıralama tablosu, ziyaret sayacı ve yönetici paneli
--  Supabase → SQL Editor → bu dosyanın TAMAMINI yapıştır → Run
--  Dosya tekrar çalıştırılabilir: var olan veriyi silmez, yalnızca günceller.
--
--  Kişisel veri ilkesi (KVKK): öğrenciden ad-soyad, e-posta, telefon ya da
--  IP adresi ALINMAZ. Yalnızca takma ad, isteğe bağlı sınıf kodu ve puan
--  saklanır. Ziyaret sayacı yalnızca günlük toplam sayıları tutar.
-- =====================================================================

-- ---------- 1) Tablolar ----------
create table if not exists public.oyun_turleri (
  id          text primary key,
  ad          text not null,
  varyantlar  text[] not null,          -- izin verilen yarış türleri (zorluk, süre …)
  puan_min    int  not null,
  puan_max    int  not null,
  ikincil_ad  text,                     -- eşitlik bozucu (küçük olan önde): yanlış sayısı, adım …
  sira        int  not null default 0
);

insert into public.oyun_turleri (id, ad, varyantlar, puan_min, puan_max, ikincil_ad, sira) values
  ('sayi-avi', 'Sayı Avı',
     array['kolay-60','kolay-90','kolay-120','orta-60','orta-90','orta-120','uzman-60','uzman-90','uzman-120'],
     -10000, 10000, 'Yanlış', 1),
  ('formula-sprint', 'Formula Sprint', array['60','90','120'], -3000, 6000, 'Yanlış', 2),
  ('sayi-izgarasi', 'Sayı Izgarası', array['200','2000'], -3000, 3000, null, 3),
  ('sayi-bilmecesi', 'Sayı Bilmecesi', array['5-tur'], 0, 300, null, 4),
  ('fonksiyon-yarisi', 'Fonksiyon Yarışı', array['tahmin'], 0, 15, 'Deneme', 5),
  ('oklid', 'Öklid Görevleri', array['toplam'], 0, 15, 'Adım', 6)
on conflict (id) do update set ad = excluded.ad, varyantlar = excluded.varyantlar,
  puan_min = excluded.puan_min, puan_max = excluded.puan_max, ikincil_ad = excluded.ikincil_ad, sira = excluded.sira;

create table if not exists public.skorlar (
  id          bigint generated always as identity primary key,
  oyun        text not null references public.oyun_turleri(id) on delete cascade,
  varyant     text not null default '',
  takma_ad    text not null check (char_length(takma_ad) between 2 and 20),
  sinif       text not null default '' check (char_length(sinif) <= 16),
  puan        int  not null,
  ikincil     int,
  ayrinti     jsonb not null default '{}'::jsonb check (pg_column_size(ayrinti) < 2000),
  durum       text not null default 'bekliyor' check (durum in ('bekliyor','onayli','reddedildi')),
  cihaz       text not null default '' check (char_length(cihaz) <= 40),  -- rastgele cihaz numarası, kişisel veri değil
  not_        text not null default '',                                     -- yöneticinin notu
  olusturma   timestamptz not null default now(),
  duzenleme   timestamptz
);
create index if not exists skorlar_tablo_idx on public.skorlar (oyun, varyant, durum, puan desc);
create index if not exists skorlar_durum_idx on public.skorlar (durum, olusturma desc);
create index if not exists skorlar_cihaz_idx on public.skorlar (cihaz, olusturma desc);

create table if not exists public.ziyaretler (
  gun           date not null,
  sayfa         text not null,
  ziyaret       int  not null default 0,   -- o gün siteye ilk kez giren tarayıcı sayısı
  goruntulenme  int  not null default 0,   -- açılan bölüm sayısı
  primary key (gun, sayfa)
);

create table if not exists public.ayarlar (
  id             int primary key default 1 check (id = 1),
  otomatik_onay  boolean not null default false,  -- false: her skor önce yönetici onayına düşer
  kayit_acik     boolean not null default true    -- false: yeni skor kabul edilmez (sınav, tatil …)
);
insert into public.ayarlar (id) values (1) on conflict (id) do nothing;

create table if not exists public.yasakli_kelimeler (
  kelime text primary key check (char_length(kelime) between 2 and 30)
);

create table if not exists public.yoneticiler (
  user_id  uuid primary key references auth.users(id) on delete cascade,
  eklenme  timestamptz not null default now()
);

-- ---------- 2) Yardımcı fonksiyonlar ----------
create or replace function public.yonetici_mi() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.yoneticiler where user_id = auth.uid());
$$;

-- Türkçe harfleri sadeleştirir: "Kötü.Adam" → "kotuadam" (yasaklı kelime denetimi için)
create or replace function public.sade(x text) returns text
language sql immutable set search_path = public as $$
  select regexp_replace(translate(lower(coalesce(x, '')), 'çğıİöşüâîû', 'cgiiosuaiu'), '[^a-z0-9]', '', 'g');
$$;

create or replace function public.duzenleme_zamani() returns trigger
language plpgsql as $$ begin new.duzenleme := now(); return new; end $$;
drop trigger if exists skorlar_duzenleme on public.skorlar;
create trigger skorlar_duzenleme before update on public.skorlar
  for each row execute function public.duzenleme_zamani();

-- ---------- 3) Öğrencinin kullandığı fonksiyonlar (giriş gerekmez) ----------
create or replace function public.skor_gonder(
  p_oyun text, p_varyant text, p_takma_ad text, p_sinif text,
  p_puan int, p_ikincil int default null, p_ayrinti jsonb default '{}'::jsonb, p_cihaz text default ''
) returns json
language plpgsql security definer set search_path = public as $$
declare
  t public.oyun_turleri; a public.ayarlar; ad text; sn text; d text; yeni_id bigint; s int; onceki int; en_iyi int;
begin
  select * into a from public.ayarlar where id = 1;
  if not a.kayit_acik then raise exception 'kayit_kapali'; end if;

  select * into t from public.oyun_turleri where id = p_oyun;
  if not found then raise exception 'oyun_yok'; end if;
  if not (coalesce(p_varyant, '') = any (t.varyantlar)) then raise exception 'varyant_yok'; end if;
  if p_puan is null or p_puan < t.puan_min or p_puan > t.puan_max then raise exception 'puan_gecersiz'; end if;
  if p_ikincil is not null and (p_ikincil < 0 or p_ikincil > 100000) then raise exception 'puan_gecersiz'; end if;

  ad := regexp_replace(btrim(coalesce(p_takma_ad, '')), '\s+', ' ', 'g');
  if ad !~ '^[A-Za-z0-9ÇĞİÖŞÜçğıöşüÂâÎîÛû _.-]{2,20}$' then raise exception 'ad_gecersiz'; end if;
  sn := upper(replace(btrim(coalesce(p_sinif, '')), ' ', ''));
  sn := translate(sn, 'çğıöşü', 'ÇĞIÖŞÜ');
  if sn !~ '^[A-Z0-9ÇĞİÖŞÜ-]{0,16}$' then raise exception 'sinif_gecersiz'; end if;

  -- Hız sınırı: aynı cihazdan 15 saniyede bir, saatte en fazla 60 gönderim
  if exists (select 1 from public.skorlar where cihaz = coalesce(p_cihaz, '') and p_cihaz <> ''
             and olusturma > now() - interval '15 seconds') then raise exception 'cok_hizli'; end if;
  if (select count(*) from public.skorlar where cihaz = coalesce(p_cihaz, '') and p_cihaz <> ''
      and olusturma > now() - interval '1 hour') >= 60 then raise exception 'cok_hizli'; end if;
  if (select count(*) from public.skorlar where olusturma > now() - interval '1 minute') >= 300 then raise exception 'cok_hizli'; end if;
  if (select count(*) from public.skorlar where durum = 'bekliyor') >= 5000 then raise exception 'kuyruk_dolu'; end if;

  d := case when a.otomatik_onay then 'onayli' else 'bekliyor' end;
  if exists (select 1 from public.yasakli_kelimeler k where position(public.sade(k.kelime) in public.sade(ad)) > 0) then d := 'bekliyor'; end if;

  insert into public.skorlar (oyun, varyant, takma_ad, sinif, puan, ikincil, ayrinti, durum, cihaz)
  values (p_oyun, p_varyant, ad, sn, p_puan, p_ikincil, coalesce(p_ayrinti, '{}'::jsonb), d, left(coalesce(p_cihaz, ''), 40))
  returning id into yeni_id;

  -- Bu takma adın en iyi puanı onaylı tabloda kaçıncı sırada? (her takma ad en iyi skoruyla bir kez)
  select max(puan) into onceki from public.skorlar
   where oyun = p_oyun and varyant = p_varyant and durum = 'onayli' and id <> yeni_id
     and lower(takma_ad) = lower(ad) and sinif = sn;
  en_iyi := greatest(p_puan, coalesce(onceki, p_puan));
  select count(*) + 1 into s from (
    select lower(takma_ad), sinif, max(puan) as p from public.skorlar
    where oyun = p_oyun and varyant = p_varyant and durum = 'onayli' and id <> yeni_id
      and not (lower(takma_ad) = lower(ad) and sinif = sn)
    group by 1, 2) x
  where x.p > en_iyi;

  return json_build_object('id', yeni_id, 'durum', d, 'sira', s, 'takma_ad', ad, 'sinif', sn,
                           'rekor', onceki is null or p_puan > onceki, 'en_iyi', en_iyi);
end $$;

create or replace function public.siralama_getir(
  p_oyun text, p_varyant text, p_sinif text default '', p_gun int default null, p_limit int default 20
) returns table (sira int, takma_ad text, sinif text, puan int, ikincil int, tarih date)
language sql stable security definer set search_path = public as $$
  with en_iyi as (
    select distinct on (lower(s.takma_ad), s.sinif) s.takma_ad, s.sinif, s.puan, s.ikincil, s.olusturma
    from public.skorlar s
    where s.oyun = p_oyun and s.varyant = p_varyant and s.durum = 'onayli'
      and (coalesce(p_sinif, '') = '' or s.sinif = upper(p_sinif))
      and (p_gun is null or s.olusturma > now() - make_interval(days => p_gun))
    order by lower(s.takma_ad), s.sinif, s.puan desc, s.ikincil asc nulls last, s.olusturma asc
  )
  select (row_number() over (order by puan desc, ikincil asc nulls last, olusturma asc))::int,
         takma_ad, sinif, puan, ikincil, (olusturma at time zone 'Europe/Istanbul')::date
  from en_iyi
  order by 1
  limit least(greatest(coalesce(p_limit, 20), 1), 100);
$$;

create or replace function public.ziyaret_kaydet(p_sayfa text, p_yeni boolean default false) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_sayfa is null or p_sayfa !~ '^[a-z0-9-]{1,30}$' then return; end if;
  insert into public.ziyaretler (gun, sayfa, ziyaret, goruntulenme)
  values ((now() at time zone 'Europe/Istanbul')::date, p_sayfa, case when p_yeni then 1 else 0 end, 1)
  on conflict (gun, sayfa) do update
    set ziyaret = public.ziyaretler.ziyaret + excluded.ziyaret,
        goruntulenme = public.ziyaretler.goruntulenme + 1;
end $$;

create or replace function public.ziyaret_ozet() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'bugun_ziyaret', coalesce(sum(ziyaret) filter (where gun = (now() at time zone 'Europe/Istanbul')::date), 0),
    'bugun_goruntulenme', coalesce(sum(goruntulenme) filter (where gun = (now() at time zone 'Europe/Istanbul')::date), 0),
    'toplam_ziyaret', coalesce(sum(ziyaret), 0),
    'toplam_goruntulenme', coalesce(sum(goruntulenme), 0))
  from public.ziyaretler;
$$;

-- ---------- 4) Yönetici fonksiyonları ----------
-- Hiç yönetici yoksa giriş yapan ilk kullanıcıyı yönetici yapar. Sonra kapanır.
create or replace function public.ilk_yonetici() returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'giris_gerekli'; end if;
  if not exists (select 1 from public.yoneticiler) then
    insert into public.yoneticiler (user_id) values (auth.uid());
  end if;
  return public.yonetici_mi();
end $$;

create or replace function public.yonetici_durum() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object('yonetici', public.yonetici_mi(),
                           'yonetici_var', exists (select 1 from public.yoneticiler),
                           'bekleyen', case when public.yonetici_mi()
                              then (select count(*) from public.skorlar where durum = 'bekliyor') end);
$$;

-- ---------- 5) Güvenlik: satır düzeyi erişim (RLS) ----------
alter table public.oyun_turleri      enable row level security;
alter table public.skorlar           enable row level security;
alter table public.ziyaretler        enable row level security;
alter table public.ayarlar           enable row level security;
alter table public.yasakli_kelimeler enable row level security;
alter table public.yoneticiler       enable row level security;

drop policy if exists "herkes okur" on public.oyun_turleri;
create policy "herkes okur" on public.oyun_turleri for select to anon, authenticated using (true);
drop policy if exists "yonetici skor" on public.skorlar;
create policy "yonetici skor" on public.skorlar for all to authenticated using (public.yonetici_mi()) with check (public.yonetici_mi());
drop policy if exists "yonetici ziyaret" on public.ziyaretler;
create policy "yonetici ziyaret" on public.ziyaretler for select to authenticated using (public.yonetici_mi());
drop policy if exists "yonetici ayar" on public.ayarlar;
create policy "yonetici ayar" on public.ayarlar for all to authenticated using (public.yonetici_mi()) with check (public.yonetici_mi());
drop policy if exists "yonetici kelime" on public.yasakli_kelimeler;
create policy "yonetici kelime" on public.yasakli_kelimeler for all to authenticated using (public.yonetici_mi()) with check (public.yonetici_mi());
drop policy if exists "yonetici liste" on public.yoneticiler;
create policy "yonetici liste" on public.yoneticiler for select to authenticated using (public.yonetici_mi());

-- Öğrenci tablolara doğrudan dokunamaz; yalnızca yukarıdaki fonksiyonları çağırabilir.
revoke all on public.skorlar, public.ziyaretler, public.ayarlar, public.yasakli_kelimeler, public.yoneticiler from anon;
grant usage on schema public to anon, authenticated;
grant select on public.oyun_turleri to anon, authenticated;
grant select, update, delete on public.skorlar to authenticated;
grant select on public.ziyaretler, public.yoneticiler to authenticated;
grant select, update on public.ayarlar to authenticated;
grant select, insert, delete on public.yasakli_kelimeler to authenticated;

revoke all on function public.skor_gonder(text, text, text, text, int, int, jsonb, text) from public;
revoke all on function public.siralama_getir(text, text, text, int, int) from public;
revoke all on function public.ziyaret_kaydet(text, boolean) from public;
revoke all on function public.ziyaret_ozet() from public;
revoke all on function public.ilk_yonetici() from public;
revoke all on function public.yonetici_durum() from public;
revoke all on function public.yonetici_mi() from public;
grant execute on function public.sade(text) to anon, authenticated;
grant execute on function public.skor_gonder(text, text, text, text, int, int, jsonb, text) to anon, authenticated;
grant execute on function public.siralama_getir(text, text, text, int, int) to anon, authenticated;
grant execute on function public.ziyaret_kaydet(text, boolean) to anon, authenticated;
grant execute on function public.ziyaret_ozet() to anon, authenticated;
grant execute on function public.ilk_yonetici() to authenticated;
grant execute on function public.yonetici_durum() to authenticated;
grant execute on function public.yonetici_mi() to authenticated;

notify pgrst, 'reload schema';
-- Bitti. "Success. No rows returned" yazısını görmen yeterli.
