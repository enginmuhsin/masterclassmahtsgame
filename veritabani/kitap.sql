-- =====================================================================
-- KİTAP HAKEM PANELİ — geometri soru kitabı içeriği, hakemler ve görüşler
-- Kurulum: Supabase → SQL Editor → bu dosyanın tamamını yapıştır → Run.
-- kurulum.sql daha önce çalıştırılmış olmalı (yonetici_mi() oradan gelir).
-- Birden çok kez çalıştırmak güvenlidir.
--
-- Kim ne görür?
--   Yönetici (sen)  : her şeyi görür ve yazar; hakem ekler/çıkarır; içerik yükler.
--   Hakem           : e-postası kitap_hakemler listesinde ve aktifse içeriği görür,
--                     görüş yazar, yalnızca kendi görüşünü değiştirir/siler.
--   Diğer herkes    : hiçbir şey görmez (anon anahtar bu tablolara erişemez).
-- =====================================================================

-- 1) Tablolar
create table if not exists public.kitap_hakemler (
  eposta    text primary key check (eposta = lower(eposta)),
  ad        text not null default '',
  aktif     boolean not null default true,
  eklenme   timestamptz not null default now()
);

create table if not exists public.kitap_icerik (
  id         text primary key,
  tur        text not null check (tur in ('bolum', 'soru')),
  bolum      text not null,
  sira       int  not null default 0,
  veri       jsonb not null,
  durum      text not null default 'incelemede' check (durum in ('taslak', 'incelemede', 'onaylandi', 'duzeltilecek', 'cikarildi')),
  guncelleme timestamptz not null default now()
);
create index if not exists kitap_icerik_bolum_idx on public.kitap_icerik (bolum, tur, sira);

create table if not exists public.kitap_gorusler (
  id         bigint generated always as identity primary key,
  icerik_id  text not null references public.kitap_icerik(id) on delete cascade,
  yazar      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  yazar_ad   text not null default '',
  karar      text not null check (karar in ('onay', 'duzelt', 'cikar', 'yorum')),
  cevap      text not null default '',
  metin      text not null default '' check (length(metin) <= 4000),
  olusturma  timestamptz not null default now()
);
create index if not exists kitap_gorusler_icerik_idx on public.kitap_gorusler (icerik_id, olusturma);

-- 2) Yetki: 'yonetici' | 'hakem' | null
create or replace function public.kitap_yetki() returns text
language sql stable security definer set search_path = public as $$
  select case
    when public.yonetici_mi() then 'yonetici'
    when exists (select 1 from public.kitap_hakemler h
                 where h.aktif and h.eposta = lower(coalesce(auth.jwt() ->> 'email', ''))) then 'hakem'
    else null end;
$$;

create or replace function public.kitap_guncelleme() returns trigger
language plpgsql as $$ begin new.guncelleme := now(); return new; end $$;
drop trigger if exists kitap_icerik_guncelleme on public.kitap_icerik;
create trigger kitap_icerik_guncelleme before update on public.kitap_icerik
  for each row execute function public.kitap_guncelleme();

-- Görüş yazarının adını sunucu doldurur (hakem listesindeki ad ya da e-posta)
create or replace function public.kitap_gorus_ad() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.yazar := auth.uid();
  new.yazar_ad := coalesce(nullif((select ad from public.kitap_hakemler where eposta = lower(auth.jwt() ->> 'email')), ''),
                           case when public.yonetici_mi() then 'Yazar' else auth.jwt() ->> 'email' end);
  return new;
end $$;
drop trigger if exists kitap_gorus_ad on public.kitap_gorusler;
create trigger kitap_gorus_ad before insert on public.kitap_gorusler
  for each row execute function public.kitap_gorus_ad();

-- 3) Satır düzeyi güvenlik
alter table public.kitap_hakemler enable row level security;
alter table public.kitap_icerik   enable row level security;
alter table public.kitap_gorusler enable row level security;

drop policy if exists "yonetici hakemler" on public.kitap_hakemler;
create policy "yonetici hakemler" on public.kitap_hakemler for all to authenticated
  using (public.yonetici_mi()) with check (public.yonetici_mi());

drop policy if exists "yetkili okur icerik" on public.kitap_icerik;
create policy "yetkili okur icerik" on public.kitap_icerik for select to authenticated
  using (public.kitap_yetki() is not null);
drop policy if exists "yonetici yazar icerik" on public.kitap_icerik;
create policy "yonetici yazar icerik" on public.kitap_icerik for all to authenticated
  using (public.yonetici_mi()) with check (public.yonetici_mi());

drop policy if exists "yetkili okur gorus" on public.kitap_gorusler;
create policy "yetkili okur gorus" on public.kitap_gorusler for select to authenticated
  using (public.kitap_yetki() is not null);
drop policy if exists "yetkili yazar gorus" on public.kitap_gorusler;
create policy "yetkili yazar gorus" on public.kitap_gorusler for insert to authenticated
  with check (public.kitap_yetki() is not null);
drop policy if exists "kendi gorusu" on public.kitap_gorusler;
create policy "kendi gorusu" on public.kitap_gorusler for delete to authenticated
  using (yazar = auth.uid() or public.yonetici_mi());

revoke all on public.kitap_hakemler, public.kitap_icerik, public.kitap_gorusler from anon;
grant select, insert, update, delete on public.kitap_hakemler, public.kitap_icerik to authenticated;
grant select, insert, delete on public.kitap_gorusler to authenticated;
revoke all on function public.kitap_yetki() from public;
grant execute on function public.kitap_yetki() to authenticated;
