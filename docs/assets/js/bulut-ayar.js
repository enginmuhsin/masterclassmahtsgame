/* =====================================================================
   BULUT BAĞLANTISI (Supabase) — sıralama tablosu ve ziyaret sayacı.
   Supabase → Project Settings → API (Data API) sayfasından iki değeri kopyala:
     url     : Project URL           örn. "https://abcdefgh.supabase.co"
     anahtar : publishable (ya da anon public) anahtar
   Bu anahtar herkese açık olacak şekilde tasarlanmıştır; güvenliği veritabanındaki
   kurallar (veritabani/kurulum.sql) sağlar. "secret" ya da "service_role" anahtarını
   ASLA buraya yazma.
   İkisi de boş kalırsa site normal çalışır; yalnızca sıralama ve sayaç gizlenir.
   ===================================================================== */
window.MC_BULUT = {
  url: "",
  anahtar: "",
};
