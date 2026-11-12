/* Animaciones del nivel 2 (lecciones 11–20). Usa los helpers de anims.js. */
function ball(ctx, x, y, r, col, light) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, Math.max(0.5, r));
  g.addColorStop(0, light || '#fff'); g.addColorStop(0.35, col); g.addColorStop(1, shade(col));
  circle(ctx, x, y, r, g);
}
function shade(hex) { const n = parseInt(hex.slice(1), 16); const f = v => Math.round(v * 0.45); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
function bgStars(ctx, s, w, h, n, seed, alpha) {
  if (!s['_bs' + seed] || s['_bsw' + seed] !== w) { const r = rnd(seed); s['_bs' + seed] = [...Array(n)].map(() => [r() * w, r() * h, r() * 1.3 + 0.3, r() * TAU]); s['_bsw' + seed] = w; }
  s['_bs' + seed].forEach(([x, y, z, p]) => { ctx.fillStyle = `rgba(255,255,255,${(alpha || 0.7) * (0.5 + 0.5 * Math.sin(p + Date.now() / 700))})`; ctx.fillRect(x, y, z, z); });
}

/* ---------- 11. Marte ---------- */
ANIMS.mars = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w * 0.36, cy = h * 0.5, R = Math.min(w, h) * 0.3, storm = (s.vista || 'normal') === 'tormenta';
  glow(ctx, cx, cy, R * 1.35, 'rgba(255,120,70,.28)');
  const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
  g.addColorStop(0, '#f6a77d'); g.addColorStop(0.6, '#d0582f'); g.addColorStop(1, '#6e2410');
  circle(ctx, cx, cy, R, g);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
  const rot = t * 0.25;
  [[0, 0.1, 0.35, 0.12], [1.2, -0.25, 0.25, 0.15], [2.4, 0.3, 0.3, 0.1], [3.6, -0.05, 0.2, 0.2], [4.8, 0.22, 0.4, 0.1]].forEach(([lon, lat, a, b]) => {
    const L = lon + rot, c = Math.cos(L); if (c < 0) return;
    ctx.fillStyle = `rgba(90,30,15,${0.5 * c})`; ctx.beginPath(); ctx.ellipse(cx + Math.sin(L) * R * 0.9, cy + lat * R, a * R * Math.max(0.15, c), b * R, 0, 0, TAU); ctx.fill();
  });
  const OL = 5.6 + rot, oc = Math.cos(OL);
  if (oc > 0) { const ox = cx + Math.sin(OL) * R * 0.8, oy = cy - R * 0.25; ctx.strokeStyle = `rgba(255,200,170,${oc})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ox, oy, R * 0.09 * oc, R * 0.09, 0, 0, TAU); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.ellipse(cx, cy - R * 0.93, R * 0.38, R * 0.13, 0, 0, TAU); ctx.fill();
  if (storm) {
    ctx.fillStyle = 'rgba(225,150,95,.82)'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    for (let i = 0; i < 9; i++) { ctx.strokeStyle = 'rgba(255,210,160,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx + Math.sin(i * 2.1) * R * 0.5, cy + Math.cos(i * 1.7) * R * 0.5, R * (0.15 + (i % 3) * 0.08), t * 1.5 + i, t * 1.5 + i + 3.5); ctx.stroke(); }
  }
  const sh = ctx.createLinearGradient(cx - R, 0, cx + R, 0); sh.addColorStop(0.55, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.55)');
  ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
  [[1.5, 3, 'Fobos'], [2.1, 1.2, 'Deimos']].forEach(([d, sp, n]) => {
    const a = t * sp * 0.6, x = cx + Math.cos(a) * R * d, y = cy + Math.sin(a) * R * d * 0.3;
    if (Math.sin(a) < 0 && Math.abs(x - cx) < R) return;
    circle(ctx, x, y, 3, '#c9b8a8'); label(ctx, n, clamp(x, f * 1.6, w - f * 1.6), y - 10, f * 0.6, '#d8c8b8', 'center', 700);
  });
  const ix = w * 0.8;
  [['Un día', '24 h 40 min'], ['Gravedad', '38% de la Tierra'], ['Lunas', '2']].forEach(([a, b], i) => {
    label(ctx, a, ix, h * (0.25 + i * 0.25) - f * 0.55, f * 0.7, '#ffb08a', 'center', 800);
    label(ctx, b, ix, h * (0.25 + i * 0.25) + f * 0.55, f * 0.82, '#fff', 'center', 800);
  });
  if (storm) pill(ctx, '¡Tormenta de polvo que cubre todo el planeta!', w / 2, h - f * 1.1, f * 0.8, '#ffb08a');
};

ANIMS.olympus = (ctx, w, h, t) => {
  const f = fs(w), gy = h * 0.82, P = 9, k = ease(clamp((t % P) / 3, 0, 1)), sc = (h * 0.66) / 22;
  ctx.setLineDash([3, 5]);
  for (let km = 5; km <= 20; km += 5) { const y = gy - km * sc; ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(w * 0.08, y); ctx.lineTo(w, y); ctx.stroke(); label(ctx, km + ' km', w * 0.075, y, f * 0.62, '#8f95c0', 'right', 700); }
  ctx.strokeStyle = 'rgba(127,227,255,.6)'; ctx.beginPath(); ctx.moveTo(w * 0.08, gy - 10 * sc); ctx.lineTo(w, gy - 10 * sc); ctx.stroke(); ctx.setLineDash([]);
  label(ctx, 'aviones', w * 0.97, gy - 10 * sc - f * 0.6, f * 0.62, '#7fe3ff', 'right');
  const eh = 8.8 * sc * k, ex = w * 0.2;
  ctx.fillStyle = '#9aa0b8'; ctx.beginPath(); ctx.moveTo(ex - w * 0.07, gy); ctx.lineTo(ex, gy - eh); ctx.lineTo(ex + w * 0.07, gy); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(ex - w * 0.02, gy - eh * 0.72); ctx.lineTo(ex, gy - eh); ctx.lineTo(ex + w * 0.02, gy - eh * 0.72); ctx.fill();
  const oh = 21.9 * sc * k, x0 = w * 0.34, x1 = w * 0.98, mx = (x0 + x1) / 2;
  const gr = ctx.createLinearGradient(0, gy - oh, 0, gy); gr.addColorStop(0, '#e0784a'); gr.addColorStop(1, '#8a3518');
  ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x0, gy);
  ctx.bezierCurveTo(x0 + (x1 - x0) * 0.2, gy - oh * 0.35, mx - (x1 - x0) * 0.18, gy - oh, mx - (x1 - x0) * 0.06, gy - oh);
  ctx.lineTo(mx - (x1 - x0) * 0.03, gy - oh * 0.95); ctx.lineTo(mx + (x1 - x0) * 0.03, gy - oh * 0.95); ctx.lineTo(mx + (x1 - x0) * 0.06, gy - oh);
  ctx.bezierCurveTo(mx + (x1 - x0) * 0.18, gy - oh, x1 - (x1 - x0) * 0.2, gy - oh * 0.35, x1, gy); ctx.fill();
  ctx.fillStyle = '#3a2a2a'; ctx.fillRect(0, gy, w, h - gy);
  if (k > 0.95) {
    label(ctx, 'Everest (Tierra)', ex, gy - eh - f, f * 0.7, '#dfe3ff'); label(ctx, '8.8 km', ex, gy - eh - f * 2.1, f * 0.75, '#fff');
    label(ctx, 'Monte Olimpo (Marte)', mx, gy - oh - f * 0.9, f * 0.75, '#ffb08a'); label(ctx, '21.9 km', mx, gy + (h - gy) / 2, f * 0.85, '#fff');
  }
};

ANIMS.rover = (ctx, w, h, t, s) => {
  const f = fs(w), d = s.dist || 225; s.dist_txt = Math.round(d) + ' M km';
  const delay = d * 1e6 / 3e5 / 60, ex = w * 0.1, mx = w * 0.88, cy = h * 0.48, M = Math.min(w, h);
  earth(ctx, ex, cy, M * 0.07, t * 0.1);
  ball(ctx, mx, cy, M * 0.055, '#e0603c', '#ffc7a8');
  ctx.fillStyle = '#ddd'; ctx.fillRect(mx - 6, cy - M * 0.055 - 7, 12, 5); circle(ctx, mx - 4, cy - M * 0.055 - 1, 2, '#555'); circle(ctx, mx + 4, cy - M * 0.055 - 1, 2, '#555');
  ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(mx + 3, cy - M * 0.055 - 7); ctx.lineTo(mx + 3, cy - M * 0.055 - 13); ctx.stroke();
  label(ctx, 'rover', mx, cy - M * 0.055 - 22, f * 0.65, '#ffb08a');
  const dur = 1 + d / 80, cyc = dur + 0.8, k = clamp((t % cyc) / dur, 0, 1), px = lerp(ex + M * 0.08, mx - M * 0.07, k);
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(127,227,255,${0.9 - i * 0.25})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px - i * 7, cy, 8 + i * 6, -0.6, 0.6); ctx.stroke(); }
  ctx.setLineDash([2, 6]); ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(ex, cy); ctx.lineTo(mx, cy); ctx.stroke(); ctx.setLineDash([]);
  pill(ctx, `Un mensaje tarda ${delay < 10 ? delay.toFixed(1) : Math.round(delay)} minutos`, w / 2, f * 1.3, f, '#7fe3ff');
  label(ctx, 'Por eso los rovers manejan casi solos', w / 2, h - f * 1.1, f * 0.8, '#dfe3ff');
};

/* ---------- 12. Gigantes ---------- */
ANIMS.jupiter = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w * 0.45, cy = h * 0.5, R = Math.min(w, h) * 0.38, cmp = (s.ver || 'no') === 'si';
  glow(ctx, cx, cy, R * 1.25, 'rgba(230,180,120,.25)');
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
  [[-1, -0.75, '#a88a6e'], [-0.75, -0.55, '#e8d4b0'], [-0.55, -0.35, '#b9805a'], [-0.35, -0.12, '#f1e3c6'], [-0.12, 0.12, '#d9a774'], [0.12, 0.3, '#f3e6cc'], [0.3, 0.5, '#b06f48'], [0.5, 0.72, '#e9d5b2'], [0.72, 1, '#9c7f66']]
    .forEach(([a, b, c]) => { ctx.fillStyle = c; ctx.fillRect(cx - R, cy + a * R, R * 2, (b - a) * R + 1); });
  [-0.55, -0.12, 0.12, 0.5].forEach((yy, i) => {
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = -R; x <= R; x += 4) { const y = cy + yy * R + Math.sin(x / 12 + t * (1 + i * 0.3)) * 3; x === -R ? ctx.moveTo(cx + x, y) : ctx.lineTo(cx + x, y); }
    ctx.stroke();
  });
  const ph = t * 0.35 % TAU, c = Math.cos(ph);
  if (c > 0) { const sx = cx + Math.sin(ph) * R * 0.8, sy = cy + 0.4 * R; ctx.fillStyle = '#c8553d'; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12 * c, R * 0.07, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,220,200,.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    if (cmp) { earth(ctx, sx, sy - R * 0.2, R / 11.2, t * 0.1); ctx.strokeStyle = 'rgba(127,200,255,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, sy - R * 0.2 + R / 11.2 + 2); ctx.lineTo(sx, sy - R * 0.07 - 2); ctx.stroke(); } }
  const sh = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.4, cx, cy, R * 1.05); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
  if (cmp) {
    const ex = w * 0.9, er = R / 11.2; earth(ctx, ex, h * 0.25, er, 0); label(ctx, 'Tierra', ex, h * 0.25 + er + f * 0.8, f * 0.75, '#7fc8ff');
    label(ctx, '(a escala)', ex, h * 0.25 + er + f * 1.8, f * 0.6, '#aab0dd', 'center', 600);
    pill(ctx, 'La Gran Mancha Roja: tormenta más grande que la Tierra', w / 2, h - f * 1.1, f * 0.75, '#ff9a7a');
  } else pill(ctx, 'Un día en Júpiter dura solo 10 horas', w / 2, h - f * 1.1, f * 0.85);
};

ANIMS.saturn = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w / 2, cy = h * 0.47, R = Math.min(w * 0.16, h * 0.24);
  const inc = ctl(s, 'incl', 27 * Math.abs(Math.sin(t * 0.3))); s.incl_txt = Math.round(inc) + '°';
  const si = Math.max(0.015, Math.sin(inc * Math.PI / 180));
  const rings = [[1.24, 1.52, 'rgba(170,150,120,.55)'], [1.53, 1.95, 'rgba(240,220,175,.92)'], [2.03, 2.27, 'rgba(215,195,155,.8)']];
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.18);
  const drawRings = top => {
    ctx.save(); ctx.beginPath(); top ? ctx.rect(-w, -h, w * 2, h) : ctx.rect(-w, 0, w * 2, h); ctx.clip();
    rings.forEach(([a, b, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, 0, b * R, b * R * si, 0, 0, TAU); ctx.ellipse(0, 0, a * R, a * R * si, 0, 0, TAU); ctx.fill('evenodd'); });
    ctx.restore();
  };
  drawRings(true);
  const g = ctx.createRadialGradient(-R * 0.35, -R * 0.35, R * 0.1, 0, 0, R); g.addColorStop(0, '#fff3cf'); g.addColorStop(0.5, '#e6cf8f'); g.addColorStop(1, '#8a6e3a');
  circle(ctx, 0, 0, R, g);
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.clip();
  [-0.5, -0.15, 0.25, 0.6].forEach((y, i) => { ctx.fillStyle = i % 2 ? 'rgba(160,120,70,.25)' : 'rgba(255,240,200,.2)'; ctx.fillRect(-R, y * R, R * 2, R * 0.18); });
  ctx.restore();
  drawRings(false);
  ctx.restore();
  pill(ctx, inc < 3 ? '¡De canto los anillos casi desaparecen!' : 'Anillos de hielo: enormes pero muy delgados', w / 2, h - f * 1.1, f * 0.85, '#f0dca8');
};

ANIMS.bathtub = (ctx, w, h, t, s) => {
  const f = fs(w), key = s.pl || 'saturno';
  const D = { saturno: [0.69, '#e6cf8f', 'Saturno'], jupiter: [1.33, '#d9a066', 'Júpiter'], tierra: [5.5, '#4f9dff', 'Tierra'] }[key];
  const x0 = w * 0.18, x1 = w * 0.82, top = h * 0.2, bot = h * 0.86, wy = h * 0.44, r = Math.min(w, h) * 0.1, cx = w / 2;
  const floats = D[0] < 1, target = floats ? wy - r + 2 * r * D[0] : bot - r - 2, y0 = top - r * 0.2;
  let y;
  if (floats) { const k = Math.min(t / 0.6, 1); y = t < 0.6 ? lerp(y0, target, k * k) : target + (target - y0) * 0.25 * Math.exp(-2.5 * (t - 0.6)) * Math.sin((t - 0.6) * 7) + Math.sin(t * 2) * 1.5; }
  else { y = t < 0.45 ? lerp(y0, wy, (t / 0.45) ** 2) : lerp(wy, target, ease(clamp((t - 0.45) / (1.2 + D[0] * 0.3), 0, 1))); }
  ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(x0, top, x1 - x0, bot - top);
  if (key === 'saturno') { ctx.strokeStyle = 'rgba(240,220,170,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, y, r * 1.8, r * 0.45, -0.2, 0, TAU); ctx.stroke(); }
  if (key === 'tierra') earth(ctx, cx, y, r, t * 0.1); else ball(ctx, cx, y, r, D[1]);
  const wg = ctx.createLinearGradient(0, wy, 0, bot); wg.addColorStop(0, 'rgba(80,170,255,.55)'); wg.addColorStop(1, 'rgba(30,80,200,.7)');
  ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(x0, wy);
  for (let x = x0; x <= x1; x += 6) ctx.lineTo(x, wy + Math.sin(x / 14 + t * 3) * 2 * Math.exp(-Math.max(0, t - 0.5)) * 4 * (t > 0.5 ? 1 : 0) + Math.sin(x / 20 + t * 2) * 1.2);
  ctx.lineTo(x1, bot); ctx.lineTo(x0, bot); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(200,220,255,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, top); ctx.lineTo(x0, bot); ctx.lineTo(x1, bot); ctx.lineTo(x1, top); ctx.stroke();
  label(ctx, 'agua', x0 + 8, bot - f * 0.8, f * 0.7, '#cfe6ff', 'left');
  pill(ctx, `${D[2]}: ${D[0]} g/cm³ (agua: 1)`, cx, f * 1.1, f * 0.82);
  if (t > 1.6) pill(ctx, floats ? '¡Flota! Es más ligero que el agua' : 'Se hunde: es más denso que el agua', cx, h - f * 0.9, f * 0.82, floats ? '#3ee6a0' : '#ff8a9a');
};

/* ---------- 13. Cometas, asteroides y meteoros ---------- */
ANIMS.comet = (ctx, w, h, t) => {
  const f = fs(w), a = w * 0.4, e = 0.82, b = a * Math.sqrt(1 - e * e) * 1.2, ecx = w * 0.56, cy = h * 0.5, sxp = ecx - a * e;
  ctx.strokeStyle = 'rgba(160,150,255,.25)'; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.ellipse(ecx, cy, a, b, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  sunBall(ctx, sxp, cy, Math.min(w, h) * 0.06);
  const Mn = (t * TAU / 9) % TAU; let E = Mn; for (let i = 0; i < 8; i++) E = Mn + e * Math.sin(E);
  const x = ecx - a * Math.cos(E), y = cy - b * Math.sin(E), dx = x - sxp, dy = y - cy, r = Math.hypot(dx, dy), ux = dx / r, uy = dy / r;
  const L = w * 0.32 * clamp(Math.pow(a * 0.45 / r, 2), 0, 1.4);
  const vx = -a * Math.sin(E), vy = -b * Math.cos(E), vl = Math.hypot(vx, vy) || 1;
  if (L > 3) {
    const cxp = x + ux * L * 0.6 - vx / vl * L * 0.35, cyp = y + uy * L * 0.6 - vy / vl * L * 0.35;
    const g1 = ctx.createLinearGradient(x, y, x + ux * L, y + uy * L); g1.addColorStop(0, 'rgba(255,245,220,.8)'); g1.addColorStop(1, 'rgba(255,245,220,0)');
    ctx.strokeStyle = g1; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(cxp, cyp, x + ux * L - vx / vl * L * 0.4, y + uy * L - vy / vl * L * 0.4); ctx.stroke();
    const g2 = ctx.createLinearGradient(x, y, x + ux * L * 1.2, y + uy * L * 1.2); g2.addColorStop(0, 'rgba(110,190,255,.9)'); g2.addColorStop(1, 'rgba(110,190,255,0)');
    ctx.strokeStyle = g2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + ux * L * 1.2, y + uy * L * 1.2); ctx.stroke(); ctx.lineCap = 'butt';
  }
  glow(ctx, x, y, 6 + L * 0.08, 'rgba(220,240,255,1)'); circle(ctx, x, y, 2.5, '#fff');
  pill(ctx, L > w * 0.1 ? 'Cerca del Sol: el hielo se evapora y sale la cola' : 'Lejos del Sol: bola de hielo y polvo, sin cola', w / 2, h - f * 1.1, f * 0.8, L > w * 0.1 ? '#7fe3ff' : '#dfe3ff');
  label(ctx, 'La cola siempre apunta lejos del Sol', w / 2, f * 1.1, f * 0.75, '#aab0dd');
};

ANIMS.meteor = (ctx, w, h, t, s) => {
  const f = fs(w), gy = h * 0.8;
  const sky = ctx.createLinearGradient(0, 0, 0, gy); sky.addColorStop(0, 'rgba(8,8,30,.9)'); sky.addColorStop(1, 'rgba(70,40,110,.9)');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, gy);
  bgStars(ctx, s, w, gy, 90, 3, 0.8);
  s.ms = s.ms || []; s.next = s.next || 0.3;
  const spawn = (x, y) => { const a = 0.55 + Math.random() * 0.35, sp = w * (0.9 + Math.random() * 0.5); s.ms.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, t0: t, life: 0.7 + Math.random() * 0.3 }); };
  newTaps(s).forEach(tp => spawn(tp.x - w * 0.12, tp.y - h * 0.08));
  if (t > s.next) { spawn(Math.random() * w * 0.7, Math.random() * h * 0.3); s.next = t + 1.4 + Math.random() * 1.2; }
  s.ms = s.ms.filter(m => t - m.t0 < m.life);
  s.ms.forEach(m => {
    const k = (t - m.t0), x = m.x + m.vx * k * 0.35, y = m.y + m.vy * k * 0.35, al = 1 - k / m.life, len = 70;
    const sp = Math.hypot(m.vx, m.vy), tx = x - m.vx / sp * len, ty = y - m.vy / sp * len;
    const g = ctx.createLinearGradient(tx, ty, x, y); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, `rgba(255,240,200,${al})`);
    ctx.strokeStyle = g; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
    glow(ctx, x, y, 7, `rgba(255,220,150,${al})`);
  });
  ctx.fillStyle = '#120c22'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, gy); ctx.quadraticCurveTo(w * 0.25, gy - 22, w * 0.5, gy - 4); ctx.quadraticCurveTo(w * 0.75, gy + 10, w, gy - 18); ctx.lineTo(w, h); ctx.fill();
  label(ctx, 'Toca el cielo para lanzar una estrella fugaz', w / 2, f * 1.1, f * 0.75, '#ffe6b0');
  label(ctx, 'Se queman a unos 100 km de altura', w / 2, h - f * 0.9, f * 0.75, '#dfe3ff');
};

ANIMS.crater = (ctx, w, h, t, s) => {
  const f = fs(w), val = s.roca || 4, m = val * 10; s.roca_txt = m + ' m';
  const rr = 1.5 + val * 1.2, cr = val * 1.2 * 10, gy = h * 0.6, cx = w / 2, P = 4.5, p = t % P;
  if (!s.ej) { const r = rnd(8); s.ej = [...Array(40)].map(() => ({ a: -Math.PI * (0.15 + r() * 0.7), v: 0.5 + r() })); }
  const k = p < 1 ? 0 : ease(clamp((p - 1) / 0.35, 0, 1)), R = cr * k, rim = R * 0.12, dep = R * 0.38;
  const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, '#8a5a3a'); gg.addColorStop(1, '#4a2e1e');
  ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, gy);
  if (R > 1) { ctx.lineTo(cx - R * 1.35, gy); ctx.quadraticCurveTo(cx - R * 1.1, gy - rim, cx - R, gy - rim); ctx.quadraticCurveTo(cx, gy + dep * 2, cx + R, gy - rim); ctx.quadraticCurveTo(cx + R * 1.1, gy - rim, cx + R * 1.35, gy); }
  ctx.lineTo(w, gy); ctx.lineTo(w, h); ctx.fill();
  ctx.strokeStyle = 'rgba(255,200,150,.25)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, gy + i * (h - gy) / 4); ctx.lineTo(cx - R * 1.2, gy + i * (h - gy) / 4); ctx.moveTo(cx + R * 1.2, gy + i * (h - gy) / 4); ctx.lineTo(w, gy + i * (h - gy) / 4); ctx.stroke(); }
  if (p < 1) {
    const q = p, x = lerp(w * 0.05, cx, q), y = lerp(-20, gy, q);
    const tl = ctx.createLinearGradient(x - 60, y - 60, x, y); tl.addColorStop(0, 'rgba(255,140,40,0)'); tl.addColorStop(1, 'rgba(255,200,90,.9)');
    ctx.strokeStyle = tl; ctx.lineWidth = rr * 1.4; ctx.beginPath(); ctx.moveTo(x - 60 * 0.9, y - 60 * (gy + 20) / (cx - w * 0.05) * 0.9); ctx.lineTo(x, y); ctx.stroke();
    ball(ctx, x, y, rr, '#8a7a6a');
  } else {
    if (p < 1.4) glow(ctx, cx, gy, cr * 1.5 * (1 - (p - 1) / 0.4) + 10, 'rgba(255,240,200,1)', 'rgba(255,150,50,0)');
    const q = p - 1; if (q < 1.6) s.ej.forEach(e => { const d = q * e.v * cr * 1.2, x = cx + Math.cos(e.a) * d, y = gy + Math.sin(e.a) * d + 60 * q * q; if (y < gy) { ctx.fillStyle = `rgba(160,110,80,${1 - q / 1.6})`; ctx.fillRect(x, y, 3, 3); } });
  }
  pill(ctx, `Roca de ${m} m → cráter de unos ${m * 20} m`, cx, f * 1.2, f * 0.85, '#ffd166');
};

/* ---------- 14. Constelaciones ---------- */
const ORION = [['Betelgeuse', -0.35, -0.55, '#ff9a6a', 3.4, 550], ['Bellatrix', 0.3, -0.48, '#cfe0ff', 2.4, 250], ['Meissa', 0.0, -0.85, '#dfe8ff', 1.7, 1100],
  ['Alnitak', -0.13, 0.03, '#cfe0ff', 2.3, 1260], ['Alnilam', 0, 0, '#cfe0ff', 2.5, 2000], ['Mintaka', 0.13, -0.03, '#cfe0ff', 2.2, 1200],
  ['Saiph', -0.28, 0.6, '#cfe0ff', 2.2, 650], ['Rigel', 0.38, 0.55, '#a8c4ff', 3.4, 860]];
const ORION_L = [[2, 0], [2, 1], [0, 3], [1, 5], [3, 4], [4, 5], [3, 6], [5, 7]];
ANIMS.orion = (ctx, w, h, t, s) => {
  const f = fs(w), on = (s.ver2 || 'unir') === 'unir', S = Math.min(w, h) * 0.4, cx = w / 2, cy = h * 0.5;
  bgStars(ctx, s, w, h, 80, 21, 0.6);
  const P = ORION.map(([, x, y]) => [cx + x * S, cy + y * S]);
  if (on) ORION_L.forEach(([a, b], i) => {
    const k = clamp(t / 0.3 - i, 0, 1); if (!k) return;
    ctx.strokeStyle = 'rgba(127,227,255,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(P[a][0], P[a][1]); ctx.lineTo(lerp(P[a][0], P[b][0], k), lerp(P[a][1], P[b][1], k)); ctx.stroke();
  });
  ORION.forEach(([n, , , c, m], i) => { const tw = 1 + 0.15 * Math.sin(t * 3 + i); glow(ctx, P[i][0], P[i][1], m * 3.5 * tw, c); circle(ctx, P[i][0], P[i][1], m * 0.7, '#fff'); });
  if (on && t > 2.5) {
    label(ctx, 'Betelgeuse', P[0][0] - 8, P[0][1] - 16, f * 0.68, '#ffb08a', 'right'); label(ctx, 'Rigel', P[7][0] + 8, P[7][1] + 14, f * 0.68, '#a8c4ff', 'left');
    label(ctx, 'Las Tres Marías', cx + S * 0.55, cy + 4, f * 0.7, '#ffd166', 'left');
  }
  pill(ctx, on ? 'Orión, el cazador' : 'Solo puntos de luz...', cx, h - f * 1.1, f * 0.85, on ? '#7fe3ff' : '#dfe3ff');
};

ANIMS.depth = (ctx, w, h, t, s) => {
  const f = fs(w), g = ctl(s, 'giro', 90 * (0.5 - 0.5 * Math.cos(t * 0.5))); s.giro_txt = Math.round(g) + '°';
  const a = g * Math.PI / 180, S = Math.min(w, h) * 0.38, cx = w * 0.52, cy = h * 0.48;
  const P = ORION.map(([, x, y, , , d]) => { const Z = (d / 2000 - 0.55) * w * 0.75; return [cx + x * S * Math.cos(a) + Z * Math.sin(a), cy + y * S]; });
  const la = Math.pow(Math.cos(a), 3);
  if (la > 0.02) ORION_L.forEach(([p, q]) => { ctx.strokeStyle = `rgba(127,227,255,${0.6 * la})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(P[p][0], P[p][1]); ctx.lineTo(P[q][0], P[q][1]); ctx.stroke(); });
  ORION.forEach(([n, , , c, m, d], i) => {
    glow(ctx, P[i][0], P[i][1], m * 3.2, c); circle(ctx, P[i][0], P[i][1], m * 0.7, '#fff');
    if (g > 50) label(ctx, d.toLocaleString('es-MX') + ' a.l.', P[i][0], P[i][1] + 13, f * 0.55, '#aab0dd', 'center', 700);
  });
  const ea = Math.sin(a);
  if (ea > 0.3) { ctx.globalAlpha = ea; earth(ctx, w * 0.04, cy, 8); label(ctx, 'Tierra', w * 0.04, cy + 18, f * 0.6, '#7fc8ff', 'left'); ctx.globalAlpha = 1; }
  pill(ctx, g < 20 ? 'Visto desde la Tierra: un dibujo' : g > 70 ? 'De lado: ¡están a distancias muy distintas!' : 'Girando la vista...', w / 2, f * 1.1, f * 0.82, '#ffd166');
};

