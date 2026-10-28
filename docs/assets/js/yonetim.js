/* =====================================================================
   ÖĞRETMEN PANELİ — giriş, skor onayı / reddi / düzeltme / silme,
   otomatik onay ve kayıt ayarları, yasaklı kelimeler, ziyaret raporu.
   Yetki veritabanında denetlenir: yönetici olmayan hesap hiçbir skoru göremez.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, B = MC.bulut, ana = U.$("#ynAna"), ustSag = U.$("#ynUstSag");
  MC.Ses.efektAcik = false;
  const DEPO = "mc_yonetici_oturum";
  const SAYFA_AD = { ana: "Ana Sayfa", oyunlar: "Oyun Arenası", fonksiyon: "Fonksiyon Yarışı", dedektor: "Sayı Dedektörü", sprint: "Formula Sprint",
    laboratuvar: "Görsel Laboratuvar", bilgi: "Bilgi Köşesi", siralama: "Sıralama", "geo-cizim": "Geometri · Çizim Masası", "geo-ucgen": "Geometri · Üçgen Laboratuvarı", "geo-cisimler": "Geometri · 3B Cisimler" };
  const DURUM = { bekliyor: ["Bekliyor", "durum-bekle"], onayli: ["Onaylı", "durum-onay"], reddedildi: ["Reddedildi", "durum-ret"] };
  let oturum = null, turler = [], bekleyenSayi = 0;

  /* ---------------- Oturum ---------------- */
  function oturumOku() { try { return JSON.parse(sessionStorage.getItem(DEPO) || localStorage.getItem(DEPO) || "null"); } catch (e) { return null; } }
  function oturumKaydet(r, kalici) {
    oturum = { erisim: r.access_token, yenile: r.refresh_token, bitis: r.expires_at ? r.expires_at * 1000 : Date.now() + (r.expires_in || 3600) * 1000,
      eposta: (r.user && r.user.email) || (oturum && oturum.eposta) || "", kalici: !!kalici };
    try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); (kalici ? localStorage : sessionStorage).setItem(DEPO, JSON.stringify(oturum)); } catch (e) {}
  }
  function oturumSil() { oturum = null; try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); } catch (e) {} }
  async function token() {
    if (!oturum) throw new Error("oturum_yok");
    if (oturum.bitis - Date.now() < 60000) {
      const r = await B.istek("/auth/v1/token?grant_type=refresh_token", { yontem: "POST", govde: { refresh_token: oturum.yenile } });
      oturumKaydet(r, oturum.kalici);
    }
    return oturum.erisim;
  }
  async function api(yol, s = {}) {
    let t;
    try { t = await token(); } catch (e) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); }
    try { return await B.istek(yol, { ...s, token: t }); }
    catch (e) {
      if (e.durum === 401 || /JWT/i.test(e.message)) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); }
      throw e;
    }
  }
  const rpc = (ad, arg) => api("/rest/v1/rpc/" + ad, { yontem: "POST", govde: arg || {} });
  const hata = (e) => (e && e.message === "oturum_bitti" ? null : B.hataMetni(e));
  function bildir(m) { if (m) U.bildir(m); }

  function ustCiz() {
    ustSag.innerHTML = oturum ? `<span class="soluk" style="align-self:center;font-size:14px">${U.kacis(oturum.eposta || "")}</span><button class="ses-btn" id="ynCikis" type="button">Çıkış</button>` : "";
    const c = U.$("#ynCikis"); if (c) c.addEventListener("click", async () => { try { await B.istek("/auth/v1/logout", { yontem: "POST", token: oturum.erisim }); } catch (e) {} oturumSil(); girisCiz("Çıkış yapıldı."); });
  }

  /* ---------------- Giriş, şifre ---------------- */
  function girisCiz(mesaj) {
    ustCiz();
    ana.innerHTML = `<form class="panel yn-giris" id="ynForm" novalidate>
        <span class="etiket">Öğretmen girişi</span><h2>Sıralama yönetimi</h2>
        <p class="soluk">Bu sayfa skorları onaylamak, düzeltmek ve silmek içindir. Öğrencilerin giriş yapmasına gerek yok; onlar takma adla oynar.</p>
        <label class="alan"><span>E-posta</span><input class="girdi" id="ynEposta" type="email" autocomplete="username" required></label>
        <label class="alan"><span>Şifre</span><input class="girdi" id="ynSifre" type="password" autocomplete="current-password" required></label>
        <label class="anahtar"><input type="checkbox" id="ynKalici"> Bu cihazda oturumu açık tut <span class="soluk" style="font-weight:400">(akıllı tahtada işaretleme)</span></label>
        <p class="hata-metin" id="ynHata" role="alert">${mesaj ? U.kacis(mesaj) : ""}</p>
        <div class="satir"><button class="btn btn-ana" type="submit">Giriş yap</button><button class="btn btn-hayalet" type="button" id="ynUnuttum">Şifremi unuttum</button></div>
      </form>`;
    const f = U.$("#ynForm"), h = U.$("#ynHata"), ep = U.$("#ynEposta");
    if (mesaj && /Çıkış/.test(mesaj)) { h.style.color = "var(--turkuaz)"; }
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); h.style.color = ""; h.textContent = "Giriş yapılıyor…";
      try {
        const r = await B.istek("/auth/v1/token?grant_type=password", { yontem: "POST", govde: { email: ep.value.trim(), password: U.$("#ynSifre").value } });
        oturumKaydet(r, U.$("#ynKalici").checked); h.textContent = ""; yetkiDenetle();
      } catch (err) { h.textContent = B.hataMetni(err); }
    });
    U.$("#ynUnuttum").addEventListener("click", async () => {
      h.style.color = "";
      if (!ep.value.trim()) { h.textContent = "Önce e-posta adresini yaz, sonra bu düğmeye bas."; ep.focus(); return; }
      try {
        await B.istek("/auth/v1/recover?redirect_to=" + encodeURIComponent(location.href.split("#")[0]), { yontem: "POST", govde: { email: ep.value.trim() } });
        h.style.color = "var(--turkuaz)"; h.textContent = "Şifre yenileme bağlantısı e-postana gönderildi. Bağlantıya tıklayınca bu sayfa açılır ve yeni şifreni belirlersin.";
      } catch (err) { h.textContent = B.hataMetni(err); }
    });
    setTimeout(() => ep.focus(), 30);
  }

  function sifreCiz() {
    ustCiz();
    ana.innerHTML = `<form class="panel yn-giris" id="ynSifreForm" novalidate>
        <span class="etiket">Şifre yenileme</span><h2>Yeni şifreni belirle</h2>
        <label class="alan"><span>Yeni şifre (en az 8 karakter)</span><input class="girdi" id="ynY1" type="password" autocomplete="new-password"></label>
        <label class="alan"><span>Yeni şifre (tekrar)</span><input class="girdi" id="ynY2" type="password" autocomplete="new-password"></label>
        <p class="hata-metin" id="ynHata" role="alert"></p>
        <div class="satir"><button class="btn btn-ana" type="submit">Şifreyi kaydet</button></div></form>`;
    U.$("#ynSifreForm").addEventListener("submit", async (e) => {
      e.preventDefault(); const a = U.$("#ynY1").value, b = U.$("#ynY2").value, h = U.$("#ynHata");
      if (a.length < 8) { h.textContent = "Şifre en az 8 karakter olmalı."; return; }
      if (a !== b) { h.textContent = "İki şifre aynı değil."; return; }
      try { await api("/auth/v1/user", { yontem: "PUT", govde: { password: a } }); bildir("Şifren değişti."); yetkiDenetle(); }
      catch (err) { const m = hata(err); if (m) h.textContent = m; }
    });
  }

  /* ---------------- Yetki ---------------- */
  async function yetkiDenetle() {
    ustCiz();
    ana.innerHTML = '<p class="soluk yukleniyor">Yetki denetleniyor…</p>';
    let d;
    try { d = await rpc("yonetici_durum"); } catch (e) { const m = hata(e); if (m) ana.innerHTML = `<div class="panel yn-giris"><p class="hata-metin">${m}</p><div class="satir"><button class="btn btn-ikinci" id="ynTekrar">Yeniden dene</button></div></div>`; const t = U.$("#ynTekrar"); if (t) t.onclick = yetkiDenetle; return; }
    if (d.yonetici) { bekleyenSayi = d.bekleyen || 0; panelCiz(); return; }
    if (!d.yonetici_var) {
      ana.innerHTML = `<div class="panel yn-giris"><span class="etiket">İlk kurulum</span><h2>Yönetici ol</h2>
        <p>Sistemde henüz hiç yönetici yok. Bu düğmeye basınca <b>${U.kacis(oturum.eposta)}</b> hesabı yönetici olur. Bu işlem yalnızca bir kez yapılabilir; sonra başka hiç kimse bu yolla yönetici olamaz.</p>
        <div class="satir"><button class="btn btn-ana" id="ynIlk">Beni yönetici yap</button></div><p class="hata-metin" id="ynHata"></p></div>`;
      U.$("#ynIlk").addEventListener("click", async () => {
        try { const ok = await rpc("ilk_yonetici"); if (ok) { bildir("Artık yöneticisin."); yetkiDenetle(); } else U.$("#ynHata").textContent = "Başka bir hesap az önce yönetici oldu."; }
        catch (e) { const m = hata(e); if (m) U.$("#ynHata").textContent = m; }
      });
      return;
    }
    ana.innerHTML = `<div class="panel yn-giris"><h2>Yetki yok</h2><p class="soluk">Bu hesap yönetici değil. Yönetici olan öğretmen, Supabase'de bu hesabı yöneticiler tablosuna ekleyebilir (rehberdeki “Yeni yönetici ekleme” adımı).</p></div>`;
  }

  /* ---------------- Panel ---------------- */
  async function panelCiz() {
    ana.innerHTML = `<div class="bolum-basi"><span class="etiket">Öğretmen paneli</span><h2>Sıralama yönetimi</h2>
        <p>Onay bekleyen skorları onayla ya da reddet. Uygunsuz takma adı veya hatalı puanı satırın içinde düzeltip <b>Kaydet</b>'e bas. Onaylanan skor anında öğrencilerin sıralama sayfasında görünür.</p>
        <div class="satir" style="margin-top:10px"><a class="btn btn-ana" href="studyo/">★ Çözüm Stüdyosu</a><a class="btn btn-ikinci" href="kitap/">Kitap · Hakem Paneli</a><span class="soluk" style="font-size:14px;align-self:center">Çözüm atölyen, soru arşivin ve kitap incelemesi (yalnızca yetkililer)</span></div></div>
      <div class="metrikler" id="ynMetrik"></div>
      <div id="ynSekme" style="margin-top:16px"></div>
      <div class="sekme-icerik"><div id="yn-bekleyen"></div><div id="yn-tum" hidden></div><div id="yn-ziyaret" hidden></div><div id="yn-ayar" hidden></div></div>`;
    try { turler = await api("/rest/v1/oyun_turleri?select=*&order=sira"); } catch (e) { turler = B.OYUNLAR.map((o) => ({ id: o.id, ad: o.ad, puan_min: -1e9, puan_max: 1e9 })); }
    metrikCiz();
    const kurulan = {};
    U.sekmeler(U.$("#ynSekme"), [{ id: "bekleyen", ad: "Onay bekleyenler" }, { id: "tum", ad: "Tüm skorlar" }, { id: "ziyaret", ad: "Ziyaretler" }, { id: "ayar", ad: "Ayarlar" }], (id) => {
      ["bekleyen", "tum", "ziyaret", "ayar"].forEach((x) => (U.$("#yn-" + x).hidden = x !== id));
      if (!kurulan[id] || id === "bekleyen") { kurulan[id] = true; ({ bekleyen: () => listeKur(U.$("#yn-bekleyen"), "bekliyor"), tum: () => listeKur(U.$("#yn-tum"), null), ziyaret: ziyaretKur, ayar: ayarKur })[id](); }
    });
  }

  async function metrikCiz() {
    const m = U.$("#ynMetrik"); if (!m) return;
    let ayar = null, oz = null;
    try { [ayar, oz] = await Promise.all([api("/rest/v1/ayarlar?select=*&id=eq.1"), rpc("ziyaret_ozet")]); ayar = ayar && ayar[0]; } catch (e) {}
    const t = (n) => Number(n || 0).toLocaleString("tr-TR");
    m.innerHTML = `<div class="metrik"><small>Onay bekleyen</small><b style="color:var(--altin)" id="ynBekleyen">${t(bekleyenSayi)}</b></div>
      <div class="metrik"><small>Onay kipi</small><b style="font-size:1.1rem">${ayar ? (ayar.otomatik_onay ? "Otomatik" : "Öğretmen onaylı") : "—"}</b></div>
      <div class="metrik"><small>Yeni skor kabulü</small><b style="font-size:1.1rem;color:${ayar && !ayar.kayit_acik ? "var(--kirmizi)" : "var(--turkuaz)"}">${ayar ? (ayar.kayit_acik ? "Açık" : "Kapalı") : "—"}</b></div>
      <div class="metrik"><small>Bugün ziyaretçi</small><b>${oz ? t(oz.bugun_ziyaret) : "—"}</b></div>`;
  }
  function bekleyenDegis(fark) { bekleyenSayi = Math.max(0, bekleyenSayi + fark); const b = U.$("#ynBekleyen"); if (b) b.textContent = bekleyenSayi.toLocaleString("tr-TR"); }

  /* ---------------- Skor listesi ---------------- */
  const turAd = (id) => (turler.find((t) => t.id === id) || { ad: id }).ad;
  const zaman = (s) => { const d = new Date(s); return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }); };

  function listeKur(kap, sabitDurum) {
    const bekleyen = sabitDurum === "bekliyor";
    kap.innerHTML = `<div class="panel">
      <div class="yn-arac">
        <label class="alan"><span>Oyun</span><select class="girdi" data-f="oyun"><option value="">Tüm oyunlar</option>${turler.map((t) => `<option value="${t.id}">${U.kacis(t.ad)}</option>`).join("")}</select></label>
        ${bekleyen ? "" : `<label class="alan"><span>Durum</span><select class="girdi" data-f="durum"><option value="">Hepsi</option><option value="bekliyor">Bekliyor</option><option value="onayli">Onaylı</option><option value="reddedildi">Reddedildi</option></select></label>`}
        <label class="alan"><span>Takma ad ya da sınıf ara</span><input class="girdi" data-f="ara" maxlength="20" placeholder="örn. kartal veya 7A"></label>
        <button class="btn btn-ikinci" data-k="listele">Listele</button>
      </div>
      <div class="satir" data-toplu>
        <label class="anahtar"><input type="checkbox" data-k="hepsi"> Tümünü seç</label>
        <button class="btn btn-kucuk btn-onay" data-k="t-onay">Seçilenleri onayla</button>
        <button class="btn btn-kucuk btn-ret" data-k="t-ret">Seçilenleri reddet</button>
        <button class="btn btn-kucuk btn-hayalet" data-k="t-sil">Seçilenleri sil</button>
        ${bekleyen ? "" : '<button class="btn btn-kucuk btn-hayalet" data-k="csv" style="margin-left:auto">Excel için indir (CSV)</button>'}
      </div>
      <div data-liste><p class="soluk yukleniyor">Yükleniyor…</p></div></div>`;
    const liste = U.$("[data-liste]", kap);
    const sorgu = (limit) => {
      const oyun = U.$('[data-f="oyun"]', kap).value, dEl = U.$('[data-f="durum"]', kap), durum = sabitDurum || (dEl && dEl.value);
      const ara = U.$('[data-f="ara"]', kap).value.trim().replace(/[,()*.:]/g, "");
      let q = `/rest/v1/skorlar?select=*&order=olusturma.desc&limit=${limit}`;
      if (oyun) q += "&oyun=eq." + encodeURIComponent(oyun);
      if (durum) q += "&durum=eq." + durum;
      if (ara) q += "&or=" + encodeURIComponent(`(takma_ad.ilike.*${ara}*,sinif.ilike.*${ara}*)`);
      return q;
    };
    async function yukle() {
      liste.innerHTML = '<p class="soluk yukleniyor">Yükleniyor…</p>';
      let s;
      try { s = await api(sorgu(300)); } catch (e) { const m = hata(e); if (m) liste.innerHTML = `<p class="hata-metin">${m}</p>`; return; }
      if (bekleyen) { bekleyenSayi = s.length >= 300 ? Math.max(bekleyenSayi, s.length) : s.length; bekleyenDegis(0); }
      if (!s.length) { liste.innerHTML = `<div class="bos-tablo"><b>${bekleyen ? "Onay bekleyen skor yok." : "Bu süzgece uyan skor yok."}</b>${bekleyen ? '<p class="soluk">Öğrenciler skor gönderdikçe burada görünecek.</p>' : ""}</div>`; return; }
      liste.innerHTML = `<div class="tablo-kutu"><table class="tablo yn-tablo"><tr><th></th><th>Zaman</th><th>Oyun</th><th>Takma ad</th><th>Sınıf</th><th>Puan</th><th>Ek</th><th>Durum</th><th>İşlem</th></tr>
        ${s.map(satirHtml).join("")}</table></div>${s.length >= 300 ? '<p class="soluk">İlk 300 kayıt gösteriliyor. Süzgeçle daralt.</p>' : ""}`;
    }
    function satirHtml(x) {
      const [dAd, dSinif] = DURUM[x.durum] || [x.durum, ""];
      const vAd = B.varyantAdi(x.oyun, x.varyant), ek = B.oyun(x.oyun) && B.oyun(x.oyun).ikincil;
      return `<tr data-id="${x.id}" data-durum="${x.durum}" data-oyun="${U.kacis(x.oyun)}">
        <td><input type="checkbox" class="yn-sec" aria-label="Seç"></td>
        <td class="soluk mono" style="white-space:nowrap">${zaman(x.olusturma)}</td>
        <td>${U.kacis(turAd(x.oyun))}${vAd ? `<br><small class="soluk">${U.kacis(vAd)}</small>` : ""}</td>
        <td><input class="girdi" data-alan="takma_ad" maxlength="20" value="${U.kacis(x.takma_ad)}" data-ilk="${U.kacis(x.takma_ad)}"></td>
        <td><input class="girdi" data-alan="sinif" maxlength="16" value="${U.kacis(x.sinif)}" data-ilk="${U.kacis(x.sinif)}" style="width:100px"></td>
        <td><input class="girdi mono" data-alan="puan" type="number" step="1" value="${x.puan}" data-ilk="${x.puan}" style="width:110px"></td>
        <td class="mono soluk" title="${U.kacis(JSON.stringify(x.ayrinti || {}))}">${x.ikincil != null ? `${U.kacis(ek || "")} ${x.ikincil}` : "—"}</td>
        <td><span class="durum ${dSinif}">${dAd}</span></td>
        <td><div class="yn-dugme">
          <button class="btn btn-kucuk btn-ana" data-k="kaydet" hidden>Kaydet</button>
          ${x.durum !== "onayli" ? '<button class="btn btn-kucuk btn-onay" data-k="onay">Onayla</button>' : ""}
          ${x.durum !== "reddedildi" ? '<button class="btn btn-kucuk btn-ret" data-k="ret">Reddet</button>' : ""}
          <button class="btn btn-kucuk btn-hayalet" data-k="sil">Sil</button></div></td></tr>`;
    }
    function degisiklik(tr) {
      const d = {};
      for (const i of U.$$("[data-alan]", tr)) if (i.value !== i.dataset.ilk) d[i.dataset.alan] = i.dataset.alan === "puan" ? Math.round(+i.value) : i.dataset.alan === "sinif" ? B.sinifTemizle(i.value) : B.adTemizle(i.value);
      return d;
    }
    function denetle(tr, d) {
      if ("takma_ad" in d && !B.AD_DESEN.test(d.takma_ad)) return "Takma ad 2–20 karakter olmalı (harf, rakam, boşluk, nokta, tire).";
      if ("sinif" in d && !B.SINIF_DESEN.test(d.sinif)) return "Sınıf kodu en çok 16 karakter: harf, rakam, tire.";
      if ("puan" in d) {
        const t = turler.find((x) => x.id === tr.dataset.oyun);
        if (!Number.isFinite(d.puan)) return "Puan bir tam sayı olmalı.";
        if (t && (d.puan < t.puan_min || d.puan > t.puan_max)) return `Bu oyunda puan ${t.puan_min} ile ${t.puan_max} arasında olmalı.`;
      }
      return null;
    }
    async function guncelle(trler, govde, mesaj) {
      const ids = trler.map((t) => t.dataset.id);
      if (!ids.length) { bildir("Önce satır seç."); return; }
      try {
        const r = await api(`/rest/v1/skorlar?id=in.(${ids.join(",")})`, { yontem: "PATCH", govde, ek: { Prefer: "return=representation" } });
        let fark = 0;
        for (const x of r || []) {
          const tr = U.$(`tr[data-id="${x.id}"]`, liste); if (!tr) continue;
          if (tr.dataset.durum === "bekliyor" && x.durum !== "bekliyor") fark--;
          if (bekleyen && x.durum !== "bekliyor") tr.remove();
          else { const yeni = document.createElement("tbody"); yeni.innerHTML = satirHtml(x); tr.replaceWith(yeni.firstElementChild); }
        }
        bekleyenDegis(fark); bildir(mesaj); MC.Ses.efekt("dogru");
        if (bekleyen && !U.$("tr[data-id]", liste)) yukle();
      } catch (e) { bildir(hata(e)); }
    }
    async function sil(trler) {
      const ids = trler.map((t) => t.dataset.id); if (!ids.length) { bildir("Önce satır seç."); return; }
      try {
        await api(`/rest/v1/skorlar?id=in.(${ids.join(",")})`, { yontem: "DELETE" });
        bekleyenDegis(-trler.filter((t) => t.dataset.durum === "bekliyor").length);
        trler.forEach((t) => t.remove()); bildir(`${ids.length} skor silindi.`);
        if (!U.$("tr[data-id]", liste)) yukle();
      } catch (e) { bildir(hata(e)); }
    }
    /* İki adımlı onay: ilk basışta "Emin misin?" olur, 3 sn içinde ikinci basış işlemi yapar */
    function ikiAdim(b, is) {
      if (b.dataset.emin === "1") { b.dataset.emin = ""; is(); return; }
      const eski = b.textContent; b.dataset.emin = "1"; b.textContent = "Emin misin? Tekrar bas";
      setTimeout(() => { if (b.isConnected && b.dataset.emin === "1") { b.dataset.emin = ""; b.textContent = eski; } }, 3000);
    }
    const secili = () => U.$$(".yn-sec:checked", liste).map((c) => c.closest("tr"));
    async function csv() {
      try {
        const s = await api(sorgu(5000));
        const al = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
        const satir = [["Zaman", "Oyun", "Tür", "Takma ad", "Sınıf", "Puan", "Ek", "Durum"].map(al).join(";")]
          .concat(s.map((x) => [new Date(x.olusturma).toLocaleString("tr-TR"), turAd(x.oyun), B.varyantAdi(x.oyun, x.varyant), x.takma_ad, x.sinif, x.puan, x.ikincil, (DURUM[x.durum] || [x.durum])[0]].map(al).join(";")));
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob(["﻿" + satir.join("\r\n")], { type: "text/csv;charset=utf-8" }));
        a.download = `masterclass-skorlar-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click(); a.remove();
      } catch (e) { bildir(hata(e)); }
    }
    kap.addEventListener("input", (e) => {
      const tr = e.target.closest("tr[data-id]"); if (!tr || !e.target.dataset.alan) return;
      U.$('[data-k="kaydet"]', tr).hidden = !Object.keys(degisiklik(tr)).length;
    });
    kap.addEventListener("change", (e) => {
      if (e.target.dataset.k === "hepsi") U.$$(".yn-sec", liste).forEach((c) => (c.checked = e.target.checked));
      if (e.target.dataset.f && e.target.tagName === "SELECT") yukle();
    });
    U.$('[data-f="ara"]', kap).addEventListener("keydown", (e) => { if (e.key === "Enter") yukle(); });
    kap.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-k]"); if (!b) return;
      const tr = b.closest("tr[data-id]"), k = b.dataset.k;
      if (k === "listele") return yukle();
      if (k === "csv") return csv();
      if (k === "t-onay") return guncelle(secili(), { durum: "onayli" }, "Seçilenler onaylandı.");
      if (k === "t-ret") return guncelle(secili(), { durum: "reddedildi" }, "Seçilenler reddedildi.");
      if (k === "t-sil") { if (!secili().length) return bildir("Önce satır seç."); return ikiAdim(b, () => sil(secili())); }
      if (!tr) return;
      const d = degisiklik(tr), sorun = denetle(tr, d);
      if (k === "sil") return ikiAdim(b, () => sil([tr]));
      if (sorun) return bildir(sorun);
      if (k === "kaydet") return guncelle([tr], d, "Düzeltme kaydedildi.");
      if (k === "onay") return guncelle([tr], { ...d, durum: "onayli" }, "Onaylandı.");
      if (k === "ret") return guncelle([tr], { ...d, durum: "reddedildi" }, "Reddedildi.");
    });
    yukle();
  }

  /* ---------------- Ziyaretler ---------------- */
  function ziyaretKur() {
    const kap = U.$("#yn-ziyaret"); let gun = 30;
    kap.innerHTML = `<div class="panel"><div class="satir" style="justify-content:space-between"><h3>Günlük ziyaret ve görüntülenme</h3><div id="ynGun"></div></div>
      <p class="soluk"><b>Ziyaretçi:</b> o gün siteyi ilk kez açan tarayıcı. <b>Görüntülenme:</b> açılan her bölüm. Kişisel veri, IP adresi ya da çerez kullanılmaz; yalnızca günlük toplamlar tutulur.</p>
      <div class="metrikler" id="ynZMetrik"></div><div class="grafik-kutu" id="ynZGrafik" style="height:300px"></div><div id="ynZTablo"></div></div>`;
    U.segment(U.$("#ynGun", kap), [[7, "7 gün"], [30, "30 gün"], [90, "90 gün"]], gun, (d) => { gun = +d; yukle(); });
    async function yukle() {
      const bas = new Date(Date.now() - (gun - 1) * 864e5).toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });
      let s;
      try { s = await api(`/rest/v1/ziyaretler?select=*&gun=gte.${bas}&order=gun.asc&limit=5000`); } catch (e) { const m = hata(e); if (m) U.$("#ynZTablo", kap).innerHTML = `<p class="hata-metin">${m}</p>`; return; }
      const gunler = [], z = [], g = [];
      for (let i = gun - 1; i >= 0; i--) { const t = new Date(Date.now() - i * 864e5).toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" }); gunler.push(t); z.push(0); g.push(0); }
      const sayfa = {};
      for (const x of s) {
        const i = gunler.indexOf(x.gun); if (i >= 0) { z[i] += x.ziyaret; g[i] += x.goruntulenme; }
        const p = sayfa[x.sayfa] || (sayfa[x.sayfa] = [0, 0]); p[0] += x.ziyaret; p[1] += x.goruntulenme;
      }
      const tz = z.reduce((a, b) => a + b, 0), tg = g.reduce((a, b) => a + b, 0), t = (n) => n.toLocaleString("tr-TR");
      const enCok = Object.entries(sayfa).sort((a, b) => b[1][1] - a[1][1])[0];
      U.$("#ynZMetrik", kap).innerHTML = `<div class="metrik"><small>Ziyaretçi (${gun} gün)</small><b>${t(tz)}</b></div><div class="metrik"><small>Görüntülenme</small><b>${t(tg)}</b></div>
        <div class="metrik"><small>Günlük ortalama ziyaretçi</small><b>${(tz / gun).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}</b></div>
        <div class="metrik"><small>En çok açılan bölüm</small><b style="font-size:1.05rem">${enCok ? U.kacis(SAYFA_AD[enCok[0]] || enCok[0]) : "—"}</b></div>`;
      MC.grafik.cubuk(U.$("#ynZGrafik", kap), { kategoriler: gunler.map((x) => x.slice(8, 10) + "." + x.slice(5, 7)),
        seriler: [{ ad: "Ziyaretçi", degerler: z, renk: "#35e0b0" }, { ad: "Görüntülenme", degerler: g, renk: "#5b8cff" }] });
      const sirali = Object.entries(sayfa).sort((a, b) => b[1][1] - a[1][1]);
      U.$("#ynZTablo", kap).innerHTML = sirali.length ? `<div class="tablo-kutu"><table class="tablo"><tr><th>Bölüm</th><th>Görüntülenme</th><th>Siteye bu bölümden giren</th></tr>
        ${sirali.map(([k, [zz, gg]]) => `<tr><td>${U.kacis(SAYFA_AD[k] || k)}</td><td class="mono"><b>${t(gg)}</b></td><td class="mono soluk">${t(zz)}</td></tr>`).join("")}</table></div>` : '<p class="soluk">Bu dönemde kayıt yok.</p>';
    }
    yukle();
  }

  /* ---------------- Ayarlar ---------------- */
  async function ayarKur() {
    const kap = U.$("#yn-ayar");
    kap.innerHTML = '<p class="soluk yukleniyor">Yükleniyor…</p>';
    let a, kel;
    try { [a, kel] = await Promise.all([api("/rest/v1/ayarlar?select=*&id=eq.1"), api("/rest/v1/yasakli_kelimeler?select=kelime&order=kelime")]); a = a[0]; }
    catch (e) { const m = hata(e); if (m) kap.innerHTML = `<p class="hata-metin">${m}</p>`; return; }
    kap.innerHTML = `<div class="iki-sutun" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px">
      <div class="panel"><h3>Onay ve kayıt</h3>
        <label class="anahtar"><input type="checkbox" id="ynOto" ${a.otomatik_onay ? "checked" : ""}> Skorlar onaysız, hemen tabloda görünsün</label>
        <p class="soluk">Kapalıyken (önerilen) her skor önce “Onay bekleyenler” listesine düşer. Açıkken bile yasaklı kelime içeren takma adlar onaya düşer.</p>
        <label class="anahtar"><input type="checkbox" id="ynKayit" ${a.kayit_acik ? "checked" : ""}> Yeni skor kabul et</label>
        <p class="soluk">Sınav haftası ya da tatilde kapatabilirsin. Kapalıyken tablo görünür ama yeni skor gönderilemez.</p></div>
      <div class="panel"><h3>Yasaklı kelimeler</h3>
        <p class="soluk">Bu kelimeleri içeren takma adlar her zaman onayına düşer. Büyük-küçük harf ve Türkçe harf farkı önemsenmez: “kötü” yazarsan “KOTU” da yakalanır.</p>
        <div class="satir" style="flex-wrap:nowrap"><input class="girdi" id="ynKelime" maxlength="30" placeholder="kelime ekle"><button class="btn btn-ikinci" id="ynKelimeEkle">Ekle</button></div>
        <div class="satir" id="ynKelimeler">${kel.map((k) => kelimeHtml(k.kelime)).join("") || '<span class="soluk">Liste boş.</span>'}</div></div>
      <div class="panel"><h3>Sınıf kodu önerisi</h3>
        <p>Her sınıfına kısa bir kod ver (örn. <b class="mono">7A</b>, <b class="mono">BILSEM-6</b>) ve tahtaya yaz. Öğrenciler takma adını seçerken bu kodu girer; sıralama sayfasında yalnızca o sınıfın tablosu süzülebilir.</p>
        <p class="soluk">Öğrenciden ad-soyad, e-posta ya da telefon istenmez. Takma ad gerçek adı ele veriyorsa satırda düzeltebilirsin.</p></div></div>`;
    const kaydet = async (alan, deger, el) => {
      try { await api("/rest/v1/ayarlar?id=eq.1", { yontem: "PATCH", govde: { [alan]: deger } }); bildir("Ayar kaydedildi."); metrikCiz(); }
      catch (e) { el.checked = !deger; bildir(hata(e)); }
    };
    U.$("#ynOto", kap).addEventListener("change", (e) => kaydet("otomatik_onay", e.target.checked, e.target));
    U.$("#ynKayit", kap).addEventListener("change", (e) => kaydet("kayit_acik", e.target.checked, e.target));
    const ekle = async () => {
      const i = U.$("#ynKelime", kap), k = i.value.trim().toLocaleLowerCase("tr-TR");
      if (k.length < 2) return bildir("Kelime en az 2 harf olmalı.");
      try {
        await api("/rest/v1/yasakli_kelimeler", { yontem: "POST", govde: { kelime: k }, ek: { Prefer: "resolution=ignore-duplicates" } });
        const liste = U.$("#ynKelimeler", kap); if (!U.$("[data-kelime]", liste)) liste.innerHTML = "";
        if (!U.$(`[data-kelime="${CSS.escape ? CSS.escape(k) : k}"]`, liste)) liste.insertAdjacentHTML("beforeend", kelimeHtml(k));
        i.value = ""; bildir("Eklendi.");
      } catch (e) { bildir(hata(e)); }
    };
    U.$("#ynKelimeEkle", kap).addEventListener("click", ekle);
    U.$("#ynKelime", kap).addEventListener("keydown", (e) => { if (e.key === "Enter") ekle(); });
    U.$("#ynKelimeler", kap).addEventListener("click", async (e) => {
      const b = e.target.closest("button[data-sil]"); if (!b) return;
      try { await api("/rest/v1/yasakli_kelimeler?kelime=eq." + encodeURIComponent(b.dataset.sil), { yontem: "DELETE" }); b.closest(".yn-kelime").remove(); }
      catch (err) { bildir(hata(err)); }
    });
  }
  const kelimeHtml = (k) => `<span class="rozet yn-kelime" data-kelime="${U.kacis(k)}">${U.kacis(k)}<button type="button" data-sil="${U.kacis(k)}" aria-label="${U.kacis(k)} kelimesini sil">×</button></span>`;

  /* ---------------- Başlangıç ---------------- */
  function basla() {
    if (!B.ayarli()) {
      ana.innerHTML = `<div class="panel yn-giris"><span class="etiket">Kurulum gerekli</span><h2>Bağlantı ayarı yok</h2>
        <p><span class="mono">docs/assets/js/bulut-ayar.js</span> dosyasına Supabase proje adresi ve publishable anahtarı yazılmalı. Adımlar kurulum rehberinde.</p></div>`;
      return;
    }
    const h = new URLSearchParams(location.hash.slice(1));
    if (h.get("access_token") && h.get("type") === "recovery") {
      oturumKaydet({ access_token: h.get("access_token"), refresh_token: h.get("refresh_token"), expires_in: +h.get("expires_in") || 3600 }, false);
      history.replaceState(null, "", location.pathname + location.search); sifreCiz(); return;
    }
    if (h.get("error_description")) { history.replaceState(null, "", location.pathname); girisCiz(h.get("error_description").replace(/\+/g, " ")); return; }
    oturum = oturumOku();
    if (oturum) yetkiDenetle(); else girisCiz();
  }
  MC.yonetim = { basla };
  basla();
})();
