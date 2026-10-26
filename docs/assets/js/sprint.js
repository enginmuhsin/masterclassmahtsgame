/* =====================================================================
   FORMULA SPRINT — 11 konuda dokunmatik hız yarışı (klavye gerekmez)
   Doğru +10 · 5'li seride +5 bonus · Yanlış −5 · Bitişte konu karnesi ve tekrar listesi
   ===================================================================== */
"use strict";
(function () {
  const S = MC.sayi, U = MC.ui, Ses = MC.Ses;
  const OZDESLIK = [
    [String.raw`a^2 - b^2 = \square`, "(a − b)(a + b)", ["(a − b)²", "a² − 2ab + b²", "(a + b)²"]],
    [String.raw`(a+b)^2 = \square`, "a² + 2ab + b²", ["a² + b²", "a² + ab + b²", "2a² + 2b²"]],
    [String.raw`(a-b)^2 = \square`, "a² − 2ab + b²", ["a² − b²", "a² + 2ab − b²", "a² − ab + b²"]],
    [String.raw`(a+b)^3 = \square`, "a³ + 3a²b + 3ab² + b³", ["a³ + b³", "a³ + 3ab + b³", "a³ + 2a²b + 2ab² + b³"]],
    [String.raw`(a-b)^3 = \square`, "a³ − 3a²b + 3ab² − b³", ["a³ − b³", "a³ − 3a²b − 3ab² − b³", "a³ + 3a²b − 3ab² − b³"]],
    [String.raw`a^3 + b^3 = \square`, "(a + b)(a² − ab + b²)", ["(a + b)(a² + ab + b²)", "(a + b)³", "(a − b)(a² + ab + b²)"]],
    [String.raw`a^3 - b^3 = \square`, "(a − b)(a² + ab + b²)", ["(a − b)(a² − ab + b²)", "(a − b)³", "(a + b)(a² − ab + b²)"]],
    [String.raw`(a+b+c)^2 = \square`, "a² + b² + c² + 2(ab + bc + ca)", ["a² + b² + c²", "a² + b² + c² + ab + bc + ca", "(a + b)² + c²"]],
    [String.raw`x^2 + \dfrac{1}{x^2} = \square`, "(x + 1/x)² − 2", ["(x + 1/x)²", "(x − 1/x)² − 2", "(x + 1/x)² + 2"]],
    [String.raw`a^4 - b^4 = \square`, "(a − b)(a + b)(a² + b²)", ["(a² − b²)²", "(a − b)⁴", "(a − b)(a + b)(a² − b²)"]],
  ];
  const TRIG = [
    [String.raw`\sin^2 x + \cos^2 x = \square`, "1", ["0", "2", "sin 2x"]],
    [String.raw`1 + \tan^2 x = \square`, "1 / cos²x", ["1 / sin²x", "cot²x", "sin²x"]],
    [String.raw`1 + \cot^2 x = \square`, "1 / sin²x", ["1 / cos²x", "tan²x", "cos²x"]],
    [String.raw`\sin 2x = \square`, "2 sin x · cos x", ["2 sin x", "sin²x − cos²x", "sin x · cos x"]],
    [String.raw`\cos 2x = \cos^2 x - \square`, "sin²x", ["cos²x", "2 sin x", "1"]],
    [String.raw`\cos 2x = 1 - \square`, "2 sin²x", ["sin²x", "2 cos²x", "cos²x"]],
    [String.raw`\tan 2x = \square`, "2 tan x / (1 − tan²x)", ["2 tan x", "2 tan x / (1 + tan²x)", "tan²x − 1"]],
    [String.raw`\sin^2 \tfrac{x}{2} = \square`, "(1 − cos x) / 2", ["(1 + cos x) / 2", "(1 − sin x) / 2", "1 − cos x"]],
    [String.raw`\cos^2 \tfrac{x}{2} = \square`, "(1 + cos x) / 2", ["(1 − cos x) / 2", "(1 + sin x) / 2", "1 + cos x"]],
    [String.raw`\tan \tfrac{x}{2} = \square`, "sin x / (1 + cos x)", ["cos x / (1 + sin x)", "sin x / (1 − sin x)", "(1 + cos x) / sin x"]],
    [String.raw`\sin(a+b) = \square`, "sin a cos b + cos a sin b", ["sin a + sin b", "sin a sin b + cos a cos b", "sin a cos b − cos a sin b"]],
    [String.raw`\sin(a-b) = \square`, "sin a cos b − cos a sin b", ["sin a − sin b", "cos a cos b − sin a sin b", "sin a cos b + cos a sin b"]],
    [String.raw`\cos(a+b) = \square`, "cos a cos b − sin a sin b", ["cos a cos b + sin a sin b", "cos a + cos b", "sin a cos b + cos a sin b"]],
    [String.raw`\cos(a-b) = \square`, "cos a cos b + sin a sin b", ["cos a cos b − sin a sin b", "cos a − cos b", "sin a sin b − cos a cos b"]],
    [String.raw`\tan(a+b) = \square`, "(tan a + tan b) / (1 − tan a tan b)", ["tan a + tan b", "(tan a + tan b) / (1 + tan a tan b)", "(tan a − tan b) / (1 + tan a tan b)"]],
    [String.raw`\sin A + \sin B = \square`, "2 sin((A+B)/2) cos((A−B)/2)", ["2 cos((A+B)/2) cos((A−B)/2)", "sin(A + B)", "2 sin((A−B)/2) cos((A+B)/2)"]],
  ];
  const USLU = [
    [String.raw`a^m \cdot a^n = \square`, "a^(m+n)", ["a^(m·n)", "(2a)^(m+n)", "a^(m−n)"]],
    [String.raw`\dfrac{a^m}{a^n} = \square`, "a^(m−n)", ["a^(m/n)", "a^(n−m)", "a^(m+n)"]],
    [String.raw`(a^m)^n = \square`, "a^(m·n)", ["a^(m+n)", "a^(mⁿ)", "m · aⁿ"]],
    [String.raw`a^0 = \square \quad (a \neq 0)`, "1", ["0", "a", "tanımsız"]],
    [String.raw`a^{-n} = \square`, "1 / aⁿ", ["−aⁿ", "a / n", "−n · a"]],
    [String.raw`(a\,b)^n = \square`, "aⁿ · bⁿ", ["a · bⁿ", "(a + b)ⁿ", "aⁿ + bⁿ"]],
  ];
  const LOG = [
    [String.raw`\log(x\,y) = \square`, "log x + log y", ["log x · log y", "log(x + y)", "x · log y"]],
    [String.raw`\log\!\left(\dfrac{x}{y}\right) = \square`, "log x − log y", ["log x / log y", "log(x − y)", "log y − log x"]],
    [String.raw`\log(x^n) = \square`, "n · log x", ["(log x)ⁿ", "log n + log x", "x · log n"]],
    [String.raw`\log_b b = \square`, "1", ["0", "b", "10"]],
    [String.raw`\log_a b = \square`, "log b / log a", ["log a / log b", "log(b − a)", "log b − log a"]],
  ];
  const TRIG_DEGER = { sin: { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" }, cos: { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0" }, tan: { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: "tanımsız" } };
  const BOLUNEBILME = { 3: "Rakamları toplamı 3'ün katıysa 3'e bölünür.", 4: "Son iki basamağı 4'ün katıysa 4'e bölünür.", 6: "Hem 2'ye hem 3'e bölünüyorsa 6'ya bölünür.", 8: "Son üç basamağı 8'in katıysa 8'e bölünür.", 9: "Rakamları toplamı 9'un katıysa 9'a bölünür.", 11: "Rakamlar sağdan başlayarak +, −, + … işaretleriyle toplanır; sonuç 11'in katıysa 11'e bölünür." };
  const KONULAR = ["Çarpım Tablosu", "Tam Kareler", "Tam Küpler", "Üslü Sayılar", "Köklü Sayılar", "Bölünebilme", "Asal mı?", "Özdeşlikler", "Trigonometri", "Trigonometri Değerleri", "Logaritma"];

  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  function celdirici(dogru, adaylar) {
    const s = [];
    for (const a of adaylar) if (a > 0 && a !== dogru && !s.includes(a)) s.push(a);
    while (s.length < 3) { const a = dogru + (Math.random() < .5 ? -1 : 1) * r(1, Math.max(3, Math.floor(dogru / 5))); if (a > 0 && a !== dogru && !s.includes(a)) s.push(a); }
    return U.karistir(s).slice(0, 3).map(String);
  }
  function soru(konular) {
    const tur = U.sec(konular);
    let tex = null, metin = null, dogru, yanlis, aciklama = "";
    switch (tur) {
      case "Çarpım Tablosu": { const a = r(2, 12), b = r(2, 12), d = a * b; tex = `${a} \\times ${b} = \\square`; dogru = String(d); yanlis = celdirici(d, [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, d + 10, d - 10]); break; }
      case "Tam Kareler": { const k = r(2, 30), d = k * k; tex = `${k}^2 = \\square`; dogru = String(d); yanlis = celdirici(d, [(k - 1) ** 2, (k + 1) ** 2, 2 * k, d + 10]); break; }
      case "Tam Küpler": { const k = r(2, 15), d = k ** 3; tex = `${k}^3 = \\square`; dogru = String(d); yanlis = celdirici(d, [(k - 1) ** 3, (k + 1) ** 3, 3 * k, k * k]); break; }
      case "Üslü Sayılar":
        if (Math.random() < .5) { const b = U.sec([2, 3, 5]), e = r(2, { 2: 12, 3: 7, 5: 5 }[b]), d = b ** e; tex = `${b}^{${e}} = \\square`; dogru = String(d); yanlis = celdirici(d, [b ** (e - 1), b ** (e + 1), b * e, d + b]); }
        else [tex, dogru, yanlis] = U.sec(USLU);
        break;
      case "Köklü Sayılar":
        if (Math.random() < .4) { const k = r(11, 25); tex = `\\sqrt{${k * k}} = \\square`; dogru = String(k); yanlis = celdirici(k, [k - 1, k + 1, k + 2, 2 * k]); }
        else { const k = r(2, 9), b = U.sec([2, 3, 5, 6, 7, 10, 11]); tex = `\\sqrt{${k * k * b}} = \\square`; dogru = `${k}√${b}`; yanlis = [...new Set([`${b}√${k}`, `${k * k}√${b}`, `${k + 1}√${b}`, `${k}√${b * 2}`])].filter((y) => y !== dogru).slice(0, 3); aciklama = `√${k * k * b} = √(${k * k} · ${b}) = ${k}√${b}`; }
        break;
      case "Bölünebilme": {
        const d = U.sec([3, 4, 6, 8, 9, 11]), ds = r(Math.ceil(100 / d), Math.floor(9999 / d)) * d, ys = [];
        while (ys.length < 3) { const m = r(100, 9999); if (m % d && !ys.includes(m)) ys.push(m); }
        metin = `Hangisi ${d} ile tam bölünür?`; dogru = String(ds); yanlis = ys.map(String); aciklama = BOLUNEBILME[d]; break;
      }
      case "Asal mı?": {
        const H = MC.oyunMotoru.havuz(2000), p = U.sec(H.uye.asal.filter((x) => x > 50)), b = U.karistir(H.tuzak.asal).slice(0, 3);
        metin = "Hangisi asal sayıdır?"; dogru = String(p); yanlis = b.map(String); aciklama = b.map((v) => `${v} = ${S.carpimYazi(BigInt(v))}`).join(" · "); break;
      }
      case "Trigonometri Değerleri": {
        const fn = U.sec(["sin", "cos", "tan"]), aci = U.sec([0, 30, 45, 60, 90]);
        tex = `\\${fn}\\,${aci}^\\circ = \\square`; dogru = TRIG_DEGER[fn][aci];
        yanlis = U.karistir(["0", "1/2", "√2/2", "√3/2", "1", "√3/3", "√3", "tanımsız"].filter((h) => h !== dogru)).slice(0, 3); break;
      }
      case "Logaritma":
        if (Math.random() < .5) { const b = U.sec([2, 3, 5, 10]), k = r(2, { 2: 12, 3: 8, 5: 6, 10: 6 }[b]); tex = `\\log_{${b}} ${b ** k} = \\square`; dogru = String(k); yanlis = celdirici(k, [k - 1, k + 1, b * k, k + 2]); }
        else [tex, dogru, yanlis] = U.sec(LOG);
        break;
      case "Özdeşlikler": [tex, dogru, yanlis] = U.sec(OZDESLIK); break;
      default: [tex, dogru, yanlis] = U.sec(TRIG);
    }
    return { tur, tex, metin, dogru, secenekler: U.karistir([dogru, ...yanlis.slice(0, 3)]), aciklama };
  }

  let el = null, sp = null, secili = new Set(KONULAR.slice(0, 4)), sure = 60;
  function kur(e) {
    el = e;
    el.innerHTML = `<div class="bolum-basi"><span class="etiket">Formula Sprint</span><h2>Formülleri refleks hâline getir</h2></div>
      <div id="spKurulum" class="kurulum">
        <div class="panel"><span class="etiket soluk">Yarış pisti: konuları seç</span><div class="konu-sec" id="spKonu"></div>
          <div class="secim-grup"><span>Süre</span><div id="spSure"></div></div>
          <button class="btn btn-ana btn-buyuk" id="spBasla">Sprinti Başlat</button></div>
        <div class="panel"><div class="benzetme"><b>Benzetme:</b> Formüller pilotun vites geçişleri gibidir. Refleksle yapılmalıdır ki akıl virajda, yani asıl problemde kalsın.</div>
          <div class="tablo-kutu"><table class="tablo"><tr><td>Doğru cevap</td><td class="arti mono">+10</td></tr><tr><td>Her 5'li seri</td><td class="arti mono">+5 bonus</td></tr><tr><td>Yanlış cevap</td><td class="eksi mono">−5</td></tr></table></div>
          <p class="soluk">Tüm cevaplar dokunmatik düğmelerle verilir; akıllı tahtada klavye açılmaz. Yanlışlarda kuralın kısa açıklaması görünür.</p></div>
      </div>
      <div id="spOyun" hidden>
        <div class="hud"><div class="halka" id="spHalka"><svg viewBox="0 0 64 64"><circle class="iz" cx="32" cy="32" r="28"/><circle class="ilerleme" id="spIlerleme" cx="32" cy="32" r="28" stroke-dasharray="175.9"/></svg><b id="spKalan">60</b></div>
          <div class="hud-hedef"><small>Konu</small><b id="spKonuAd">—</b></div><div class="seri" id="spSeri"><i></i><i></i><i></i><i></i><i></i></div><div class="hud-skor"><small>Puan</small><b id="spPuan">0</b></div></div>
        <div class="yigin" style="margin-top:18px"><div class="sprint-soru" id="spSoru"></div><div class="sprint-secenek" id="spSecenek"></div><div class="geri" id="spGeri"><p class="soluk">Doğru seçeneğe dokun.</p></div>
          <div class="satir" style="justify-content:center"><button class="btn btn-hayalet" id="spBitir">Sprinti bitir</button></div></div>
      </div>
      <div id="spSonuc" class="yigin" hidden></div>`;
    const konuCiz = () => { U.$("#spKonu", el).innerHTML = KONULAR.map((k) => `<button type="button" data-k="${k}" aria-pressed="${secili.has(k)}">${k}</button>`).join("") + `<button type="button" data-k="*" aria-pressed="false">Hepsini seç</button>`; };
    konuCiz();
    U.$("#spKonu", el).addEventListener("click", (ev) => { const b = ev.target.closest("button"); if (!b) return; const k = b.dataset.k; if (k === "*") secili = new Set(KONULAR); else if (secili.has(k)) secili.delete(k); else secili.add(k); Ses.efekt("sec"); konuCiz(); });
    U.segment(U.$("#spSure", el), [[60, "60 sn"], [90, "90 sn"], [120, "120 sn"]], sure, (d) => (sure = +d));
    U.$("#spBasla", el).addEventListener("click", basla);
    U.$("#spBitir", el).addEventListener("click", () => sp && bitir());
    U.$("#spSecenek", el).addEventListener("click", (ev) => { const b = ev.target.closest("button"); if (b) cevap(b.dataset.s); });
  }
  function basla() {
    const k = secili.size ? [...secili] : KONULAR;
    sp = { konular: k, puan: 0, dogru: 0, yanlis: 0, seri: 0, hatalar: [], karne: {}, bitis: performance.now() + sure * 1000, sure, soru: soru(k), bitti: false, sonSn: null };
    U.$("#spKurulum", el).hidden = true; U.$("#spSonuc", el).hidden = true; U.$("#spOyun", el).hidden = false;
    U.$("#spPuan", el).textContent = "0"; U.$("#spGeri", el).className = "geri"; U.$("#spGeri", el).innerHTML = '<p class="soluk">Doğru seçeneğe dokun.</p>';
    Ses.efekt("basla"); ciz(); requestAnimationFrame(sayac);
  }
  function soruHtml(q, buyuk) {
    const kutu = document.createElement("div");
    if (q.tex) U.texYaz(kutu, q.tex.replace("\\square", "\\boxed{\\;?\\;}"), true);
    else kutu.innerHTML = `<div class="metin-soru" style="${buyuk ? "" : "font-size:1.2rem"}">${q.metin}</div>`;
    return kutu;
  }
  function ciz() {
    const q = sp.soru, k = U.$("#spSoru", el);
    U.$("#spKonuAd", el).textContent = q.tur;
    k.innerHTML = ""; k.appendChild(soruHtml(q, true));
    U.$("#spSecenek", el).innerHTML = q.secenekler.map((s) => `<button type="button" data-s="${U.kacis(s)}">${U.kacis(s)}</button>`).join("");
    U.$$("#spSeri i", el).forEach((i, j) => i.classList.toggle("dolu", sp.seri > 0 && (sp.seri % 5 === 0 || j < sp.seri % 5)));
    if (U.animasyon()) { gsap.from(k, { scale: .94, opacity: 0, duration: .3, ease: "back.out(2)" }); gsap.from(U.$$("#spSecenek button", el), { y: 12, opacity: 0, stagger: .04, duration: .25 }); }
  }
  function sayac(t) {
    if (!sp || sp.bitti) return;
    const kalan = Math.max(0, (sp.bitis - t) / 1000), sn = Math.ceil(kalan);
    U.$("#spKalan", el).textContent = sn; U.$("#spIlerleme", el).style.strokeDashoffset = 175.9 * (1 - kalan / sp.sure);
    U.$("#spHalka", el).classList.toggle("acil", kalan <= 10);
    if (kalan <= 10 && sn !== sp.sonSn && sn > 0) { sp.sonSn = sn; Ses.efekt("tik"); }
    if (kalan <= 0) { bitir(); return; }
    requestAnimationFrame(sayac);
  }
  function cevap(s) {
    if (!sp || sp.bitti) return;
    const q = sp.soru, k = sp.karne[q.tur] || (sp.karne[q.tur] = [0, 0]), g = U.$("#spGeri", el);
    if (s === q.dogru) {
      sp.seri++; const bonus = sp.seri % 5 === 0 ? 5 : 0; sp.puan += 10 + bonus; sp.dogru++; k[0]++;
      g.className = "geri dogru"; g.innerHTML = `<span class="puan-rozet">+${10 + bonus}</span><p>Doğru!${bonus ? " 5'li seri bonusu." : ""}</p>`;
      Ses.efekt(bonus ? "seri" : "dogru");
    } else {
      sp.seri = 0; sp.puan -= 5; sp.yanlis++; k[1]++; sp.hatalar.push({ q, s });
      g.className = "geri yanlis"; g.innerHTML = `<span class="puan-rozet">−5</span><p>Doğru cevap: <b class="mono">${U.kacis(q.dogru)}</b>${q.aciklama ? `<br><span class="soluk">${q.aciklama}</span>` : ""}</p>`;
      Ses.efekt("yanlis");
    }
    U.$("#spPuan", el).textContent = sp.puan;
    sp.soru = soru(sp.konular); ciz();
  }
  function bitir() {
    sp.bitti = true; Ses.efekt("bitis");
    U.$("#spOyun", el).hidden = true;
    const s = U.$("#spSonuc", el); s.hidden = false;
    const konular = Object.keys(sp.karne);
    s.innerHTML = `<div class="panel"><span class="etiket">Bitiş çizgisi</span><h2>${sp.puan >= 150 ? "Pist rekoru gibi!" : sp.puan >= 60 ? "Güzel sürüş!" : "Bir tur daha?"}</h2>
        <div class="metrikler"><div class="metrik"><small>Puan</small><b>${sp.puan}</b></div><div class="metrik"><small>Doğru</small><b>${sp.dogru}</b></div><div class="metrik"><small>Yanlış</small><b>${sp.yanlis}</b></div><div class="metrik"><small>İsabet</small><b>%${sp.dogru + sp.yanlis ? Math.round(100 * sp.dogru / (sp.dogru + sp.yanlis)) : 0}</b></div></div>
        ${konular.length ? '<span class="etiket soluk">Konu karnesi</span><div class="grafik-kutu" id="spKarne" style="height:300px"></div>' : ""}
        <div class="satir"><button class="btn btn-ana" id="spTekrar">Yeni Sprint</button><button class="btn btn-ikinci" id="spAyar">Konuları değiştir</button></div></div>
      ${sp.hatalar.length ? `<div class="panel"><span class="etiket">Pit stop: doğrularıyla tekrar et</span><div class="yigin" id="spHatalar"></div></div>` : ""}`;
    if (konular.length) MC.grafik.cubuk(U.$("#spKarne", s), { kategoriler: konular, seriler: [{ ad: "Doğru", degerler: konular.map((k) => sp.karne[k][0]), renk: "#35e0b0" }, { ad: "Yanlış", degerler: konular.map((k) => sp.karne[k][1]), renk: "#ff4d61" }] });
    const h = U.$("#spHatalar", s);
    if (h) sp.hatalar.forEach(({ q, s: sec }) => {
      const kutu = document.createElement("div"); kutu.className = "panel-ic";
      kutu.appendChild(soruHtml(q, false));
      kutu.insertAdjacentHTML("beforeend", `<p>Senin cevabın: <s class="soluk">${U.kacis(sec)}</s> → Doğrusu: <b class="mono">${U.kacis(q.dogru)}</b>${q.aciklama ? `<br><span class="soluk">${q.aciklama}</span>` : ""}</p>`);
      h.appendChild(kutu);
    });
    U.$("#spTekrar", s).addEventListener("click", basla);
    U.$("#spAyar", s).addEventListener("click", () => { s.hidden = true; U.$("#spKurulum", el).hidden = false; });
  }
  MC.modul("sprint", { baslik: "Formula Sprint", kur });
  MC.sprintSoru = soru;
})();
