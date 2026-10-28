-- =====================================================================
-- ÇÖZÜM STÜDYOSU — soru arşivi (yalnızca yönetici öğretmen okur ve yazar)
-- Kurulum: Supabase → SQL Editor → bu dosyanın tamamını yapıştır → Run.
-- kurulum.sql daha önce çalıştırılmış olmalı (yonetici_mi() fonksiyonu oradan gelir).
-- Bu dosyayı birden çok kez çalıştırmak güvenlidir.
-- =====================================================================

create table if not exists public.studyo_sorular (
  id         text primary key,
  baslik     text not null default '',
  cevap      text not null default '',
  etiket     text[] not null default '{}',
  veri       jsonb not null,
  sahip      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  olusturma  timestamptz not null default now(),
  guncelleme timestamptz not null default now()
);
create index if not exists studyo_sorular_guncelleme_idx on public.studyo_sorular (guncelleme desc);

create or replace function public.studyo_guncelleme() returns trigger
language plpgsql as $$ begin new.guncelleme := now(); return new; end $$;
drop trigger if exists studyo_sorular_guncelleme on public.studyo_sorular;
create trigger studyo_sorular_guncelleme before update on public.studyo_sorular
  for each row execute function public.studyo_guncelleme();

-- Güvenlik: satır düzeyi erişim. Herkese açık anahtar bu tabloyu göremez;
-- yalnızca yöneticiler tablosundaki hesap okur, yazar ve siler.
alter table public.studyo_sorular enable row level security;
drop policy if exists "yonetici studyo" on public.studyo_sorular;
create policy "yonetici studyo" on public.studyo_sorular for all to authenticated
  using (public.yonetici_mi()) with check (public.yonetici_mi());

revoke all on public.studyo_sorular from anon;
grant select, insert, update, delete on public.studyo_sorular to authenticated;
