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
  const portfolioTrack = document.getElementById('portfolioTrack');
  const portfolioPrev = document.querySelector('.portfolio-arrow-prev');
  const portfolioNext = document.querySelector('.portfolio-arrow-next');

  if (portfolioTrack) {
    const portfolioCarousel = portfolioTrack.closest('.portfolio-carousel');
    const portfolioWindow = portfolioTrack.closest('.portfolio-window');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getStep = () => {
      const firstCard = portfolioTrack.querySelector('.project-card');
      if (!firstCard) return 0;

      const gap = Number.parseFloat(getComputedStyle(portfolioTrack).columnGap || '0');
      return firstCard.getBoundingClientRect().width + gap;
    };

    let carouselMoving = false;
    let carouselTimer = 0;
    let carouselFallbackTimer = 0;
    let carouselPaused = false;
    const CAROUSEL_DELAY = 3200;
    const CAROUSEL_MOTION = 620;

    const resetCarouselPosition = () => {
      portfolioTrack.classList.remove('is-moving');
      portfolioTrack.style.transform = 'translate3d(0, 0, 0)';
      if (portfolioWindow) portfolioWindow.scrollLeft = 0;
    };

    const finishMotion = () => {
      resetCarouselPosition();
      carouselMoving = false;
    };

    const clearCarouselTimer = () => {
      if (carouselTimer) {
        window.clearTimeout(carouselTimer);
        carouselTimer = 0;
      }
    };

    const clearCarouselFallback = () => {
      if (carouselFallbackTimer) {
        window.clearTimeout(carouselFallbackTimer);
        carouselFallbackTimer = 0;
      }
    };

    const scheduleCarousel = () => {
      clearCarouselTimer();
      if (carouselPaused || carouselMoving || prefersReducedMotion.matches) return;

      carouselTimer = window.setTimeout(() => {
        carouselTimer = 0;
        movePortfolio();
      }, CAROUSEL_DELAY);
    };

    const completeAfterTransition = (callback) => {
      let completed = false;

      const done = () => {
        if (completed) return;
        completed = true;
        portfolioTrack.removeEventListener('transitionend', onTransitionEnd);
        clearCarouselFallback();
        callback();
        if (!carouselPaused) scheduleCarousel();
      };

      const onTransitionEnd = (event) => {
        if (event.target === portfolioTrack && event.propertyName === 'transform') done();
      };

      portfolioTrack.addEventListener('transitionend', onTransitionEnd);
      carouselFallbackTimer = window.setTimeout(done, CAROUSEL_MOTION + 140);
    };

    function movePortfolio() {
      const step = getStep();
      const firstCard = portfolioTrack.querySelector('.project-card');
      if (!step || !firstCard || carouselMoving) return;

      clearCarouselTimer();
      clearCarouselFallback();
      carouselMoving = true;
      if (portfolioWindow) portfolioWindow.scrollLeft = 0;
      portfolioTrack.classList.add('is-moving');
      portfolioTrack.style.transform = `translate3d(-${step}px, 0, 0)`;

      completeAfterTransition(() => {
        portfolioTrack.appendChild(firstCard);
        finishMotion();
      });
    }

    const pauseCarousel = () => {
      carouselPaused = true;
      clearCarouselTimer();
    };

    const resumeCarousel = () => {
      carouselPaused = false;
      scheduleCarousel();
    };

    portfolioPrev?.addEventListener('click', () => {
      const step = getStep();
      const lastCard = portfolioTrack.querySelector('.project-card:last-child');
      if (!step || !lastCard || carouselMoving) return;

      clearCarouselTimer();
      clearCarouselFallback();
      carouselMoving = true;
      if (portfolioWindow) portfolioWindow.scrollLeft = 0;
      portfolioTrack.insertBefore(lastCard, portfolioTrack.firstElementChild);
      portfolioTrack.classList.remove('is-moving');
      portfolioTrack.style.transform = `translate3d(-${step}px, 0, 0)`;
      portfolioTrack.offsetWidth;

      portfolioTrack.classList.add('is-moving');
      portfolioTrack.style.transform = 'translate3d(0, 0, 0)';

      completeAfterTransition(() => {
        finishMotion();
      });
    });

    portfolioNext?.addEventListener('click', movePortfolio);

    [portfolioCarousel, portfolioPrev, portfolioNext].forEach((target) => {
      target?.addEventListener('pointerenter', pauseCarousel);
      target?.addEventListener('pointerleave', resumeCarousel);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearCarouselTimer();
      else scheduleCarousel();
    });

    scheduleCarousel();
  }

  /* ---------- Credential counters ---------- */
  const statNumbers = document.querySelectorAll('.credential-stat strong[data-count]');
  const STAT_COUNT_DURATION = 1500;

  const formatStatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

  const prepareStatCounters = () => {
    statNumbers.forEach((stat) => {
      const suffix = stat.dataset.suffix || '';
      stat.innerHTML = `<span class="stat-value">0</span><span class="stat-plus" aria-hidden="true">${suffix}</span>`;
      stat.setAttribute('aria-label', `0${suffix}`);
    });
  };

  const animateStat = (stat) => {
    const total = Number.parseInt(stat.dataset.count || '0', 10);
    const duration = Number.parseInt(stat.dataset.duration || STAT_COUNT_DURATION, 10);
    const suffix = stat.dataset.suffix || '';
    const valueEl = stat.querySelector('.stat-value');
    const plusEl = stat.querySelector('.stat-plus');
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(total * eased);

      if (valueEl) valueEl.textContent = formatStatNumber(current);
      stat.setAttribute('aria-label', `${formatStatNumber(current)}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      if (valueEl) valueEl.textContent = formatStatNumber(total);
      stat.setAttribute('aria-label', `${formatStatNumber(total)}${suffix}`);
      plusEl?.classList.add('is-visible');
    };

    requestAnimationFrame(tick);
  };

  if (statNumbers.length) {
    prepareStatCounters();

    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        statNumbers.forEach(animateStat);
        observer.disconnect();
      });
    }, { threshold: 0.35 });

    const statGrid = document.querySelector('.credential-stats');
    statObserver.observe(statGrid || statNumbers[0]);
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
  const projectSelect = document.getElementById('projectSelect');
  const selectedProjectsEl = document.getElementById('selectedProjects');
  const selectedProjects = [];
  const quoteEmailEndpoint = 'https://formsubmit.co/ajax/neupaneabhishek98@gmail.com';

  const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const normalizeContactMethod = () => {
    if (!contactMethodInput) return;
    const rawValue = contactMethodInput.value.trim();
    if (!rawValue || looksLikeEmail(rawValue) || rawValue.startsWith('+')) return;
    if (/[A-Za-z@]/.test(rawValue)) return;

    const digits = rawValue.replace(/[^\d]/g, '');
    if (digits.length) {
      contactMethodInput.value = `+977 ${digits}`;
      contactMethodInput.setSelectionRange(contactMethodInput.value.length, contactMethodInput.value.length);
    }
  };

  const renderSelectedProjects = () => {
    if (!selectedProjectsEl) return;
    selectedProjectsEl.innerHTML = '';
    selectedProjects.forEach((project) => {
      const row = document.createElement('div');
      row.className = 'selected-project';
      row.dataset.project = project;

      const text = document.createElement('span');
      text.textContent = project;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'selected-project-remove';
      removeButton.setAttribute('aria-label', `Remove ${project}`);
      removeButton.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
      removeButton.addEventListener('click', () => {
        const index = selectedProjects.indexOf(project);
        if (index !== -1) selectedProjects.splice(index, 1);
        renderSelectedProjects();
      });

      row.append(text, removeButton);
      selectedProjectsEl.appendChild(row);
    });
  };

  projectSelect?.addEventListener('change', () => {
    const project = projectSelect.value;
    if (project && !selectedProjects.includes(project)) {
      selectedProjects.push(project);
      selectedProjectsEl?.classList.remove('invalid');
      renderSelectedProjects();
    }
    projectSelect.value = '';
  });

  contactMethodInput?.addEventListener('input', normalizeContactMethod);
  contactMethodInput?.addEventListener('blur', normalizeContactMethod);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    const submitButton = form.querySelector('button[type="submit"]');

    const nameField = form.elements.namedItem('name');
    const contactField = form.elements.namedItem('contactMethod');
    const descriptionField = form.elements.namedItem('description');

    const name = nameField.value.trim();
    normalizeContactMethod();
    const contactMethod = contactField.value.trim();
    const description = descriptionField.value.trim();
    const isValidContact = looksLikeEmail(contactMethod) || /^\+\d[\d\s-]{6,}$/.test(contactMethod);

    [nameField, contactField, descriptionField].forEach(f => f.classList.remove('invalid'));
    projectSelect?.classList.remove('invalid');
    selectedProjectsEl?.classList.remove('invalid');

    let hasError = false;
    if (!name) { nameField.classList.add('invalid'); hasError = true; }
    if (!contactMethod || !isValidContact) { contactField.classList.add('invalid'); hasError = true; }
    if (!selectedProjects.length) {
      projectSelect?.classList.add('invalid');
      selectedProjectsEl?.classList.add('invalid');
      hasError = true;
    }
    if (!description) { descriptionField.classList.add('invalid'); hasError = true; }

    if (hasError) {
      status.textContent = 'Please fill in your name, number or email, project type, and description.';
      status.classList.add('error');
      return;
    }

    const payload = {
      _subject: `New quote request from ${name}`,
      _template: 'table',
      _captcha: 'false',
      name,
      contact: contactMethod,
      project: selectedProjects.join(', '),
      description,
    };

    if (looksLikeEmail(contactMethod)) {
      payload.email = contactMethod;
      payload._replyto = contactMethod;
    }

    status.textContent = 'Sending your message...';
    status.classList.add('success');
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(quoteEmailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Email submission failed');

      status.textContent = 'Message sent. I will get back to you soon.';
      form.reset();
      selectedProjects.splice(0, selectedProjects.length);
      renderSelectedProjects();
    } catch (error) {
      status.textContent = 'Could not send the message. Please try again or email me directly.';
      status.classList.remove('success');
      status.classList.add('error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
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
