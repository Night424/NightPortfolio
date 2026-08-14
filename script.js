document.addEventListener('DOMContentLoaded', () => {

  // Live clock in the welcome bar
  const clock = document.getElementById('clock');
  const tick = () => {
    if (clock) clock.textContent = new Date().toLocaleTimeString();
  };
  tick();
  setInterval(tick, 1000);

  // Current year in footer
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Retro visitor "hit counter" — random-ish, sticky per browser
  const hit = document.getElementById('hitcount');
  if (hit) {
    let n = parseInt(localStorage.getItem('nightspace_hits') || '13337', 10) + 1;
    localStorage.setItem('nightspace_hits', n);
    hit.textContent = n.toLocaleString('en-US').padStart(6, '0');
  }

  // ===== Real profile song: a lofi loop synthesized with Web Audio =====
  const playBtn = document.getElementById('playBtn');
  const bar = document.querySelector('.ms-progress-bar');
  if (playBtn && bar) {
    let ctx = null, master = null, timer = null, step = 0, nextTime = 0;
    let playing = false;

    // "Midnight Voltage" — Am · F · C · G, dreamy lofi
    const BPM = 72;
    const stepDur = 60 / BPM / 2; // eighth notes
    const N = f => 440 * Math.pow(2, (f - 69) / 12); // midi -> Hz
    const chords = [
      [57, 60, 64], // Am
      [53, 57, 60], // F
      [48, 52, 55], // C
      [55, 59, 62]  // G
    ];

    function voice(freq, t, dur, type, gain, filterHz) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = filterHz;
      o.type = type;
      o.frequency.value = freq;
      // detune a hair for warmth
      o.detune.value = (Math.random() * 8) - 4;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(lp); lp.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + 0.05);
    }

    function drum(t, freq, dur, gain) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(freq * 0.4, t + dur);
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + 0.02);
    }

    function scheduler() {
      while (nextTime < ctx.currentTime + 0.2) {
        const bar16 = step % 16;
        const chord = chords[Math.floor(bar16 / 4) % 4];
        // pad chord on each beat
        if (bar16 % 4 === 0) {
          chord.forEach(m => voice(N(m + 12), nextTime, stepDur * 4.2, 'triangle', 0.05, 1400));
          voice(N(chord[0] - 12), nextTime, stepDur * 4.2, 'sine', 0.10, 500); // bass
        }
        // soft kick on beats 1 & 3
        if (bar16 === 0 || bar16 === 8) drum(nextTime, 90, 0.32, 0.5);
        // gentle melody plink
        if (bar16 % 4 === 2) voice(N(chord[2] + 24), nextTime, stepDur * 2, 'sine', 0.04, 3000);

        nextTime += stepDur;
        step++;
      }
    }

    function start() {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (!master) {
        master = ctx.createGain();
        master.gain.value = 0.7;
        master.connect(ctx.destination);
      }
      ctx.resume();
      nextTime = ctx.currentTime + 0.1;
      timer = setInterval(scheduler, 40);
    }
    function stop() {
      clearInterval(timer);
      if (ctx) ctx.suspend();
    }

    playBtn.addEventListener('click', () => {
      playing = !playing;
      playBtn.innerHTML = playing
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
      bar.classList.toggle('playing', playing);
      playing ? start() : stop();
    });
  }

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
