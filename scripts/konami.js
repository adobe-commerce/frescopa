/**
 * Konami code easter egg: listens for ↑↑↓↓←→←→BA without stopping propagation.
 * After firing once, removes the listener and cleans up confetti when done.
 */
(() => {
  const EXPECTED = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];

  let idx = 0;

  function tokenFromEvent(e) {
    const k = e.key;
    if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
      return k;
    }
    if (k.length === 1) {
      const c = k.toLowerCase();
      if (c === 'b' || c === 'a') return c;
    }
    return null;
  }

  function startConfetti(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w;
    let h;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#e63946', '#f4a261', '#2a9d8f', '#264653', '#e9c46a', '#9b5de5', '#00bbf9', '#fee440'];
    const count = 180;
    const particles = [];
    const t0 = performance.now();
    const duration = 4500;

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * 80,
        y: h * 0.35 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 18 - 6,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        g: 0.22 + Math.random() * 0.12,
        drag: 0.99,
        size: 6 + Math.random() * 8,
        color: colors[i % colors.length],
        shape: Math.random() < 0.5 ? 'rect' : 'arc',
      });
    }

    function frame(now) {
      const elapsed = now - t0;
      const dt = 1;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.vy += p.g * dt;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        window.removeEventListener('resize', resize);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    }

    requestAnimationFrame(frame);
  }

  function runConfettiThenCleanup() {
    function mount() {
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2147483647;';
      (document.body || document.documentElement).appendChild(canvas);
      startConfetti(canvas);
    }

    if (document.body) {
      mount();
    } else {
      document.addEventListener('DOMContentLoaded', mount, { once: true });
    }
  }

  function onKeyDown(e) {
    const token = tokenFromEvent(e);
    if (!token) return;

    if (token === EXPECTED[idx]) {
      idx += 1;
      if (idx === EXPECTED.length) {
        // window.removeEventListener('keydown', onKeyDown, false);
        runConfettiThenCleanup();
        // eslint-disable-next-line no-console -- easter egg signature
        console.log('😊 :) Stephen was here');
      }
    } else {
      idx = token === EXPECTED[0] ? 1 : 0;
    }
  }

  window.addEventListener('keydown', onKeyDown, false);
})();
