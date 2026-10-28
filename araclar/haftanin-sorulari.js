#!/usr/bin/env node
/* =====================================================================
   HAFTANIN SORULARI — bakım aracı (Node)
   Veri: docs/assets/js/haftanin-sorulari.js  (MC.haftaninSorulari = {...};)

   Komutlar
     node araclar/haftanin-sorulari.js kontrol
         Bütün soruları denetler (kimlik, tarih, cevap, şekil, svg).
     node araclar/haftanin-sorulari.js ekle yeni.json
         yeni.json bir soru ya da soru dizisidir. Matematik sorusunda düz "cevap" alanı verilir;
         araç onu SHA-256 özetine çevirir ve düz cevabı dosyaya YAZMAZ. Sorular en üste eklenir.
     node araclar/haftanin-sorulari.js cozum <id> <cevap> cozum.html
         Cevap doğruysa (matematikte özet, geometride cevapMetin ile karşılaştırılır)
         çözümü ve açık cevabı yazar. Yanlışsa hiçbir şey yazmaz ve hata verir.
     node araclar/haftanin-sorulari.js svg [--hepsi]
         Geometri sorularının durağan çizimini Soru Masası'nın kendi çizicisiyle üretir
         (Playwright ile geometri sayfası açılır). Haftanın Soruları sayfası bu SVG'yi gösterir.
     node araclar/haftanin-sorulari.js ozet <id> <cevap>
         Bir matematik cevabının özetini yazdırır.
   ===================================================================== */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const KOK = path.join(__dirname, "..", "docs"), DOSYA = path.join(KOK, "assets/js/haftanin-sorulari.js");
const ONEK = "MC.haftaninSorulari = ";

function oku() {
  const s = fs.readFileSync(DOSYA, "utf8"), i = s.indexOf(ONEK);
  return { bas: s.slice(0, i + ONEK.length), veri: JSON.parse(s.slice(i + ONEK.length, s.lastIndexOf(";"))) };
}
function yaz(d) { fs.writeFileSync(DOSYA, d.bas + JSON.stringify(d.veri, null, 1) + ";\n"); }
const normal = (c) => String(c).trim().replace(/\s+/g, "").replace(",", ".").toLowerCase();
const ozet = (id, c) => crypto.createHash("sha256").update(`${id}|${normal(c)}`).digest("hex");
const tarihMi = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s));

function kontrol(veri, sessiz) {
  const hata = [], gorulen = new Set();
  for (const q of veri.sorular) {
    const k = q.id || "(kimliksiz)";
    if (!q.id) hata.push("kimliksiz soru");
    if (gorulen.has(q.id)) hata.push(`${k}: kimlik tekrar ediyor`); gorulen.add(q.id);
    if (!["matematik", "geometri"].includes(q.tur)) hata.push(`${k}: tur matematik ya da geometri olmalı`);
    for (const a of ["baslik", "metin", "baslangic", "cozumTarihi"]) if (!q[a]) hata.push(`${k}: ${a} eksik`);
    if (q.baslangic && !tarihMi(q.baslangic)) hata.push(`${k}: baslangic YYYY-AA-GG olmalı`);
    if (q.cozumTarihi && !tarihMi(q.cozumTarihi)) hata.push(`${k}: cozumTarihi YYYY-AA-GG olmalı`);
    if (!Array.isArray(q.ipuclari)) hata.push(`${k}: ipuclari dizi olmalı`);
    if (q.tur === "matematik") {
      if (!/^[0-9a-f]{64}$/.test(q.cevapOzet || "")) hata.push(`${k}: cevapOzet eksik`);
      if ("cevap" in q) hata.push(`${k}: düz "cevap" alanı yayımlanmamalı`);
      if (q.cevapAcik != null && ozet(q.id, q.cevapAcik) !== q.cevapOzet) hata.push(`${k}: cevapAcik özetle uyuşmuyor`);
    } else if (q.tur === "geometri") {
      if (!q.cevapMetin) hata.push(`${k}: cevapMetin eksik`);
      if (!q.sekil || !Array.isArray(q.sekil.nesne)) hata.push(`${k}: sekil.nesne eksik`);
      if (!q.svg) hata.push(`${k}: svg yok (node araclar/haftanin-sorulari.js svg)`);
    }
    if (q.cozum && q.cevapAcik == null) hata.push(`${k}: çözüm var ama cevapAcik yok`);
  }
  for (let i = 1; i < veri.sorular.length; i++) if (veri.sorular[i - 1].baslangic < veri.sorular[i].baslangic) hata.push(`sıra: ${veri.sorular[i - 1].id} yeniden eskiye dizilmeli`);
  if (!sessiz) console.log(hata.length ? "SORUNLAR:\n- " + hata.join("\n- ") : `Tamam: ${veri.sorular.length} soru, sorun yok.`);
  return hata;
}

