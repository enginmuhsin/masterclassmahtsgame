# Master Class: Sayılar ve DNA'ları

Öğrencilerin sayıları sevmesi ve sayıların gizemli dünyasını keşfetmesi için hazırlanmış oyunlaştırılmış eğitim materyali. TÜBİTAK 2204-A projesi (Matematik · Algoritma Tasarımı ve Uygulamaları).

## Web sitesi

**https://enginmuhsin.github.io/masterclassmahtsgame/**

Site `docs/` klasöründen GitHub Pages ile ücretsiz yayınlanır. Bir kez açıldıktan sonra internetsiz de çalışır; akıllı tahtada “uygulama olarak yükle” seçeneğiyle kurulabilir.

| Bölüm | İçerik |
| --- | --- |
| Oyun Arenası | Sayı Avı (tek oyuncu / takım), Sayı Izgarası, Sayı Bilmecesi |
| Fonksiyon Yarışı | İki fonksiyonun engel kırma yarışı, ilkokuldan liseye 16 etkinlik |
| Sayı Dedektörü | 10¹⁹'a kadar her sayı: çarpan ağacı, algoritma izi, 3B bölen küpü, EBOB–EKOK |
| Formula Sprint | 11 konuda dokunmatik hız yarışı |
| Görsel Laboratuvar | Bölen dağları (3B), Ulam spirali, Eratosthenes kalburu, (a+b)³ küpü, Fibonacci, Collatz, π(x) |
| Bilgi Köşesi | Tanımlar, ispatlar, kavram yanılgıları, açık problemler, algoritmalar |
| **Geometri Atölyesi** (`geometri/`) | Cetvel-pergel Çizim Masası ve 5 Öklid görevi (otomatik denetim), Üçgen Laboratuvarı (4 merkez, Euler doğrusu, dokuz nokta çemberi), katlanıp açılan 3B cisimler, **Soru Masası** (görselin üzerinden şekil kurma, verilere uydurma, öğrenci çözüm kipi, bağlantıyla paylaşım) |

## Sıralama tablosu, ziyaret sayacı ve öğretmen paneli

- Öğrenci **takma ad** ve isteğe bağlı **sınıf kodu** ile skor gönderir; ad-soyad, e-posta, IP adresi alınmaz.
- Her oyunun ve yarış türünün ayrı tablosu vardır (Sayı Avı: zorluk × süre, Formula Sprint: süre, Sayı Izgarası, Sayı Bilmecesi, Fonksiyon Yarışı, Öklid Görevleri).
- `yonetim.html` öğretmen paneli: onay, ret, takma ad / puan düzeltme, silme, otomatik onay, kayıt açma-kapama, yasaklı kelimeler, CSV indirme, günlük ziyaret grafiği.
- Altyapı: Supabase (ücretsiz katman). Kurulum: `veritabani/kurulum.sql` dosyasını SQL Editor'da çalıştır, adres ve publishable anahtarı `docs/assets/js/bulut-ayar.js` dosyasına yaz. Bu dosya boşken sıralama ve sayaç gizli kalır.

## İnternetsiz kullanım (akıllı tahta)

`docs` klasörünün tamamını tahtaya kopyalayıp `index.html` dosyasını tarayıcıyla açmak yeterlidir. Tüm kütüphaneler ve yazı tipleri klasörün içindedir.

## Klasör yapısı

```
docs/                      → web sitesi (GitHub Pages)
  index.html               → ana sayfa ve tüm bölümler
  fonksiyon-yarisi.html    → Fonksiyon Yarışı oyunu
  assets/js/               → cekirdek.js (sayı kuramı), oyunlar.js, dedektor.js, sprint.js, laboratuvar.js, bilgi.js …
  assets/css/              → site.css, fonts.css
  assets/kutuphane/        → three.js, GSAP, KaTeX (yerel kopyalar)
  yonetim.html             → öğretmen paneli (sıralama yönetimi)
veritabani/kurulum.sql     → Supabase tabloları, güvenlik kuralları ve fonksiyonları
  assets/fonts/            → yazı tipleri (OFL lisanslı)
oyun.py.py                 → önceki Streamlit sürümü (Streamlit Cloud'da çalışmaya devam eder)
```

## Algoritmalar

- n ≤ 10¹²: 6k ± 1 deneme bölmesi, √n'de durma — O(√n)
- n ≤ 10¹⁹: deterministik Miller–Rabin (12 taban) + Pollard–Brent rho
- Eratosthenes kalburu, Öklid algoritması, iki işaretçili Ramanujan testi, 5n² ± 4 Fibonacci testi
