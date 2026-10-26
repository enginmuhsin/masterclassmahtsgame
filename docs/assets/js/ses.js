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
    hisirti(t, sure, frek, kazanc) {
      const k = this.ctx.createBufferSource(); k.buffer = this.gurultu;
      const f = this.ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = frek; f.Q.value = 1.2;
      const g = this.ctx.createGain(); g.gain.setValueAtTime(kazanc, t); g.gain.exponentialRampToValueAtTime(.0001, t + sure);
      k.connect(f); f.connect(g); g.connect(this.ana); k.start(t); k.stop(t + sure + .05);
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
    /* Üretken müzik: Am – F – C – G, pentatonik arpej, yumuşak bas, hafif yankı */
    AKOR: [[220, 261.6, 329.6], [174.6, 220, 261.6], [261.6, 329.6, 392], [196, 246.9, 293.7]],
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
      const sekizlik = 60 / 84 / 2;
      while (this.sonraki < this.ctx.currentTime + .15) {
        const akor = this.AKOR[Math.floor(this.adim / 16) % 4], t = this.sonraki, a = this.adim % 16;
        if (a === 0) { akor.forEach((f) => this.nota(f, t, sekizlik * 15, "triangle", .03, this.muzikKazanc)); this.nota(akor[0] / 2, t, sekizlik * 7, "sine", .11, this.muzikKazanc); }
        if (a === 8) this.nota(akor[0] / 2, t, sekizlik * 7, "sine", .09, this.muzikKazanc);
        if (a % 2 === 0 || Math.random() < .28) {
          const oktav = Math.random() < .5 ? 2 : 4, f = akor[Math.floor(Math.random() * 3)] * oktav;
          this.nota(f, t, sekizlik * 2.5, "sine", .045 + Math.random() * .03, this.muzikKazanc);
        }
        this.sonraki += sekizlik; this.adim++;
      }
    },
  };
  try { const k = localStorage.getItem("mc_efekt"); if (k === "0") Ses.efektAcik = false; } catch (e) {}
  MC.Ses = Ses;
})();
