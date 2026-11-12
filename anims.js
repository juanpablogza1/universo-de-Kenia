/* Animaciones en canvas para El Universo.
   Cada animación: (ctx, w, h, t, s, opts) -> dibuja un cuadro.
   t = segundos desde que inició la diapositiva, s = estado persistente. */
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
function rnd(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }
function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(TAU * r()); }
function circle(ctx, x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
function glow(ctx, x, y, r, inner, outer) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(0.1, r));
  g.addColorStop(0, inner); g.addColorStop(1, outer || 'rgba(0,0,0,0)');
  circle(ctx, x, y, r, g);
}
function fs(w) { return Math.max(11, Math.round(w / 28)); }
function label(ctx, text, x, y, size, color, align, weight) {
  ctx.font = `${weight || 800} ${size}px Nunito, system-ui, sans-serif`;
  ctx.fillStyle = color || '#dfe3ff'; ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}
function pill(ctx, text, x, y, size, color) {
  ctx.font = `800 ${size}px Nunito, system-ui, sans-serif`;
  const tw = ctx.measureText(text).width, ph = size * 1.8;
  ctx.fillStyle = 'rgba(10,8,34,.72)'; ctx.strokeStyle = color || 'rgba(160,140,255,.5)'; ctx.lineWidth = 1;
  roundRect(ctx, x - tw / 2 - size * 0.8, y - ph / 2, tw + size * 1.6, ph, ph / 2); ctx.fill(); ctx.stroke();
  label(ctx, text, x, y + 1, size, color || '#fff');
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function arrow(ctx, x1, y1, x2, y2, color, lw) {
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw || 2;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const a = Math.atan2(y2 - y1, x2 - x1), L = 6 + (lw || 2) * 2;
  ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45));
  ctx.lineTo(x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
}
function earth(ctx, x, y, r, rot) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, '#9fd4ff'); g.addColorStop(0.6, '#2f7fe0'); g.addColorStop(1, '#123a8a');
  circle(ctx, x, y, r, g);
  if (r > 5) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
    ctx.fillStyle = 'rgba(80,200,120,.85)';
    const o = ((rot || 0) % 1) * r * 4;
    const blobs = [[0, -0.35, 0.32, 0.2, 0.5], [0.25, 0.05, 0.16, 0.3, -0.2], [1.3, -0.2, 0.22, 0.34, 0.3], [1.55, 0.35, 0.18, 0.12, 0], [2.6, 0.25, 0.3, 0.18, -0.4], [2.9, -0.45, 0.14, 0.1, 0]];
    for (let k = -1; k < 2; k++) {
      const bx = x - r * 2 + o + k * r * 4;
      blobs.forEach(([dx, dy, a, b, rt]) => { ctx.beginPath(); ctx.ellipse(bx + dx * r, y + dy * r, a * r, b * r, rt, 0, TAU); ctx.fill(); });
    }

    ctx.restore();
  }
  glow(ctx, x, y, r * 1.35, 'rgba(120,190,255,0)', 'rgba(120,190,255,0)');
  ctx.strokeStyle = 'rgba(160,210,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r + 1, 0, TAU); ctx.stroke();
}
function sunBall(ctx, x, y, r) {
  glow(ctx, x, y, r * 2.4, 'rgba(255,190,80,.45)', 'rgba(255,120,20,0)');
  const g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.1, x, y, r);
  g.addColorStop(0, '#fffbe0'); g.addColorStop(0.5, '#ffd34d'); g.addColorStop(1, '#ff8a1f');
  circle(ctx, x, y, r, g);
}
function spiralPoints(n, seed, arms) {
  const r = rnd(seed), pts = [];
  for (let i = 0; i < n; i++) {
    if (i < n * 0.22) { const rr = Math.abs(gauss(r)) * 0.12; const a = r() * TAU; pts.push({ r: rr, a, c: 0, s: r() }); continue; }
    const arm = Math.floor(r() * (arms || 2)); const rr = 0.08 + Math.pow(r(), 0.8) * 0.92;
    const a = arm * TAU / (arms || 2) + rr * 5.2 + gauss(r) * 0.28;
    pts.push({ r: rr, a, c: r() < 0.06 ? 2 : 1, s: r() });
  }
  return pts;
}
function drawSpiral(ctx, pts, cx, cy, R, rot, tilt, alpha) {
  glow(ctx, cx, cy, R * 0.35, `rgba(255,230,170,${0.8 * alpha})`, 'rgba(255,200,120,0)');
  for (const p of pts) {
    const a = p.a + rot, x = cx + Math.cos(a) * p.r * R, y = cy + Math.sin(a) * p.r * R * tilt;
    const col = p.c === 0 ? `rgba(255,225,170,${0.9 * alpha})` : p.c === 2 ? `rgba(255,120,200,${0.9 * alpha})` : `rgba(180,205,255,${(0.45 + p.s * 0.5) * alpha})`;
    ctx.fillStyle = col; ctx.fillRect(x, y, p.c === 2 ? 2 : 1.4, p.c === 2 ? 2 : 1.4);
  }
}

const ANIMS = {};
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
/* Valor de un control: automático hasta que el usuario lo toca. */
function ctl(s, key, auto) { if (!s['_m' + key]) s[key] = auto; return s[key]; }
function newTaps(s) { const n = (s.taps || []).length, out = (s.taps || []).slice(s._tn || 0); s._tn = n; return out; }
function lastTap(s) { return s.taps && s.taps.length ? s.taps[s.taps.length - 1] : null; }
function wrapText(ctx, text, x, y, maxW, size, color, align, weight) {
  ctx.font = `${weight || 700} ${size}px Nunito, system-ui, sans-serif`;
  const words = text.split(' '), lines = []; let line = '';
  words.forEach(wd => { const test = line ? line + ' ' + wd : wd; if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = wd; } else line = test; });
  if (line) lines.push(line);
  lines.forEach((l, i) => label(ctx, l, x, y + i * size * 1.3, size, color, align, weight));
  return lines.length;
}

/* ---------- 1. Big Bang ---------- */
ANIMS.bang = (ctx, w, h, t, s) => {
  if (!s.p) { const r = rnd(7); s.p = [...Array(320)].map(() => ({ a: r() * TAU, v: 0.15 + r() * 0.85, z: r() })); }
  const cx = w / 2, cy = h / 2, M = Math.min(w, h), P = 8, p = t % P, e = clamp(p / 6.5, 0, 1);
  const fade = p > 7.3 ? 1 - (p - 7.3) / 0.7 : 1;
  ctx.globalAlpha = fade;
  if (p < 1.2) { const k = p / 1.2; glow(ctx, cx, cy, M * (0.06 + 0.6 * k), `rgba(255,255,255,${1 - k})`, 'rgba(255,180,90,0)'); }
  const rad = Math.max(w, h) * 0.6 * (1 - Math.pow(1 - e, 2.4));
  for (const q of s.p) {
    const d = rad * q.v, x = cx + Math.cos(q.a) * d, y = cy + Math.sin(q.a) * d;
    const hue = 45 + e * 190 * q.z, light = 95 - e * 25;
    const sz = e > 0.7 && q.z > 0.85 ? 2.8 : 1.2 + (1 - e) * 1.8;
    if (e > 0.7 && q.z > 0.85) glow(ctx, x, y, 7, `hsla(${hue},90%,80%,.8)`, 'rgba(0,0,0,0)');
    ctx.fillStyle = `hsl(${hue},${60 + e * 30}%,${light}%)`; ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
  }
  const f = fs(w);
  const txt = p < 1.6 ? '¡Big Bang!' : p < 4.2 ? 'El espacio crece y se enfría' : 'Nacen estrellas y galaxias';
  pill(ctx, txt, cx, h - f * 1.6, f);
  ctx.globalAlpha = 1;
};

ANIMS.balloon = (ctx, w, h, t, s) => {
  if (!s.d) {
    const r = rnd(3);
    s.d = [{ x: -0.5, y: 0.15 }, { x: 0.45, y: -0.25 }, ...[...Array(12)].map(() => { const a = r() * TAU, m = Math.sqrt(r()) * 0.8; return { x: Math.cos(a) * m, y: Math.sin(a) * m }; })];
  }
  const P = 6, ap = (t % P) / P, inf = ctl(s, 'inf', Math.round(100 * (1 - Math.pow(1 - Math.min(1, ap / 0.85), 2)))), sc = 0.35 + 0.65 * inf / 100, p = s._minf ? 0.5 : ap;
  s.inf_txt = Math.round(inf) + '%';
  const cx = w / 2, cy = h * 0.47, R = Math.min(w, h) * 0.4 * sc, f = fs(w);
  ctx.globalAlpha = p > 0.93 ? 1 - (p - 0.93) / 0.07 : 1;
  const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.05, cx, cy, R);
  g.addColorStop(0, 'rgba(200,170,255,.55)'); g.addColorStop(1, 'rgba(90,50,200,.25)');
  circle(ctx, cx, cy, R, g);
  ctx.strokeStyle = 'rgba(200,180,255,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
  ctx.fillStyle = 'rgba(160,130,255,.6)'; ctx.beginPath(); ctx.moveTo(cx - 5, cy + R + 8); ctx.lineTo(cx + 5, cy + R + 8); ctx.lineTo(cx, cy + R); ctx.fill();
  const pos = s.d.map(d => [cx + d.x * R, cy + d.y * R]);
  ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,209,102,.8)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pos[0][0], pos[0][1]); ctx.lineTo(pos[1][0], pos[1][1]); ctx.stroke(); ctx.setLineDash([]);
  pos.forEach(([x, y], i) => { glow(ctx, x, y, 6 + sc * 4, i < 2 ? 'rgba(255,230,150,1)' : 'rgba(200,220,255,.95)'); });
  const dist = Math.round(sc * 100);
  pill(ctx, `Distancia entre galaxias: ${dist}`, cx, f * 1.4, f, '#ffd166');
  pill(ctx, 'El espacio se estira', cx, h - f * 1.4, f);
  ctx.globalAlpha = 1;
};

