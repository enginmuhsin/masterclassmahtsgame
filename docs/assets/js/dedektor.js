/* =====================================================================
   SAYI DEDEKTÖRÜ — bir sayının röntgeni: teşhis, çarpan ağacı, algoritma izi, bölenler,
   13 özellik, 3B bölen küpü, sayının mahallesi, kimlik kartı, EBOB–EKOK.
   ===================================================================== */
"use strict";
(function () {
  const S = MC.sayi, U = MC.ui, Ses = MC.Ses;
  let el = null, n = 91n, sekme = "rontgen", kafes = null;
  const ORNEKLER = [["91", "91"], ["51", "51"], ["1729", "1729"], ["496", "496"], ["2047", "2047"], ["561", "561"], ["360", "360"], ["2^61-1", "2⁶¹−1"],
    ["600851475143", "600.851.475.143"], ["10!", "10!"], ["1000000007*1000000009", "(10⁹+7)·(10⁹+9)"], ["10^19-39", "10¹⁹−39"]];

  function kur(e) {
    el = e;
    el.innerHTML = `
      <div class="bolum-basi"><span class="etiket">Sayı Dedektörü</span><h2>Bir sayının röntgenini çek</h2>
        <div class="benzetme"><b>Benzetme:</b> Asal sayılar sayıların DNA harfleridir. Her sayı bu harflerin tek bir diziliminden oluşur (Aritmetiğin Temel Teoremi). Dedektör bir röntgen cihazı gibi sayının içine bakar.</div></div>
      <div class="dedektor-ust">
        <div class="panel">
          <form id="dForm" class="yigin" autocomplete="off">
            <label class="alan"><span>Sayı ya da ifade (1 ile 10¹⁹ arası) · örnek: 91 · 7×13 · 2^61−1 · 10! · 1.000.003</span>
              <input class="girdi mono" id="dGirdi" value="91" spellcheck="false" inputmode="text" style="font-size:clamp(1.3rem,3vw,1.8rem)"></label>
            <div class="satir"><button class="btn btn-ana btn-buyuk" type="submit">Röntgen çek</button></div>
          </form>
          <p class="hata-metin" id="dHata" role="alert"></p>
          <div><span class="etiket soluk">Hazır örnekler</span><div class="ornekler" id="dOrnek" style="margin-top:8px">${ORNEKLER.map(([d, a]) => `<button type="button" data-d="${d}">${a}</button>`).join("")}</div></div>
        </div>
        <div class="panel">
          <span class="etiket soluk">Dokunmatik tuş takımı</span>
          <div class="ifade-ekran" id="dEkran">91</div>
          <div class="tus-takimi" id="dTuslar">
            ${["7", "8", "9", "⌫", "4", "5", "6", "×", "1", "2", "3", "^", "(", "0", ")", "!", "C", "−", "+", "="].map((t) => `<button type="button" class="tus${"⌫×^()!C−+".includes(t) ? " islem" : ""}${t === "=" ? " esit" : ""}" data-t="${t}" aria-label="${t === "⌫" ? "Sil" : t === "C" ? "Temizle" : t}">${t}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="teshis birim" id="dTeshis"></div>
      <div id="dSekme" style="margin-top:20px"></div>
      <div class="sekme-icerik" id="dIcerik">${["rontgen", "kup", "mahalle", "kimlik", "karsilastir"].map((x) => `<div id="dI-${x}" hidden></div>`).join("")}</div>`;
    const girdi = U.$("#dGirdi", el), ekran = U.$("#dEkran", el);
    const esitle = () => (ekran.textContent = girdi.value || " ");
    girdi.addEventListener("input", esitle);
    U.$("#dForm", el).addEventListener("submit", (ev) => { ev.preventDefault(); calistir(true); });
    U.$("#dOrnek", el).addEventListener("click", (ev) => { const b = ev.target.closest("button"); if (!b) return; girdi.value = b.dataset.d; esitle(); calistir(true); });
    U.$("#dTuslar", el).addEventListener("click", (ev) => {
      const b = ev.target.closest("button"); if (!b) return; const t = b.dataset.t;
      Ses.efekt("dokun");
      if (t === "⌫") girdi.value = girdi.value.slice(0, -1);
      else if (t === "C") girdi.value = "";
      else if (t === "=") { calistir(true); return; }
      else girdi.value += t;
      esitle();
    });
    U.sekmeler(U.$("#dSekme", el), [{ id: "rontgen", ad: "Röntgen" }, { id: "kup", ad: "3B Bölen Küpü" }, { id: "mahalle", ad: "Sayının Mahallesi" }, { id: "kimlik", ad: "Kimlik Kartı" }, { id: "karsilastir", ad: "İki Sayıyı Karşılaştır" }],
      (id) => { sekme = id; icerikCiz(); }, "rontgen");
    calistir(false);
  }
  function goster(e, param) {
    if (param && /^[0-9]+$/.test(param)) { U.$("#dGirdi", el).value = param; U.$("#dEkran", el).textContent = param; calistir(false); }
  }
  function calistir(sesli) {
    let yeni;
    try { yeni = S.ifadeCoz(U.$("#dGirdi", el).value); U.$("#dHata", el).textContent = ""; }
    catch (e) { U.$("#dHata", el).textContent = e.message; if (sesli) Ses.efekt("yanlis"); return; }
    n = yeni; if (sesli) Ses.efekt("tara");
    teshisCiz(); icerikCiz();
  }

  /* ---------- Teşhis kartı ---------- */
  function teshisCiz() {
    const t0 = performance.now(), c = S.carpanlar(n), sure = performance.now() - t0, T = U.$("#dTeshis", el);
    let sinif, ust, baslik;
    if (n === 1n) { sinif = "birim"; ust = "Birim"; baslik = "1 ne asal ne bileşiktir"; }
    else if (c.length === 1) { sinif = "asal"; ust = "Asal"; baslik = `${S.tr(n)} ASALDIR`; }
    else if (c.length === 2) { sinif = "yari"; ust = "Yarı asal · görünüşe aldanma"; baslik = `${S.tr(n)} asal değildir, yarı asaldır: ${S.tr(c[0])} × ${S.tr(c[1])}`; }
    else { sinif = "bilesik"; ust = "Bileşik"; baslik = `${S.tr(n)} asal değildir, bileşiktir`; }
    T.className = "teshis " + sinif;
    T.innerHTML = `<div class="tarama"></div><span class="etiket soluk">${ust}</span><h2>${baslik}</h2>
      ${n > 1n ? `<div class="formul">${S.tr(n)} = ${S.carpimYazi(n)}</div>` : ""}
      <div class="cipler">${c.map((p) => `<span class="cip">${S.tr(p)}</span>`).join("")}</div>
      <span class="soluk" style="font-size:14px">Çarpanlara ayırma ${S.ondalik(sure, 1)} ms sürdü · yöntem: ${n > S.DENEME_SINIRI ? "Miller–Rabin + Pollard rho" : "6k ± 1 deneme bölmesi"}</span>`;
    if (U.animasyon()) {
      gsap.fromTo(U.$(".tarama", T), { x: "-100%" }, { x: "100%", duration: .9, ease: "power2.inOut" });
      gsap.fromTo(U.$$(".cip", T), { y: 18, opacity: 0, scale: .6 }, { y: 0, opacity: 1, scale: 1, stagger: .05, duration: .4, ease: "back.out(2.5)", overwrite: true });
    }
  }

  function icerikCiz() {
    U.$$("#dIcerik > div", el).forEach((d) => (d.hidden = d.id !== "dI-" + sekme));
    ({ rontgen, kup, mahalle, kimlik, karsilastir })[sekme](U.$("#dI-" + sekme, el));
  }

  /* ---------- 1) Röntgen ---------- */
  function agacSvg() {
    const c = S.carpanlar(n);
    if (c.length < 2) return "";
    const dugumler = [], kenarlar = [];
    const gen = (s) => Math.max(52, s.length * 10 + 24);
    let kalan = n;
    const etiketler = [S.tr(n), ...c.map((p) => S.tr(p))];
    const adimX = Math.max(70, Math.max(...etiketler.map(gen)) * .62), adimY = 70;
    let x = adimX + 20, y = 34;
    dugumler.push({ x, y, t: S.tr(kalan), asal: false });
    for (let i = 0; i < c.length - 1; i++) {
      const p = c[i]; kalan /= p;
      const sol = { x: x - adimX, y: y + adimY, t: S.tr(p), asal: true }, sag = { x: x + adimX, y: y + adimY, t: S.tr(kalan), asal: S.asalMi(kalan) };
      kenarlar.push([x, y, sol.x, sol.y], [x, y, sag.x, sag.y]); dugumler.push(sol, sag);
      x = sag.x; y = sag.y;
    }
    const W = Math.max(...dugumler.map((d) => d.x + gen(d.t) / 2)) + 20, H = y + 40;
    const minX = Math.min(...dugumler.map((d) => d.x - gen(d.t) / 2)) - 10;
    const kay = minX < 0 ? -minX : 0;
    return `<svg width="${W + kay}" height="${H}" viewBox="${-kay} 0 ${W + kay} ${H}" role="img" aria-label="Çarpan ağacı">
      ${kenarlar.map(([a, b, c2, d]) => `<line x1="${a}" y1="${b + 16}" x2="${c2}" y2="${d - 16}" stroke="#5b8cff" stroke-width="2" opacity=".6"/>`).join("")}
      ${dugumler.map((d) => { const w = gen(d.t); return d.asal
        ? `<g><rect x="${d.x - w / 2}" y="${d.y - 18}" width="${w}" height="36" rx="18" fill="#ff4d61"/><text x="${d.x}" y="${d.y + 6}" text-anchor="middle" fill="#fff" font-family="JetBrains Mono, monospace" font-weight="700" font-size="16">${d.t}</text></g>`
        : `<g><rect x="${d.x - w / 2}" y="${d.y - 18}" width="${w}" height="36" rx="10" fill="#142a57" stroke="#5b8cff"/><text x="${d.x}" y="${d.y + 6}" text-anchor="middle" fill="#eef3ff" font-family="JetBrains Mono, monospace" font-weight="700" font-size="16">${d.t}</text></g>`; }).join("")}
    </svg>`;
  }
  function noktaIzgara(sat, sut, renk) { return `<div class="nokta-izgara" style="grid-template-columns:repeat(${sut},14px)">${`<i style="background:${renk}"></i>`.repeat(sat * sut)}</div>`; }
  function rontgen(k) {
    const c = S.carpanlar(n), N = Number(n);
    const bol = S.bolenler(n, 120000), tau = S.tau(n);
    let dna = "", dikdortgen = "", iz = "";
    if (n > 1n) dna = `<div class="panel-ic" style="overflow-x:auto">$$${n} = ${S.carpimTex(n)}$$</div>`;
    if (n > 1n && n <= 400n) {
      const ciftler = bol.filter((d) => d > 1n && d * d <= n).map((d) => [Number(d), Number(n / d)]);
      dikdortgen = `<h3>Dikdörtgen testi</h3><div class="benzetme"><b>Benzetme:</b> ${N} bilyeyi dolu bir dikdörtgen olarak dizebiliyorsan sayı bileşiktir. Asallar yalnızca tek sıra hâlinde dizilebilir.</div>` +
        (ciftler.length ? (c.length === 2 ? `<p>Yarı asalların yalnızca <b>bir</b> gerçek dikdörtgeni vardır: <b>${ciftler[0][0]} × ${ciftler[0][1]}</b>.</p>` : "") +
          ciftler.slice(-3).reverse().map(([a, b]) => `<p class="mono">${a} satır × ${b} sütun</p>${noktaIzgara(a, b, c.length > 2 ? "#5b8cff" : "#ff4d61")}`).join("")
          : `<p>${N} bilyeden 1 × ${N} dışında dikdörtgen kurulamaz; asaldır.</p>${N <= 48 ? noktaIzgara(1, N, "#35e0b0") : ""}`);
    }
    if (n >= 4n && n <= S.DENEME_SINIRI) {
      const r = S.asallikIzi(n);
      const parca = r.denenen.map((d) => `<span class="${d === r.bulunan ? "iz-bolen" : "iz-deneme"}">${d}</span>`).join(" ") + (r.sayac > r.denenen.length ? ` … (+${S.tr(r.sayac - r.denenen.length)} deneme)` : "");
      iz = `<div class="iz-kutu">√${S.tr(n)} ≈ ${S.ondalik(Math.sqrt(N))} sınırına kadar denenen bölenler:<br>${parca}</div>
        <p>${r.bulunan ? `<b>${r.bulunan}</b> sayısı ${S.tr(n)}'i böldü: ${S.tr(n)} = ${r.bulunan} × ${S.tr(n / BigInt(r.bulunan))}. Toplam <b>${S.tr(r.sayac)}</b> deneme yapıldı.`
          : `√n sınırına kadar bölen yok, sayı <b>asal</b>. Toplam <b>${S.tr(r.sayac)}</b> deneme. Naif yöntem ${S.tr(n - 2n)} deneme yapardı; bu yaklaşık <b>${S.tr(Math.round((N - 2) / Math.max(1, r.sayac)))} kat</b> fazla.`}</p>`;
    } else if (n > S.DENEME_SINIRI) {
      iz = `<div class="bilgi-kutu">Bu sayı 10¹²'den büyük. √n'ye kadar deneme bölmesi milyonlarca adım süreceği için <b>Miller–Rabin</b> asallık testi ve <b>Pollard rho</b> çarpanlara ayırma yöntemi kullanıldı. Bilgi Köşesi'ndeki “Algoritmalar” bölümü ikisini de anlatır.</div>`;
    } else iz = '<p class="soluk">n < 4 için test doğrudan sonuç verir.</p>';
    const tauTex = n > 1n ? `$$\\tau(n) = ${[...S.ussler(n).values()].map((e) => `(${e}+1)`).join("\\cdot")} = ${tau} \\qquad \\sigma(n) = ${S.tr(S.sigma(n)).replace(/\./g, "{.}")}$$` : "";
    const bolList = bol.length <= 120 ? `<div>${bol.map((d) => `<span class="rozet">${S.tr(d)}</span>`).join("")}</div>` : `<p class="soluk">İlk 60 bölen: ${bol.slice(0, 60).map((d) => S.tr(d)).join(", ")} …</p>`;
    const ciftlerHepsi = bol.filter((d) => d * d <= n).slice(0, 60).map((d) => `<li class="mono">${S.tr(d)} × ${S.tr(n / d)}</li>`).join("");
    U.html(k, `
      <div class="iki-sutun">
        <div class="panel"><span class="etiket">Asal çarpan DNA'sı</span>${n > 1n ? dna + `<h3>Çarpan ağacı</h3><div class="agac-kutu">${agacSvg() || '<p class="soluk" style="padding:10px">Asal sayının ağacı tek bir yapraktır.</p>'}</div>` : '<p class="soluk">1\'in asal çarpanı yoktur.</p>'}${dikdortgen}</div>
        <div class="panel"><span class="etiket">Algoritma izi · O(√n)</span>${iz}
          <span class="etiket">Bölenler · τ(n) = ${S.tr(tau)}</span>${tauTex}${bolList}
          <details class="acilir"><summary>Bölen çiftleri (ayna √n ≈ ${S.ondalik(Math.sqrt(N))})</summary><p class="soluk">Her bölen çifti √n'nin iki yanında durur; bu yüzden √n'ye kadar aramak yeter.</p><ul>${ciftlerHepsi}</ul></details>
        </div>
      </div>
      <div class="panel" style="margin-top:20px"><span class="etiket">Master Class özellikleri</span>
        <div class="ozellikler">${S.KAT.map((c2) => { const v = c2.f(n); return `<div class="ozellik ${v ? "var" : "yok"}"><span class="ik">${v ? "✓" : "–"}</span><div><b>${c2.ad}</b><span class="ac">${S.kanit(n, c2.k)}</span></div></div>`; }).join("")}</div>
      </div>`);
  }

  /* ---------- 2) 3B bölen küpü ---------- */
  function kup(k) {
    if (!U.$("#dKafes", k)) {
      k.innerHTML = `<div class="lab-duzen"><div class="sahne-kutu" id="dKafes" style="height:min(70vh,560px)"><span class="ipucu-surukle">Sürükle · döndür</span></div>
        <div class="panel"><span class="etiket">Nasıl okunur?</span><div class="benzetme"><b>Benzetme:</b> Bir böleni kurmak bir tarif seçmektir: her asal “malzemeden” kaç tane kullanacağına karar verirsin. Her tarif kafeste bir noktadır.</div><div id="dKafesNot"></div></div></div>`;
      kafes = null;
    }
    if (!kafes) kafes = MC.uc.kafes(U.$("#dKafes", k));
    if (!kafes) return;
    const not = U.$("#dKafesNot", k);
    if (n === 1n) { kafes.ciz(1n); not.innerHTML = "<p>1'in tek böleni vardır; küp tek bir noktadır.</p>"; return; }
    const r = kafes.ciz(n);
    U.html(not, `<p>Eksenler: ${r.eksenler.map(([p, e]) => `<b>${S.tr(p)}</b> üssü 0–${e}`).join(" · ")}.</p>
      $$\\text{nokta sayısı} = ${r.eksenler.map(([, e]) => `(${e}+1)`).join("\\cdot")} = ${r.adet}$$
      ${r.farkli > 3 ? `<p class="soluk">Bu sayının ${r.farkli} farklı asal çarpanı var; küpte en yüksek üslü üçü gösteriliyor.</p>` : "<p>Nokta sayısı bölen sayısına eşittir.</p>"}
      ${r.adet > 600 ? '<p class="soluk">Nokta çok olduğu için yalnızca kafes çizildi.</p>' : ""}
      <p class="soluk">Renk koyu maviden kırmızıya doğru bölenin büyüklüğünü gösterir. En alttaki köşe 1, en üstteki köşe sayının kendisidir.</p>`);
  }

  /* ---------- 3) Sayının mahallesi ---------- */
  function mahalle(k) {
    const bas = n > 12n ? n - 12n : 1n, liste = [];
    for (let m = bas; m < bas + 25n; m++) liste.push(m);
    const once = S.oncekiAsal(n), sonra = S.sonrakiAsal(n), asal = S.asalMi(n);
    let ozel = "";
    if (asal) {
      const ikiz = [n - 2n, n + 2n].filter((m) => m > 1n && S.asalMi(m)), sg = S.asalMi(2n * n + 1n);
      ozel = `<div class="bilgi-kutu">İkiz asal: <b>${ikiz.length ? "Evet, eşi " + ikiz.map(S.tr).join(" ve ") : "Hayır"}</b> · Sophie Germain asalı (2p + 1 de asal): <b>${sg ? "Evet, " + S.tr(2n * n + 1n) : "Hayır"}</b></div>`;
    }
    const g = S.goldbach(n), ik = S.ikiKareMi(n), ikT = ik ? S.ikiKareTemsil(n) : null;
    const kotu = [...S.ussler(n)].filter(([p, e]) => p % 4n === 3n && e % 2).map(([p]) => S.tr(p));
    const yol = S.collatz(n), maks = yol.reduce((a, b) => (b > a ? b : a), 0n);
    U.html(k, `
      <div class="panel"><span class="etiket">Sayı doğrusu · kırmızı asal · turuncu yarı asal · altın seçilen sayı</span>
        <div class="sayi-dogrusu">${liste.map((m) => `<span class="${m === n ? "secili" : S.asalMi(m) ? "asal" : S.carpanlar(m).length === 2 ? "yari" : ""}" title="${S.kanit(m, "asal")}">${S.tr(m)}</span>`).join("")}</div>
        <div class="metrikler"><div class="metrik"><small>Önceki asal</small><b>${once ? S.tr(once) : "—"}</b></div><div class="metrik"><small>Sonraki asal</small><b>${S.tr(sonra)}</b></div><div class="metrik"><small>Asal boşluğu</small><b>${once ? S.tr(sonra - once) : "—"}</b></div></div>
        ${ozel}
      </div>
      <div class="iki-sutun" style="margin-top:20px">
        <div class="panel"><span class="etiket">Goldbach ayrışımı</span>
          ${g ? `<p class="mono" style="font-size:1.3rem">${S.tr(n)} = ${S.tr(g[0])} + ${S.tr(g[1])}</p><p class="soluk">Goldbach Sanısı: 2'den büyük her çift sayı iki asalın toplamıdır. 4·10¹⁸'e kadar doğrulandı, ama ispatı yok.</p>` : '<p class="soluk">Goldbach ayrışımı 4 ve daha büyük çift sayılar için aranır.</p>'}
          <span class="etiket">İki karenin toplamı</span>
          ${ik ? (ikT ? `<p class="mono" style="font-size:1.3rem">${S.tr(n)} = ${ikT[0]}² + ${S.tr(ikT[1])}²</p>` : "<p>Evet, iki karenin toplamı olarak yazılabilir.</p>") : `<p>Yazılamaz: ${kotu.join(", ")} asalı (4k+3 biçimli) tek kuvvette geçiyor.</p>`}
          <p class="soluk">Fermat: bir sayı ancak 4k+3 biçimli her asal çarpanı çift kuvvette geçiyorsa iki karenin toplamıdır.</p>
        </div>
        <div class="panel"><span class="etiket">Collatz yolculuğu</span>
          <p><b>${S.tr(yol.length - 1)}</b> adımda 1'e ulaşır · en yüksek değer <b class="mono">${S.tr(maks)}</b></p>
          <div class="grafik-kutu" id="dCollatz" style="height:240px"></div>
          <p class="soluk">Kural: çiftse ikiye böl, tekse 3n + 1. Her sayının sonunda 1'e indiği sanılıyor; 2⁶⁸'e kadar denendi, ispat yok.</p>
        </div>
      </div>`);
    MC.grafik.cizgi(U.$("#dCollatz", k), { seriler: [{ ad: "Değer", y: yol.map(Number), renk: "#a66bff" }], logY: maks > 2000n, xBaslik: "adım", lejant: false });
  }

  /* ---------- 4) Kimlik kartı ---------- */
  function kimlik(k) {
    const s = S.sigma(n) - n, mers = ((n + 1n) & n) === 0n && n > 1n;
    const u = S.ussler(n), fermat = n > 2n && ((n - 1n) & (n - 2n)) === 0n && [1n, 2n, 4n, 8n, 16n, 32n, 64n].includes(BigInt((n - 1n).toString(2).length - 1));
    const alanlar = [
      ["Basamak sayısı", n.toString().length], ["Rakam toplamı", S.rakamTop(n)], ["Dijital kök", S.dijitalKok(n)],
      ["İkili (taban 2)", n.toString(2)], ["Sekizli (taban 8)", n.toString(8)], ["Onaltılı (taban 16)", n.toString(16).toUpperCase()],
      ["Roma rakamı", S.roma(n)], ["τ(n) bölen sayısı", S.tr(S.tau(n))], ["σ(n) bölen toplamı", S.tr(S.sigma(n))],
      ["φ(n) Euler fonksiyonu", S.tr(S.phi(n))], ["μ(n) Möbius", S.mobius(n)], ["Ω(n) asal çarpan (tekrarlı)", S.carpanlar(n).length],
      ["ω(n) farklı asal", u.size], ["Bolluk sınıfı", n === 1n ? "—" : s === n ? "Mükemmel" : s > n ? "Bol (zengin)" : "Eksik"],
      ["Kare-serbest mi?", S.mobius(n) !== 0 ? "Evet" : "Hayır"],
      ["Mersenne biçimi 2ᵏ − 1", mers ? `Evet: 2${S.us((n + 1n).toString(2).length - 1)} − 1${S.asalMi(n) ? " (Mersenne asalı)" : ""}` : "Hayır"],
      ["Fermat sayısı mı?", fermat ? "Evet" : "Hayır"],
    ];
    U.html(k, `<div class="panel"><span class="etiket">Kimlik kartı · ${S.tr(n)}</span>
      <div class="kimlik">${alanlar.map(([a, d]) => `<div><small>${a}</small><b>${d}</b></div>`).join("")}</div>
      <details class="acilir"><summary>Bu kavramlar ne anlama geliyor?</summary><ul class="yigin" style="gap:6px">
        <li><b>φ(n)</b>: 1'den n'e kadar, n ile ortak böleni olmayan sayıların adedi. RSA şifrelemesinin temel taşıdır. $\\varphi(n) = n\\prod(1 - 1/p)$</li>
        <li><b>μ(n)</b>: Kare çarpanı varsa 0; farklı asal sayısı çiftse +1, tekse −1.</li>
        <li><b>Dijital kök</b>: Tek basamak kalana kadar rakamları toplamak. Sonuç, sayının 9'a bölümünden kalanla ilişkilidir.</li>
        <li><b>Bol / eksik</b>: Kendisi hariç bölenleri toplamı sayıdan büyükse bol, küçükse eksik, eşitse mükemmeldir.</li>
      </ul></details></div>`);
  }

  /* ---------- 5) İki sayıyı karşılaştır ---------- */
  function vennSvg(a, b) {
    const ca = S.carpanlar(a).slice(), cb = S.carpanlar(b).slice(), ortak = [], sadeceA = [];
    for (const p of ca) { const i = cb.findIndex((q) => q === p); if (i >= 0) { ortak.push(p); cb.splice(i, 1); } else sadeceA.push(p); }
    const yaz = (l, x) => { if (!l.length) return `<text x="${x}" y="200" text-anchor="middle" fill="#9db0d6" font-size="20">—</text>`; const s = l.map(S.tr); const sat = []; for (let i = 0; i < s.length; i += 3) sat.push(s.slice(i, i + 3).join(" · ")); return sat.slice(0, 6).map((t, i) => `<text x="${x}" y="${200 - (Math.min(sat.length, 6) - 1) * 14 + i * 28}" text-anchor="middle" fill="#eef3ff" font-family="JetBrains Mono, monospace" font-weight="700" font-size="${t.length > 16 ? 14 : 18}">${t}</text>`).join(""); };
    return `<svg viewBox="0 0 640 380" style="width:100%;height:auto" role="img" aria-label="Asal çarpan Venn şeması">
      <circle cx="230" cy="195" r="160" fill="rgba(91,140,255,.18)" stroke="#5b8cff" stroke-width="3"/>
      <circle cx="410" cy="195" r="160" fill="rgba(255,77,97,.18)" stroke="#ff4d61" stroke-width="3"/>
      <text x="170" y="26" text-anchor="middle" fill="#5b8cff" font-family="Unbounded, sans-serif" font-weight="700" font-size="18">${S.tr(a).slice(0, 22)}</text>
      <text x="470" y="26" text-anchor="middle" fill="#ff4d61" font-family="Unbounded, sans-serif" font-weight="700" font-size="18">${S.tr(b).slice(0, 22)}</text>
      ${yaz(sadeceA, 150)}${yaz(ortak, 320)}${yaz(cb, 490)}
      <text x="320" y="372" text-anchor="middle" fill="#9db0d6" font-size="14">Ortak bölge = EBOB · Tüm bölgeler = EKOK</text></svg>`;
  }
  function karsilastir(k) {
    const onceki = U.$("#dIkinci", k) ? U.$("#dIkinci", k).value : "84";
    k.innerHTML = `<div class="panel"><form id="dIkiForm" class="satir" autocomplete="off">
        <label class="alan" style="flex:1"><span>İkinci sayı (ifade de olur)</span><input class="girdi mono" id="dIkinci" value="${U.kacis(onceki)}" spellcheck="false"></label>
        <button class="btn btn-ana" type="submit" style="align-self:flex-end">Karşılaştır</button></form><p class="hata-metin" id="dIkiHata"></p><div id="dIkiSonuc" class="yigin"></div></div>`;
    const ciz = () => {
      let m; try { m = S.ifadeCoz(U.$("#dIkinci", k).value); U.$("#dIkiHata", k).textContent = ""; } catch (e) { U.$("#dIkiHata", k).textContent = e.message; return; }
      const e = S.ebob(n, m), ekok = n / e * m;
      let a = n > m ? n : m, b = n > m ? m : n; const adim = [];
      while (b) { adim.push(`${S.tr(a)} = ${S.tr(a / b)} × ${S.tr(b)} + ${S.tr(a % b)}`); [a, b] = [b, a % b]; }
      U.html(U.$("#dIkiSonuc", k), `<div class="metrikler"><div class="metrik"><small>EBOB</small><b>${S.tr(e)}</b></div><div class="metrik"><small>EKOK</small><b>${S.tr(ekok)}</b></div><div class="metrik"><small>Aralarında asal mı?</small><b>${e === 1n ? "Evet" : "Hayır"}</b></div></div>
        <div class="iki-sutun"><div>${vennSvg(n, m)}</div><div class="yigin"><span class="etiket">Öklid algoritması</span><div class="iz-kutu">${adim.slice(0, 30).join("<br>")}<br>→ EBOB = <b>${S.tr(a)}</b></div>
        $$\\text{EBOB}(a,b)\\cdot\\text{EKOK}(a,b) = a\\cdot b$$<p class="soluk">Öklid algoritması büyük sayıyı küçüğe böler, kalanla devam eder. Kalan 0 olunca son bölen EBOB'dur. Adım sayısı en fazla sayının basamak sayısının yaklaşık 5 katıdır.</p></div></div>`);
    };
    U.$("#dIkiForm", k).addEventListener("submit", (ev) => { ev.preventDefault(); Ses.efekt("tara"); ciz(); });
    ciz();
  }

  MC.modul("dedektor", { baslik: "Sayı Dedektörü", kur, goster });
})();
