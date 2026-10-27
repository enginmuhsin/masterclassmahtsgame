/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — ETKİLEŞİMLİ ETKİNLİKLER (1)
   Sayılar: sanılar laboratuvarı, özdeşliklerin görsel ispatı, bölen ızgarası,
   çokgensel sayılar, sayı sistemleri, eski çarpma yöntemleri, Hanoi kulesi.
   Her etkinlik MC.bilsemEtkinlik[id] = { ad, kur(el) } olarak kaydolur;
   kur() bir temizleme fonksiyonu döndürebilir (animasyonları durdurmak için).
   Etkinlikteki sayı, zorluk ve senaryo düğmeleri öğretmenin çeşitlendirme aracıdır.
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemEtkinlik = MC.bilsemEtkinlik || {};
(function (E) {
  const U = MC.ui, S = MC.sayi, Ses = MC.Ses;
  const RENK = { metin: "#eef3ff", soluk: "#9db0d6", cizgi: "rgba(150,180,255,.22)", kirmizi: "#ff4d61", turkuaz: "#35e0b0", altin: "#ffc657", mavi: "#5b8cff", mor: "#a66bff", turuncu: "#ff8a1f", zemin: "#081227" };

  /* ---------- Ortak yardımcılar ---------- */
  const Y = (MC.bilsemYardim = {
    RENK,
    vurgu(el) { return getComputedStyle(el).getPropertyValue("--renk").trim() || RENK.altin; },
    /* Kabın genişliğine oturan, yüksek çözünürlüklü tuval. ciz(g, W, H) her boyut değişiminde çağrılır. */
    tuval(kap, oran, ciz) {
      const cv = document.createElement("canvas"); cv.className = "e-tuval"; kap.appendChild(cv);
      const g = cv.getContext("2d"); const t = { cv, g, W: 0, H: 0 };
      t.boyut = () => {
        const w = Math.max(240, kap.clientWidth), h = Math.round(Math.min(Math.max(240, w * oran), innerHeight * (document.fullscreenElement ? .78 : .66)));
        const d = Math.min(devicePixelRatio || 1, 2); cv.width = w * d; cv.height = h * d; cv.style.height = h + "px"; g.setTransform(d, 0, 0, d, 0, 0); t.W = w; t.H = h;
        ciz && ciz(g, w, h);
      };
      t.ro = new ResizeObserver(() => t.boyut()); t.ro.observe(kap);
      return t;
    },
    yazi(g, s, x, y, { boyut = 14, renk = RENK.metin, hiza = "left", kalin = 600, aile = "Onest, system-ui, sans-serif", taban = "alphabetic" } = {}) {
      g.font = `${kalin} ${boyut}px ${aile}`; g.fillStyle = renk; g.textAlign = hiza; g.textBaseline = taban; g.fillText(s, x, y);
    },
    eksen(g, x0, y0, x1, y1) { g.strokeStyle = RENK.cizgi; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0, y1); g.moveTo(x0, y0); g.lineTo(x1, y0); g.stroke(); },
    tr: (n) => Number(n).toLocaleString("tr-TR"),
    duzen(el, solHtml, sagHtml) { el.innerHTML = `<div class="e-duzen"><div class="e-sol">${solHtml || ""}</div><div class="e-kontrol">${sagHtml}</div></div>`; return { sol: U.$(".e-sol", el), sag: U.$(".e-kontrol", el) }; },
  });

  /* ===================================================================
     SANILAR LABORATUVARI — Collatz · Goldbach · İkiz asallar
     =================================================================== */
  E.sanilar = {
    ad: "Sanılar Laboratuvarı",
    kur(el) {
      const vurgu = Y.vurgu(el);
      el.innerHTML = `<div class="segment" id="snSec"></div><div id="snAlan" style="margin-top:14px"></div>`;
      const alan = U.$("#snAlan", el); let temiz = null;
      const ac = (id) => { if (temiz) temiz(); alan.innerHTML = ""; temiz = ({ collatz, goldbach, ikiz })[id](alan, vurgu) || null; };
      U.segment(U.$("#snSec", el), [["collatz", "Collatz yolculuğu"], ["goldbach", "Goldbach ikilileri"], ["ikiz", "İkiz asallar"]], "collatz", ac);
      ac("collatz");
      return () => temiz && temiz();
    },
  };
  function collatzYol(n) { const y = [n]; while (n !== 1 && y.length < 2000) { n = n % 2 ? 3 * n + 1 : n / 2; y.push(n); } return y; }
  function collatz(alan, vurgu) {
    const { sol, sag } = Y.duzen(alan, "", `
      <p class="e-soru">Hangi sayıyla başlarsan başla 1'e ulaşır mısın?</p>
      <label>Başlangıç sayısı<input type="number" id="cN" min="2" max="1000000" value="27"></label>
      <div class="satir"><button class="btn btn-etkinlik" id="cCiz">Yolculuğu başlat</button><button class="btn btn-hayalet" id="cRas">Rastgele</button></div>
      <label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="cLog"> Logaritmik ölçek</label>
      <div class="satir"><div><span class="e-not">Adım</span><div class="e-buyuk" id="cAdim">–</div></div><div><span class="e-not">Zirve</span><div class="e-buyuk" id="cZirve">–</div></div></div>
      <div><span class="etiket soluk">Sınıfın kayıt defteri</span><table class="e-tablo"><thead><tr><th>Sayı</th><th>Adım</th><th>Zirve</th></tr></thead><tbody id="cKayit"></tbody></table></div>
      <button class="btn btn-hayalet" id="cHepsi">1–200 arası adım sayılarını çiz</button>`);
    let yol = [], goster = 0, anim = null, mod = "yol";
    const kayit = [];
    const t = Y.tuval(sol, .62, (g, W, H) => ciz(g, W, H));
    function ciz(g, W, H) {
      g.clearRect(0, 0, W, H);
      const L = 46, R = 16, T = 18, B = 34;
      Y.eksen(g, L, H - B, W - R, T);
      if (mod === "hepsi") {
        const N = 200, veri = []; let mx = 0;
        for (let n = 1; n <= N; n++) { const a = collatzYol(n).length - 1; veri.push(a); mx = Math.max(mx, a); }
        veri.forEach((a, i) => { const x = L + (i / (N - 1)) * (W - L - R), y = H - B - (a / mx) * (H - B - T); g.fillStyle = i + 1 === yol[0] ? RENK.kirmizi : vurgu; g.beginPath(); g.arc(x, y, 2.6, 0, 7); g.fill(); });
        Y.yazi(g, "başlangıç sayısı →", W - R, H - 10, { boyut: 12, renk: RENK.soluk, hiza: "right", kalin: 400 });
        Y.yazi(g, "adım sayısı", L + 6, T + 10, { boyut: 12, renk: RENK.soluk, kalin: 400 });
        Y.yazi(g, String(mx), L - 6, T + 10, { boyut: 11, renk: RENK.soluk, hiza: "right", kalin: 400 });
        return;
      }
      if (!yol.length) return;
      const log = U.$("#cLog", alan).checked, mx = Math.max(...yol), f = (v) => (log ? Math.log10(v) / Math.log10(mx || 10) : v / mx);
      const n = Math.max(1, goster);
      g.strokeStyle = vurgu; g.lineWidth = 2.2; g.lineJoin = "round"; g.beginPath();
      for (let i = 0; i < n; i++) { const x = L + (i / Math.max(1, yol.length - 1)) * (W - L - R), y = H - B - f(yol[i]) * (H - B - T); i ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke();
      const i = n - 1, x = L + (i / Math.max(1, yol.length - 1)) * (W - L - R), y = H - B - f(yol[i]) * (H - B - T);
      g.fillStyle = RENK.kirmizi; g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill();
      Y.yazi(g, Y.tr(yol[i]), Math.min(x + 8, W - 60), Math.max(y - 8, T + 12), { boyut: 15, renk: RENK.metin, kalin: 700 });
      Y.yazi(g, Y.tr(mx), L - 6, T + 10, { boyut: 11, renk: RENK.soluk, hiza: "right", kalin: 400 });
      Y.yazi(g, "adım →", W - R, H - 10, { boyut: 12, renk: RENK.soluk, hiza: "right", kalin: 400 });
    }
    function baslat(n) {
      cancelAnimationFrame(anim); mod = "yol"; yol = collatzYol(n); goster = 1;
      const mx = Math.max(...yol);
      U.$("#cAdim", alan).textContent = yol.length - 1; U.$("#cZirve", alan).textContent = Y.tr(mx);
      if (!kayit.some((k) => k[0] === n)) { kayit.push([n, yol.length - 1, mx]); kayit.sort((a, b) => b[1] - a[1]); }
      U.$("#cKayit", alan).innerHTML = kayit.slice(0, 8).map((k, j) => `<tr${j === 0 ? ' style="color:var(--renk)"' : ""}><td>${Y.tr(k[0])}</td><td>${k[1]}</td><td>${Y.tr(k[2])}</td></tr>`).join("");
      const hiz = Math.max(1, Math.round(yol.length / 120));
      const adim = () => { goster = Math.min(yol.length, goster + hiz); ciz(t.g, t.W, t.H); if (goster < yol.length) anim = requestAnimationFrame(adim); else Ses.efekt("dogru"); };
      Ses.efekt("basla"); adim();
    }
    U.$("#cCiz", alan).onclick = () => { const n = Math.floor(+U.$("#cN", alan).value); if (n >= 2 && n <= 1e6) baslat(n); else U.bildir("2 ile 1.000.000 arasında bir sayı yaz."); };
    U.$("#cRas", alan).onclick = () => { const n = 2 + Math.floor(Math.random() * 999); U.$("#cN", alan).value = n; baslat(n); };
    U.$("#cLog", alan).onchange = () => ciz(t.g, t.W, t.H);
    U.$("#cHepsi", alan).onclick = () => { cancelAnimationFrame(anim); mod = mod === "hepsi" ? "yol" : "hepsi"; U.$("#cHepsi", alan).textContent = mod === "hepsi" ? "Tek yolculuğa dön" : "1–200 arası adım sayılarını çiz"; ciz(t.g, t.W, t.H); };
    t.boyut(); baslat(27);
    return () => { cancelAnimationFrame(anim); t.ro.disconnect(); };
  }
  function goldbach(alan, vurgu) {
    const asal = new Set(S.elek(20000));
    const ikililer = (n) => { const r = []; for (let p = 2; p <= n / 2; p++) if (asal.has(p) && asal.has(n - p)) r.push([p, n - p]); return r; };
    const { sol, sag } = Y.duzen(alan, "", `
      <p class="e-soru">2'den büyük her çift sayı iki asalın toplamı mıdır?</p>
      <label>Çift sayı<input type="number" id="gN" min="4" max="20000" step="2" value="100"></label>
      <div class="satir"><button class="btn btn-etkinlik" id="gBul">Asal ikilileri bul</button><button class="btn btn-hayalet" id="gRas">Rastgele</button></div>
      <div><span class="e-not">Ayrışım sayısı</span><div class="e-buyuk" id="gSay">–</div></div>
      <div class="cipler" id="gListe" style="max-height:180px;overflow:auto"></div>
      <p class="e-not">Grafik: 4'ten 2000'e kadar her çift sayının kaç farklı yolla yazılabildiği. Hiç sıfıra düşen nokta var mı? Bu bir ispat mı?</p>`);
    let secili = 100;
    const t = Y.tuval(sol, .62, (g, W, H) => {
      g.clearRect(0, 0, W, H); const L = 40, R = 14, T = 16, B = 30, N = 2000; let mx = 0; const v = [];
      for (let n = 4; n <= N; n += 2) { const k = ikililer(n).length; v.push([n, k]); mx = Math.max(mx, k); }
      Y.eksen(g, L, H - B, W - R, T);
      for (const [n, k] of v) { const x = L + ((n - 4) / (N - 4)) * (W - L - R), y = H - B - (k / mx) * (H - B - T); g.fillStyle = n % 6 === 0 ? RENK.altin : vurgu; g.globalAlpha = .75; g.fillRect(x - 1, y - 1, 2.2, 2.2); }
      g.globalAlpha = 1;
      if (secili <= N) { const k = ikililer(secili).length, x = L + ((secili - 4) / (N - 4)) * (W - L - R), y = H - B - (k / mx) * (H - B - T); g.strokeStyle = RENK.kirmizi; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 7, 0, 7); g.stroke(); }
      Y.yazi(g, "kuyruklu yıldız: 6'nın katları (altın) daha yukarıda", L + 8, T + 12, { boyut: 12, renk: RENK.soluk, kalin: 400 });
      Y.yazi(g, "çift sayı →", W - R, H - 8, { boyut: 12, renk: RENK.soluk, hiza: "right", kalin: 400 });
      Y.yazi(g, String(mx), L - 6, T + 10, { boyut: 11, renk: RENK.soluk, hiza: "right", kalin: 400 });
    });
    const bul = (n) => {
      if (n % 2 || n < 4 || n > 20000) { U.bildir("4 ile 20.000 arasında bir çift sayı yaz."); return; }
      secili = n; const r = ikililer(n);
      U.$("#gSay", alan).textContent = r.length;
      U.$("#gListe", alan).innerHTML = r.map(([p, q]) => `<span class="rozet">${p} + ${q}</span>`).join("");
      t.boyut(); Ses.efekt(r.length ? "dogru" : "yanlis");
    };
    U.$("#gBul", alan).onclick = () => bul(Math.floor(+U.$("#gN", alan).value));
    U.$("#gRas", alan).onclick = () => { const n = 2 * (2 + Math.floor(Math.random() * 1500)); U.$("#gN", alan).value = n; bul(n); };
    t.boyut(); bul(100);
    return () => t.ro.disconnect();
  }
  function ikiz(alan, vurgu) {
    const asalDizi = S.elek(100000), asal = new Set(asalDizi);
    const { sol, sag } = Y.duzen(alan, "", `
      <p class="e-soru">Aralarında 2 fark olan asal ikizler sonsuza kadar sürer mi?</p>
      <label>Sınır N: <span class="e-deger" id="iNd">1000</span><input type="range" id="iN" min="100" max="100000" step="100" value="1000"></label>
      <div class="satir"><div><span class="e-not">İkiz çift sayısı</span><div class="e-buyuk" id="iSay">–</div></div><div><span class="e-not">Asal sayısı</span><div class="e-buyuk" id="iAs">–</div></div></div>
      <p class="e-not" id="iSon"></p>
      <p class="e-not">Üstte: 1'den 400'e kadar sayılar; asallar mavi, ikiz asallar parlak. Altta: N'ye kadar ikiz çiftlerin birikimli sayısı. Eğri yavaşlıyor mu, duruyor mu?</p>`);
    let N = 1000;
    const t = Y.tuval(sol, .7, (g, W, H) => {
      g.clearRect(0, 0, W, H);
      const sut = 40, sat = 10, k = Math.min((W - 20) / sut, 18), ust = 10, sol0 = (W - k * sut) / 2;
      for (let i = 1; i <= 400; i++) {
        const c = (i - 1) % sut, r = Math.floor((i - 1) / sut), x = sol0 + c * k, y = ust + r * k;
        const ikizMi = asal.has(i) && (asal.has(i - 2) || asal.has(i + 2));
        g.fillStyle = ikizMi ? vurgu : asal.has(i) ? "rgba(91,140,255,.55)" : "rgba(150,180,255,.08)";
        g.fillRect(x + 1, y + 1, k - 2, k - 2);
      }
      const y0 = ust + sat * k + 26, L = 46, R = 14, B = 26, h = H - y0 - B;
      if (h < 60) return;
      Y.eksen(g, L, H - B, W - R, y0);
      const say = []; let s = 0;
      for (const p of asalDizi) { if (p > N) break; if (asal.has(p + 2) && p + 2 <= N) { s++; say.push([p, s]); } }
      const mx = Math.max(1, s);
      g.strokeStyle = vurgu; g.lineWidth = 2; g.beginPath(); g.moveTo(L, H - B);
      for (const [p, c] of say) g.lineTo(L + (p / N) * (W - L - R), H - B - (c / mx) * h);
      g.lineTo(W - R, H - B - (s / mx) * h); g.stroke();
      Y.yazi(g, String(s), L - 6, y0 + 10, { boyut: 11, renk: RENK.soluk, hiza: "right", kalin: 400 });
      Y.yazi(g, `N = ${Y.tr(N)} →`, W - R, H - 6, { boyut: 12, renk: RENK.soluk, hiza: "right", kalin: 400 });
    });
    const guncelle = () => {
      N = +U.$("#iN", alan).value; U.$("#iNd", alan).textContent = Y.tr(N);
      let s = 0, a = 0, son = null; for (const p of asalDizi) { if (p > N) break; a++; if (p + 2 <= N && asal.has(p + 2)) { s++; son = p; } }
      U.$("#iSay", alan).textContent = Y.tr(s); U.$("#iAs", alan).textContent = Y.tr(a);
      U.$("#iSon", alan).textContent = son ? `N'den küçük en büyük ikiz çift: ${Y.tr(son)} ve ${Y.tr(son + 2)}` : "";
      t.boyut();
    };
    U.$("#iN", alan).oninput = guncelle; guncelle();
    return () => t.ro.disconnect();
  }

  /* ===================================================================
     ÖZDEŞLİKLER — alan modelleriyle görsel doğrulama
     =================================================================== */
  E.ozdeslik = {
    ad: "Özdeşliklerin Görsel İspatı",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="ozSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru" id="ozSoru"></p>
        <label>a = <span class="e-deger" id="ozAd"></span><input type="range" id="ozA" min="2" max="9" value="6"></label>
        <label id="ozBl">b = <span class="e-deger" id="ozBd"></span><input type="range" id="ozB" min="1" max="6" value="3"></label>
        <button class="btn btn-etkinlik" id="ozOyna">▶ Parçaları hareket ettir</button>
        <div class="panel-ic" id="ozDenklem" style="font-size:1.1rem"></div>
        <p class="e-not" id="ozNot"></p>`);
      let tur = "kare", tt = 1, anim = null;
      const BIL = {
        kare: { soru: "(a + b)² gerçekten a² + b² midir?", not: "Kenarı a + b olan kare dört parçaya ayrılır: iki kare ve iki eş dikdörtgen.", tex: "(a+b)^2 = a^2 + 2ab + b^2" },
        fark: { soru: "a² − b² neden (a + b)(a − b)'ye eşittir?", not: "Büyük kareden küçük kare kesilir; kalan L şeklinin bir parçası döndürülüp yanına taşınınca dikdörtgen olur.", tex: "a^2 - b^2 = (a+b)(a-b)" },
        eksi: { soru: "(a − b)² için hangi parçaları çıkarmalıyız?", not: "a × a kareden iki tane a × b şerit çıkarılır; köşedeki b × b kare iki kez çıkarıldığı için bir kez geri eklenir.", tex: "(a-b)^2 = a^2 - 2ab + b^2" },
        kup: { soru: "1³ + 2³ + … + n³ neden bir kare sayıdır?", not: "Kenarı 1 + 2 + … + n olan kare, alanları k³ olan L biçimli şeritlere ayrılır.", tex: "1^3+2^3+\\dots+n^3 = (1+2+\\dots+n)^2" },
      };
      const t = Y.tuval(sol, .62, (g, W, H) => ciz(g, W, H));
      const A = () => +U.$("#ozA", el).value, B = () => Math.min(+U.$("#ozB", el).value, tur === "kup" ? 9 : A() - (tur === "kare" ? 0 : 1));
      function kutu(g, x, y, w, h, renk, etiket, alfa = .85) {
        g.globalAlpha = alfa; g.fillStyle = renk; g.fillRect(x, y, w, h); g.globalAlpha = 1;
        g.strokeStyle = RENK.zemin; g.lineWidth = 2; g.strokeRect(x, y, w, h);
        if (etiket && w > 26 && h > 18) Y.yazi(g, etiket, x + w / 2, y + h / 2, { boyut: Math.max(12, Math.min(20, Math.min(w, h) / 3)), hiza: "center", taban: "middle", renk: RENK.zemin, kalin: 800 });
      }
      function olcu(g, x1, y1, x2, y2, s) { g.strokeStyle = RENK.soluk; g.lineWidth = 1; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); Y.yazi(g, s, (x1 + x2) / 2, (y1 + y2) / 2 - 6, { boyut: 13, hiza: "center", renk: RENK.soluk }); }
      function ciz(g, W, H) {
        g.clearRect(0, 0, W, H);
        const a = A(), b = B(), ez = (x) => x < .5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2, p = ez(tt);
        if (tur === "kare") {
          const k = Math.min((W - 80) / (a + b), (H - 60) / (a + b)), x0 = (W - k * (a + b)) / 2, y0 = 40;
          const ac = 18 * (1 - p);
          kutu(g, x0 - ac, y0 - ac, a * k, a * k, vurgu, "a²");
          kutu(g, x0 + a * k + ac, y0 - ac, b * k, a * k, RENK.altin, "ab");
          kutu(g, x0 - ac, y0 + a * k + ac, a * k, b * k, RENK.altin, "ab");
          kutu(g, x0 + a * k + ac, y0 + a * k + ac, b * k, b * k, RENK.turkuaz, "b²");
          olcu(g, x0, y0 - 26, x0 + a * k, y0 - 26, "a"); olcu(g, x0 + a * k, y0 - 26, x0 + (a + b) * k, y0 - 26, "b");
        } else if (tur === "fark") {
          const k = Math.min((W - 60) / (a + b + 1), (H - 70) / a), x0 = 30, y0 = 40;
          /* a×a kare, sağ alt köşeden b×b kesildi. Kalan: üst şerit a×(a−b) + alt sol (a−b)×b dikdörtgeni.
             Animasyon: alt sol parça döner ve üst şeridin sağına (a+b)×(a−b) olacak şekilde taşınır. */
          g.setLineDash([6, 6]); g.strokeStyle = RENK.kirmizi; g.lineWidth = 1.5; g.strokeRect(x0 + (a - b) * k, y0 + (a - b) * k, b * k, b * k); g.setLineDash([]);
          Y.yazi(g, "b² kesildi", x0 + (a - b / 2) * k, y0 + (a - b / 2) * k, { boyut: 12, hiza: "center", taban: "middle", renk: RENK.kirmizi });
          kutu(g, x0, y0, a * k, (a - b) * k, vurgu, "a(a−b)");
          const bx = x0, by = y0 + (a - b) * k, hx = x0 + a * k, hy = y0;
          const cx = bx + (hx - bx) * p, cy = by + (hy - by) * p, ww = (a - b) * k + (b - (a - b)) * k * p, hh = b * k + ((a - b) - b) * k * p;
          kutu(g, cx, cy, ww, hh, RENK.altin, "b(a−b)");
          olcu(g, x0, y0 - 24, x0 + a * k, y0 - 24, "a");
          if (p > .95) olcu(g, x0, y0 + (a - b) * k + 18, x0 + (a + b) * k, y0 + (a - b) * k + 18, "a + b");
        } else if (tur === "eksi") {
          const k = Math.min((W - 80) / a, (H - 70) / a), x0 = (W - k * a) / 2, y0 = 40;
          kutu(g, x0, y0, a * k, a * k, "rgba(150,180,255,.25)", "", 1);
          const s = p;
          kutu(g, x0 + (a - b) * k + 30 * s, y0, b * k, a * k, RENK.altin, "ab", .55 + .3 * s);
          kutu(g, x0, y0 + (a - b) * k + 30 * s, a * k, b * k, RENK.altin, "ab", .55 + .3 * s);
          kutu(g, x0, y0, (a - b) * k, (a - b) * k, vurgu, "(a−b)²");
          if (s > .9) kutu(g, x0 + (a - b) * k + 30, y0 + (a - b) * k + 30, b * k, b * k, RENK.turkuaz, "+b²");
          olcu(g, x0, y0 - 24, x0 + a * k, y0 - 24, "a");
        } else {
          const n = Math.min(b + 1, 8), T = (n * (n + 1)) / 2, k = Math.min((W - 40) / T, (H - 40) / T), x0 = (W - k * T) / 2, y0 = 20;
          const renkler = [vurgu, RENK.altin, RENK.turkuaz, RENK.mor, RENK.turuncu, RENK.kirmizi, RENK.mavi, "#f472b6"];
          const goster = Math.max(1, Math.ceil(p * n));
          for (let j = 1; j <= goster; j++) {
            const t0 = ((j - 1) * j) / 2, t1 = (j * (j + 1)) / 2, r = renkler[(j - 1) % renkler.length];
            g.globalAlpha = .85; g.fillStyle = r;
            g.fillRect(x0 + t0 * k, y0, j * k, t1 * k); g.fillRect(x0, y0 + t0 * k, t0 * k, j * k); g.globalAlpha = 1;
            g.strokeStyle = RENK.zemin; g.lineWidth = 1;
            for (let u = 0; u <= T; u++) { g.beginPath(); g.moveTo(x0 + u * k, y0); g.lineTo(x0 + u * k, y0 + T * k); g.moveTo(x0, y0 + u * k); g.lineTo(x0 + T * k, y0 + u * k); g.stroke(); }
            if (j * k > 22) Y.yazi(g, `${j}³`, x0 + (t0 + j / 2) * k, y0 + (t1 - j / 2) * k, { boyut: Math.min(22, j * k / 2.4), hiza: "center", taban: "middle", renk: RENK.zemin, kalin: 800 });
          }
        }
      }
      function denklem() {
        const a = A(), b = B(), d = U.$("#ozDenklem", el);
        U.$("#ozAd", el).textContent = a; U.$("#ozBd", el).textContent = tur === "kup" ? b + 1 : b;
        const say = { kare: `(${a}+${b})² = ${(a + b) ** 2} = ${a * a} + ${2 * a * b} + ${b * b}`, fark: `${a}² − ${b}² = ${a * a - b * b} = ${a + b} × ${a - b}`, eksi: `(${a}−${b})² = ${(a - b) ** 2} = ${a * a} − ${2 * a * b} + ${b * b}`,
          kup: (() => { const n = Math.min(b + 1, 8), T = (n * (n + 1)) / 2; return `${Array.from({ length: n }, (_, i) => `${i + 1}³`).join(" + ")} = ${T * T} = ${T}²`; })() }[tur];
        U.texYaz(d, BIL[tur].tex); d.insertAdjacentHTML("beforeend", `<div class="mono soluk" style="margin-top:6px">${say}</div>`);
        U.$("#ozSoru", el).textContent = BIL[tur].soru; U.$("#ozNot", el).textContent = BIL[tur].not;
        U.$("#ozBl", el).firstChild.textContent = tur === "kup" ? "n = " : "b = ";
        U.$("#ozA", el).closest("label").hidden = tur === "kup";
      }
      const yenile = () => { denklem(); ciz(t.g, t.W, t.H); };
      U.segment(U.$("#ozSec", el), [["kare", "(a + b)²"], ["fark", "a² − b²"], ["eksi", "(a − b)²"], ["kup", "Küplerin toplamı"]], "kare", (v) => { tur = v; tt = v === "kup" ? 1 : 0; yenile(); if (v !== "kup") oyna(); });
      U.$("#ozA", el).oninput = yenile; U.$("#ozB", el).oninput = yenile;
      const oyna = () => { cancelAnimationFrame(anim); tt = 0; const bas = performance.now(); const d = () => { tt = Math.min(1, (performance.now() - bas) / 1400); ciz(t.g, t.W, t.H); if (tt < 1) anim = requestAnimationFrame(d); }; d(); Ses.efekt("basla"); };
      U.$("#ozOyna", el).onclick = oyna;
      t.boyut(); yenile();
      return () => { cancelAnimationFrame(anim); t.ro.disconnect(); };
    },
  };

  /* ===================================================================
     BÖLEN IZGARASI — asal çarpanlar ve bölen sayısı
     =================================================================== */
  E.bolen = {
    ad: "Bölen Izgarası",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, "", `
        <p class="e-soru">Bir sayının kaç böleni olduğunu, bölenleri tek tek bulmadan söyleyebilir miyiz?</p>
        <label>Sayı<input type="number" id="bN" min="2" max="100000" value="72"></label>
        <div class="satir"><button class="btn btn-etkinlik" id="bGo">İncele</button><button class="btn btn-hayalet" id="bRas">Rastgele</button></div>
        <div class="panel-ic"><span class="e-not">Asal çarpanlar</span><div class="e-buyuk" id="bCarp">–</div><span class="e-not">Bölen sayısı</span><div class="e-buyuk" id="bTau">–</div></div>
        <label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="bIpucu"> Kuralı göster</label>
        <p class="e-not" id="bKural" hidden></p>
        <div><span class="etiket soluk">Sınıfın tablosu</span><table class="e-tablo"><thead><tr><th>Sayı</th><th>Çarpanlar</th><th>Bölen</th></tr></thead><tbody id="bTablo"></tbody></table></div>`);
      const tablo = [];
      let n = 72;
      const t = Y.tuval(sol, .7, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const us = [...S.ussler(BigInt(n))].map(([p, e]) => [Number(p), e]);
        const b = S.bolenler(BigInt(n)).map(Number);
        if (us.length === 0) return;
        if (us.length <= 2) {
          const [p, a] = us[0], [q, c] = us[1] || [1, 0];
          const sut = a + 1, sat = c + 1, k = Math.min((W - 90) / sut, (H - 80) / sat, 110), x0 = (W - k * sut) / 2 + 20, y0 = 50;
          for (let i = 0; i <= a; i++) for (let j = 0; j <= c; j++) {
            const v = p ** i * q ** j, x = x0 + i * k, y = y0 + (c - j) * k;
            g.fillStyle = v === n ? RENK.kirmizi : v === 1 ? "rgba(150,180,255,.25)" : vurgu; g.globalAlpha = .25 + .6 * ((i + j) / Math.max(1, a + c));
            g.fillRect(x + 3, y + 3, k - 6, k - 6); g.globalAlpha = 1;
            Y.yazi(g, Y.tr(v), x + k / 2, y + k / 2, { boyut: Math.max(11, Math.min(22, k / 3.2)), hiza: "center", taban: "middle", kalin: 800 });
          }
          for (let i = 0; i <= a; i++) Y.yazi(g, i ? `${p}${S.us(i)}` : "1", x0 + i * k + k / 2, y0 - 14, { boyut: 14, hiza: "center", renk: RENK.altin });
          for (let j = 0; j <= c; j++) Y.yazi(g, j ? `${q}${S.us(j)}` : "1", x0 - 12, y0 + (c - j) * k + k / 2, { boyut: 14, hiza: "right", taban: "middle", renk: RENK.altin });
          Y.yazi(g, `${a + 1} sütun × ${c + 1} satır = ${(a + 1) * (c + 1)} bölen`, W / 2, H - 14, { boyut: 15, hiza: "center", renk: RENK.metin });
        } else {
          const kol = Math.ceil(Math.sqrt(b.length * 1.6)), k = Math.min((W - 20) / kol, 64), sat = Math.ceil(b.length / kol), x0 = (W - kol * k) / 2, y0 = Math.max(10, (H - sat * k - 30) / 2);
          b.forEach((v, i) => { const x = x0 + (i % kol) * k, y = y0 + Math.floor(i / kol) * k; g.fillStyle = vurgu; g.globalAlpha = .5; g.fillRect(x + 2, y + 2, k - 4, k - 4); g.globalAlpha = 1; Y.yazi(g, Y.tr(v), x + k / 2, y + k / 2, { boyut: Math.max(10, Math.min(16, k / 3.4)), hiza: "center", taban: "middle", kalin: 700 }); });
          Y.yazi(g, `${us.length} farklı asal: ızgara ${us.length} boyutlu bir kutu olur → ${us.map(([, e]) => `(${e}+1)`).join("·")} = ${b.length}`, W / 2, H - 12, { boyut: 14, hiza: "center" });
        }
      });
      const incele = (m) => {
        if (!(m >= 2 && m <= 100000)) { U.bildir("2 ile 100.000 arasında bir sayı yaz."); return; }
        n = m; const us = [...S.ussler(BigInt(n))], tau = Number(S.tau(BigInt(n)));
        U.$("#bCarp", el).textContent = S.carpimYazi(BigInt(n)); U.$("#bTau", el).textContent = tau;
        U.$("#bKural", el).textContent = `Üsler: ${us.map(([, e]) => e).join(", ")} → (üs + 1)'lerin çarpımı = ${us.map(([, e]) => e + 1).join(" × ")} = ${tau}`;
        if (!tablo.some((r) => r[0] === n)) tablo.unshift([n, S.carpimYazi(BigInt(n)), tau]);
        U.$("#bTablo", el).innerHTML = tablo.slice(0, 8).map((r) => `<tr><td>${Y.tr(r[0])}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("");
        t.boyut(); Ses.efekt("sec");
      };
      U.$("#bGo", el).onclick = () => incele(Math.floor(+U.$("#bN", el).value));
      U.$("#bRas", el).onclick = () => { const m = U.sec([12, 18, 24, 30, 36, 48, 60, 64, 72, 90, 96, 100, 120, 144, 180, 210, 360]); U.$("#bN", el).value = m; incele(m); };
      U.$("#bIpucu", el).onchange = (e) => (U.$("#bKural", el).hidden = !e.target.checked);
      t.boyut(); incele(72);
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     ÇOKGENSEL SAYILAR — noktalarla dizi kuralı
     =================================================================== */
  E.cokgensel = {
    ad: "Çokgensel Sayılar",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="ckSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru" id="ckSoru">Noktalar büyüdükçe kaç nokta eklenir? Kural ne?</p>
        <label>Terim: n = <span class="e-deger" id="ckNd">4</span><input type="range" id="ckN" min="1" max="10" value="4"></label>
        <table class="e-tablo"><thead><tr><th>n</th><th>Terim</th><th>Fark</th><th>2. fark</th></tr></thead><tbody id="ckTab"></tbody></table>
        <label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="ckFor"> Genel terimi göster</label>
        <div class="panel-ic" id="ckForm" hidden></div>
        <p class="e-not">Altın noktalar son adımda eklenenleri gösterir.</p>`);
      let k = 3, n = 4;
      const AD = { 3: "Üçgensel", 4: "Kare", 5: "Beşgen", 6: "Altıgen", 0: "Fibonacci" };
      const terim = (k, n) => (k === 0 ? (() => { let a = 1, b = 1; for (let i = 2; i < n; i++) [a, b] = [b, a + b]; return n <= 2 ? 1 : b; })() : ((k - 2) * n * n - (k - 4) * n) / 2);
      const t = Y.tuval(sol, .62, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        if (k === 0) {
          /* Fibonacci: kenarı terim olan kareler spirali */
          const f = [1, 1]; for (let i = 2; i < n; i++) f.push(f[i - 1] + f[i - 2]);
          let x = 0, y = 0, w = 0, h = 0; const kare = [];
          f.slice(0, n).forEach((s, i) => { const d = i % 4; let kx, ky; if (i === 0) { kx = 0; ky = 0; w = h = s; } else if (d === 1) { kx = x + w; ky = y + h - s; w += s; } else if (d === 2) { kx = x + w - s; ky = y - s; y -= s; h += s; } else if (d === 3) { kx = x - s; ky = y; x -= s; w += s; } else { kx = x; ky = y + h; h += s; } kare.push([kx, ky, s]); });
          const olc = Math.min((W - 20) / w, (H - 20) / h), ox = (W - w * olc) / 2 - x * olc, oy = (H - h * olc) / 2 - y * olc;
          kare.forEach(([kx, ky, s], i) => { g.fillStyle = i === kare.length - 1 ? RENK.altin : vurgu; g.globalAlpha = .25 + .5 * (i / kare.length); g.fillRect(ox + kx * olc, oy + ky * olc, s * olc, s * olc); g.globalAlpha = 1; g.strokeStyle = RENK.zemin; g.lineWidth = 2; g.strokeRect(ox + kx * olc, oy + ky * olc, s * olc, s * olc); if (s * olc > 24) Y.yazi(g, String(s), ox + (kx + s / 2) * olc, oy + (ky + s / 2) * olc, { boyut: Math.min(24, s * olc / 3), hiza: "center", taban: "middle", renk: RENK.zemin, kalin: 800 }); });
          return;
        }
        /* k-gen sayısı: n katmanlı iç içe çokgenler; hepsi aynı köşeden (orijin) büyür ve iki kenarı ortaktır.
           Katman s (kenar uzunluğu s) orijinden başlayıp k kenarı yürüyerek çizilir; tekrar eden noktalar ilk katmanında kalır. */
        const harita = new Map();
        for (let s = 0; s < n; s++) {
          const ekle = (x, y) => { const key = Math.round(x * 1000) + "," + Math.round(y * 1000); if (!harita.has(key)) harita.set(key, [x, y, s]); };
          if (s === 0) { ekle(0, 0); continue; }
          let x = 0, y = 0;
          for (let i = 0; i < k; i++) { const a2 = (2 * Math.PI * i) / k; for (let j = 0; j < s; j++) { ekle(x, y); x += Math.cos(a2); y += Math.sin(a2); } }
        }
        const tek = [...harita.values()];
        const xs = tek.map((p) => p[0]), ys = tek.map((p) => p[1]), mnx = Math.min(...xs), mxx = Math.max(...xs), mny = Math.min(...ys), mxy = Math.max(...ys);
        const olc = Math.min((W - 60) / Math.max(1, mxx - mnx), (H - 70) / Math.max(1, mxy - mny), 60), ox = W / 2 - ((mnx + mxx) / 2) * olc, oy = H / 2 + 10 + ((mny + mxy) / 2) * olc;
        const r = Math.max(3, Math.min(12, olc * .28));
        if (n > 1) { g.strokeStyle = "rgba(255,198,87,.35)"; g.lineWidth = 1.5; g.beginPath(); let x = 0, y = 0; g.moveTo(ox, oy); for (let i = 0; i < k; i++) { const a2 = (2 * Math.PI * i) / k; x += (n - 1) * Math.cos(a2); y += (n - 1) * Math.sin(a2); g.lineTo(ox + x * olc, oy - y * olc); } g.stroke(); }
        for (const [x, y, s] of tek) { g.fillStyle = s === n - 1 && n > 1 ? RENK.altin : vurgu; g.beginPath(); g.arc(ox + x * olc, oy - y * olc, r, 0, 7); g.fill(); }
        Y.yazi(g, `${AD[k]} sayı · ${n}. terim = ${terim(k, n)}`, 12, 22, { boyut: 15 });
      });
      const yenile = () => {
        n = +U.$("#ckN", el).value; U.$("#ckNd", el).textContent = n;
        const v = Array.from({ length: Math.max(n, 5) }, (_, i) => terim(k, i + 1));
        U.$("#ckTab", el).innerHTML = v.slice(0, Math.max(n, 5)).map((x, i) => `<tr${i + 1 === n ? ' style="color:var(--renk)"' : ""}><td>${i + 1}</td><td>${x}</td><td>${i ? x - v[i - 1] : ""}</td><td>${i > 1 ? x - 2 * v[i - 1] + v[i - 2] : ""}</td></tr>`).join("");
        const fm = { 3: "T_n = \\dfrac{n(n+1)}{2}", 4: "K_n = n^2", 5: "B_n = \\dfrac{n(3n-1)}{2}", 6: "A_n = n(2n-1)", 0: "F_n = F_{n-1} + F_{n-2}" }[k];
        U.texYaz(U.$("#ckForm", el), fm);
        U.$("#ckSoru", el).textContent = k === 0 ? "Fibonacci'de farkların farkı neden sabit değil? Kare kenarları nasıl büyüyor?" : `${AD[k]} sayılarda ikinci farklar neden hep ${k - 2}?`;
        t.boyut();
      };
      U.segment(U.$("#ckSec", el), [[3, "Üçgensel"], [4, "Kare"], [5, "Beşgen"], [6, "Altıgen"], [0, "Fibonacci"]], 3, (v) => { k = +v; yenile(); });
      U.$("#ckN", el).oninput = yenile; U.$("#ckFor", el).onchange = (e) => (U.$("#ckForm", el).hidden = !e.target.checked);
      t.boyut(); yenile();
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     SAYI SİSTEMLERİ — Mısır, Babil, Maya, ikili
     =================================================================== */
  E.sayisistem = {
    ad: "Sayı Sistemleri Çevirici",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, "", `
        <p class="e-soru">Aynı sayı dört uygarlıkta nasıl yazılırdı? Hangisi basamak değeri kullanıyor?</p>
        <label>Sayı (1–9999)<input type="number" id="ssN" min="1" max="9999" value="2026"></label>
        <div class="satir"><button class="btn btn-etkinlik" id="ssGo">Çevir</button><button class="btn btn-hayalet" id="ssRas">Rastgele</button></div>
        <label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="ssGizle"> Sayıyı gizle (öğrenciler çözsün)</label>
        <div class="panel-ic"><span class="e-not">Taban açılımları</span><div id="ssAcilim" class="mono" style="font-size:.95rem;line-height:1.7"></div></div>`);
      let n = 2026;
      const t = Y.tuval(sol, .9, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const satir = H / 4, gizli = U.$("#ssGizle", el).checked;
        const baslik = (s, i, alt) => { Y.yazi(g, s, 12, i * satir + 22, { boyut: 15, renk: vurgu, kalin: 800 }); Y.yazi(g, alt, 12, i * satir + 40, { boyut: 12, renk: RENK.soluk, kalin: 400 }); };
        /* Mısır: 1000 lotus, 100 halat, 10 kemer, 1 çubuk (sembolleri çizerek) */
        baslik("Mısır", 0, "10'luk, tekrarlı sembol (basamak yok)");
        let x = 140; const y0 = satir * .55, sb = Math.min(24, satir * .4);
        const parca = [[Math.floor(n / 1000), "lotus"], [Math.floor(n / 100) % 10, "halat"], [Math.floor(n / 10) % 10, "kemer"], [n % 10, "cubuk"]];
        g.strokeStyle = RENK.altin; g.lineWidth = 2.2; g.lineCap = "round";
        for (const [c, tur] of parca) for (let i = 0; i < c; i++) {
          if (x > W - 20) break;
          g.beginPath();
          if (tur === "cubuk") { g.moveTo(x, y0 - sb / 2); g.lineTo(x, y0 + sb / 2); x += 9; }
          else if (tur === "kemer") { g.moveTo(x, y0 + sb / 2); g.lineTo(x, y0 - sb / 4); g.arc(x + sb / 4, y0 - sb / 4, sb / 4, Math.PI, 0); g.lineTo(x + sb / 2, y0 + sb / 2); x += sb / 2 + 8; }
          else if (tur === "halat") { g.arc(x + sb / 3, y0, sb / 3, Math.PI * .5, Math.PI * 2.3); g.lineTo(x + sb / 3 + 4, y0 + sb / 2); x += sb * .8 + 6; }
          else { g.moveTo(x + sb / 3, y0 + sb / 2); g.lineTo(x + sb / 3, y0 - sb / 6); g.ellipse(x + sb / 3, y0 - sb / 3, sb / 5, sb / 4, 0, 0, 7); g.moveTo(x + sb / 3, y0 + sb / 6); g.lineTo(x, y0 - sb / 6); x += sb * .8 + 6; }
          g.stroke();
        }
        /* Babil: 60 tabanı, çivi (1) ve köşeli (10) işaretleri */
        baslik("Babil", 1, "60'lık tabanda basamak değeri");
        const b60 = []; let m = n; do { b60.unshift(m % 60); m = Math.floor(m / 60); } while (m);
        x = 140; const yb = satir * 1.55;
        b60.forEach((d, bi) => {
          const on = Math.floor(d / 10), bir = d % 10;
          for (let i = 0; i < on; i++) { g.beginPath(); g.moveTo(x + 14, yb - 12); g.lineTo(x, yb); g.lineTo(x + 14, yb + 12); g.stroke(); x += 12; }
          for (let i = 0; i < bir; i++) { const ox = x + (i % 3) * 9, oy = yb - 12 + Math.floor(i / 3) * 9; g.beginPath(); g.moveTo(ox - 4, oy); g.lineTo(ox + 4, oy); g.lineTo(ox, oy + 6); g.closePath(); g.moveTo(ox, oy + 6); g.lineTo(ox, oy + 14); g.stroke(); }
          x += Math.min(3, bir) * 9 + 10;
          Y.yazi(g, gizli ? "?" : String(d), x - 18, yb + 30, { boyut: 11, renk: RENK.soluk, hiza: "center", kalin: 400 });
          if (bi < b60.length - 1) x += 26;
        });
        /* Maya: 20 tabanı, nokta (1) ve çizgi (5), dikey basamaklar */
        baslik("Maya", 2, "20'lik tabanda, alttan üste basamaklar");
        const b20 = []; m = n; do { b20.unshift(m % 20); m = Math.floor(m / 20); } while (m);
        /* Maya basamakları üst üste dizilir: en büyük basamak en üstte; her basamakta noktalar çizgilerin üstünde */
        const cx = 160, ust = satir * 2 + 8, bh = (satir - 16) / b20.length;
        b20.forEach((d, i) => {
          const yy = ust + i * bh, bes = Math.floor(d / 5), bir = d % 5, ic = Math.min(6, bh / 5);
          g.strokeStyle = "rgba(150,180,255,.15)"; g.lineWidth = 1; g.beginPath(); g.moveTo(cx - 14, yy + bh - 1); g.lineTo(cx + 60, yy + bh - 1); g.stroke();
          g.strokeStyle = RENK.altin; g.lineWidth = 2.2;
          if (d === 0) { g.beginPath(); g.ellipse(cx + 22, yy + bh / 2, 16, Math.min(8, bh / 3), 0, 0, 7); g.stroke(); }
          const blok = bir ? ic * 2 + 2 : 0, cizgiY = (j) => yy + (bh - (blok + bes * ic * 1.4)) / 2 + blok + j * ic * 1.4 + ic * .5;
          for (let j = 0; j < bir; j++) { g.fillStyle = RENK.altin; g.beginPath(); g.arc(cx + 22 + (j - (bir - 1) / 2) * ic * 2.2, yy + (bh - (blok + bes * ic * 1.4)) / 2 + ic, ic * .75, 0, 7); g.fill(); }
          for (let j = 0; j < bes; j++) { g.beginPath(); g.moveTo(cx, cizgiY(j)); g.lineTo(cx + 44, cizgiY(j)); g.stroke(); }
          Y.yazi(g, gizli ? "? × " + 20 ** (b20.length - 1 - i) : `${d} × ${Y.tr(20 ** (b20.length - 1 - i))}`, cx + 76, yy + bh / 2, { boyut: 12, renk: RENK.soluk, taban: "middle", kalin: 400 });
        });
        /* İkili */
        baslik("İkili", 3, "2'lik taban: bilgisayarın dili");
        const ikili = n.toString(2), kk = Math.min(28, (W - 160) / ikili.length);
        [...ikili].forEach((c, i) => { const xx = 140 + i * kk, yy = satir * 3.35; g.fillStyle = c === "1" ? vurgu : "rgba(150,180,255,.12)"; g.fillRect(xx + 1, yy, kk - 2, kk - 2); Y.yazi(g, c, xx + kk / 2, yy + kk / 2, { boyut: Math.min(16, kk * .6), hiza: "center", taban: "middle", renk: c === "1" ? RENK.zemin : RENK.soluk, kalin: 800 }); Y.yazi(g, gizli ? "" : String(2 ** (ikili.length - 1 - i)), xx + kk / 2, yy + kk + 12, { boyut: 9, hiza: "center", renk: RENK.soluk, kalin: 400 }); });
      });
      const cevir = (m) => {
        if (!(m >= 1 && m <= 9999)) { U.bildir("1 ile 9999 arasında bir sayı yaz."); return; }
        n = m;
        const ac = (b) => { const d = []; let x = n; do { d.unshift(x % b); x = Math.floor(x / b); } while (x); return d.map((v, i) => `${v}·${b}${S.us(d.length - 1 - i)}`).join(" + "); };
        U.$("#ssAcilim", el).innerHTML = U.$("#ssGizle", el).checked ? "Gizli: önce öğrenciler bulsun." : `60'lık: ${ac(60)}<br>20'lik: ${ac(20)}<br>2'lik: ${n.toString(2)}`;
        t.boyut(); Ses.efekt("sec");
      };
      U.$("#ssGo", el).onclick = () => cevir(Math.floor(+U.$("#ssN", el).value));
      U.$("#ssRas", el).onclick = () => { const m = 1 + Math.floor(Math.random() * 3999); U.$("#ssN", el).value = m; cevir(m); };
      U.$("#ssGizle", el).onchange = () => cevir(n);
      t.boyut(); cevir(2026);
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     ESKİ ÇARPMA YÖNTEMLERİ — Rus köylü · çizgilerle çarpma
     =================================================================== */
  E.carpma = {
    ad: "Eski Çarpma Yöntemleri",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="cpSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru" id="cpSoru"></p>
        <div class="satir"><label>Birinci<input type="number" id="cpA" min="1" max="999" value="34"></label><label>İkinci<input type="number" id="cpB" min="1" max="999" value="12"></label></div>
        <button class="btn btn-etkinlik" id="cpGo">Adım adım göster</button>
        <div class="panel-ic" id="cpSonuc"></div>
        <p class="e-not" id="cpNot"></p>`);
      let tur = "rus", adim = 99, anim = null;
      const BIL = {
        rus: ["Yalnızca ikiye bölüp ikiyle çarparak çarpım bulunabilir mi?", "Sol sütun ikiye bölünür (kalan atılır), sağ sütun ikiye katlanır. Soldaki sayı tek olan satırların sağ değerleri toplanır. Neden? Sol sütunun tek/çift dizisi sayının ikili yazılışıdır."],
        cizgi: ["Çizgilerin kesişim noktalarını saymak neden çarpımı verir?", "Her basamak bir çizgi demetidir. Kesişimler köşegen bölgelerde sayılır: her bölge bir basamak değeridir, 10'u geçen bölge eldeyi bir sonrakine aktarır. (Basamaklarda en fazla 2 hane kullanın.)"],
      };
      const t = Y.tuval(sol, .7, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const a = +U.$("#cpA", el).value, b = +U.$("#cpB", el).value;
        if (tur === "rus") {
          const s = []; let x = a, y = b; while (x >= 1) { s.push([x, y]); x = Math.floor(x / 2); y *= 2; }
          const h = Math.min(36, (H - 40) / s.length), x1 = W * .3, x2 = W * .62;
          Y.yazi(g, "÷ 2", x1, 22, { boyut: 13, renk: RENK.soluk, hiza: "center" }); Y.yazi(g, "× 2", x2, 22, { boyut: 13, renk: RENK.soluk, hiza: "center" });
          s.forEach(([p, q], i) => {
            if (i > adim) return;
            const yy = 34 + i * h + h / 2, tek = p % 2 === 1;
            if (tek) { g.fillStyle = vurgu; g.globalAlpha = .18; g.fillRect(W * .12, yy - h / 2 + 2, W * .76, h - 4); g.globalAlpha = 1; }
            Y.yazi(g, String(p), x1, yy, { boyut: Math.min(20, h * .6), hiza: "center", taban: "middle", renk: tek ? RENK.metin : RENK.soluk, kalin: 700, aile: "JetBrains Mono, monospace" });
            Y.yazi(g, String(q), x2, yy, { boyut: Math.min(20, h * .6), hiza: "center", taban: "middle", renk: tek ? vurgu : "rgba(157,176,214,.45)", kalin: 700, aile: "JetBrains Mono, monospace" });
            if (!tek) { g.strokeStyle = "rgba(157,176,214,.55)"; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x2 - 30, yy); g.lineTo(x2 + 30, yy); g.stroke(); }
            Y.yazi(g, tek ? "tek ✓" : "çift", W * .84, yy, { boyut: 12, taban: "middle", renk: tek ? vurgu : RENK.soluk, hiza: "right" });
          });
        } else {
          const ra = String(a).split("").map(Number), rb = String(b).split("").map(Number);
          const g0 = Math.min(W, H) * .08, alanW = W - 2 * g0, alanH = H - 2 * g0 - 20;
          const ab = Math.max(1, ...ra) * ra.length + ra.length, bb = Math.max(1, ...rb) * rb.length + rb.length;
          /* a'nın basamakları: eğik çizgi demetleri (sol üstten sağ alta), b'ninkiler diğer yönde */
          const cizgiler = (rak, yon) => {
            const L = []; let k = 0;
            rak.forEach((d, i) => { for (let j = 0; j < d; j++) { L.push({ i, t: (k + j) / (rak.reduce((s, x) => s + x, 0) + rak.length) }); } k += d + 1; });
            return L.map((c) => ({ ...c, yon }));
          };
          const A2 = cizgiler(ra, 0), B2 = cizgiler(rb, 1);
          const P = (u, v) => [g0 + alanW * (.5 + (u - v) * .5), g0 + 10 + alanH * (u + v) * .5];
          g.lineWidth = 2;
          for (const c of A2) { const [x0, y0] = P(c.t + .05, 0), [x1, y1] = P(c.t + .05, 1); g.strokeStyle = RENK.altin; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
          if (adim > 0) for (const c of B2) { const [x0, y0] = P(0, c.t + .05), [x1, y1] = P(1, c.t + .05); g.strokeStyle = vurgu; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
          if (adim > 1) {
            const bolge = {};
            for (const ca of A2) for (const cb of B2) { const [x, y] = P(ca.t + .05, cb.t + .05); const kk = ca.i + cb.i; bolge[kk] = (bolge[kk] || 0) + 1; g.fillStyle = RENK.kirmizi; g.beginPath(); g.arc(x, y, 3.2, 0, 7); g.fill(); }
            const n = ra.length + rb.length - 1;
            for (let kk = 0; kk < n; kk++) Y.yazi(g, `${bolge[kk] || 0}`, g0 + alanW * (.12 + .76 * (kk / Math.max(1, n - 1))), H - 10, { boyut: 16, hiza: "center", renk: RENK.metin, kalin: 800 });
          }
        }
      });
      const sonuc = () => {
        const a = +U.$("#cpA", el).value, b = +U.$("#cpB", el).value;
        if (tur === "rus") {
          const s = []; let x = a, y = b; while (x >= 1) { s.push([x, y]); x = Math.floor(x / 2); y *= 2; }
          const tek = s.filter(([p]) => p % 2).map(([, q]) => q);
          U.$("#cpSonuc", el).innerHTML = adim >= s.length - 1 ? `<span class="mono">${tek.join(" + ")} = <b style="color:var(--renk)">${tek.reduce((p, q) => p + q, 0)}</b></span><div class="e-not">${a} × ${b} = ${a * b}</div>` : `<span class="e-not">Satır ${adim + 1} / ${s.length}</span>`;
        } else U.$("#cpSonuc", el).innerHTML = adim > 1 ? `<span class="e-not">Alttaki sayılar soldan sağa basamaklardır; 10'u geçeni bir sola elde olarak aktar.</span><div class="mono">${a} × ${b} = <b style="color:var(--renk)">${a * b}</b></div>` : `<span class="e-not">${adim === 0 ? "Birinci sayının çizgileri" : "İkinci sayının çizgileri eklendi"}</span>`;
      };
      const oyna = () => {
        clearInterval(anim); adim = 0; t.boyut(); sonuc(); Ses.efekt("basla");
        const son = tur === "rus" ? Math.ceil(Math.log2(Math.max(1, +U.$("#cpA", el).value))) + 1 : 2;
        anim = setInterval(() => { adim++; t.boyut(); sonuc(); Ses.efekt("tik"); if (adim >= son) { clearInterval(anim); Ses.efekt("dogru"); } }, 700);
      };
      U.segment(U.$("#cpSec", el), [["rus", "Rus köylü"], ["cizgi", "Çizgilerle çarpma"]], "rus", (v) => { tur = v; U.$("#cpSoru", el).textContent = BIL[v][0]; U.$("#cpNot", el).textContent = BIL[v][1]; if (v === "cizgi") { U.$("#cpA", el).value = 23; U.$("#cpB", el).value = 12; } oyna(); });
      U.$("#cpSoru", el).textContent = BIL.rus[0]; U.$("#cpNot", el).textContent = BIL.rus[1];
      U.$("#cpGo", el).onclick = oyna;
      t.boyut(); oyna();
      return () => { clearInterval(anim); t.ro.disconnect(); };
    },
  };

  /* ===================================================================
     HANOİ KULESİ — oyna, say, genelle
     =================================================================== */
  E.hanoi = {
    ad: "Hanoi Kulesi",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, "", `
        <p class="e-soru">Tüm diskleri sağdaki çubuğa taşı. Büyük disk küçüğün üstüne konamaz.</p>
        <label>Disk sayısı: <span class="e-deger" id="hNd">3</span><input type="range" id="hN" min="1" max="8" value="3"></label>
        <div class="satir"><div><span class="e-not">Hamle</span><div class="e-buyuk" id="hHam">0</div></div><div><span class="e-not">En az</span><div class="e-buyuk" id="hMin">?</div></div></div>
        <div class="satir"><button class="btn btn-hayalet" id="hSifir">Baştan</button><button class="btn btn-hayalet" id="hGoster">En az hamleyi göster</button><button class="btn btn-hayalet" id="hMinAc">"En az"ı aç</button></div>
        <div><span class="etiket soluk">Sınıfın tablosu</span><table class="e-tablo"><thead><tr><th>Disk</th><th>En iyi</th></tr></thead><tbody id="hTab"></tbody></table></div>
        <p class="e-not">Çubuğa dokun: en üstteki disk kalkar. Sonra hedef çubuğa dokun.</p>`);
      let n = 3, cub = [[], [], []], sec = null, ham = 0, oto = null; const enIyi = {};
      const renk = [RENK.kirmizi, RENK.turuncu, RENK.altin, RENK.turkuaz, vurgu, RENK.mor, "#f472b6", RENK.mavi];
      const t = Y.tuval(sol, .55, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const tab = H - 30, dh = Math.min(26, (H - 80) / (n + 1)), gen = W / 3;
        g.fillStyle = "rgba(150,180,255,.18)"; g.fillRect(10, tab, W - 20, 8);
        for (let i = 0; i < 3; i++) {
          const cx = gen * i + gen / 2;
          g.fillStyle = sec === i ? vurgu : "rgba(150,180,255,.35)"; g.fillRect(cx - 4, tab - (n + 1.5) * dh, 8, (n + 1.5) * dh);
          cub[i].forEach((d, j) => { const w = (gen * .85) * (d / n) * .9 + 26, y = tab - (j + 1) * dh; const ust = sec === i && j === cub[i].length - 1; g.fillStyle = renk[(d - 1) % renk.length]; g.beginPath(); if (g.roundRect) g.roundRect(cx - w / 2, y - (ust ? 18 : 0), w, dh - 3, 8); else g.rect(cx - w / 2, y - (ust ? 18 : 0), w, dh - 3); g.fill(); });
          Y.yazi(g, ["A", "B", "C"][i], cx, H - 6, { boyut: 13, hiza: "center", renk: RENK.soluk });
        }
      });
      const yaz = () => { U.$("#hHam", el).textContent = ham; U.$("#hTab", el).innerHTML = Object.keys(enIyi).sort((a, b) => a - b).map((k) => `<tr><td>${k}</td><td>${enIyi[k]}</td></tr>`).join(""); t.boyut(); };
      const kur = () => { clearInterval(oto); oto = null; n = +U.$("#hN", el).value; U.$("#hNd", el).textContent = n; cub = [Array.from({ length: n }, (_, i) => n - i), [], []]; sec = null; ham = 0; U.$("#hMin", el).textContent = "?"; yaz(); };
      const tasi = (a, b) => { const d = cub[a][cub[a].length - 1], u = cub[b][cub[b].length - 1]; if (d === undefined || (u !== undefined && u < d)) { Ses.efekt("yanlis"); return false; } cub[b].push(cub[a].pop()); ham++; Ses.efekt("tik"); if (cub[2].length === n) { Ses.efekt("bitis"); enIyi[n] = Math.min(enIyi[n] || 1e9, ham); U.bildir(ham === 2 ** n - 1 ? `Mükemmel! ${ham} hamle: en az hamle bu.` : `Bitti: ${ham} hamle. Daha azı mümkün mü?`); } return true; };
      t.cv.addEventListener("pointerdown", (e) => {
        if (oto) return; const r = t.cv.getBoundingClientRect(), i = Math.min(2, Math.floor(((e.clientX - r.left) / r.width) * 3));
        if (sec === null) { if (cub[i].length) { sec = i; Ses.efekt("dokun"); } } else { if (i !== sec) tasi(sec, i); sec = null; }
        yaz();
      });
      U.$("#hN", el).oninput = kur; U.$("#hSifir", el).onclick = kur;
      U.$("#hMinAc", el).onclick = () => (U.$("#hMin", el).textContent = 2 ** n - 1);
      U.$("#hGoster", el).onclick = () => {
        kur(); const h = []; const coz = (k, a, b, c) => { if (!k) return; coz(k - 1, a, c, b); h.push([a, c]); coz(k - 1, b, a, c); }; coz(n, 0, 1, 2);
        let i = 0; oto = setInterval(() => { if (i >= h.length) { clearInterval(oto); oto = null; return; } tasi(...h[i++]); yaz(); }, Math.max(120, 900 - n * 100));
      };
      kur();
      return () => { clearInterval(oto); t.ro.disconnect(); };
    },
  };
})(MC.bilsemEtkinlik);