ANIMS.timeline = (ctx, w, h, t) => {
  const ev = [
    { t: 0, n: 'Big Bang', d: 'hace 13,800 M años', up: true, c: '#fff' },
    { t: 0.00038, n: 'Primera luz', d: '380 mil años', up: false, c: '#ffd166' },
    { t: 0.2, n: 'Primeras estrellas', d: '~200 M años', up: true, hi: true, c: '#7fe3ff' },
    { t: 9.2, n: 'Nace el Sol', d: 'hace 4,600 M años', up: false, c: '#ffb347' },
    { t: 13.8, n: 'Hoy', d: '13,800 M años', up: true, c: '#3ee6a0' }];
  const P = 9, p = clamp((t % P) / 7.5, 0, 1), x0 = w * 0.08, x1 = w * 0.92, y = h * 0.52, f = fs(w);
  const X = tt => x0 + Math.pow(tt / 13.8, 0.4) * (x1 - x0);
  const g = ctx.createLinearGradient(x0, 0, x1, 0);
  g.addColorStop(0, '#fff'); g.addColorStop(0.15, '#ff9a3c'); g.addColorStop(0.5, '#8b6cff'); g.addColorStop(1, '#3fd0ff');
  ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const mx = lerp(x0, x1, ease(p));
  ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(mx, y); ctx.stroke(); ctx.lineCap = 'butt';
  ev.forEach((e, i) => {
    const ex = X(e.t), on = mx >= ex - 1, dy = e.up ? -1 : 1;
    const ox = i === 1 ? f * 2.2 : i === 2 ? f * 3 : 0, lv = e.hi ? h * 0.33 : h * 0.17;
    ctx.strokeStyle = on ? e.c : 'rgba(255,255,255,.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ex, y); ctx.lineTo(ex + ox, y + dy * lv); ctx.stroke();
    circle(ctx, ex, y, on ? 6 : 4, on ? e.c : 'rgba(255,255,255,.3)');
    ctx.globalAlpha = on ? 1 : 0.25;
    const al = i === 0 ? 'left' : i === ev.length - 1 ? 'right' : 'center';
    const lx = i === 0 ? ex - 4 : i === ev.length - 1 ? ex + 4 : ex + ox;
    const ly = e.hi ? h * 0.36 : h * 0.22;
    label(ctx, e.n, lx, y + dy * ly, f, e.c, al);
    label(ctx, e.d, lx, y + dy * (ly + f * 1.3), f * 0.82, '#aab0dd', al, 600);
    ctx.globalAlpha = 1;
  });
  glow(ctx, mx, y, 16, 'rgba(255,255,255,.9)');
};

ANIMS.redshift = (ctx, w, h, t, s) => {
  const away = (s.dir || 'lejos') === 'lejos';
  const P = 7, p = t % P, c = w * 0.2, v = (away ? 1 : -1) * c * 0.42, x0 = away ? w * 0.42 : w * 0.9, cy = h * 0.48, f = fs(w);
  const sx = x0 + v * p, cl = away ? '255,90,90' : '110,170,255', cr = away ? '110,170,255' : '255,90,90';
  for (let te = 0; te < p; te += 0.45) {
    const ex = x0 + v * te, r = c * (p - te), al = clamp(1 - r / (w * 0.85), 0, 1);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = `rgba(${cl},${al})`; ctx.beginPath(); ctx.arc(ex, cy, r, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
    ctx.strokeStyle = `rgba(${cr},${al})`; ctx.beginPath(); ctx.arc(ex, cy, r, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  }
  glow(ctx, sx, cy, 18, 'rgba(255,240,200,1)', 'rgba(180,140,255,0)');
  if (away) arrow(ctx, sx + 20, cy, sx + 50, cy, '#ffd166', 2.5); else arrow(ctx, sx - 20, cy, sx - 50, cy, '#ffd166', 2.5);
  label(ctx, 'galaxia', sx, cy - 28, f * 0.9, '#fff');
  earth(ctx, w * 0.07, cy, 12);
  label(ctx, 'Tierra', w * 0.07, cy + 26, f * 0.85);
  pill(ctx, away ? 'Se aleja: su luz llega estirada y más roja' : 'Se acerca: su luz llega apretada y más azul', w / 2, h - f * 1.4, f * 0.9, away ? '#ff8a8a' : '#8fb4ff');
};

/* ---------- 2. Sistema Solar ---------- */
const PLANETS = [
  ['Mercurio', 0.24, '#b9a89a', 0.38, 'r'], ['Venus', 0.62, '#e8c37a', 0.95, 'r'], ['Tierra', 1, '#4f9dff', 1, 'r'], ['Marte', 1.88, '#e0603c', 0.53, 'r'],
  ['Júpiter', 11.9, '#d9a066', 11.2, 'g'], ['Saturno', 29.5, '#e6cf8f', 9.45, 'g'], ['Urano', 84, '#8fe3e8', 4, 'i'], ['Neptuno', 165, '#4a6cff', 3.9, 'i']];
const TYPECOL = { r: '#ff9a5a', g: '#ffd166', i: '#7fe3ff' };
ANIMS.solar = (ctx, w, h, t, s, o) => {
  const cx = w / 2, cy = h * 0.5, rxMax = w * 0.47, f = fs(w), mode = (o && o.mode) || 'orbit';
  if (!s.belt) { const r = rnd(11); s.belt = [...Array(160)].map(() => ({ a: r() * TAU, d: r() })); }
  const items = PLANETS.map((pl, i) => {
    const rx = rxMax * (0.2 + i * 0.114), ry = rx * 0.45;
    const a = t * TAU / (4 * Math.pow(pl[1], 0.55)) + i * 1.3;
    return { pl, i, rx, ry, a, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, size: Math.max(2.5, Math.min(w / 40, 2.4 + Math.sqrt(pl[3]) * 1.6)) };
  });
  items.forEach(it => {
    ctx.strokeStyle = mode === 'type' ? TYPECOL[it.pl[4]] + '66' : 'rgba(160,150,255,.22)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, it.rx, it.ry, 0, 0, TAU); ctx.stroke();
  });
  const brx = rxMax * (0.2 + 3.5 * 0.114);
  ctx.fillStyle = 'rgba(200,190,170,.55)';
  s.belt.forEach(b => { const rr = brx * (0.96 + b.d * 0.08), a = b.a + t * 0.05; ctx.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.45, 1.3, 1.3); });
  const drawP = it => {
    const [name, , col] = it.pl;
    const g = ctx.createRadialGradient(it.x - it.size * 0.3, it.y - it.size * 0.3, 0, it.x, it.y, it.size);
    g.addColorStop(0, '#fff'); g.addColorStop(0.35, col); g.addColorStop(1, col);
    if (name === 'Saturno') { ctx.strokeStyle = 'rgba(240,220,160,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(it.x, it.y, it.size * 2, it.size * 0.6, -0.3, 0, TAU); ctx.stroke(); }
    circle(ctx, it.x, it.y, it.size, g);
    if (mode === 'type') { ctx.strokeStyle = TYPECOL[it.pl[4]]; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(it.x, it.y, it.size + 3, 0, TAU); ctx.stroke(); }
    label(ctx, name, clamp(it.x, f * 2.4, w - f * 2.4), it.y - it.size - f * 0.7, f * 0.68, '#dfe3ff', 'center', 700);
  };
  items.filter(i => Math.sin(i.a) < 0).forEach(drawP);
  sunBall(ctx, cx, cy, Math.min(w, h) * 0.05);
  items.filter(i => Math.sin(i.a) >= 0).forEach(drawP);
  if (mode === 'type') {
    [['Rocosos', 'r'], ['Gigantes de gas', 'g'], ['Gigantes de hielo', 'i']].forEach(([n, k], j) => {
      circle(ctx, f * 1.2, f * (1.3 + j * 1.5), f * 0.4, TYPECOL[k]); label(ctx, n, f * 2, f * (1.3 + j * 1.5), f * 0.85, TYPECOL[k], 'left');
    });
    label(ctx, 'Cinturón de asteroides', w - f * 0.6, h - f * 1, f * 0.8, '#d8ccb0', 'right');
  } else pill(ctx, 'Los de afuera van más lento', w / 2, h - f * 1.2, f * 0.85);
};

ANIMS.sizes = (ctx, w, h, t) => {
  const P = 10, p = t % P, f = fs(w);
  const total = PLANETS.reduce((a, pl) => a + pl[3] * 2, 0) + 7 * 0.8;
  const unit = Math.min(h * 0.3 / 11.2, (w * 0.86) / total), cy = h * 0.47;
  const sunR = 109 * unit;
  glow(ctx, -sunR + w * 0.06, cy, sunR * 1.08, 'rgba(255,200,80,.9)', 'rgba(255,120,0,0)');
  circle(ctx, -sunR + w * 0.05, cy, sunR, '#ffb63a');
  label(ctx, 'Sol', w * 0.025, h * 0.1, f * 0.85, '#ffd166', 'left');
  let x = w * 0.1;
  PLANETS.forEach((pl, i) => {
    const r = pl[3] * unit, k = clamp((p - i * 0.55) / 0.5, 0, 1);
    x += r;
    if (k > 0) {
      ctx.globalAlpha = k;
      const yy = cy + (1 - ease(k)) * 30;
      if (pl[0] === 'Saturno') { ctx.strokeStyle = 'rgba(240,220,160,.85)'; ctx.lineWidth = Math.max(1, r * 0.12); ctx.beginPath(); ctx.ellipse(x, yy, r * 1.7, r * 0.42, -0.25, 0, TAU); ctx.stroke(); }
      const g = ctx.createRadialGradient(x - r * 0.3, yy - r * 0.3, 0, x, yy, Math.max(1, r));
      g.addColorStop(0, '#fff'); g.addColorStop(0.3, pl[2]); g.addColorStop(1, pl[2]);
      circle(ctx, x, yy, Math.max(1.2, r), g);
      let ly;
      if (i < 4) {
        const lvl = [-2.6, 2.6, -1.4, 1.4][i] * f, ey = cy + lvl;
        ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, yy + Math.sign(lvl) * (r + 2)); ctx.lineTo(x, ey - Math.sign(lvl) * f * 0.5); ctx.stroke();
        ly = ey;
      } else ly = i % 2 === 0 ? cy - r - f * 1.0 : cy + r + f * 1.0;
      label(ctx, pl[0], i === 3 ? x + 4 : x, ly, f * 0.72, pl[0] === 'Tierra' ? '#7fc8ff' : '#dfe3ff', i === 3 ? 'right' : 'center', 700);
      ctx.globalAlpha = 1;
    }
    x += r + 0.8 * unit;
  });
  if (p > 5) pill(ctx, 'En Júpiter caben más de 1,300 Tierras', w / 2, h - f * 1.2, f * 0.85, '#ffd166');
};

/* ---------- 3. El Sol ---------- */
ANIMS.sun = (ctx, w, h, t, s) => {
  const cx = w * 0.4, cy = h * 0.5, R = Math.min(w, h) * 0.34, f = fs(w);
  if (!s.g) { const r = rnd(5); s.g = [...Array(90)].map(() => { const a = r() * TAU, d = Math.sqrt(r()) * 0.92; return { x: Math.cos(a) * d, y: Math.sin(a) * d, ph: r() * TAU, sz: 0.04 + r() * 0.05 }; }); }
  glow(ctx, cx, cy, R * 1.9, 'rgba(255,170,60,.4)', 'rgba(255,120,0,0)');
  for (let k = 0; k < 2; k++) {
    const a = -0.8 + k * 2.6 + Math.sin(t * 0.4 + k) * 0.1, hgt = R * (0.25 + 0.08 * Math.sin(t * 1.3 + k * 2));
    const x1 = cx + Math.cos(a - 0.12) * R, y1 = cy + Math.sin(a - 0.12) * R, x2 = cx + Math.cos(a + 0.12) * R, y2 = cy + Math.sin(a + 0.12) * R;
    const mx = cx + Math.cos(a) * (R + hgt * 1.8), my = cy + Math.sin(a) * (R + hgt * 1.8);
    ctx.strokeStyle = 'rgba(255,120,40,.85)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.lineCap = 'butt';
  }
  const g = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.1, cx, cy, R);
  g.addColorStop(0, '#fff6c8'); g.addColorStop(0.55, '#ffc23a'); g.addColorStop(1, '#ff6d12');
  circle(ctx, cx, cy, R, g);
  s.g.forEach(q => { const a = 0.1 + 0.12 * (1 + Math.sin(t * 2 + q.ph)); circle(ctx, cx + q.x * R, cy + q.y * R, q.sz * R, `rgba(255,250,220,${a})`); });
  const ex = w * 0.86, er = Math.max(1.6, R / 109);
  glow(ctx, ex, cy, 10, 'rgba(120,190,255,.7)');
  circle(ctx, ex, cy, er, '#6fb6ff');
  arrow(ctx, ex, cy - 34, ex, cy - 10, '#7fc8ff', 1.5);
  label(ctx, 'Tierra', ex, cy - 44, f * 0.85, '#7fc8ff');
  label(ctx, '(mismo tamaño a escala)', ex, cy + 22, f * 0.65, '#aab0dd', 'center', 600);
  pill(ctx, '109 Tierras de ancho', cx, h - f * 1.1, f * 0.85, '#ffd166');
};

