/* =====================================================================
   OYUN ARENASI — Sayı Avı (tek / takım), Sayı Izgarası, Sayı Bilmecesi
   Dengeli rastgele üretici: hedef türler ağırlıklı seçilir, "hayır" sorularında tuzak sayılar gelir.
   ===================================================================== */
"use strict";
(function () {
  const S = MC.sayi, U = MC.ui, Ses = MC.Ses;
  const KAT = S.KAT, KATK = S.KATK;

  /* ---------- Sayı havuzları (aralık başına bir kez hesaplanır) ---------- */
  const havuzlar = {};
  function havuz(hi) {
    if (havuzlar[hi]) return havuzlar[hi];
    const lo = 10, uye = {}, tuzak = {};
    for (const c of KAT) uye[c.k] = [];
    for (let n = lo; n <= hi; n++) { const b = BigInt(n); for (const c of KAT) if (c.f(b)) uye[c.k].push(n); }
    const uc = new Set(); for (let n = lo; n <= hi; n++) if (S.carpanlar(BigInt(n)).length === 3) uc.add(n);
    const temiz = (xs, k) => [...new Set(xs)].filter((x) => x >= lo && x <= hi && !KATK[k].f(BigInt(x)));
    const kok = Math.floor(Math.sqrt(hi)) + 2, kup = Math.floor(Math.cbrt(hi)) + 2;
    tuzak.asal = uye.yari.filter((n) => n % 2 && n % 5);
    tuzak.yari = temiz([...uye.asal, ...uc], "yari");
    tuzak.kare = temiz(Array.from({ length: kok }, (_, k) => [k * k - 1, k * k + 1]).flat(), "kare");
    tuzak.kup = temiz(Array.from({ length: kup }, (_, k) => [k ** 3 - 1, k ** 3 + 1]).flat(), "kup");
    tuzak.iki = temiz(Array.from({ length: 16 }, (_, e) => [2 ** e - 1, 2 ** e + 1, 2 ** e + 2]).flat(), "iki");
    tuzak.ucgen = temiz(Array.from({ length: Math.ceil(Math.sqrt(2 * hi)) + 2 }, (_, k) => [k * (k + 1) / 2 - 1, k * (k + 1) / 2 + 1]).flat(), "ucgen");
    tuzak.fib = temiz(uye.fib.flatMap((f) => [f - 1, f + 1]), "fib");
    tuzak.muk = temiz([8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 12, 18, 20, 24, 30], "muk");
    const kt = []; for (let a = 1; a ** 3 < hi; a++) for (let b = a; a ** 3 + b ** 3 <= hi; b++) kt.push(a ** 3 + b ** 3);
    tuzak.ram = temiz(kt, "ram");
    return (havuzlar[hi] = { uye, tuzak, lo, hi });
  }
  function agirlikli(liste) { const t = liste.reduce((a, c) => a + c.w, 0); let r = Math.random() * t; for (const c of liste) { r -= c.w; if (r <= 0) return c; } return liste[liste.length - 1]; }
  function soruUret(hi, onceki) {
    const H = havuz(hi), uygun = KAT.filter((c) => H.uye[c.k].length), c = agirlikli(uygun);
    for (let d = 0; d < 40; d++) {
      let n, evet = false, tuzak = false;
      if (Math.random() < .45) { n = U.sec(H.uye[c.k]); evet = true; }
      else if (H.tuzak[c.k] && H.tuzak[c.k].length && Math.random() < .6) { n = U.sec(H.tuzak[c.k]); tuzak = true; }
      else { do { n = H.lo + Math.floor(Math.random() * (H.hi - H.lo + 1)); } while (c.f(BigInt(n))); }
      if (n !== onceki) return { n, c, evet, tuzak };
    }
    return { n: U.sec(H.uye[c.k]), c, evet: true, tuzak: false };
  }
  /* Asimetrik puanlama. Dengeli modda yanlış EVET, sayının ödülü kadar kaybettirir. */
  function puan(evetDedi, s, mod) {
    if (evetDedi && s.evet) return s.c.puan;
    if (!evetDedi && !s.evet) return s.tuzak ? 5 : 2;
    if (!evetDedi && s.evet) return -5;
    return mod === "yonerge" ? -5 : -s.c.puan;
  }

  /* ---------- Görsel efektler ---------- */
  function ucanPuan(kart, metin, renk) {
    const el = document.createElement("div"); el.className = "ucan"; el.textContent = metin; el.style.color = renk; kart.appendChild(el);
    if (U.animasyon()) gsap.fromTo(el, { y: 0, opacity: 1, scale: .7 }, { y: -110, opacity: 0, scale: 1.25, duration: 1, ease: "power2.out", onComplete: () => el.remove() });
    else setTimeout(() => el.remove(), 700);
  }
  function konfeti(kart, adet = 26) {
    if (!U.animasyon()) return;
    const renkler = ["#ffc657", "#35e0b0", "#ff4d61", "#9db0d6", "#a66bff"];
    for (let i = 0; i < adet; i++) {
      const p = document.createElement("div"); p.className = "parca"; p.style.background = renkler[i % 5]; p.style.left = "50%"; p.style.top = "45%"; kart.appendChild(p);
      gsap.to(p, { x: (Math.random() - .5) * 560, y: (Math.random() - .7) * 320, rotation: Math.random() * 720, opacity: 0, duration: 1.1 + Math.random() * .5, ease: "power3.out", onComplete: () => p.remove() });
    }
  }
  function sayacYazi(el, hedef) {
    if (U.animasyon()) { const o = { v: +el.textContent || 0 }; gsap.to(o, { v: hedef, duration: .5, onUpdate: () => (el.textContent = Math.round(o.v)) }); }
    else el.textContent = hedef;
  }

  /* =====================================================================
     1) SAYI AVI
     ===================================================================== */
  const ayar = { aralik: 2000, sure: 60, oyuncu: "tek", mod: "dengeli" };
  let oyun = null, avEl = null;
  const ARALIK_AD = { 200: "Kolay 10–200", 2000: "Orta 10–2.000", 20000: "Uzman 10–20.000" };

  function avKur(el) {
    avEl = el;
    el.innerHTML = `
      <div id="avKurulum" class="kurulum">
        <div class="panel">
          <span class="etiket">Oyun 1</span>
          <h2>Sayı Avı</h2>
          <p class="soluk">Ekrana bir sayı ve bir hedef gelir: “Bu sayı yarı asal mı?” Nadir sayıyı yakalamak büyük ödül getirir. Ama her sayıya EVET diyen, kazanacağı kadarını kaybeder.</p>
          <div class="secim-grup"><span>Sayı aralığı</span><div id="avAralik"></div></div>
          <div class="secim-grup"><span>Süre</span><div id="avSure"></div></div>
          <div class="secim-grup"><span>Oyuncu</span><div id="avOyuncu"></div></div>
          <div class="secim-grup"><span>Puanlama</span><div id="avMod"></div></div>
          <button class="btn btn-ana btn-buyuk" id="avBasla">Oyunu Başlat</button>
        </div>
        <div class="yigin">
          <div class="panel">
            <span class="etiket">Puan tablosu</span>
            <div class="tablo-kutu"><table class="tablo">
              <tr><td>Doğru EVET: nadir sayıyı buldun</td><td class="arti mono">+20 … +200</td></tr>
              <tr><td>Doğru HAYIR</td><td class="arti mono">+2</td></tr>
              <tr><td>Doğru HAYIR, tuzak sayıda (ör. 91 asal mı?)</td><td class="arti mono">+5</td></tr>
              <tr><td>Yanlış HAYIR: nadir sayıyı kaçırdın</td><td class="eksi mono">−5</td></tr>
              <tr><td>Yanlış EVET (Dengeli mod)</td><td class="eksi mono">−ödül</td></tr>
              <tr><td>Her 5 doğruluk seri</td><td class="arti mono">+10</td></tr>
            </table></div>
            <div class="benzetme"><b>Benzetme:</b> EVET demek bir bahistir. Kazanacağın kadarını riske atarsın; bu yüzden her sayıya EVET demek kazandırmaz.</div>
            <p class="soluk" style="font-size:14px">Klavye: ← veya E = EVET · → veya H = HAYIR</p>
          </div>
          <div class="panel" id="avRekorPanel"><span class="etiket">Bu cihazdaki rekorlar</span><div id="avRekorlar"></div></div>
        </div>
      </div>
      <div id="avOyun" hidden>
        <div class="hud" id="avHud">
          <div class="halka" id="avHalka"><svg viewBox="0 0 64 64"><circle class="iz" cx="32" cy="32" r="28"/><circle class="ilerleme" id="avIlerleme" cx="32" cy="32" r="28" stroke-dasharray="175.9" stroke-dashoffset="0"/></svg><b id="avKalan">60</b></div>
          <div class="hud-hedef"><small>Hedef</small><b id="avHedef">—</b></div>
          <div class="seri" id="avSeri"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="hud-takim" id="avTakim" hidden>
            <div class="takim-kutu k" id="avTK"><small>Kırmızı Takım</small><b id="avPK">0</b></div>
            <div class="takim-kutu m" id="avTM"><small>Mavi Takım</small><b id="avPM">0</b></div>
          </div>
          <div class="hud-skor" id="avSkorKutu"><small>Puan</small><b id="avSkor">0</b></div>
        </div>
        <div class="yigin" style="margin-top:18px">
          <div class="sayi-kart" id="avKart">
            <div class="sira-yazi" id="avSira" hidden></div>
            <div class="soru">Bu sayı bir <b id="avSoruHedef">—</b> mı?</div>
            <div class="buyuk" id="avSayi">—</div>
            <div class="odul" id="avOdul"></div>
          </div>
          <div class="cevaplar">
            <button class="cevap evet" id="avEvet">EVET<small>← · E</small></button>
            <button class="cevap hayir" id="avHayir">HAYIR<small>→ · H</small></button>
          </div>
          <div class="geri" id="avGeri"><p class="soluk">İlk cevabını ver; her cevaptan sonra kısa kanıtı burada göreceksin.</p></div>
          <div class="satir" style="justify-content:center"><button class="btn btn-hayalet" id="avBitir">Oyunu bitir</button></div>
        </div>
      </div>
      <div id="avSonuc" class="panel" hidden></div>`;
    U.segment(U.$("#avAralik", el), [[200, "Kolay · 10–200"], [2000, "Orta · 10–2.000"], [20000, "Uzman · 10–20.000"]], ayar.aralik, (d) => (ayar.aralik = +d));
    U.segment(U.$("#avSure", el), [[60, "60 sn"], [90, "90 sn"], [120, "120 sn"]], ayar.sure, (d) => (ayar.sure = +d));
    U.segment(U.$("#avOyuncu", el), [["tek", "Tek oyuncu"], ["takim", "Takım yarışı (sırayla)"]], ayar.oyuncu, (d) => (ayar.oyuncu = d));
    U.segment(U.$("#avMod", el), [["dengeli", "Dengeli (önerilen)"], ["yonerge", "Sabit −5"]], ayar.mod, (d) => (ayar.mod = d));
    U.$("#avBasla", el).addEventListener("click", avBaslat);
    U.$("#avEvet", el).addEventListener("click", () => avCevap(true));
    U.$("#avHayir", el).addEventListener("click", () => avCevap(false));
    U.$("#avBitir", el).addEventListener("click", () => oyun && avBitir());
    document.addEventListener("keydown", (e) => {
      if (!oyun || oyun.bitti || U.$("#avOyun", el).hidden || !el.closest(".gorunum.aktif") || e.target.matches("input, textarea")) return;
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "e") { e.preventDefault(); avCevap(true); }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "h") { e.preventDefault(); avCevap(false); }
    });
    rekorlariGoster();
  }
  function rekorlariGoster() {
    const r = U.depoAl("mc_rekorlar", []);
    U.$("#avRekorlar", avEl).innerHTML = r.length ? `<div class="tablo-kutu"><table class="tablo"><tr><th>#</th><th>Puan</th><th>Doğru / Yanlış</th><th>Aralık</th><th>Tarih</th></tr>${r.map((x, i) => `<tr><td>${i + 1}</td><td class="mono"><b>${x.puan}</b></td><td class="mono">${x.dogru} / ${x.yanlis}</td><td>${ARALIK_AD[x.aralik] || ""}</td><td class="soluk">${x.tarih}</td></tr>`).join("")}</table></div>` : '<p class="soluk">Henüz rekor yok. İlk oyunu sen oyna.</p>';
  }
  function avBaslat() {
    Ses.baslat(); Ses.efekt("basla");
    const btn = U.$("#avBasla", avEl); btn.disabled = true; btn.textContent = "Sayılar hazırlanıyor…";
    setTimeout(() => {
      havuz(ayar.aralik);
      btn.disabled = false; btn.textContent = "Oyunu Başlat";
      oyun = { ...ayar, puan: 0, takim: [0, 0], sira: 0, dogru: 0, yanlis: 0, tuzak: 0, seri: 0, hatalar: [], bitis: performance.now() + ayar.sure * 1000, soru: soruUret(ayar.aralik), kilit: false, sonSn: null, bitti: false };
      U.$("#avKurulum", avEl).hidden = true; U.$("#avSonuc", avEl).hidden = true; U.$("#avOyun", avEl).hidden = false;
      const takim = oyun.oyuncu === "takim";
      U.$("#avTakim", avEl).hidden = !takim; U.$("#avSkorKutu", avEl).hidden = takim; U.$("#avSira", avEl).hidden = !takim;
      U.$("#avSkor", avEl).textContent = "0"; U.$("#avPK", avEl).textContent = "0"; U.$("#avPM", avEl).textContent = "0";
      U.$("#avGeri", avEl).className = "geri"; U.$("#avGeri", avEl).innerHTML = '<p class="soluk">İlk cevabını ver; her cevaptan sonra kısa kanıtı burada göreceksin.</p>';
      seriCiz(); soruCiz(true); requestAnimationFrame(avSayac);
    }, 30);
  }
  function seriCiz() { U.$$("#avSeri i", avEl).forEach((i, k) => i.classList.toggle("dolu", oyun.seri > 0 && (oyun.seri % 5 === 0 || k < oyun.seri % 5))); }
  function soruCiz(ilk) {
    const s = oyun.soru;
    U.$("#avHedef", avEl).textContent = s.c.ad; U.$("#avSoruHedef", avEl).textContent = s.c.ad;
    U.$("#avSayi", avEl).textContent = S.tr(s.n);
    U.$("#avOdul", avEl).textContent = `Doğru EVET +${s.c.puan} · Doğru HAYIR +${s.tuzak ? 5 : 2}`;
    if (oyun.oyuncu === "takim") {
      const k = oyun.sira === 0;
      U.$("#avSira", avEl).textContent = k ? "Sıra: Kırmızı Takım" : "Sıra: Mavi Takım";
      U.$("#avSira", avEl).style.color = k ? "var(--kirmizi)" : "var(--mavi)";
      U.$("#avTK", avEl).classList.toggle("sirada", k); U.$("#avTM", avEl).classList.toggle("sirada", !k);
    }
    if (U.animasyon()) gsap.fromTo(U.$("#avSayi", avEl), { scale: ilk ? .6 : .85, opacity: 0, rotateX: -50 }, { scale: 1, opacity: 1, rotateX: 0, duration: .45, ease: "back.out(2)", overwrite: true });
  }
  function avSayac(t) {
    if (!oyun || oyun.bitti) return;
    const kalan = Math.max(0, (oyun.bitis - t) / 1000), sn = Math.ceil(kalan);
    U.$("#avKalan", avEl).textContent = sn;
    U.$("#avIlerleme", avEl).style.strokeDashoffset = 175.9 * (1 - kalan / oyun.sure);
    U.$("#avHalka", avEl).classList.toggle("acil", kalan <= 10);
    if (kalan <= 10 && sn !== oyun.sonSn && sn > 0) { oyun.sonSn = sn; Ses.efekt("tik"); }
    if (kalan <= 0) { avBitir(); return; }
    requestAnimationFrame(avSayac);
  }
  function avCevap(evetDedi) {
    if (!oyun || oyun.bitti || oyun.kilit) return;
    const s = oyun.soru, dogru = evetDedi === s.evet;
    let d = puan(evetDedi, s, oyun.mod);
    if (dogru) { oyun.dogru++; oyun.seri++; if (s.tuzak) oyun.tuzak++; if (oyun.seri % 5 === 0) d += 10; }
    else { oyun.yanlis++; oyun.seri = 0; oyun.hatalar.push({ ...s, evetDedi, d, takim: oyun.sira }); }
    oyun.puan += d;
    const kim = oyun.oyuncu === "takim" ? (oyun.sira === 0 ? "Kırmızı: " : "Mavi: ") : "";
    if (oyun.oyuncu === "takim") { oyun.takim[oyun.sira] += d; sayacYazi(U.$(oyun.sira === 0 ? "#avPK" : "#avPM", avEl), oyun.takim[oyun.sira]); oyun.sira ^= 1; }
    else sayacYazi(U.$("#avSkor", avEl), oyun.puan);
    const geri = U.$("#avGeri", avEl);
    geri.className = "geri " + (dogru ? "dogru" : "yanlis");
    geri.innerHTML = `<span class="puan-rozet">${d > 0 ? "+" : ""}${d}</span><p>${kim}<b>${S.tr(s.n)}</b> → ${s.c.ad}? ${dogru ? "Doğru." : "Yanlış."}${s.tuzak ? " <b style='color:var(--altin)'>Tuzak sayıydı.</b>" : ""} ${S.kanit(s.n, s.c.k)}</p>`;
    const kart = U.$("#avKart", avEl);
    ucanPuan(kart, (d > 0 ? "+" : "") + d, dogru ? "var(--turkuaz)" : "var(--kirmizi)");
    if (dogru && oyun.seri % 5 === 0) { Ses.efekt("seri"); konfeti(kart); } else Ses.efekt(dogru ? "dogru" : "yanlis");
    if (!dogru && U.animasyon()) gsap.fromTo(kart, { x: -12 }, { x: 0, duration: .45, ease: "elastic.out(1,.3)" });
    seriCiz();
    oyun.soru = soruUret(oyun.aralik, s.n); oyun.kilit = true;
    setTimeout(() => { if (oyun && !oyun.bitti) { oyun.kilit = false; soruCiz(false); } }, 170);
  }
  function avBitir() {
    oyun.bitti = true; Ses.efekt("bitis");
    const toplam = oyun.dogru + oyun.yanlis, takim = oyun.oyuncu === "takim";
    U.$("#avOyun", avEl).hidden = true;
    const el = U.$("#avSonuc", avEl); el.hidden = false;
    let baslik, ust;
    if (takim) {
      const [k, m] = oyun.takim;
      baslik = k === m ? "Berabere!" : k > m ? "Kazanan: Kırmızı Takım" : "Kazanan: Mavi Takım";
      ust = `<div class="metrikler"><div class="metrik"><small>Kırmızı Takım</small><b style="color:var(--kirmizi)">${k}</b></div><div class="metrik"><small>Mavi Takım</small><b style="color:var(--mavi)">${m}</b></div><div class="metrik"><small>Toplam doğru</small><b>${oyun.dogru}</b></div><div class="metrik"><small>Yakalanan tuzak</small><b>${oyun.tuzak}</b></div></div>`;
    } else {
      baslik = oyun.puan >= 300 ? "Usta avcı!" : oyun.puan >= 100 ? "Güzel tur!" : "Bir tur daha?";
      ust = `<div class="metrikler"><div class="metrik"><small>Puan</small><b>${oyun.puan}</b></div><div class="metrik"><small>Doğru</small><b>${oyun.dogru}</b></div><div class="metrik"><small>İsabet</small><b>%${toplam ? Math.round(100 * oyun.dogru / toplam) : 0}</b></div><div class="metrik"><small>Yakalanan tuzak</small><b>${oyun.tuzak}</b></div></div>`;
      const r = U.depoAl("mc_rekorlar", []);
      r.push({ puan: oyun.puan, dogru: oyun.dogru, yanlis: oyun.yanlis, aralik: oyun.aralik, tarih: new Date().toLocaleDateString("tr-TR") });
      r.sort((a, b) => b.puan - a.puan); U.depoYaz("mc_rekorlar", r.slice(0, 10)); rekorlariGoster();
    }
    const hatalar = oyun.hatalar.length ? oyun.hatalar.map((h) => `<div class="hata-satir">${takim ? (h.takim === 0 ? "Kırmızı · " : "Mavi · ") : ""}<b class="mono">${S.tr(h.n)}</b> → ${h.c.ad}? Cevap: <b>${h.evetDedi ? "EVET" : "HAYIR"}</b> (${h.d})<br>${S.kanit(h.n, h.c.k)}</div>`).join("") : '<p style="color:var(--turkuaz)">Kusursuz tur. Tek hata yok.</p>';
    el.innerHTML = `<span class="etiket">Süre doldu</span><h2>${baslik}</h2>${ust}<div id="avSiralama"></div><h3>Hata röntgeni</h3><div class="hata-liste">${hatalar}</div>
      <div class="satir"><button class="btn btn-ana" id="avTekrar">Tekrar Oyna</button><button class="btn btn-ikinci" id="avAyar">Ayarları değiştir</button></div>`;
    if (MC.bulut) MC.bulut.gonderKutusu(U.$("#avSiralama", el), {
      oyun: "sayi-avi", varyant: `${{ 200: "kolay", 2000: "orta", 20000: "uzman" }[oyun.aralik]}-${oyun.sure}`,
      puan: oyun.puan, ikincil: oyun.yanlis, ayrinti: { dogru: oyun.dogru, yanlis: oyun.yanlis, tuzak: oyun.tuzak },
      engel: takim ? "Takım oyunları sıralamaya gönderilmez. Tabloya girmek için tek oyunculu bir tur oyna."
        : oyun.mod !== "dengeli" ? "Sıralamaya yalnızca Dengeli puanlamayla oynanan turlar gönderilebilir. Sabit −5 modu alıştırma içindir."
        : toplam < 3 ? "Sıralamaya göndermek için turda en az 3 soru cevapla." : null,
    });
    U.$("#avTekrar", el).addEventListener("click", avBaslat);
    U.$("#avAyar", el).addEventListener("click", () => { el.hidden = true; U.$("#avKurulum", avEl).hidden = false; });
    if (U.animasyon()) gsap.fromTo(U.$$(".metrik", el), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .5, overwrite: true });
  }

  /* =====================================================================
     2) SAYI IZGARASI — 16 sayı içinden aranan türdekilerin hepsini bul
     ===================================================================== */
  const IZ_KAT = ["yari", "asal", "kare", "ucgen", "fib", "harshad", "palin", "kup"];
  let iz = null, izEl = null;
  function izKur(el) {
    izEl = el;
    el.innerHTML = `
      <div class="panel">
        <span class="etiket">Oyun 2</span><h2>Sayı Izgarası</h2>
        <div class="benzetme"><b>Benzetme:</b> Kalabalığın içinde kılık değiştirmiş casusları arıyorsun. Doğru casus <b>+10</b>, masumu suçlamak <b>−10</b>, gözden kaçan casus <b>−5</b>.</div>
        <div class="iki-sutun">
          <div class="secim-grup"><span>Aranan tür</span><div id="izKat"></div></div>
          <div class="secim-grup"><span>Aralık</span><div id="izAralik"></div></div>
        </div>
      </div>
      <div class="panel" style="margin-top:16px">
        <div class="satir" style="justify-content:space-between"><h3 id="izBaslik"></h3><span class="mono" id="izPuan"></span></div>
        <div class="izgara-oyun" id="izKarolar"></div>
        <div id="izAlt"></div>
      </div>`;
    const ayarIz = { kat: "yari", aralik: 200 };
    U.segment(U.$("#izKat", el), IZ_KAT.map((k) => [k, KATK[k].ad]), ayarIz.kat, (d) => { ayarIz.kat = d; izYeni(ayarIz.kat, ayarIz.aralik, 1, 0); });
    U.segment(U.$("#izAralik", el), [[200, "10–200"], [2000, "10–2.000"]], ayarIz.aralik, (d) => { ayarIz.aralik = +d; izYeni(ayarIz.kat, ayarIz.aralik, 1, 0); });
    U.$("#izKarolar", el).addEventListener("click", (e) => {
      const b = e.target.closest(".karo"); if (!b || iz.kontrol) return;
      const i = +b.dataset.i; if (iz.secili.has(i)) iz.secili.delete(i); else iz.secili.add(i);
      Ses.efekt("sec"); izCiz();
    });
    izYeni("yari", 200, 1, 0);
  }
  function izYeni(kat, aralik, tur, toplam) {
    const H = havuz(aralik), f = KATK[kat].f;
    const hedef = U.karistir(H.uye[kat]).slice(0, 5 + Math.floor(Math.random() * 3));
    const diger = new Set(), tuz = (H.tuzak[kat] || []).filter((x) => !hedef.includes(x));
    while (hedef.length + diger.size < 16) {
      if (tuz.length && Math.random() < .5) diger.add(U.sec(tuz));
      else { const m = H.lo + Math.floor(Math.random() * (H.hi - H.lo + 1)); if (!f(BigInt(m))) diger.add(m); }
    }
    iz = { kat, aralik, sayilar: U.karistir([...hedef, ...diger]), secili: new Set(), kontrol: false, tur, toplam, son: 0 };
    izCiz();
  }
  function izCiz() {
    const f = KATK[iz.kat].f;
    U.$("#izBaslik", izEl).textContent = `Tur ${iz.tur}: tüm ${KATK[iz.kat].ad} sayılarına dokun`;
    U.$("#izPuan", izEl).textContent = `Toplam puan: ${iz.toplam} · ${iz.secili.size} seçili`;
    U.$("#izKarolar", izEl).innerHTML = iz.sayilar.map((n, i) => {
      let c = "karo";
      if (iz.kontrol) { const var_ = f(BigInt(n)); c += iz.secili.has(i) ? (var_ ? " dogru" : " yanlis") : (var_ ? " kacan" : ""); }
      else if (iz.secili.has(i)) c += " secili";
      return `<button class="${c}" data-i="${i}">${S.tr(n)}</button>`;
    }).join("");
    const alt = U.$("#izAlt", izEl);
    if (!iz.kontrol) {
      alt.innerHTML = '<div class="satir" style="margin-top:14px"><button class="btn btn-ana btn-buyuk" id="izKontrol">Kontrol Et</button></div>';
      U.$("#izKontrol", alt).addEventListener("click", izKontrol);
    } else {
      const hatali = iz.sayilar.filter((n, i) => iz.secili.has(i) !== f(BigInt(n)));
      alt.innerHTML = `<div class="geri ${iz.son > 0 ? "dogru" : "yanlis"}" style="margin-top:14px"><span class="puan-rozet">${iz.son > 0 ? "+" : ""}${iz.son}</span><p>Turkuaz: doğru bulduğun · Kırmızı: yanlış seçtiğin · Kesik çizgili: kaçırdığın.</p></div>
        ${hatali.length ? `<div class="hata-liste" style="margin-top:10px">${hatali.map((n) => `<div class="hata-satir"><b class="mono">${S.tr(n)}</b>: ${S.kanit(n, iz.kat)}</div>`).join("")}</div>` : '<p style="color:var(--turkuaz);margin-top:10px">Hepsini doğru buldun.</p>'}
        ${iz.tur === 5 ? '<div id="izSiralama" style="margin-top:14px"></div>' : iz.tur < 5 && MC.bulut && MC.bulut.ayarli() ? `<p class="soluk" style="margin-top:10px">Sıralama: 5. turun sonunda toplam puanını tabloya gönderebilirsin (şu an ${iz.tur}/5).</p>` : ""}
        <div class="satir" style="margin-top:14px"><button class="btn btn-ana btn-buyuk" id="izSonraki">Sonraki Tur</button></div>`;
      if (iz.tur === 5 && MC.bulut) MC.bulut.gonderKutusu(U.$("#izSiralama", alt), { oyun: "sayi-izgarasi", varyant: String(iz.aralik), puan: iz.toplam, ayrinti: { kat: iz.kat } });
      U.$("#izSonraki", alt).addEventListener("click", () => izYeni(iz.kat, iz.aralik, iz.tur + 1, iz.toplam));
    }
  }
  function izKontrol() {
    const f = KATK[iz.kat].f; let son = 0;
    iz.sayilar.forEach((n, i) => { const v = f(BigInt(n)); if (iz.secili.has(i)) son += v ? 10 : -10; else if (v) son -= 5; });
    iz.kontrol = true; iz.son = son; iz.toplam += son;
    Ses.efekt(son > 0 ? "seri" : "yanlis"); izCiz();
    if (U.animasyon()) gsap.fromTo(U.$$(".karo", izEl), { scale: .85 }, { scale: 1, duration: .35, stagger: .02, ease: "back.out(2)", overwrite: true, clearProps: "transform" });
  }

  /* =====================================================================
     3) SAYI BİLMECESİ — ipuçları adayları daraltır; son ipucunda tek sayı kalır
     ===================================================================== */
  let bl = null, blEl = null;
  function ipuclari(n) {
    const b = BigInt(n), h = [];
    for (const c of KAT) if (c.k !== "tek" && c.k !== "cift" && c.f(b)) h.push([`Özelliğim: <b>${c.ad}</b>.`, (m) => c.f(BigInt(m)), 2]);
    if (!S.asalMi(b)) h.push(["Asal <b>değilim</b>.", (m) => !S.asalMi(BigInt(m)), 1]);
    h.push([n % 2 ? "Tek sayıyım." : "Çift sayıyım.", (m) => m % 2 === n % 2, 1]);
    for (const d of [3, 4, 5, 6, 7, 9, 11]) if (n % d === 0 && n !== d) h.push([`${d} ile tam bölünürüm.`, (m) => m % d === 0, 2]);
    const t = Number(S.tau(b)); h.push([`Tam olarak <b>${t}</b> pozitif bölenim var.`, (m) => Number(S.tau(BigInt(m))) === t, 3]);
    const r = S.rakamTop(n); h.push([`Rakamlarımın toplamı <b>${r}</b>.`, (m) => S.rakamTop(m) === r, 3]);
    h.push([`Birler basamağım <b>${n % 10}</b>.`, (m) => m % 10 === n % 10, 3]);
    const o = Math.floor(n / 10) * 10; h.push([`${o} ile ${o + 9} arasındayım.`, (m) => m >= o && m <= o + 9, 4]);
    return h;
  }
  function blYeni(toplam = 0, tur = 1) {
    const aday = []; for (let i = 10; i <= 200; i++) aday.push(i);
    for (let d = 0; d < 300; d++) {
      const n = U.sec(aday), h = U.karistir(ipuclari(n)).sort((a, b) => a[2] - b[2]);
      let kalan = aday.slice(); const secilen = [], kosul = [];
      for (const [m, f] of h) { const yeni = kalan.filter(f); if (yeni.length < kalan.length) { secilen.push(m); kosul.push(f); kalan = yeni; } if (kalan.length === 1) break; }
      if (kalan.length === 1 && secilen.length >= 3 && secilen.length <= 6) {
        const cel = U.karistir(aday.filter((m) => m !== n && kosul[0](m))).slice(0, 5);
        bl = { n, ipucu: secilen, acik: 1, secenek: U.karistir([...cel, n]), elenen: new Set(), bitti: false, toplam, tur, kazanc: 0 };
        return;
      }
    }
  }
  function blKur(el) {
    blEl = el;
    el.innerHTML = `<div class="panel"><span class="etiket">Oyun 3</span><h2>Sayı Bilmecesi</h2>
      <div class="benzetme"><b>Benzetme:</b> Bir dedektif gibi düşün. Her ipucu şüpheli listesini daraltır; son ipucunda tek bir sayı kalacak şekilde tasarlanmıştır. Ne kadar az ipucuyla bulursan o kadar çok puan: 60 → 50 → 40 …</div>
      <div id="blIcerik" class="yigin"></div></div>`;
    blYeni(); blCiz();
  }
  function blCiz() {
    const k = U.$("#blIcerik", blEl);
    k.innerHTML = `<div class="satir" style="justify-content:space-between"><h3>Bilmece ${bl.tur}</h3><span class="mono">Toplam puan: ${bl.toplam}</span></div>
      ${bl.ipucu.slice(0, bl.acik).map((m, i) => `<div class="ipucu-kart">İpucu ${i + 1}: ${m}</div>`).join("")}
      ${bl.bitti ? `<div class="geri dogru"><span class="puan-rozet">+${bl.kazanc}</span><p><b>Buldun! Gizli sayı ${bl.n}.</b> ${S.kanit(bl.n, "asal")}</p></div>
        ${bl.tur === 5 ? '<div id="blSiralama"></div>' : bl.tur < 5 && MC.bulut && MC.bulut.ayarli() ? `<p class="soluk">Sıralama: 5. bilmecenin sonunda toplam puanını tabloya gönderebilirsin (şu an ${bl.tur}/5).</p>` : ""}
        <div class="satir"><button class="btn btn-ana btn-buyuk" id="blYeni">Yeni Bilmece</button></div>` :
      `<p class="soluk">Gizli sayı hangisi?</p><div class="secenekler">${bl.secenek.map((m) => `<button class="secenek" data-m="${m}" ${bl.elenen.has(m) ? "disabled" : ""}>${m}</button>`).join("")}</div>
        ${bl.acik < bl.ipucu.length ? `<div class="satir"><button class="btn btn-ikinci" id="blIpucu">Yeni ipucu aç (${bl.acik}/${bl.ipucu.length})</button></div>` : ""}`}`;
    if (bl.bitti && bl.tur === 5 && MC.bulut) MC.bulut.gonderKutusu(U.$("#blSiralama", k), { oyun: "sayi-bilmecesi", varyant: "5-tur", puan: bl.toplam });
    const yb = U.$("#blYeni", k); if (yb) yb.addEventListener("click", () => { blYeni(bl.toplam, bl.tur + 1); blCiz(); });
    const ib = U.$("#blIpucu", k); if (ib) ib.addEventListener("click", () => { bl.acik++; Ses.efekt("dokun"); blCiz(); });
    U.$$(".secenek", k).forEach((b) => b.addEventListener("click", () => {
      const m = +b.dataset.m;
      if (m === bl.n) { bl.kazanc = Math.max(10, 60 - 10 * (bl.acik - 1) - 5 * bl.elenen.size); bl.toplam += bl.kazanc; bl.bitti = true; bl.acik = bl.ipucu.length; Ses.efekt("seri"); }
      else { bl.elenen.add(m); bl.acik = Math.min(bl.ipucu.length, bl.acik + 1); Ses.efekt("yanlis"); }
      blCiz();
    }));
    if (U.animasyon()) { const son = U.$$(".ipucu-kart", k).pop(); if (son) gsap.fromTo(son, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: .4, overwrite: true }); }
  }

  /* ---------- Modül ---------- */
  MC.modul("oyunlar", {
    baslik: "Oyun Arenası",
    kur(el) {
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Oyun Arenası</span><h2>Üç oyun, tek amaç: sayıları tanımak</h2></div>
        <div id="oyunSekme"></div><div class="sekme-icerik"><div id="o-av"></div><div id="o-iz" hidden></div><div id="o-bl" hidden></div></div>`;
      const kurulan = {};
      U.sekmeler(U.$("#oyunSekme", el), [{ id: "av", ad: "Sayı Avı" }, { id: "iz", ad: "Sayı Izgarası" }, { id: "bl", ad: "Sayı Bilmecesi" }], (id) => {
        ["av", "iz", "bl"].forEach((x) => (U.$("#o-" + x, el).hidden = x !== id));
        if (!kurulan[id]) { kurulan[id] = true; ({ av: avKur, iz: izKur, bl: blKur })[id](U.$("#o-" + id, el)); }
      });
    },
  });
  MC.oyunMotoru = { havuz, soruUret, puan };
})();
