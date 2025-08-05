// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Dark Mode Toggle =====
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

// Load saved mode
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ===== Glassmorphism Hover =====
document.querySelectorAll('.glass-hover').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// ===== Parallax Effect =====
window.addEventListener('scroll', function () {
  const parallax = document.querySelector('.parallax');
  if (parallax) {
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});

// ===== Scroll-Based Fade-In Animation =====
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// ===== Floating Particles =====
const canvas = document.getElementById("particle-canvas");
const ctx = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    });
  }
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(drawParticles);
}

if (canvas) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