async function svgUret(hepsi) {
  const d = oku(), hedef = d.veri.sorular.filter((q) => q.tur === "geometri" && (hepsi || !q.svg));
  if (!hedef.length) { console.log("Üretilecek SVG yok."); return; }
  const http = require("http"), { chromium } = require("playwright");
  const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png" };
  const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html"; const f = path.join(KOK, p); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" }); r.end(b); }); });
  await new Promise((ok) => srv.listen(0, ok));
  const b = await chromium.launch(), s = await b.newPage();
  await s.goto(`http://localhost:${srv.address().port}/geometri/#cizim`); await s.waitForFunction(() => window.MC && MC.geoSoru);
  for (const q of hedef) {
    q.svg = await s.evaluate((x) => MC.geoSoru.statikSvg({ ...x.sekil, metin: x.metin, baslik: x.baslik, birim: x.birim }), q);
    console.log("SVG üretildi:", q.id);
  }
  await b.close(); srv.close(); yaz(d);
}

(async () => {
  const [kmt, ...a] = process.argv.slice(2);
  if (kmt === "kontrol") { process.exitCode = kontrol(oku().veri).length ? 1 : 0; }
  else if (kmt === "ozet") console.log(ozet(a[0], a[1]));
  else if (kmt === "ekle") {
    const d = oku(); let yeni = JSON.parse(fs.readFileSync(a[0], "utf8")); if (!Array.isArray(yeni)) yeni = [yeni];
    for (const q of yeni) {
      if (d.veri.sorular.some((x) => x.id === q.id)) throw new Error(`${q.id} zaten var`);
      if (q.tur === "matematik") { if (q.cevap == null) throw new Error(`${q.id}: matematik sorusunda "cevap" gerekli`); q.cevapOzet = ozet(q.id, q.cevap); delete q.cevap; }
      q.cozum = q.cozum || null; q.cevapAcik = null;
    }
    d.veri.sorular = [...yeni, ...d.veri.sorular].sort((x, y) => (x.baslangic < y.baslangic ? 1 : x.baslangic > y.baslangic ? -1 : 0));
    yaz(d); console.log("Eklendi:", yeni.map((q) => q.id).join(", "));
  } else if (kmt === "cozum") {
    const [id, cevap, dosya] = a, d = oku(), q = d.veri.sorular.find((x) => x.id === id);
    if (!q) throw new Error(`${id} bulunamadı`);
    const dogru = q.tur === "matematik" ? ozet(id, cevap) === q.cevapOzet : normal(cevap) === normal(q.cevapMetin);
    if (!dogru) { console.error(`HATA: ${id} için "${cevap}" kayıtlı cevapla uyuşmuyor. Çözüm yazılmadı.`); process.exit(2); }
    q.cozum = fs.readFileSync(dosya, "utf8").trim(); q.cevapAcik = String(cevap).trim(); yaz(d); console.log("Çözüm yazıldı:", id);
  } else if (kmt === "svg") await svgUret(a.includes("--hepsi"));
  else console.log(fs.readFileSync(__filename, "utf8").split("\n").slice(1, 22).join("\n"));
})().catch((e) => { console.error(e.message); process.exit(1); });