ANIMS.fusion = (ctx, w, h, t) => {
  const P = 5, p = t % P, cx = w / 2, cy = h / 2, M = Math.min(w, h), f = fs(w), rP = M * 0.045;
  const k = ease(clamp(p / 2, 0, 1));
  if (p < 2.1) {
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy], i) => {
      const x = lerp(cx + dx * w * 0.36, cx + dx * rP * 0.7, k) + Math.sin(t * 9 + i) * 2 * (1 - k);
      const y = lerp(cy + dy * h * 0.32, cy + dy * rP * 0.7, k);
      glow(ctx, x, y, rP * 2, 'rgba(255,90,90,.4)');
      circle(ctx, x, y, rP, '#ff5a6a'); label(ctx, '+', x, y + 1, rP * 1.3, '#fff');
    });
    if (p < 1.6) pill(ctx, '4 núcleos de hidrógeno', cx, h - f * 1.2, f * 0.9, '#ff8a8a');
  }
  if (p >= 1.9 && p < 2.4) glow(ctx, cx, cy, M * 0.5 * ((p - 1.9) / 0.5), 'rgba(255,255,230,1)', 'rgba(255,200,80,0)');
  if (p >= 2.1) {
    const pulse = 1 + Math.sin(t * 6) * 0.04;
    [[-0.6, -0.6, 1], [0.6, -0.6, 0], [-0.6, 0.6, 0], [0.6, 0.6, 1]].forEach(([dx, dy, pr]) => {
      const x = cx + dx * rP * pulse, y = cy + dy * rP * pulse;
      circle(ctx, x, y, rP * 0.95, pr ? '#ff5a6a' : '#9aa4c8'); if (pr) label(ctx, '+', x, y + 1, rP * 1.2, '#fff');
    });
    const q = (p - 2.1) / 2.9;
    for (let i = 0; i < 8; i++) {
      const a = i * TAU / 8 + 0.2, r0 = rP * 2.5 + q * M * 0.45;
      ctx.strokeStyle = `rgba(255,220,100,${1 - q})`; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let j = 0; j <= 20; j++) {
        const d = r0 + j * 2.2, wv = Math.sin(j * 1.2 - t * 12) * 4;
        const x = cx + Math.cos(a) * d - Math.sin(a) * wv, y = cy + Math.sin(a) * d + Math.cos(a) * wv;
        j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    label(ctx, 'Helio', cx, cy + rP * 2.6, f, '#dfe3ff');
    pill(ctx, '1 helio + mucha energía (luz y calor)', cx, h - f * 1.2, f * 0.9, '#ffd166');
  }
};