ANIMS.startrails = (ctx, w, h, t, s) => {
  const f = fs(w), hrs = ctl(s, 'horas', (t * 1.3) % 12); s.horas_txt = Math.round(hrs) + ' h';
  const px = w * 0.5, py = h * 0.32;
  if (!s.st || s.stw !== w) { const r = rnd(33); s.stw = w; s.st = [...Array(170)].map(() => ({ r: 8 + Math.sqrt(r()) * Math.max(w, h) * 0.9, a: r() * TAU, c: r() })); }
  const span = hrs * 15 * Math.PI / 180;
  s.st.forEach(q => {
    const col = q.c < 0.2 ? '255,190,150' : q.c > 0.85 ? '170,200,255' : '255,255,255';
    if (span > 0.01) { ctx.strokeStyle = `rgba(${col},.45)`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(px, py, q.r, q.a - span, q.a); ctx.stroke(); }
    const hx = px + Math.cos(q.a - span) * q.r, hy = py + Math.sin(q.a - span) * q.r; ctx.fillStyle = `rgba(${col},.95)`; ctx.fillRect(hx - 0.8, hy - 0.8, 1.8, 1.8);
  });
  glow(ctx, px, py, 9, 'rgba(255,255,230,1)'); label(ctx, 'Estrella Polar', px, py - 15, f * 0.72, '#ffe6b0');
  const gy = h * 0.82; ctx.fillStyle = '#0b0818'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, gy); ctx.quadraticCurveTo(w * 0.3, gy - 25, w * 0.6, gy - 5); ctx.quadraticCurveTo(w * 0.85, gy + 8, w, gy - 15); ctx.lineTo(w, h); ctx.fill();
  ctx.fillRect(w * 0.78 - 2, gy - 34, 4, 30); circle(ctx, w * 0.78, gy - 40, 13, '#0b0818');
  label(ctx, 'Foto de ' + Math.round(hrs) + ' horas: el cielo gira alrededor de la Polar', w / 2, h - f * 0.9, f * 0.72, '#dfe3ff');
};

