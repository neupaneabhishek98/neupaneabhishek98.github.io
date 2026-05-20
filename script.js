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
    const originalCards = Array.from(portfolioTrack.querySelectorAll('.project-card'));
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      portfolioTrack.appendChild(clone);
    });

    const getStep = () => {
      const firstCard = portfolioTrack.querySelector('.project-card');
      if (!firstCard) return 0;

      const gap = Number.parseFloat(getComputedStyle(portfolioTrack).columnGap || '0');
      return firstCard.getBoundingClientRect().width + gap;
    };

    const movePortfolio = () => {
      const step = getStep();
      if (!step) return;

      const loopPoint = portfolioTrack.scrollWidth / 2;

      if (portfolioTrack.scrollLeft >= loopPoint - step) {
        portfolioTrack.scrollLeft = portfolioTrack.scrollLeft - loopPoint;
      }

      portfolioTrack.scrollBy({ left: step, behavior: 'smooth' });
    };

    portfolioPrev?.addEventListener('click', () => {
      const step = getStep();
      if (!step) return;

      const loopPoint = portfolioTrack.scrollWidth / 2;
      if (portfolioTrack.scrollLeft <= step) {
        portfolioTrack.scrollLeft = portfolioTrack.scrollLeft + loopPoint;
      }

      portfolioTrack.scrollBy({ left: -step, behavior: 'smooth' });
    });
    portfolioNext?.addEventListener('click', movePortfolio);
    setInterval(movePortfolio, 2500);
  }

  /* ---------- Hero: paired typewriter + showcase carousel ----------
     Each item pairs a typed phrase with a skill shown in the side card.
     Slides advance every 2.5s with the typed phrase + brand staying in sync.
  ---------------------------------------------------------------- */
  const buildItems = [
    { phrase: 'Portfolio Sites', brand: 'Softwares', slide: 1 },
    { phrase: 'Web Experiences', brand: 'Android Apps', slide: 2 },
    { phrase: 'Clean Interfaces', brand: 'iOS Apps', slide: 3 },
    { phrase: 'Practical Apps', brand: 'Websites', slide: 4 },
    { phrase: 'Useful Products', brand: 'Web Applications', slide: 5 },
    { phrase: 'Portfolio Sites', brand: 'Business Solutions', slide: 6 },
    { phrase: 'Web Experiences', brand: 'Automation', slide: 7 },
    { phrase: 'Clean Interfaces', brand: 'Artificial Intelligence', slide: 8 },
    { phrase: 'Practical Apps', brand: 'Machine Learning', slide: 9 },
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