ANIMS.sunlayers = (ctx, w, h, t, s) => {
  const cx = w * 0.36, cy = h * 0.52, R = Math.min(w * 0.33, h * 0.44), f = fs(w);
  if (!s.path || s.R !== R) {
    s.R = R; const r = rnd(21); let x = 0, y = 0; const pts = [[0, 0]];
    while (Math.hypot(x, y) < 0.7 * R && pts.length < 500) {
      const a = r() * TAU, d = Math.hypot(x, y) || 1;
      x += Math.cos(a) * R * 0.05 + x / d * R * 0.008; y += Math.sin(a) * R * 0.05 + y / d * R * 0.008; pts.push([x, y]);
    }
    const out = Math.atan2(y, x);
    for (let i = 0; i < 14; i++) { const d = Math.hypot(x, y) + R * 0.03; const a = out + Math.sin(i * 1.7) * 0.06; x = Math.cos(a) * d; y = Math.sin(a) * d; pts.push([x, y]); }
    for (let i = 0; i < 25; i++) { const d = Math.hypot(x, y) + R * 0.09; x = Math.cos(out) * d; y = Math.sin(out) * d; pts.push([x, y]); }
    s.path = pts;
  }
  glow(ctx, cx, cy, R * 1.5, 'rgba(255,160,60,.35)', 'rgba(255,100,0,0)');
  circle(ctx, cx, cy, R, '#ff7a1f');
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.arc(cx, cy, R * 0.7, 0, TAU, true); ctx.clip();
  for (let i = 0; i < 14; i++) {
    const a = i * TAU / 14 + t * 0.05; const mx = cx + Math.cos(a) * R * 0.85, my = cy + Math.sin(a) * R * 0.85;
    ctx.strokeStyle = 'rgba(255,220,140,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, R * 0.1, t * 2 + i, t * 2 + i + 4.5); ctx.stroke();
  }
  ctx.restore();
  circle(ctx, cx, cy, R * 0.7, '#ffa83a');
  circle(ctx, cx, cy, R * 0.25, '#fff2b0');
  glow(ctx, cx, cy, R * 0.3, 'rgba(255,255,255,.8)');
  const P = 9, n = Math.floor(clamp((t % P) / 7.5, 0, 1) * (s.path.length - 1));
  ctx.strokeStyle = 'rgba(120,220,255,.9)'; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const [x, y] = s.path[i]; i ? ctx.lineTo(cx + x, cy + y) : ctx.moveTo(cx + x, cy + y); }
  ctx.stroke();
  const [hx, hy] = s.path[n]; glow(ctx, cx + hx, cy + hy, 9, 'rgba(180,240,255,1)');
  const lx = w * 0.74;
  [['Núcleo', 0.12, '15 millones °C'], ['Zona radiativa', 0.48, ''], ['Zona convectiva', 0.85, ''], ['Superficie', 1, '5,500 °C']].forEach(([n2, rr, d], i) => {
    const ty = h * (0.2 + i * 0.2), px = cx + Math.cos(-0.5) * R * rr, py = cy + Math.sin(-0.5) * R * rr + (i - 1.5) * 4;
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lx - 6, ty); ctx.stroke();
    label(ctx, n2, lx, ty - (d ? f * 0.45 : 0), f * 0.8, '#fff', 'left'); if (d) label(ctx, d, lx, ty + f * 0.55, f * 0.7, '#ffd166', 'left', 700);
  });
  label(ctx, 'luz', cx + hx + 14, cy + hy, f * 0.75, '#9fe6ff', 'left');
};

/* ---------- 4. Estaciones ---------- */
ANIMS.seasons = (ctx, w, h, t, s) => {
  const cx = w / 2, cy = h * 0.46, a = w * 0.36, b = h * 0.24, f = fs(w), P = 12;
  const mes = ctl(s, 'mes', ((5 + t * 12 / P) % 12) + 1); s.mes_txt = MESES[(Math.round(mes) + 11) % 12];
  const th = Math.PI + (mes - 6) / 12 * TAU, ex = cx + Math.cos(th) * a, ey = cy + Math.sin(th) * b;
  const re = Math.min(w, h) * 0.075 * (1 + Math.sin(th) * 0.18);
  ctx.strokeStyle = 'rgba(160,150,255,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, TAU); ctx.stroke();
  const drawE = () => {
    earth(ctx, ex, ey, re, t * 0.3);
    const ang = Math.atan2(cy - ey, cx - ex);
    ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, re + 0.5, 0, TAU); ctx.clip();
    ctx.translate(ex, ey); ctx.rotate(ang);
    const g = ctx.createLinearGradient(-re, 0, re, 0); g.addColorStop(0, 'rgba(5,5,25,.82)'); g.addColorStop(0.48, 'rgba(5,5,25,.75)'); g.addColorStop(0.55, 'rgba(5,5,25,0)');
    ctx.fillStyle = g; ctx.fillRect(-re, -re, re * 2, re * 2); ctx.restore();
    const tilt = 23.5 * Math.PI / 180, ux = Math.sin(tilt), uy = -Math.cos(tilt);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ex - ux * re * 1.5, ey - uy * re * 1.5); ctx.lineTo(ex + ux * re * 1.5, ey + uy * re * 1.5); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,209,102,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ex - uy * re, ey + ux * re); ctx.lineTo(ex + uy * re, ey - ux * re); ctx.stroke();
    label(ctx, 'N', ex + ux * re * 1.5 + 8, ey + uy * re * 1.5, f * 0.75, '#fff');
  };
  if (Math.sin(th) < 0) drawE();
  sunBall(ctx, cx, cy, Math.min(w, h) * 0.09);
  if (Math.sin(th) >= 0) drawE();
  const c = Math.cos(th), sn = Math.sin(th);
  const lab = c < -0.7 ? ['Verano', 'junio', '#ffb347'] : c > 0.7 ? ['Invierno', 'diciembre', '#7fe3ff'] : sn < 0 ? ['Otoño', 'septiembre', '#ff8a5a'] : ['Primavera', 'marzo', '#3ee6a0'];
  pill(ctx, `En México: ${lab[0]}`, cx, h - f * 1.3, f * 0.95, lab[2]);
  label(ctx, 'Eje inclinado 23.5°, siempre hacia el mismo lado', cx, f * 1.1, f * 0.75, '#aab0dd', 'center', 700);
};

ANIMS.tiltlight = (ctx, w, h, t, s) => {
  const deg = ctl(s, 'ang', (Math.sin(t * 0.8) * 0.5 + 0.5) * 65); s.ang_txt = Math.round(deg) + '°';
  const f = fs(w), gy = h * 0.74, cx = w / 2, a = deg * Math.PI / 180, W = w * 0.16, L = h * 0.62;
  const dx = Math.sin(a), dy = Math.cos(a), nx = Math.cos(a), ny = -Math.sin(a);
  const sx = cx - dx * L, sy = gy - dy * L, half = W / 2 / Math.cos(a);
  const bright = Math.cos(a);
  const g = ctx.createLinearGradient(sx, sy, cx, gy); g.addColorStop(0, 'rgba(255,240,170,.85)'); g.addColorStop(1, `rgba(255,220,100,${0.25 + 0.4 * bright})`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(sx - nx * W / 2, sy - ny * W / 2); ctx.lineTo(sx + nx * W / 2, sy + ny * W / 2); ctx.lineTo(cx + half, gy); ctx.lineTo(cx - half, gy); ctx.closePath(); ctx.fill();
  sunBall(ctx, sx, sy, 14);
  ctx.fillStyle = '#2b5a3a'; ctx.fillRect(0, gy, w, h - gy);
  ctx.fillStyle = `rgba(255,220,80,${0.25 + 0.75 * bright})`; ctx.fillRect(cx - half, gy, half * 2, 6);
  for (let i = 0; i < 6; i++) { const x = cx - half + (i + 0.5) * half * 2 / 6; ctx.fillStyle = `rgba(255,160,60,${bright})`; ctx.fillRect(x - 2, gy - 10 * bright, 4, 10 * bright); }
  const pct = Math.round(bright * 100);
  pill(ctx, `Calor en cada pedacito de suelo: ${pct}%`, cx, h - f * 1.2, f * 0.9, pct > 70 ? '#ffb347' : '#7fe3ff');
  label(ctx, a < 0.4 ? 'Rayos directos = luz concentrada' : a > 0.8 ? 'Rayos inclinados = luz repartida' : '', cx, f * 1.2, f * 0.85, '#fff');
};

ANIMS.orbitdist = (ctx, w, h, t) => {
  const cx = w / 2, cy = h * 0.47, a = w * 0.34, b = h * 0.32, f = fs(w), P = 12, e = 0.0167;
  const th = t * TAU / P, off = a * e * 3;
  ctx.strokeStyle = 'rgba(160,150,255,.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, TAU); ctx.stroke();
  const sxp = cx + off; sunBall(ctx, sxp, cy, Math.min(w, h) * 0.08);
  const ex = cx + Math.cos(th) * a, ey = cy - Math.sin(th) * b; earth(ctx, ex, ey, Math.min(w, h) * 0.04, t * 0.3);
  ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(255,209,102,.6)'; ctx.beginPath(); ctx.moveTo(sxp, cy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const m = Math.floor(((th % TAU) / TAU) * 12 + 0.5) % 12;
  const dist = (149.6 * (1 - e * Math.cos(th))).toFixed(1);
  label(ctx, months[m], ex, ey - f * 1.6, f * 0.85, '#fff');
  pill(ctx, `Distancia al Sol: ${dist} millones de km`, cx, f * 1.2, f * 0.85, '#ffd166');
  const note = m === 0 || m === 11 || m === 1 ? 'Más cerca del Sol... ¡y es invierno en México!' : m >= 5 && m <= 7 ? 'Más lejos del Sol... ¡y es verano en México!' : 'Casi la misma distancia todo el año';
  pill(ctx, note, cx, h - f * 1.2, f * 0.82);
};

/* ---------- 5. La Luna ---------- */
function drawPhase(ctx, x, y, r, ph) {
  ph = ((ph % TAU) + TAU) % TAU;
  circle(ctx, x, y, r, '#2a2d44');
  const waxing = ph < Math.PI, c = Math.cos(ph), rx = Math.max(0.01, r * Math.abs(c));
  ctx.fillStyle = '#f2efdc'; ctx.beginPath();
  if (waxing) { ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, false); if (c > 0) ctx.ellipse(x, y, rx, r, 0, Math.PI / 2, -Math.PI / 2, true); else ctx.ellipse(x, y, rx, r, 0, Math.PI / 2, Math.PI * 1.5, false); }
  else { ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, true); if (c > 0) ctx.ellipse(x, y, rx, r, 0, Math.PI / 2, Math.PI * 1.5, false); else ctx.ellipse(x, y, rx, r, 0, Math.PI / 2, -Math.PI / 2, true); }
  ctx.fill();
  ctx.fillStyle = 'rgba(150,140,120,.25)';
  [[-0.3, -0.25, 0.18], [0.25, 0.2, 0.14], [-0.1, 0.4, 0.1], [0.35, -0.35, 0.08]].forEach(([a, b, c2]) => { ctx.beginPath(); ctx.arc(x + a * r, y + b * r, c2 * r, 0, TAU); ctx.fill(); });
}
const PHASES = ['Luna nueva', 'Creciente', 'Cuarto creciente', 'Gibosa creciente', 'Luna llena', 'Gibosa menguante', 'Cuarto menguante', 'Menguante'];
ANIMS.moonphases = (ctx, w, h, t, s) => {
  const P = 14, dia = ctl(s, 'dia', (t / P * 29.5) % 29.5), ph = (dia / 29.53 * TAU) % TAU; s.dia_txt = 'día ' + Math.round(dia);
  const f = fs(w), cx = w * 0.3, cy = h * 0.5, R = Math.min(w * 0.22, h * 0.36);
  for (let i = 0; i < 4; i++) arrow(ctx, w * 0.6, h * (0.2 + i * 0.2), w * 0.53, h * (0.2 + i * 0.2), 'rgba(255,209,102,.6)', 1.5);
  label(ctx, 'luz del Sol', w * 0.565, h * 0.1, f * 0.7, '#ffd166');
  ctx.strokeStyle = 'rgba(160,150,255,.3)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  const er = R * 0.22; earth(ctx, cx, cy, er, 0);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, er + 0.5, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(5,5,25,.75)'; ctx.fillRect(cx - er, cy - er, er, er * 2); ctx.restore();
  const mx = cx + Math.cos(ph) * R, my = cy - Math.sin(ph) * R, mr = R * 0.11;
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx, my); ctx.stroke();
  circle(ctx, mx, my, mr, '#2a2d44');
  ctx.fillStyle = '#f2efdc'; ctx.beginPath(); ctx.arc(mx, my, mr, -Math.PI / 2, Math.PI / 2); ctx.fill();
  label(ctx, 'Vista desde arriba', cx, h - f * 0.9, f * 0.72, '#aab0dd', 'center', 700);
  const vx = w * 0.8, vr = Math.min(w * 0.15, h * 0.28);
  glow(ctx, vx, cy, vr * 1.5, `rgba(240,235,200,${0.25 * (1 - Math.cos(ph)) / 2})`);
  drawPhase(ctx, vx, cy, vr, ph);
  label(ctx, 'Así la ves tú', vx, cy - vr - f * 1.1, f * 0.75, '#aab0dd', 'center', 700);
  const idx = Math.round(ph / (TAU / 8)) % 8;
  pill(ctx, PHASES[idx], vx, cy + vr + f * 1.4, f * 0.85, '#fff');
};