/* ---------- 15. Día, noche y mareas ---------- */
function fmtHora(hh) { const H = Math.floor(hh) % 24, m = Math.floor((hh % 1) * 60); return String(H).padStart(2, '0') + ':' + String(m).padStart(2, '0'); }
ANIMS.daynight = (ctx, w, h, t, s) => {
  const f = fs(w), hora = ctl(s, 'hora', (12 + t * 2) % 24); s.hora_txt = fmtHora(hora);
  const cx = w * 0.56, cy = h * 0.5, R = Math.min(w, h) * 0.33, ang = Math.PI + (hora - 12) / 24 * TAU;
  for (let i = 0; i < 5; i++) arrow(ctx, w * 0.02, h * (0.15 + i * 0.17), w * 0.14, h * (0.15 + i * 0.17), 'rgba(255,209,102,.6)', 1.5);
  label(ctx, 'Sol', w * 0.08, h * 0.06, f * 0.7, '#ffd166');
  const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R); g.addColorStop(0, '#3a8ff0'); g.addColorStop(1, '#1a4fb0');
  circle(ctx, cx, cy, R, g);
  ctx.fillStyle = 'rgba(80,200,120,.85)';
  [[0, 0.65, 0.22], [1.6, 0.55, 0.18], [3.2, 0.7, 0.25], [4.6, 0.5, 0.15]].forEach(([o, d, sz]) => { const a = ang + o; circle(ctx, cx + Math.cos(a) * R * d, cy - Math.sin(a) * R * d, R * sz, 'rgba(80,200,120,.8)'); });
  circle(ctx, cx, cy, R * 0.22, 'rgba(255,255,255,.9)');
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R + 0.5, 0, TAU); ctx.clip();
  const sh = ctx.createLinearGradient(cx - R * 0.1, 0, cx + R * 0.1, 0); sh.addColorStop(0, 'rgba(5,5,25,0)'); sh.addColorStop(1, 'rgba(5,5,25,.78)');
  ctx.fillStyle = sh; ctx.fillRect(cx - R * 0.1, cy - R, R * 1.2, R * 2); ctx.restore();
  const mx = cx + Math.cos(ang) * R * 0.78, my = cy - Math.sin(ang) * R * 0.78;
  glow(ctx, mx, my, 12, 'rgba(255,122,217,.8)'); circle(ctx, mx, my, 4.5, '#ff7ad9');
  label(ctx, 'México', mx, my - 13, f * 0.68, '#fff');
  label(ctx, 'DÍA', cx - R * 0.55, cy - R - f * 0.6, f * 0.75, '#ffd166'); label(ctx, 'NOCHE', cx + R * 0.55, cy - R - f * 0.6, f * 0.75, '#8fa0ff');
  const H = hora;
  const st = H < 5.5 ? 'noche' : H < 7 ? 'amanecer' : H < 11.5 ? 'mañana' : H < 13 ? 'mediodía' : H < 18.5 ? 'tarde' : H < 20 ? 'atardecer' : 'noche';
  pill(ctx, `${fmtHora(hora)} en México: ${st}`, w / 2, h - f * 1.0, f * 0.85, '#ff9ae3');
};

