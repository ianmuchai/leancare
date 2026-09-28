const services = {
  family: {
    kicker: 'Family Practice',
    title: 'Primary care.',
    body: 'Visits, prevention, follow-up.',
    best: 'Everyday care.',
    visit: 'Clear next steps.',
    href: '/family-practice',
    cta: 'View family practice',
  },
  telehealth: {
    kicker: 'Telehealth',
    title: 'Medical guidance without adding another commute.',
    body: 'Follow-ups and care questions from home.',
    best: 'Busy schedules.',
    visit: 'Virtual visits.',
    href: '/telehealth',
    cta: 'View telehealth',
  },
  behavioral: {
    kicker: 'Behavioral Health',
    title: 'Confidential screening that helps care become more personal.',
    body: 'Behavioral health and substance-use screenings completed securely so your provider can tailor support.',
    best: 'Mental wellness context.',
    visit: 'Screening and next steps.',
    href: '/telehealth',
    cta: 'View behavioral health',
  },
  weight: {
    kicker: 'Weight Management',
    title: 'A weight-care plan built around your real life.',
    body: 'Sustainable, physician-supervised weight management support tailored to your goals, habits, and health picture.',
    best: 'Patients looking for guided, practical, long-term support.',
    visit: 'In-person planning and ongoing support.',
    href: '/wellness',
    cta: 'View weight care',
  },
  vitamins: {
    kicker: 'Vitamin Injections',
    title: 'Vitamin support.',
    body: 'Nutrient support for wellness goals.',
    best: 'Extra wellness support.',
    visit: 'Clinic-based support.',
    href: '/wellness',
    cta: 'View vitamin options',
  },
};

function initMobileNav() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  if (toggle.dataset.leancareInit === 'true') return;
  toggle.dataset.leancareInit = 'true';

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initActiveNav() {
  const page = document.body.dataset.page || { '/': 'home', '/services': 'services', '/family-practice': 'family-practice', '/wellness': 'wellness', '/telehealth': 'telehealth', '/about': 'about', '/contact': 'contact' }[window.location.pathname];
  if (!page) return;

  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.navLink === page);
  });
}

function renderService(serviceKey) {
  const panel = document.querySelector('[data-service-panel]');
  const service = services[serviceKey];
  if (!panel || !service) return;

  panel.innerHTML = `
    <span class="panel-kicker">${service.kicker}</span>
    <h2>${service.title}</h2>
    <p>${service.body}</p>
    <dl>
      <div><dt>Best for</dt><dd>${service.best}</dd></div>
      <div><dt>Visit style</dt><dd>${service.visit}</dd></div>
    </dl>
    <a class="button button-primary" href="${service.href}">${service.cta}</a>
  `;
}

function initServiceTabs() {
  const tabs = Array.from(document.querySelectorAll('.service-tab'));
  if (!tabs.length) return;
  const tabsRoot = tabs[0].closest('[role="tablist"]') || tabs[0].parentElement;
  if (tabsRoot?.dataset.leancareInit === 'true') return;
  if (tabsRoot) tabsRoot.dataset.leancareInit = 'true';

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((candidate) => candidate.setAttribute('aria-selected', String(candidate === tab)));
      renderService(tab.dataset.service);
    });

    tab.addEventListener('keydown', (event) => {
      const currentIndex = tabs.indexOf(tab);
      const offset = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
      if (!offset) return;
      event.preventDefault();
      const next = tabs[(currentIndex + offset + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });
}

function initTestimonials() {
  const cards = Array.from(document.querySelectorAll('[data-testimonial]'));
  const next = document.querySelector('[data-testimonial-next]');
  if (!cards.length || !next) return;
  if (next.dataset.leancareInit === 'true') return;
  next.dataset.leancareInit = 'true';

  let index = 0;
  const show = (nextIndex) => {
    index = (nextIndex + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.hidden = cardIndex !== index;
    });
  };

  next.addEventListener('click', () => show(index + 1));
  show(0);
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}


