/* =====================================================================
   ARAYÜZ — yardımcılar, yönlendirici (#ana, #oyunlar, #dedektor-91 …), ses düğmeleri.
   Her modül MC.modul(ad, {kur, goster}) ile kendini kaydeder; ilk ziyarette kurulur.
   ===================================================================== */
"use strict";
(function () {
  const U = {};
  U.$ = (s, kok = document) => kok.querySelector(s);
  U.$$ = (s, kok = document) => [...kok.querySelectorAll(s)];
  U.kacis = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  U.html = (el, h) => { el.innerHTML = h; U.tex(el); return el; };
  U.sec = (dizi) => dizi[Math.floor(Math.random() * dizi.length)];
  U.karistir = (d) => { const a = [...d]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.depoAl = (k, v) => { try { const x = localStorage.getItem(k); return x === null ? v : JSON.parse(x); } catch (e) { return v; } };
  U.depoYaz = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  U.animasyon = () => window.gsap && !MC.uc.AZ_HAREKET;

  /* LaTeX: metindeki $…$ ve $$…$$ parçalarını KaTeX ile çizer */
  U.tex = function (el) {
    if (!window.renderMathInElement) return;
    try { renderMathInElement(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false }); } catch (e) {}
  };
  U.texYaz = function (el, tex, gosterim = true) {
    if (window.katex) { try { katex.render(tex, el, { displayMode: gosterim, throwOnError: false }); return; } catch (e) {} }
    el.textContent = tex;
  };

  /* Sekme grubu: [{id, ad}] → düğmeler; seçilince cb(id) */
  U.sekmeler = function (kap, liste, cb, secili) {
    kap.classList.add("sekmeler"); kap.setAttribute("role", "tablist");
    kap.innerHTML = liste.map((s) => `<button role="tab" data-id="${s.id}" aria-selected="false">${s.ad}</button>`).join("");
    const sec = (id) => { U.$$("button", kap).forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id)); cb(id); };
    kap.addEventListener("click", (e) => { const b = e.target.closest("button[data-id]"); if (b) { MC.Ses.efekt("dokun"); sec(b.dataset.id); } });
    sec(secili || liste[0].id);
    return sec;
  };
  /* Segment (tek seçim) */
  U.segment = function (kap, liste, deger, cb) {
    kap.classList.add("segment");
    kap.innerHTML = liste.map(([d, ad]) => `<button type="button" data-d="${d}" aria-pressed="${String(d) === String(deger)}">${ad}</button>`).join("");
    kap.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      U.$$("button", kap).forEach((x) => x.setAttribute("aria-pressed", x === b)); MC.Ses.efekt("sec"); cb(b.dataset.d);
    });
  };
  let bildirimZaman = null;
  U.bildir = function (metin) {
    let el = U.$("#bildirim");
    if (!el) { el = document.createElement("div"); el.id = "bildirim"; el.className = "bildirim"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = metin; el.hidden = false; clearTimeout(bildirimZaman); bildirimZaman = setTimeout(() => (el.hidden = true), 2600);
  };

  /* ---------- Yönlendirici ---------- */
  const moduller = {};
  MC.modul = (ad, tanim) => { moduller[ad] = { ...tanim, kuruldu: false }; };
  U.git = function (ad, param) { const h = "#" + ad + (param ? "-" + param : ""); if (location.hash === h) yonlendir(); else location.hash = h; };
  function yonlendir() {
    const ham = (location.hash || "#").slice(1);
    const [ad, ...kalan] = ham.split("-");
    const hedef = moduller[ad] ? ad : Object.keys(moduller)[0], param = kalan.join("-") || null;
    U.$$(".gorunum").forEach((g) => g.classList.toggle("aktif", g.id === "g-" + hedef));
    U.$$("nav.menu a").forEach((a) => { if (a.dataset.git === hedef) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    const m = moduller[hedef], el = U.$("#g-" + hedef);
    if (!m.kuruldu) { m.kuruldu = true; m.kur(el); }
    if (m.goster) m.goster(el, param);
    const menu = U.$(`nav.menu a[data-git="${hedef}"]`); if (menu) menu.scrollIntoView({ block: "nearest", inline: "nearest" });
    document.title = (m.baslik ? m.baslik + " · " : "") + (U.siteAdi || "Master Class Sayılar");
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  U.baslat = function () {
    window.addEventListener("hashchange", yonlendir);
    document.addEventListener("click", (e) => { const a = e.target.closest("[data-git]"); if (a && a.tagName === "A") MC.Ses.efekt("dokun"); });
    /* Ses düğmeleri */
    const mb = U.$("#muzikBtn"), eb = U.$("#efektBtn");
    mb.addEventListener("click", () => { const ac = mb.getAttribute("aria-pressed") !== "true"; if (MC.Ses.muzikAc(ac) !== false) mb.setAttribute("aria-pressed", ac); });
    const efektGoster = () => { eb.setAttribute("aria-pressed", MC.Ses.efektAcik); U.$("#efektDalga").style.opacity = MC.Ses.efektAcik ? 1 : .15; };
    eb.addEventListener("click", () => {
      MC.Ses.efektAcik = !MC.Ses.efektAcik; try { localStorage.setItem("mc_efekt", MC.Ses.efektAcik ? "1" : "0"); } catch (e) {}
      efektGoster(); MC.Ses.efekt("dokun");
      const fy = U.$("#fyCerceve"); if (fy && fy.contentWindow) fy.contentWindow.postMessage({ mc: "ses", acik: MC.Ses.efektAcik }, "*");
    });
    efektGoster();
    const tb = U.$("#tamEkranBtn");
    if (tb) tb.addEventListener("click", () => {
      const d = document.documentElement;
      if (!document.fullscreenElement) { (d.requestFullscreen ? d.requestFullscreen() : Promise.reject()).catch(() => U.bildir("Bu tarayıcı tam ekranı desteklemiyor.")); }
      else document.exitFullscreen();
    });
    yonlendir();
  };
  MC.ui = U;
})();