ANIMS.sunpath = (ctx, w, h, t, s) => {
  const f = fs(w), sum = (s.est || 'verano') === 'verano', gy = h * 0.74, P = 8, k = (t % P) / P;
  const x0 = sum ? w * 0.06 : w * 0.24, x1 = sum ? w * 0.94 : w * 0.76, peak = sum ? h * 0.6 : h * 0.3, maxAlt = sum ? 88 : 41;
  const x = lerp(x0, x1, k), y = gy - peak * 4 * k * (1 - k), alt = maxAlt * 4 * k * (1 - k);
  const day = alt / maxAlt; const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, `rgba(${lerp(20, 60, day)},${lerp(20, 130, day)},${lerp(60, 220, day)},.9)`); sky.addColorStop(1, `rgba(${lerp(200, 150, day)},${lerp(110, 200, day)},${lerp(90, 255, day)},.9)`);
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, gy);
  ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const q = i / 40; const xx = lerp(x0, x1, q), yy = gy - peak * 4 * q * (1 - q); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.setLineDash([]);
  sunBall(ctx, x, y, 13);
  ctx.fillStyle = '#2b5a3a'; ctx.fillRect(0, gy, w, h - gy);
  const px = w / 2, ph = 34, shL = Math.min(w * 0.45, ph / Math.tan(Math.max(3, alt) * Math.PI / 180)), dir = x < px ? 1 : -1;
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(px + dir * shL / 2, gy + 3, shL / 2, 4, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy - ph * 0.55); ctx.stroke(); ctx.lineCap = 'butt'; circle(ctx, px, gy - ph * 0.75, 6, '#ffd6f5');
  label(ctx, 'Este', w * 0.05, gy + f, f * 0.7, '#dfe3ff', 'left'); label(ctx, 'Oeste', w * 0.95, gy + f, f * 0.7, '#dfe3ff', 'right');
  pill(ctx, sum ? 'Verano: el Sol sube alto · día de 13.5 h' : 'Invierno: el Sol va bajito · día de 10.5 h', w / 2, h - f * 0.9, f * 0.8, sum ? '#ffb347' : '#7fe3ff');
};

ANIMS.tides = (ctx, w, h, t, s) => {
  const f = fs(w), hora = ctl(s, 'hora2', (t * 2) % 24); s.hora2_txt = fmtHora(hora);
  const cx = w * 0.38, cy = h * 0.48, R = Math.min(w, h) * 0.24, pa = Math.PI + hora / 24 * TAU;
  ctx.fillStyle = 'rgba(60,150,255,.55)'; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.32, R * 1.06, 0, 0, TAU); ctx.fill();
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R); g.addColorStop(0, '#7ccf8a'); g.addColorStop(1, '#3a7a4a'); circle(ctx, cx, cy, R, g);
  ball(ctx, w * 0.9, cy, Math.min(w, h) * 0.06, '#d8d6cc'); label(ctx, 'Luna', w * 0.9, cy + Math.min(w, h) * 0.1, f * 0.75, '#e8e6da');
  arrow(ctx, w * 0.78, cy, w * 0.66, cy, 'rgba(232,230,218,.6)', 1.5); label(ctx, 'jala el agua', w * 0.72, cy - 12, f * 0.62, '#aab0dd', 'center', 700);
  const lvl = Math.cos(2 * pa), px = cx + Math.cos(pa) * R, py = cy - Math.sin(pa) * R;
  circle(ctx, px, py, 5, '#ffd166'); label(ctx, 'playa', px + Math.cos(pa) * 22, py - Math.sin(pa) * 22, f * 0.65, '#ffd166');
  const gx = w * 0.88, gt = h * 0.12, gh = h * 0.2; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.strokeRect(gx - 10, gt, 20, gh);
  const wl = gt + gh * (0.5 - lvl * 0.4); ctx.fillStyle = 'rgba(60,150,255,.8)'; ctx.fillRect(gx - 9, wl, 18, gt + gh - wl - 1);
  label(ctx, 'nivel del mar', gx, gt - f * 0.6, f * 0.6, '#aab0dd', 'center', 700);
  pill(ctx, lvl > 0.5 ? 'Marea alta' : lvl < -0.5 ? 'Marea baja' : lvl > 0 ? 'La marea cambia...' : 'La marea cambia...', w * 0.4, h - f * 1.0, f * 0.85, lvl > 0.5 ? '#7fe3ff' : '#dfe3ff');
};

