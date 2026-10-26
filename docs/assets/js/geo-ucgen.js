/* =====================================================================
   ÜÇGEN LABORATUVARI — köşeleri sürüklenebilen üçgen; dört merkez, Euler doğrusu, dokuz nokta çemberi.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, S = MC.sayi, Ses = MC.Ses;
  const BIRIM = 40;
  const KATMAN = [
    { id: "kenarortay", ad: "Kenarortaylar · Ağırlık merkezi G", renk: "#ffc657", acik: true },
    { id: "aciortay", ad: "Açıortaylar · İç teğet çember I", renk: "#35e0b0", acik: false },
    { id: "ortadik", ad: "Orta dikmeler · Çevrel çember O", renk: "#5b8cff", acik: false },
    { id: "yukseklik", ad: "Yükseklikler · Diklik merkezi H", renk: "#ff4d61", acik: false },
    { id: "euler", ad: "Euler doğrusu (O, G, H)", renk: "#eef3ff", acik: false },
    { id: "dokuz", ad: "Dokuz nokta çemberi", renk: "#a66bff", acik: false },
  ];
  const ACIKLAMA = {
    kenarortay: "Köşeyi karşı kenarın orta noktasına bağlayan doğru parçasına <b>kenarortay</b> denir. Üç kenarortay tek bir noktada, <b>ağırlık merkezinde</b> kesişir. G her kenarortayı köşeden itibaren 2 : 1 oranında böler. Üçgen karton olsaydı, onu G noktasından parmağının ucunda dengede tutabilirdin.",
    aciortay: "Üç açıortay tek noktada kesişir. Bu nokta üç kenara eşit uzaklıktadır; bu yüzden kenarlara içten teğet çemberin merkezidir. Yarıçapı r = Alan / s formülüyle bulunur (s: yarı çevre).",
    ortadik: "Kenarların orta dikmeleri tek noktada kesişir. Bu nokta üç köşeye eşit uzaklıktadır ve üçgenin çevrel çemberinin merkezidir. Dik üçgende O hipotenüsün tam ortasına düşer; geniş açılı üçgende üçgenin dışına çıkar.",
    yukseklik: "Köşeden karşı kenara (ya da uzantısına) inilen dikmeye yükseklik denir. Üç yükseklik diklik merkezinde (H) kesişir. Dik üçgende H, dik açının köşesidir.",
    euler: "Euler 1765'te O, G ve H noktalarının her üçgende aynı doğru üzerinde olduğunu gösterdi. Üstelik G, OH parçasını 1 : 2 oranında böler: HG = 2·GO. Köşeleri sürükleyip oranın hep 2 kaldığını gözlemle.",
    dokuz: "Kenarların 3 orta noktası, yüksekliklerin 3 ayağı ve köşelerin H'ye uzaklığının 3 orta noktası; bu 9 nokta aynı çember üzerindedir. Merkezi OH'nin ortası, yarıçapı çevrel çemberin yarısıdır.",
  };
  let el, svg, W = 800, H = 560, A, B, C, suruk = null, olculdu = false;
  const acik = Object.fromEntries(KATMAN.map((k) => [k.id, k.acik]));

  /* ---------- Saf hesap ---------- */
  function merkezler(A, B, C) {
    const a = Math.hypot(B.x - C.x, B.y - C.y), b = Math.hypot(A.x - C.x, A.y - C.y), c = Math.hypot(A.x - B.x, A.y - B.y);
    const alan = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2, s = (a + b + c) / 2;
    const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    const I = { x: (a * A.x + b * B.x + c * C.x) / (a + b + c), y: (a * A.y + b * B.y + c * C.y) / (a + b + c) };
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    const k = (P) => P.x * P.x + P.y * P.y;
    const O = { x: (k(A) * (B.y - C.y) + k(B) * (C.y - A.y) + k(C) * (A.y - B.y)) / D, y: (k(A) * (C.x - B.x) + k(B) * (A.x - C.x) + k(C) * (B.x - A.x)) / D };
    const Hh = { x: A.x + B.x + C.x - 2 * O.x, y: A.y + B.y + C.y - 2 * O.y };
    const R = Math.hypot(A.x - O.x, A.y - O.y), r = alan / s;
    const aci = (P, Q, T) => Math.acos(Math.max(-1, Math.min(1, ((Q.x - P.x) * (T.x - P.x) + (Q.y - P.y) * (T.y - P.y)) / (Math.hypot(Q.x - P.x, Q.y - P.y) * Math.hypot(T.x - P.x, T.y - P.y))))) * 180 / Math.PI;
    return { a, b, c, alan, s, G, I, O, H: Hh, R, r, N: { x: (O.x + Hh.x) / 2, y: (O.y + Hh.y) / 2 }, acilar: [aci(A, B, C), aci(B, C, A), aci(C, A, B)], dejenere: Math.abs(D) < 1e-6 };
  }
  const ayak = (P, Q, T) => { const dx = T.x - Q.x, dy = T.y - Q.y, t = ((P.x - Q.x) * dx + (P.y - Q.y) * dy) / (dx * dx + dy * dy); return { x: Q.x + t * dx, y: Q.y + t * dy }; };
  const orta = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });

  function ciz() {
    const m = merkezler(A, B, C), p = [];
    p.push(`<rect width="${W}" height="${H}" fill="#06122a"/>`);
    for (let x = (W / 2) % BIRIM; x < W; x += BIRIM) p.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(91,140,255,.08)"/>`);
    for (let y = (H / 2) % BIRIM; y < H; y += BIRIM) p.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(91,140,255,.08)"/>`);
    p.push(`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="rgba(91,140,255,.10)" stroke="#eef3ff" stroke-width="3" stroke-linejoin="round"/>`);
    const cizgi = (P, Q, renk, kesik) => `<line x1="${P.x}" y1="${P.y}" x2="${Q.x}" y2="${Q.y}" stroke="${renk}" stroke-width="2"${kesik ? ' stroke-dasharray="7 5"' : ""}/>`;
    const nokta = (P, renk, ad) => `<circle cx="${P.x}" cy="${P.y}" r="6" fill="${renk}" stroke="#06122a" stroke-width="2"/><text x="${P.x + 10}" y="${P.y + 18}" fill="${renk}" font-family="Onest, sans-serif" font-weight="800" font-size="16" paint-order="stroke" stroke="#06122a" stroke-width="4">${ad}</text>`;
    const uzat = (P, Q) => { const dx = Q.x - P.x, dy = Q.y - P.y, L = Math.hypot(dx, dy) || 1, k = (W + H) * 2 / L; return [{ x: P.x - dx * k, y: P.y - dy * k }, { x: P.x + dx * k, y: P.y + dy * k }]; };
    const V = [A, B, C], K = [[B, C], [C, A], [A, B]];
    if (!m.dejenere) {
      if (acik.ortadik) { K.forEach(([P, Q]) => { const o = orta(P, Q), d = { x: o.x - (Q.y - P.y), y: o.y + (Q.x - P.x) }; const [u, v] = uzat(o, d); p.push(cizgi(u, v, "#5b8cff", true)); }); p.push(`<circle cx="${m.O.x}" cy="${m.O.y}" r="${m.R}" fill="none" stroke="#5b8cff" stroke-width="2"/>`); }
      if (acik.aciortay) { V.forEach((P, i) => { const [Q, T] = K[i], sQ = Math.hypot(P.x - Q.x, P.y - Q.y), sT = Math.hypot(P.x - T.x, P.y - T.y), D = { x: (Q.x * sT + T.x * sQ) / (sQ + sT), y: (Q.y * sT + T.y * sQ) / (sQ + sT) }; p.push(cizgi(P, D, "#35e0b0")); }); p.push(`<circle cx="${m.I.x}" cy="${m.I.y}" r="${m.r}" fill="rgba(53,224,176,.08)" stroke="#35e0b0" stroke-width="2"/>`); }
      if (acik.kenarortay) V.forEach((P, i) => p.push(cizgi(P, orta(...K[i]), "#ffc657")));
      if (acik.yukseklik) V.forEach((P, i) => { const f = ayak(P, ...K[i]); p.push(cizgi(P, f, "#ff4d61")); p.push(cizgi(f, m.H, "#ff4d61", true)); p.push(`<circle cx="${f.x}" cy="${f.y}" r="3.5" fill="#ff4d61"/>`); });
      if (acik.euler) { const [u, v] = uzat(m.O, m.H); p.push(`<line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}" stroke="#eef3ff" stroke-width="2.5" stroke-dasharray="2 6" stroke-linecap="round"/>`); }
      if (acik.dokuz) {
        p.push(`<circle cx="${m.N.x}" cy="${m.N.y}" r="${m.R / 2}" fill="none" stroke="#a66bff" stroke-width="2"/>`);
        const dokuz = [...K.map(([P, Q]) => orta(P, Q)), ...V.map((P, i) => ayak(P, ...K[i])), ...V.map((P) => orta(P, m.H))];
        dokuz.forEach((P) => p.push(`<circle cx="${P.x}" cy="${P.y}" r="4" fill="#a66bff"/>`));
        p.push(nokta(m.N, "#a66bff", "N"));
      }
      if (acik.kenarortay || acik.euler) p.push(nokta(m.G, "#ffc657", "G"));
      if (acik.aciortay) p.push(nokta(m.I, "#35e0b0", "I"));
      if (acik.ortadik || acik.euler) p.push(nokta(m.O, "#5b8cff", "O"));
      if (acik.yukseklik || acik.euler) p.push(nokta(m.H, "#ff4d61", "H"));
    }
    ["A", "B", "C"].forEach((ad, i) => { const P = V[i]; p.push(`<circle cx="${P.x}" cy="${P.y}" r="13" fill="rgba(238,243,255,.12)" stroke="#eef3ff" stroke-width="2"/><circle cx="${P.x}" cy="${P.y}" r="6" fill="#eef3ff"/><text x="${P.x - 14}" y="${P.y - 16}" fill="#eef3ff" font-family="Unbounded, sans-serif" font-weight="700" font-size="18" paint-order="stroke" stroke="#06122a" stroke-width="5">${ad}</text>`); });
    svg.innerHTML = p.join("");
    bilgiYaz(m);
  }
  function bilgiYaz(m) {
    const f = (x) => S.ondalik(x / BIRIM), [aA, aB, aC] = m.acilar, enB = Math.max(...m.acilar);
    const tur1 = Math.abs(enB - 90) < .5 ? "dik" : enB > 90 ? "geniş açılı" : "dar açılı";
    const es = (x, y) => Math.abs(x - y) < 1.5;
    const tur2 = es(m.a, m.b) && es(m.b, m.c) ? "eşkenar" : es(m.a, m.b) || es(m.b, m.c) || es(m.a, m.c) ? "ikizkenar" : "çeşitkenar";
    const og = Math.hypot(m.G.x - m.O.x, m.G.y - m.O.y), gh = Math.hypot(m.H.x - m.G.x, m.H.y - m.G.y);
    U.$("#ucBilgi", el).innerHTML = `
      <div class="metrikler">
        <div class="metrik"><small>Tür</small><b style="font-size:1.05rem">${tur1}, ${tur2}</b></div>
        <div class="metrik"><small>Alan</small><b>${S.ondalik(m.alan / BIRIM / BIRIM)}</b></div>
        <div class="metrik"><small>Çevre</small><b>${S.ondalik(2 * m.s / BIRIM)}</b></div>
      </div>
      <div class="olcu-liste">
        <div><span>a = |BC|</span><b>${f(m.a)}</b></div><div><span>b = |CA|</span><b>${f(m.b)}</b></div><div><span>c = |AB|</span><b>${f(m.c)}</b></div>
        <div><span>∠A + ∠B + ∠C</span><b>${S.ondalik(aA, 1)}° + ${S.ondalik(aB, 1)}° + ${S.ondalik(aC, 1)}° = ${S.ondalik(aA + aB + aC, 1)}°</b></div>
        <div><span>R (çevrel) · r (iç teğet)</span><b>${f(m.R)} · ${f(m.r)}</b></div>
        <div><span>HG ÷ GO (Euler)</span><b>${og > 1e-6 ? S.ondalik(gh / og) : "—"}</b></div>
      </div>`;
  }
  function kur(e) {
    el = e;
    el.innerHTML = `<div class="bolum-basi"><span class="etiket" style="color:var(--turkuaz)">Üçgen Laboratuvarı</span><h2>Bir üçgenin gizli noktaları</h2>
        <p>Köşeleri sürükle. Her üçgende kenarortaylar, açıortaylar, orta dikmeler ve yükseklikler kendi aralarında tek bir noktada buluşur. Neden hep buluştuklarını ve aralarındaki şaşırtıcı ilişkiyi keşfet.</p></div>
      <div class="ucgen-duzen">
        <div class="tahta-kutu" id="ucKutu"><svg id="ucSvg" role="img" aria-label="Sürüklenebilir üçgen"></svg></div>
        <div class="yigin">
          <div class="panel"><span class="etiket soluk">Katmanlar</span><div class="yigin" style="gap:6px" id="ucKatman">${KATMAN.map((k) => `<label class="anahtar"><input type="checkbox" data-k="${k.id}" ${acik[k.id] ? "checked" : ""}><i style="background:${k.renk}"></i><span>${k.ad}</span></label>`).join("")}</div>
            <div class="satir"><button class="btn btn-hayalet" data-hazir="eskenar">Eşkenar</button><button class="btn btn-hayalet" data-hazir="dik">Dik</button><button class="btn btn-hayalet" data-hazir="genis">Geniş açılı</button></div></div>
          <div class="panel" id="ucBilgi"></div>
          <div class="panel"><span class="etiket soluk">Neden?</span><div id="ucAciklama" class="yigin"></div></div>
        </div>
      </div>`;
    svg = U.$("#ucSvg", el);
    const kutu = U.$("#ucKutu", el);
    const hazir = (tur) => {
      const cx = W / 2, cy = H / 2 + 30, s = Math.min(W, H) * .36;
      if (tur === "eskenar") { A = { x: cx, y: cy - s }; B = { x: cx - s * .866, y: cy + s / 2 }; C = { x: cx + s * .866, y: cy + s / 2 }; }
      else if (tur === "dik") { A = { x: cx - s * .7, y: cy - s * .8 }; B = { x: cx - s * .7, y: cy + s * .5 }; C = { x: cx + s * .9, y: cy + s * .5 }; }
      else if (tur === "genis") { A = { x: cx - s * .3, y: cy - s * .25 }; B = { x: cx - s * 1.1, y: cy + s * .45 }; C = { x: cx + s * 1.1, y: cy + s * .45 }; }
      else { A = { x: cx - s * .25, y: cy - s * .85 }; B = { x: cx - s, y: cy + s * .45 }; C = { x: cx + s * .95, y: cy + s * .35 }; }
    };
    const boyut = () => { const r = kutu.getBoundingClientRect(); if (!r.width) return; const ilk = !olculdu; olculdu = true; W = Math.round(r.width); H = Math.round(r.height); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); if (ilk) hazir(); ciz(); };
    W = 800; H = 560; hazir();
    new ResizeObserver(boyut).observe(kutu);
    const koor = (ev) => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) * W / r.width, y: (ev.clientY - r.top) * H / r.height }; };
    svg.addEventListener("pointerdown", (ev) => { const p = koor(ev); const v = [A, B, C].map((P) => Math.hypot(P.x - p.x, P.y - p.y)); const i = v.indexOf(Math.min(...v)); if (v[i] < 30) { suruk = i; try { svg.setPointerCapture(ev.pointerId); } catch (_) {} Ses.efekt("sec"); } });
    svg.addEventListener("pointermove", (ev) => { if (suruk === null) return; const p = koor(ev); p.x = Math.max(10, Math.min(W - 10, p.x)); p.y = Math.max(10, Math.min(H - 10, p.y)); if (suruk === 0) A = p; else if (suruk === 1) B = p; else C = p; ciz(); });
    const birak = () => { suruk = null; };
    svg.addEventListener("pointerup", birak); svg.addEventListener("pointercancel", birak);
    const aciklamaYaz = () => U.html(U.$("#ucAciklama", el), KATMAN.filter((k) => acik[k.id]).map((k) => `<div class="bilgi-kutu" style="border-color:${k.renk}55"><b style="color:${k.renk}">${k.ad}</b><br>${ACIKLAMA[k.id]}</div>`).join("") || '<p class="soluk">Bir katman aç; burada o yapının neden çalıştığı anlatılır.</p>');
    U.$("#ucKatman", el).addEventListener("change", (ev) => { const k = ev.target.dataset.k; if (!k) return; acik[k] = ev.target.checked; Ses.efekt("sec"); ciz(); aciklamaYaz(); });
    U.$$("[data-hazir]", el).forEach((b) => b.addEventListener("click", () => { hazir(b.dataset.hazir); Ses.efekt("dokun"); ciz(); }));
    ciz(); aciklamaYaz(); boyut();
  }
  MC.modul("ucgen", { baslik: "Üçgen Laboratuvarı", kur });
  MC.geoUcgen = { merkezler };
})();