ANIMS.tidallock = (ctx, w, h, t) => {
  const f = fs(w), cx = w / 2, cy = h * 0.5, R = Math.min(w * 0.36, h * 0.38), ph = t * TAU / 9;
  ctx.strokeStyle = 'rgba(160,150,255,.3)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  earth(ctx, cx, cy, R * 0.25, t * 0.4);
  const mx = cx + Math.cos(ph) * R, my = cy + Math.sin(ph) * R, mr = R * 0.13;
  const g = ctx.createRadialGradient(mx - mr * 0.3, my - mr * 0.3, 0, mx, my, mr); g.addColorStop(0, '#f6f4e8'); g.addColorStop(1, '#9b998e');
  circle(ctx, mx, my, mr, g);
  const fx = mx - Math.cos(ph) * mr * 0.55, fy = my - Math.sin(ph) * mr * 0.55;
  circle(ctx, fx, fy, mr * 0.32, '#ff7ad9');
  ctx.strokeStyle = 'rgba(255,122,217,.4)'; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(cx, cy); ctx.stroke(); ctx.setLineDash([]);
  label(ctx, '384,400 km', cx, cy - R - f * 0.2 > f ? cy - R * 0.55 : cy, f * 0.75, '#aab0dd', 'center', 700);
  pill(ctx, 'La marca rosa siempre mira a la Tierra', cx, h - f * 1.1, f * 0.85, '#ff7ad9');
};

ANIMS.eclipse = (ctx, w, h, t, s) => {
  const P = 10, p = ctl(s, 'pos', (t % P) / P * 100) / 100; s.pos_txt = '';
  const f = fs(w), cx = w / 2, cy = h * 0.46, r = Math.min(w, h) * 0.2;
  const mx = lerp(-r * 1.4, w + r * 1.4, p), d = Math.abs(mx - cx), cover = clamp(1 - d / (2 * r), 0, 1);
  const dark = Math.pow(cover, 3);
  ctx.fillStyle = `rgb(${lerp(70, 8, dark)},${lerp(130, 8, dark)},${lerp(210, 34, dark)})`; ctx.fillRect(0, 0, w, h);
  if (dark > 0.5) { const r2 = rnd(4); ctx.fillStyle = `rgba(255,255,255,${(dark - 0.5) * 2})`; for (let i = 0; i < 40; i++) ctx.fillRect(r2() * w, r2() * h, 1.5, 1.5); }
  if (cover > 0.95) glow(ctx, cx, cy, r * 2.2, `rgba(220,230,255,${(cover - 0.95) * 16})`, 'rgba(180,200,255,0)');
  sunBall(ctx, cx, cy, r);
  circle(ctx, mx, cy, r * 1.04, '#11121c');
  ctx.fillStyle = '#1d3b24'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, h * 0.86); ctx.quadraticCurveTo(w * 0.3, h * 0.78, w * 0.55, h * 0.86); ctx.quadraticCurveTo(w * 0.8, h * 0.92, w, h * 0.82); ctx.lineTo(w, h); ctx.fill();
  pill(ctx, cover > 0.95 ? '¡Eclipse total! Se hace de noche' : 'La Luna pasa frente al Sol', cx, h - f * 1.2, f * 0.9, '#ffd166');
};

