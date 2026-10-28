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
    if (yon) U.segment(U.$("#kpSekme"), [["icerik", "İçerik ve görüşler"], ["hakem", `Hakemler · ${hakemler.length}`], ["aktar", "İçe aktar"], ["analiz", "Madde analizi"], ["yazdir", "Yazdır"]], sekme, (v) => { sekme = v; icCiz(); });
    icCiz();
  }
  function icCiz() {
    const k = U.$("#kpIc");
    if (sekme === "hakem" && yetki === "yonetici") return hakemCiz(k);
    if (sekme === "aktar" && yetki === "yonetici") return aktarCiz(k);
    if (sekme === "yazdir" && yetki === "yonetici") return yazdirCiz(k);
    if (sekme === "analiz" && yetki === "yonetici") return analizCiz(k);
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
        ${acik ? `<div class="kp-cozum"><span class="etiket" style="color:var(--turkuaz)">Cevap ${v.dogru}${cozdu && !yon ? (sec === v.dogru ? " · senin cevabın da bu ✓" : ` · senin cevabın ${sec} ✗`) : ""}</span>${v.cozum || ""}${v.not ? `<p class="soluk"><i>Yazar notu:</i> ${v.not}</p>` : ""}</div>${kunyeHtml(v)}` : ""}${yon && v.analiz ? analizOzetHtml(v) : ""}
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
        ${soru && x.veri.kunye ? `<details class="kp-kontrol"><summary>Yeni nesil kontrol listesi · sorunlu gördüğün maddeleri işaretle</summary>${KONTROL.map((m, i) => `<label class="anahtar"><input type="checkbox" name="kl" value="${i}"> ${m}</label>`).join("")}</details>` : ""}
        <textarea class="girdi" name="metin" rows="3" maxlength="4000" placeholder="${soru ? "Notun: dil, şekil, seçenekler, zorluk, alternatif çözüm…" : "Konu özeti hakkında notun…"}"></textarea>
        <button class="btn btn-ikinci">Görüşü gönder</button></form></section>`;
  }
  function gorusBagla(k, x) {
    const f = U.$("#kpGorusForm", k);
    if (f) f.addEventListener("submit", (e) => { e.preventDefault(); const karar = f.karar.value, kl = [...f.querySelectorAll('[name="kl"]:checked')].map((c) => KONTROL[+c.value]), metin = (kl.length ? "Kontrol listesinde sorun: " + kl.join("; ") + (f.metin.value.trim() ? "\n" : "") : "") + f.metin.value.trim(); if (karar !== "onay" && !metin) { U.bildir("Bu karar için kısa bir not yaz."); return; } gorusGonder(x, { karar, metin, cevap: x.tur === "soru" ? (benimGorus(x.id).find((g) => g.cevap) || {}).cevap || secim[x.id] || "" : "" }); });
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

  /* ---------------- Yeni nesil: madde künyesi ve kontrol listesi ---------------- */
  // Hakemin bağlam temelli maddeyi denetlediği sorular (MEB 2026 kılavuzunun ilkeleri + Haladyna ve ark. 2002)
  const KONTROL = [
    "Bağlam işlevsel değil: soru bağlam okunmadan da çözülebiliyor",
    "Okuma yükü ölçülen beceriye göre fazla",
    "Bağlam gerçekçi / yaşa uygun değil ya da önyargı içeriyor",
    "Şekil ya da tablo gereksiz, eksik veya yanıltıcı",
    "Kök tek ve açık bir görev vermiyor",
    "Birden çok doğru ya da hiç doğru seçenek yok",
    "Çeldiriciler gerçek yanılgılara dayanmıyor / kolay eleniyor",
    "Seçenekler uzunluk, dil ya da sıralama ipucu veriyor"];
  function kunyeHtml(v) {
    const k = v.kunye; if (!k) return "";
    const sat = (a, b) => (b ? `<tr><th>${a}</th><td>${b}</td></tr>` : "");
    return `<details class="kp-kunye" open><summary>Madde künyesi</summary><table>
      ${sat("Kazanım", U.kacis(k.kazanim))}${sat("Beceriler", U.kacis((k.beceri || []).join(" · ")))}${sat("Süreç (PISA)", U.kacis(k.surec))}${sat("Bağlam", U.kacis(k.baglam))}
      ${sat("Bilişsel düzey", U.kacis(k.bloom))}${sat("Tahmini güçlük", U.kacis(k.gucluk))}${sat("Tahmini süre", k.sure ? k.sure + " sn" : "")}</table>
      ${k.celdirici ? `<b>Çeldiriciler neden orada?</b><ul>${Object.entries(k.celdirici).sort().map(([h, g]) => `<li><b>${h})</b> ${U.kacis(g)}</li>`).join("")}</ul>` : ""}
      ${k.neden ? `<p class="soluk"><b>Yeni nesil gerekçesi:</b> ${U.kacis(k.neden)}</p>` : ""}</details>`;
  }
  function analizOzetHtml(v) {
    const a = v.analiz, r = AN.yorum(a.p, a.r);
    return `<div class="kp-analiz-ozet"><span class="etiket soluk">Pilot uygulama · ${U.kacis(a.tarih || "")} · n = ${a.n}</span>
      <div>p = <b>${a.p.toFixed(2)}</b> · r = <b>${a.r.toFixed(2)}</b> · <span class="kp-rozet ${r.renk}">${r.metin}</span></div>
      <div class="soluk" style="font-size:13px">Seçenek oranları (üst %27 / alt %27): ${HARF.map((h) => `${h}${h === v.dogru ? "✓" : ""} ${Math.round(100 * (a.ust[h] || 0))}/${Math.round(100 * (a.alt[h] || 0))}`).join(" · ")}</div></div>`;
  }

  /* ---------------- Yazar: madde analizi (Klasik Test Kuramı) ----------------
     Veri yalnızca bu tarayıcıda işlenir; öğrenci adı değil kod girilir (KVKK).
     p: madde güçlüğü (doğru oranı) · r: ayırıcılık, üst–alt %27 grup farkı (Kelley)
     rpb: düzeltilmiş nokta çift serili korelasyon · KR-20: iç tutarlılık
     Ölçüt (Ebel ve Frisbie): r ≥ .40 çok iyi, .30–.39 iyi, .20–.29 düzeltilmeli, < .20 çıkarılmalı/yenilenmeli. */
  const AN = {
    oku(metin, uzunluk) {
      const satirlar = String(metin).split(/\r?\n/).map((x) => x.trim()).filter(Boolean), sonuc = [], hata = [];
      satirlar.forEach((st, i) => {
        const p = st.split(/[;,\t ]+/).filter(Boolean); if (p.length < 2 && !/^[A-E*\-.]+$/i.test(st)) { hata.push(i + 1); return; }
        const kod = p.length >= 2 ? p[0] : "Ö" + (i + 1), cev = (p.length >= 2 ? p.slice(1).join("") : p[0]).toUpperCase().replace(/[^A-E\-.*]/g, "");
        if (/^(kod|ogrenci|öğrenci)$/i.test(kod)) return;
        if (cev.length !== uzunluk) { hata.push(i + 1); return; }
        sonuc.push({ kod, cev: [...cev].map((c) => (/[A-E]/.test(c) ? c : "")) });
      });
      return { sonuc, hata };
    },
    hesapla(ogr, anahtar) {
      const n = ogr.length, m = anahtar.length;
      ogr.forEach((o) => { o.puan = o.cev.reduce((t, c, j) => t + (c === anahtar[j] ? 1 : 0), 0); });
      const ort = ogr.reduce((t, o) => t + o.puan, 0) / n, ss = Math.sqrt(ogr.reduce((t, o) => t + (o.puan - ort) ** 2, 0) / n);
      const sirali = [...ogr].sort((a, b) => b.puan - a.puan), g = Math.max(1, Math.round(n * 0.27)), ust = sirali.slice(0, g), alt = sirali.slice(-g);
      const oran = (grup, j, h) => grup.filter((o) => o.cev[j] === h).length / grup.length;
      const maddeler = anahtar.map((d, j) => {
        const p = ogr.filter((o) => o.cev[j] === d).length / n, r = oran(ust, j, d) - oran(alt, j, d);
        const x = ogr.map((o) => (o.cev[j] === d ? 1 : 0)), y = ogr.map((o) => o.puan - (o.cev[j] === d ? 1 : 0));
        const my = y.reduce((t, v) => t + v, 0) / n, sy = Math.sqrt(y.reduce((t, v) => t + (v - my) ** 2, 0) / n), sx = Math.sqrt(p * (1 - p));
        const rpb = sx && sy ? x.reduce((t, v, i) => t + (v - p) * (y[i] - my), 0) / n / (sx * sy) : 0;
        const sec = {}, ustO = {}, altO = {}; for (const h of HARF) { sec[h] = ogr.filter((o) => o.cev[j] === h).length / n; ustO[h] = oran(ust, j, h); altO[h] = oran(alt, j, h); }
        const bos = ogr.filter((o) => !o.cev[j]).length / n;
        const isaret = [];
        for (const h of HARF) if (h !== d) { if (sec[h] < 0.05) isaret.push(`${h} çeldiricisi işlemiyor (%${Math.round(100 * sec[h])})`); if (ustO[h] > altO[h] && ustO[h] >= 0.1) isaret.push(`${h} üst grubu çekiyor: anahtar/ifade kontrol edilmeli`); }
        return { no: j + 1, dogru: d, p, r, rpb, sec, ust: ustO, alt: altO, bos, isaret };
      });
      const pq = maddeler.reduce((t, x) => t + x.p * (1 - x.p), 0), kr20 = m > 1 && ss > 0 ? (m / (m - 1)) * (1 - pq / (ss * ss)) : 0;
      return { n, m, ort, ss, kr20, g, maddeler };
    },
    yorum(p, r) {
      if (r < 0.2) return { renk: "kirmizi", metin: "Çıkar ya da yenile" };
      if (r < 0.3) return { renk: "turuncu", metin: "Düzeltilmeli" };
      if (p < 0.2 || p > 0.9) return { renk: "turuncu", metin: p < 0.2 ? "Çok zor" : "Çok kolay" };
      return { renk: "yesil", metin: r >= 0.4 ? "Çok iyi" : "İyi" };
    },
  };
  K._analiz = AN;
  let analizDurum = { bolum: null, test: null, metin: "", sonuc: null };
  function analizCiz(k) {
    const bl = tumBolumler(); if (!analizDurum.bolum && bl[0]) analizDurum.bolum = bl[0].id;
    const ts = analizDurum.bolum ? testler(analizDurum.bolum) : []; if (!ts.some(([t]) => t === analizDurum.test)) analizDurum.test = ts[0] ? ts[0][0] : null;
    const liste = (ts.find(([t]) => t === analizDurum.test) || [null, []])[1].filter((s) => s.durum !== "cikarildi"), anahtar = liste.map((s) => s.veri.dogru);
    k.innerHTML = `<div class="panel yigin"><span class="etiket" style="color:var(--altin)">Madde analizi · pilot uygulama sonuçları</span>
      <p class="soluk">Testi bir sınıfta uyguladıktan sonra öğrencilerin işaretlediği seçenekleri yapıştır: her satıra bir öğrenci, <b>kod</b> ve <b>cevaplar</b> (örn. <span class="mono">Ö01 ADCE-DABBECD</span>; boş için - ya da .). <b>Öğrenci adı yazma</b>, kod kullan. Veriler bu tarayıcıda işlenir; yalnızca soru başına özet istatistikleri kaydetmeyi seçebilirsin.</p>
      <div class="satir"><label class="alan" style="flex:2 1 260px"><span>Bölüm</span><select class="girdi" id="anBolum">${bl.map((b) => `<option value="${U.kacis(b.id)}" ${b.id === analizDurum.bolum ? "selected" : ""}>${U.kacis(kitapAdi(b) + " · " + b.veri.ad)}</option>`).join("")}</select></label>
        <label class="alan" style="flex:1 1 200px"><span>Test</span><select class="girdi" id="anTest">${ts.map(([t, l]) => `<option ${t === analizDurum.test ? "selected" : ""}>${U.kacis(t)}</option>`).join("")}</select></label></div>
      <p class="soluk" style="font-size:13px">Cevap anahtarı (${anahtar.length} soru): <b class="mono">${anahtar.join("")}</b></p>
      <textarea class="girdi mono" id="anVeri" rows="8" placeholder="Ö01 ${anahtar.join("")}\nÖ02 ${anahtar.map((h, i) => (i % 3 ? h : "B")).join("")}">${U.kacis(analizDurum.metin)}</textarea>
      <div class="satir"><button class="btn btn-ana" id="anHesap">Analiz et</button><label class="btn btn-hayalet sq-dosya">CSV / metin dosyası<input type="file" accept=".csv,.txt,text/plain" id="anDosya" hidden></label></div>
      <div id="anSonuc"></div></div>`;
    U.$("#anBolum", k).onchange = (e) => { analizDurum.bolum = e.target.value; analizDurum.test = null; analizDurum.sonuc = null; analizCiz(k); };
    U.$("#anTest", k).onchange = (e) => { analizDurum.test = e.target.value; analizDurum.sonuc = null; analizCiz(k); };
    U.$("#anVeri", k).oninput = (e) => { analizDurum.metin = e.target.value; };
    U.$("#anDosya", k).onchange = async (e) => { const f = e.target.files[0]; if (!f) return; analizDurum.metin = await f.text(); U.$("#anVeri", k).value = analizDurum.metin; };
    U.$("#anHesap", k).onclick = () => {
      const { sonuc, hata } = AN.oku(analizDurum.metin, anahtar.length);
      if (sonuc.length < 10) { U.$("#anSonuc", k).innerHTML = `<p class="hata-metin">En az 10 öğrencinin cevabı gerekli (okunan: ${sonuc.length}).${hata.length ? ` Okunamayan satırlar: ${hata.slice(0, 12).join(", ")} — cevap sayısı ${anahtar.length} olmalı.` : ""}</p>`; return; }
      analizDurum.sonuc = AN.hesapla(sonuc, anahtar); analizDurum.hata = hata; sonucCiz();
    };
    const sonucCiz = () => {
      const a = analizDurum.sonuc, el = U.$("#anSonuc", k); if (!a) return;
      el.innerHTML = `<div class="kp-an-ozet"><div><small>Öğrenci</small><b>${a.n}</b></div><div><small>Ortalama</small><b>${a.ort.toFixed(2)} / ${a.m}</b></div><div><small>Std. sapma</small><b>${a.ss.toFixed(2)}</b></div><div><small>KR-20</small><b>${a.kr20.toFixed(2)}</b></div><div><small>Grup (%27)</small><b>${a.g} + ${a.g}</b></div></div>
        ${analizDurum.hata && analizDurum.hata.length ? `<p class="soluk">Okunamayan satırlar atlandı: ${analizDurum.hata.slice(0, 12).join(", ")}</p>` : ""}
        <p class="soluk" style="font-size:13px">${a.n < 30 ? "<b>Uyarı:</b> 30'dan az öğrenciyle değerler kararsızdır; yön göstergesi olarak kullan. " : ""}KR-20 ≥ 0,70 genellikle yeterli kabul edilir. p: doğru cevap oranı · r: üst ve alt %27 grupların doğru oranı farkı · rpb: madde–kalan test korelasyonu.</p>
        <div style="overflow-x:auto"><table class="kp-an-tablo"><tr><th>Soru</th><th>Anahtar</th><th>p</th><th>r</th><th>rpb</th>${HARF.map((h) => `<th>${h}<br><small>üst/alt</small></th>`).join("")}<th>Boş</th><th>Karar</th></tr>
        ${a.maddeler.map((x) => { const y = AN.yorum(x.p, x.r); return `<tr><td><b>${x.no}</b></td><td>${x.dogru}</td><td>${x.p.toFixed(2)}</td><td>${x.r.toFixed(2)}</td><td>${x.rpb.toFixed(2)}</td>
          ${HARF.map((h) => `<td class="${h === x.dogru ? "anahtar-h" : x.ust[h] > x.alt[h] && x.ust[h] >= 0.1 ? "sorun-h" : ""}">${Math.round(100 * x.sec[h])}%<br><small>${Math.round(100 * x.ust[h])}/${Math.round(100 * x.alt[h])}</small></td>`).join("")}
          <td>${Math.round(100 * x.bos)}%</td><td><span class="kp-rozet ${y.renk}">${y.metin}</span>${x.isaret.length ? `<div class="soluk" style="font-size:12px">${x.isaret.map(U.kacis).join("<br>")}</div>` : ""}</td></tr>`; }).join("")}</table></div>
        <div class="satir"><button class="btn btn-ikinci" id="anKaydet">Özetleri sorulara kaydet</button><button class="btn btn-hayalet" id="anCsv">Sonuç tablosunu indir (CSV)</button></div>`;
      U.$("#anCsv", el).onclick = () => {
        const s = ["soru;anahtar;p;r;rpb;" + HARF.map((h) => `${h}_oran;${h}_ust;${h}_alt`).join(";") + ";bos;karar"].concat(a.maddeler.map((x) => [x.no, x.dogru, x.p.toFixed(3), x.r.toFixed(3), x.rpb.toFixed(3), ...HARF.flatMap((h) => [x.sec[h].toFixed(3), x.ust[h].toFixed(3), x.alt[h].toFixed(3)]), x.bos.toFixed(3), AN.yorum(x.p, x.r).metin].join(";"))).join("\n");
        const l = document.createElement("a"); l.href = URL.createObjectURL(new Blob(["\ufeff" + s], { type: "text/csv" })); l.download = `madde-analizi-${analizDurum.bolum}.csv`; l.click();
      };
      U.$("#anKaydet", el).onclick = async () => {
        const tarih = new Date().toLocaleDateString("tr-TR");
        try {
          for (const [j, x] of a.maddeler.entries()) { const s = liste[j]; const veri = { ...s.veri, analiz: { tarih, n: a.n, p: +x.p.toFixed(3), r: +x.r.toFixed(3), rpb: +x.rpb.toFixed(3), ust: x.ust, alt: x.alt, kr20: +a.kr20.toFixed(3) } };
            await api(`/rest/v1/kitap_icerik?id=eq.${encodeURIComponent(s.id)}`, { yontem: "PATCH", govde: { veri }, ek: { Prefer: "return=minimal" } }); s.veri = veri; }
          U.bildir(`${a.maddeler.length} sorunun özeti kaydedildi.`);
        } catch (e) { const m = hataYaz(e); if (m) U.bildir(m); }
      };
    };
    sonucCiz();
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
        ${l.map((s) => `<div class="yz-cozum"><b>${s.sira}.</b> ${s.veri.cozum || ""}${s.veri.kunye ? `<div class="yz-kunye">${U.kacis([s.veri.kunye.surec, s.veri.kunye.baglam, s.veri.kunye.bloom].filter(Boolean).join(" · "))} — ${U.kacis(s.veri.kunye.kazanim || "")}</div>` : ""}</div>`).join("")}</section>`;
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