function initHeroCarousel() {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;
  if (carousel.dataset.leancareInit === 'true') return;
  carousel.dataset.leancareInit = 'true';
  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;
  let index = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
  };
  show(0);
  if (!prefersReduced) {
    window.setInterval(() => show(index + 1), 4200);
  }
}


function initVisualCarousel() {
  const carousel = document.querySelector('[data-visual-carousel]');
  if (!carousel) return;
  if (carousel.dataset.leancareVisualInit === 'true') return;
  carousel.dataset.leancareVisualInit = 'true';
  const slides = Array.from(carousel.querySelectorAll('[data-visual-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-visual-dot]'));
  if (!slides.length) return;
  let index = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const video = carousel.querySelector('[data-video-card]');
  const source = video ? video.querySelector('source') : null;
  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    const slide = slides[index];
    if (video && source && slide.dataset.videoSrc && source.getAttribute('src') !== slide.dataset.videoSrc) {
      source.setAttribute('src', slide.dataset.videoSrc);
      if (slide.dataset.videoPoster) video.setAttribute('poster', slide.dataset.videoPoster);
      video.load();
      video.play().catch(() => {});
    }
  };
  dots.forEach((dot) => {
    dot.addEventListener('click', () => show(Number(dot.dataset.visualDot || 0)));
  });
  show(0);
  if (!prefersReduced && slides.length > 1) {
    window.setInterval(() => show(index + 1), 5000);
  }
}

function initCareDock() {
  const dock = document.querySelector('[data-care-dock]');
  if (!dock) return;
  const panel = dock.querySelector('[data-dock-panel]');
  const tabs = Array.from(dock.querySelectorAll('[data-dock-tab]'));
  const content = {
    primary: {
      label: 'Primary care',
      title: 'Primary care.',
      body: 'Visits, prevention, follow-up.',
      href: '/family-practice',
      cta: 'Explore family practice',
    },
    wellness: {
      label: 'Wellness',
      title: 'Weight + vitamins.',
      body: 'Wellness care with direction.',
      href: '/wellness',
      cta: 'Explore wellness care',
    },
    virtual: {
      label: 'Virtual care',
      title: 'Telehealth.',
      body: 'Follow-ups from home.',
      href: '/telehealth',
      cta: 'Explore telehealth',
    },
  };
  const render = (key) => {
    const item = content[key] || content.primary;
    tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.dockTab === key));
    panel.innerHTML = `<span>${item.label}</span><strong>${item.title}</strong><p>${item.body}</p><a href="${item.href}">${item.cta}</a>`;
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => render(tab.dataset.dockTab)));
  render('primary');
}

function initMagneticCards() {
  const cards = Array.from(document.querySelectorAll('.magnetic-card'));
  if (!cards.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach((card) => {
    if (card.dataset.leancareInit === 'true') return;
    card.dataset.leancareInit = 'true';
    card.addEventListener('pointermove', (event) => {
      if (reduce) return;
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      card.classList.add('is-magnetic');
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-magnetic');
      card.style.transform = '';
    });
  });
}

function initSpotlightRail() {
  const rail = document.querySelector('[data-spotlight-rail]');
  if (!rail) return;
  const cards = Array.from(rail.querySelectorAll('[data-spotlight-card]'));
  const next = rail.querySelector('[data-spotlight-next]');
  const prev = rail.querySelector('[data-spotlight-prev]');
  if (!cards.length) return;
  let index = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = (nextIndex) => {
    index = (nextIndex + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
  };
  next?.addEventListener('click', () => show(index + 1));
  prev?.addEventListener('click', () => show(index - 1));
  show(0);
  if (!reduce && cards.length > 1) {
    window.setInterval(() => show(index + 1), 5600);
  }
}

function initMediaCarousel() {
  const carousel = document.querySelector('[data-media-carousel]');
  if (!carousel) return;
  if (carousel.dataset.leancareMediaInit === 'true') return;
  carousel.dataset.leancareMediaInit = 'true';
  const slides = Array.from(carousel.querySelectorAll('[data-media-slide]'));
  const videos = Array.from(carousel.querySelectorAll('[data-slide-video]'));
  const dots = Array.from(carousel.querySelectorAll('[data-media-dot]'));
  const button = carousel.querySelector('.video-play-button');
  if (!slides.length) return;
  let index = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const syncButton = () => {
    const activeVideo = slides[index]?.querySelector('[data-slide-video]');
    if (!button || !activeVideo) return;
    const isPlaying = !activeVideo.paused;
    button.classList.toggle('is-paused', isPlaying);
    button.setAttribute('aria-label', isPlaying ? 'Pause care story video' : 'Play care story video');
  };

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    videos.forEach((video, videoIndex) => {
      if (videoIndex === index && !reduce) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    syncButton();
  };

  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.mediaDot || 0))));
  if (button) {
    button.addEventListener('click', () => {
      const activeVideo = slides[index]?.querySelector('[data-slide-video]');
      if (!activeVideo) return;
      if (activeVideo.paused) {
        activeVideo.play().catch(() => {});
      } else {
        activeVideo.pause();
      }
      syncButton();
    });
  }
  videos.forEach((video) => {
    video.addEventListener('play', syncButton);
    video.addEventListener('pause', syncButton);
  });
  show(0);
  if (!reduce && slides.length > 1) {
    window.setInterval(() => show(index + 1), 6500);
  }
}