/* ---------- 6. Gravedad ---------- */
ANIMS.gravitywell = (ctx, w, h, t, s) => {
  const m = s.masa || 5; s.masa_txt = m;
  const f = fs(w), cx = w / 2, cy = h * 0.36, N = 16, depth = h * 0.085 * m;
  const z = (x, y) => -1 / (1 + (x * x + y * y) / 0.035);
  const proj = (x, y) => [cx + x * w * 0.46 - y * w * 0.08, cy + y * h * 0.32 - z(x, y) * depth * 0.7];
  ctx.lineWidth = 1;
  for (let i = 0; i <= N; i++) {
    const u = -1 + i * 2 / N;
    ctx.strokeStyle = `rgba(127,227,255,${0.25 + 0.2 * (1 - Math.abs(u))})`;
    ctx.beginPath(); for (let j = 0; j <= 40; j++) { const v = -1 + j * 2 / 40; const [X, Y] = proj(u, v); j ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    ctx.strokeStyle = `rgba(139,108,255,${0.25 + 0.2 * (1 - Math.abs(u))})`;
    ctx.beginPath(); for (let j = 0; j <= 40; j++) { const v = -1 + j * 2 / 40; const [X, Y] = proj(v, u); j ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
  }
  const [sx, sy] = proj(0, 0); sunBall(ctx, sx, sy - 10, Math.min(w, h) * (0.03 + 0.008 * m));
  const a = t * 0.63 * Math.sqrt(m), ox = Math.cos(a) * 0.42, oy = Math.sin(a) * 0.42, [px, py] = proj(ox, oy);
  earth(ctx, px, py - 6, Math.min(w, h) * 0.03, t * 0.5);
  pill(ctx, m > 6 ? 'Mucha masa: curva fuerte, la Tierra gira rápido' : m < 3 ? 'Poca masa: curva suave, gira lento' : 'Más masa = el espacio se curva más', cx, h - f * 1.1, f * 0.85);
};

ANIMS.cannon = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w / 2, cy = h * 0.56, R = Math.min(w, h) * 0.26, r0 = R * 1.18;
  const vc = TAU * r0 / 5, GM = vc * vc * r0, val = s.v || 5, v0 = vc * val / 7;
  if (!s.sim || s.simV !== val || s.R !== R) { s.sim = { x: 0, y: -r0, vx: v0, vy: 0, trail: [], state: 'fly', wait: 0 }; s.simV = val; s.R = R; s.last = t; }
  const dt = Math.min(0.05, t - (s.last || t)); s.last = t; const S = s.sim;
  if (S.state === 'fly') {
    for (let k = 0; k < 8; k++) {
      const h2 = dt / 8, d = Math.hypot(S.x, S.y), ac = GM / (d * d * d);
      S.vx -= S.x * ac * h2; S.vy -= S.y * ac * h2; S.x += S.vx * h2; S.y += S.vy * h2;
      const d2 = Math.hypot(S.x, S.y);
      if (d2 < R) { S.state = 'hit'; S.wait = 1.2; break; }
      if (d2 > Math.max(w, h) * 1.3) { S.state = 'gone'; S.wait = 1; break; }
    }
    S.trail.push([S.x, S.y]); if (S.trail.length > 420) S.trail.shift();
  } else { S.wait -= dt; if (S.wait <= 0) { s.sim = null; } }
  glow(ctx, cx, cy, R * 1.25, 'rgba(100,170,255,.35)');
  earth(ctx, cx, cy, R, t * 0.05);
  ctx.fillStyle = '#6b5a4a'; ctx.beginPath(); ctx.moveTo(cx - R * 0.25, cy - R * 0.96); ctx.lineTo(cx, cy - r0 - 2); ctx.lineTo(cx + R * 0.25, cy - R * 0.96); ctx.fill();
  ctx.fillStyle = '#ccc'; ctx.fillRect(cx - 8, cy - r0 - 6, 14, 6);
  const tr = S.trail; ctx.strokeStyle = 'rgba(255,209,102,.85)'; ctx.lineWidth = 2; ctx.beginPath();
  tr.forEach(([x, y], i) => i ? ctx.lineTo(cx + x, cy + y) : ctx.moveTo(cx + x, cy + y)); ctx.stroke();
  if (S.state !== 'gone') glow(ctx, cx + S.x, cy + S.y, 8, 'rgba(255,240,180,1)');
  const msg = val < 6.5 ? 'Muy lento: cae al suelo' : val < 7.5 ? '¡Órbita! Cae... pero nunca toca el suelo' : val < 9.9 ? 'Más rápido: órbita más alargada' : '¡Tan rápido que escapa!';
  pill(ctx, msg, cx, f * 1.2, f * 0.85, val >= 6.5 && val < 7.5 ? '#3ee6a0' : '#ffd166');
};

ANIMS.jump = (ctx, w, h, t, s) => {
  const f = fs(w), cols = [['Luna', 0.165, '#b9b6aa', '16%'], ['Tierra', 1, '#3c8a50', '100%'], ['Júpiter', 2.53, '#c9905a', '253%']];
  const gy = h * 0.78, gE = 1.633 * h * 0.82, v = 0.35 * gE;
  cols.forEach(([n, gm, col, pct], i) => {
    const x = w * (i + 0.5) / 3, g = gE * gm, T = 2 * v / g, cyc = T + 0.4, lt = lastTap(s);
    const tt = lt ? t - lt.t : t % cyc;
    const y = tt < T ? v * tt - g * tt * tt / 2 : 0;
    ctx.fillStyle = col; ctx.fillRect(w * i / 3 + 4, gy, w / 3 - 8, h - gy);
    const by = gy - y;
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(x, gy + 3, 12 * (1 - y / h), 3, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, by - 14); ctx.lineTo(x, by - 32); ctx.moveTo(x, by - 14); ctx.lineTo(x - 6, by); ctx.moveTo(x, by - 14); ctx.lineTo(x + 6, by);
    ctx.moveTo(x, by - 28); ctx.lineTo(x - 9, by - (y > 2 ? 40 : 22)); ctx.moveTo(x, by - 28); ctx.lineTo(x + 9, by - (y > 2 ? 40 : 22)); ctx.stroke(); ctx.lineCap = 'butt';
    circle(ctx, x, by - 39, 7, '#ffd6f5');
    label(ctx, n, x, gy + (h - gy) * 0.35, f * 0.9, '#fff');
    label(ctx, `pesas ${pct}`, x, gy + (h - gy) * 0.72, f * 0.72, '#fff', 'center', 700);
  });
  label(ctx, lastTap(s) ? 'Mismo salto, distinta gravedad' : 'Toca para saltar', w / 2, f * 1.1, f * 0.85, '#aab0dd');
};

/* ---------- 7. Estrellas ---------- */
ANIMS.starcolors = (ctx, w, h, t) => {
  const f = fs(w), st = [['3,000 °C', '#ff6a4a', 0.8], ['4,500 °C', '#ffa64d', 0.9], ['5,500 °C', '#fff1a8', 1], ['10,000 °C', '#f2f5ff', 1.15], ['30,000 °C', '#8fb4ff', 1.3]];
  const cy = h * 0.42, base = Math.min(w / 16, h / 9);
  st.forEach(([temp, col, sz], i) => {
    const x = w * (i + 0.5) / 5, r = base * sz * (1 + 0.05 * Math.sin(t * 3 + i));
    glow(ctx, x, cy, r * 2.6, col + 'aa'); circle(ctx, x, cy, r, col); glow(ctx, x, cy, r * 0.8, 'rgba(255,255,255,.8)');
    label(ctx, temp, x, cy + base * 2.4, f * 0.68, col, 'center', 800);
    if (i === 2) label(ctx, '(el Sol)', x, cy + base * 2.4 + f, f * 0.65, '#aab0dd', 'center', 700);
  });
  const y = h * 0.84, g = ctx.createLinearGradient(w * 0.08, 0, w * 0.92, 0);
  g.addColorStop(0, '#ff6a4a'); g.addColorStop(0.5, '#fff1a8'); g.addColorStop(1, '#8fb4ff');
  ctx.fillStyle = g; roundRect(ctx, w * 0.08, y - 5, w * 0.84, 10, 5); ctx.fill();
  label(ctx, 'más fría', w * 0.08, y - f * 1.1, f * 0.72, '#ff8a6a', 'left'); label(ctx, 'más caliente', w * 0.92, y - f * 1.1, f * 0.72, '#8fb4ff', 'right');
};

ANIMS.starlife = (ctx, w, h, t, s, o) => {
  const f = fs(w), type = s.type || (o && o.type) || 'sol', big = type === 'masiva';
  if (!s.cl) { const r = rnd(9); s.cl = [...Array(260)].map(() => ({ x: gauss(r), y: gauss(r) * 0.7, c: r() })); s.sh = [...Array(140)].map(() => ({ a: r() * TAU, v: 0.7 + r() * 0.3, c: r() })); }
  const P = 15, p = t % P, cx = w / 2, cy = h * 0.45, M = Math.min(w, h);
  const stages = big ? ['Nebulosa', 'Estrella azul', 'Supergigante roja', 'Supernova', 'Agujero negro'] : ['Nebulosa', 'Estrella', 'Gigante roja', 'Nebulosa planetaria', 'Enana blanca'];
  let si = 0;
  if (p < 3) {
    si = 0; const k = ease(p / 3);
    s.cl.forEach(q => { const sp = lerp(M * 0.35, M * 0.04, k); ctx.fillStyle = `hsla(${280 + q.c * 60},80%,70%,${0.35 + k * 0.4})`; ctx.fillRect(cx + q.x * sp, cy + q.y * sp, 2, 2); });
    glow(ctx, cx, cy, M * 0.08 * k, 'rgba(255,220,180,.9)');
  } else if (p < 6) {
    si = 1; const r = M * (big ? 0.09 : 0.06); const col = big ? '#9fbaff' : '#ffe27a';
    glow(ctx, cx, cy, r * 3, col + '99'); circle(ctx, cx, cy, r, col); glow(ctx, cx, cy, r * 0.8, 'rgba(255,255,255,.9)');
  } else if (p < 9) {
    si = 2; const k = ease((p - 6) / 3), r = M * lerp(big ? 0.09 : 0.06, big ? 0.3 : 0.24, k);
    const col = `rgb(255,${Math.round(lerp(big ? 200 : 226, 90, k))},${Math.round(lerp(big ? 255 : 122, 60, k))})`;
    glow(ctx, cx, cy, r * 1.6, 'rgba(255,90,60,.4)'); circle(ctx, cx, cy, r, col);
  } else if (p < 13.5) {
    const k = (p - 9) / 4.5;
    if (big) {
      if (k < 0.12) { glow(ctx, cx, cy, M * (0.3 + k * 4), 'rgba(255,255,255,1)', 'rgba(150,180,255,0)'); si = 3; }
      else {
        si = k < 0.45 ? 3 : 4;
        s.sh.forEach(q => { const d = M * 0.1 + k * M * 0.5 * q.v; ctx.fillStyle = `hsla(${q.c * 60 + 10},90%,65%,${1 - k})`; ctx.fillRect(cx + Math.cos(q.a) * d, cy + Math.sin(q.a) * d, 2.4, 2.4); });
        if (k > 0.3) { glow(ctx, cx, cy, M * 0.11, 'rgba(255,170,80,.6)'); circle(ctx, cx, cy, M * 0.045, '#000'); ctx.strokeStyle = 'rgba(255,200,120,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, M * 0.05, 0, TAU); ctx.stroke(); }
      }
    } else {
      si = k < 0.5 ? 3 : 4; const rr = M * (0.15 + k * 0.25);
      ctx.lineWidth = 8 * (1 - k * 0.5);
      ctx.strokeStyle = `rgba(80,220,255,${0.75 * (1 - k * 0.6)})`; ctx.beginPath(); ctx.ellipse(cx, cy, rr, rr * 0.85, 0.3, 0, TAU); ctx.stroke();
      ctx.strokeStyle = `rgba(255,100,160,${0.6 * (1 - k * 0.6)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(cx, cy, rr * 1.12, rr * 0.95, 0.3, 0, TAU); ctx.stroke();
      glow(ctx, cx, cy, M * 0.05, 'rgba(255,255,255,1)'); circle(ctx, cx, cy, M * 0.015, '#fff');
    }
  } else { si = 4; ctx.globalAlpha = 1 - (p - 13.5) / 1.5; if (big) circle(ctx, cx, cy, M * 0.045, '#000'); else circle(ctx, cx, cy, M * 0.015, '#fff'); ctx.globalAlpha = 1; }
  pill(ctx, stages[si], cx, f * 1.2, f * 0.95, '#fff');
  const y = h - f * 1.3, x0 = w * 0.08, x1 = w * 0.92;
  stages.forEach((n, i) => { const x = lerp(x0, x1, i / 4); circle(ctx, x, y, i <= si ? 6 : 4, i <= si ? (big ? '#8fb4ff' : '#ffd166') : 'rgba(255,255,255,.25)'); });
  ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
};

/* ---------- 8. Agujeros negros ---------- */
ANIMS.blackhole = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w / 2, cy = h * 0.5, M = Math.min(w, h), rh = M * 0.14;
  if (!s.d) { const r = rnd(13); s.d = [...Array(500)].map(() => ({ r: 1.5 + Math.pow(r(), 1.5) * 2.2, a: r() * TAU, c: r() })); }
  const drawDisk = back => {
    s.d.forEach(q => {
      const a = q.a + t * 1.6 / Math.pow(q.r, 1.5), x = cx + Math.cos(a) * q.r * rh, y = cy + Math.sin(a) * q.r * rh * 0.22;
      if ((Math.sin(a) < 0) !== back) return;
      const heat = 1 - (q.r - 1.5) / 2.2;
      ctx.fillStyle = `hsla(${20 + heat * 25},100%,${55 + heat * 35}%,${0.5 + heat * 0.5})`; ctx.fillRect(x, y, 2, 2);
    });
  };
  drawDisk(true);
  ctx.strokeStyle = 'rgba(255,170,80,.55)'; ctx.lineWidth = rh * 0.25;
  ctx.beginPath(); ctx.ellipse(cx, cy, rh * 1.35, rh * 1.25, 0, Math.PI, TAU); ctx.stroke();
  glow(ctx, cx, cy, rh * 1.5, 'rgba(255,190,120,.0)', 'rgba(255,150,60,0)');
  ctx.strokeStyle = 'rgba(255,230,180,.95)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, rh * 1.05, 0, TAU); ctx.stroke();
  circle(ctx, cx, cy, rh, '#000');
  drawDisk(false);
  label(ctx, 'horizonte de eventos', cx, cy - rh * 1.9, f * 0.8, '#ffd9a8');
  arrow(ctx, cx, cy - rh * 1.7, cx, cy - rh * 1.1, 'rgba(255,217,168,.8)', 1.5);
  pill(ctx, 'Gas muy caliente girando a su alrededor', cx, h - f * 1.2, f * 0.85, '#ffb347');
};

function traceRay(b, cx, w, h, rh) {
  const c = w * 0.5, k = c * c * rh * 1.15; let x = -cx, y = b, vx = c, vy = 0; const pts = []; let cap = false;
  for (let n = 0; n < 900; n++) {
    const dt = 0.004, d = Math.hypot(x, y), a = k / (d * d * d); vx -= x * a * dt; vy -= y * a * dt;
    const sp = Math.hypot(vx, vy); vx = vx / sp * c; vy = vy / sp * c; x += vx * dt; y += vy * dt;
    if (n % 3 === 0) pts.push([x, y]);
    if (d < rh) { cap = true; break; } if (x > w || Math.abs(y) > h) break;
  }
  return { pts, cap };
}
ANIMS.raybend = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w * 0.55, cy = h * 0.5, rh = Math.min(w, h) * 0.08;
  if (!s.rays || s.w !== w) { s.w = w; s.rays = []; for (let i = 0; i < 11; i++) s.rays.push(traceRay((i - 5) * h * 0.075 + 0.5, cx, w, h, rh)); s.extra = []; }
  newTaps(s).forEach(tp => { const r = traceRay(tp.y - cy + 0.5, cx, w, h, rh); r.t0 = tp.t; s.extra.push(r); if (s.extra.length > 5) s.extra.shift(); });
  const drawRay = (r, p, lw, bright) => {
    const n = Math.floor(clamp(p, 0, 1) * r.pts.length);
    ctx.strokeStyle = r.cap ? `rgba(255,107,127,${bright ? 1 : 0.8})` : `rgba(255,230,140,${bright ? 1 : 0.75})`; ctx.lineWidth = lw; ctx.beginPath();
    for (let i = 0; i < n; i++) { const [x, y] = r.pts[i]; i ? ctx.lineTo(cx + x, cy + y) : ctx.moveTo(cx + x, cy + y); }
    ctx.stroke();
    if (n > 0 && n < r.pts.length) { const [x, y] = r.pts[n - 1]; glow(ctx, cx + x, cy + y, bright ? 8 : 5, 'rgba(255,255,220,1)'); }
  };
  const P = 5, p = (t % P) / 4;
  if (!s.extra.length) s.rays.forEach(r => drawRay(r, p, 1.8, false));
  else s.rays.forEach(r => { ctx.globalAlpha = 0.25; drawRay(r, 1, 1.2, false); ctx.globalAlpha = 1; });
  s.extra.forEach(r => drawRay(r, (t - r.t0) / 2.5, 3, true));
  glow(ctx, cx, cy, rh * 2, 'rgba(140,100,255,.35)'); circle(ctx, cx, cy, rh, '#000');
  ctx.strokeStyle = 'rgba(200,180,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, rh, 0, TAU); ctx.stroke();
  label(ctx, 'Toca a la izquierda para lanzar luz', w * 0.03, f * 1.1, f * 0.75, '#ffe68c', 'left');
  pill(ctx, 'Rojo = la luz que ya no puede escapar', w / 2, h - f * 1.1, f * 0.85, '#ff8a9a');
};

ANIMS.spaghetti = (ctx, w, h, t) => {
  const f = fs(w), P = 6, p = (t % P) / P, bx = w * 0.85, cy = h * 0.5, rh = Math.min(w, h) * 0.14;
  glow(ctx, bx, cy, rh * 2.2, 'rgba(255,150,60,.35)'); circle(ctx, bx, cy, rh, '#000');
  ctx.strokeStyle = 'rgba(255,200,130,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, cy, rh, 0, TAU); ctx.stroke();
  const k = Math.pow(p, 2.2), x = lerp(w * 0.12, bx - rh * 0.6, k), sx = 1 + 4.5 * Math.pow(k, 3), sy = 1 / Math.sqrt(sx);
  ctx.globalAlpha = p > 0.9 ? (1 - p) * 10 : 1;
  ctx.save(); ctx.translate(x, cy); ctx.rotate(-Math.PI / 2); ctx.scale(sy, sx);
  ctx.fillStyle = '#e8ecff'; roundRect(ctx, -10, -8, 20, 26, 7); ctx.fill();
  ctx.fillRect(-9, 16, 7, 14); ctx.fillRect(2, 16, 7, 14);
  circle(ctx, 0, -16, 11, '#e8ecff'); circle(ctx, 0, -17, 7, '#3fd0ff');
  ctx.restore(); ctx.globalAlpha = 1;
  if (p > 0.25 && p < 0.88) { const L1 = 18 + k * 30, L2 = 10 + k * 12; arrow(ctx, x + 18 * sx, cy - 40, x + 18 * sx + L1, cy - 40, '#ff8a9a', 2); arrow(ctx, x - 18 * sx, cy - 40, x - 18 * sx + L2, cy - 40, '#ffd166', 2); label(ctx, 'pies: jalón fuerte', x + 18 * sx + L1 + 4, cy - 56, f * 0.7, '#ff8a9a', 'right'); }
  pill(ctx, 'Te estirarías como espagueti', w / 2, h - f * 1.2, f * 0.9, '#ffd166');
};

/* ---------- 9. Galaxias ---------- */
ANIMS.galaxy = (ctx, w, h, t, s) => {
  if (!s.pts) s.pts = spiralPoints(2200, 17, 2);
  const f = fs(w), cx = w / 2, cy = h * 0.5, R = Math.min(w * 0.46, h * 0.68), rot = t * 0.1;
  drawSpiral(ctx, s.pts, cx, cy, R, rot, 0.62, 1);
  const a = 2.3 + 0.62 * 5.2 + rot, ux = cx + Math.cos(a) * 0.62 * R, uy = cy + Math.sin(a) * 0.62 * R * 0.62;
  glow(ctx, ux, uy, 10, 'rgba(255,255,120,1)');
  ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ux, uy, 9 + Math.sin(t * 4) * 2, 0, TAU); ctx.stroke();
  pill(ctx, 'Estás aquí', ux, uy - 24, f * 0.8, '#ffd166');
  label(ctx, 'centro: agujero negro gigante', cx, cy + R * 0.2, f * 0.68, '#ffe6b0', 'center', 700);
  pill(ctx, '100,000 años luz de ancho', cx, h - f * 1.1, f * 0.85);
};

ANIMS.galaxytypes = (ctx, w, h, t, s) => {
  const f = fs(w);
  if (!s.sp) {
    s.sp = spiralPoints(900, 31, 2); const r = rnd(41);
    s.el = [...Array(700)].map(() => ({ x: gauss(r) * 0.32, y: gauss(r) * 0.2 }));
    s.ir = [...Array(500)].map(() => { const c = Math.floor(r() * 4), cs = [[-0.3, -0.2], [0.2, 0.1], [-0.1, 0.3], [0.35, -0.3]][c]; return { x: cs[0] + gauss(r) * 0.12, y: cs[1] + gauss(r) * 0.1, c: r() }; });
  }
  const cy = h * 0.45, R = Math.min(w / 6.2, h * 0.32);
  drawSpiral(ctx, s.sp, w / 6, cy, R, t * 0.25, 0.8, 1);
  const ex = w / 2; glow(ctx, ex, cy, R * 0.8, 'rgba(255,210,150,.55)');
  s.el.forEach(q => { const a = t * 0.05, x = q.x * Math.cos(a) - q.y * Math.sin(a), y = q.x * Math.sin(a) + q.y * Math.cos(a); ctx.fillStyle = 'rgba(255,215,160,.6)'; ctx.fillRect(ex + x * R * 1.6, cy + y * R * 1.6, 1.4, 1.4); });
  const ix = w * 5 / 6; s.ir.forEach(q => { ctx.fillStyle = q.c < 0.15 ? 'rgba(255,120,200,.9)' : 'rgba(170,200,255,.7)'; ctx.fillRect(ix + q.x * R * 1.6 + Math.sin(t + q.c * 9) * 1.5, cy + q.y * R * 1.6, 1.6, 1.6); });
  [['Espiral', w / 6], ['Elíptica', w / 2], ['Irregular', w * 5 / 6]].forEach(([n, x]) => label(ctx, n, x, h * 0.85, f * 0.95, '#fff'));
};

ANIMS.collision = (ctx, w, h, t, s) => {
  const f = fs(w);
  if (!s.a) { s.a = spiralPoints(700, 51, 2); s.b = spiralPoints(700, 61, 2); const r = rnd(71); s.tg = [...Array(1400)].map(() => ({ x: gauss(r) * 0.22, y: gauss(r) * 0.15 })); }
  const P = 12, p = t % P, k = ease(clamp(p / 6, 0, 1)), m = ease(clamp((p - 5.5) / 4.5, 0, 1));
  const R = Math.min(w * 0.25, h * 0.4), cy = h * 0.47;
  const ax = lerp(w * 0.22, w * 0.5, k), ay = lerp(cy - h * 0.12, cy, k), bx = lerp(w * 0.78, w * 0.5, k), by = lerp(cy + h * 0.12, cy, k);
  ctx.globalAlpha = p > 11 ? 12 - p : 1;
  const draw = (pts, gx, gy, rot, tilt, off) => pts.forEach((q, i) => {
    const a = q.a + rot, x0 = gx + Math.cos(a) * q.r * R, y0 = gy + Math.sin(a) * q.r * R * tilt;
    const tg = s.tg[i + off], x = lerp(x0, w / 2 + tg.x * w, m), y = lerp(y0, cy + tg.y * h * 1.2, m);
    ctx.fillStyle = q.c === 0 ? 'rgba(255,225,170,.9)' : 'rgba(180,205,255,.7)'; ctx.fillRect(x, y, 1.5, 1.5);
  });
  draw(s.a, ax, ay, t * 0.2, 0.55, 0); draw(s.b, bx, by, -t * 0.2 + 1, 0.85, 700);
  if (m > 0.2) glow(ctx, w / 2, cy, R * 0.6 * m, `rgba(255,220,160,${0.5 * m})`);
  ctx.globalAlpha = 1;
  if (k < 0.9) { label(ctx, 'Vía Láctea', ax, ay - R * 0.7, f * 0.8, '#cfe0ff'); label(ctx, 'Andrómeda', bx, by + R * 0.75, f * 0.8, '#cfe0ff'); }
  pill(ctx, m > 0.5 ? 'Se mezclan en una galaxia más grande' : 'Se acercan poco a poco', w / 2, h - f * 1.1, f * 0.85);
};

/* ---------- 10. Luz y distancias ---------- */
ANIMS.lightspeed = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w / 2, cy = h * 0.5, R = Math.min(w, h) * 0.26, P = 12, p = t % P, k = clamp(p / 10, 0, 1);
  earth(ctx, cx, cy, R, t * 0.05);
  const laps = 7.5 * k, a = laps * TAU - Math.PI / 2, rr = R * 1.12;
  ctx.strokeStyle = 'rgba(255,240,150,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.stroke();
  ctx.lineWidth = 3;
  for (let i = 0; i < 30; i++) { const aa = a - i * 0.05; ctx.strokeStyle = `rgba(255,240,150,${1 - i / 30})`; ctx.beginPath(); ctx.arc(cx, cy, rr, aa - 0.05, aa); ctx.stroke(); }
  glow(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 10, 'rgba(255,255,220,1)');
  pill(ctx, `Tiempo: ${(k).toFixed(2)} s   Vueltas: ${laps.toFixed(1)}`, cx, f * 1.2, f * 0.85, '#ffd166');
  label(ctx, '(en cámara lenta)', cx, h - f * 0.9, f * 0.72, '#aab0dd', 'center', 700);
};

const DESTINOS = {
  luna: ['Luna', '384,400 km', 1.3, '#e8e6da'], sol: ['Sol', '150 millones de km', 500, '#ffd166'],
  marte: ['Marte', '225 millones de km (promedio)', 750, '#e0603c'], neptuno: ['Neptuno', '4,500 millones de km', 15000, '#4a6cff']
};
function fmtTime(sec) {
  if (sec < 60) return sec.toFixed(1) + ' s';
  if (sec < 3600) return Math.floor(sec / 60) + ' min ' + String(Math.round(sec % 60)).padStart(2, '0') + ' s';
  return Math.floor(sec / 3600) + ' h ' + String(Math.round((sec % 3600) / 60)).padStart(2, '0') + ' min';
}
ANIMS.lighttravel = (ctx, w, h, t, s) => {
  const D = DESTINOS[s.dest || 'sol'], f = fs(w), P = 9, p = t % P, k = clamp(p / 7, 0, 1), sx = w * 0.12, ex = w * 0.9, cy = h * 0.5, M = Math.min(w, h);
  if ((s.dest || 'sol') === 'sol') sunBall(ctx, sx, cy, M * 0.11);
  else { const r = M * 0.07, g = ctx.createRadialGradient(sx - r * 0.3, cy - r * 0.3, 0, sx, cy, r); g.addColorStop(0, '#fff'); g.addColorStop(0.35, D[3]); g.addColorStop(1, D[3]); circle(ctx, sx, cy, r, g); }
  earth(ctx, ex, cy, M * 0.035, t * 0.2);
  label(ctx, D[0], sx, cy + M * 0.2, f * 0.85, D[3]); label(ctx, 'Tierra', ex, cy + M * 0.1, f * 0.85, '#7fc8ff');
  ctx.setLineDash([2, 6]); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(sx, cy); ctx.lineTo(ex, cy); ctx.stroke(); ctx.setLineDash([]);
  const px = lerp(sx + 20, ex - 12, k);
  ctx.strokeStyle = 'rgba(255,240,150,.9)'; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i < 40; i++) { const x = Math.max(sx, px - i * 2.5), y = cy + Math.sin(i * 0.8 - t * 14) * 5; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke(); glow(ctx, px, cy, 9, 'rgba(255,255,220,1)');
  pill(ctx, fmtTime(k * D[2]), w / 2, f * 1.3, f * 1.05, '#ffd166');
  pill(ctx, D[1], w / 2, h - f * 1.2, f * 0.85);
};

ANIMS.lookback = (ctx, w, h, t) => {
  const f = fs(w), rows = [['Luna', '1.3 segundos', '#e8e6da', 1.5], ['Sol', '8 minutos', '#ffd166', 2.5], ['Próxima Centauri', '4.2 años', '#ff8a6a', 3.5], ['Andrómeda', '2.5 millones de años', '#b9c8ff', 5]];
  const x0 = w * 0.22, x1 = w * 0.86, eye = w * 0.93;
  rows.forEach(([n, d, col, dur], i) => {
    const y = h * (0.17 + i * 0.22), cyc = dur + 0.8, k = clamp((t % cyc) / dur, 0, 1);
    if (n === 'Andrómeda') { ctx.save(); ctx.translate(x0 - w * 0.08, y); ctx.scale(1, 0.4); glow(ctx, 0, 0, 16, 'rgba(200,210,255,.9)'); ctx.restore(); }
    else glow(ctx, x0 - w * 0.08, y, n === 'Sol' ? 12 : 9, col);
    label(ctx, n, x0 - w * 0.15, y - f * 1.1, f * 0.7, col, 'left');
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    const px = lerp(x0, x1, k); glow(ctx, px, y, 6, col);
    label(ctx, d, (x0 + x1) / 2, y - f * 0.9, f * 0.72, '#dfe3ff', 'center', 700);
    if (k >= 1) glow(ctx, eye, y, 10, col);
  });
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(eye, h * 0.5, 7, h * 0.36, 0, 0, TAU); ctx.stroke();
  label(ctx, 'Tú', eye, h * 0.93, f * 0.8, '#fff');
};
