/* =====================================================================
   GRAFİKLER — kütüphanesiz, hafif canvas çizgi ve sütun grafikleri.
   Boyut değişince kendini yeniden çizer; logaritmik eksen destekler.
   ===================================================================== */
"use strict";
(function () {
  const RENK = { cizgi: "rgba(150,180,255,.14)", eksen: "rgba(150,180,255,.35)", metin: "#9db0d6", ana: "#eef3ff" };
  const FONT = "13px 'JetBrains Mono', ui-monospace, monospace";

  function guzelAdimlar(lo, hi, n = 5) {
    const aralik = hi - lo || 1, ham = aralik / n, us = Math.pow(10, Math.floor(Math.log10(ham)));
    const adim = [1, 2, 2.5, 5, 10].map((m) => m * us).find((s) => s >= ham) || 10 * us;
    const out = []; for (let v = Math.ceil(lo / adim) * adim; v <= hi + adim * 1e-9; v += adim) out.push(+v.toPrecision(12));
    return out;
  }
  function kisa(v) {
    const a = Math.abs(v);
    if (a >= 1e9) return (v / 1e9).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " mr";
    if (a >= 1e6) return (v / 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " mn";
    if (a >= 1e4) return (v / 1e3).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " b";
    return v.toLocaleString("tr-TR", { maximumFractionDigits: a < 10 ? 2 : 0 });
  }
  function hazirla(kutu) {
    let cv = kutu.querySelector("canvas");
    if (!cv) { cv = document.createElement("canvas"); kutu.appendChild(cv); }
    const dpr = Math.min(devicePixelRatio || 1, 2), W = kutu.clientWidth, H = kutu.clientHeight;
    cv.width = Math.max(1, Math.round(W * dpr)); cv.height = Math.max(1, Math.round(H * dpr));
    const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    return { g, W, H };
  }
  function izle(kutu, ciz) {
    if (kutu._gozlemci) kutu._gozlemci.disconnect();
    let son = "";
    kutu._gozlemci = new ResizeObserver(() => { const k = kutu.clientWidth + "x" + kutu.clientHeight; if (k !== son && kutu.clientWidth) { son = k; ciz(); } });
    kutu._gozlemci.observe(kutu);
    ciz();
  }
  function lejant(g, seriler, x, y) {
    g.font = "600 13px 'Onest', system-ui, sans-serif"; g.textBaseline = "middle";
    let cx = x;
    for (const s of seriler) {
      g.fillStyle = s.renk; g.fillRect(cx, y - 2, 16, 4);
      g.fillStyle = RENK.ana; g.fillText(s.ad, cx + 22, y);
      cx += 22 + g.measureText(s.ad).width + 18;
    }
  }

  /* seriler: [{ad, y:[...], x?:[...], renk, kesik, basamak}] — x verilmezse 0,1,2… */
  function cizgi(kutu, o) {
    izle(kutu, () => {
      const { g, W, H } = hazirla(kutu);
      const ml = 64, mr = 16, mt = o.lejant === false ? 14 : 36, mb = 38;
      const tumX = o.seriler.flatMap((s) => s.x || s.y.map((_, i) => i));
      const tumY = o.seriler.flatMap((s) => s.y).filter((v) => isFinite(v));
      const xMin = Math.min(...tumX), xMax = Math.max(...tumX);
      const log = !!o.logY;
      let yMin = log ? Math.max(1e-9, Math.min(...tumY.filter((v) => v > 0))) : Math.min(0, ...tumY), yMax = Math.max(...tumY);
      if (yMax === yMin) yMax = yMin + 1;
      const X = (v) => ml + (v - xMin) / (xMax - xMin || 1) * (W - ml - mr);
      let Y, yAdim;
      if (log) {
        const a = Math.floor(Math.log10(yMin)), b = Math.ceil(Math.log10(yMax));
        Y = (v) => mt + (b - Math.log10(Math.max(v, Math.pow(10, a)))) / (b - a || 1) * (H - mt - mb);
        yAdim = []; const st = Math.max(1, Math.ceil((b - a) / 6)); for (let e = a; e <= b; e += st) yAdim.push(Math.pow(10, e));
      } else {
        yAdim = guzelAdimlar(yMin, yMax, 5); const ust = Math.max(yMax, yAdim[yAdim.length - 1]), alt = Math.min(yMin, yAdim[0]);
        Y = (v) => mt + (ust - v) / (ust - alt || 1) * (H - mt - mb);
      }
      g.font = FONT; g.textBaseline = "middle"; g.textAlign = "right";
      for (const v of yAdim) { const y = Y(v); g.strokeStyle = RENK.cizgi; g.lineWidth = 1; g.beginPath(); g.moveTo(ml, y); g.lineTo(W - mr, y); g.stroke(); g.fillStyle = RENK.metin; g.fillText(kisa(v), ml - 8, y); }
      g.textAlign = "center"; g.textBaseline = "top";
      for (const v of guzelAdimlar(xMin, xMax, Math.max(3, Math.floor((W - ml) / 90)))) { if (v < xMin || v > xMax) continue; g.fillStyle = RENK.metin; g.fillText(kisa(v), X(v), H - mb + 8); }
      if (o.xBaslik) { g.textAlign = "right"; g.fillText(o.xBaslik, W - mr, H - 16); }
      g.strokeStyle = RENK.eksen; g.beginPath(); g.moveTo(ml, H - mb); g.lineTo(W - mr, H - mb); g.stroke();
      for (const s of o.seriler) {
        const xs = s.x || s.y.map((_, i) => i);
        g.strokeStyle = s.renk; g.lineWidth = s.kalinlik || 3; g.setLineDash(s.kesik ? [7, 6] : []); g.lineJoin = "round";
        g.shadowColor = s.renk; g.shadowBlur = s.kesik ? 0 : 8;
        g.beginPath();
        let onceki = null;
        xs.forEach((xv, i) => {
          const px = X(xv), py = Y(s.y[i]);
          if (i === 0) g.moveTo(px, py);
          else if (s.basamak) { g.lineTo(px, onceki); g.lineTo(px, py); }
          else g.lineTo(px, py);
          onceki = py;
        });
        g.stroke(); g.shadowBlur = 0; g.setLineDash([]);
        if (s.nokta && xs.length <= 120) { g.fillStyle = s.renk; xs.forEach((xv, i) => { g.beginPath(); g.arc(X(xv), Y(s.y[i]), 3, 0, 7); g.fill(); }); }
      }
      if (o.lejant !== false) lejant(g, o.seriler, ml, 14);
    });
  }

  /* kategoriler: ["…"], seriler: [{ad, degerler:[...], renk}] */
  function cubuk(kutu, o) {
    izle(kutu, () => {
      const { g, W, H } = hazirla(kutu);
      const ml = 48, mr = 12, mt = 36, mb = 64;
      const ust0 = Math.max(1, ...o.seriler.flatMap((s) => s.degerler));
      const adim = guzelAdimlar(0, ust0, 4), ust = Math.max(ust0, adim[adim.length - 1]);
      const Y = (v) => mt + (1 - v / ust) * (H - mt - mb);
      g.font = FONT; g.textAlign = "right"; g.textBaseline = "middle";
      for (const v of adim) { const y = Y(v); g.strokeStyle = RENK.cizgi; g.beginPath(); g.moveTo(ml, y); g.lineTo(W - mr, y); g.stroke(); g.fillStyle = RENK.metin; g.fillText(kisa(v), ml - 8, y); }
      const n = o.kategoriler.length, grupG = (W - ml - mr) / n, cG = Math.min(36, grupG * .7 / o.seriler.length);
      o.kategoriler.forEach((k, i) => {
        const x0 = ml + i * grupG + grupG / 2 - cG * o.seriler.length / 2;
        o.seriler.forEach((s, j) => {
          const v = s.degerler[i], y = Y(v);
          g.fillStyle = s.renk; const x = x0 + j * cG + 2, w = cG - 4, h = H - mb - y;
          g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, [6, 6, 0, 0]); else g.rect(x, y, w, h); g.fill();
          if (v) { g.fillStyle = RENK.ana; g.textAlign = "center"; g.textBaseline = "bottom"; g.fillText(v, x + w / 2, y - 3); }
        });
        g.save(); g.translate(ml + i * grupG + grupG / 2, H - mb + 10); g.rotate(n > 5 ? -.5 : 0);
        g.fillStyle = RENK.metin; g.textAlign = n > 5 ? "right" : "center"; g.textBaseline = "top"; g.font = "12px 'Onest', system-ui, sans-serif"; g.fillText(k, 0, 0); g.restore();
      });
      lejant(g, o.seriler, ml, 14);
    });
  }
  MC.grafik = { cizgi, cubuk, kisa };
})();
