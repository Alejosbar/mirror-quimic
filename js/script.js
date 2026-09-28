/* ═══════════════════════════════════════════════════
   DATOS — Tipos de piel
   ═══════════════════════════════════════════════════ */
const SKIN_TYPES = [
  {
    type: "Piel Seca",
    icon: "🌙",
    description: "El espejo detecta sequedad y textura. Te sugiere bases hidratantes, primers cremosos y acabados luminosos que nutren mientras embellecen.",
    tips: ["Base con SPF hidratante", "Iluminador líquido", "Labiales acondicionadores"],
    bg: "linear-gradient(135deg, #FCDDD8 0%, #F9C5B4 100%)",
  },
  {
    type: "Piel Grasa",
    icon: "✨",
    description: "Detectamos zonas T y exceso de sebo. Recomendamos productos matificantes de larga duración que equilibran sin secar tu piel.",
    tips: ["Primer matificante", "Base oil-free", "Polvos traslúcidos fijadores"],
    bg: "linear-gradient(135deg, #C8EFE4 0%, #A0D8C8 100%)",
  },
  {
    type: "Piel Mixta",
    icon: "⚖️",
    description: "Analizamos zona por zona para darte consejos personalizados: hidratación donde se necesita, control donde sobra.",
    tips: ["Técnica multizone", "Base de cobertura ligera", "Fijador en spray"],
    bg: "linear-gradient(135deg, #C8DEFF 0%, #B0C8F8 100%)",
  },
  {
    type: "Piel Sensible",
    icon: "🌸",
    description: "Identificamos tonos rosáceos y zonas reactivas. Priorizamos fórmulas hipoalergénicas que cuidan primero, embellecen después.",
    tips: ["Maquillaje mineral", "Sin fragancias añadidas", "Cobertura buildable suave"],
    bg: "linear-gradient(135deg, #F5C8E0 0%, #F0A8CC 100%)",
  },
];

/* ═══════════════════════════════════════════════════
   NAV — Toggle menú móvil
   ═══════════════════════════════════════════════════ */
(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
  });

  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    })
  );
})();

/* ═══════════════════════════════════════════════════
   TIPOS DE PIEL — Tabs interactivos
   ═══════════════════════════════════════════════════ */
(function initSkinTabs() {
  const tabsEl = document.getElementById('skinTabs');
  const panelEl = document.getElementById('skinPanel');
  const miniEl = document.getElementById('skinMiniCards');
  if (!tabsEl || !panelEl || !miniEl) return;

  let active = 0;

  function render() {
    // Tabs
    tabsEl.innerHTML = SKIN_TYPES.map((s, i) => `
      <button class="skin-tab ${i === active ? 'active' : ''}" data-idx="${i}">
        ${s.icon} ${s.type}
      </button>
    `).join('');

    // Panel activo
    const cur = SKIN_TYPES[active];
    panelEl.style.background = cur.bg;
    panelEl.innerHTML = `
      <div class="skin-panel-icon">${cur.icon}</div>
      <h3 class="skin-panel-title">${cur.type}</h3>
      <p class="skin-panel-desc">${cur.description}</p>
      <div class="skin-panel-tips">
        ${cur.tips.map((t) => `<span class="skin-tip">${t}</span>`).join('')}
      </div>
    `;

    // Mini cards
    miniEl.innerHTML = SKIN_TYPES.map((s, i) => `
      <button class="skin-mini-card ${i === active ? 'active' : ''}" data-idx="${i}">
        <div class="skin-mini-icon">${s.icon}</div>
        <div class="skin-mini-title">${s.type}</div>
      </button>
    `).join('');
  }

  function bindEvents() {
    tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.skin-tab');
      if (!btn) return;
      active = parseInt(btn.dataset.idx, 10);
      render();
    });

    miniEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.skin-mini-card');
      if (!btn) return;
      active = parseInt(btn.dataset.idx, 10);
      render();
    });
  }

  render();
  bindEvents();
})();

/* ═══════════════════════════════════════════════════
   FORMULARIO DE CONTACTO
   ═══════════════════════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;

    alert(`¡Gracias! Te avisaremos a ${email} cuando MirrorQuimic S.A.S esté disponible.`);
    form.reset();
  });
})();

/* ═══════════════════════════════════════════════════
   SMOOTH SCROLL con offset del navbar
   ═══════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const nav = document.getElementById('nav');
      const offset = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════════
   REVEAL — Fade-up al hacer scroll
   ═══════════════════════════════════════════════════ */
(function initReveal() {
  const elements = document.querySelectorAll(
    '.section-title, .section-p, .section-subtitle, .facial-card, .step-card, .espejo-img-wrap, .espejo-text'
  );
  if (!elements.length || !('IntersectionObserver' in window)) return;

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
})();