/* ---------- 16. Exoplanetas ---------- */
function overlapFrac(d, R, r) {
  if (d >= R + r) return 0; if (d <= R - r) return (r * r) / (R * R);
  const r2 = r * r, R2 = R * R, a = r2 * Math.acos((d * d + r2 - R2) / (2 * d * r)) + R2 * Math.acos((d * d + R2 - r2) / (2 * d * R)) - 0.5 * Math.sqrt(Math.max(0, (-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R)));
  return a / (Math.PI * R2);
}
ANIMS.transit = (ctx, w, h, t, s) => {
  const f = fs(w), tam = s.tam || 4, sr = Math.min(w, h) * 0.2, scx = w / 2, scy = h * 0.3, rp = sr * tam * 0.04; s.tam_txt = tam;
  const P = 6, k = (t % P) / P, X = q => lerp(scx - sr * 1.9, scx + sr * 1.9, q);
  const g = ctx.createRadialGradient(scx, scy, 0, scx, scy, sr); g.addColorStop(0, '#fff8d0'); g.addColorStop(0.7, '#ffd34d'); g.addColorStop(1, '#ff9a2a');
  glow(ctx, scx, scy, sr * 1.6, 'rgba(255,200,80,.35)'); circle(ctx, scx, scy, sr, g);
  circle(ctx, X(k), scy + sr * 0.1, rp, '#17122e');
  const gx0 = w * 0.08, gx1 = w * 0.92, gt = h * 0.66, gb = h * 0.93;
  ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gt); ctx.lineTo(gx1, gt); ctx.stroke();
  label(ctx, 'brillo', gx0, gt - f * 0.7, f * 0.65, '#aab0dd', 'left', 700);
  ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const q = i / 120 * k; const fr = overlapFrac(Math.abs(X(q) - scx), sr, rp); const y = gt + fr * (gb - gt) * 2.6; i ? ctx.lineTo(lerp(gx0, gx1, q), y) : ctx.moveTo(gx0, y); }
  ctx.stroke();
  const depth = (rp / sr) ** 2;
  pill(ctx, `El brillo baja ${(depth * 100).toFixed(1)}%`, w * 0.72, h * 0.56, f * 0.75, '#ffd166');
};

ANIMS.habitable = (ctx, w, h, t, s) => {
  const f = fs(w), st = s.estrella || 'amarilla', cy = h * 0.55;
  const Z = { roja: [0.17, 0.3, '#ff6a4a', 0.07], amarilla: [0.4, 0.6, '#ffe27a', 0.1], azul: [0.68, 0.9, '#a8c4ff', 0.14] }[st];
  const sx = -w * 0.02, M = Math.min(w, h);
  const z0 = Z[0] * w, z1 = Z[1] * w;
  ctx.fillStyle = 'rgba(62,230,160,.18)'; ctx.beginPath(); ctx.arc(sx, cy, z1, 0, TAU); ctx.arc(sx, cy, z0, 0, TAU, true); ctx.fill();
  ctx.strokeStyle = 'rgba(62,230,160,.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(sx, cy, z0, -1.2, 1.2); ctx.stroke(); ctx.beginPath(); ctx.arc(sx, cy, z1, -1.2, 1.2); ctx.stroke(); ctx.setLineDash([]);
  label(ctx, 'zona habitable', (z0 + z1) / 2 + sx, h * 0.14, f * 0.7, '#3ee6a0');
  glow(ctx, sx, cy, M * Z[3] * 3.5, Z[2] + '88'); circle(ctx, sx, cy, M * Z[3] * 1.4, Z[2]);
  const d = (s.dist || 50) / 100 * w; s.dist_txt = '';
  const a = Math.sin(t * 0.4) * 0.25, px = sx + Math.cos(a) * d, py = cy + Math.sin(a) * d * 0.5;
  const state = d < z0 ? 0 : d > z1 ? 2 : 1, pr = M * 0.045;
  if (state === 0) { ball(ctx, px, py, pr, '#e0603c', '#ffd0a0'); for (let i = 0; i < 4; i++) { const yy = py - pr - 4 - ((t * 20 + i * 8) % 22); ctx.fillStyle = `rgba(255,255,255,${0.5 - ((t * 20 + i * 8) % 22) / 44})`; circle(ctx, px + Math.sin(t * 3 + i) * 5, yy, 3, ctx.fillStyle); } }
  else if (state === 1) { earth(ctx, px, py, pr, t * 0.2); }
  else { ball(ctx, px, py, pr, '#cfe8ff', '#ffffff'); }
  pill(ctx, ['¡Muy caliente! El agua hierve', '¡Justo bien! Puede haber agua líquida', '¡Muy frío! El agua se congela'][state], w * 0.55, h - f * 1.0, f * 0.82, ['#ff8a5a', '#3ee6a0', '#a8c4ff'][state]);
};

ANIMS.wobble = (ctx, w, h, t) => {
  const f = fs(w), cx = w / 2, cy = h * 0.38, a = t * 1.1, Rp = Math.min(w, h) * 0.36, rs = Rp * 0.1;
  const sxp = cx - Math.cos(a) * rs, syp = cy - Math.sin(a) * rs * 0.35, px = cx + Math.cos(a) * Rp, py = cy + Math.sin(a) * Rp * 0.35;
  ctx.strokeStyle = 'rgba(160,150,255,.25)'; ctx.beginPath(); ctx.ellipse(cx, cy, Rp, Rp * 0.35, 0, 0, TAU); ctx.stroke();
  const shift = -Math.cos(a), col = shift > 0 ? `rgb(${Math.round(255 - shift * 120)},${Math.round(230 - shift * 30)},255)` : `rgb(255,${Math.round(230 + shift * 110)},${Math.round(200 + shift * 120)})`;
  const back = Math.sin(a) < 0;
  if (back) ball(ctx, px, py, 5, '#6fb6ff');
  glow(ctx, sxp, syp, 30, col); circle(ctx, sxp, syp, 13, col);
  if (!back) ball(ctx, px, py, 5, '#6fb6ff');
  label(ctx, 'planeta', px, py - 14, f * 0.62, '#9fd0ff', 'center', 700);
  const by = h * 0.8, bx0 = w * 0.1, bx1 = w * 0.9, gr = ctx.createLinearGradient(bx0, 0, bx1, 0);
  ['#7a3cff', '#3f6bff', '#3fd0ff', '#3ee6a0', '#fff15a', '#ffa64d', '#ff4a4a'].forEach((c, i) => gr.addColorStop(i / 6, c));
  ctx.fillStyle = gr; ctx.fillRect(bx0, by - 10, bx1 - bx0, 20);
  const lx = w / 2 - shift * w * 0.08; ctx.fillStyle = '#000'; ctx.fillRect(lx - 2, by - 10, 4, 20);
  label(ctx, 'luz de la estrella', w / 2, by - 20, f * 0.62, '#aab0dd', 'center', 700);
  pill(ctx, shift > 0.35 ? 'Se acerca: luz más azul' : shift < -0.35 ? 'Se aleja: luz más roja' : 'La estrella baila...', w / 2, h * 0.6, f * 0.78, shift > 0.35 ? '#8fb4ff' : shift < -0.35 ? '#ff8a8a' : '#dfe3ff');
};

/* ---------- 17. Luz invisible y telescopios ---------- */
const BANDAS = [['Radio', '#ff6ad5', 'Los radiotelescopios escuchan galaxias lejanas'], ['Microondas', '#ff9a5a', 'El eco del Big Bang brilla en microondas'],
  ['Infrarrojo', '#ff5a5a', 'Es calor. El telescopio James Webb ve así'], ['Luz visible', null, 'La única que ven tus ojos'],
  ['Ultravioleta', '#b28cff', 'La que te quema en la playa'], ['Rayos X', '#7fe3ff', 'Salen de gas muy caliente cerca de agujeros negros'], ['Rayos gamma', '#3ee6a0', 'Vienen de las explosiones más fuertes']];
