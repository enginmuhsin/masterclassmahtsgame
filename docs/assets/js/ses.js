/* =====================================================================
   SES MOTORU — Web Audio ile kodla üretilen müzik ve efektler.
   Hiçbir ses dosyası yoktur; telif sorunu yoktur ve internetsiz çalışır.
   Tarayıcılar sesi ancak kullanıcı bir yere dokunduktan sonra başlatır.
   ===================================================================== */
"use strict";
(function () {
  const Ses = {
    ctx: null, ana: null, muzikKazanc: null, efektAcik: true, muzikAcik: false, zamanlayici: null, adim: 0, sonraki: 0, gurultu: null,
    baslat() {
      if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return; }
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      try { this.ctx = new C(); } catch (e) { this.ctx = null; return; }
      const sikistir = this.ctx.createDynamicsCompressor();
      this.ana = this.ctx.createGain(); this.ana.gain.value = .85; this.ana.connect(sikistir); sikistir.connect(this.ctx.destination);
      this.muzikKazanc = this.ctx.createGain(); this.muzikKazanc.gain.value = 0;
      const gecikme = this.ctx.createDelay(); gecikme.delayTime.value = .36;
      const geri = this.ctx.createGain(); geri.gain.value = .3;
      const suzgec = this.ctx.createBiquadFilter(); suzgec.type = "lowpass"; suzgec.frequency.value = 2200;
      this.muzikKazanc.connect(suzgec); suzgec.connect(this.ana); suzgec.connect(gecikme); gecikme.connect(geri); geri.connect(gecikme); gecikme.connect(this.ana);
      const uzunluk = this.ctx.sampleRate * .5, tampon = this.ctx.createBuffer(1, uzunluk, this.ctx.sampleRate), veri = tampon.getChannelData(0);
      for (let i = 0; i < uzunluk; i++) veri[i] = Math.random() * 2 - 1;
      this.gurultu = tampon;
    },
    nota(frek, t, sure, tip = "sine", kazanc = .2, hedef = null, kayma = 0) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = tip; o.frequency.setValueAtTime(frek, t);
      if (kayma) o.frequency.exponentialRampToValueAtTime(Math.max(30, frek * kayma), t + sure);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(kazanc, t + .012); g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
      o.connect(g); g.connect(hedef || this.ana); o.start(t); o.stop(t + sure + .05);
    },
    hisirti(t, sure, frek, kazanc, hedef = null) {
      const k = this.ctx.createBufferSource(); k.buffer = this.gurultu;
      const f = this.ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = frek; f.Q.value = 1.2;
      const g = this.ctx.createGain(); g.gain.setValueAtTime(kazanc, t); g.gain.exponentialRampToValueAtTime(.0001, t + sure);
      k.connect(f); f.connect(g); g.connect(hedef || this.ana); k.start(t); k.stop(t + sure + .05);
    },
    /* Piyanoya benzeyen ton: sinüs + hafif üçgen, uzun sönüm */
    piyano(frek, t, sure, kazanc) {
      const m = this.muzikKazanc;
      this.nota(frek, t, sure, "sine", kazanc, m); this.nota(frek * 2, t, sure * .5, "triangle", kazanc * .18, m); this.nota(frek * 3, t, sure * .25, "sine", kazanc * .08, m);
    },
    efekt(ad) {
      if (!this.efektAcik) return; this.baslat(); if (!this.ctx) return;
      const t = this.ctx.currentTime;
      switch (ad) {
        case "dogru": this.nota(880, t, .18, "sine", .22); this.nota(1318.5, t + .08, .32, "sine", .2); this.nota(2637, t + .08, .2, "sine", .04); break;
        case "yanlis": this.nota(196, t, .22, "square", .06); this.nota(146.8, t + .1, .3, "square", .06); break;
        case "tik": this.nota(1500, t, .04, "square", .03); break;
        case "seri": [523.3, 659.3, 784, 1046.5].forEach((f, i) => this.nota(f, t + i * .07, .25, "triangle", .14)); break;
        case "bitis": [392, 523.3, 659.3, 784, 1046.5].forEach((f, i) => this.nota(f, t + i * .11, .5, "triangle", .15)); this.hisirti(t + .5, .7, 6000, .05); break;
        case "tara": this.nota(300, t, .5, "sine", .06, null, 6); break;
        case "dokun": this.nota(660, t, .06, "sine", .05); break;
        case "sec": this.nota(520, t, .08, "triangle", .08); break;
        case "kirik": this.hisirti(t, .25, 3000, .12); this.nota(140, t, .2, "sine", .2, null, .5); break;
        case "basla": [440, 554.4, 659.3].forEach((f, i) => this.nota(f, t + i * .06, .3, "triangle", .12)); break;
      }
    },
    /* Üretken müzik parçaları. Her parça her sekizlik notada bir kez çağrılır: (Ses, zaman, adım, sekizlik süresi) */
    parca: "yildiz",
    PARCALAR: {
      yildiz: { ad: "Yıldız Tozu", aciklama: "Sakin arpej, uzay boşluğu", bpm: 84,
        akor: [[220, 261.6, 329.6], [174.6, 220, 261.6], [261.6, 329.6, 392], [196, 246.9, 293.7]],
        calis(S, t, n, e) {
          const akor = this.akor[Math.floor(n / 16) % 4], a = n % 16, m = S.muzikKazanc;
          if (a === 0) { akor.forEach((f) => S.nota(f, t, e * 15, "triangle", .03, m)); S.nota(akor[0] / 2, t, e * 7, "sine", .11, m); }
          if (a === 8) S.nota(akor[0] / 2, t, e * 7, "sine", .09, m);
          if (a % 2 === 0 || Math.random() < .28) S.nota(akor[Math.floor(Math.random() * 3)] * (Math.random() < .5 ? 2 : 4), t, e * 2.5, "sine", .045 + Math.random() * .03, m);
        } },
      lofi: { ad: "Lo-fi Çalışma", aciklama: "Yumuşak davul, caz akorları", bpm: 74,
        akor: [[146.8, 174.6, 220, 261.6], [196, 246.9, 293.7, 349.2], [130.8, 164.8, 196, 246.9], [110, 130.8, 164.8, 196]],
        gam: [293.7, 349.2, 392, 440, 523.3, 587.3],
        calis(S, t, n, e) {
          const akor = this.akor[Math.floor(n / 16) % 4], a = n % 16, m = S.muzikKazanc, sw = a % 2 ? e * .18 : 0;
          if (a === 0) { akor.forEach((f, i) => S.nota(f, t + i * .025, e * 14, "triangle", .022, m)); S.nota(akor[0] / 2, t, e * 6, "sine", .12, m); }
          if (a === 7) S.nota(akor[0] / 2, t + sw, e * 4, "sine", .08, m);
          if (a % 8 === 0 || a === 10) S.nota(110, t, .28, "sine", .2, m, .32);
          if (a % 8 === 4) S.hisirti(t, .16, 1800, .07, m);
          if (a % 2) S.hisirti(t + sw, .04, 8000, .025, m);
          if (a % 4 === 2 && Math.random() < .45) S.nota(this.gam[Math.floor(Math.random() * this.gam.length)], t + sw, e * 3, "triangle", .035, m);
        } },
      retro: { ad: "Retro Oyun", aciklama: "8-bit atari ezgisi", bpm: 128,
        akor: [[261.6, 329.6, 392], [196, 246.9, 293.7], [220, 261.6, 329.6], [174.6, 220, 261.6]],
        gam: [523.3, 587.3, 659.3, 784, 880, 1046.5],
        ezgi: [0, -1, 2, -1, 4, -1, 3, 2, 1, -1, 2, -1, 0, -1, -1, -1, 2, -1, 4, -1, 5, -1, 4, 3, 2, -1, 1, -1, 0, -1, -1, -1],
        calis(S, t, n, e) {
          const akor = this.akor[Math.floor(n / 8) % 4], a = n % 8, m = S.muzikKazanc;
          S.nota(akor[[0, 1, 2, 1][a % 4]] * 2, t, e * .8, "square", .034, m);
          if (a % 4 === 0) S.nota(akor[0] / 2, t, e * 1.7, "square", .06, m);
          if (a % 4 === 2) S.nota(akor[0], t, e * .9, "square", .035, m);
          const z = this.ezgi[n % 32]; if (z >= 0 && Math.floor(n / 32) % 2 === 1) S.nota(this.gam[z], t, e * 1.6, "triangle", .09, m);
          if (a === 0) S.nota(90, t, .15, "square", .09, m, .4);
          if (a % 2) S.hisirti(t, .03, 9000, .015, m);
        } },
      piyano: { ad: "Piyano Düşünce", aciklama: "Davulsuz, yavaş; soru çözerken", bpm: 60,
        akor: [[130.8, 164.8, 196, 246.9], [174.6, 220, 261.6, 329.6], [164.8, 196, 246.9, 293.7], [110, 130.8, 164.8, 196]],
        calis(S, t, n, e) {
          const akor = this.akor[Math.floor(n / 16) % 4], a = n % 16;
          if (a === 0) { S.piyano(akor[0] / 2, t, 4, .1); akor.forEach((f, i) => S.piyano(f, t + .06 * (i + 1), 3.5, .035)); }
          if (a === 8) S.piyano(akor[0] / 2, t, 3, .07);
          if (a % 2 === 0 && Math.random() < .5) S.piyano(akor[1 + Math.floor(Math.random() * 3)] * 2, t, 2.2, .05);
        } },
      fibonacci: { ad: "Fibonacci Ritmi", aciklama: "Notalar Fibonacci sayılarından, ritim Öklid ritminden", bpm: 96,
        gam: [220, 261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3, 784],
        bas: [110, 130.8, 146.8, 164.8, 196],
        oklid: [1, 0, 1, 1, 0, 1, 1, 0],          // E(5, 8): 5 vuruş 8 adıma eşit dağıtılır
        fib(k) { let a = 0, b = 1; for (let i = 0; i < k % 60; i++) [a, b] = [b, (a + b) % 1000]; return a; },
        calis(S, t, n, e) {
          const a = n % 8, m = S.muzikKazanc;
          if (this.oklid[a]) S.nota(this.gam[this.fib(n) % 10], t, e * 1.8, "triangle", .045, m);
          if (a === 0) { const f = this.bas[this.fib(Math.floor(n / 8)) % 5]; S.nota(f, t, e * 7, "sine", .12, m); S.nota(f * 1.5, t, e * 7, "triangle", .02, m); S.nota(100, t, .2, "sine", .16, m, .35); }
          if ([1, 0, 0, 1, 0, 0, 1, 0][a]) S.hisirti(t, .05, 7000, .02, m);
        } },
    },
    parcaSec(id) {
      if (!this.PARCALAR[id]) return;
      this.parca = id; this.adim = 0;
      try { localStorage.setItem("mc_muzik_parca", id); } catch (e) {}
    },
    muzikAc(acik) {
      this.baslat(); if (!this.ctx) return false;
      this.muzikAcik = acik;
      const t = this.ctx.currentTime;
      this.muzikKazanc.gain.cancelScheduledValues(t);
      this.muzikKazanc.gain.setTargetAtTime(acik ? .5 : 0, t, .4);
      if (acik && !this.zamanlayici) { this.sonraki = t + .1; this.zamanlayici = setInterval(() => this.planla(), 30); }
      if (!acik && this.zamanlayici) setTimeout(() => { if (!this.muzikAcik && this.zamanlayici) { clearInterval(this.zamanlayici); this.zamanlayici = null; } }, 1600);
      return true;
    },
    planla() {
      const p = this.PARCALAR[this.parca] || this.PARCALAR.yildiz, sekizlik = 60 / p.bpm / 2;
      while (this.sonraki < this.ctx.currentTime + .15) {
        p.calis(this, this.sonraki, this.adim, sekizlik);
        this.sonraki += sekizlik; this.adim++;
      }
    },
  };
  try { const k = localStorage.getItem("mc_efekt"); if (k === "0") Ses.efektAcik = false; const p = localStorage.getItem("mc_muzik_parca"); if (p && Ses.PARCALAR[p]) Ses.parca = p; } catch (e) {}
  MC.Ses = Ses;
})();
