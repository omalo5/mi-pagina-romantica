const openLetter = document.getElementById('openLetter');
const letter = document.getElementById('letter');
const question = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const thinkBtn = document.getElementById('thinkBtn');
const hint = document.getElementById('hint');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const surpriseBtn = document.getElementById('surpriseBtn');
const surprise = document.getElementById('surprise');
const thinkingOverlay = document.getElementById('thinkingOverlay');
const thinkingClose = document.getElementById('thinkingClose');

openLetter.addEventListener('click', () => {
  letter.classList.remove('hidden');
  letter.classList.add('reveal');
  letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  openLetter.textContent = 'Mensaje abierto ♡';
  openLetter.disabled = true;
  openLetter.style.opacity = '.75';
});

thinkBtn.addEventListener('click', () => {
  // Una pausa suave y mágica: flores flotantes, estrellas y un mensaje sin presión.
  thinkingOverlay.classList.remove('hidden');
  document.body.classList.add('thinking-mode');
  document.body.style.overflow = 'hidden';
  hint.textContent = 'Está bien tomarte tu tiempo 🌷';
  hint.classList.remove('reveal');
  void hint.offsetWidth;
  hint.classList.add('reveal');
  thinkingClose.focus();
});

function closeThinkingOverlay() {
  thinkingOverlay.classList.add('closing');
  window.setTimeout(() => {
    thinkingOverlay.classList.add('hidden');
    thinkingOverlay.classList.remove('closing');
    document.body.classList.remove('thinking-mode');
    document.body.style.overflow = '';
    thinkBtn.focus();
  }, 450);
}

thinkingClose.addEventListener('click', closeThinkingOverlay);
thinkingOverlay.addEventListener('click', (event) => {
  if (event.target === thinkingOverlay) closeThinkingOverlay();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !thinkingOverlay.classList.contains('hidden')) closeThinkingOverlay();
});

yesBtn.addEventListener('click', () => {
  if (yesBtn.disabled) return;
  yesBtn.disabled = true;
  yesBtn.innerHTML = 'Preparando nuestro viaje… 🚀';
  document.body.classList.add('celebration-mode');
  document.body.style.overflow = 'hidden';

  // Mostrar la celebración detrás del viaje desde el primer instante.
  // Así nunca vuelve a verse la página anterior al terminar el viaje.
  modal.classList.remove('hidden');
  modal.classList.add('arrival-journey');
  startSpaceJourney(() => {
    modal.classList.remove('arrival-journey');
    makeConfetti();
    launchHeartFireworks();
    launchPetalRain();
    startCelebrationStars();
    yesBtn.innerHTML = '¡Sí, quiero! 💖';
    yesBtn.disabled = false;
  });
});

function startSpaceJourney(onComplete) {
  const journey = document.createElement('div');
  journey.className = 'space-journey';
  journey.innerHTML = `
    <canvas aria-hidden="true"></canvas>
    <div class="journey-copy">
      <p class="journey-small">PREPÁRATE PARA DESPEGAR ✦</p>
      <h2>Viajando por el universo…</h2>
      <p>Entre millones de estrellas, nuestro destino es un nuevo comienzo 💗</p>
      <div class="journey-progress"><span></span></div>
    </div>`;
  document.body.appendChild(journey);
  document.body.style.overflow = 'hidden';
  const canvas = journey.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, stars = [], frame = 0, raf = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({length: 260}, () => ({
      a: Math.random() * Math.PI * 2, r: Math.random() * Math.max(w,h),
      z: Math.random() * 1 + .2, hue: Math.random() > .8 ? 315 : 195
    }));
  }
  function draw() {
    ctx.fillStyle = 'rgba(3,2,13,.28)';
    ctx.fillRect(0,0,w,h);
    const cx=w/2, cy=h/2;
    const speed = frame < 100 ? 1.5 : 13;
    for (const s of stars) {
      s.r += speed * s.z;
      if (s.r > Math.max(w,h)*.85) { s.r = Math.random()*20; s.a=Math.random()*Math.PI*2; }
      const x=cx+Math.cos(s.a)*s.r, y=cy+Math.sin(s.a)*s.r;
      const tail=Math.min(70, speed*s.z*4);
      ctx.strokeStyle=`hsla(${s.hue},100%,${70+Math.random()*25}%,${Math.min(1,.25+s.r/Math.max(w,h))})`;
      ctx.lineWidth=s.z*1.5;
      ctx.beginPath(); ctx.moveTo(x-Math.cos(s.a)*tail,y-Math.sin(s.a)*tail); ctx.lineTo(x,y); ctx.stroke();
    }
    // Portal luminoso en el centro
    const pulse=1+Math.sin(frame*.09)*.12;
    const g=ctx.createRadialGradient(cx,cy,2,cx,cy,Math.min(w,h)*.23*pulse);
    g.addColorStop(0,'rgba(255,220,250,.9)'); g.addColorStop(.18,'rgba(255,105,205,.28)');
    g.addColorStop(1,'rgba(100,60,255,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    frame++; raf=requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', resize);
  setTimeout(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    // Retirar el viaje de una vez: el modal ya está visible detrás,
    // por lo que no hay un instante en el que se vea la página anterior.
    journey.remove();
    onComplete();
  }, 8000);
}

