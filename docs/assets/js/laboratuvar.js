/* =====================================================================
   GÖRSEL LABORATUVAR — 7 deney: bölen dağları (3B), Ulam spirali, Eratosthenes kalburu,
   (a+b)³ küpü (3B), Fibonacci spirali, Collatz yolculuğu, asal sayma (π(x)).
   ===================================================================== */
"use strict";
(function () {
  const S = MC.sayi, U = MC.ui, Ses = MC.Ses;
  const DENEYLER = [
    { id: "daglar", ad: "Bölen Dağları (3B)" }, { id: "ulam", ad: "Ulam Spirali" }, { id: "elek", ad: "Eratosthenes Kalburu" },
    { id: "kup", ad: "(a+b)³ Küpü (3B)" }, { id: "fib", ad: "Fibonacci Spirali" }, { id: "collatz", ad: "Collatz" }, { id: "pi", ad: "Asal Sayma" },
  ];
  const kurulan = {};

  /* ---------- 1) Bölen dağları ---------- */
  function daglar(k) {
    k.innerHTML = `<div class="lab-duzen">
      <div class="sahne-kutu" id="lGal" style="height:min(72vh,640px)"><span class="ipucu-surukle">Sürükle · döndür · yakınlaştır</span>
        <div class="lejant"><span><i style="background:var(--kirmizi)"></i>Asal</span><span><i style="background:var(--altin)"></i>Yarı asal</span><span><i style="background:var(--turkuaz)"></i>Bileşik</span></div><div class="etiket-yuzen" id="lGalEt" hidden></div></div>
      <div class="panel"><span class="etiket">Ayarlar</span>
        <label class="alan"><span>Sayı adedi: <b id="lN">900</b></span><input type="range" id="lNR" min="100" max="2500" step="100" value="900"></label>
        <div class="secim-grup"><span>Yükseklik</span><div id="lOl"></div></div>
        <div class="benzetme"><b>Benzetme:</b> Sayılar spiral bir şehre yerleşmiş. Binanın yüksekliği o sayının bölen sayısı. Asallar en alçak evlerdir (yalnızca 2 bölen); 360, 720, 840 gibi sayılar gökdelenleri oluşturur.</div>
        <p><b>Keşif soruları:</b> En yüksek gökdelen hangi sayı? Neden tam kareler tek sayıda bölene sahip? (İpucu: bölen çiftlerinden biri kendisiyle eşleşir.)</p></div></div>`;
    const g = MC.uc.galaksi(U.$("#lGal", k), { N: 900, etiket: U.$("#lGalEt", k) });
    if (!g) return;
    let N = 900, ol = "tau", zam = null;
    U.$("#lNR", k).addEventListener("input", (e) => { N = +e.target.value; U.$("#lN", k).textContent = S.tr(N); clearTimeout(zam); zam = setTimeout(() => g.kur(N, ol), 200); });
    U.segment(U.$("#lOl", k), [["tau", "Bölen sayısı τ(n)"], ["omega", "Asal çarpan sayısı Ω(n)"], ["bolluk", "Bolluk oranı σ(n)/n"]], ol, (d) => { ol = d; g.kur(N, ol); });
  }

  /* ---------- 2) Ulam spirali ---------- */
  function ulam(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="panel" style="padding:10px"><div style="position:relative"><canvas id="lUlam" style="width:100%;aspect-ratio:1;display:block;border-radius:16px;background:#050c1c"></canvas><div class="etiket-yuzen" id="lUlamEt" hidden></div></div></div>
      <div class="panel"><span class="etiket">Ayarlar</span>
        <label class="alan"><span>Sayı adedi: <b id="lUN">10.000</b></span><input type="range" id="lUNR" min="400" max="40000" step="400" value="10000"></label>
        <label class="alan"><span>Vurgulanacak tür</span><select class="girdi" id="lUK">${S.KAT.filter((c) => !["tek", "cift"].includes(c.k)).map((c) => `<option value="${c.k}">${c.ad}</option>`).join("")}</select></label>
        <p id="lUSay" class="mono"></p>
        <div class="bilgi-kutu">1963'te Stanisław Ulam sıkıcı bir toplantıda sayıları spiral biçiminde karalarken asalların <b>çapraz çizgiler</b> üzerinde yoğunlaştığını fark etti. Bu çizgiler n² + n + 41 gibi çok sayıda asal üreten polinomlara karşılık gelir.</div>
        <p class="soluk">Tam kareleri seç: hepsi iki çapraz üzerinde dizilir. Yarı asallar ise asallardan çok daha kalabalıktır.</p></div></div>`;
    const cv = U.$("#lUlam", k), et = U.$("#lUlamEt", k);
    let N = 10000, kat = "asal", koor = [], olcek = 1, merkez = 0;
    function ciz() {
      const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.clientWidth;
      if (!W) return;
      cv.width = W * dpr; cv.height = W * dpr; const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      koor = S.ulam(N); const yari = Math.ceil(Math.sqrt(N) / 2) + 1; olcek = W / (2 * yari + 1); merkez = W / 2;
      g.fillStyle = "#050c1c"; g.fillRect(0, 0, W, W);
      const f = S.KATK[kat].f; let say = 0; const boy = Math.max(1, olcek * .86);
      for (let n = 1; n <= N; n++) {
        const [x, y] = koor[n - 1], px = merkez + x * olcek - boy / 2, py = merkez - y * olcek - boy / 2;
        if (f(BigInt(n))) { say++; const t = n / N; g.fillStyle = `hsl(${350 - t * 170}, 95%, ${62 - t * 8}%)`; g.fillRect(px, py, boy, boy); }
        else if (olcek > 3) { g.fillStyle = "rgba(157,176,214,.10)"; g.fillRect(px, py, boy, boy); }
      }
      U.$("#lUSay", k).textContent = `${S.KATK[kat].ad}: ${S.tr(say)} tane (n ≤ ${S.tr(N)}, %${S.ondalik(100 * say / N, 1)})`;
    }
    cv.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect(), x = Math.round((e.clientX - r.left - merkez) / olcek), y = Math.round((merkez - (e.clientY - r.top)) / olcek);
      const i = koor.findIndex(([a, b]) => a === x && b === y);
      if (i < 0) { et.hidden = true; return; }
      const n = i + 1; et.innerHTML = `<b>${S.tr(n)}</b> · ${S.kanit(n, "asal")}`; et.style.left = (e.clientX - r.left) + "px"; et.style.top = (e.clientY - r.top) + "px"; et.hidden = false;
    });
    cv.addEventListener("pointerleave", () => (et.hidden = true));
    let zam = null;
    U.$("#lUNR", k).addEventListener("input", (e) => { N = +e.target.value; U.$("#lUN", k).textContent = S.tr(N); clearTimeout(zam); zam = setTimeout(ciz, 120); });
    U.$("#lUK", k).addEventListener("change", (e) => { kat = e.target.value; Ses.efekt("sec"); ciz(); });
    new ResizeObserver(() => ciz()).observe(cv);
  }

  /* ---------- 3) Eratosthenes kalburu ---------- */
  const ELEK_RENK = { 2: "#33c3f0", 3: "#a66bff", 5: "#ff8a1f", 7: "#20c997", 11: "#ff7ac6", 13: "#6f5bff" };
  function elek(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="panel"><div class="elek" id="lElek"></div></div>
      <div class="panel"><span class="etiket">Kalbur</span>
        <div class="secim-grup"><span>Tablo</span><div id="lEN"></div></div>
        <div class="satir"><button class="btn btn-ana" id="lEAdim">Sonraki asalın katlarını ele</button><button class="btn btn-ikinci" id="lEOto">Otomatik oynat</button><button class="btn btn-hayalet" id="lESif">Sıfırla</button></div>
        <div id="lEAc" class="bilgi-kutu"></div><div id="lELej" class="satir" style="font-size:14px"></div>
        <div class="benzetme"><b>Benzetme:</b> Kalbur, unu taneden ayırır. Burada her asal, kendi katlarını tutan bir delik boyutudur; hiçbir delikte takılmadan geçenler asallardır.</div></div></div>`;
    let N = 100, adim = 0, oto = null, eleyiciler = [];
    const grid = U.$("#lElek", k);
    function sifirla() {
      clearInterval(oto); oto = null; U.$("#lEOto", k).textContent = "Otomatik oynat";
      eleyiciler = S.elek(Math.floor(Math.sqrt(N))); adim = 0;
      grid.innerHTML = Array.from({ length: N }, (_, i) => `<span data-n="${i + 1}" class="${i === 0 ? "bir" : ""}">${i + 1}</span>`).join("");
      U.$("#lEAc", k).innerHTML = `1 asal değildir. <b>Sonraki asalın katlarını ele</b> düğmesine dokun: önce 2'nin katları elenecek.`;
      U.$("#lELej", k).innerHTML = ""; U.$("#lEAdim", k).disabled = false;
    }
    function ilerle() {
      if (adim >= eleyiciler.length) {
        U.$$("span", grid).forEach((s) => { const n = +s.dataset.n; if (n > 1 && !s.classList.contains("elendi")) { s.classList.remove("eleyici"); s.classList.add("asal-son"); } });
        U.$("#lEAc", k).innerHTML = `<b>Bitti!</b> √${N} ≈ ${S.ondalik(Math.sqrt(N), 1)} olduğundan ${eleyiciler[eleyiciler.length - 1]}'den büyük asalları denemeye gerek yok. Kırmızı kalan <b>${S.elek(N).length}</b> sayı 1–${N} arasındaki asallardır.`;
        U.$("#lEAdim", k).disabled = true; clearInterval(oto); oto = null; U.$("#lEOto", k).textContent = "Otomatik oynat";
        Ses.efekt("bitis");
        if (U.animasyon()) gsap.fromTo(U.$$(".asal-son", grid), { scale: .5 }, { scale: 1, duration: .4, stagger: .01, ease: "back.out(3)", overwrite: true, clearProps: "transform" });
        return;
      }
      const p = eleyiciler[adim++], renk = ELEK_RENK[p] || "#9db0d6", hucre = U.$(`span[data-n="${p}"]`, grid);
      hucre.classList.add("eleyici");
      const katlar = []; for (let m = p * p; m <= N; m += p) { const s = U.$(`span[data-n="${m}"]`, grid); if (!s.classList.contains("elendi")) katlar.push(s); }
      katlar.forEach((s, i) => setTimeout(() => { s.classList.add("elendi"); s.style.background = renk; if (i % 4 === 0) Ses.efekt("tik"); }, MC.uc.AZ_HAREKET ? 0 : i * 22));
      U.$("#lEAc", k).innerHTML = `<b>${p}</b>'nin katları <b>${p}² = ${p * p}</b>'den başlayarak elendi (${katlar.length} yeni sayı). Neden ${p}²? Daha küçük katları (${p}·2, ${p}·3 …) daha küçük bir asal tarafından zaten elenmişti.`;
      U.$("#lELej", k).insertAdjacentHTML("beforeend", `<span class="rozet" style="background:${renk};color:#081227">${p}'nin katları</span>`);
    }
    U.segment(U.$("#lEN", k), [[100, "1–100"], [200, "1–200"]], N, (d) => { N = +d; sifirla(); });
    U.$("#lEAdim", k).addEventListener("click", ilerle);
    U.$("#lESif", k).addEventListener("click", sifirla);
    U.$("#lEOto", k).addEventListener("click", (e) => {
      if (oto) { clearInterval(oto); oto = null; e.target.textContent = "Otomatik oynat"; return; }
      e.target.textContent = "Durdur"; ilerle(); oto = setInterval(ilerle, 2200);
    });
    sifirla();
  }

  /* ---------- 4) (a+b)³ küpü ---------- */
  function kup(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="yigin"><div class="sahne-kutu" id="lKup" style="height:min(64vh,560px)"><span class="ipucu-surukle">Sürükle · döndür</span>
        <div class="lejant"><span><i style="background:#2e5fd6"></i>a³</span><span><i style="background:#ff4d61"></i>a²b (3 tane)</span><span><i style="background:#ffc657"></i>ab² (3 tane)</span><span><i style="background:#35e0b0"></i>b³</span></div></div>
        <div class="panel-ic" id="lKupTex" style="overflow-x:auto"></div></div>
      <div class="panel"><span class="etiket">Ayarlar</span>
        <label class="alan"><span>a = <b id="lKa">3</b></span><input type="range" id="lKaR" min="1" max="5" step=".5" value="3"></label>
        <label class="alan"><span>b = <b id="lKb">2</b></span><input type="range" id="lKbR" min="1" max="5" step=".5" value="2"></label>
        <label class="alan"><span>Parçaları ayır</span><input type="range" id="lKcR" min="0" max="2.5" step=".1" value=".8"></label>
        <div class="benzetme"><b>Benzetme:</b> Kenarı a + b olan küp bir pastayı her yönden iki düz kesimle sekiz parçaya böl: 1 büyük küp (a³), 1 küçük küp (b³), 3 kalın dilim (a²b) ve 3 ince çubuk (ab²). Formül bu parçaların hacimleri toplamıdır.</div>
        <span class="etiket soluk">İki boyutlu karşılığı: (a + b)²</span><div id="lKare"></div></div></div>`;
    const kp = MC.uc.kupAcilimi(U.$("#lKup", k));
    const yaz = () => {
      const a = +U.$("#lKaR", k).value, b = +U.$("#lKbR", k).value, c = +U.$("#lKcR", k).value, f = (x) => x.toLocaleString("tr-TR", { maximumFractionDigits: 3 }).replace(",", "{,}");
      U.$("#lKa", k).textContent = a.toLocaleString("tr-TR"); U.$("#lKb", k).textContent = b.toLocaleString("tr-TR");
      if (kp) kp.ciz(a, b, c);
      U.texYaz(U.$("#lKupTex", k), `(${f(a)} + ${f(b)})^3 = ${f(a ** 3)} + 3\\cdot ${f(a * a * b)} + 3\\cdot ${f(a * b * b)} + ${f(b ** 3)} = ${f((a + b) ** 3)}`);
      const s = a + b, o = 300 / s;
      U.$("#lKare", k).innerHTML = `<svg class="kare-svg" viewBox="-10 -10 320 320" role="img" aria-label="(a+b) kare açılımı">
        <rect x="0" y="0" width="${a * o}" height="${a * o}" fill="#2e5fd6" stroke="#081227" stroke-width="3"/><rect x="${a * o}" y="0" width="${b * o}" height="${a * o}" fill="#ff4d61" stroke="#081227" stroke-width="3"/>
        <rect x="0" y="${a * o}" width="${a * o}" height="${b * o}" fill="#ff4d61" stroke="#081227" stroke-width="3"/><rect x="${a * o}" y="${a * o}" width="${b * o}" height="${b * o}" fill="#35e0b0" stroke="#081227" stroke-width="3"/>
        <text x="${a * o / 2}" y="${a * o / 2 + 8}" text-anchor="middle" fill="#fff" font-family="Unbounded, sans-serif" font-weight="700" font-size="24">a²</text>
        <text x="${a * o + b * o / 2}" y="${a * o / 2 + 7}" text-anchor="middle" fill="#fff" font-family="Unbounded, sans-serif" font-weight="700" font-size="20">ab</text>
        <text x="${a * o / 2}" y="${a * o + b * o / 2 + 7}" text-anchor="middle" fill="#fff" font-family="Unbounded, sans-serif" font-weight="700" font-size="20">ab</text>
        <text x="${a * o + b * o / 2}" y="${a * o + b * o / 2 + 7}" text-anchor="middle" fill="#081227" font-family="Unbounded, sans-serif" font-weight="700" font-size="20">b²</text></svg>
        <p class="soluk">(a + b)² = a² + 2ab + b². Sık yapılan hata (a + b)² = a² + b² yazmaktır: iki kırmızı dikdörtgen unutulmuş olur.</p>`;
    };
    ["#lKaR", "#lKbR", "#lKcR"].forEach((s) => U.$(s, k).addEventListener("input", yaz));
    yaz();
  }

  /* ---------- 5) Fibonacci spirali ---------- */
  function fib(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="panel" style="padding:10px"><canvas id="lFib" style="width:100%;aspect-ratio:1.618;display:block;border-radius:16px;background:#050c1c"></canvas></div>
      <div class="panel"><span class="etiket">Ayarlar</span><label class="alan"><span>Kare sayısı: <b id="lFN">10</b></span><input type="range" id="lFR" min="3" max="14" value="10"></label>
        <button class="btn btn-ikinci" id="lFOyna">Spirali yeniden çiz</button>
        <div class="bilgi-kutu">Kenarları 1, 1, 2, 3, 5, 8 … olan kareler yan yana dizilir. Her karenin içine çeyrek çember çizilince altın spiral ortaya çıkar. Ayçiçeği tohumları ve salyangoz kabukları benzer bir düzen gösterir.</div>
        <span class="etiket soluk">Ardışık terimlerin oranı φ ≈ 1,618'e yaklaşır</span><div class="grafik-kutu" id="lFOran" style="height:220px"></div></div></div>`;
    const cv = U.$("#lFib", k); let adet = 10, ilerleme = 1;
    const RENK = ["#2e5fd6", "#ff4d61", "#ffc657", "#35e0b0", "#a66bff", "#ff8a1f", "#ff7ac6", "#33c3f0", "#20c997"];
    function kareler(n) {
      const f = [1, 1]; while (f.length < n) f.push(f[f.length - 1] + f[f.length - 2]);
      let xmin = 0, ymin = 0, xmax = 1, ymax = 1; const out = [];
      f.slice(0, n).forEach((s, i) => {
        const yon = (i + 3) % 4; let x0, y0;
        if (i === 0) { x0 = 0; y0 = 0; } else if (yon === 0) { x0 = xmax; y0 = ymin; } else if (yon === 1) { x0 = xmin; y0 = ymax; } else if (yon === 2) { x0 = xmin - s; y0 = ymax - s; } else { x0 = xmax - s; y0 = ymin - s; }
        xmin = Math.min(xmin, x0); ymin = Math.min(ymin, y0); xmax = Math.max(xmax, x0 + s); ymax = Math.max(ymax, y0 + s);
        out.push({ x0, y0, s, yon });
      });
      return { out, xmin, ymin, xmax, ymax };
    }
    function ciz() {
      const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
      cv.width = W * dpr; cv.height = H * dpr; const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = "#050c1c"; g.fillRect(0, 0, W, H);
      const { out, xmin, ymin, xmax, ymax } = kareler(adet), pad = 16, o = Math.min((W - 2 * pad) / (xmax - xmin), (H - 2 * pad) / (ymax - ymin));
      const ox = (W - (xmax - xmin) * o) / 2, oy = (H - (ymax - ymin) * o) / 2;
      const X = (x) => ox + (x - xmin) * o, Y = (y) => H - (oy + (y - ymin) * o);
      const gor = Math.max(1, Math.round(ilerleme * out.length));
      out.slice(0, gor).forEach((q, i) => {
        const r = RENK[i % RENK.length];
        g.fillStyle = r + "33"; g.strokeStyle = r; g.lineWidth = 2;
        g.fillRect(X(q.x0), Y(q.y0 + q.s), q.s * o, q.s * o); g.strokeRect(X(q.x0), Y(q.y0 + q.s), q.s * o, q.s * o);
        if (q.s * o > 26) { g.fillStyle = "#eef3ff"; g.font = `700 ${Math.min(30, 10 + q.s * o / 10)}px 'Unbounded', sans-serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(q.s, X(q.x0 + q.s / 2), Y(q.y0 + q.s / 2)); }
      });
      g.strokeStyle = "#ff4d61"; g.lineWidth = 4; g.shadowColor = "#ff4d61"; g.shadowBlur = 12; g.beginPath();
      out.slice(0, gor).forEach((q, i) => {
        const [mx, my, a0, a1] = { 0: [q.x0, q.y0 + q.s, -90, 0], 1: [q.x0, q.y0, 0, 90], 2: [q.x0 + q.s, q.y0, 90, 180], 3: [q.x0 + q.s, q.y0 + q.s, 180, 270] }[q.yon];
        for (let t = 0; t <= 24; t++) { const a = (a0 + (a1 - a0) * t / 24) * Math.PI / 180, px = X(mx + q.s * Math.cos(a)), py = Y(my + q.s * Math.sin(a)); if (i === 0 && t === 0) g.moveTo(px, py); else g.lineTo(px, py); }
      });
      g.stroke(); g.shadowBlur = 0;
    }
    function oynat() { if (U.animasyon()) { const o = { v: 0 }; gsap.to(o, { v: 1, duration: 2.2, ease: "power2.inOut", onUpdate: () => { ilerleme = o.v; ciz(); } }); } else { ilerleme = 1; ciz(); } }
    U.$("#lFR", k).addEventListener("input", (e) => { adet = +e.target.value; U.$("#lFN", k).textContent = adet; ilerleme = 1; ciz(); });
    U.$("#lFOyna", k).addEventListener("click", () => { Ses.efekt("basla"); oynat(); });
    new ResizeObserver(() => ciz()).observe(cv);
    const f = [1, 1]; while (f.length < 22) f.push(f[f.length - 1] + f[f.length - 2]);
    MC.grafik.cizgi(U.$("#lFOran", k), { seriler: [{ ad: "Fₙ₊₁ / Fₙ", y: f.slice(1).map((v, i) => v / f[i]), renk: "#a66bff", nokta: true }, { ad: "φ ≈ 1,618", y: f.slice(1).map(() => (1 + Math.sqrt(5)) / 2), renk: "#ff4d61", kesik: true, kalinlik: 2 }], xBaslik: "n" });
    oynat();
  }

  /* ---------- 6) Collatz ---------- */
  function collatz(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="panel"><div class="grafik-kutu" id="lCol" style="height:min(60vh,480px)"></div><div class="metrikler" id="lColM"></div></div>
      <div class="panel"><span class="etiket">Ayarlar</span>
        <label class="alan"><span>1. sayı</span><input class="girdi mono" id="lC1" value="27" inputmode="numeric"></label>
        <label class="alan"><span>2. sayı (boş bırakılabilir)</span><input class="girdi mono" id="lC2" value="97" inputmode="numeric"></label>
        <label class="satir"><input type="checkbox" id="lCLog" checked> Logaritmik eksen</label>
        <button class="btn btn-ana" id="lCCiz">Yolculuğu çiz</button>
        <div class="bilgi-kutu">Collatz Sanısı: hangi sayıdan başlarsan başla, “çiftse ikiye böl, tekse 3n + 1” kuralı seni sonunda 1'e götürür. 2⁶⁸'e kadar bütün sayılar denendi; ispatı hâlâ yok. 27, 111 adımda ve 9.232'ye kadar tırmanarak iner.</div>
        <div class="benzetme"><b>Benzetme:</b> Sayılar dağlara tırmanıp inen yolculardır. Tek sayıda fırtına (3n + 1) onları yukarı fırlatır, çift sayıda yokuş aşağı (÷2) inerler.</div></div></div>`;
    const ciz = () => {
      const seriler = [], m = [], renk = ["#a66bff", "#ffc657"];
      ["#lC1", "#lC2"].forEach((s, i) => {
        const v = U.$(s, k).value.trim(); if (!v) return;
        let n; try { n = S.ifadeCoz(v, 10n ** 15n); } catch (e) { m.push(`<div class="metrik"><small>${i + 1}. sayı</small><b style="font-size:1rem;color:var(--kirmizi)">${e.message}</b></div>`); return; }
        const yol = S.collatz(n), maks = yol.reduce((a, b) => (b > a ? b : a), 0n);
        seriler.push({ ad: `${S.tr(n)} (${yol.length - 1} adım)`, y: yol.map(Number), renk: renk[i], nokta: yol.length < 140 });
        m.push(`<div class="metrik"><small>${S.tr(n)}</small><b>${S.tr(yol.length - 1)} adım</b><small>en yüksek ${S.tr(maks)}</small></div>`);
      });
      U.$("#lColM", k).innerHTML = m.join("");
      if (seriler.length) MC.grafik.cizgi(U.$("#lCol", k), { seriler, logY: U.$("#lCLog", k).checked, xBaslik: "adım" });
    };
    U.$("#lCCiz", k).addEventListener("click", () => { Ses.efekt("tara"); ciz(); });
    U.$("#lCLog", k).addEventListener("change", ciz);
    ciz();
  }

  /* ---------- 7) Asal sayma ---------- */
  function pi(k) {
    k.innerHTML = `<div class="lab-duzen"><div class="panel"><div class="grafik-kutu" id="lPi" style="height:min(60vh,480px)"></div><p id="lPiAc"></p></div>
      <div class="panel"><span class="etiket">Ayarlar</span><div class="secim-grup"><span>x üst sınırı</span><div id="lPiN"></div></div>
        <div class="bilgi-kutu">Gauss 15 yaşında asal tablolarını incelerken asalların x civarında yaklaşık 1 / ln x sıklıkla göründüğünü tahmin etti. Bu tahmin, Asal Sayı Teoremi olarak 1896'da Hadamard ve de la Vallée Poussin tarafından ispatlandı.</div>
        <p>$$\\pi(x) \\sim \\frac{x}{\\ln x} \\qquad \\mathrm{Li}(x) = \\int_2^x \\frac{dt}{\\ln t}$$</p></div></div>`;
    U.tex(k);
    const ciz = (N) => {
      const asal = new Uint8Array(N + 1).fill(1); asal[0] = asal[1] = 0;
      for (let i = 2; i * i <= N; i++) if (asal[i]) for (let j = i * i; j <= N; j += i) asal[j] = 0;
      const adim = Math.max(1, Math.floor(N / 400)), xs = [], p = [], t = [], li = [];
      let say = 0, lis = 0, onceki = 2;
      for (let x = 1; x <= N; x++) {
        if (asal[x]) say++;
        if (x % adim === 0 || x === N) {
          if (x > 2) { const h = (x - onceki) / 60; for (let q = 0; q < 60; q++) lis += h / Math.log(onceki + (q + .5) * h); onceki = x; }
          xs.push(x); p.push(say); t.push(x > 1 ? x / Math.log(x) : 0); li.push(lis);
        }
      }
      MC.grafik.cizgi(U.$("#lPi", k), { seriler: [{ ad: "π(x) gerçek", x: xs, y: p, renk: "#ff4d61", basamak: true }, { ad: "x / ln x", x: xs, y: t, renk: "#5b8cff", kesik: true }, { ad: "Li(x)", x: xs, y: li, renk: "#35e0b0", kesik: true }], xBaslik: "x" });
      const tah = N / Math.log(N);
      U.$("#lPiAc", k).innerHTML = `x = ${S.tr(N)} için gerçek asal sayısı <b>${S.tr(say)}</b>, x / ln x tahmini <b>${S.tr(Math.round(tah))}</b> (hata %${S.ondalik(100 * Math.abs(say - tah) / say, 1)}), Li(x) tahmini <b>${S.tr(Math.round(lis))}</b> (hata %${S.ondalik(100 * Math.abs(say - lis) / say, 2)}).`;
    };
    U.segment(U.$("#lPiN", k), [[1000, "1.000"], [10000, "10.000"], [100000, "100.000"], [1000000, "1.000.000"]], 10000, (d) => ciz(+d));
    ciz(10000);
  }

  MC.modul("laboratuvar", {
    baslik: "Görsel Laboratuvar",
    kur(el) {
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Görsel Laboratuvar</span><h2>Sayıları gözünle gör</h2><p>3B grafikler parmakla döndürülür, iki parmakla ya da fare tekerleğiyle yakınlaştırılır.</p></div>
        <div id="labSekme"></div><div class="sekme-icerik">${DENEYLER.map((d) => `<div id="lab-${d.id}" hidden></div>`).join("")}</div>`;
      const F = { daglar, ulam, elek, kup, fib, collatz, pi };
      U.sekmeler(U.$("#labSekme", el), DENEYLER, (id) => {
        DENEYLER.forEach((d) => (U.$("#lab-" + d.id, el).hidden = d.id !== id));
        if (!kurulan[id]) { kurulan[id] = true; F[id](U.$("#lab-" + id, el)); }
      });
    },
  });
})();
