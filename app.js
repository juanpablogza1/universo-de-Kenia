/* El Universo — lógica de la app */
(() => {
  const app = document.getElementById('app');
  const KEY = 'el-universo-v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  let progress = load(); progress.done = progress.done || {};

  const STAR = on => `<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="${on ? '#ffd166' : 'rgba(255,255,255,.15)'}" stroke="${on ? '#ffe9a8' : 'none'}" stroke-width="1"/></svg>`;
  const stars = (n, cls) => `<span class="${cls || 'stars'}">${[0, 1, 2].map(i => STAR(i < n)).join('')}</span>`;
  const BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  const HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>';

  /* ---------- Fondo de estrellas ---------- */
  const sky = document.getElementById('sky'), sctx = sky.getContext('2d');
  let skyStars = [], shoot = null;
  function sizeSky() {
    const d = Math.min(2, window.devicePixelRatio || 1);
    sky.width = innerWidth * d; sky.height = innerHeight * d; sctx.setTransform(d, 0, 0, d, 0, 0);
    const r = rnd(99); skyStars = [...Array(Math.round(innerWidth * innerHeight / 3500))].map(() => ({ x: r() * innerWidth, y: r() * innerHeight, s: r() * 1.4 + 0.3, p: r() * TAU, v: 0.5 + r() * 2 }));
  }
  function drawSky(t) {
    sctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of skyStars) { sctx.globalAlpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.v + s.p)); sctx.fillStyle = '#fff'; sctx.fillRect(s.x, (s.y + t * 2 * s.s) % innerHeight, s.s, s.s); }
    sctx.globalAlpha = 1;
    if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * innerWidth, y: Math.random() * innerHeight * 0.5, t: 0 };
    if (shoot) {
      shoot.t += 0.02; const k = shoot.t, x = shoot.x + k * 300, y = shoot.y + k * 140;
      const g = sctx.createLinearGradient(x - 80, y - 37, x, y); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, `rgba(255,255,255,${1 - k})`);
      sctx.strokeStyle = g; sctx.lineWidth = 2; sctx.beginPath(); sctx.moveTo(x - 80, y - 37); sctx.lineTo(x, y); sctx.stroke();
      if (k >= 1) shoot = null;
    }
  }

  /* ---------- Animación de la diapositiva ---------- */
  let cur = null; // {canvas, ctx, fn, s, opts, t0, w, h}
  function mountAnim(el, slide) {
    const canvas = document.createElement('canvas'); el.prepend(canvas);
    cur = { canvas, ctx: canvas.getContext('2d'), fn: ANIMS[slide.anim], s: { taps: [] }, opts: Object.assign({}, slide.opts || {}), t0: performance.now(), controls: slide.controls || [] };
    cur.controls.forEach(c => { cur.s[c.key] = c.type === 'range' ? c.value : (cur.opts[c.key] || c.options[0][0]); });
    canvas.addEventListener('pointerdown', e => {
      const r = canvas.getBoundingClientRect();
      cur.s.taps.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: (performance.now() - cur.t0) / 1000 });
      const hint = el.querySelector('.tap-hint'); if (hint) hint.remove();
    });
    sizeAnim();
  }
  function sizeAnim() {
    if (!cur) return;
    const d = Math.min(2.5, window.devicePixelRatio || 1), w = cur.canvas.parentElement.clientWidth, h = Math.round(Math.min(w * 0.78, innerHeight * 0.42));
    cur.canvas.width = w * d; cur.canvas.height = h * d; cur.canvas.style.height = h + 'px';
    cur.ctx.setTransform(d, 0, 0, d, 0, 0); cur.w = w; cur.h = h;
  }
  function frame(now) {
    const t = now / 1000;
    drawSky(t);
    if (cur && cur.fn && document.body.contains(cur.canvas)) {
      const c = cur.ctx; c.clearRect(0, 0, cur.w, cur.h);
      try { cur.fn(c, cur.w, cur.h, (now - cur.t0) / 1000, cur.s, cur.opts); } catch (e) { console.error(e); cur.fn = null; }
      cur.controls.forEach(ct => {
        if (ct.type !== 'range') return;
        const inp = document.getElementById('c-' + ct.key), out = document.getElementById('v-' + ct.key); if (!inp) return;
        if (ct.auto && !cur.s['_m' + ct.key]) inp.value = cur.s[ct.key];
        const txt = cur.s[ct.key + '_txt'];
        out.textContent = txt !== undefined ? txt : Math.round(cur.s[ct.key] * 10) / 10;
      });
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', () => { sizeSky(); sizeAnim(); });

  /* ---------- Inicio ---------- */
  function home() {
    cur = null;
    const done = Object.keys(progress.done).length, totalStars = Object.values(progress.done).reduce((a, b) => a + b, 0);
    app.innerHTML = `
      <section class="hero">
        <div class="orbit-logo"><div class="ring"></div><div class="planet"></div><div class="moon"></div></div>
        <h1>El Universo</h1>
        <p>${LESSONS.length} viajes cortos por el cosmos</p>
      </section>
      <div class="progress-card">
        <div class="row"><span>${done} de ${LESSONS.length} lecciones</span><span>${totalStars} / ${LESSONS.length * 3} estrellas</span></div>
        <div class="bar"><i style="width:${done / LESSONS.length * 100}%"></i></div>
      </div>
      <div class="lessons">
        ${LESSONS.map((l, i) => {
          const sc = progress.done[l.id];
          const inter = l.slides.some(x => x.controls || x.tap);
          const head = i === 0 ? '<h2 class="level-h">Nivel 1 · Lo básico</h2>' : i === 10 ? '<h2 class="level-h">Nivel 2 · Explorando más</h2>' : '';
          return `${head}<button class="lesson-card ${sc !== undefined ? 'done' : ''}" data-i="${i}" style="animation-delay:${i * 0.05}s">
            <div class="orb" style="background:${l.orb}">${i + 1}</div>
            <div class="info"><h3>${l.title}</h3><p>${l.sub}</p></div>
            <div class="meta"><span>${l.min} min</span>${inter ? '<span class="tag">interactiva</span>' : ''}${sc !== undefined ? stars(sc) : ''}</div>
          </button>`;
        }).join('')}
      </div>`;
    app.querySelectorAll('.lesson-card').forEach(b => b.onclick = () => openLesson(+b.dataset.i));
    scrollTo(0, 0);
  }

  /* ---------- Lección ---------- */
  let L = null, step = 0, answers = [], dir = 1;
  function openLesson(i) { L = { ...LESSONS[i], index: i }; step = 0; answers = []; dir = 1; render(); }
  const totalSteps = () => L.slides.length + L.quiz.length + 1;

  function topbar() {
    const n = totalSteps() - 1;
    return `<div class="topbar">
      <button class="icon-btn" id="home">${HOME}</button>
      <div class="dots">${[...Array(n)].map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>
    </div>`;
  }

  function render() {
    cur = null; scrollTo(0, 0);
    if (step < L.slides.length) return renderSlide(L.slides[step]);
    if (step < L.slides.length + L.quiz.length) return renderQuiz(step - L.slides.length);
    return renderResult();
  }

  function renderSlide(sl) {
    app.innerHTML = `${topbar()}
      <div class="slide ${dir < 0 ? 'back' : ''}">
        <div class="lesson-title">Lección ${L.index + 1} · ${L.title}</div>
        <h2>${sl.h}</h2>
        <div class="stage" id="stage">${sl.tap ? '<div class="tap-hint">Toca la animación</div>' : ''}${controlsHTML(sl)}</div>
        <p class="text">${sl.t}</p>
        ${sl.fact ? `<div class="fact"><strong>Dato:</strong>${sl.fact}</div>` : ''}
      </div>
      <div class="nav">
        <button class="btn" id="prev" ${step === 0 ? 'disabled' : ''}>Atrás</button>
        <button class="btn primary" id="next">${step === L.slides.length - 1 ? 'Ir al reto' : 'Siguiente'}</button>
      </div>`;
    const stage = document.getElementById('stage');
    mountAnim(stage, sl);
    bindControls(sl);
    document.getElementById('home').onclick = home;
    document.getElementById('prev').onclick = () => { if (step > 0) { step--; dir = -1; render(); } };
    document.getElementById('next').onclick = () => { step++; dir = 1; render(); };
    swipe(stage.parentElement);
  }

  function controlsHTML(sl) {
    if (!sl.controls) return '';
    return `<div class="controls">${sl.controls.map(c => c.type === 'range'
      ? `<label for="c-${c.key}">${c.label}</label><input id="c-${c.key}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}"><label id="v-${c.key}">${c.value}</label>`
      : c.options.map(([v, n]) => `<button class="chip ${((sl.opts && sl.opts[c.key]) || c.options[0][0]) === v ? 'on' : ''}" data-k="${c.key}" data-v="${v}">${n}</button>`).join('')).join('')}</div>`;
  }
  function bindControls(sl) {
    (sl.controls || []).forEach(c => {
      if (c.type === 'range') {
        const inp = document.getElementById('c-' + c.key), out = document.getElementById('v-' + c.key);
        inp.oninput = () => { cur.s['_m' + c.key] = true; cur.s[c.key] = +inp.value; };
        ['touchstart', 'touchmove'].forEach(ev => inp.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
      } else {
        app.querySelectorAll(`.chip[data-k="${c.key}"]`).forEach(b => b.onclick = () => {
          app.querySelectorAll(`.chip[data-k="${c.key}"]`).forEach(x => x.classList.toggle('on', x === b));
          cur.s[c.key] = b.dataset.v; cur.s['_m' + c.key] = true;
          if (c.reset !== false) { cur.t0 = performance.now(); cur.s.taps = []; cur.s._tn = 0; }
        });
      }
    });
  }
  function swipe(el) {
    let x0 = null, y0 = null;
    el.addEventListener('touchstart', e => { if (e.target.closest('.controls')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx < 0) { step++; dir = 1; render(); } else if (step > 0) { step--; dir = -1; render(); } }
    });
  }

  function renderQuiz(qi) {
    const q = L.quiz[qi];
    app.innerHTML = `${topbar()}
      <div class="slide">
        <span class="badge">Reto ${qi + 1} de ${L.quiz.length}</span>
        <div class="quiz-q">${q.q}</div>
        <div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div>
        <div id="explain"></div>
      </div>
      <div class="nav"><button class="btn" id="prev">Atrás</button><button class="btn primary" id="next" disabled>Siguiente</button></div>`;
    document.getElementById('home').onclick = home;
    document.getElementById('prev').onclick = () => { step--; dir = -1; render(); };
    const next = document.getElementById('next');
    next.onclick = () => { step++; dir = 1; render(); };
    const opts = app.querySelectorAll('.opt');
    const reveal = (pick, first) => {
      opts.forEach((b, i) => { b.disabled = true; if (i === q.a) b.classList.add('ok'); else if (i === pick) b.classList.add('bad'); });
      const ok = pick === q.a;
      document.getElementById('explain').innerHTML = `<div class="explain"><b style="color:${ok ? 'var(--ok)' : 'var(--bad)'}">${ok ? '¡Correcto!' : 'Casi.'}</b> ${q.e}</div>`;
      if (first) answers[qi] = ok;
      next.disabled = false;
    };
    if (answers[qi] !== undefined) reveal(answers[qi] ? q.a : -1, false);
    opts.forEach(b => b.onclick = () => reveal(+b.dataset.i, answers[qi] === undefined));
  }

  function renderResult() {
    const score = answers.filter(Boolean).length;
    const prev = progress.done[L.id];
    progress.done[L.id] = Math.max(score, prev || 0); save(progress);
    const msg = score === 3 ? '¡Perfecto!' : score === 2 ? '¡Muy bien!' : score === 1 ? '¡Buen intento!' : '¡Lección completada!';
    const nextL = L.index + 1 < LESSONS.length ? LESSONS[L.index + 1] : null;
    app.innerHTML = `${topbar()}
      <div class="result slide">
        <div class="big-stars">${[0, 1, 2].map(i => STAR(i < score)).join('')}</div>
        <h2>${msg}</h2>
        <p>Acertaste ${score} de ${L.quiz.length} en "${L.title}".</p>
        <div class="summary"><h3>Lo que aprendiste</h3><ul>${L.slides.map(s => `<li>${s.h}</li>`).join('')}</ul></div>
      </div>
      <div class="nav">
        <button class="btn" id="again">Repetir</button>
        ${nextL ? `<button class="btn primary" id="nextL">Siguiente: ${nextL.title}</button>` : `<button class="btn primary" id="toHome">Inicio</button>`}
      </div>`;
    document.getElementById('home').onclick = home;
    document.getElementById('again').onclick = () => openLesson(L.index);
    if (nextL) document.getElementById('nextL').onclick = () => openLesson(L.index + 1);
    else document.getElementById('toHome').onclick = home;
  }

  try { screen.orientation && screen.orientation.lock && screen.orientation.lock('portrait').catch(() => {}); } catch (e) {}
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  sizeSky(); home(); requestAnimationFrame(frame);
})();
