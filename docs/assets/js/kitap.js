/* =====================================================================
   KİTAP HAKEM PANELİ — geometri soru kitabının sorularını uzman hakemler inceler
   · İçerik GitHub'da DEĞİL, Supabase'deki kitap_icerik tablosundadır (yayımlanmamış eser).
   · Hakem: yazarın listesine eklenen e-postayla hesap açar, soruları önce kendisi çözer
     (kör çözüm), sonra cevap anahtarını ve çözümü görür, karar ve not bırakır.
   · Yönetici (yazar): hakem ekler/çıkarır, içerik yükler (JSON), soru durumunu değiştirir,
     bölümü kitap ya da cevap anahtarı olarak yazdırır, soruyu Çözüm Stüdyosu'nda açar.
   Kurulum: veritabani/kitap.sql
   ===================================================================== */
"use strict";
(function () {
  MC.uc = MC.uc || { AZ_HAREKET: matchMedia("(prefers-reduced-motion: reduce)").matches };
  const U = MC.ui, B = MC.bulut, K = (MC.kitap = {});
  const HARF = ["A", "B", "C", "D", "E"];
  const DURUM = { taslak: "Taslak", incelemede: "İncelemede", onaylandi: "Onaylandı", duzeltilecek: "Düzeltilecek", cikarildi: "Çıkarıldı" };
  const KARAR = { onay: "Onay", duzelt: "Düzeltilmeli", cikar: "Çıkarılsın", yorum: "Yorum" };
  let aktifKitap = null, yetki = null, icerik = [], gorusler = [], hakemler = [], secili = null, sekme = "icerik", secim = {}, acikGoster = false;
  const ana = () => U.$("#kpAna");

  /* ---------------- Oturum ---------------- */
  const DEPO = "mc_yonetici_oturum";
  let oturum = (() => { try { return JSON.parse(sessionStorage.getItem(DEPO) || localStorage.getItem(DEPO) || "null"); } catch (e) { return null; } })();
  function oturumKaydet(r, kalici) {
    oturum = { erisim: r.access_token, yenile: r.refresh_token, bitis: r.expires_at ? r.expires_at * 1000 : Date.now() + (r.expires_in || 3600) * 1000,
      eposta: (r.user && r.user.email) || (oturum && oturum.eposta) || "", kalici: !!kalici };
    try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); (kalici ? localStorage : sessionStorage).setItem(DEPO, JSON.stringify(oturum)); } catch (e) {}
  }
  function oturumSil() { oturum = null; try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); } catch (e) {} }
  async function token() {
    if (!oturum) throw new Error("oturum_yok");
    if (oturum.bitis - Date.now() < 60000) oturumKaydet(await B.istek("/auth/v1/token?grant_type=refresh_token", { yontem: "POST", govde: { refresh_token: oturum.yenile } }), oturum.kalici);
    return oturum.erisim;
  }
  async function api(yol, s = {}) {
    let t; try { t = await token(); } catch (e) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); }
    try { return await B.istek(yol, { ...s, token: t }); }
    catch (e) { if (e.durum === 401 || /JWT/i.test(e.message)) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); } throw e; }
  }
  const hataYaz = (e) => (e && e.message === "oturum_bitti" ? null : /kitap_|PGRST205|does not exist/i.test(e.message || "") ? "Kitap tabloları kurulmamış: veritabani/kitap.sql dosyasını Supabase'de çalıştır." : B.hataMetni(e));
  function ustCiz() {
    const k = U.$("#kpKullanici"); if (!k) return;
    k.innerHTML = oturum ? `<span class="soluk st-eposta">${U.kacis(oturum.eposta || "")}${yetki ? ` · ${yetki === "yonetici" ? "yazar" : "hakem"}` : ""}</span><button class="ses-btn" id="kpCikis" type="button">Çıkış</button>` : "";
    const c = U.$("#kpCikis"); if (c) c.onclick = async () => { try { await B.istek("/auth/v1/logout", { yontem: "POST", token: oturum.erisim }); } catch (e) {} oturumSil(); location.reload(); };
  }
  function girisCiz(mesaj, kayit) {
    yetki = null; ustCiz();
    ana().innerHTML = `<form class="panel st-giris" id="kpForm" novalidate>
        <span class="etiket" style="color:var(--altin)">Uzman hakem paneli</span><h2>${kayit ? "Hakem hesabı oluştur" : "Giriş"}</h2>
        <p class="soluk">${kayit ? "Yazarın seni hakem olarak eklediği e-posta adresiyle hesap aç. E-postana gelen doğrulama bağlantısına tıkladıktan sonra giriş yapabilirsin." : "Geometri soru kitabının taslak sorularını incelemek için giriş yap. Bu sayfadaki içerik yayımlanmamış bir eserdir; paylaşma."}</p>
        <label class="alan"><span>E-posta</span><input class="girdi" id="kpEposta" type="email" autocomplete="username" required></label>
        <label class="alan"><span>Şifre${kayit ? " (en az 8 karakter)" : ""}</span><input class="girdi" id="kpSifre" type="password" autocomplete="${kayit ? "new-password" : "current-password"}" required></label>
        ${kayit ? "" : '<label class="anahtar"><input type="checkbox" id="kpKalici"> Bu cihazda oturumu açık tut</label>'}
        <p class="hata-metin" id="kpHata" role="alert">${mesaj ? U.kacis(mesaj) : ""}</p>
        <div class="satir"><button class="btn btn-ana" type="submit">${kayit ? "Hesap oluştur" : "Giriş yap"}</button>
          <button class="btn btn-hayalet" type="button" id="kpDegis">${kayit ? "Hesabım var: giriş" : "Hesabım yok: oluştur"}</button>
          ${kayit ? "" : '<button class="btn btn-hayalet" type="button" id="kpUnuttum">Şifremi unuttum</button>'}</div></form>`;
    const h = U.$("#kpHata"), ep = U.$("#kpEposta");
    U.$("#kpDegis").onclick = () => girisCiz("", !kayit);
    const un = U.$("#kpUnuttum"); if (un) un.onclick = async () => {
      if (!ep.value.trim()) { h.textContent = "Önce e-posta adresini yaz."; return; }
      try { await B.istek("/auth/v1/recover?redirect_to=" + encodeURIComponent(location.href.split("#")[0]), { yontem: "POST", govde: { email: ep.value.trim() } }); h.style.color = "var(--turkuaz)"; h.textContent = "Şifre yenileme bağlantısı e-postana gönderildi."; }
      catch (e) { h.textContent = B.hataMetni(e); }
    };
    U.$("#kpForm").addEventListener("submit", async (e) => {
      e.preventDefault(); h.style.color = ""; const sifre = U.$("#kpSifre").value;
      if (kayit) {
        if (sifre.length < 8) { h.textContent = "Şifre en az 8 karakter olmalı."; return; }
        h.textContent = "Hesap oluşturuluyor…";
        try { const r = await B.istek("/auth/v1/signup?redirect_to=" + encodeURIComponent(location.href.split("#")[0]), { yontem: "POST", govde: { email: ep.value.trim().toLowerCase(), password: sifre } });
          if (r && r.access_token) { oturumKaydet(r, false); basla(); return; }
          girisCiz("Hesap oluşturuldu. E-postana gelen doğrulama bağlantısına tıkla, sonra buradan giriş yap."); U.$("#kpHata").style.color = "var(--turkuaz)"; }
        catch (err) { h.textContent = B.hataMetni(err); }
        return;
      }
      h.textContent = "Giriş yapılıyor…";
      try { oturumKaydet(await B.istek("/auth/v1/token?grant_type=password", { yontem: "POST", govde: { email: ep.value.trim(), password: sifre } }), U.$("#kpKalici").checked); basla(); }
      catch (err) { h.textContent = B.hataMetni(err); }
    });
  }

  /* ---------------- Veri ---------------- */
  async function yukle() {
    [icerik, gorusler] = await Promise.all([api("/rest/v1/kitap_icerik?select=*&order=bolum,tur,sira"), api("/rest/v1/kitap_gorusler?select=*&order=olusturma")]);
    if (yetki === "yonetici") hakemler = await api("/rest/v1/kitap_hakemler?select=*&order=eklenme");
  }
  const sorular = () => icerik.filter((x) => x.tur === "soru");
  const tumBolumler = () => icerik.filter((x) => x.tur === "bolum").sort((a, b) => (a.veri.kitapSira || 0) - (b.veri.kitapSira || 0) || a.sira - b.sira);
  const kitapAdi = (b) => (b && b.veri && b.veri.kitap) || "Kitap";
  const kitaplar = () => [...new Set(tumBolumler().map(kitapAdi))];
  const bolumler = () => tumBolumler().filter((b) => !aktifKitap || kitapAdi(b) === aktifKitap);
  const kitabinSorulari = () => sorular().filter((s) => bolumler().some((b) => b.id === s.bolum) || (!tumBolumler().some((b) => b.id === s.bolum) && kitaplar().length <= 1));
  const gorusOf = (id) => gorusler.filter((g) => g.icerik_id === id);
  const benimGorus = (id) => gorusOf(id).filter((g) => g.yazar === benimId());
  function benimId() { try { return JSON.parse(atob(oturum.erisim.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).sub; } catch (e) { return null; } }
  function ozetDurum(x) {
    const g = gorusOf(x.id), d = x.veri.dogru, cevaplar = g.filter((y) => y.cevap);
    const celiski = cevaplar.some((y) => y.cevap !== d), itiraz = g.some((y) => y.karar === "duzelt" || y.karar === "cikar"), onay = g.filter((y) => y.karar === "onay").length;
    return { celiski, itiraz, onay, sayi: g.length, renk: celiski ? "kirmizi" : itiraz ? "turuncu" : onay ? "yesil" : "gri" };
  }
  function testler(bolumId) {
    const m = new Map(); for (const s of sorular().filter((x) => x.bolum === bolumId).sort((a, b) => a.sira - b.sira)) { const t = s.veri.test || "Test"; if (!m.has(t)) m.set(t, []); m.get(t).push(s); }
    return [...m.entries()];
  }

  /* ---------------- Yerleşim ---------------- */
  async function basla() {
    if (!B || !B.ayarli()) { ana().innerHTML = '<div class="panel st-giris"><p class="hata-metin">Bulut bağlantısı ayarlı değil.</p></div>'; return; }
    if (!oturum) return girisCiz();
    ana().innerHTML = '<p class="soluk">Yetki denetleniyor…</p>';
    try { yetki = await api("/rest/v1/rpc/kitap_yetki", { yontem: "POST", govde: {} }); }
    catch (e) { const m = hataYaz(e); if (m) ana().innerHTML = `<div class="panel st-giris"><p class="hata-metin">${U.kacis(m)}</p></div>`; return; }
    ustCiz();
    if (!yetki) { ana().innerHTML = `<div class="panel st-giris"><h2>Henüz yetkin yok</h2><p class="soluk">Giriş yaptın (${U.kacis(oturum.eposta)}) ama bu e-posta hakem listesinde değil. Yazar seni eklediğinde sayfayı yenile; içerik burada görünecek.</p></div>`; return; }
    try { await yukle(); } catch (e) { const m = hataYaz(e); if (m) ana().innerHTML = `<div class="panel st-giris"><p class="hata-metin">${U.kacis(m)}</p></div>`; return; }
    if (!aktifKitap || !kitaplar().includes(aktifKitap)) aktifKitap = kitaplar()[0] || null;
    if (!secili) { const s = sorular().sort((a, b) => a.bolum.localeCompare(b.bolum) || a.sira - b.sira)[0]; secili = (bolumler()[0] || s || {}).id || null; }
    ciz();
  }
  function ciz() {
    ustCiz();
    const yon = yetki === "yonetici";
    ana().innerHTML = `<div class="bolum-basi"><span class="etiket" style="color:var(--altin)">Geometri soru kitabı · ${yon ? "yazar paneli" : "hakem paneli"}</span>
        <h2>Soruları çöz, değerlendir, not bırak</h2>
        <p>${yon ? "Hakemlerin görüşleri her sorunun altında birikir. Kırmızı: bir hakemin cevabı anahtarla uyuşmuyor. Turuncu: düzeltme ya da çıkarma önerisi var. Yeşil: onaylandı." : "Her soruyu önce kendin çöz ve cevabını işaretle; cevap anahtarı ve çözüm ondan sonra açılır. Sonra kararını ve notunu bırak. Notların yalnızca yazar ve diğer hakemlerce görülür."}</p></div>
      ${yon ? '<div id="kpSekme" style="margin-bottom:14px"></div>' : ""}
      <div id="kpIc"></div>`;
    if (yon) U.segment(U.$("#kpSekme"), [["icerik", "İçerik ve görüşler"], ["hakem", `Hakemler · ${hakemler.length}`], ["aktar", "İçe aktar"], ["yazdir", "Yazdır"]], sekme, (v) => { sekme = v; icCiz(); });
    icCiz();
  }
  function icCiz() {
    const k = U.$("#kpIc");
    if (sekme === "hakem" && yetki === "yonetici") return hakemCiz(k);
    if (sekme === "aktar" && yetki === "yonetici") return aktarCiz(k);
    if (sekme === "yazdir" && yetki === "yonetici") return yazdirCiz(k);
    if (!icerik.length) { k.innerHTML = `<div class="panel"><p class="soluk">Henüz içerik yok.${yetki === "yonetici" ? " <b>İçe aktar</b> sekmesinden bölüm dosyasını (.json) yükle." : ""}</p></div>`; return; }
    k.innerHTML = `<div class="kp-masa"><nav class="panel kp-liste" id="kpListe" aria-label="İçindekiler"></nav><div id="kpDetay" class="yigin"></div></div>`;
    listeCiz(); detayCiz();
  }
  function listeCiz() {
    const k = U.$("#kpListe"); if (!k) return;
    const ks = kitabinSorulari(), toplam = ks.length, incelenen = ks.filter((s) => benimGorus(s.id).length).length, kl = kitaplar();
    k.innerHTML = (kl.length > 1 ? `<div class="kp-kitaplar">${kl.map((a) => `<button class="kp-kitap ${a === aktifKitap ? "secili" : ""}" data-kitap="${U.kacis(a)}">${U.kacis(a)}</button>`).join("")}</div>` : "") + `<div class="kp-ilerleme"><b>${incelenen}/${toplam}</b> soruyu inceledin<div class="kp-cubuk"><i style="width:${toplam ? (100 * incelenen) / toplam : 0}%"></i></div></div>` +
      bolumler().concat(sorular().filter((s) => !bolumler().some((b) => b.id === s.bolum)).map((s) => ({ id: s.bolum, veri: { ad: s.bolum }, sanal: true })).filter((b, i, a) => a.findIndex((x) => x.id === b.id) === i)).map((b) => `
        <div class="kp-bolum"><button class="kp-oge ${secili === b.id ? "secili" : ""}" data-sec="${b.sanal ? "" : b.id}" ${b.sanal ? "disabled" : ""}><b>${U.kacis(b.veri.ad || b.id)}</b>${b.sanal ? "" : '<small>Konu özeti ve örnekler</small>'}</button>
        ${testler(b.id).map(([t, l]) => `<div class="kp-test"><span class="etiket soluk">${U.kacis(t)}</span><div class="kp-kutular">${l.map((s) => { const o = ozetDurum(s), ben = benimGorus(s.id).length; return `<button class="kp-kutu ${o.renk} ${secili === s.id ? "secili" : ""} ${ben ? "ben" : ""}" data-sec="${s.id}" title="${U.kacis(t)} · Soru ${s.sira} · ${DURUM[s.durum]} · ${o.sayi} görüş">${s.sira}</button>`; }).join("")}</div></div>`).join("")}</div>`).join("") +
      `<p class="soluk kp-lejant"><i class="yesil"></i>onay <i class="turuncu"></i>itiraz <i class="kirmizi"></i>cevap çelişkisi <i class="gri"></i>görüş yok · altı çizili: senin incelediğin</p>`;
    k.onclick = (e) => { const kt = e.target.closest("[data-kitap]"); if (kt) { aktifKitap = kt.dataset.kitap; secili = (bolumler()[0] || {}).id || null; acikGoster = false; listeCiz(); detayCiz(); return; }
      const b = e.target.closest("[data-sec]"); if (b && b.dataset.sec) { secili = b.dataset.sec; acikGoster = false; listeCiz(); detayCiz(); if (innerWidth < 900) U.$("#kpDetay").scrollIntoView({ behavior: "smooth" }); } };
  }
  const svgHtml = (v, ad) => (v && v.kutu ? `<svg class="kp-svg" viewBox="${v.kutu.x} ${v.kutu.y} ${v.kutu.w} ${v.kutu.h}" role="img" aria-label="${U.kacis(ad || "Şekil")}">${v.icerik}</svg>` : "");
  function detayCiz() {
    const k = U.$("#kpDetay"), x = icerik.find((y) => y.id === secili); if (!k) return;
    if (!x) { k.innerHTML = '<div class="panel"><p class="soluk">Soldan bir bölüm ya da soru seç.</p></div>'; return; }
    const yon = yetki === "yonetici", v = x.veri;
    if (x.tur === "bolum") {
      k.innerHTML = `<article class="panel kp-bolum-metin"><span class="etiket" style="color:var(--altin)">Bölüm · konu özeti</span><h2>${U.kacis(v.ad)}</h2>${v.giris || ""}
          ${(v.kutular || []).map((b) => `<div class="kp-kural"><b>${U.kacis(b.baslik)}</b>${b.svg ? svgHtml(b.svg, b.baslik) : ""}<div>${b.metin}</div></div>`).join("")}
          ${(v.ornekler || []).map((o, i) => `<div class="kp-ornek"><span class="etiket soluk">Çözümlü örnek ${i + 1}</span>${o.svg ? svgHtml(o.svg, "Örnek " + (i + 1)) : ""}<p>${o.metin}</p><details><summary>Çözüm</summary>${o.cozum}</details></div>`).join("")}</article>${gorusPanel(x)}`;
      U.tex(k); gorusBagla(k, x); return;
    }
    const ben = benimGorus(x.id), cozdu = ben.some((g) => g.cevap), acik = yon ? acikGoster : cozdu, o = ozetDurum(x);
    const sec = secim[x.id] || (ben.find((g) => g.cevap) || {}).cevap || "";
    const l = sorular().filter((s) => s.bolum === x.bolum).sort((a, b) => (a.veri.test || "").localeCompare(b.veri.test || "", "tr") || a.sira - b.sira), i = l.indexOf(x);
    k.innerHTML = `<article class="panel kp-soru">
        <div class="satir" style="justify-content:space-between"><span class="etiket" style="color:var(--altin)">${U.kacis(v.test || "")} · Soru ${x.sira}${v.seviye ? " · " + U.kacis(v.seviye) : ""}</span>
          <span class="satir" style="gap:6px"><button class="mini-btn" id="kpOnceki" ${i <= 0 ? "disabled" : ""} title="Önceki soru">‹</button><button class="mini-btn" id="kpSonraki" ${i >= l.length - 1 ? "disabled" : ""} title="Sonraki soru">›</button></span></div>
        ${svgHtml(v.svg, "Soru " + x.sira + " şekli")}
        <div class="kp-metin">${v.metin}</div>
        <div class="kp-secenek">${(v.secenekler || []).map((s, j) => { const h = HARF[j], dogru = acik && h === v.dogru, yanlis = acik && sec === h && h !== v.dogru; return `<button class="kp-sec ${sec === h ? "isaretli" : ""} ${dogru ? "dogru" : ""} ${yanlis ? "yanlis" : ""}" data-harf="${h}" ${cozdu && !yon ? "disabled" : ""}><b>${h})</b> ${s}</button>`; }).join("")}</div>
        ${!yon && !cozdu ? `<div class="satir"><button class="btn btn-ana" id="kpCevapKaydet" ${sec ? "" : "disabled"}>Cevabımı kaydet ve anahtarı aç</button><span class="soluk" style="font-size:13px;align-self:center">Önce kendin çöz: cevap anahtarı ve çözüm ondan sonra görünür.</span></div>` : ""}
        ${yon ? `<div class="satir"><label class="anahtar"><input type="checkbox" id="kpAcik" ${acikGoster ? "checked" : ""}> Cevap anahtarını ve çözümü göster</label>
            <label class="alan" style="flex-direction:row;align-items:center;gap:8px"><span>Durum</span><select class="girdi" id="kpDurum">${Object.entries(DURUM).map(([d, a]) => `<option value="${d}" ${x.durum === d ? "selected" : ""}>${a}</option>`).join("")}</select></label>
            ${v.sekil ? '<button class="btn btn-hayalet btn-kucuk" id="kpStudyo">Çözüm Stüdyosu\'nda aç</button>' : ""}</div>` : ""}
        ${acik ? `<div class="kp-cozum"><span class="etiket" style="color:var(--turkuaz)">Cevap ${v.dogru}${cozdu && !yon ? (sec === v.dogru ? " · senin cevabın da bu ✓" : ` · senin cevabın ${sec} ✗`) : ""}</span>${v.cozum || ""}${v.not ? `<p class="soluk"><i>Yazar notu:</i> ${v.not}</p>` : ""}</div>` : ""}
        ${o.celiski ? '<div class="sq-uyari"><b>Cevap çelişkisi:</b> en az bir hakemin bulduğu cevap anahtarla uyuşmuyor. Soru yeniden incelenmeli.</div>' : ""}
      </article>${gorusPanel(x)}`;
    U.tex(k);
    k.querySelectorAll("[data-harf]").forEach((b) => (b.onclick = () => { secim[x.id] = b.dataset.harf; detayCiz(); }));
    const bag = (id, f, olay = "click") => { const e = U.$(id, k); if (e) e.addEventListener(olay, f); };
    bag("#kpOnceki", () => { secili = l[i - 1].id; acikGoster = false; listeCiz(); detayCiz(); });
    bag("#kpSonraki", () => { secili = l[i + 1].id; acikGoster = false; listeCiz(); detayCiz(); });
    bag("#kpAcik", (e) => { acikGoster = e.target.checked; detayCiz(); }, "change");
    bag("#kpDurum", async (e) => { try { await api(`/rest/v1/kitap_icerik?id=eq.${encodeURIComponent(x.id)}`, { yontem: "PATCH", govde: { durum: e.target.value }, ek: { Prefer: "return=minimal" } }); x.durum = e.target.value; listeCiz(); U.bildir("Durum: " + DURUM[x.durum]); } catch (err) { const m = hataYaz(err); if (m) U.bildir(m); } }, "change");
    bag("#kpStudyo", () => {
      const q = { id: "k-" + x.id, baslik: `${v.test || ""} · Soru ${x.sira}`, metin: String(v.metin).replace(/<[^>]+>/g, ""), cevapMetin: String(v.cevapDeger ?? ""), birim: v.birim || "°", ipuclari: [], cozum: "",
        nesne: v.sekil.nesne, olcek: v.sekil.olcek || null, uyduruldu: true, opaklik: .55, gorsel: null, sayac: v.sekil.nesne.length + 1 };
      try { localStorage.setItem("studyo_taslak", JSON.stringify(q)); } catch (e) {}
      window.open("../studyo/", "_blank");
    });
    bag("#kpCevapKaydet", async () => { await gorusGonder(x, { karar: "yorum", cevap: sec, metin: "" }, true); });
    gorusBagla(k, x);
  }
  function gorusPanel(x) {
    const g = gorusOf(x.id), me = benimId(), soru = x.tur === "soru";
    return `<section class="panel kp-gorusler"><span class="etiket soluk">Görüşler · ${g.length}</span>
      ${g.length ? g.map((y) => `<div class="kp-gorus ${y.karar}"><div class="satir" style="justify-content:space-between"><b>${U.kacis(y.yazar_ad || "Hakem")}</b><span class="soluk" style="font-size:12.5px">${new Date(y.olusturma).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}</span></div>
          <div><span class="kp-karar ${y.karar}">${y.karar === "yorum" && !y.metin && y.cevap ? "Çözdü" : KARAR[y.karar]}</span>${soru && y.cevap ? ` <span class="kp-cvp ${y.cevap === x.veri.dogru ? "dogru" : "yanlis"}">çözdüğü cevap: ${y.cevap}</span>` : ""}</div>
          ${y.metin ? `<p>${U.kacis(y.metin).replace(/\n/g, "<br>")}</p>` : ""}${y.yazar === me || yetki === "yonetici" ? `<button class="btn btn-hayalet btn-kucuk" data-gsil="${y.id}">Sil</button>` : ""}</div>`).join("") : '<p class="soluk">Henüz görüş yok.</p>'}
      <form class="kp-gorus-form" id="kpGorusForm"><div class="segment kp-kararlar">${Object.entries(KARAR).map(([k, a], i) => `<label><input type="radio" name="karar" value="${k}" ${i === 0 ? "checked" : ""}><span>${a}</span></label>`).join("")}</div>
        <textarea class="girdi" name="metin" rows="3" maxlength="4000" placeholder="${soru ? "Notun: dil, şekil, seçenekler, zorluk, alternatif çözüm…" : "Konu özeti hakkında notun…"}"></textarea>
        <button class="btn btn-ikinci">Görüşü gönder</button></form></section>`;
  }
  function gorusBagla(k, x) {
    const f = U.$("#kpGorusForm", k);
    if (f) f.addEventListener("submit", (e) => { e.preventDefault(); const karar = f.karar.value, metin = f.metin.value.trim(); if (karar !== "onay" && !metin) { U.bildir("Bu karar için kısa bir not yaz."); return; } gorusGonder(x, { karar, metin, cevap: x.tur === "soru" ? (benimGorus(x.id).find((g) => g.cevap) || {}).cevap || secim[x.id] || "" : "" }); });
    k.querySelectorAll("[data-gsil]").forEach((b) => (b.onclick = async () => { if (!b.dataset.emin) { b.dataset.emin = 1; b.textContent = "Silinsin mi?"; return; } try { await api(`/rest/v1/kitap_gorusler?id=eq.${b.dataset.gsil}`, { yontem: "DELETE", ek: { Prefer: "return=minimal" } }); gorusler = gorusler.filter((g) => String(g.id) !== b.dataset.gsil); listeCiz(); detayCiz(); } catch (e) { const m = hataYaz(e); if (m) U.bildir(m); } }));
  }
  async function gorusGonder(x, g, sessiz) {
    try {
      const r = await api("/rest/v1/kitap_gorusler", { yontem: "POST", govde: { icerik_id: x.id, karar: g.karar, cevap: g.cevap || "", metin: g.metin || "" }, ek: { Prefer: "return=representation" } });
      gorusler.push(...(Array.isArray(r) ? r : [r])); listeCiz(); detayCiz(); MC.Ses.efekt(sessiz ? "sec" : "dogru");
      if (!sessiz) U.bildir("Görüşün kaydedildi.");
    } catch (e) { const m = hataYaz(e); if (m) U.bildir(m); }
  }

  /* ---------------- Yazar: hakemler ---------------- */
  function hakemCiz(k) {
    k.innerHTML = `<div class="panel"><span class="etiket" style="color:var(--altin)">Hakem ekle</span>
        <p class="soluk">Hakemin e-postasını ekle ve ona şu adresi gönder: <b class="mono">${U.kacis(location.href.split("#")[0])}</b>. Aynı e-postayla “Hesabım yok: oluştur” diyerek hesap açar, e-postasını doğrular ve girer. Listeden çıkardığın ya da pasif yaptığın hakem içeriği artık göremez.</p>
        <form class="satir" id="kpHakemForm"><input class="girdi" name="eposta" type="email" placeholder="hakem@ornek.com" required style="flex:2 1 220px"><input class="girdi" name="ad" placeholder="Ad Soyad (görüşlerde görünür)" style="flex:2 1 200px"><button class="btn btn-ana">Ekle</button></form></div>
      <div class="panel"><span class="etiket soluk">Hakemler</span>${hakemler.length ? `<div class="kp-hakemler">${hakemler.map((h) => { const n = gorusler.filter((g) => g.yazar_ad === (h.ad || h.eposta)).length; return `<div class="satir"><b style="flex:1">${U.kacis(h.ad || "—")}</b><span class="mono soluk" style="flex:2">${U.kacis(h.eposta)}</span><span class="soluk">${n} görüş</span><label class="anahtar"><input type="checkbox" data-aktif="${U.kacis(h.eposta)}" ${h.aktif ? "checked" : ""}> aktif</label><button class="mini-btn" data-hsil="${U.kacis(h.eposta)}" title="Listeden çıkar">×</button></div>`; }).join("")}</div>` : '<p class="soluk">Henüz hakem yok.</p>'}</div>`;
    U.$("#kpHakemForm", k).addEventListener("submit", async (e) => {
      e.preventDefault(); const f = e.target, eposta = f.eposta.value.trim().toLowerCase();
      try { await api("/rest/v1/kitap_hakemler?on_conflict=eposta", { yontem: "POST", govde: [{ eposta, ad: f.ad.value.trim(), aktif: true }], ek: { Prefer: "resolution=merge-duplicates,return=minimal" } }); hakemler = await api("/rest/v1/kitap_hakemler?select=*&order=eklenme"); ciz(); U.bildir("Hakem eklendi."); }
      catch (err) { const m = hataYaz(err); if (m) U.bildir(m); }
    });
    k.onclick = async (e) => { const s = e.target.closest("[data-hsil]"); if (!s) return; if (!s.dataset.emin) { s.dataset.emin = 1; s.textContent = "?"; return; } try { await api(`/rest/v1/kitap_hakemler?eposta=eq.${encodeURIComponent(s.dataset.hsil)}`, { yontem: "DELETE", ek: { Prefer: "return=minimal" } }); hakemler = hakemler.filter((h) => h.eposta !== s.dataset.hsil); ciz(); } catch (err) { const m = hataYaz(err); if (m) U.bildir(m); } };
    k.onchange = async (e) => { const c = e.target.closest("[data-aktif]"); if (!c) return; try { await api(`/rest/v1/kitap_hakemler?eposta=eq.${encodeURIComponent(c.dataset.aktif)}`, { yontem: "PATCH", govde: { aktif: c.checked }, ek: { Prefer: "return=minimal" } }); U.bildir(c.checked ? "Hakem aktif." : "Hakem pasif: içeriği göremez."); } catch (err) { const m = hataYaz(err); if (m) U.bildir(m); } };
  }

  /* ---------------- Yazar: içe aktar ---------------- */
  function aktarCiz(k) {
    k.innerHTML = `<div class="panel"><span class="etiket" style="color:var(--altin)">Bölüm dosyası yükle</span>
      <p class="soluk">Claude'un hazırladığı bölüm dosyasını (.json) seç. Aynı kimlikli bölüm ve sorular güncellenir; hakem görüşleri korunur. Dosya bu tarayıcıdan doğrudan veritabanına gider, GitHub'a girmez.</p>
      <label class="btn btn-ana sq-dosya">Dosya seç<input type="file" accept=".json,application/json" id="kpDosya" hidden></label><div id="kpAktarSonuc" style="margin-top:10px"></div></div>
      <div class="panel"><span class="etiket soluk">Yüklü bölümler</span>${tumBolumler().map((b) => `<div class="satir" style="align-items:center"><span style="flex:1"><span class="soluk">${U.kacis(kitapAdi(b))} · </span><b>${U.kacis(b.veri.ad)}</b> <span class="soluk">(${sorular().filter((x) => x.bolum === b.id).length} soru)</span></span><button class="btn btn-hayalet btn-kucuk" data-bsil="${U.kacis(b.id)}">Bölümü sil</button></div>`).join("") || '<p class="soluk">Yok.</p>'}
      <p class="soluk" style="font-size:13px">Silme, bölümün bütün sorularını ve onlara yazılmış hakem görüşlerini de siler. İki kez basman gerekir.</p></div>`;
    k.onclick = async (e) => { const b = e.target.closest("[data-bsil]"); if (!b) return; if (!b.dataset.emin) { b.dataset.emin = 1; b.textContent = "Emin misin? Tekrar bas"; return; }
      try { await api(`/rest/v1/kitap_icerik?bolum=eq.${encodeURIComponent(b.dataset.bsil)}`, { yontem: "DELETE", ek: { Prefer: "return=minimal" } }); await yukle(); secili = null; aktarCiz(k); U.bildir("Bölüm silindi."); } catch (err) { const m = hataYaz(err); if (m) U.bildir(m); } };
    U.$("#kpDosya", k).addEventListener("change", async (e) => {
      const f = e.target.files[0], s = U.$("#kpAktarSonuc", k); if (!f) return;
      try {
        const d = JSON.parse(await f.text()); if (!Array.isArray(d.icerik)) throw new Error("Bu bir kitap bölüm dosyası değil.");
        const satir = d.icerik.map((x) => ({ id: x.id, tur: x.tur, bolum: x.bolum, sira: x.sira || 0, veri: x.veri, durum: x.durum || "incelemede" }));
        s.innerHTML = `<p class="soluk">${satir.length} kayıt yükleniyor…</p>`;
        for (let i = 0; i < satir.length; i += 25) await api("/rest/v1/kitap_icerik?on_conflict=id", { yontem: "POST", govde: satir.slice(i, i + 25), ek: { Prefer: "resolution=merge-duplicates,return=minimal" } });
        await yukle(); const mesaj = `<div class="basari"><b>${satir.length} kayıt yüklendi.</b> ${satir.filter((x) => x.tur === "soru").length} soru, ${satir.filter((x) => x.tur === "bolum").length} bölüm.</div>`;
        aktarCiz(k); U.$("#kpAktarSonuc", k).innerHTML = mesaj;
        MC.Ses.efekt("seri");
      } catch (err) { s.innerHTML = `<p class="hata-metin">${U.kacis(hataYaz(err) || err.message)}</p>`; }
    });
  }

  /* ---------------- Yazar: yazdır ---------------- */
  function yazdirCiz(k) {
    k.innerHTML = `<div class="panel"><span class="etiket" style="color:var(--altin)">Yazdır / PDF</span><p class="soluk">Bölümü kitap sayfası düzeninde yazdır ya da “PDF olarak kaydet” ile PDF yap. Çıkarılan sorular basılmaz.</p>
      <div class="yigin">${tumBolumler().map((b) => `<div class="satir"><b style="flex:1"><span class="soluk" style="font-weight:600">${U.kacis(kitapAdi(b))} · </span>${U.kacis(b.veri.ad)}</b><button class="btn btn-ikinci btn-kucuk" data-yaz="${b.id}" data-tip="kitap">Öğrenci kitabı</button><button class="btn btn-hayalet btn-kucuk" data-yaz="${b.id}" data-tip="cevap">Cevap anahtarı + çözümler</button><button class="btn btn-hayalet btn-kucuk" data-yaz="${b.id}" data-tip="hakem">Hakem raporu</button></div>`).join("") || '<p class="soluk">Bölüm yok.</p>'}</div></div>`;
    k.onclick = (e) => { const b = e.target.closest("[data-yaz]"); if (b) yazdir(b.dataset.yaz, b.dataset.tip); };
  }
  function yazdir(bolumId, tip) {
    const b = icerik.find((x) => x.id === bolumId), v = b.veri;
    const sorularHtml = testler(bolumId).map(([t, l]) => {
      l = l.filter((s) => s.durum !== "cikarildi");
      if (tip === "cevap") return `<section class="yz-test"><h2>${U.kacis(t)} · Cevap anahtarı</h2><table class="yz-anahtar"><tr>${l.map((s) => `<td>${s.sira}</td>`).join("")}</tr><tr>${l.map((s) => `<td><b>${s.veri.dogru}</b></td>`).join("")}</tr></table>
        ${l.map((s) => `<div class="yz-cozum"><b>${s.sira}.</b> ${s.veri.cozum || ""}</div>`).join("")}</section>`;
      if (tip === "hakem") return `<section class="yz-test"><h2>${U.kacis(t)} · Hakem raporu</h2>${l.map((s) => { const o = ozetDurum(s); return `<div class="yz-cozum"><b>Soru ${s.sira}</b> · ${DURUM[s.durum]} · anahtar ${s.veri.dogru} · ${o.onay} onay${o.celiski ? " · <b>CEVAP ÇELİŞKİSİ</b>" : ""}${gorusOf(s.id).map((g) => `<div>— ${U.kacis(g.yazar_ad)}: ${KARAR[g.karar]}${g.cevap ? ` (cevap ${g.cevap})` : ""}${g.metin ? ": " + U.kacis(g.metin) : ""}</div>`).join("")}</div>`; }).join("")}</section>`;
      return `<section class="yz-test"><h2>${U.kacis(t)}</h2><div class="yz-sorular">${l.map((s) => `<div class="yz-soru"><div class="yz-no">${s.sira}</div><div>${svgHtml(s.veri.svg)}<div class="yz-metin">${s.veri.metin}</div><div class="yz-sec">${s.veri.secenekler.map((x, j) => `<span><b>${HARF[j]})</b> ${x}</span>`).join("")}</div></div></div>`).join("")}</div></section>`;
    }).join("");
    const ust = `<div class="yz-kitap">${U.kacis(kitapAdi(b))}</div>`;
    const bas = ust + (tip === "kitap" ? `<section class="yz-bolum"><h1>${U.kacis(v.ad)}</h1>${v.giris || ""}${(v.kutular || []).map((x) => `<div class="kp-kural"><b>${U.kacis(x.baslik)}</b>${x.svg ? svgHtml(x.svg) : ""}<div>${x.metin}</div></div>`).join("")}${(v.ornekler || []).map((o, i) => `<div class="kp-ornek"><b>Çözümlü örnek ${i + 1}</b>${o.svg ? svgHtml(o.svg) : ""}<p>${o.metin}</p>${o.cozum}</div>`).join("")}</section>` : `<h1>${U.kacis(v.ad)}</h1>`);
    let y = U.$("#kpYazdir"); if (!y) { y = document.createElement("div"); y.id = "kpYazdir"; document.body.appendChild(y); }
    y.innerHTML = bas + sorularHtml; U.tex(y);
    document.body.classList.add("kp-yazdiriliyor");
    const bitti = () => { document.body.classList.remove("kp-yazdiriliyor"); window.removeEventListener("afterprint", bitti); };
    window.addEventListener("afterprint", bitti); setTimeout(() => window.print(), 80);
  }

  K.basla = basla;
  K._test = { ozetDurum, yukle: () => ({ icerik, gorusler, hakemler }) };
})();
