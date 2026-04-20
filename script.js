/* ===== GrafiGrow — Advanced Animated Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // ==================== SCROLL PROGRESS BAR ====================
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (window.scrollY / h * 100) + '%';
  });

  // ==================== LOGO PARTICLE BACKGROUND ====================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [], mouse = { x: null, y: null };

  // Load logo as image for particles
  const logoImg = new Image();
  logoImg.src = 'logo.svg';
  let logoReady = false;
  logoImg.onload = () => { logoReady = true; };

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 22 + 14; // logo size 14-36px
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.25 + 0.05;
      this.pulse = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.008;
    }
    update() {
      this.pulse += 0.02;
      this.rotation += this.rotSpeed;
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < -20 || this.x > canvas.width + 20) this.speedX *= -1;
      if (this.y < -20 || this.y > canvas.height + 20) this.speedY *= -1;
      if (mouse.x !== null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += dx * force * 0.03;
          this.y += dy * force * 0.03;
        }
      }
    }
    draw() {
      if (!logoReady) return;
      const a = this.alpha + Math.sin(this.pulse) * 0.08;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.drawImage(logoImg, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  initParticles();

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 160)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  (function animLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animLoop);
  })();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  // ==================== NAVBAR ====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => { navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

  // ==================== SPLIT TEXT ANIMATION ====================
  document.querySelectorAll('.split-text').forEach(el => {
    const html = el.innerHTML;
    // Preserve inner HTML tags like <span>
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    let charIndex = 0;
    function processNode(node) {
      if (node.nodeType === 3) { // text node
        const span = document.createDocumentFragment();
        node.textContent.split('').forEach(ch => {
          const s = document.createElement('span');
          s.className = 'char';
          s.style.transitionDelay = (charIndex * 0.03) + 's';
          s.innerHTML = ch === ' ' ? '&nbsp;' : ch;
          span.appendChild(s);
          charIndex++;
        });
        node.parentNode.replaceChild(span, node);
      } else if (node.nodeType === 1) {
        // Clone element attributes
        Array.from(node.childNodes).forEach(child => processNode(child));
      }
    }
    Array.from(wrapper.childNodes).forEach(child => processNode(child));
    el.innerHTML = wrapper.innerHTML;
  });

  // ==================== SCROLL REVEAL (Advanced) ====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .split-text, .section-glow-orb').forEach(el => revealObserver.observe(el));

  // ==================== COUNTER ANIMATION ====================
  let counterDone = false;
  function animateCounters() {
    if (counterDone) return;
    counterDone = true;
    document.querySelectorAll('.hero-stat .num').forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const suffix = counter.closest('.hero-stat').querySelector('.label').textContent.includes('%') ? '%' : '+';
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const ease = 1 - (1 - progress) * (1 - progress);
        start = Math.floor(ease * target);
        counter.textContent = start.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stats').forEach(el => statsObs.observe(el));

  // ==================== HERO PARALLAX ====================
  const heroContent = document.querySelector('.hero-content');
  const heroGlows = document.querySelectorAll('.hero-glow');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.3}px)`;
      heroContent.style.opacity = 1 - (y / window.innerHeight) * 0.8;
      heroGlows.forEach((g, i) => {
        g.style.transform = `translateY(${y * (i === 0 ? 0.15 : -0.1)}px)`;
      });
    }
  });

  // ==================== MAGNETIC CURSOR ON BUTTONS ====================
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ==================== 3D TILT ON CARDS ====================
  document.querySelectorAll('.card, .course-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ==================== SERVICES DATA & RENDER ====================
  const servicesData = [
    { icon: '📊', title: 'Microstock Portfolio Management', short: 'Full-service portfolio building, optimization, and scaling across all major stock platforms.', detail: 'We handle everything from initial portfolio setup to ongoing optimization. Our data-driven approach identifies trending niches, optimizes keywords for maximum discoverability, and scales your library systematically across Adobe Stock, Shutterstock, iStock, and more.' },
    { icon: '🎨', title: 'Custom Vector Design', short: 'Professional vector illustrations designed for high-demand stock categories.', detail: 'Our design team creates premium vector assets tailored to proven high-demand categories. Clean lines, versatile compositions, and commercially relevant themes that drive consistent sales month after month.' },
    { icon: '🎯', title: 'YouTube Thumbnail Design', short: 'High-CTR thumbnail designs that stop the scroll and boost video performance.', detail: 'We apply proven color psychology, typography hierarchy, and composition techniques. Our designs are A/B tested and optimized based on performance data, helping creators achieve CTR improvements of 200-400%.' },
    { icon: '🏷️', title: 'Metadata & SEO Optimization', short: 'Expert keyword research and metadata writing to maximize discoverability.', detail: 'Our proprietary keyword research tools and platform expertise allow us to craft metadata that ranks. We optimize titles, descriptions, and keyword sets using data from millions of stock transactions.' },
    { icon: '🖥️', title: 'Brand Identity Design', short: 'Complete visual branding packages including logos, color systems, and guidelines.', detail: 'We create cohesive brand identities: logo design, color palette, typography selection, brand guidelines, and social media asset templates — everything for a strong market presence.' },
    { icon: '📱', title: 'Social Media Design', short: 'Scroll-stopping social media graphics and templates for all major platforms.', detail: 'From Instagram carousels to LinkedIn banners, we design platform-optimized, brand-consistent assets designed to maximize engagement metrics across all channels.' },
    { icon: '🤖', title: 'AI Workflow Automation', short: 'Custom AI-powered tools and scripts to automate your creative pipeline.', detail: 'We build bespoke automation solutions — batch processing scripts for Adobe products, AI-assisted content generation pipelines — helping teams produce 10x more output without sacrificing quality.' },
    { icon: '📈', title: 'Stock Analytics & Reporting', short: 'Detailed performance analytics and strategic insights for your portfolio.', detail: 'We track download trends, revenue per asset, keyword performance, and market shifts to provide actionable recommendations that continuously improve your earnings.' },
    { icon: '🎓', title: 'Private Training & Mentorship', short: 'One-on-one coaching sessions to fast-track your microstock career.', detail: 'Personalized guidance from experts who have built six-figure stock portfolios. Covers niche selection, design techniques, platform strategies, and business scaling.' },
    { icon: '🔧', title: 'Custom Tool Development', short: 'Bespoke design tools and plugins built for your specific workflow needs.', detail: 'We develop custom scripts, plugins, and web tools tailored to your exact workflow — Adobe Illustrator automation, bulk file processors, or complete web-based design tools.' }
  ];

  const servicesGrid = document.getElementById('servicesGrid');
  const revealTypes = ['reveal-left', 'reveal-right', 'reveal-flip', 'reveal-scale'];
  servicesData.forEach((s, i) => {
    const card = document.createElement('div');
    const revType = revealTypes[i % revealTypes.length];
    card.className = `service-card reveal ${revType} reveal-delay-${(i % 5) + 1}`;
    card.innerHTML = `
      <span class="service-num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${s.icon} ${s.title}</h3>
      <p class="service-short">${s.short}</p>
      <button class="service-toggle" data-index="${i}">
        View Details
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>`;
    servicesGrid.appendChild(card);
  });

  // Re-observe new reveals
  servicesGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Service Modal
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  servicesGrid.addEventListener('click', e => {
    const btn = e.target.closest('.service-toggle');
    if (!btn) return;
    const s = servicesData[parseInt(btn.dataset.index)];
    modalTitle.textContent = s.icon + ' ' + s.title;
    modalBody.textContent = s.detail;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
    navLinksAll.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  // ==================== SECTION DIVIDER ANIMATION ====================
  document.querySelectorAll('.section-divider').forEach(div => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          div.style.background = 'linear-gradient(90deg, transparent, rgba(193,39,45,0.4), rgba(46,49,146,0.4), transparent)';
          div.style.height = '2px';
          div.style.transition = 'all 1s ease';
        }
      });
    }, { threshold: 0.5 });
    obs.observe(div);
  });

});
