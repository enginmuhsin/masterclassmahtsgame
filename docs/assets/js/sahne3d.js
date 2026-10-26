/* =====================================================================
   3B SAHNELER — Three.js ile: sayı galaksisi (bölen dağları), bölen kafesi, (a+b)³ küpü.
   Her sahne parmakla/fareyle döndürülür, tekerlekle yakınlaştırılır.
   ===================================================================== */
"use strict";
(function () {
  const S = MC.sayi;
  const AZ_HAREKET = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sahneler = [];
  let doku = null;

  function noktaDokusu() {
    if (doku) return doku;
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.35, "rgba(255,255,255,.85)"); r.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, 64, 64);
    doku = new THREE.CanvasTexture(c); return doku;
  }

  function sahneKur(kutu, { kamera = [0, -24, 20], otoDonus = .0016, egimSiniri = .6 } = {}) {
    if (!window.THREE) { kutu.insertAdjacentHTML("beforeend", '<div class="uyari-gl">3B kütüphanesi yüklenemedi.</div>'); return null; }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false }); }
    catch (e) { kutu.insertAdjacentHTML("beforeend", '<div class="uyari-gl">Bu cihaz 3B grafiği desteklemiyor.</div>'); return null; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    kutu.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, .1, 500);
    camera.up.set(0, 0, 1); camera.position.set(...kamera); camera.lookAt(0, 0, 0);
    const grup = new THREE.Group(); scene.add(grup);
    const s = { kutu, renderer, scene, camera, grup, otoDonus, surukle: null, egim: 0, uzaklik: Math.hypot(...kamera), her: null };
    const boyutla = () => { const w = kutu.clientWidth, h = kutu.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    new ResizeObserver(boyutla).observe(kutu); boyutla();
    kutu.addEventListener("pointerdown", (e) => { s.surukle = { x: e.clientX, y: e.clientY }; try { kutu.setPointerCapture(e.pointerId); } catch (_) {} });
    kutu.addEventListener("pointermove", (e) => {
      if (!s.surukle) return;
      grup.rotation.z += (e.clientX - s.surukle.x) * .006;
      s.egim = Math.max(-egimSiniri, Math.min(egimSiniri, s.egim + (e.clientY - s.surukle.y) * .004));
      grup.rotation.x = s.egim; s.surukle = { x: e.clientX, y: e.clientY };
    });
    const birak = () => { s.surukle = null; };
    kutu.addEventListener("pointerup", birak); kutu.addEventListener("pointercancel", birak);
    kutu.addEventListener("wheel", (e) => {
      e.preventDefault();
      s.uzaklik = Math.max(6, Math.min(120, s.uzaklik * (1 + Math.sign(e.deltaY) * .08)));
      camera.position.copy(camera.position.clone().normalize().multiplyScalar(s.uzaklik));
    }, { passive: false });
    sahneler.push(s);
    return s;
  }
  function temizle(grup) {
    while (grup.children.length) {
      const c = grup.children.pop();
      if (c.geometry) c.geometry.dispose();
      if (c.material) (Array.isArray(c.material) ? c.material : [c.material]).forEach((m) => m.dispose());
    }
  }
  function dongu() {
    for (const s of sahneler) {
      if (!s.kutu.offsetParent) continue;
      if (!s.surukle && !AZ_HAREKET) s.grup.rotation.z += s.otoDonus;
      if (s.her) s.her();
      s.renderer.render(s.scene, s.camera);
    }
    requestAnimationFrame(dongu);
  }
  requestAnimationFrame(dongu);

  /* ---------- Sayı galaksisi: Ulam spirali + yükseklik ölçütü ---------- */
  function galaksi(kutu, { N = 900, olcut = "tau", etiket = null } = {}) {
    const s = sahneKur(kutu, { kamera: [0, -30, 24] });
    if (!s) return null;
    s.grup.position.z = -4;
    const yildiz = [];
    for (let i = 0; i < 700; i++) { const r = 70 + Math.random() * 80, a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1); yildiz.push(r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)); }
    const yg = new THREE.BufferGeometry(); yg.setAttribute("position", new THREE.Float32BufferAttribute(yildiz, 3));
    s.scene.add(new THREE.Points(yg, new THREE.PointsMaterial({ size: .5, map: noktaDokusu(), transparent: true, color: 0x9db0d6, depthWrite: false, opacity: .6 })));
    let veriler = [];
    function kur(N2, olcut2) {
      temizle(s.grup);
      const koor = S.ulam(N2), tauD = S.tauDizisi(N2), olcek = Math.max(.32, .62 * Math.sqrt(900 / N2));
      const yukseklik = (n) => olcut2 === "omega" ? S.carpanlar(BigInt(n)).length * 1.6 : olcut2 === "bolluk" ? Number(S.sigma(BigInt(n))) / n * 2.6 : (tauD[n] - 1) * .55;
      const gruplar = { asal: [], yari: [], diger: [] }, digerRenk = [];
      const renk = new THREE.Color(), dusuk = new THREE.Color("#2e5fd6"), yuksek = new THREE.Color("#35e0b0");
      veriler = [];
      let zMax = 0;
      for (let n = 1; n <= N2; n++) {
        const [x, y] = koor[n - 1], z = yukseklik(n);
        zMax = Math.max(zMax, z);
        const tur = tauD[n] === 2 ? "asal" : (S.carpanlar(BigInt(n)).length === 2 ? "yari" : "diger");
        gruplar[tur].push(x * olcek, y * olcek, z);
        veriler.push({ n, x: x * olcek, y: y * olcek, z, tur, t: tauD[n] });
      }
      for (const v of veriler) if (v.tur === "diger") { renk.copy(dusuk).lerp(yuksek, Math.min(1, v.z / Math.max(zMax, 1))); digerRenk.push(renk.r, renk.g, renk.b); }
      const boyut = Math.max(.32, .6 * Math.sqrt(900 / N2) + .1);
      const yap = (dizi, rengi, b, renkler) => {
        const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(dizi, 3));
        if (renkler) g.setAttribute("color", new THREE.Float32BufferAttribute(renkler, 3));
        s.grup.add(new THREE.Points(g, new THREE.PointsMaterial({ size: b, map: noktaDokusu(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: !!renkler, color: renkler ? 0xffffff : rengi })));
      };
      yap(gruplar.diger, 0, boyut, digerRenk);
      yap(gruplar.yari, 0xffc657, boyut * 1.1);
      yap(gruplar.asal, 0xff4d61, boyut * 1.2);
      const esik = zMax * .32, kule = [];
      for (const v of veriler) if (v.z >= esik && v.tur === "diger") kule.push(v.x, v.y, 0, v.x, v.y, v.z);
      const kg = new THREE.BufferGeometry(); kg.setAttribute("position", new THREE.Float32BufferAttribute(kule, 3));
      s.grup.add(new THREE.LineSegments(kg, new THREE.LineBasicMaterial({ color: 0x35e0b0, transparent: true, opacity: .22 })));
      if (window.gsap && !AZ_HAREKET) gsap.fromTo(s.grup.scale, { x: .2, y: .2, z: .01 }, { x: 1, y: 1, z: 1, duration: 1.8, ease: "expo.out" });
    }
    kur(N, olcut);
    if (etiket) {
      const v3 = new THREE.Vector3();
      kutu.addEventListener("pointermove", (e) => {
        if (s.surukle) { etiket.hidden = true; return; }
        const r = kutu.getBoundingClientRect(), fx = ((e.clientX - r.left) / r.width) * 2 - 1, fy = -((e.clientY - r.top) / r.height) * 2 + 1;
        s.grup.updateMatrixWorld();
        let en = null, enD = Infinity;
        for (const v of veriler) { v3.set(v.x, v.y, v.z).applyMatrix4(s.grup.matrixWorld).project(s.camera); const d = (v3.x - fx) ** 2 + (v3.y - fy) ** 2; if (d < enD) { enD = d; en = v; } }
        if (en && enD < .0012) {
          const tur = en.tur === "asal" ? "asal" : en.tur === "yari" ? "yarı asal · " + S.carpimYazi(BigInt(en.n)) : S.carpimYazi(BigInt(en.n)) || "birim";
          etiket.innerHTML = `<b>${S.tr(en.n)}</b> · ${en.t} bölen · ${tur}`;
          etiket.style.left = (e.clientX - r.left) + "px"; etiket.style.top = (e.clientY - r.top) + "px"; etiket.hidden = false;
        } else etiket.hidden = true;
      });
      kutu.addEventListener("pointerleave", () => { etiket.hidden = true; });
    }
    return { sahne: s, kur };
  }

  /* ---------- Bölen kafesi: n = p^a q^b r^c ise her bölen (i, j, k) noktasıdır ---------- */
  function kafes(kutu) {
    const s = sahneKur(kutu, { kamera: [9, -11, 8], otoDonus: .004, egimSiniri: 1 });
    if (!s) return null;
    s.scene.add(new THREE.AmbientLight(0xffffff, .55));
    const isik = new THREE.DirectionalLight(0xffffff, .9); isik.position.set(5, -8, 10); s.scene.add(isik);
    function ciz(n) {
      n = BigInt(n);
      temizle(s.grup);
      const u = [...S.ussler(n)].sort((a, b) => b[1] - a[1]).slice(0, 3).sort((a, b) => (a[0] < b[0] ? -1 : 1));
      while (u.length < 3) u.push([1n, 0]);
      const [[p, a], [q, b], [r, c]] = u, adet = (a + 1) * (b + 1) * (c + 1);
      const ox = a / 2, oy = b / 2, oz = c / 2, adim = Math.max(1, 6 / Math.max(a, b, c, 1)) * .55;
      const dusuk = new THREE.Color("#2e5fd6"), yuksek = new THREE.Color("#ff4d61"), renk = new THREE.Color();
      const enBuyuk = Math.log(Number(n)) || 1;
      const kure = new THREE.SphereGeometry(Math.min(.24, adim * .28), 18, 12);
      const kenar = [];
      const P = (i, j, k) => [(i - ox) * adim, (j - oy) * adim, (k - oz) * adim];
      for (let i = 0; i <= a; i++) for (let j = 0; j <= b; j++) for (let k = 0; k <= c; k++) {
        const d = Number(p) ** i * Number(q) ** j * Number(r) ** k;
        if (adet <= 600) {
          renk.copy(dusuk).lerp(yuksek, Math.log(d) / enBuyuk);
          const m = new THREE.Mesh(kure, new THREE.MeshStandardMaterial({ color: renk.clone(), emissive: renk.clone(), emissiveIntensity: .35, roughness: .35 }));
          m.position.set(...P(i, j, k)); s.grup.add(m);
        }
        if (i < a) kenar.push(...P(i, j, k), ...P(i + 1, j, k));
        if (j < b) kenar.push(...P(i, j, k), ...P(i, j + 1, k));
        if (k < c) kenar.push(...P(i, j, k), ...P(i, j, k + 1));
      }
      const kg = new THREE.BufferGeometry(); kg.setAttribute("position", new THREE.Float32BufferAttribute(kenar, 3));
      s.grup.add(new THREE.LineSegments(kg, new THREE.LineBasicMaterial({ color: 0x9db0d6, transparent: true, opacity: .45 })));
      if (window.gsap && !AZ_HAREKET) gsap.fromTo(s.grup.scale, { x: .01, y: .01, z: .01 }, { x: 1, y: 1, z: 1, duration: 1, ease: "expo.out" });
      return { eksenler: [[p, a], [q, b], [r, c]].filter(([pp]) => pp > 1n), adet, farkli: S.ussler(n).size };
    }
    return { sahne: s, ciz };
  }

  /* ---------- (a+b)³ küpü: sekiz parça, ayrıştırılabilir ---------- */
  function kupAcilimi(kutu) {
    const s = sahneKur(kutu, { kamera: [11, -12, 9], otoDonus: .003, egimSiniri: 1 });
    if (!s) return null;
    s.scene.add(new THREE.AmbientLight(0xffffff, .6));
    const isik = new THREE.DirectionalLight(0xffffff, .85); isik.position.set(6, -9, 12); s.scene.add(isik);
    const RENK = { "a³": 0x2e5fd6, "a²b": 0xff4d61, "ab²": 0xffc657, "b³": 0x35e0b0 };
    function ciz(a, b, ayir) {
      temizle(s.grup);
      const parcalar = [
        [[0, 0, 0], [a, a, a], "a³"],
        [[a, 0, 0], [b, a, a], "a²b"], [[0, a, 0], [a, b, a], "a²b"], [[0, 0, a], [a, a, b], "a²b"],
        [[a, a, 0], [b, b, a], "ab²"], [[a, 0, a], [b, a, b], "ab²"], [[0, a, a], [a, b, b], "ab²"],
        [[a, a, a], [b, b, b], "b³"],
      ];
      const merkez = (a + b + ayir) / 2;
      for (const [[x0, y0, z0], [dx, dy, dz], ad] of parcalar) {
        const ox = x0 + (x0 > 0 ? ayir : 0), oy = y0 + (y0 > 0 ? ayir : 0), oz = z0 + (z0 > 0 ? ayir : 0);
        const geo = new THREE.BoxGeometry(dx, dy, dz);
        const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: RENK[ad], roughness: .45, metalness: .05, emissive: RENK[ad], emissiveIntensity: .12 }));
        m.position.set(ox + dx / 2 - merkez, oy + dy / 2 - merkez, oz + dz / 2 - merkez);
        s.grup.add(m);
        const kenar = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x081227 }));
        kenar.position.copy(m.position); s.grup.add(kenar);
      }
    }
    return { sahne: s, ciz };
  }

  MC.uc = { sahneKur, galaksi, kafes, kupAcilimi, AZ_HAREKET };
})();
