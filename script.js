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

  /* ---------- Hero: paired typewriter + showcase carousel ----------
     Each item pairs a typed phrase with a skill shown in the side card.
     Slides advance every 2.5s with the typed phrase + brand staying in sync.
  ---------------------------------------------------------------- */
  const buildItems = [
    { phrase: 'Practical Apps', brand: 'Android Apps', slide: 1 },
    { phrase: 'Useful Products', brand: 'Web Applications', slide: 2 },
    { phrase: 'Clean Interfaces', brand: 'iOS Apps', slide: 3 },
    { phrase: 'PC Softwares', brand: 'PC Softwares', slide: 4 },
    { phrase: 'Websites', brand: 'Websites', slide: 5 },
    { phrase: 'Digital Marketing', brand: 'Digital Marketing', slide: 6 },
    { phrase: 'Graphic Design', brand: 'Graphic Design', slide: 7 },
    { phrase: 'UI/UX Design', brand: 'UI/UX Design', slide: 8 },
    { phrase: 'Business Solutions', brand: 'Business Solutions', slide: 9 },
  ];

  const typedEl = document.querySelector('.typed-text');
  const brandEl = document.querySelector('.showcase-brand');
  const slides = document.querySelectorAll('.showcase-slide');

  if (typedEl && brandEl && slides.length) {
    let itemIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let cycleTimer = null;

    const setActiveSlide = (slideNum) => {
      slides.forEach(s => {
        s.classList.toggle('active', Number(s.dataset.pattern) === slideNum);
      });
    };

    const setBrand = (name) => {
      // Subtle fade for the brand text
      brandEl.style.opacity = '0';
      setTimeout(() => {
        brandEl.textContent = name;
        brandEl.style.opacity = '1';
      }, 180);
    };

    // Initialize
    typedEl.textContent = '';
    setActiveSlide(buildItems[0].slide);
    brandEl.textContent = buildItems[0].brand;

    const TYPING_SPEED = 70;
    const DELETING_SPEED = 40;
    const HOLD_AFTER_TYPED = 1600; // pause when fully typed
    const HOLD_BEFORE_DELETE = 300;

    const tick = () => {
      const current = buildItems[itemIndex];
      const phrase = current.phrase;

      if (!deleting) {
        // Typing forward
        charIndex++;
        typedEl.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          cycleTimer = setTimeout(tick, HOLD_AFTER_TYPED);
          return;
        }
        cycleTimer = setTimeout(tick, TYPING_SPEED);
      } else {
        // Deleting
        charIndex--;
        typedEl.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          itemIndex = (itemIndex + 1) % buildItems.length;
          const next = buildItems[itemIndex];
          // Swap the side showcase to match the next phrase
          setActiveSlide(next.slide);
          setBrand(next.brand);
          cycleTimer = setTimeout(tick, HOLD_BEFORE_DELETE);
          return;
        }
        cycleTimer = setTimeout(tick, DELETING_SPEED);
      }
    };

    // Kick off after a small initial delay so the hero settles
    cycleTimer = setTimeout(tick, 900);

    // Safety: also rotate the slide every 2.5s in case typing speeds shift;
    // we slave the slide to the current item index so they stay in sync.
    setInterval(() => {
      // Nothing to force here - the tick() routine handles swapping the
      // slide & brand when a phrase finishes deleting. This interval is
      // intentionally a no-op kept for future timing tweaks.
    }, 2500);
  }

  /* ---------- Contact Form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const contactMethodInput = document.getElementById('contactMethod');

  const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const normalizeContactMethod = () => {
    if (!contactMethodInput) return;
    const rawValue = contactMethodInput.value.trim();
    if (!rawValue || looksLikeEmail(rawValue) || rawValue.startsWith('+')) return;

    const digits = rawValue.replace(/[^\d]/g, '');
    if (digits.length >= 7) {
      contactMethodInput.value = `+977 ${digits}`;
    }
  };

  contactMethodInput?.addEventListener('blur', normalizeContactMethod);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const nameField = form.elements.namedItem('name');
    const contactField = form.elements.namedItem('contactMethod');
    const projectField = form.elements.namedItem('project');
    const descriptionField = form.elements.namedItem('description');
    const projectOptions = form.querySelector('.project-options');

    const name = nameField.value.trim();
    normalizeContactMethod();
    const contactMethod = contactField.value.trim();
    const project = projectField?.value || '';
    const description = descriptionField.value.trim();
    const isValidContact = looksLikeEmail(contactMethod) || /^\+\d[\d\s-]{6,}$/.test(contactMethod);

    [nameField, contactField, descriptionField].forEach(f => f.classList.remove('invalid'));
    projectOptions?.classList.remove('invalid');

    let hasError = false;
    if (!name) { nameField.classList.add('invalid'); hasError = true; }
    if (!contactMethod || !isValidContact) { contactField.classList.add('invalid'); hasError = true; }
    if (!project) { projectOptions?.classList.add('invalid'); hasError = true; }
    if (!description) { descriptionField.classList.add('invalid'); hasError = true; }

    if (hasError) {
      status.textContent = 'Please fill in your name, number or email, project type, and description.';
      status.classList.add('error');
      return;
    }

    const contactMessage = [
      'Hi Abhishek, I would like to connect.',
      '',
      `Name: ${name}`,
      `Number or Email: ${contactMethod}`,
      `Project: ${project}`,
      '',
      `Description: ${description}`,
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
