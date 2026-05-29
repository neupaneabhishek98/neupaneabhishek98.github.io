/* ============================================
   Abhishek Neupane - Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile Menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Header title hover hooks ---------- */
  const logo = document.querySelector('.logo');
  const logoHooks = [
    'Would love to work with you!',
    "Let's work together.",
    'Hi, nice to see you here.',
    'Got an idea? I can help.',
    'Your next project starts here.',
    'Open for meaningful builds.',
    'Let\'s turn ideas into products.',
    'Need a clean digital solution?',
    'Always happy to collaborate.',
    'Let\'s build something useful.',
    'Thanks for stopping by.',
    'Ready when you are.'
  ];

  const setRandomLogoHook = () => {
    if (!logo) return;
    const currentHook = logo.dataset.hoverHook;
    const nextHooks = logoHooks.filter(hook => hook !== currentHook);
    const hookPool = nextHooks.length ? nextHooks : logoHooks;
    logo.dataset.hoverHook = hookPool[Math.floor(Math.random() * hookPool.length)];
  };

  logo?.addEventListener('mouseenter', setRandomLogoHook);
  logo?.addEventListener('focus', setRandomLogoHook);
  setRandomLogoHook();

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const navOffset = navbar?.offsetHeight || 0;
      const targetTop = hash === '#home'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - navOffset + 1;

      window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
      history.pushState(null, '', hash);
    });
  });

  /* ---------- Navbar scroll effect + active link ---------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.id;
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === `#${id}`));
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- Selected work carousel ---------- */
  const portfolioCarousel = document.querySelector('.portfolio-carousel');
  const portfolioTrack = document.getElementById('portfolioTrack');
  const portfolioPrev = document.querySelector('.portfolio-arrow-prev');
  const portfolioNext = document.querySelector('.portfolio-arrow-next');

  if (portfolioTrack) {
    const getStep = () => {
      const firstCard = portfolioTrack.querySelector('.project-card');
      if (!firstCard) return 0;

      const gap = Number.parseFloat(getComputedStyle(portfolioTrack).columnGap || '0');
      return firstCard.getBoundingClientRect().width + gap;
    };

    let carouselMoving = false;
    let carouselTimer = null;
    let carouselMotionTimer = null;
    let carouselPaused = false;
    const CAROUSEL_DELAY = 2500;
    const CAROUSEL_MOTION = 580;

    const finishMotion = () => {
      portfolioTrack.classList.remove('is-moving');
      portfolioTrack.style.transform = 'translateX(0)';
      carouselMoving = false;
      carouselMotionTimer = null;
    };

    const movePortfolio = () => {
      if (document.hidden) return;

      const step = getStep();
      const firstCard = portfolioTrack.querySelector('.project-card');
      if (!step || !firstCard || carouselMoving) return;

      carouselMoving = true;
      portfolioTrack.classList.add('is-moving');
      portfolioTrack.style.transform = `translateX(-${step}px)`;

      carouselMotionTimer = window.setTimeout(() => {
        portfolioTrack.appendChild(firstCard);
        finishMotion();
      }, CAROUSEL_MOTION);
    };

    const startCarousel = () => {
      if (document.hidden) return;
      if (carouselPaused) return;
      if (!carouselTimer) carouselTimer = window.setInterval(movePortfolio, CAROUSEL_DELAY);
    };

    const stopCarousel = () => {
      if (carouselTimer) {
        window.clearInterval(carouselTimer);
        carouselTimer = null;
      }
      if (carouselMotionTimer) {
        window.clearTimeout(carouselMotionTimer);
        carouselMotionTimer = null;
      }
      finishMotion();
    };

    portfolioPrev?.addEventListener('click', () => {
      const step = getStep();
      const lastCard = portfolioTrack.querySelector('.project-card:last-child');
      if (document.hidden) return;
      if (!step || !lastCard || carouselMoving) return;

      carouselMoving = true;
      portfolioTrack.insertBefore(lastCard, portfolioTrack.firstElementChild);
      portfolioTrack.classList.remove('is-moving');
      portfolioTrack.style.transform = `translateX(-${step}px)`;
      portfolioTrack.offsetWidth;

      portfolioTrack.classList.add('is-moving');
      portfolioTrack.style.transform = 'translateX(0)';
      carouselMotionTimer = window.setTimeout(() => {
        finishMotion();
      }, CAROUSEL_MOTION);
    });

    portfolioNext?.addEventListener('click', movePortfolio);

    portfolioCarousel?.addEventListener('pointerenter', () => {
      carouselPaused = true;
      stopCarousel();
    });

    portfolioCarousel?.addEventListener('pointerleave', () => {
      carouselPaused = false;
      startCarousel();
    });

    portfolioCarousel?.addEventListener('focusin', () => {
      carouselPaused = true;
      stopCarousel();
    });

    portfolioCarousel?.addEventListener('focusout', (event) => {
      if (portfolioCarousel.contains(event.relatedTarget)) return;
      carouselPaused = false;
      startCarousel();
    });

    portfolioCarousel?.addEventListener('wheel', () => {
      carouselPaused = true;
      stopCarousel();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopCarousel();
        return;
      }

      startCarousel();
    });

    startCarousel();

    window.addEventListener('blur', stopCarousel);
    window.addEventListener('focus', startCarousel);
  }

  /* ---------- Hero: static paired skill text + showcase icon ---------- */
  const buildItems = [
    { label: 'PC softwares', slide: 4 },
    { label: 'Marketing Tools', slide: 6 },
    { label: 'Android Apps', slide: 1 },
    { label: 'Modern Websites', slide: 5 },
    { label: 'Graphic Designs', slide: 7 },
    { label: 'Web Applications', slide: 2 },
    { label: 'iOS Apps', slide: 3 },
  ];

  const typedEl = document.querySelector('.typed-text');
  const brandEl = document.querySelector('.showcase-brand');
  const slides = document.querySelectorAll('.showcase-slide');

  if (typedEl && brandEl && slides.length) {
    const setActiveSlide = (slideNum) => {
      slides.forEach(s => {
        s.classList.toggle('active', Number(s.dataset.pattern) === slideNum);
      });
    };

    const heroItem = buildItems[0];
    typedEl.textContent = heroItem.label;
    brandEl.textContent = heroItem.label;
    setActiveSlide(heroItem.slide);
  }

  /* ---------- Contact Form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    [form.name, form.phone, form.subject, form.message].forEach(f => f.classList.remove('invalid'));

    let hasError = false;
    if (!name) { form.name.classList.add('invalid'); hasError = true; }
    if (!phone) { form.phone.classList.add('invalid'); hasError = true; }
    if (!subject) { form.subject.classList.add('invalid'); hasError = true; }
    if (!message) { form.message.classList.add('invalid'); hasError = true; }

    if (hasError) {
      status.textContent = 'Please fill in your name, number, subject, and message.';
      status.classList.add('error');
      return;
    }

    const contactMessage = [
      'Hi Abhishek, I would like to connect.',
      '',
      `Name: ${name}`,
      `Number: ${phone}`,
      `Subject: ${subject}`,
      '',
      `Message: ${message}`,
    ].join('\n');

    const whatsapp = `https://wa.me/9779742598237?text=${encodeURIComponent(contactMessage)}`;

    status.textContent = 'Opening WhatsApp with your message...';
    status.classList.add('success');
    window.location.href = whatsapp;

    setTimeout(() => { form.reset(); }, 800);
  });

  /* ---------- CV Download placeholder ---------- */
  const downloadCv = document.getElementById('downloadCv');
  downloadCv?.addEventListener('click', (e) => {
    if (downloadCv.getAttribute('href') === '#') {
      e.preventDefault();
      alert('Drop your CV PDF in the project folder and update the link in index.html (look for downloadCv) to enable the download.');
    }
  });

});
