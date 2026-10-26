/* =====================================================================
   3B CİSİMLER VE AÇINIMLAR — çokyüzlüler menteşeli yüzlerden kurulur;
   kaydırıcı her yüzü kendi menteşesi etrafında döndürerek cismi açar ve kapatır.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, Ses = MC.Ses;
  const R3 = Math.sqrt(3);
  const RENKLER = [0x2e5fd6, 0xff4d61, 0xffc657, 0x35e0b0, 0xa66bff, 0xff8a1f, 0x33c3f0];
  const kare = (a, b) => [[0, 0], [a, 0], [a, b], [0, b]];
  const ucgen = (s) => [[0, 0], [s, 0], [s / 2, s * R3 / 2]];
  const ikiz = (s, l) => [[0, 0], [s, 0], [s / 2, l]];
  const DIK = Math.PI / 2;

  function kup(a) {
    const yan = (i, cocuk) => ({ kenar: i, aci: DIK, dugum: { poli: kare(a, a), cocuk: cocuk || [] } });
    return { kok: { poli: kare(a, a), cocuk: [yan(0), yan(1), yan(2, [{ kenar: 2, aci: DIK, dugum: { poli: kare(a, a) } }]), yan(3)] }, yukseklik: a };
  }
  function prizma(a, b, c) {
    const yan = (i, L, cocuk) => ({ kenar: i, aci: DIK, dugum: { poli: kare(L, c), cocuk: cocuk || [] } });
    return { kok: { poli: kare(a, b), cocuk: [yan(0, a), yan(1, b), yan(2, a, [{ kenar: 2, aci: DIK, dugum: { poli: kare(a, b) } }]), yan(3, b)] }, yukseklik: c };
  }
  function ucgenPrizma(s, h) {
    const yan = (i, cocuk) => ({ kenar: i, aci: DIK, dugum: { poli: kare(s, h), cocuk: cocuk || [] } });
    return { kok: { poli: ucgen(s), cocuk: [yan(0, [{ kenar: 2, aci: DIK, dugum: { poli: ucgen(s) } }]), yan(1), yan(2)] }, yukseklik: h };
  }
  function piramit(s, h) {
    const l = Math.hypot(h, s / 2), aci = Math.PI - Math.atan2(h, s / 2);
    return { kok: { poli: kare(s, s), cocuk: [0, 1, 2, 3].map((i) => ({ kenar: i, aci, dugum: { poli: ikiz(s, l) } })) }, yukseklik: h };
  }
  function dortyuzlu(s) {
    const aci = Math.PI - Math.acos(1 / 3);
    return { kok: { poli: ucgen(s), cocuk: [0, 1, 2].map((i) => ({ kenar: i, aci, dugum: { poli: ucgen(s) } })) }, yukseklik: s * Math.sqrt(2 / 3) };
  }
  const CISIMLER = [
    { id: "kup", ad: "Küp", yap: () => kup(2.4), V: 8, E: 12, F: 6, alan: "A = 6a^2", hacim: "V = a^3", not: "Küpün 11 farklı açınımı vardır. Bu, en bilineni olan haç biçimli açınımdır." },
    { id: "prizma", ad: "Dikdörtgenler prizması", yap: () => prizma(3.2, 2.2, 1.6), V: 8, E: 12, F: 6, alan: "A = 2(ab + bc + ac)", hacim: "V = a\\cdot b\\cdot c", not: "Karşılıklı yüzler eştir: açınımda üç çift eş dikdörtgen görürsün." },
    { id: "ucprizma", ad: "Üçgen prizma", yap: () => ucgenPrizma(2.6, 2.4), V: 6, E: 9, F: 5, alan: "A = 2\\cdot\\frac{\\sqrt3}{4}a^2 + 3ah", hacim: "V = \\frac{\\sqrt3}{4}a^2\\cdot h", not: "İki eşkenar üçgen taban ve üç dikdörtgen yan yüzden oluşur." },
    { id: "piramit", ad: "Kare piramit", yap: () => piramit(2.6, 2.2), V: 5, E: 8, F: 5, alan: "A = a^2 + 2a\\ell", hacim: "V = \\frac{a^2 h}{3}", not: "ℓ eğik yüksekliktir: ℓ² = h² + (a/2)². Piramidin hacmi, aynı taban ve yükseklikteki prizmanın tam üçte biridir." },
    { id: "dortyuzlu", ad: "Düzgün dörtyüzlü", yap: () => dortyuzlu(3), V: 4, E: 6, F: 4, alan: "A = \\sqrt3\\,a^2", hacim: "V = \\frac{a^3}{6\\sqrt2}", not: "Dört eşkenar üçgenden oluşan en basit Platon cismidir. Açınımı büyük bir eşkenar üçgendir." },
  ];

  let el, sahne = null, cisim = CISIMLER[0], menteseler = [], t = 0, tw = null;
  function yuz(poli, renk) {
    const sh = new THREE.Shape(); poli.forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y)));
    const geo = new THREE.ShapeGeometry(sh);
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: renk, side: THREE.DoubleSide, transparent: true, opacity: .88, roughness: .5, emissive: renk, emissiveIntensity: .12, polygonOffset: true, polygonOffsetFactor: 1 })));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xeef3ff })));
    return g;
  }
  let renkSira = 0;
  function dugumKur(dugum, ebeveyn) {
    ebeveyn.add(yuz(dugum.poli, RENKLER[renkSira++ % RENKLER.length]));
    for (const c of dugum.cocuk || []) {
      const p = dugum.poli, v0 = p[c.kenar], v1 = p[(c.kenar + 1) % p.length];
      const mentese = new THREE.Group(); mentese.position.set(v1[0], v1[1], 0); mentese.rotation.z = Math.atan2(v0[1] - v1[1], v0[0] - v1[0]);
      const pivot = new THREE.Group(); mentese.add(pivot); ebeveyn.add(mentese);
      menteseler.push({ pivot, aci: c.aci });
      dugumKur(c.dugum, pivot);
    }
  }
  function kurCisim() {
    const g = sahne.grup; while (g.children.length) g.remove(g.children[0]);
    menteseler = []; renkSira = 0;
    const y = cisim.yap(), kok = new THREE.Group();
    const cx = y.kok.poli.reduce((a, p) => a + p[0], 0) / y.kok.poli.length, cy = y.kok.poli.reduce((a, p) => a + p[1], 0) / y.kok.poli.length;
    kok.position.set(-cx, -cy, -y.yukseklik / 2);
    dugumKur(y.kok, kok); g.add(kok);
    uygula();
  }
  function uygula() { for (const m of menteseler) m.pivot.rotation.x = m.aci * (1 - t); const k = U.$("#csT", el); if (k) k.value = Math.round(t * 100); }
  function bilgi() {
    U.html(U.$("#csBilgi", el), `<span class="etiket" style="color:var(--turkuaz)">${cisim.ad}</span>
      <div class="euler"><div><small>Köşe (K)</small><b>${cisim.V}</b></div><div><small>Ayrıt (A)</small><b>${cisim.E}</b></div><div><small>Yüz (Y)</small><b>${cisim.F}</b></div></div>
      <div class="bilgi-kutu">Euler formülü: $K - A + Y = ${cisim.V} - ${cisim.E} + ${cisim.F} = ${cisim.V - cisim.E + cisim.F}$. Her dışbükey çokyüzlüde bu toplam 2'dir.</div>
      <p>Yüzey alanı: $${cisim.alan}$</p><p>Hacim: $${cisim.hacim}$</p><p class="soluk">${cisim.not}</p>`);
  }
  function animasyon(hedef) {
    if (tw) tw.kill();
    Ses.efekt("basla");
    if (window.gsap && !MC.uc.AZ_HAREKET) { const o = { v: t }; tw = gsap.to(o, { v: hedef, duration: 2.2, ease: "power2.inOut", onUpdate: () => { t = o.v; uygula(); } }); }
    else { t = hedef; uygula(); }
  }
  function kur(e) {
    el = e;
    el.innerHTML = `<div class="bolum-basi"><span class="etiket" style="color:var(--turkuaz)">3B Cisimler ve Açınımlar</span><h2>Katla, aç, say</h2>
        <p>Bir cismin yüzleri menteşeli kâğıt parçaları gibi açılıp düz bir açınıma dönüşür. Kaydırıcıyı oynat, cismi parmağınla döndür, köşe-ayrıt-yüz sayılarını Euler formülüyle karşılaştır.</p></div>
      <div class="cisim-duzen">
        <div class="yigin">
          <div class="sahne-kutu" id="csSahne" style="height:min(66vh,600px)"><span class="ipucu-surukle">Sürükle · döndür · yakınlaştır</span></div>
          <div class="panel"><label class="alan"><span>Açınım: kapalı ↔ açık</span><input type="range" id="csT" min="0" max="100" value="0"></label>
            <div class="satir"><button class="btn btn-ana" id="csAc">Aç</button><button class="btn btn-ikinci" id="csKapat">Kapat</button></div></div>
        </div>
        <div class="yigin">
          <div class="panel"><span class="etiket soluk">Cisim</span><div class="cisim-sec" id="csSec">${CISIMLER.map((c) => `<button data-c="${c.id}" aria-pressed="${c === cisim}">${c.ad}</button>`).join("")}</div></div>
          <div class="panel" id="csBilgi"></div>
          <div class="benzetme"><b>Benzetme:</b> Açınım, bir hediye kutusunun yapıştırılmadan önceki kartonudur. Hangi kenarların birleşeceğini görmek, uzamsal düşünmenin temelidir.</div>
        </div>
      </div>`;
    sahne = MC.uc.sahneKur(U.$("#csSahne", el), { kamera: [7, -9, 7], otoDonus: .0025, egimSiniri: 1.2 });
    if (sahne) {
      sahne.scene.add(new THREE.AmbientLight(0xffffff, .65));
      const isik = new THREE.DirectionalLight(0xffffff, .8); isik.position.set(5, -6, 10); sahne.scene.add(isik);
      kurCisim();
    }
    bilgi();
    U.$("#csT", el).addEventListener("input", (ev) => { if (tw) tw.kill(); t = ev.target.value / 100; uygula(); });
    U.$("#csAc", el).addEventListener("click", () => animasyon(1));
    U.$("#csKapat", el).addEventListener("click", () => animasyon(0));
    U.$("#csSec", el).addEventListener("click", (ev) => {
      const b = ev.target.closest("button"); if (!b) return;
      cisim = CISIMLER.find((c) => c.id === b.dataset.c); U.$$("#csSec button", el).forEach((x) => x.setAttribute("aria-pressed", x === b));
      Ses.efekt("sec"); t = 0; if (sahne) kurCisim(); bilgi();
    });
  }
  MC.modul("cisimler", { baslik: "3B Cisimler ve Açınımlar", kur });
  /* Test için: cismin t anındaki tüm yüz köşelerinin dünya koordinatları */
  function koseler(id, tt) {
    const eski = menteseler; menteseler = [];
    const y = CISIMLER.find((c) => c.id === id).yap(), kok = new THREE.Group();
    dugumKur(y.kok, kok);
    for (const m of menteseler) m.pivot.rotation.x = m.aci * (1 - tt);
    kok.updateMatrixWorld(true);
    const nok = [];
    kok.traverse((o) => { if (o.isMesh) { const p = o.geometry.attributes.position; for (let i = 0; i < p.count; i++) nok.push(new THREE.Vector3().fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld)); } });
    menteseler = eski; return nok;
  }
  MC.geoCisim = { CISIMLER, koseler };
})();