function closeCelebration() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  const canvas = document.getElementById('celebrationCanvas');
  if (canvas) canvas.dataset.stop = 'yes';
}
closeModal.addEventListener('click', closeCelebration);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeCelebration();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCelebration();
});

const surpriseUniverse = document.getElementById('surpriseUniverse');
const surpriseLaunch = document.getElementById('surpriseLaunch');
const surpriseRevealCard = document.getElementById('surpriseRevealCard');
const surpriseStage = document.getElementById('surpriseStage');
const closeSurprise = document.getElementById('closeSurprise');
const surpriseX = document.getElementById('surpriseX');
let surpriseAnimationFrame = 0;
let surpriseResizeHandler = null;

surpriseBtn.addEventListener('click', () => {
  surpriseUniverse.classList.remove('hidden', 'show-reveal');
  surpriseUniverse.classList.add('surprise-opening');
  document.body.style.overflow = 'hidden';
  startSurpriseStarfield();
  surpriseBtn.textContent = 'Sorpresa descubierta 💗';
});

surpriseLaunch.addEventListener('click', () => {
  surpriseUniverse.classList.add('portal-active');
  surpriseLaunch.disabled = true;
  surpriseLaunch.innerHTML = '¡Allá vamos! 🚀';
  setTimeout(() => {
    surpriseStage.classList.add('hidden');
    surpriseRevealCard.classList.remove('hidden');
    surpriseUniverse.classList.add('show-reveal');
  }, 1500);
});

function closeSurpriseScene() {
  surpriseUniverse.classList.add('surprise-closing');
  cancelAnimationFrame(surpriseAnimationFrame);
  if (surpriseResizeHandler) window.removeEventListener('resize', surpriseResizeHandler);
  setTimeout(() => {
    surpriseUniverse.classList.add('hidden');
    surpriseUniverse.classList.remove('surprise-opening', 'surprise-closing', 'portal-active', 'show-reveal');
    surpriseStage.classList.remove('hidden');
    surpriseRevealCard.classList.add('hidden');
    surpriseLaunch.disabled = false;
    surpriseLaunch.innerHTML = 'Activar sorpresa <span>✦</span>';
    document.body.style.overflow = '';
    surpriseBtn.textContent = 'Toca para una sorpresa ✨';
  }, 500);
}
closeSurprise.addEventListener('click', closeSurpriseScene);
surpriseX.addEventListener('click', closeSurpriseScene);

function startSurpriseStarfield() {
  const canvas = document.getElementById('surpriseStars');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0;
  let stars = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({length: 180}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 2 + .3, speed: Math.random() * 1.5 + .25,
      hue: Math.random() > .72 ? 320 : 265
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const star of stars) {
      star.y += star.speed;
      star.x += Math.sin(star.y * .008) * .35;
      if (star.y > h + 5) { star.y = -5; star.x = Math.random() * w; }
      ctx.beginPath();
      ctx.fillStyle = `hsla(${star.hue},100%,${75 + Math.random() * 20}%,${.4 + Math.random() * .6})`;
      ctx.shadowBlur = 12; ctx.shadowColor = '#ff9fe8';
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    surpriseAnimationFrame = requestAnimationFrame(draw);
  }
  resize(); draw();
  surpriseResizeHandler = resize;
  window.addEventListener('resize', resize);
}

function makeConfetti() {
  const holder = document.querySelector('.confetti');
  holder.innerHTML = '';
  const pieces = ['♥', '✦', '♡', '✿', '✧'];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement('span');
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.fontSize = `${12 + Math.random() * 15}px`;
    piece.style.color = ['#ff9fc5', '#ffe7a8', '#ffffff', '#d6a8ff'][i % 4];
    holder.appendChild(piece);
  }
}


function launchHeartFireworks() {
  const symbols = ['💖', '💗', '💕', '♥', '✦', '✨', '🌸', '💘'];
  const colors = ['#ff9fc5', '#ffe7a8', '#d6a8ff', '#ffffff', '#ff77ad'];
  // Corazones y destellos salen desde varios puntos de la pantalla.
  for (let burst = 0; burst < 5; burst++) {
    setTimeout(() => {
      const originX = 12 + Math.random() * 76;
      const originY = 20 + Math.random() * 55;
      for (let i = 0; i < 18; i++) {
        const spark = document.createElement('span');
        spark.className = 'firework-particle';
        spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        spark.style.left = originX + '%';
        spark.style.top = originY + '%';
        spark.style.color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.setProperty('--dx', `${(Math.random() - .5) * 260}px`);
        spark.style.setProperty('--dy', `${(Math.random() - .5) * 260}px`);
        spark.style.setProperty('--spin', `${Math.random() * 360 - 180}deg`);
        spark.style.animationDelay = `${Math.random() * 180}ms`;
        document.querySelector('.modal').appendChild(spark);
        setTimeout(() => spark.remove(), 1900);
      }
    }, burst * 260);
  }
}


