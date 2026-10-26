/* Çevrimdışı önbellek: site bir kez açıldıktan sonra internetsiz de çalışır.
   Yeni sürüm yayınlanınca SURUM değiştirilir; eski önbellek silinir. */
const SURUM = "mc-v2";
const DOSYALAR = [
  "./",
  "./assets/css/fonts.css",
  "./assets/css/site.css",
  "./assets/fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./assets/fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./assets/fonts/atkinson-hyperlegible-latin-ext-400-normal.woff2",
  "./assets/fonts/atkinson-hyperlegible-latin-ext-700-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-500-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-700-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-800-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-ext-500-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-ext-700-normal.woff2",
  "./assets/fonts/bricolage-grotesque-latin-ext-800-normal.woff2",
  "./assets/fonts/jetbrains-mono-latin-500-normal.woff2",
  "./assets/fonts/jetbrains-mono-latin-700-normal.woff2",
  "./assets/fonts/jetbrains-mono-latin-ext-500-normal.woff2",
  "./assets/fonts/jetbrains-mono-latin-ext-700-normal.woff2",
  "./assets/fonts/onest-latin-400-normal.woff2",
  "./assets/fonts/onest-latin-500-normal.woff2",
  "./assets/fonts/onest-latin-600-normal.woff2",
  "./assets/fonts/onest-latin-700-normal.woff2",
  "./assets/fonts/onest-latin-ext-400-normal.woff2",
  "./assets/fonts/onest-latin-ext-500-normal.woff2",
  "./assets/fonts/onest-latin-ext-600-normal.woff2",
  "./assets/fonts/onest-latin-ext-700-normal.woff2",
  "./assets/fonts/unbounded-latin-500-normal.woff2",
  "./assets/fonts/unbounded-latin-700-normal.woff2",
  "./assets/fonts/unbounded-latin-900-normal.woff2",
  "./assets/fonts/unbounded-latin-ext-500-normal.woff2",
  "./assets/fonts/unbounded-latin-ext-700-normal.woff2",
  "./assets/fonts/unbounded-latin-ext-900-normal.woff2",
  "./assets/img/simge.svg",
  "./assets/js/ana.js",
  "./assets/js/arayuz.js",
  "./assets/js/bilgi.js",
  "./assets/js/cekirdek.js",
  "./assets/js/dedektor.js",
  "./assets/js/fonksiyon.js",
  "./assets/js/grafik.js",
  "./assets/js/laboratuvar.js",
  "./assets/js/oyunlar.js",
  "./assets/js/sahne3d.js",
  "./assets/js/ses.js",
  "./assets/js/sprint.js",
  "./assets/kutuphane/gsap.min.js",
  "./assets/kutuphane/katex.min.js",
  "./assets/kutuphane/katex/auto-render.min.js",
  "./assets/kutuphane/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Main-Bold.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Main-Italic.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Main-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Math-Italic.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Script-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./assets/kutuphane/katex/fonts/KaTeX_Typewriter-Regular.woff2",
  "./assets/kutuphane/katex/katex.min.css",
  "./assets/kutuphane/three.min.js",
  "./fonksiyon-yarisi.html",
  "./index.html",
  "./manifest.webmanifest"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SURUM).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== SURUM).map((x) => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then((yanit) => {
      const kopya = yanit.clone();
      caches.open(SURUM).then((c) => c.put(e.request, kopya)).catch(() => {});
      return yanit;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./index.html")))
  );
});