function initBackgroundCarousel() {
  const carousel = document.querySelector('[data-bg-carousel]');
  if (!carousel) return;
  if (carousel.dataset.leancareBgInit === 'true') return;
  carousel.dataset.leancareBgInit = 'true';
  const slides = Array.from(carousel.querySelectorAll('[data-bg-slide]'));
  if (slides.length < 2) return;
  let index = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
  };
  show(0);
  if (!reduce) {
    window.setInterval(() => show(index + 1), 6200);
  }
}




function initHeroTools() {
  const toolkit = document.querySelector('[data-hero-tools]');
  if (!toolkit) return;
  const output = toolkit.querySelector('[data-tool-output]');
  const chips = Array.from(toolkit.querySelectorAll('[data-hero-tool]'));
  if (!output || !chips.length) return;

  const content = {
    visit: {
      label: 'Suggested start',
      title: 'Family practice visit',
      body: 'Visits, prevention, follow-up.',
    },
    wellness: {
      label: 'Wellness',
      title: 'Weight + vitamins',
      body: 'Support for weight, energy, and routines.',
    },
    virtual: {
      label: 'Virtual',
      title: 'Telehealth',
      body: 'A practical route for follow-ups, care questions, and next-step guidance without the extra commute.',
    },
  };

  const render = (key) => {
    const item = content[key] || content.visit;
    chips.forEach((chip) => chip.classList.toggle('is-active', chip.dataset.heroTool === key));
    output.classList.add('is-switching');
    window.setTimeout(() => {
      output.innerHTML = `<span>${item.label}</span><strong>${item.title}</strong><p>${item.body}</p>`;
      output.classList.remove('is-switching');
    }, 120);
  };

  chips.forEach((chip) => chip.addEventListener('click', () => render(chip.dataset.heroTool)));
}


function initPageHeroCarousels() {
  const carousels = Array.from(document.querySelectorAll('[data-page-hero-carousel]'));
  if (!carousels.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousels.forEach((carousel, carouselIndex) => {
    if (carousel.dataset.leancareInit === 'true') return;
    carousel.dataset.leancareInit = 'true';
    const slides = Array.from(carousel.querySelectorAll('[data-page-hero-slide]'));
    if (slides.length < 2) return;
    let index = 0;
    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    };
    show(0);
    if (!reduce) {
      window.setInterval(() => show(index + 1), 5600 + carouselIndex * 350);
    }
  });
}




function initLeancareInteractions() {
  initMobileNav();
  initActiveNav();
  initServiceTabs();
  initTestimonials();
  initReveal();
  initHeroCarousel();
  initVisualCarousel();
  initCareDock();
  initMagneticCards();
  initSpotlightRail();
  initMediaCarousel();
  initBackgroundCarousel();
  initHeroTools();
  initPageHeroCarousels();
}

window.LeanCareInit = initLeancareInteractions;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLeancareInteractions, { once: true });
} else {
  initLeancareInteractions();
}