const RAINBOW = ['#ff4a4a', '#ffa64d', '#fff15a', '#3ee6a0', '#3fd0ff', '#3f6bff', '#9a5bff'];
ANIMS.spectrum = (ctx, w, h, t, s) => {
  const f = fs(w), v = ctl(s, 'onda', 3 + 3 * Math.sin(t * 0.35)), idx = clamp(Math.round(v), 0, 6), B = BANDAS[idx]; s.onda_txt = B[0];
  const cy = h * 0.33, A = h * 0.13, lam = w * 0.7 * Math.pow(0.55, v);
  let stroke;
  if (B[1]) stroke = B[1]; else { stroke = ctx.createLinearGradient(0, 0, w, 0); RAINBOW.forEach((c, i) => stroke.addColorStop(i / 6, c)); }
  ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.beginPath();
  for (let x = 0; x <= w; x += Math.max(0.5, lam / 24)) { const y = cy + Math.sin(x / lam * TAU - t * 5) * A; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke();
  label(ctx, B[0], w / 2, h * 0.58, f * 1.15, B[1] || '#fff15a'); label(ctx, B[2], w / 2, h * 0.68, f * 0.75, '#dfe3ff', 'center', 700);
  const bx0 = w * 0.06, bw = (w * 0.88) / 7, by = h * 0.82;
  BANDAS.forEach((b, i) => {
    if (b[1]) { ctx.fillStyle = b[1]; ctx.globalAlpha = i === idx ? 1 : 0.35; ctx.fillRect(bx0 + i * bw, by, bw - 2, 14); }
    else { const g = ctx.createLinearGradient(bx0 + i * bw, 0, bx0 + (i + 1) * bw, 0); RAINBOW.forEach((c, j) => g.addColorStop(j / 6, c)); ctx.fillStyle = g; ctx.globalAlpha = i === idx ? 1 : 0.5; ctx.fillRect(bx0 + i * bw, by, bw - 2, 14); }
    ctx.globalAlpha = 1;
  });
  const mx = bx0 + (v + 0.5) * bw; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(mx, by - 2); ctx.lineTo(mx - 6, by - 10); ctx.lineTo(mx + 6, by - 10); ctx.fill();
  label(ctx, 'ondas largas', bx0, by + 24, f * 0.6, '#aab0dd', 'left', 700); label(ctx, 'ondas cortas', bx0 + bw * 7, by + 24, f * 0.6, '#aab0dd', 'right', 700);
};

ANIMS.telescope = (ctx, w, h, t, s) => {
  const f = fs(w), ap = s.ap || 2; s.ap_txt = ap === 1 ? 'ojo' : ap;
  const lx = w * 0.42, fx = w * 0.84, cy = h * 0.5, L = h * 0.042 * ap, sp = h * 0.05;
  let n = 0;
  for (let y = cy - h * 0.44; y <= cy + h * 0.44; y += sp) {
    const inside = Math.abs(y - cy) <= L, ph = ((t * 0.6 + (y / sp) * 0.13) % 1);
    if (inside) {
      n++; ctx.strokeStyle = 'rgba(255,230,140,.75)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(lx, y); ctx.lineTo(fx, cy); ctx.stroke();
      const tot = lx + Math.hypot(fx - lx, cy - y), d = ph * tot;
      const [px, py] = d < lx ? [d, y] : [lerp(lx, fx, (d - lx) / (tot - lx)), lerp(y, cy, (d - lx) / (tot - lx))];
      circle(ctx, px, py, 2.5, '#fff6c8');
    } else { ctx.strokeStyle = 'rgba(255,230,140,.15)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }
  ctx.fillStyle = 'rgba(127,200,255,.35)'; ctx.strokeStyle = 'rgba(160,220,255,.9)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(lx, cy, Math.max(3, L * 0.12), Math.max(2, L), 0, 0, TAU); ctx.fill(); ctx.stroke();
  const br = n / 17; glow(ctx, fx, cy, 6 + br * 40, `rgba(255,250,220,${0.3 + br * 0.7})`);
  label(ctx, `Rayos atrapados: ${n}`, fx, h * 0.12, f * 0.78, '#ffd166');
  pill(ctx, ap <= 1 ? 'Tu ojo: entra poquita luz' : ap < 6 ? 'Lente más grande = más luz' : '¡Espejo gigante! Ves cosas muy débiles', w / 2, h - f * 1.0, f * 0.82);
};

ANIMS.infrared = (ctx, w, h, t, s) => {
  const f = fs(w), ir = (s.vista2 || 'visible') === 'infrarrojo';
  s.mix = lerp(s.mix || 0, ir ? 1 : 0, 0.07); const m = s.mix;
  if (!s.cl || s.clw !== w) { const r = rnd(77); s.clw = w; s.cl = [...Array(26)].map(() => ({ x: w * (0.25 + r() * 0.5), y: h * (0.15 + r() * 0.75), rx: w * (0.08 + r() * 0.12), ry: h * (0.08 + r() * 0.15) })); s.hid = [...Array(55)].map(() => ({ x: w * (0.25 + r() * 0.5), y: h * (0.15 + r() * 0.7), z: r() })); }
  ctx.fillStyle = `rgba(${lerp(8, 40, m)},${lerp(8, 10, m)},${lerp(30, 50, m)},.85)`; ctx.fillRect(0, 0, w, h);
  bgStars(ctx, s, w, h, 50, 61, 0.7);
  s.cl.forEach(c => { ctx.fillStyle = `rgba(${lerp(60, 230, m)},${lerp(35, 90, m)},${lerp(25, 60, m)},${lerp(0.9, 0.18, m)})`; ctx.beginPath(); ctx.ellipse(c.x, c.y, c.rx, c.ry, 0.3, 0, TAU); ctx.fill(); });
  if (m < 0.5) s.cl.slice(0, 8).forEach(c => { ctx.strokeStyle = `rgba(255,170,110,${0.35 * (1 - m * 2)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(c.x, c.y, c.rx, c.ry, 0.3, -2.4, -0.8); ctx.stroke(); });
  s.hid.forEach((q, i) => { const a = m * (0.6 + 0.4 * Math.sin(t * 2 + i)); if (a < 0.02) return; glow(ctx, q.x, q.y, 4 + q.z * 9, `rgba(255,${200 + q.z * 55},${170 + q.z * 80},${a})`); });
  pill(ctx, ir ? 'Infrarrojo: vemos a través del polvo ¡estrellas bebé!' : 'Luz visible: el polvo tapa lo que hay detrás', w / 2, h - f * 1.0, f * 0.8, ir ? '#ff9a7a' : '#dfe3ff');
};

/* ---------- 18. Cohetes ---------- */
function drawRocket(ctx, x, y, sc, flame, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  if (flame > 0) { const fl = flame * (1 + 0.15 * Math.sin(t * 40)); const g = ctx.createLinearGradient(0, 20, 0, 20 + fl); g.addColorStop(0, '#fff6c8'); g.addColorStop(0.4, '#ffb347'); g.addColorStop(1, 'rgba(255,80,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-8, 20); ctx.quadraticCurveTo(0, 20 + fl * 1.1, 8, 20); ctx.fill(); }
  ctx.fillStyle = '#e8ecff'; roundRect(ctx, -10, -28, 20, 48, 6); ctx.fill();
  ctx.fillStyle = '#ff5e7a'; ctx.beginPath(); ctx.moveTo(-10, -26); ctx.quadraticCurveTo(0, -52, 10, -26); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, 8); ctx.lineTo(-20, 22); ctx.lineTo(-10, 18); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, 8); ctx.lineTo(20, 22); ctx.lineTo(10, 18); ctx.fill();
  circle(ctx, 0, -10, 5, '#3fd0ff'); ctx.restore();
}
ANIMS.rocket = (ctx, w, h, t, s) => {
  const f = fs(w), T = s.emp || 3, W = 5, gy = h * 0.88, cx = w * 0.45; s.emp_txt = T;
  const dt = Math.min(0.05, t - (s.last ?? t)); s.last = t; s.y = s.y || 0; s.v = s.v || 0;
  const acc = (T - W) * h * 0.06;
  if (s.y > 0 || acc > 0) { s.v += acc * dt; s.y += s.v * dt; if (s.y <= 0) { s.y = 0; s.v = 0; } }
  if (s.y > h * 1.1) { s.y = 0; s.v = 0; }
  ctx.fillStyle = '#2a2440'; ctx.fillRect(0, gy, w, h - gy); ctx.fillStyle = '#5a5470'; ctx.fillRect(cx - 30, gy - 4, 60, 4);
  s.parts = (s.parts || []).filter(p => t - p.t < 0.9);
  const ry = gy - 28 - s.y;
  for (let i = 0; i < T * 1.2; i++) s.parts.push({ x: cx + (Math.random() - 0.5) * 8, y: ry + 26, vx: (Math.random() - 0.5) * 50, vy: 60 + Math.random() * 80, t });
  s.parts.forEach(p => { const k = t - p.t; let y = p.y + p.vy * k, x = p.x + p.vx * k; if (y > gy - 4) { y = gy - 4; x += p.vx * k * 2; } ctx.fillStyle = `rgba(220,210,230,${0.5 * (1 - k / 0.9)})`; circle(ctx, x, y, 3 + k * 10, ctx.fillStyle); });
  drawRocket(ctx, cx, ry, 1, T * 5, t);
  const ax = cx + 44; arrow(ctx, ax, ry, ax, ry - T * 9 - 4, '#3ee6a0', 3); label(ctx, 'empuje', ax + 6, ry - T * 9 - 10, f * 0.65, '#3ee6a0', 'left');
  arrow(ctx, ax + 30, ry - 20, ax + 30, ry - 20 + W * 9, '#ff8a9a', 3); label(ctx, 'peso', ax + 36, ry - 20 + W * 9 + 8, f * 0.65, '#ff8a9a', 'left');
  pill(ctx, T > W ? '¡Despegue! El empuje le gana al peso' : 'Falta empuje: el peso gana', w / 2, f * 1.1, f * 0.85, T > W ? '#3ee6a0' : '#ff8a9a');
};

ANIMS.stages = (ctx, w, h, t, s) => {
  const f = fs(w), P = 10, p = t % P, cx = w / 2, ry = h * 0.42;
  const sp = 30 + p * p * 8; const day = clamp(1 - p / 3.5, 0, 1);
  ctx.fillStyle = `rgba(${60 * day},${130 * day},${220 * day},${0.8 * day})`; ctx.fillRect(0, 0, w, h);
  if (!s.sf) { const r = rnd(5); s.sf = [...Array(60)].map(() => [r() * w, r() * h]); }
  ctx.fillStyle = `rgba(255,255,255,${1 - day})`; s.sf.forEach(q => { const y = (q[1] + t * sp) % h; ctx.fillRect(q[0], y, 1.5, 1.5 + sp / 60); });
  const fl = (n, y) => { const g = ctx.createLinearGradient(0, y, 0, y + 40); g.addColorStop(0, '#fff6c8'); g.addColorStop(0.4, '#ffb347'); g.addColorStop(1, 'rgba(255,80,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - n, y); ctx.quadraticCurveTo(cx, y + 45 * (1 + 0.1 * Math.sin(t * 40)), cx + n, y); ctx.fill(); };
  const s1 = p > 3, s2 = p > 6;
  if (s1) { const k = p - 3; ctx.save(); ctx.translate(cx - k * 10, ry + 46 + k * k * 30); ctx.rotate(-k * 0.4); ctx.globalAlpha = clamp(1 - k / 2.5, 0, 1); ctx.fillStyle = '#cfd5ef'; ctx.fillRect(-13, -2, 26, 46); ctx.restore(); ctx.globalAlpha = 1; }
  if (s2) { const k = p - 6; ctx.save(); ctx.translate(cx + k * 10, ry + 16 + k * k * 30); ctx.rotate(k * 0.4); ctx.globalAlpha = clamp(1 - k / 2.5, 0, 1); ctx.fillStyle = '#b8c0e0'; ctx.fillRect(-11, 0, 22, 30); ctx.restore(); ctx.globalAlpha = 1; }
  if (!s1) { ctx.fillStyle = '#cfd5ef'; ctx.fillRect(cx - 13, ry + 46, 26, 46); fl(10, ry + 92); }
  if (!s2) { ctx.fillStyle = '#b8c0e0'; ctx.fillRect(cx - 11, ry + 16, 22, 30); if (s1) fl(8, ry + 46); }
  ctx.fillStyle = '#e8ecff'; roundRect(ctx, cx - 9, ry - 8, 18, 24, 4); ctx.fill();
  ctx.fillStyle = '#ff5e7a'; ctx.beginPath(); ctx.moveTo(cx - 9, ry - 6); ctx.quadraticCurveTo(cx, ry - 30, cx + 9, ry - 6); ctx.fill();
  circle(ctx, cx, ry + 3, 4, '#3fd0ff'); if (s2) fl(5, ry + 16);
  const txt = p < 3 ? 'Etapa 1: la más grande, empuja desde el suelo' : p < 6 ? 'Se suelta la etapa 1. Ahora empuja la 2' : 'Se suelta la 2: menos peso, ¡más rápido!';
  pill(ctx, txt, cx, h - f * 1.0, f * 0.78, '#ffd166');
};

ANIMS.satorbits = (ctx, w, h, t, s) => {
  const f = fs(w), key = s.orb || 'baja', cx = w / 2, cy = h * 0.54, R = Math.min(w, h) * 0.1;
  const O = { baja: [400, 1.5 / 24, 'Estación Espacial: 400 km, 1 vuelta cada 90 min'], gps: [20200, 0.5, 'GPS: 20,200 km, 1 vuelta cada 12 h'], geo: [35786, 1, 'Geoestacionario: 36,000 km, ¡se queda fijo sobre un lugar!'] };
  const rad = alt => R * (1 + 1.55 * Math.sqrt(alt / 6371)), ang = t * TAU / 12;
  Object.entries(O).forEach(([k, o]) => { ctx.strokeStyle = k === key ? 'rgba(127,227,255,.7)' : 'rgba(160,150,255,.18)'; ctx.lineWidth = k === key ? 1.5 : 1; ctx.beginPath(); ctx.arc(cx, cy, rad(o[0]), 0, TAU); ctx.stroke(); });
  earth(ctx, cx, cy, R, t / 12 * 2);
  const mx = cx + Math.cos(ang - Math.PI / 2) * R, my = cy + Math.sin(ang - Math.PI / 2) * R; circle(ctx, mx, my, 3.5, '#ff7ad9');
  const o = O[key], sa = ang * (1 / o[1]) - Math.PI / 2, r = rad(o[0]), sx = cx + Math.cos(sa) * r, sy = cy + Math.sin(sa) * r;
  if (key === 'geo') { ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(255,122,217,.6)'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(sx, sy); ctx.stroke(); ctx.setLineDash([]); }
  ctx.fillStyle = '#7fe3ff'; ctx.fillRect(sx - 9, sy - 2, 6, 4); ctx.fillRect(sx + 3, sy - 2, 6, 4); circle(ctx, sx, sy, 3.5, '#fff');
  pill(ctx, o[2], cx, f * 1.1, f * 0.72, '#7fe3ff');
  label(ctx, 'punto rosa = México (la Tierra gira)', cx, h - f * 0.7, f * 0.62, '#aab0dd', 'center', 700);
};

/* ---------- 19. Materia oscura ---------- */
ANIMS.rotcurve = (ctx, w, h, t, s) => {
  const f = fs(w), real = (s.modo || 'real') === 'real', cx = w * 0.29, cy = h * 0.5, R = Math.min(w * 0.26, h * 0.42);
  const vel = r => real ? Math.min(1, r / 0.2) : (r < 0.2 ? r / 0.2 : Math.sqrt(0.2 / r));
  if (real) { glow(ctx, cx, cy, R * 1.35, 'rgba(139,108,255,.3)', 'rgba(139,108,255,0)'); ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(180,160,255,.6)'; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, TAU); ctx.stroke(); ctx.setLineDash([]); label(ctx, 'materia oscura', cx, cy - R * 1.25 - 8, f * 0.62, '#c9bcff', 'center', 700); }
  glow(ctx, cx, cy, R * 0.3, 'rgba(255,225,170,.9)');
  [0.25, 0.45, 0.65, 0.85, 1].forEach((r, i) => {
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.arc(cx, cy, r * R, 0, TAU); ctx.stroke();
    for (let j = 0; j < 4; j++) { const a = j * TAU / 4 + i + t * vel(r) / r * 0.5; ctx.strokeStyle = 'rgba(180,205,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r * R, a - 0.25 * vel(r) / r * 0.3, a); ctx.stroke(); circle(ctx, cx + Math.cos(a) * r * R, cy + Math.sin(a) * r * R, 2.5, '#fff'); }
  });
  const gx0 = w * 0.62, gx1 = w * 0.96, gy0 = h * 0.2, gy1 = h * 0.78;
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  label(ctx, 'velocidad', gx0, gy0 - f * 0.6, f * 0.6, '#aab0dd', 'left', 700); label(ctx, 'distancia al centro', (gx0 + gx1) / 2, gy1 + f * 0.8, f * 0.6, '#aab0dd', 'center', 700);
  [[false, '#ffb347'], [true, '#3fd0ff']].forEach(([rm, c]) => {
    ctx.strokeStyle = c; ctx.globalAlpha = rm === real ? 1 : 0.3; ctx.lineWidth = rm === real ? 2.5 : 1.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const r = 0.02 + i / 40 * 0.98, v = rm ? Math.min(1, r / 0.2) : (r < 0.2 ? r / 0.2 : Math.sqrt(0.2 / r)); const x = lerp(gx0, gx1, r), y = lerp(gy1, gy0 + 10, v); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.globalAlpha = 1;
  });
  pill(ctx, real ? 'Medido: las de afuera van igual de rápido' : 'Esperado: las de afuera irían más lento', w / 2, h - f * 0.9, f * 0.8, real ? '#3fd0ff' : '#ffb347');
};

const PARTES = [['normal', 'Materia normal', 5, '#ffd166', 'Todo lo que vemos: estrellas, planetas, tú'], ['oscura', 'Materia oscura', 27, '#8b6cff', 'Invisible, pero su gravedad se nota'], ['energia', 'Energía oscura', 68, '#3fd0ff', 'Hace que el universo crezca cada vez más rápido']];
ANIMS.pie = (ctx, w, h, t, s) => {
  const f = fs(w), sel = s._mparte ? PARTES.findIndex(p => p[0] === s.parte) : Math.floor(t / 3) % 3;
  const cx = w * 0.3, cy = h * 0.5, R = Math.min(w * 0.25, h * 0.38), grow = ease(clamp(t / 1.2, 0, 1));
  let a0 = -Math.PI / 2;
  PARTES.forEach(([, , pct, c], i) => {
    const a1 = a0 + pct / 100 * TAU * grow, mid = (a0 + a1) / 2, off = i === sel ? R * 0.08 : 0, ox = Math.cos(mid) * off, oy = Math.sin(mid) * off;
    ctx.fillStyle = c; ctx.globalAlpha = i === sel ? 1 : 0.45; ctx.beginPath(); ctx.arc(cx + ox, cy + oy, R, a0, a1); ctx.arc(cx + ox, cy + oy, R * 0.58, a1, a0, true); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    a0 = a1;
  });
  const P = PARTES[sel];
  label(ctx, P[2] + '%', cx, cy, f * 1.6, P[3]);
  label(ctx, P[1], w * 0.76, h * 0.32, f * 1.0, P[3]);
  wrapText(ctx, P[4], w * 0.76, h * 0.45, w * 0.4, f * 0.78, '#dfe3ff', 'center', 700);
  label(ctx, 'De qué está hecho el universo', w / 2, h - f * 0.8, f * 0.7, '#aab0dd', 'center', 700);
};

ANIMS.lensing = (ctx, w, h, t, s) => {
  const f = fs(w), m = s.masa2 ?? 5; s.masa2_txt = m;
  const cx = w / 2, cy = h * 0.48, M = Math.min(w, h), thE = M * 0.03 * m, beta = Math.sin(t * 0.5) * M * 0.3, rs = 7;
  if (m > 0) { glow(ctx, cx, cy, thE * 1.8 + 20, `rgba(139,108,255,${0.05 * m})`); ctx.setLineDash([3, 5]); ctx.strokeStyle = `rgba(180,160,255,${0.08 * m})`; ctx.beginPath(); ctx.arc(cx, cy, thE * 1.7 + 18, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }
  [[0, 0, 6], [-14, 8, 4], [12, -10, 4], [6, 14, 3], [-10, -12, 3]].forEach(([dx, dy, r]) => glow(ctx, cx + dx, cy + dy, r * 2.2, 'rgba(255,220,150,.9)'));
  if (m === 0) { glow(ctx, cx + beta, cy, rs * 1.8, 'rgba(140,190,255,1)'); }
  else {
    ctx.setLineDash([2, 3]); ctx.strokeStyle = 'rgba(140,190,255,.4)'; ctx.beginPath(); ctx.arc(cx + beta, cy, rs, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
    const disc = Math.sqrt(beta * beta + 4 * thE * thE);
    [(beta + disc) / 2, (beta - disc) / 2].forEach(th => {
      const r = Math.abs(th), dir = th >= 0 ? 0 : Math.PI, half = Math.min(Math.PI, rs / Math.max(0.5, Math.abs(beta)) * 0.9 + 0.08);
      ctx.strokeStyle = 'rgba(140,190,255,.95)'; ctx.lineWidth = rs * (r / (thE + 1) > 0.5 ? 1 : 0.6); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx, cy, r, dir - half, dir + half); ctx.stroke(); ctx.lineCap = 'butt';
    });
  }
  pill(ctx, m > 0 ? 'La masa invisible dobla la luz: arcos y anillos' : 'Sin masa extra: la luz llega derecho', cx, h - f * 0.9, f * 0.8, m > 0 ? '#c9bcff' : '#dfe3ff');
  label(ctx, 'galaxia lejana', w * 0.04, f * 1.1, f * 0.65, '#8cbeff', 'left');
};

/* ---------- 20. Escala del universo ---------- */
const ZOOM = [['Tierra y Luna', '384,400 km'], ['Sistema Solar', '9,000 millones de km'], ['Estrellas vecinas', 'unos 20 años luz'], ['Vía Láctea', '100,000 años luz'],
  ['Grupo Local', '10 millones de años luz'], ['Supercúmulo Laniakea', '520 millones de años luz'], ['Universo observable', '93,000 millones de años luz']];
ANIMS.zoom = (ctx, w, h, t, s) => {
  const f = fs(w), lv = ctl(s, 'nivel', Math.min(6, (t * 0.33) % 7.5)); const li = clamp(Math.round(lv), 0, 6); s.nivel_txt = '';
  const cx = w / 2, cy = h * 0.52, base = Math.min(w, h) * 0.4;
  if (!s.z) { const r = rnd(91); s.z = { gal: spiralPoints(900, 7, 2), st: [...Array(14)].map(() => [gauss(r) * 0.5, gauss(r) * 0.5]), lg: [...Array(30)].map(() => [gauss(r) * 0.6, gauss(r) * 0.4]),
    web: [...Array(600)].map(() => { const c = Math.floor(r() * 9), a = c * 0.7, d = r(); return [Math.cos(a) * d * 0.9 + gauss(r) * 0.05, Math.sin(a * 1.3) * d * 0.9 + gauss(r) * 0.05]; }),
    uni: [...Array(900)].map(() => { const a = r() * TAU, d = Math.sqrt(r()); return [Math.cos(a) * d, Math.sin(a) * d]; }) }; }
  const Z = s.z;
  for (let i = 0; i < 7; i++) {
    const d = i - lv; if (d < -1 || d > 1) continue;
    const al = clamp(1 - Math.abs(d), 0, 1), S = base * Math.pow(6, d);
    ctx.save(); ctx.globalAlpha = al;
    if (i === 0) { earth(ctx, cx, cy, S * 0.14, t * 0.1); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(cx, cy, S, 0, TAU); ctx.stroke(); const a = t * 0.3; ball(ctx, cx + Math.cos(a) * S, cy + Math.sin(a) * S, S * 0.04 + 1, '#d8d6cc'); }
    if (i === 1) { sunBall(ctx, cx, cy, S * 0.05 + 1); [0.2, 0.3, 0.42, 0.55, 0.72, 0.85, 0.93, 1].forEach((r, j) => { ctx.strokeStyle = 'rgba(160,150,255,.25)'; ctx.beginPath(); ctx.arc(cx, cy, S * r, 0, TAU); ctx.stroke(); const a = t * 0.5 / (j + 1) + j; circle(ctx, cx + Math.cos(a) * S * r, cy + Math.sin(a) * S * r, 2, PLANETS[j][2]); }); }
    if (i === 2) { glow(ctx, cx, cy, 8, 'rgba(255,230,140,1)'); label(ctx, 'Sol', cx, cy + 14, f * 0.6, '#ffd166'); Z.st.forEach(([x, y], j) => glow(ctx, cx + x * S, cy + y * S, 5, j % 3 ? 'rgba(255,255,255,.9)' : 'rgba(255,160,120,.9)')); glow(ctx, cx + S * 0.35, cy - S * 0.1, 7, 'rgba(255,240,200,1)'); label(ctx, 'Alfa Centauri', cx + S * 0.35, cy - S * 0.1 - 12, f * 0.6, '#fff'); }
    if (i === 3) { drawSpiral(ctx, Z.gal, cx, cy, S, t * 0.05, 0.75, 1); }
    if (i === 4) { drawSpiral(ctx, Z.gal.slice(0, 300), cx, cy, S * 0.12, t * 0.05, 0.75, 1); drawSpiral(ctx, Z.gal.slice(300, 650), cx + S * 0.6, cy - S * 0.2, S * 0.16, 1, 0.5, 1); label(ctx, 'Andrómeda', cx + S * 0.6, cy - S * 0.2 - S * 0.2, f * 0.6, '#cfe0ff'); Z.lg.forEach(([x, y]) => glow(ctx, cx + x * S, cy + y * S, 3, 'rgba(200,210,255,.7)')); }
    if (i === 5) Z.web.forEach(([x, y]) => { ctx.fillStyle = 'rgba(190,200,255,.7)'; ctx.fillRect(cx + x * S, cy + y * S, 1.6, 1.6); });
    if (i === 6) { glow(ctx, cx, cy, S * 1.05, 'rgba(80,40,140,.0)', 'rgba(255,140,90,.25)'); Z.uni.forEach(([x, y]) => { ctx.fillStyle = 'rgba(200,210,255,.6)'; ctx.fillRect(cx + x * S, cy + y * S, 1.2, 1.2); }); ctx.strokeStyle = 'rgba(255,160,110,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, S, 0, TAU); ctx.stroke(); }
    ctx.restore();
  }
  pill(ctx, `${ZOOM[li][0]} · ${ZOOM[li][1]}`, cx, f * 1.1, f * 0.82, '#ffd166');
  label(ctx, 'Mueve la barra para alejarte', cx, h - f * 0.7, f * 0.62, '#aab0dd', 'center', 700);
};

ANIMS.scaleball = (ctx, w, h, t, s) => {
  const f = fs(w), key = s.obj || 'tierra';
  const D = { tierra: ['Tierra', 'un grano de pimienta', '10.8 m', 'como una cancha de básquet de lejos', 0.9, '#4f9dff'], jupiter: ['Júpiter', 'una canica (1 cm)', '56 m', 'media cancha de fútbol', 10, '#d9a066'],
    neptuno: ['Neptuno', 'un grano de arroz', '324 m', '3 canchas de fútbol', 3.5, '#4a6cff'], proxima: ['Próxima Centauri', 'otra pelota', '2,900 km', '¡casi lo que mide México de punta a punta!', 100, '#ff8a6a'] }[key];
  const sx = w * 0.13, ox = w * 0.86, cy = h * 0.42, sr = Math.min(w, h) * 0.08;
  sunBall(ctx, sx, cy, sr); label(ctx, 'Sol = pelota de 10 cm', sx, cy + sr + f * 1.1, f * 0.65, '#ffd166', 'center', 700);
  ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx + sr + 4, cy); ctx.lineTo(ox - 10, cy); ctx.stroke(); ctx.setLineDash([]);
  const k = (t % 3) / 3; circle(ctx, lerp(sx + sr, ox - 10, k), cy, 2.5, 'rgba(255,240,180,.9)');
  const r = Math.max(1.5, sr * D[4] / 100); glow(ctx, ox, cy, r + 8, D[5] + '88'); ball(ctx, ox, cy, r, D[5]);
  label(ctx, D[0], ox, cy - r - f * 0.9, f * 0.75, '#fff');
  label(ctx, '= ' + D[1], ox, cy + r + f * 1.0, f * 0.6, '#aab0dd', 'right', 700);
  pill(ctx, `Estaría a ${D[2]}`, w / 2, h * 0.72, f * 1.05, '#ffd166');
  wrapText(ctx, D[3], w / 2, h * 0.86, w * 0.85, f * 0.78, '#dfe3ff', 'center', 700);
};

ANIMS.horizon = (ctx, w, h, t, s) => {
  const f = fs(w), cx = w / 2, cy = h * 0.5, R = Math.min(w, h) * 0.4;
  if (!s.g || s.gw !== w) { const r = rnd(123); s.gw = w; s.g = [...Array(260)].map(() => { const a = r() * TAU, d = Math.sqrt(r()) * Math.max(w, h) * 0.75; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, d, r()]; }); }
  glow(ctx, cx, cy, R, 'rgba(139,108,255,.18)', 'rgba(139,108,255,.05)');
  s.g.forEach(([x, y, d, z]) => { const inside = d < R; ctx.fillStyle = inside ? `rgba(200,215,255,${0.6 + z * 0.4})` : 'rgba(200,215,255,.13)'; ctx.fillRect(x, y, inside ? 2 : 1.5, inside ? 2 : 1.5); });
  for (let i = 0; i < 6; i++) { const q = s.g[(i * 37) % 260]; if (q[2] >= R) continue; const k = ((t * 0.3 + i / 6) % 1); const x = lerp(q[0], cx, k), y = lerp(q[1], cy, k); glow(ctx, x, y, 4, 'rgba(255,240,170,.9)'); }
  ctx.strokeStyle = 'rgba(255,160,110,.7)'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  glow(ctx, cx, cy, 10, 'rgba(255,122,217,1)'); label(ctx, 'Tú', cx, cy + 16, f * 0.7, '#ff9ae3');
  label(ctx, 'lo que podemos ver', cx, cy - R + f * 1.1, f * 0.68, '#ffb08a', 'center', 700);
  pill(ctx, 'Más allá hay más universo, pero su luz no ha llegado', cx, h - f * 0.9, f * 0.78);
};