// Intro de galaxia con estrellas en movimiento y efecto de viaje espacial.
(() => {
  const intro = document.getElementById('galaxyIntro');
  const canvas = document.getElementById('galaxyCanvas');
  const enter = document.getElementById('enterStory');
  if (!intro || !canvas || !enter) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, stars = [], animationId = 0, speed = 1;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(650, Math.floor(width * height / 1900));
    stars = Array.from({ length: count }, () => newStar(true));
  }
  function newStar(randomDepth = false) {
    return {
      x: (Math.random() - .5) * width,
      y: (Math.random() - .5) * height,
      z: randomDepth ? Math.random() * width + 1 : width,
      oldZ: width,
      size: .4 + Math.random() * 1.5,
      hue: Math.random() > .83 ? 285 + Math.random() * 55 : 205 + Math.random() * 45
    };
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;
    // Nebulosa en espiral, como una galaxia distante.
    const t = performance.now() * .00008;
    ctx.save();
    ctx.translate(cx, cy);
    for (let arm = 0; arm < 3; arm++) {
      for (let i = 0; i < 95; i++) {
        const p = i / 95;
        const angle = p * Math.PI * 4.2 + arm * Math.PI * 2 / 3 + t;
        const radius = p * Math.min(width, height) * .43;
        const x = Math.cos(angle) * radius + (Math.random() - .5) * 7;
        const y = Math.sin(angle) * radius * .52 + (Math.random() - .5) * 7;
        ctx.globalAlpha = (1 - p) * .18;
        ctx.fillStyle = arm === 1 ? '#ff8dc7' : '#a78bfa';
        ctx.beginPath(); ctx.arc(x, y, .6 + p * 1.1, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    for (const s of stars) {
      s.oldZ = s.z;
      s.z -= (reducedMotion ? .35 : 1.8) * speed;
      if (s.z <= 1) Object.assign(s, newStar());
      const x = cx + s.x / s.z * width * .75;
      const y = cy + s.y / s.z * height * .75;
      const px = cx + s.x / s.oldZ * width * .75;
      const py = cy + s.y / s.oldZ * height * .75;
      const radius = Math.max(.35, (1 - s.z / width) * s.size * 2.2);
      ctx.strokeStyle = `hsla(${s.hue}, 90%, 83%, ${Math.min(.9, 1 - s.z / width + .2)})`;
      ctx.lineWidth = radius;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = `hsla(${s.hue}, 95%, 92%, .8)`;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }
    animationId = requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();

  enter.addEventListener('click', () => {
    if (intro.classList.contains('warping')) return;
    speed = 13;
    intro.classList.add('warping');
    enter.disabled = true;
    setTimeout(() => {
      intro.classList.add('leaving');
      document.body.style.overflow = '';
      cancelAnimationFrame(animationId);
      setTimeout(() => intro.remove(), 1200);
    }, 1050);
  });
  document.body.style.overflow = 'hidden';
})();


function launchPetalRain() {
  const layer = document.getElementById('petalLayer');
  if (!layer) return;
  layer.innerHTML = '';
  const petals = ['🌸', '🌷', '🌺', '🌼', '✿', '💮'];
  for (let i = 0; i < 54; i++) {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${14 + Math.random() * 24}px`;
    petal.style.setProperty('--fall-time', `${5 + Math.random() * 7}s`);
    petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    petal.style.setProperty('--spin', `${Math.random() * 900 - 450}deg`);
    petal.style.animationDelay = `${Math.random() * 4}s`;
    layer.appendChild(petal);
  }
}

function startCelebrationStars() {
  const canvas = document.getElementById('celebrationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, particles = [];
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * ratio; canvas.height = h * ratio;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({length: 120}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + .3, phase: Math.random() * Math.PI * 2,
      speed: .005 + Math.random() * .018
    }));
  }
  function render() {
    if (canvas.dataset.stop === 'yes' || modal.classList.contains('hidden')) return;
    ctx.clearRect(0, 0, w, h);
    const now = performance.now();
    for (const p of particles) {
      const alpha = .3 + (Math.sin(now * p.speed + p.phase) + 1) * .32;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 218, 245, ${alpha})`;
      ctx.shadowBlur = 9;
      ctx.shadowColor = '#ff9fe0';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(render);
  }
  window.addEventListener('resize', resize);
  resize();
  canvas.dataset.stop = 'no';
  render();
}