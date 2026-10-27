/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — ETKİLEŞİMLİ ETKİNLİKLER (2)
   Lise: sayma yolları, tarife karşılaştırma (doğrusal), Venn kural oyunu,
   karesel modelleme, trigonometri ve dönme dolap, ters fonksiyon aynası,
   matematik haritası. Ortak yardımcılar bilsem-etkinlik.js'de (MC.bilsemYardim).
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemEtkinlik = MC.bilsemEtkinlik || {};
(function (E) {
  const U = MC.ui, Ses = MC.Ses, Y = MC.bilsemYardim, R = Y.RENK;

  /* Koordinat düzlemi yardımcısı: dünya koordinatlarını tuvale çevirir */
  function duzlem(g, W, H, xa, xb, ya, yb, pad = { l: 44, r: 14, t: 14, b: 30 }) {
    const X = (x) => pad.l + ((x - xa) / (xb - xa)) * (W - pad.l - pad.r), Yy = (y) => H - pad.b - ((y - ya) / (yb - ya)) * (H - pad.t - pad.b);
    return { X, Y: Yy, pad,
      izgara(dx, dy, etiket = true) {
        g.lineWidth = 1; g.strokeStyle = "rgba(150,180,255,.08)";
        for (let x = Math.ceil(xa / dx) * dx; x <= xb + 1e-9; x += dx) { g.beginPath(); g.moveTo(X(x), Yy(ya)); g.lineTo(X(x), Yy(yb)); g.stroke(); if (etiket) Y.yazi(g, String(+x.toFixed(2)), X(x), H - pad.b + 16, { boyut: 11, hiza: "center", renk: R.soluk, kalin: 400 }); }
        for (let y = Math.ceil(ya / dy) * dy; y <= yb + 1e-9; y += dy) { g.beginPath(); g.moveTo(X(xa), Yy(y)); g.lineTo(X(xb), Yy(y)); g.stroke(); if (etiket) Y.yazi(g, String(+y.toFixed(2)), pad.l - 6, Yy(y) + 4, { boyut: 11, hiza: "right", renk: R.soluk, kalin: 400 }); }
        g.strokeStyle = "rgba(150,180,255,.4)"; g.lineWidth = 1.4; g.beginPath();
        if (ya <= 0 && yb >= 0) { g.moveTo(X(xa), Yy(0)); g.lineTo(X(xb), Yy(0)); }
        if (xa <= 0 && xb >= 0) { g.moveTo(X(0), Yy(ya)); g.lineTo(X(0), Yy(yb)); }
        g.stroke();
      },
      egri(f, renk, kalin = 2.4, a = xa, b = xb, kesik) {
        g.strokeStyle = renk; g.lineWidth = kalin; g.setLineDash(kesik || []); g.beginPath(); let ilk = true;
        const n = 400;
        for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n, y = f(x); if (!isFinite(y) || y < ya - (yb - ya) || y > yb + (yb - ya)) { ilk = true; continue; } ilk ? g.moveTo(X(x), Yy(y)) : g.lineTo(X(x), Yy(y)); ilk = false; }
        g.stroke(); g.setLineDash([]);
      },
      nokta(x, y, renk, r = 5) { g.fillStyle = renk; g.beginPath(); g.arc(X(x), Yy(y), r, 0, 7); g.fill(); },
    };
  }

  /* ===================================================================
     SAYMA YOLLARI — ızgarada en kısa yollar ve Pascal üçgeni
     =================================================================== */
  E.sayma = {
    ad: "Izgarada Yollar",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, "", `
        <p class="e-soru">Sol alttan sağ üste yalnızca → ve ↑ ile kaç farklı yol var?</p>
        <div class="satir"><label>Genişlik: <span class="e-deger" id="syMd">3</span><input type="range" id="syM" min="1" max="8" value="3"></label><label>Yükseklik: <span class="e-deger" id="syNd">3</span><input type="range" id="syN" min="1" max="8" value="3"></label></div>
        <div class="satir"><button class="btn btn-etkinlik" id="sySay">Sayıları yay</button><button class="btn btn-hayalet" id="syYol">Rastgele yol</button><button class="btn btn-hayalet" id="sySil">Engelleri kaldır</button></div>
        <div><span class="e-not">Toplam yol</span><div class="e-buyuk" id="syTop">?</div><div class="mono soluk" id="syYolYazi" style="min-height:1.4em"></div></div>
        <label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="syKomb"> Kombinasyon bağlantısını göster</label>
        <p class="e-not" id="syKombYazi" hidden></p>
        <p class="e-not">Bir kavşağa dokun: engel olur (o noktadan geçilemez). Strateji nasıl değişir?</p>`);
      let m = 3, n = 3, engel = new Set(), goster = -1, yol = null, anim = null;
      const say = () => { const d = []; for (let i = 0; i <= m; i++) { d.push([]); for (let j = 0; j <= n; j++) d[i][j] = engel.has(i + "," + j) ? 0 : i === 0 && j === 0 ? 1 : (i ? d[i - 1][j] : 0) + (j ? d[i][j - 1] : 0); } return d; };
      const komb = (a, b) => { let r = 1; for (let i = 1; i <= b; i++) r = (r * (a - b + i)) / i; return Math.round(r); };
      let geo = null;
      const t = Y.tuval(sol, .75, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const k = Math.min((W - 60) / m, (H - 60) / n), x0 = (W - k * m) / 2, y0 = H - (H - k * n) / 2;
        geo = { k, x0, y0 };
        const P = (i, j) => [x0 + i * k, y0 - j * k];
        g.strokeStyle = "rgba(150,180,255,.35)"; g.lineWidth = 2;
        for (let i = 0; i <= m; i++) { g.beginPath(); g.moveTo(...P(i, 0)); g.lineTo(...P(i, n)); g.stroke(); }
        for (let j = 0; j <= n; j++) { g.beginPath(); g.moveTo(...P(0, j)); g.lineTo(...P(m, j)); g.stroke(); }
        if (yol) { g.strokeStyle = R.kirmizi; g.lineWidth = 5; g.lineCap = "round"; g.beginPath(); g.moveTo(...P(0, 0)); let i = 0, j = 0; for (const c of yol) { c === "S" ? i++ : j++; g.lineTo(...P(i, j)); } g.stroke(); }
        const d = say();
        for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) {
          const [x, y] = P(i, j), e = engel.has(i + "," + j), acik = goster >= i + j;
          g.fillStyle = e ? R.kirmizi : acik ? vurgu : "rgba(150,180,255,.25)";
          const r = Math.min(18, k * .28); g.beginPath(); g.arc(x, y, e ? r * .7 : r, 0, 7); g.fill();
          if (e) { g.strokeStyle = R.zemin; g.lineWidth = 3; g.beginPath(); g.moveTo(x - r * .4, y - r * .4); g.lineTo(x + r * .4, y + r * .4); g.moveTo(x + r * .4, y - r * .4); g.lineTo(x - r * .4, y + r * .4); g.stroke(); }
          else if (acik) Y.yazi(g, String(d[i][j]), x, y + 1, { boyut: Math.min(16, r * .95), hiza: "center", taban: "middle", renk: R.zemin, kalin: 800 });
        }
        Y.yazi(g, "BAŞLA", ...P(0, 0).map((v, z) => v + (z ? 26 : 0)), { boyut: 11, hiza: "center", renk: R.soluk });
        Y.yazi(g, "BİTİŞ", ...P(m, n).map((v, z) => v + (z ? -22 : 0)), { boyut: 11, hiza: "center", renk: R.soluk });
      });
      const yenile = () => {
        m = +U.$("#syM", el).value; n = +U.$("#syN", el).value; U.$("#syMd", el).textContent = m; U.$("#syNd", el).textContent = n;
        for (const e of [...engel]) { const [i, j] = e.split(",").map(Number); if (i > m || j > n) engel.delete(e); }
        const d = say(); U.$("#syTop", el).textContent = goster >= m + n ? d[m][n] : "?";
        U.$("#syKombYazi", el).textContent = `Her yol ${m} tane → ve ${n} tane ↑ içeren bir dizidir. ${m + n} adımın hangi ${m} tanesinin → olacağını seçmek: C(${m + n}, ${m}) = ${komb(m + n, m)}${engel.size ? " (engelsiz ızgarada)" : ""}.`;
        t.boyut();
      };
      const yay = () => { cancelAnimationFrame(anim); goster = -1; let son = 0; const d = (z) => { if (z - son > 380) { son = z; goster++; Ses.efekt("tik"); yenile(); } if (goster < m + n) anim = requestAnimationFrame(d); else Ses.efekt("dogru"); }; anim = requestAnimationFrame(d); };
      t.cv.addEventListener("pointerdown", (e) => {
        if (!geo) return; const r = t.cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        const i = Math.round((x - geo.x0) / geo.k), j = Math.round((geo.y0 - y) / geo.k);
        if (i < 0 || j < 0 || i > m || j > n || (i === 0 && j === 0) || (i === m && j === n)) return;
        if (Math.hypot(x - (geo.x0 + i * geo.k), y - (geo.y0 - j * geo.k)) > geo.k * .4) return;
        const key = i + "," + j; engel.has(key) ? engel.delete(key) : engel.add(key); yol = null; Ses.efekt("sec"); yenile();
      });
      U.$("#syM", el).oninput = () => { goster = -1; yol = null; yenile(); }; U.$("#syN", el).oninput = U.$("#syM", el).oninput;
      U.$("#sySay", el).onclick = yay;
      U.$("#sySil", el).onclick = () => { engel.clear(); yol = null; yenile(); };
      U.$("#syYol", el).onclick = () => {
        const d = say(); if (!d[m][n]) { U.bildir("Engeller yüzünden hiç yol kalmadı!"); return; }
        /* Engelleri dikkate alan rastgele yol: sondan geriye, gelen yol sayısıyla orantılı seçim */
        const s = []; let i = m, j = n; while (i || j) { const a = i ? d[i - 1][j] : 0, b = j ? d[i][j - 1] : 0; if (Math.random() * (a + b) < a) { s.unshift("S"); i--; } else { s.unshift("Y"); j--; } }
        yol = s; U.$("#syYolYazi", el).textContent = s.map((c) => (c === "S" ? "→" : "↑")).join(" "); Ses.efekt("sec"); yenile();
      };
      U.$("#syKomb", el).onchange = (e) => (U.$("#syKombYazi", el).hidden = !e.target.checked);
      yenile();
      return () => { cancelAnimationFrame(anim); t.ro.disconnect(); };
    },
  };

  /* ===================================================================
     TARİFE KARŞILAŞTIRMA — doğrusal fonksiyonlar, kesişim, karar
     =================================================================== */
  E.tarife = {
    ad: "Tarife Karşılaştırma",
    kur(el) {
      const SEN = {
        taksi: { ad: "Taksi", x: "yol (km)", y: "ücret (TL)", xm: 20, p: [["A Taksi", 40, 25], ["B Taksi", 70, 20], ["Sabit fiyat", 300, 0]] },
        telefon: { ad: "Telefon", x: "konuşma (saat)", y: "fatura (TL)", xm: 40, p: [["Paket 1", 100, 6], ["Paket 2", 180, 3], ["Sınırsız", 260, 0]] },
        spor: { ad: "Spor salonu", x: "ziyaret (gün)", y: "ödeme (TL)", xm: 30, p: [["Günlük bilet", 0, 60], ["Üye", 400, 25], ["Aylık sınırsız", 1100, 0]] },
      };
      const RNK = [R.kirmizi, R.altin, R.turkuaz];
      let s = "taksi", p = SEN.taksi.p.map((x) => [...x]), xs = 6;
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="tfSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru">Hangi seçenek ne zaman daha ucuz?</p>
        <div id="tfPlan" style="display:grid;gap:10px"></div>
        <label>${"Değer"}: <span class="e-deger" id="tfXd"></span><input type="range" id="tfX" min="0" max="20" value="6"></label>
        <table class="e-tablo" id="tfTab"></table>
        <p class="e-not" id="tfKarar"></p>`);
      const t = Y.tuval(sol, .62, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const S2 = SEN[s], xm = S2.xm, ym = Math.max(...p.map(([, a, b]) => a + b * xm)) * 1.1;
        const D = duzlem(g, W, H, 0, xm, 0, ym, { l: 52, r: 16, t: 14, b: 36 });
        const adim = (v) => { const e = Math.pow(10, Math.floor(Math.log10(v))); return v / e > 5 ? e * 2 : v / e > 2 ? e : e / 2; };
        D.izgara(adim(xm / 2), adim(ym / 2));
        /* en ucuz bölge şeridi */
        for (let px = D.pad.l; px < W - D.pad.r; px += 2) { const x = ((px - D.pad.l) / (W - D.pad.l - D.pad.r)) * xm; let en = 0; p.forEach(([, a, b], i) => { if (a + b * x < p[en][1] + p[en][2] * x) en = i; }); g.fillStyle = RNK[en]; g.globalAlpha = .55; g.fillRect(px, H - D.pad.b + 22, 2, 6); }
        g.globalAlpha = 1;
        p.forEach(([ad, a, b], i) => D.egri((x) => a + b * x, RNK[i], 2.6));
        let ke = 0;
        for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) { const [, a1, b1] = p[i], [, a2, b2] = p[j]; if (b1 === b2) continue; const x = (a2 - a1) / (b1 - b2); if (x > 0 && x < xm) { D.nokta(x, a1 + b1 * x, R.metin, 4); Y.yazi(g, `x ≈ ${(+x.toFixed(1)).toLocaleString("tr-TR")}`, D.X(x) + 6, D.Y(a1 + b1 * x) - 8 - 16 * ke++, { boyut: 11, renk: R.metin, kalin: 600 }); } }
        g.strokeStyle = "rgba(238,243,255,.5)"; g.setLineDash([4, 5]); g.beginPath(); g.moveTo(D.X(xs), D.Y(0)); g.lineTo(D.X(xs), D.Y(ym)); g.stroke(); g.setLineDash([]);
        p.forEach(([, a, b], i) => D.nokta(xs, a + b * xs, RNK[i], 6));
        Y.yazi(g, S2.y, D.pad.l + 6, 12, { boyut: 12, renk: R.soluk, kalin: 400, taban: "top" }); Y.yazi(g, S2.x + " →", W - 16, H - D.pad.b - 6, { boyut: 12, renk: R.soluk, hiza: "right", kalin: 400 });
      });
      const plan = () => {
        U.$("#tfPlan", el).innerHTML = p.map(([ad, a, b], i) => `<div class="panel-ic" style="border-color:${RNK[i]}"><b style="color:${RNK[i]}">${ad}</b> <span class="mono soluk">y = ${a} + ${b}x</span>
          <label>Sabit: <span class="e-deger">${a}</span><input type="range" data-i="${i}" data-k="1" min="0" max="${Math.max(1200, a * 2)}" step="10" value="${a}"></label>
          <label>Birim ücret: <span class="e-deger">${b}</span><input type="range" data-i="${i}" data-k="2" min="0" max="${Math.max(80, b * 2)}" value="${b}"></label></div>`).join("");
      };
      const yenile = () => {
        const S2 = SEN[s]; xs = +U.$("#tfX", el).value; U.$("#tfXd", el).textContent = `${xs} (${S2.x})`;
        U.$("#tfX", el).max = S2.xm;
        const xler = Array.from({ length: 6 }, (_, i) => Math.round((S2.xm * i) / 5));
        U.$("#tfTab", el).innerHTML = `<thead><tr><th>${S2.x}</th>${p.map(([ad], i) => `<th style="color:${RNK[i]}">${ad}</th>`).join("")}</tr></thead><tbody>${xler.map((x) => `<tr><td>${x}</td>${p.map(([, a, b]) => `<td>${a + b * x}</td>`).join("")}</tr>`).join("")}</tbody>`;
        const ucret = p.map(([ad, a, b]) => [ad, a + b * xs]).sort((u, v) => u[1] - v[1]);
        U.$("#tfKarar", el).innerHTML = `${xs} ${S2.x.split(" ")[0]} için en ucuz: <b style="color:var(--renk)">${ucret[0][0]}</b> (${ucret[0][1]} TL). Alttaki renkli şerit her aralıkta en ucuz seçeneği gösterir.`;
        t.boyut();
      };
      U.$("#tfPlan", el).addEventListener("input", (e) => { const r = e.target; if (r.dataset.i === undefined) return; p[+r.dataset.i][+r.dataset.k] = +r.value; r.previousElementSibling.textContent = r.value; r.closest(".panel-ic").querySelector(".mono").textContent = `y = ${p[+r.dataset.i][1]} + ${p[+r.dataset.i][2]}x`; yenile(); });
      U.$("#tfX", el).oninput = yenile;
      U.segment(U.$("#tfSec", el), Object.entries(SEN).map(([k, v]) => [k, v.ad]), "taksi", (v) => { s = v; p = SEN[v].p.map((x) => [...x]); U.$("#tfX", el).value = Math.round(SEN[v].xm / 3); plan(); yenile(); });
      plan(); yenile();
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     VENN KURAL OYUNU — gizli kümeler, boş küme, evrensel küme
     =================================================================== */
  E.venn = {
    ad: "Kümelerin Gizli Kuralı",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const KURAL = [
        ["çift sayılar", (n) => n % 2 === 0], ["tek sayılar", (n) => n % 2 === 1], ["3'ün katları", (n) => n % 3 === 0], ["5'in katları", (n) => n % 5 === 0],
        ["asal sayılar", (n) => n > 1 && [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].includes(n)], ["tam kareler", (n) => Number.isInteger(Math.sqrt(n))], ["15'ten büyükler", (n) => n > 15],
        ["rakamları toplamı 5 olanlar", (n) => String(n).split("").reduce((a, c) => a + +c, 0) === 5], ["4'ün katları", (n) => n % 4 === 0], ["10'dan küçükler", (n) => n < 10],
      ];
      const { sol, sag } = Y.duzen(el, `<div class="e-kartlar" id="vnKart" style="margin-top:10px"></div>`, `
        <p class="e-soru">Evrensel küme E = {1, 2, …, 30}. A ve B kümelerinin kuralı gizli. Sayıları doğru bölgeye yerleştir, kuralı bul!</p>
        <div class="segment" id="vnMod"></div>
        <div class="satir"><button class="btn btn-etkinlik" id="vnSira">Sıradaki sayıyı göster</button><button class="btn btn-hayalet" id="vnYeni">Yeni kurallar</button></div>
        <div class="satir"><button class="btn btn-hayalet" id="vnBos">Boş kesişimli kurallar</button><button class="btn btn-hayalet" id="vnAc">Kuralları göster</button></div>
        <div class="panel-ic" id="vnKurallar">A = ? · B = ?</div>
        <p class="e-not" id="vnDurum"></p>`);
      let A = 0, B = 2, yerlesen = new Map(), kalan = [], secili = null, mod = "ogretmen", geo = null;
      const bolge = (n) => (KURAL[A][1](n) ? (KURAL[B][1](n) ? "AB" : "A") : KURAL[B][1](n) ? "B" : "D");
      const t = Y.tuval(sol, .62, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const r = Math.min(W * .22, H * .36), cx = W * .4, cy = H / 2 + 6, d = r * .62;
        geo = { r, ax: cx - d, bx: cx + d, cy, W, H };
        g.strokeStyle = "rgba(150,180,255,.35)"; g.lineWidth = 2; g.strokeRect(10, 10, W - 20, H - 20);
        Y.yazi(g, "E", 22, 32, { boyut: 18, renk: R.soluk, kalin: 800 });
        [[geo.ax, R.mavi, "A"], [geo.bx, R.altin, "B"]].forEach(([x, c, ad]) => { g.fillStyle = c; g.globalAlpha = .12; g.beginPath(); g.arc(x, cy, r, 0, 7); g.fill(); g.globalAlpha = 1; g.strokeStyle = c; g.lineWidth = 2.5; g.beginPath(); g.arc(x, cy, r, 0, 7); g.stroke(); Y.yazi(g, ad, x + (ad === "A" ? -r * .7 : r * .7), cy - r * .82, { boyut: 22, hiza: "center", renk: c, kalin: 800 }); });
        const gruplar = { A: [], B: [], AB: [], D: [] };
        for (const [n, b] of yerlesen) gruplar[b].push(n);
        const merkez = { A: [geo.ax - r * .38, cy], B: [geo.bx + r * .38, cy], AB: [cx, cy], D: [(geo.bx + r + W - 10) / 2, cy] };
        const disSut = Math.max(1, Math.floor((W - 10 - (geo.bx + r) - 8) / 34));
        for (const [b, l] of Object.entries(gruplar)) l.sort((x, y) => x - y).forEach((n, i) => {
          const sut = b === "AB" ? 2 : b === "D" ? disSut : 3, [mx, my] = merkez[b], x = mx + ((i % sut) - (sut - 1) / 2) * 34, y = my + (Math.floor(i / sut) - (Math.ceil(l.length / sut) - 1) / 2) * 30;
          g.fillStyle = R.panel || "#142a57"; g.beginPath(); g.arc(x, y, 14, 0, 7); g.fill(); Y.yazi(g, String(n), x, y + 1, { boyut: 14, hiza: "center", taban: "middle", kalin: 800 });
        });
        if (!gruplar.AB.length && yerlesen.size > 6) Y.yazi(g, "A ∩ B = ∅ ?", cx, cy + r * .9, { boyut: 13, hiza: "center", renk: R.soluk });
      });
      const kartlar = () => {
        U.$("#vnKart", el).innerHTML = mod === "ogrenci" ? kalan.map((n) => `<button class="e-kart${secili === n ? " dogru" : ""}" data-n="${n}">${n}</button>`).join("") : "";
        U.$("#vnDurum", el).textContent = `Yerleşen: ${yerlesen.size} / 30` + (mod === "ogrenci" ? " · Önce bir sayıya, sonra bölgeye dokun." : "");
      };
      const yeni = (bos) => {
        do { A = Math.floor(Math.random() * KURAL.length); B = Math.floor(Math.random() * KURAL.length); }
        while (A === B || (bos ? [...Array(30)].some((_, i) => KURAL[A][1](i + 1) && KURAL[B][1](i + 1)) : ![...Array(30)].some((_, i) => KURAL[A][1](i + 1) && KURAL[B][1](i + 1))));
        yerlesen = new Map(); kalan = U.karistir(Array.from({ length: 30 }, (_, i) => i + 1)); secili = null;
        U.$("#vnKurallar", el).textContent = "A = ? · B = ?"; kartlar(); t.boyut(); Ses.efekt("basla");
      };
      t.cv.addEventListener("pointerdown", (e) => {
        if (mod !== "ogrenci" || secili === null || !geo) return;
        const r = t.cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        const inA = Math.hypot(x - geo.ax, y - geo.cy) < geo.r, inB = Math.hypot(x - geo.bx, y - geo.cy) < geo.r;
        const sec = inA && inB ? "AB" : inA ? "A" : inB ? "B" : "D";
        if (sec === bolge(secili)) { yerlesen.set(secili, sec); kalan = kalan.filter((n) => n !== secili); secili = null; Ses.efekt("dogru"); }
        else { Ses.efekt("yanlis"); U.bildir(`${secili} oraya ait değil. Kural ne olabilir?`); }
        kartlar(); t.boyut();
      });
      U.$("#vnKart", el).addEventListener("click", (e) => { const b = e.target.closest("[data-n]"); if (!b) return; secili = +b.dataset.n; Ses.efekt("dokun"); kartlar(); });
      U.$("#vnSira", el).onclick = () => { if (!kalan.length) { U.bildir("Bütün sayılar yerleşti. Kuralları söyleyebilir misiniz?"); return; } const n = kalan.shift(); yerlesen.set(n, bolge(n)); Ses.efekt("sec"); kartlar(); t.boyut(); };
      U.$("#vnYeni", el).onclick = () => yeni(false); U.$("#vnBos", el).onclick = () => yeni(true);
      U.$("#vnAc", el).onclick = () => { const kes = [...Array(30)].map((_, i) => i + 1).filter((n) => bolge(n) === "AB"); U.$("#vnKurallar", el).innerHTML = `A = ${KURAL[A][0]} · B = ${KURAL[B][0]}<br><span class="mono">A ∩ B = ${kes.length ? "{" + kes.join(", ") + "}" : "∅ (boş küme)"}</span>`; Ses.efekt("bitis"); };
      U.segment(U.$("#vnMod", el), [["ogretmen", "Öğretmen yerleştirir"], ["ogrenci", "Öğrenci yerleştirir"]], "ogretmen", (v) => { mod = v; U.$("#vnSira", el).hidden = v === "ogrenci"; kartlar(); });
      yeni(false);
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     KARESEL MODELLEME — çit/alan, duvar kenarı, top atışı
     =================================================================== */
  E.parabol = {
    ad: "Karesel Modelleme",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="pbSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru" id="pbSoru"></p>
        <label id="pbPl">Çit uzunluğu: <span class="e-deger" id="pbPd"></span><input type="range" id="pbP" min="12" max="80" step="2" value="40"></label>
        <label id="pbVl" hidden>İlk hız (m/sn): <span class="e-deger" id="pbVd"></span><input type="range" id="pbV" min="5" max="30" value="20"></label>
        <label><span id="pbXad">Genişlik</span>: <span class="e-deger" id="pbXd"></span><input type="range" id="pbX" min="0" max="20" step=".5" value="5"></label>
        <div class="satir"><div><span class="e-not" id="pbYad">Alan</span><div class="e-buyuk" id="pbYv">–</div></div></div>
        <div class="satir"><button class="btn btn-etkinlik" id="pbTepe">Tepe noktasını göster</button><button class="btn btn-hayalet" id="pbIz">İz bırak</button></div>
        <div class="panel-ic" id="pbF"></div>
        <p class="e-not" id="pbNot"></p>`);
      let tur = "cit", tepe = false, iz = [];
      const M = {
        cit: { soru: "Sabit uzunlukta çitle en büyük dikdörtgen alanı nasıl kurarsın?", xad: "Genişlik x (m)", yad: "Alan (m²)", f: (x, P) => x * (P / 2 - x), xm: (P) => P / 2, tepeX: (P) => P / 4, tex: (P) => `A(x) = x\\,(${P / 2} - x)`, not: "Kökler 0 ve P/2; tepe tam ortada. Sonuç: kare." },
        duvar: { soru: "Bir kenarı duvar olunca en iyi şekil hâlâ kare mi?", xad: "Duvara dik kenar x (m)", yad: "Alan (m²)", f: (x, P) => x * (P - 2 * x), xm: (P) => P / 2, tepeX: (P) => P / 4, tex: (P) => `A(x) = x\\,(${P} - 2x)`, not: "Duvara paralel kenar, dik kenarın iki katı çıkar: kare değil!" },
        top: { soru: "Yukarı atılan top en yüksek noktaya ne zaman ulaşır, ne zaman yere düşer?", xad: "Zaman t (sn)", yad: "Yükseklik (m)", f: (x, P, v) => Math.max(-1e-9, 1.5 + v * x - 5 * x * x), xm: (P, v) => (v + Math.sqrt(v * v + 30)) / 10, tepeX: (P, v) => v / 10, tex: (P, v) => `h(t) = -5t^2 + ${v}t + 1{,}5`, not: "g ≈ 10 m/sn² alındı; −5t² terimi yerçekiminden gelir." },
      };
      const t = Y.tuval(sol, .62, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const P = +U.$("#pbP", el).value, v = +U.$("#pbV", el).value, m = M[tur], x = +U.$("#pbX", el).value, xm = m.xm(P, v), tx = m.tepeX(P, v), ym = m.f(tx, P, v) * 1.15;
        /* sol yarı: fiziksel resim, sağ yarı: grafik */
        const ayir = W > 640 ? W * .38 : 0;
        if (ayir) {
          if (tur === "top") {
            const h = m.f(x, P, v), olc = (H - 60) / ym, zx = ayir / 2, zy = H - 30;
            g.strokeStyle = "rgba(150,180,255,.35)"; g.beginPath(); g.moveTo(20, zy); g.lineTo(ayir - 20, zy); g.stroke();
            g.fillStyle = R.altin; g.beginPath(); g.arc(zx, zy - h * olc, 12, 0, 7); g.fill();
            Y.yazi(g, `${h.toFixed(1)} m`, zx + 18, zy - h * olc + 5, { boyut: 14 });
          } else {
            const a = x, b = tur === "cit" ? P / 2 - x : P - 2 * x, olc = Math.min((ayir - 50) / Math.max(P / 2, 1), (H - 70) / Math.max(P / 2, 1));
            const rx = 25, ry = H / 2 - (a * olc) / 2;
            if (tur === "duvar") { g.fillStyle = "rgba(150,180,255,.3)"; g.fillRect(rx - 10, ry - 8, b * olc + 20, 8); }
            g.fillStyle = vurgu; g.globalAlpha = .25; g.fillRect(rx, ry, b * olc, a * olc); g.globalAlpha = 1;
            g.strokeStyle = vurgu; g.lineWidth = 3; g.beginPath();
            if (tur === "duvar") { g.moveTo(rx, ry); g.lineTo(rx, ry + a * olc); g.lineTo(rx + b * olc, ry + a * olc); g.lineTo(rx + b * olc, ry); } else g.rect(rx, ry, b * olc, a * olc);
            g.stroke();
            Y.yazi(g, `${(+b.toFixed(1)).toLocaleString("tr-TR")} m`, rx + (b * olc) / 2, ry + a * olc + 18, { boyut: 13, hiza: "center", renk: R.soluk });
            Y.yazi(g, `${(+a.toFixed(1)).toLocaleString("tr-TR")} m`, rx + b * olc + 8, ry + (a * olc) / 2, { boyut: 13, renk: R.soluk, taban: "middle" });
          }
        }
        g.save(); g.translate(ayir, 0);
        const D = duzlem(g, W - ayir, H, 0, xm, 0, ym, { l: 46, r: 14, t: 14, b: 30 });
        const ad = (q) => { const e = Math.pow(10, Math.floor(Math.log10(q))); return q / e > 5 ? e * 2 : q / e > 2 ? e : e / 2; };
        D.izgara(ad(xm / 3), ad(ym / 3));
        D.egri((q) => m.f(q, P, v), vurgu, 2.6, 0, xm);
        for (const [a, b] of iz) D.nokta(a, b, "rgba(255,198,87,.6)", 3);
        D.nokta(x, m.f(x, P, v), R.kirmizi, 7);
        if (tepe) { D.nokta(tx, m.f(tx, P, v), R.altin, 8); g.strokeStyle = R.altin; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(D.X(tx), D.Y(0)); g.lineTo(D.X(tx), D.Y(m.f(tx, P, v))); g.stroke(); g.setLineDash([]); Y.yazi(g, `tepe: (${(+tx.toFixed(2)).toLocaleString("tr-TR")} ; ${(+m.f(tx, P, v).toFixed(2)).toLocaleString("tr-TR")})`, D.X(tx) + 8, D.Y(m.f(tx, P, v)) - 10, { boyut: 13, renk: R.altin }); }
        g.restore();
      });
      const yenile = () => {
        const P = +U.$("#pbP", el).value, v = +U.$("#pbV", el).value, m = M[tur], xm = m.xm(P, v), xr = U.$("#pbX", el);
        xr.max = +xm.toFixed(2); xr.step = tur === "top" ? .05 : .5; if (+xr.value > xm) xr.value = xm;
        const x = +xr.value;
        U.$("#pbPd", el).textContent = `${P} m`; U.$("#pbVd", el).textContent = v; U.$("#pbXd", el).textContent = (+x.toFixed(2)).toLocaleString("tr-TR");
        U.$("#pbXad", el).textContent = m.xad; U.$("#pbYad", el).textContent = m.yad; U.$("#pbYv", el).textContent = (+m.f(x, P, v).toFixed(2)).toLocaleString("tr-TR");
        U.$("#pbSoru", el).textContent = m.soru; U.$("#pbNot", el).textContent = tepe ? m.not : "";
        U.$("#pbPl", el).hidden = tur === "top"; U.$("#pbVl", el).hidden = tur !== "top";
        U.texYaz(U.$("#pbF", el), m.tex(P, v));
        t.boyut();
      };
      U.segment(U.$("#pbSec", el), [["cit", "Çit ve alan"], ["duvar", "Duvar kenarında bahçe"], ["top", "Top atışı"]], "cit", (v) => { tur = v; tepe = false; iz = []; U.$("#pbX", el).value = v === "top" ? .5 : 5; yenile(); });
      ["#pbP", "#pbV"].forEach((s) => (U.$(s, el).oninput = () => { iz = []; yenile(); }));
      U.$("#pbX", el).oninput = yenile;
      U.$("#pbTepe", el).onclick = () => { tepe = !tepe; U.$("#pbTepe", el).textContent = tepe ? "Tepeyi gizle" : "Tepe noktasını göster"; Ses.efekt("sec"); yenile(); };
      U.$("#pbIz", el).onclick = () => { const P = +U.$("#pbP", el).value, v = +U.$("#pbV", el).value, x = +U.$("#pbX", el).value; iz.push([x, M[tur].f(x, P, v)]); Ses.efekt("tik"); yenile(); };
      yenile();
      return () => t.ro.disconnect();
    },
  };

  /* ===================================================================
     TRİGONOMETRİ — dik üçgen, birim çember, dönme dolap
     =================================================================== */
  E.trigo = {
    ad: "Trigonometri Laboratuvarı",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="trSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru" id="trSoru"></p>
        <label>Açı θ: <span class="e-deger" id="trAd">35°</span><input type="range" id="trA" min="1" max="89" value="35"></label>
        <label id="trOl">Üçgenin büyüklüğü: <span class="e-deger" id="trOd">1</span><input type="range" id="trO" min="1" max="3" step=".1" value="2"></label>
        <table class="e-tablo" id="trTab"></table>
        <button class="btn btn-hayalet" id="trDon">▶ Açıyı süpür</button>
        <p class="e-not" id="trNot"></p>`);
      let tur = "ucgen", anim = null;
      const t = Y.tuval(sol, .62, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const d = +U.$("#trA", el).value, a = (d * Math.PI) / 180, s = Math.sin(a), c = Math.cos(a), olc = +U.$("#trO", el).value;
        if (tur === "ucgen") {
          const Lmax = Math.min((W - 170) / c, (H - 70) / s, W * .9), Lp = Lmax * (.45 + .55 * (olc - 1) / 2), x0 = 60, y0 = H - 40;
          const C = [x0 + c * Lp, y0 - s * Lp];
          g.fillStyle = R.turkuaz; g.globalAlpha = .1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(C[0], y0); g.lineTo(...C); g.closePath(); g.fill(); g.globalAlpha = 1;
          g.lineWidth = 3; g.strokeStyle = R.altin; g.beginPath(); g.moveTo(x0, y0); g.lineTo(C[0], y0); g.stroke();
          g.strokeStyle = R.kirmizi; g.beginPath(); g.moveTo(C[0], y0); g.lineTo(...C); g.stroke();
          g.strokeStyle = R.turkuaz; g.beginPath(); g.moveTo(x0, y0); g.lineTo(...C); g.stroke();
          g.strokeStyle = R.metin; g.lineWidth = 1.5; g.strokeRect(C[0] - 12, y0 - 12, 12, 12);
          g.beginPath(); g.arc(x0, y0, 34, -a, 0); g.stroke(); Y.yazi(g, "θ", x0 + 40, y0 - 8, { boyut: 16, renk: R.metin });
          const H2 = 1.9 * olc;
          Y.yazi(g, `komşu = ${(c * H2).toFixed(2)}`, (x0 + C[0]) / 2, y0 + 20, { boyut: 13, hiza: "center", renk: R.altin });
          Y.yazi(g, `karşı = ${(s * H2).toFixed(2)}`, C[0] + 10, (y0 + C[1]) / 2, { boyut: 13, renk: R.kirmizi, taban: "middle" });
          const nx = -s, ny = -c, mx2 = (x0 + C[0]) / 2 + nx * 18, my2 = (y0 + C[1]) / 2 + ny * 18;
          Y.yazi(g, `hipotenüs = ${H2.toFixed(2)}`, Math.max(8, mx2 - 60), my2, { boyut: 13, renk: R.turkuaz });
        } else if (tur === "cember") {
          const r = Math.min(W * .2, H * .38), cx = r + 34, cy = H / 2;
          g.strokeStyle = "rgba(150,180,255,.35)"; g.lineWidth = 1.5; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke();
          g.beginPath(); g.moveTo(cx - r - 10, cy); g.lineTo(cx + r + 10, cy); g.moveTo(cx, cy - r - 10); g.lineTo(cx, cy + r + 10); g.stroke();
          const px = cx + r * c, py = cy - r * s;
          g.lineWidth = 3; g.strokeStyle = R.altin; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, cy); g.stroke();
          g.strokeStyle = R.kirmizi; g.beginPath(); g.moveTo(px, cy); g.lineTo(px, py); g.stroke();
          g.strokeStyle = R.turkuaz; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, py); g.stroke();
          g.fillStyle = R.metin; g.beginPath(); g.arc(px, py, 6, 0, 7); g.fill();
          /* sağda sinüs eğrisi */
          const gx = cx + r + 34, gw = W - gx - 16;
          if (gw > 80) {
            g.strokeStyle = "rgba(150,180,255,.35)"; g.lineWidth = 1; g.beginPath(); g.moveTo(gx, cy); g.lineTo(gx + gw, cy); g.stroke();
            [90, 180, 270, 360].forEach((q) => Y.yazi(g, q + "°", gx + (q / 360) * gw, cy + 16, { boyut: 11, hiza: "center", renk: R.soluk, kalin: 400 }));
            g.strokeStyle = "rgba(150,180,255,.15)"; g.setLineDash([2, 5]); g.beginPath(); g.moveTo(gx, cy - r); g.lineTo(gx + gw, cy - r); g.moveTo(gx, cy + r); g.lineTo(gx + gw, cy + r); g.stroke(); g.setLineDash([]);
            g.strokeStyle = R.kirmizi; g.lineWidth = 2.4; g.beginPath(); for (let i = 0; i <= d; i++) { const x = gx + (i / 360) * gw, y = cy - r * Math.sin((i * Math.PI) / 180); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
            g.strokeStyle = R.altin; g.beginPath(); for (let i = 0; i <= d; i++) { const x = gx + (i / 360) * gw, y = cy - r * Math.cos((i * Math.PI) / 180); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
            g.setLineDash([4, 4]); g.strokeStyle = "rgba(238,243,255,.4)"; g.beginPath(); g.moveTo(px, py); g.lineTo(gx + (d / 360) * gw, py); g.stroke(); g.setLineDash([]);
            Y.yazi(g, "sin θ", gx + gw - 4, cy - r - 6, { boyut: 13, hiza: "right", renk: R.kirmizi }); Y.yazi(g, "cos θ", gx + gw - 4, cy - r + 12, { boyut: 13, hiza: "right", renk: R.altin });
          }
          Y.yazi(g, "sin²θ + cos²θ = 1", 16, H - 14, { boyut: 14, renk: R.soluk });
        } else {
          /* dönme dolap: yarıçap 20 m, merkez 25 m, 1 tur = 8 dk */
          const r = Math.min(W * .22, H * .34), cx = r + 40, cy = H / 2 - 4, ang = (d / 90) * 2 * Math.PI;
          g.strokeStyle = "rgba(150,180,255,.4)"; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke();
          for (let i = 0; i < 8; i++) { const q = ang + (i * Math.PI) / 4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + r * Math.cos(q), cy - r * Math.sin(q)); g.stroke(); g.fillStyle = i ? "rgba(150,180,255,.4)" : R.altin; g.beginPath(); g.arc(cx + r * Math.cos(q - Math.PI / 2), cy - r * Math.sin(q - Math.PI / 2), i ? 6 : 10, 0, 7); g.fill(); }
          g.strokeStyle = "rgba(150,180,255,.3)"; g.beginPath(); g.moveTo(cx - 30, cy + r + 24); g.lineTo(cx, cy); g.lineTo(cx + 30, cy + r + 24); g.stroke();
          const gx = cx + r + 50, gw = W - gx - 20, yuk = (q) => 25 - 20 * Math.cos(q), yy = (h) => cy + r - (h / 45) * (2 * r);
          if (gw > 80) {
            g.strokeStyle = "rgba(150,180,255,.3)"; g.lineWidth = 1; g.beginPath(); g.moveTo(gx, yy(0)); g.lineTo(gx + gw, yy(0)); g.stroke();
            g.strokeStyle = R.altin; g.lineWidth = 2.4; g.beginPath(); for (let i = 0; i <= 200; i++) { const q = (i / 200) * 2 * Math.PI * 2, x = gx + (i / 200) * gw; i ? g.lineTo(x, yy(yuk(q))) : g.moveTo(x, yy(yuk(q))); } g.stroke();
            const xn = gx + ((ang % (4 * Math.PI)) / (4 * Math.PI)) * gw; g.fillStyle = R.kirmizi; g.beginPath(); g.arc(xn, yy(yuk(ang)), 6, 0, 7); g.fill();
            Y.yazi(g, `h = ${yuk(ang).toFixed(1)} m · t = ${((ang / (2 * Math.PI)) * 8).toFixed(1)} dk`, gx, 20, { boyut: 13, renk: R.metin });
            Y.yazi(g, "iki tur →", gx + gw, yy(0) + 18, { boyut: 12, hiza: "right", renk: R.soluk, kalin: 400 });
          }
        }
      });
      const yenile = () => {
        const d = +U.$("#trA", el).value, a = (d * Math.PI) / 180, s = Math.sin(a), c = Math.cos(a);
        U.$("#trAd", el).textContent = tur === "dolap" ? `${Math.round((d / 90) * 360)}° dönüş` : `${d}°`; U.$("#trOd", el).textContent = U.$("#trO", el).value;
        U.$("#trOl", el).hidden = tur !== "ucgen";
        const ar = U.$("#trA", el); ar.max = tur === "cember" ? 360 : 89; if (+ar.value > +ar.max) ar.value = ar.max;
        const f = (x) => (Math.abs(x) > 999 ? "∞" : x.toFixed(3).replace(".", ","));
        U.$("#trTab", el).innerHTML = tur === "dolap" ? `<tbody><tr><td>yükseklik modeli</td><td>h(t) = 25 − 20·cos(2πt/8)</td></tr><tr><td>en alçak / en yüksek</td><td>5 m / 45 m</td></tr></tbody>`
          : `<thead><tr><th>oran</th><th>değer</th></tr></thead><tbody><tr><td>sin θ = karşı / hip.</td><td>${f(s)}</td></tr><tr><td>cos θ = komşu / hip.</td><td>${f(c)}</td></tr><tr><td>tan θ = karşı / komşu</td><td>${f(s / c)}</td></tr><tr><td>cot θ = komşu / karşı</td><td>${f(c / s)}</td></tr><tr><td>sin²θ + cos²θ</td><td>${f(s * s + c * c)}</td></tr></tbody>`;
        U.$("#trSoru", el).textContent = { ucgen: "Üçgeni büyütünce kenarlar değişiyor. Oranlar değişiyor mu?", cember: "Hipotenüs 1 olunca sin ve cos neyi ölçer?", dolap: "Kabinin yüksekliği zamanla nasıl değişir? Grafik neden dalga?" }[tur];
        U.$("#trNot", el).textContent = { ucgen: "İpucu: aynı açıyla büyütülen üçgenler benzerdir; oranlar sabit kalır. 30°, 45°, 60° için değerleri kaydedin.", cember: "sin(90° − θ) = cos θ: kırmızı ve altın eğriler birbirinin aynası.", dolap: "Yarıçap 20 m, merkez 25 m yükseklikte, bir tur 8 dakika. Açı kaydırıcısı dönüşü gösterir." }[tur];
        t.boyut();
      };
      U.segment(U.$("#trSec", el), [["ucgen", "Dik üçgen"], ["cember", "Birim çember"], ["dolap", "Dönme dolap"]], "ucgen", (v) => { tur = v; yenile(); });
      U.$("#trA", el).oninput = yenile; U.$("#trO", el).oninput = yenile;
      U.$("#trDon", el).onclick = () => { cancelAnimationFrame(anim); const son = +U.$("#trA", el).max; let d = 1; const ad = () => { d += son / 150; U.$("#trA", el).value = Math.min(son, d); yenile(); if (d < son) anim = requestAnimationFrame(ad); }; ad(); };
      yenile();
      return () => { cancelAnimationFrame(anim); t.ro.disconnect(); };
    },
  };

  /* ===================================================================
     TERS FONKSİYON AYNASI — y = x doğrusuna göre yansıma
     =================================================================== */
  E.ters = {
    ad: "Ters Fonksiyon Aynası",
    kur(el) {
      const vurgu = Y.vurgu(el);
      const F = {
        dogrusal: { ad: "f(x) = 2x + 1", f: (x) => 2 * x + 1, g: (y) => (y - 1) / 2, ters: "f⁻¹(x) = (x − 1) / 2", bb: true },
        kesir: { ad: "f(x) = (x − 3) / 2", f: (x) => (x - 3) / 2, g: (y) => 2 * y + 3, ters: "f⁻¹(x) = 2x + 3", bb: true },
        kare: { ad: "f(x) = x²", f: (x) => x * x, g: (y) => Math.sqrt(y), ters: "Tersi yok: bire bir değil (yatay doğru testi)", bb: false, kisit: "x ≥ 0 için f⁻¹(x) = √x" },
        kup: { ad: "f(x) = x³", f: (x) => x ** 3, g: (y) => Math.cbrt(y), ters: "f⁻¹(x) = ∛x", bb: true },
        ustel: { ad: "f(x) = 2ˣ", f: (x) => 2 ** x, g: (y) => Math.log2(y), ters: "f⁻¹(x) = log₂ x", bb: true },
      };
      let s = "dogrusal", katla = 1, anim = null;
      const { sol, sag } = Y.duzen(el, `<div class="segment" id="tsSec" style="margin-bottom:12px"></div>`, `
        <p class="e-soru">Bir fonksiyonun tersini çizmek için grafiği hangi doğruya göre katlamalıyız?</p>
        <label>a = <span class="e-deger" id="tsAd">1</span><input type="range" id="tsA" min="-3" max="3" step=".1" value="1"></label>
        <div class="satir"><button class="btn btn-etkinlik" id="tsKat">▶ y = x'e göre katla</button><label class="satir" style="grid-template-columns:auto 1fr"><input type="checkbox" id="tsKis"> x ≥ 0 ile kısıtla</label></div>
        <div class="panel-ic"><div id="tsF" class="mono" style="color:#ffc657"></div><div id="tsT" class="mono" style="color:#35e0b0"></div></div>
        <p class="e-not" id="tsNokta"></p>
        <p class="e-not">Altın nokta (a, f(a)), turkuaz nokta (f(a), a). İki nokta y = x'e göre simetrik mi?</p>`);
      const t = Y.tuval(sol, .75, (g, W, H) => {
        g.clearRect(0, 0, W, H);
        const fn = F[s], m = Math.min(W, H), sx = (W / m) * 5, sy = (H / m) * 5, kis = U.$("#tsKis", el).checked;
        const D = duzlem(g, W, H, -sx, sx, -sy, sy, { l: 30, r: 10, t: 10, b: 24 });
        D.izgara(1, 1);
        D.egri((x) => x, "rgba(238,243,255,.45)", 1.5, -sx, sx, [6, 6]);
        Y.yazi(g, "y = x", D.X(sx * .7) + 6, D.Y(sx * .7), { boyut: 12, renk: R.soluk });
        const xa = kis && s === "kare" ? 0 : -sx;
        D.egri(fn.f, R.altin, 2.6, xa, sx);
        /* katlama: (x, f(x)) noktası (f(x), x)'e doğru katla oranında taşınır */
        if (katla > 0) {
          g.strokeStyle = R.turkuaz; g.lineWidth = 2.6; g.beginPath(); let ilk = true;
          for (let i = 0; i <= 400; i++) { const x = xa + ((sx - xa) * i) / 400, y = fn.f(x); if (!isFinite(y) || Math.abs(y) > 50) { ilk = true; continue; } const px = x + (y - x) * katla, py = y + (x - y) * katla; ilk ? g.moveTo(D.X(px), D.Y(py)) : g.lineTo(D.X(px), D.Y(py)); ilk = false; }
          g.stroke();
        }
        const a = +U.$("#tsA", el).value, b = fn.f(a);
        if (isFinite(b) && Math.abs(b) < 50) {
          D.nokta(a, b, R.altin, 6);
          if (katla > .99) { D.nokta(b, a, R.turkuaz, 6); g.setLineDash([4, 4]); g.strokeStyle = "rgba(238,243,255,.5)"; g.beginPath(); g.moveTo(D.X(a), D.Y(b)); g.lineTo(D.X(b), D.Y(a)); g.stroke(); g.setLineDash([]); }
        }
        if (s === "kare" && !kis && katla > .99) { g.strokeStyle = R.kirmizi; g.setLineDash([3, 4]); g.beginPath(); g.moveTo(D.X(-sx), D.Y(2)); g.lineTo(D.X(sx), D.Y(2)); g.stroke(); g.setLineDash([]); Y.yazi(g, "y = 2 grafiği iki kez kesiyor", D.X(-sx) + 6, D.Y(2) - 6, { boyut: 12, renk: R.kirmizi }); }
      });
      const yenile = () => {
        const fn = F[s], a = +U.$("#tsA", el).value, b = fn.f(a), kis = U.$("#tsKis", el).checked;
        U.$("#tsAd", el).textContent = a.toFixed(1).replace(".", ",");
        U.$("#tsF", el).textContent = fn.ad; U.$("#tsT", el).textContent = katla > .99 ? (s === "kare" && kis ? fn.kisit : fn.ters) : "Katla ve tersini bul…";
        U.$("#tsNokta", el).textContent = isFinite(b) ? `(a, f(a)) = (${a.toFixed(1)} ; ${b.toFixed(2)})` + (katla > .99 ? `  →  (${b.toFixed(2)} ; ${a.toFixed(1)})` : "") : "";
        U.$("#tsKis", el).closest("label").hidden = s !== "kare";
        t.boyut();
      };
      const kat = () => { cancelAnimationFrame(anim); const bas = performance.now(); const d = () => { katla = Math.min(1, (performance.now() - bas) / 1500); yenile(); if (katla < 1) anim = requestAnimationFrame(d); else Ses.efekt("dogru"); }; d(); };
      U.segment(U.$("#tsSec", el), Object.entries(F).map(([k, v]) => [k, v.ad]), "dogrusal", (v) => { s = v; katla = 0; yenile(); });
      U.$("#tsA", el).oninput = yenile; U.$("#tsKis", el).onchange = yenile; U.$("#tsKat", el).onclick = kat;
      katla = 0; yenile();
      return () => { cancelAnimationFrame(anim); t.ro.disconnect(); };
    },
  };

  /* ===================================================================
     MATEMATİK HARİTASI — problemleri alanlara yerleştir
     =================================================================== */
  E.harita = {
    ad: "Matematik Haritası",
    kur(el) {
      const ALAN = [
        ["cebir", "Cebir", "yapılar, denklemler, simetri"], ["sayi", "Sayılar Teorisi", "tam sayılar, asallar"], ["geo", "Geometri ve Topoloji", "şekil, uzay, süreklilik"],
        ["analiz", "Analiz", "limit, değişim, sonsuz"], ["ayrik", "Kombinatorik ve Graflar", "sayma, ağlar, düzen"], ["olas", "Olasılık ve İstatistik", "belirsizlik, veri"], ["uyg", "Uygulamalı ve Hesaplamalı", "model, algoritma, bilgisayar"],
      ];
      const KART = [
        ["Fermat'nın son teoremi", ["sayi"], "xⁿ + yⁿ = zⁿ'nin n > 2 için tam sayı çözümü yok; 1994'te Wiles ispatladı."],
        ["Königsberg köprüleri", ["ayrik"], "Euler, köprüleri kenar, kara parçalarını düğüm yaparak graf teorisini başlattı."],
        ["Kahve fincanı = simit", ["geo"], "Topolojide yırtmadan şekil değiştirme serbest; ikisinin de bir deliği var."],
        ["Anlık hız (türev)", ["analiz"], "Ortalama hızın, zaman aralığı sıfıra yaklaşırken limiti."],
        ["5. dereceden denklemin kök formülü yok", ["cebir"], "Galois kökler arasındaki simetri gruplarıyla bunu gösterdi."],
        ["Monty Hall problemi", ["olas"], "Kapı değiştirmek kazanma olasılığını 1/3'ten 2/3'e çıkarır."],
        ["Hava durumu tahmini", ["uyg", "analiz"], "Diferansiyel denklemler bilgisayarda sayısal olarak çözülür."],
        ["Dört renk teoremi", ["ayrik", "geo"], "Her harita 4 renkle boyanabilir; ispatı bilgisayar destekliydi (1976)."],
        ["Riemann hipotezi", ["sayi", "analiz"], "Asalların dağılımını karmaşık analizdeki bir fonksiyonun sıfırlarına bağlar."],
        ["RSA şifreleme", ["sayi", "uyg"], "Büyük sayıları asal çarpanlarına ayırmanın zorluğuna dayanır."],
        ["Poincaré sanısı", ["geo"], "Perelman 2003'te ispatladı; 3 boyutlu kürenin karakterizasyonu."],
        ["Sudoku kaç farklı şekilde dolar?", ["ayrik"], "Yaklaşık 6,67 × 10²¹ geçerli tablo vardır."],
        ["Mandelbrot kümesi", ["analiz", "geo"], "z → z² + c tekrarının sınırlı kaldığı karmaşık c değerleri."],
        ["Matrislerle dönme", ["cebir", "geo"], "Bir düzlem dönmesi 2×2'lik bir matrisle ifade edilir."],
        ["Normal dağılım (çan eğrisi)", ["olas"], "Birçok bağımsız küçük etkinin toplamı çan eğrisine yaklaşır."],
        ["Yapay zekâ ağları", ["uyg", "analiz"], "Öğrenme, bir hata fonksiyonunun türevle küçültülmesidir."],
        ["Pick teoremi", ["geo"], "Kafes çokgenin alanı = iç noktalar + sınır noktaları / 2 − 1."],
        ["Oyun teorisi", ["uyg", "olas"], "Nash dengesi: kimsenin stratejisini tek başına değiştirmek istemediği durum."],
        ["Collatz sanısı", ["sayi"], "Basit kural, çözülemeyen davranış: her sayı 1'e iner mi?"],
        ["Hanoi kulesi", ["ayrik"], "n disk için en az 2ⁿ − 1 hamle: özyineleme ve sayma."],
      ];
      const { sol, sag } = Y.duzen(el, `<div class="e-kartlar" id="hrKart"></div><div id="hrAlan" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-top:14px"></div>`, `
        <p class="e-soru">Bu problem ya da sonuç matematiğin hangi alanına ait? Bazıları birden çok alana köprü kurar!</p>
        <div><span class="e-not">Yerleşen</span><div class="e-buyuk" id="hrSkor">0 / ${KART.length}</div></div>
        <div class="panel-ic" id="hrBilgi">Bir karta, sonra bir alana dokun.</div>
        <div class="satir"><button class="btn btn-hayalet" id="hrKar">Karıştır / baştan</button></div>
        <p class="e-not">Tartışma: Hangi alanlar en çok köprü kuruyor? Kendi proje fikrin hangi alanda?</p>`);
      let secili = null, yer = {};
      const ciz = () => {
        U.$("#hrKart", el).innerHTML = KART.map((k, i) => (yer[i] ? "" : `<button class="e-kart${secili === i ? " dogru" : ""}" data-k="${i}">${k[0]}</button>`)).join("");
        U.$("#hrAlan", el).innerHTML = ALAN.map(([id, ad, alt]) => `<div class="panel-ic" data-a="${id}" style="min-height:110px;cursor:pointer"><b>${ad}</b><div class="e-not">${alt}</div><div class="e-kartlar" style="margin-top:6px">${Object.entries(yer).filter(([, a]) => a === id).map(([i]) => `<span class="rozet" style="font-family:inherit;font-size:.8rem">${KART[i][0]}</span>`).join("")}</div></div>`).join("");
        U.$("#hrSkor", el).textContent = `${Object.keys(yer).length} / ${KART.length}`;
      };
      U.$(".e-duzen", el).addEventListener("click", (e) => {
        const k = e.target.closest("[data-k]"), a = e.target.closest("[data-a]");
        if (k) { secili = +k.dataset.k; Ses.efekt("dokun"); U.$("#hrBilgi", el).textContent = `Seçili: ${KART[secili][0]}. Şimdi alanı seç.`; ciz(); return; }
        if (a && secili !== null) {
          const kart = KART[secili];
          if (kart[1].includes(a.dataset.a)) {
            yer[secili] = a.dataset.a; Ses.efekt("dogru");
            const kopru = kart[1].length > 1 ? ` <b style="color:var(--renk)">Köprü:</b> ${kart[1].map((x) => ALAN.find((y) => y[0] === x)[1]).join(" + ")}` : "";
            U.$("#hrBilgi", el).innerHTML = `<b>${kart[0]}</b>: ${kart[2]}${kopru}`;
            secili = null; if (Object.keys(yer).length === KART.length) { Ses.efekt("bitis"); U.bildir("Harita tamam! Şimdi kendi şemanızı çizin."); }
          } else { Ses.efekt("yanlis"); U.$("#hrBilgi", el).textContent = `${kart[0]} için başka bir alan dene. İpucu: ne tür bir soru soruyor?`; }
          ciz();
        }
      });
      U.$("#hrKar", el).onclick = () => { yer = {}; secili = null; KART.sort(() => Math.random() - .5); ciz(); };
      ciz();
    },
  };
})(MC.bilsemEtkinlik);
