/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — yönlendirici modüller
   #masa-byf          : yıllık plan, bu haftanın kazanımı, tüm kazanım kartları
   #kazanim-byf.2.3   : kazanım sayfası (etkinlik, ders akışı, süreç bileşenleri, çeşitlendirme)
   #araclar           : tahta araçları (zamanlayıcı, rastgele numara, grup kurucu)
   #rehber            : kullanım ve tasarım ilkeleri
   Öğretmenin notları ve bağlantıları yalnızca bu tarayıcıda (localStorage) tutulur;
   "Zümreyle paylaş" bunları bir .json dosyasına yazar, "İçe al" geri yükler.
   ===================================================================== */
"use strict";
(function () {
  MC.uc = MC.uc || { AZ_HAREKET: matchMedia("(prefers-reduced-motion: reduce)").matches }; // three.js yüklenmeden de animasyon ayarı
  const U = MC.ui, Ses = MC.Ses, P = MC.bilsemProgram, T = MC.bilsemTakvim;
  const AKIS = MC.bilsemAkis || {};
  const ETK = (MC.bilsemEtkinlik = MC.bilsemEtkinlik || {});
  const AY = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  const DEPO = "bilsem_ogretmen";

  /* ---------- Takvim: öğretim haftaları (tatil haftaları atlanır) ---------- */
  const gun = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const HAFTALAR = (() => {
    const tatil = new Set(T.tatiller), bitis = gun(T.bitis), h = [];
    for (let d = gun(T.baslangic); d <= bitis; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!tatil.has(k)) h.push(d);
    }
    return h;
  })();
  const tarihYaz = (d) => `${d.getDate()} ${AY[d.getMonth()]}`;
  const haftaAraligi = (a, b) => { const s = HAFTALAR[a - 1], e = HAFTALAR[(b || a) - 1]; if (!s || !e) return ""; const cuma = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 4); return `${tarihYaz(s)} – ${tarihYaz(cuma)}`; };
  /* Bugün hangi öğretim haftası? Tatildeyse bir sonraki haftayı "sıradaki" olarak verir. */
  function buHafta(bugun = new Date()) {
    const g = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate());
    for (let i = 0; i < HAFTALAR.length; i++) {
      const s = HAFTALAR[i], e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 6);
      if (g >= s && g <= e) return { no: i + 1, tatil: false };
      if (g < s) return { no: i + 1, tatil: i > 0, once: i === 0 };
    }
    return { no: HAFTALAR.length, bitti: true };
  }

  /* ---------- Resmî tatiller, tatil dönemleri, canlı saat ---------- */
  const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const RESMI = (T.resmi || []).map((r) => ({ ...r, d: gun(r.t) }));
  const DONEM = (T.donemler || []).map((r) => ({ ...r, b: gun(r.bas), e: gun(r.bit) }));
  const gunBasi = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const gunFark = (a, b) => Math.round((gunBasi(b) - gunBasi(a)) / 864e5);
  const uzunTarih = (d) => `${d.getDate()} ${AYLAR[d.getMonth()]} ${d.getFullYear()} ${GUNLER[d.getDay()]}`;
  const kisaGun = (d) => `${d.getDate()} ${AY[d.getMonth()]} ${GUNLER[d.getDay()].slice(0, 3)}`;
  /* Bir öğretim haftasına (pazartesi–cuma) denk gelen resmî tatil günleri */
  const haftaTatilleri = (w) => { const s = HAFTALAR[w - 1]; if (!s) return []; const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 4); return RESMI.filter((r) => r.d >= s && r.d <= e); };
  function takvimDurum(simdi = new Date()) {
    const g = gunBasi(simdi), resmi = RESMI.find((r) => +r.d === +g), donem = DONEM.find((r) => g >= r.b && g <= r.e);
    const hafta = buHafta(simdi), hs = g.getDay() === 0 || g.getDay() === 6;
    const gelecek = [...RESMI.filter((r) => r.d > g).map((r) => ({ ad: r.ad, d: r.d })), ...DONEM.filter((r) => r.b > g).map((r) => ({ ad: r.ad, d: r.b }))].sort((a, b) => a.d - b.d)[0];
    let bugun = donem ? `${donem.ad} (${kisaGun(donem.e)} sonuna kadar)` : resmi ? resmi.ad : hs ? "Hafta sonu" : hafta.bitti ? "Ders yılı bitti" : hafta.once ? "Ders yılı başlamadı" : `${hafta.no}. öğretim haftası`;
    return { bugun, resmi, donem, hafta, gelecek, kalan: gelecek ? gunFark(g, gelecek.d) : null };
  }
  function saatGuncelle() {
    const d = new Date(), saat = d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const ust = document.getElementById("omUstSaat"); if (ust) ust.innerHTML = `<b>${saat.slice(0, 5)}</b><small>${d.getDate()} ${AY[d.getMonth()]}</small>`;
    const k = document.getElementById("omSaat"); if (!k) return;
    k.textContent = saat;
    const t = document.getElementById("omTarih"); if (t && t.dataset.g !== String(d.getDate())) { t.dataset.g = String(d.getDate()); t.textContent = uzunTarih(d); const dr = document.getElementById("omDurum"); if (dr) dr.innerHTML = durumHtml(takvimDurum(d)); }
  }
  const durumHtml = (td) => `<span class="om-bugun${td.resmi || td.donem ? " tatil" : ""}">${U.kacis(td.bugun)}</span>${td.gelecek ? `<span class="om-sonraki">Sıradaki: <b>${U.kacis(td.gelecek.ad)}</b> · ${kisaGun(td.gelecek.d)}${td.kalan === 1 ? " · yarın" : td.kalan > 1 ? ` · ${td.kalan} gün sonra` : ""}</span>` : ""}`;
  setInterval(saatGuncelle, 1000); setTimeout(saatGuncelle, 0);

  /* ---------- Yardımcılar ---------- */
  const hepsi = (p) => P[p].temalar.flatMap((t) => t.ciktilar.map((c) => ({ ...c, tema: t })));
  const bul = (id) => { const p = String(id).split(".")[0]; if (!P[p]) return null; const c = hepsi(p).find((x) => x.id === id); return c ? { p, c } : null; };
  const haftaninKazanimi = (p, w) => hepsi(p).find((c) => w >= c.hafta[0] && w <= c.hafta[1]);
  const depo = () => { const d = U.depoAl(DEPO, { program: "byf", notlar: {}, baglantilar: {}, isaret: {} }); d.defter = d.defter || {}; return d; };
  const depoGuncelle = (f) => { const d = depo(); f(d); U.depoYaz(DEPO, d); };
  const temaRenk = ["#5b8cff", "#35e0b0", "#ffc657", "#ff8a1f", "#ff4d61", "#a66bff", "#4cc3ff", "#f472b6"];
  const etkinlikleri = (id) => ((AKIS[id] && AKIS[id].etkinlik) || []).filter((e) => ETK[e]);

  async function kopyala(metin, mesaj) {
    try { await navigator.clipboard.writeText(metin); U.bildir(mesaj || "Kopyalandı"); }
    catch (e) {
      const t = document.createElement("textarea"); t.value = metin; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); U.bildir(mesaj || "Kopyalandı"); } catch (e2) { U.bildir("Kopyalanamadı; metni seçip Ctrl+C ile kopyalayın."); }
      t.remove();
    }
    Ses.efekt("sec");
  }
  const defterMetni = (c, basamakli) => `${c.kod} ${c.ad}` + (basamakli ? "\n" + c.alt.map(([h, m]) => `${h}) ${m}`).join("\n") : "");

  /* ===================================================================
     1) MASA — yıllık plan
     =================================================================== */
  let masaEl = null, gorunen = null, yalnizEksik = false;
  function masaCiz(p) {
    const el = masaEl, pr = P[p], bh = buHafta(), w = bh.no;
    if (!gorunen || gorunen < 1 || gorunen > HAFTALAR.length) gorunen = w;
    const g = gorunen, simdi = haftaninKazanimi(p, g), td = takvimDurum(), tat = haftaTatilleri(g);
    const gecmisSon = bh.once ? 0 : bh.tatil ? w - 1 : w;  // defteri dolmuş olması gereken son hafta
    const defter = depo().defter[p] || {}, yazildi = Array.from({ length: gecmisSon }, (_, i) => i + 1).filter((i) => defter[i]).length;
    el.style.setProperty("--renk", pr.renk);
    const temaRenkleri = {}; pr.temalar.forEach((t, i) => (temaRenkleri[t.no] = temaRenk[i % temaRenk.length]));
    const durum = g !== w ? `${g}. öğretim haftası · ${g < w ? "geçmiş hafta" : "ileri hafta"}` : bh.once ? "Ders yılı 14 Eylül'de başlıyor" : bh.bitti ? "Ders yılı bitti" : bh.tatil ? `Tatil · sıradaki ${w}. hafta` : `${w}. öğretim haftası · bu hafta`;
    const hucre = [];
    for (let i = 1; i <= HAFTALAR.length; i++) {
      const c = haftaninKazanimi(p, i);
      const ht = haftaTatilleri(i);
      hucre.push(`<button type="button" data-h="${i}" style="--tr:${c ? temaRenkleri[c.tema.no] : "#33405e"}" ${i === w ? 'aria-current="true"' : ""} class="${i < w ? "gecti" : ""}${i === g && g !== w ? " gorunen" : ""}${ht.length ? " tatilli" : ""}${i <= gecmisSon && (depo().defter[p] || {})[i] ? " yazildi" : ""}" aria-label="${i}. hafta${c ? ": " + U.kacis(c.kod) : ""}${ht.length ? " · resmî tatil" : ""}"></button>`);
    }
    el.innerHTML = `
      <div class="bolum-basi"><span class="etiket">BİLSEM Matematik · 2026-2027</span>
        <h2>Kazanımı deftere yaz, sonra sınıfta yaşat</h2>
        <p>Grubunu seç. Bu haftanın kazanımı en üstte; kartın üstündeki <b>Deftere kopyala</b> resmî cümleyi e-Okul'a hazır kopyalar, <b>Etkinliğe git</b> o kazanımı akıllı tahtada işleyecek etkinliği açar. Geçmiş haftaların defterini sonradan dolduracaksan <b>Defter takibi</b> listesini kullan.</p></div>
      <section class="panel om-takvim" aria-label="Saat ve akademik takvim"><div class="om-saat-kutu"><span class="om-saat" id="omSaat">${new Date().toLocaleTimeString("tr-TR")}</span><span class="om-tarih" id="omTarih" data-g="${new Date().getDate()}">${uzunTarih(new Date())}</span></div>
        <div class="om-durum" id="omDurum">${durumHtml(td)}</div></section>
      <div class="grup-sec" role="group" aria-label="Öğrenci grubu">${Object.entries(P).map(([k, v]) => `<button type="button" data-p="${k}" style="--renk:${v.renk}" aria-pressed="${k === p}"><b>${v.kisa}</b><small>${U.kacis(v.ad)}</small></button>`).join("")}</div>
      <section class="panel bu-hafta" aria-label="Bu haftanın kazanımı">
        <div class="ust-satir"><span class="hafta-etiket">${pr.kisa} · ${durum}${g && !(bh.bitti && g === w) ? " · " + haftaAraligi(g) : ""}</span>
          <span class="hafta-gez"><button type="button" class="mini-btn" data-gez="-1" ${g <= 1 ? "disabled" : ""} title="Önceki hafta" aria-label="Önceki hafta">‹</button>${g !== w ? `<button type="button" class="btn btn-hayalet btn-kucuk" data-gez="0">Bu haftaya dön</button>` : ""}<button type="button" class="mini-btn" data-gez="1" ${g >= HAFTALAR.length ? "disabled" : ""} title="Sonraki hafta" aria-label="Sonraki hafta">›</button></span></div>
        ${simdi ? `<span class="soluk" style="font-size:14px">Tema ${simdi.tema.no}: ${U.kacis(baslikDuzelt(simdi.tema.ad))}</span>` : ""}
        ${tat.length ? `<p class="om-tatil-not">⚑ Bu hafta resmî tatil: ${tat.map((r) => `<b>${kisaGun(r.d)}</b> ${U.kacis(r.ad)}`).join(" · ")}. ${tat.some((r) => !r.yarim) ? "Tam gün tatile denk gelen dersin defteri doldurulmaz" : ""}${tat.some((r) => r.yarim) ? `${tat.some((r) => !r.yarim) ? "; arife" : "Arife"} günü öğleden önceki dersler yapılır` : ""}.</p>` : ""}
        ${simdi ? `<span class="kod">${simdi.kod}</span><h3>${U.kacis(simdi.ad)}</h3>
          <div class="kz-dugmeler">
            <a class="btn btn-etkinlik btn-buyuk" href="#kazanim-${simdi.id}">Etkinliğe git →</a>
            <button class="btn btn-ikinci" data-kopya="${simdi.id}">Deftere kopyala</button>
            <button class="btn btn-hayalet" data-kopya="${simdi.id}" data-tam="1">Basamaklarıyla kopyala</button>
            ${g <= gecmisSon ? `<label class="anahtar om-yazildi"><input type="checkbox" data-yazildi="${g}" ${defter[g] ? "checked" : ""}> Deftere yazıldı</label>` : ""}
          </div>` : `<p class="soluk">Bu hafta için planda kazanım yok.</p>`}
      </section>
      <div class="serit-kap">
        <div class="serit" style="--n:${HAFTALAR.length}" id="serit">${hucre.join("")}</div>
        <div class="serit-alt"><span>14 Eyl</span><span>Yarıyıl</span><span>25 Haz</span></div>
        <p class="serit-ipucu" id="seritIpucu">Şeritteki bir haftaya dokun: o haftanın kazanımı yukarıda açılır. Renkler temaları, alttaki nokta resmî tatili, üstteki çizgi deftere yazılan haftayı gösterir.</p>
      </div>
      ${gecmisSon ? `<section class="panel om-defter" aria-label="Defter takibi">
        <div class="ust-satir"><span class="etiket" style="color:var(--renk)">Defter takibi · ${pr.kisa}</span>
          <span class="om-ozet"><b>${yazildi}/${gecmisSon}</b> geçmiş hafta deftere yazıldı${gecmisSon - yazildi ? ` · <span class="om-eksik">${gecmisSon - yazildi} hafta eksik</span>` : " ✓"}</span>
          <label class="anahtar"><input type="checkbox" id="omYalnizEksik" ${yalnizEksik ? "checked" : ""}> Yalnız eksikler</label></div>
        <div class="om-liste">${Array.from({ length: gecmisSon }, (_, i) => gecmisSon - i).filter((i) => !yalnizEksik || !defter[i]).map((i) => { const c = haftaninKazanimi(p, i), ht = haftaTatilleri(i);
          return `<div class="om-satir${defter[i] ? " tamam" : ""}"><label class="om-tik"><input type="checkbox" data-yazildi="${i}" ${defter[i] ? "checked" : ""} aria-label="${i}. hafta deftere yazıldı"></label>
            <button type="button" class="om-h" data-git-hafta="${i}"><b>${i}. hafta</b><small>${haftaAraligi(i)}</small></button>
            <span class="om-k">${c ? `<span class="kod">${c.kod}</span> ${U.kacis(c.ad.length > 110 ? c.ad.slice(0, 108) + "…" : c.ad)}` : '<span class="soluk">Planda kazanım yok</span>'}${ht.length ? `<small class="om-tatil">⚑ ${ht.map((r) => kisaGun(r.d) + " " + U.kacis(r.ad)).join(" · ")}</small>` : ""}</span>
            ${c ? `<button class="btn btn-ikinci btn-kucuk" data-kopya="${c.id}">Kopyala</button>` : ""}</div>`; }).join("") || '<p class="soluk">Eksik hafta yok. 👏</p>'}</div>
        <p class="e-not">İşaretler yalnızca bu tarayıcıda tutulur. Defteri e-Okul'a yazdıkça kutuyu işaretle; geriye dönük doldururken “Yalnız eksikler” ile kalanları gör.</p></section>` : ""}
      ${pr.temalar.map((t) => `<section class="tema" style="--tr:${temaRenkleri[t.no]}">
        <div class="tema-bas"><span class="no">TEMA ${t.no}</span><h3>${U.kacis(baslikDuzelt(t.ad))}</h3><p>${U.kacis(t.aciklama)}</p></div>
        <div class="kz-liste">${t.ciktilar.map((c) => kart(c, c === simdi)).join("")}</div></section>`).join("")}
      <p class="e-not" style="margin-top:20px">Haftalar, örnek yıllık planlardaki sürelerle MEB 2026-2027 çalışma takvimine (16-20 Kasım ve 8-12 Mart ara tatilleri, 25 Ocak-5 Şubat yarıyıl) yerleştirildi; resmî tatiller (29 Ekim, 1 Ocak, 23 Nisan, Kurban Bayramı ve 19 Mayıs) haftalarda işaretlidir. Kendi planın farklıysa kazanımı listeden seçmen yeterli.</p>`;
    const ipucu = U.$("#seritIpucu", el);
    U.$("#serit", el).addEventListener("click", (e) => {
      const b = e.target.closest("button[data-h]"); if (!b) return;
      gorunen = +b.dataset.h; Ses.efekt("sec"); masaCiz(p); const k = U.$(".bu-hafta", masaEl); if (k) k.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    U.$("#serit", el).addEventListener("pointerover", (e) => {
      const b = e.target.closest("button[data-h]"); if (!b) return;
      const h = +b.dataset.h, c = haftaninKazanimi(p, h);
      const ht = haftaTatilleri(h);
      ipucu.innerHTML = `<b>${h}. hafta</b> · ${haftaAraligi(h)}${c ? ` · <span class="kod">${c.kod}</span> ${U.kacis(c.ad)}` : ""}${ht.length ? ` · ⚑ ${ht.map((r) => kisaGun(r.d) + " " + U.kacis(r.ad)).join(" · ")}` : ""}`;
    });
    if (U.animasyon()) gsap.fromTo(U.$$(".kz-kart", el), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .35, stagger: .02, overwrite: true });
  }
  const baslikDuzelt = (s) => s.toLocaleLowerCase("tr-TR").replace(/(^|[\s,/(])(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase("tr-TR")).replace(/\bVe\b/g, "ve");
  function kart(c, simdi) {
    const e = etkinlikleri(c.id), a = AKIS[c.id];
    return `<article class="kz-kart${simdi ? " simdi" : ""}">
      <div class="alt-satir"><span class="kod">${c.kod}</span><span>${c.hafta[0] === c.hafta[1] ? c.hafta[0] + ". hafta" : c.hafta[0] + "–" + c.hafta[1] + ". hafta"} · ${haftaAraligi(c.hafta[0], c.hafta[1])}</span></div>
      <p class="cumle">${U.kacis(c.ad)}</p>
      <div class="satir">${e.map((x) => `<span class="isaret">◆ ${U.kacis(ETK[x].ad)}</span>`).join("")}${a ? `<span class="isaret akis">Ders akışı · ${a.adimlar.length} adım</span>` : ""}</div>
      <div class="kz-dugmeler"><a class="btn btn-etkinlik" href="#kazanim-${c.id}">Etkinliğe git →</a><button class="btn btn-ikinci" data-kopya="${c.id}">Deftere kopyala</button></div>
    </article>`;
  }
  MC.modul("masa", {
    baslik: "Yıllık Plan ve Bu Hafta",
    kur(el) {
      masaEl = el;
      el.addEventListener("click", (e) => {
        const g = e.target.closest(".grup-sec button[data-p]");
        if (g) { depoGuncelle((d) => (d.program = g.dataset.p)); Ses.efekt("sec"); history.replaceState(null, "", "#masa-" + g.dataset.p); gorunen = null; masaCiz(g.dataset.p); return; }
        const k = e.target.closest("[data-kopya]");
        if (k) { const b = bul(k.dataset.kopya); if (b) kopyala(defterMetni(b.c, !!k.dataset.tam), "Kazanım kopyalandı: deftere yapıştırabilirsin"); }
        const gz = e.target.closest("[data-gez]");
        if (gz) { const bh = buHafta(); gorunen = +gz.dataset.gez === 0 ? bh.no : (gorunen || bh.no) + +gz.dataset.gez; Ses.efekt("dokun"); masaCiz(depo().program); }
        const gh = e.target.closest("[data-git-hafta]");
        if (gh) { gorunen = +gh.dataset.gitHafta; Ses.efekt("sec"); masaCiz(depo().program); const b = U.$(".bu-hafta", el); if (b) b.scrollIntoView({ behavior: "smooth", block: "center" }); }
      });
      el.addEventListener("change", (e) => {
        const y = e.target.closest("[data-yazildi]");
        if (y) { const p = depo().program, h = +y.dataset.yazildi; depoGuncelle((d) => { d.defter = d.defter || {}; d.defter[p] = d.defter[p] || {}; if (y.checked) d.defter[p][h] = 1; else delete d.defter[p][h]; }); Ses.efekt(y.checked ? "dogru" : "dokun"); masaCiz(p); }
        if (e.target.id === "omYalnizEksik") { yalnizEksik = e.target.checked; masaCiz(depo().program); }
      });
    },
    goster(el, param) {
      const p = P[param] ? param : depo().program;
      if (P[param]) depoGuncelle((d) => (d.program = param));
      masaCiz(P[p] ? p : "byf");
    },
  });

  /* ===================================================================
     2) KAZANIM SAYFASI
     =================================================================== */
  let temizle = null;
  function etkinlikAc(alan, id) {
    if (temizle) { try { temizle(); } catch (e) {} temizle = null; }
    alan.innerHTML = "";
    const r = ETK[id].kur(alan);
    if (typeof r === "function") temizle = r;
    U.tex(alan);
  }
  function kazanimCiz(el, id) {
    if (temizle) { try { temizle(); } catch (e) {} temizle = null; }
    const b = bul(id);
    if (!b) {
      const p = depo().program, w = buHafta().no, c = haftaninKazanimi(p, w) || hepsi(p)[0];
      return kazanimCiz(el, c.id);
    }
    const { p, c } = b, pr = P[p], a = AKIS[c.id], etk = etkinlikleri(c.id), d = depo();
    el.style.setProperty("--renk", pr.renk);
    const liste = hepsi(p), i = liste.findIndex((x) => x.id === c.id), onceki = liste[i - 1], sonraki = liste[i + 1];
    const isaretli = new Set(d.isaret[c.id] || []);
    el.innerHTML = `
      <div class="kz-bas">
        <div class="kz-yol"><a href="#masa-${p}">← ${pr.kisa} yıllık planı</a><span>Tema ${c.tema.no} · ${U.kacis(baslikDuzelt(c.tema.ad))}</span><span class="mono">${c.hafta[0]}–${c.hafta[1]}. hafta · ${haftaAraligi(c.hafta[0], c.hafta[1])}</span></div>
        <h2><span class="kod">${c.kod}</span>${U.kacis(c.ad)}</h2>
        <div class="kz-dugmeler">
          <button class="btn btn-ikinci" data-kopya="0">Deftere kopyala</button>
          <button class="btn btn-hayalet" data-kopya="1">Basamaklarıyla kopyala</button>
          ${a ? `<button class="btn btn-hayalet" id="sunumAc">▶ Ders akışını tahtada sun</button>` : ""}
        </div>
      </div>
      <div class="kz-duzen">
        <section class="panel etk-panel" id="etkPanel" aria-label="Etkinlik">
          <div class="etk-ust"><div id="etkSekme"></div><button class="btn btn-hayalet" id="tahtaBtn" title="Etkinliği tam ekranda aç">⛶ Tahtaya aç</button></div>
          <div class="etk-alan" id="etkAlan"></div>
        </section>
        <div class="yigin">
          ${a ? `<section class="panel" aria-label="Ders akışı">
            <span class="etiket soluk">Ders akışı · yaklaşık ${a.adimlar.reduce((s, x) => s + x[1], 0)} dk</span>
            <p class="acilis-soru">${a.soru}</p>
            <div class="akis">${a.adimlar.map(([bas, dk, m, h]) => `<div class="adim"><div><b>${bas}<span class="dk">${dk} dk</span></b><p>${m}</p>${h ? `<div class="etiketler">${h.split(",").map((x) => `<span class="harf">${x.trim()})</span>`).join("")}</div>` : ""}</div></div>`).join("")}</div>
            <div class="cikis"><span class="etiket soluk">Çıkış kartı</span><p>${a.cikis}</p></div>
            ${a.zengin ? `<p class="e-not"><b>Hızlı bitirenlere:</b> ${a.zengin}</p>` : ""}
          </section>` : ""}
          <section class="panel" aria-label="Süreç bileşenleri">
            <span class="etiket soluk">Süreç bileşenleri · bu derste işlenenleri işaretle</span>
            <ul class="bilesen-liste">${c.alt.map(([h, m]) => `<li><label><input type="checkbox" data-h="${h}" ${isaretli.has(h) ? "checked" : ""}><span class="harf">${h})</span><span>${U.kacis(m)}</span></label></li>`).join("")}</ul>
          </section>
          <section class="panel cesit" aria-label="Çeşitlendir">
            <span class="etiket soluk">Çeşitlendir · senin notların</span>
            <textarea id="notAlan" placeholder="Bu kazanım için kendi fikrin, sınıfın tepkisi, gelecek yıl değiştireceğin şey…">${U.kacis(d.notlar[c.id] || "")}</textarea>
            <div class="bag-liste" id="bagListe"></div>
            <form class="bag-form" id="bagForm"><input type="text" name="ad" placeholder="Bağlantı adı (ör. GeoGebra)" required><input type="url" name="url" placeholder="https://…" required><button class="btn btn-ikinci" type="submit">Ekle</button></form>
            <div class="satir"><button class="btn btn-hayalet" id="disaAktar">Zümreyle paylaş (.json)</button><label class="btn btn-hayalet">İçe al<input type="file" accept="application/json,.json" id="iceAl" hidden></label></div>
            <p class="e-not">Notlar yalnızca bu bilgisayarda saklanır. Paylaş dosyasını zümre öğretmenin "İçe al" ile ekleyebilir.</p>
          </section>
          ${a && a.baglanti && a.baglanti.length ? `<section class="panel"><span class="etiket soluk">Master Class'ta ilgili araçlar</span><div class="bag-liste">${a.baglanti.map(([ad, url]) => `<a href="${url}" target="_blank" rel="noopener"><span>${ad}</span><span aria-hidden="true">↗</span></a>`).join("")}</div></section>` : ""}
        </div>
      </div>
      <nav class="kz-gezin" aria-label="Kazanımlar arasında gezin">
        ${onceki ? `<a class="btn btn-hayalet" href="#kazanim-${onceki.id}">← ${onceki.kod}</a>` : "<span></span>"}
        ${sonraki ? `<a class="btn btn-hayalet" href="#kazanim-${sonraki.id}">${sonraki.kod} →</a>` : ""}
      </nav>
      <div class="sunum" id="sunum" hidden role="dialog" aria-label="Ders akışı sunumu"></div>`;

    /* Etkinlik alanı */
    const alan = U.$("#etkAlan", el), sekme = U.$("#etkSekme", el);
    if (etk.length) {
      if (etk.length > 1) U.sekmeler(sekme, etk.map((x) => ({ id: x, ad: ETK[x].ad })), (x) => etkinlikAc(alan, x));
      else { sekme.innerHTML = `<span class="etiket">◆ ${U.kacis(ETK[etk[0]].ad)}</span>`; etkinlikAc(alan, etk[0]); }
    } else {
      sekme.innerHTML = `<span class="etiket soluk">Tahta için açılış</span>`;
      alan.innerHTML = `<div class="etk-bos">${a ? `<p class="buyuk-soru">${a.soru}</p><p class="soluk">Bu kazanım için etkileşimli etkinlik sırada. Şimdilik ders akışını adım adım tahtada sunabilirsin; her adım kazanımın hangi basamağını işlediğini gösterir.</p><button class="btn btn-etkinlik btn-buyuk" id="sunumAc2">▶ Ders akışını tahtada sun</button>` : `<p class="buyuk-soru">${U.kacis(c.ad)}</p><p class="soluk">Bu kazanımın ders akışı hazırlanıyor.</p>`}</div>`;
    }
    U.$("#tahtaBtn", el).addEventListener("click", () => {
      const pn = U.$("#etkPanel", el);
      if (document.fullscreenElement) document.exitFullscreen();
      else if (pn.requestFullscreen) pn.requestFullscreen().catch(() => U.bildir("Tarayıcı tam ekranı açmadı."));
      Ses.efekt("dokun");
    });
    el.querySelectorAll("[data-kopya]").forEach((k) => k.addEventListener("click", () => kopyala(defterMetni(c, k.dataset.kopya === "1"), "Kazanım kopyalandı: deftere yapıştırabilirsin")));
    U.$$(".bilesen-liste input", el).forEach((cb) => cb.addEventListener("change", () => depoGuncelle((d2) => { const s = new Set(d2.isaret[c.id] || []); cb.checked ? s.add(cb.dataset.h) : s.delete(cb.dataset.h); d2.isaret[c.id] = [...s]; })));
    let yazZaman = null;
    U.$("#notAlan", el).addEventListener("input", (e) => { clearTimeout(yazZaman); const v = e.target.value; yazZaman = setTimeout(() => depoGuncelle((d2) => { if (v.trim()) d2.notlar[c.id] = v; else delete d2.notlar[c.id]; }), 400); });
    const bagCiz = () => {
      const l = depo().baglantilar[c.id] || [];
      U.$("#bagListe", el).innerHTML = l.map((x, j) => `<a href="${U.kacis(x.url)}" target="_blank" rel="noopener"><span>${U.kacis(x.ad)}</span><button type="button" data-sil="${j}" aria-label="${U.kacis(x.ad)} bağlantısını sil">×</button></a>`).join("");
    };
    bagCiz();
    U.$("#bagListe", el).addEventListener("click", (e) => { const s = e.target.closest("[data-sil]"); if (!s) return; e.preventDefault(); depoGuncelle((d2) => { d2.baglantilar[c.id].splice(+s.dataset.sil, 1); }); bagCiz(); });
    U.$("#bagForm", el).addEventListener("submit", (e) => {
      e.preventDefault(); const f = e.target, ad = f.ad.value.trim(), url = f.url.value.trim();
      if (!/^https?:\/\//i.test(url)) { U.bildir("Bağlantı http:// ya da https:// ile başlamalı."); return; }
      depoGuncelle((d2) => { (d2.baglantilar[c.id] = d2.baglantilar[c.id] || []).push({ ad, url }); }); f.reset(); bagCiz(); Ses.efekt("sec");
    });
    U.$("#disaAktar", el).addEventListener("click", () => {
      const d2 = depo(), veri = JSON.stringify({ tur: "bilsem-ogretmen-masasi", surum: 1, tarih: new Date().toISOString().slice(0, 10), notlar: d2.notlar, baglantilar: d2.baglantilar }, null, 1);
      const a2 = document.createElement("a"); a2.href = URL.createObjectURL(new Blob([veri], { type: "application/json" })); a2.download = "ogretmen-masasi-notlarim.json"; a2.click();
      setTimeout(() => URL.revokeObjectURL(a2.href), 2000);
    });
    U.$("#iceAl", el).addEventListener("change", async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const v = JSON.parse(await f.text()); if (v.tur !== "bilsem-ogretmen-masasi") throw 0;
        let n = 0;
        depoGuncelle((d2) => {
          for (const [k, m] of Object.entries(v.notlar || {})) { if (typeof m !== "string") continue; d2.notlar[k] = d2.notlar[k] && d2.notlar[k] !== m ? d2.notlar[k] + "\n\n— Paylaşılan not —\n" + m : m; n++; }
          for (const [k, l] of Object.entries(v.baglantilar || {})) {
            const var0 = new Set((d2.baglantilar[k] || []).map((x) => x.url));
            for (const x of l || []) if (x && /^https?:\/\//i.test(x.url) && !var0.has(x.url)) { (d2.baglantilar[k] = d2.baglantilar[k] || []).push({ ad: String(x.ad).slice(0, 120), url: x.url }); n++; }
          }
        });
        U.bildir(`${n} not ve bağlantı eklendi.`); kazanimCiz(el, c.id);
      } catch (err) { U.bildir("Bu dosya Öğretmen Masası paylaş dosyası değil."); }
    });

    /* Sunum modu */
    const sn = U.$("#sunum", el);
    const sunumAc = () => {
      const kartlar = [{ tur: "Açılış sorusu", bas: a.soru, m: "Önce sessizce düşünün, sonra yanınızdakiyle tahmininizi paylaşın." },
        ...a.adimlar.map(([bas, dk, m, h], j) => ({ tur: `Adım ${j + 1}${h ? " · basamak " + h.split(",").map((x) => x.trim() + ")").join(" ") : ""}`, bas, m, dk })),
        { tur: "Çıkış kartı", bas: a.cikis, m: "Cevabını kartına yaz; çıkarken teslim et." }];
      let k = 0, kalan = 0, saat = null;
      const durdur = () => { clearInterval(saat); saat = null; };
      const goster = () => {
        const x = kartlar[k]; durdur(); kalan = (x.dk || 0) * 60;
        sn.innerHTML = `<div class="sunum-ust"><span class="hafta-etiket">${c.kod} · ${U.kacis(pr.kisa)}</span><div class="satir">${x.dk ? `<span class="saat" id="snSaat">${x.dk}:00</span><button class="btn btn-hayalet" id="snBasla">Süreyi başlat</button>` : ""}<button class="btn btn-ikinci" id="snKapat">Kapat ✕</button></div></div>
          <div class="sunum-govde"><span class="tur">${x.tur}</span><h3>${x.bas}</h3><p>${x.m}</p></div>
          <div class="sunum-alt"><button class="btn btn-hayalet btn-buyuk" id="snGeri" ${k === 0 ? "disabled" : ""}>← Geri</button><div class="sunum-nokta">${kartlar.map((_, j) => `<i class="${j === k ? "aktif" : ""}"></i>`).join("")}</div><button class="btn btn-etkinlik btn-buyuk" id="snIleri">${k === kartlar.length - 1 ? "Bitir" : "İleri →"}</button></div>`;
        U.tex(sn);
        U.$("#snKapat", sn).onclick = kapat;
        U.$("#snGeri", sn).onclick = () => { if (k > 0) { k--; goster(); Ses.efekt("dokun"); } };
        U.$("#snIleri", sn).onclick = () => { if (k < kartlar.length - 1) { k++; goster(); Ses.efekt("dokun"); } else kapat(); };
        const sb = U.$("#snBasla", sn);
        if (sb) sb.onclick = () => {
          if (saat) { durdur(); sb.textContent = "Devam"; return; }
          sb.textContent = "Duraklat";
          saat = setInterval(() => { kalan = Math.max(0, kalan - 1); const s = U.$("#snSaat", sn); if (s) s.textContent = `${Math.floor(kalan / 60)}:${String(kalan % 60).padStart(2, "0")}`; if (!kalan) { durdur(); Ses.efekt("bitis"); sb.textContent = "Süre doldu"; } }, 1000);
        };
        if (U.animasyon()) gsap.fromTo(U.$(".sunum-govde", sn), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .35 });
      };
      const tus = (e) => { if (sn.hidden) return; if (e.key === "ArrowRight" || e.key === "PageDown") U.$("#snIleri", sn).click(); if (e.key === "ArrowLeft" || e.key === "PageUp") U.$("#snGeri", sn).click(); if (e.key === "Escape") kapat(); };
      const kapat = () => { durdur(); sn.hidden = true; document.removeEventListener("keydown", tus); };
      sn.hidden = false; goster(); document.addEventListener("keydown", tus);
    };
    ["#sunumAc", "#sunumAc2"].forEach((s) => { const x = U.$(s, el); if (x) x.addEventListener("click", sunumAc); });
    if (U.animasyon()) gsap.fromTo(U.$$(".panel", el), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .35, stagger: .04, overwrite: true });
  }
  MC.modul("kazanim", { baslik: "Kazanım ve Etkinlik", kur() {}, goster(el, param) { kazanimCiz(el, param); } });

  /* ===================================================================
     3) TAHTA ARAÇLARI
     =================================================================== */
  MC.modul("araclar", {
    baslik: "Tahta Araçları",
    kur(el) {
      el.style.setProperty("--renk", "#ffc657");
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Tahta Araçları</span><h2>Her derste işe yarayanlar</h2><p>Zamanlayıcı, numara çekici ve grup kurucu. Öğrenci adı istenmez; numaralarla çalışır.</p></div>
        <div class="arac-izgara">
          <section class="panel"><span class="etiket soluk">Zamanlayıcı</span><div class="dev-saat" id="zSaat">5:00</div>
            <div class="segment" id="zSec"></div><div class="satir"><button class="btn btn-ana" id="zBasla">Başlat</button><button class="btn btn-hayalet" id="zSifir">Sıfırla</button></div>
            <p class="e-not">Düşün-Eşleş-Paylaş için: 1 dk tek başına, 2 dk eşinle, 3 dk sınıfla.</p></section>
          <section class="panel"><span class="etiket soluk">Rastgele numara</span><div class="dev-sayi" id="rSayi">?</div>
            <label class="e-kontrol"><span class="soluk">Sınıftaki öğrenci sayısı</span><input type="number" id="rN" min="2" max="60" value="16"></label>
            <div class="satir"><button class="btn btn-ana" id="rCek">Numara çek</button><button class="btn btn-hayalet" id="rSifir">Herkes yeniden</button></div>
            <p class="e-not" id="rDurum">Çekilen numara tekrar gelmez; herkes bir kez söz alır.</p></section>
          <section class="panel"><span class="etiket soluk">Grup kurucu</span>
            <div class="satir"><label class="e-kontrol"><span class="soluk">Öğrenci</span><input type="number" id="gN" min="2" max="60" value="16"></label><label class="e-kontrol"><span class="soluk">Grup sayısı</span><input type="number" id="gK" min="2" max="12" value="4"></label></div>
            <button class="btn btn-ana" id="gKur">Grupları kur</button><div class="gruplar" id="gSonuc"></div></section>
        </div>`;
      /* zamanlayıcı */
      let toplam = 300, kalan = 300, z = null;
      const yaz = () => { const s = U.$("#zSaat", el); s.textContent = `${Math.floor(kalan / 60)}:${String(kalan % 60).padStart(2, "0")}`; s.classList.toggle("bitti", kalan === 0); };
      U.segment(U.$("#zSec", el), [[60, "1 dk"], [180, "3 dk"], [300, "5 dk"], [600, "10 dk"], [900, "15 dk"]], 300, (v) => { clearInterval(z); z = null; toplam = kalan = +v; U.$("#zBasla", el).textContent = "Başlat"; yaz(); });
      U.$("#zBasla", el).addEventListener("click", (e) => {
        if (z) { clearInterval(z); z = null; e.target.textContent = "Devam"; return; }
        if (!kalan) kalan = toplam;
        e.target.textContent = "Duraklat";
        z = setInterval(() => { kalan--; yaz(); if (kalan <= 0) { kalan = 0; yaz(); clearInterval(z); z = null; e.target.textContent = "Başlat"; Ses.efekt("bitis"); } }, 1000);
      });
      U.$("#zSifir", el).addEventListener("click", () => { clearInterval(z); z = null; kalan = toplam; U.$("#zBasla", el).textContent = "Başlat"; yaz(); });
      /* numara çekici */
      let cekilen = [];
      U.$("#rCek", el).addEventListener("click", () => {
        const n = Math.max(2, Math.min(60, +U.$("#rN", el).value || 16)), kalanlar = [];
        for (let i = 1; i <= n; i++) if (!cekilen.includes(i)) kalanlar.push(i);
        if (!kalanlar.length) { U.$("#rDurum", el).textContent = "Herkes söz aldı. \"Herkes yeniden\" ile baştan başla."; return; }
        const s = U.sec(kalanlar), kutu = U.$("#rSayi", el); cekilen.push(s);
        let t = 0; const don = setInterval(() => { kutu.textContent = U.sec(kalanlar); if (++t > 10) { clearInterval(don); kutu.textContent = s; Ses.efekt("dogru"); } }, 60);
        U.$("#rDurum", el).textContent = `Söz alanlar: ${cekilen.join(", ")}`;
      });
      U.$("#rSifir", el).addEventListener("click", () => { cekilen = []; U.$("#rSayi", el).textContent = "?"; U.$("#rDurum", el).textContent = "Liste sıfırlandı."; });
      /* grup kurucu */
      U.$("#gKur", el).addEventListener("click", () => {
        const n = Math.max(2, Math.min(60, +U.$("#gN", el).value || 16)), k = Math.max(2, Math.min(12, +U.$("#gK", el).value || 4));
        const sira = U.karistir(Array.from({ length: n }, (_, i) => i + 1)), g = Array.from({ length: k }, () => []);
        sira.forEach((x, i) => g[i % k].push(x));
        U.$("#gSonuc", el).innerHTML = g.map((x, i) => `<div><b>Grup ${i + 1}</b>${x.sort((a2, b2) => a2 - b2).join(", ")}</div>`).join("");
        Ses.efekt("sec");
      });
    },
  });

  /* ===================================================================
     4) REHBER
     =================================================================== */
  MC.modul("rehber", {
    baslik: "Nasıl Kullanılır?",
    kur(el) {
      el.style.setProperty("--renk", "#35e0b0");
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Nasıl Kullanılır?</span><h2>Kazanım yazılır, ders yaşanır</h2>
        <p>BİLSEM'de kazanım bir yazı satırı değil, öğrencinin geçeceği bir yoldur. Çerçeve programdaki her kazanımın altındaki a), b), c)… basamakları o yolun duraklarıdır. Bu masa her etkinliği ve ders adımını bu duraklara bağlar.</p></div>
        <div class="rehber-izgara">
          <section class="panel"><span class="etiket soluk">Derste dört adım</span><ol>
            <li><b>Yıllık Plan ve Bu Hafta</b> sekmesinde grubunu seç (seçimin hatırlanır).</li>
            <li>Bu haftanın kartında <b>Deftere kopyala</b>'ya bas, e-Okul ders defterine yapıştır.</li>
            <li><b>Etkinliğe git</b> → <b>Tahtaya aç</b>. Etkinlik akıllı tahtada tam ekran açılır.</li>
            <li>Dersi bitirirken sağdaki <b>çıkış kartı</b> sorusunu sor; işlediğin basamakları işaretle.</li></ol></section>
          <section class="panel"><span class="etiket soluk">Ders akışının mantığı</span><ul>
            <li><b>Açılış sorusu:</b> cevabı hemen bilinmeyen, tahmin ettiren bir soru.</li>
            <li><b>Keşif:</b> öğrenci örnek üretir, veri toplar, örüntü arar (varsayım basamakları).</li>
            <li><b>Tartışma ve genelleme:</b> sınıf varsayımları sınar, kural ya da önerme yazar.</li>
            <li><b>Çıkış kartı:</b> tek soruda kazanımın özü; ertesi derse kanıt.</li>
            <li>Her adımın yanındaki <span class="harf">a)</span> etiketi, hangi süreç bileşenine hizmet ettiğini gösterir.</li></ul></section>
          <section class="panel"><span class="etiket soluk">Çeşitlendirme</span><ul>
            <li>Etkileşimli etkinliklerde sayılar, zorluk ve senaryo düğmelerle değişir; her sınıfa farklı sürüm.</li>
            <li>Kazanım sayfasındaki <b>Çeşitlendir</b> kutusuna kendi fikrini, GeoGebra/Desmos bağlantılarını ekle.</li>
            <li><b>Zümreyle paylaş</b> notlarını bir dosyaya yazar; diğer öğretmen <b>İçe al</b> ile ekler, kimsenin notu silinmez.</li></ul></section>
          <section class="panel"><span class="etiket soluk">Gizlilik ve internet</span><ul>
            <li>Öğrenci adı, e-posta ya da konum istenmez; numara çekici bile yalnızca numara kullanır.</li>
            <li>Notların yalnızca bu bilgisayarın tarayıcısında durur.</li>
            <li>Sayfa bir kez açıldıktan sonra internet kesilse de çalışır.</li></ul></section>
        </div>`;
    },
  });
})();
