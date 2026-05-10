/* ============================================================
   PLATINA HOTEL — main.js
   All interactivity, animations, form handling
   ============================================================ */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initHamburger();
  initScrollReveal();
  initScrollProgress();
  initBackToTop();
  initCounters();
  initGalleryLightbox();
  initBookingForm();
  initNewsletter();
  initSmoothScroll();
  initActiveNav();
  initParallax();
});

/* ── PRELOADER ── */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 600);
    setTimeout(() => preloader.remove(), 1200);
  });
}

/* ── NAVBAR SCROLL BEHAVIOUR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── HAMBURGER / MOBILE MENU ── */
function initHamburger() {
  const ham     = document.querySelector('.hamburger');
  const overlay = document.querySelector('.nav-overlay');
  const close   = document.querySelector('.nav-close');
  if (!ham || !overlay) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  if (close) {
    close.addEventListener('click', closeMenu);
  }
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  function closeMenu() {
    ham.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ── SCROLL PROGRESS BAR ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── BACK TO TOP ── */
function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── ACTIVE NAV LINK ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => observer.observe(s));
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
}

/* ── ANIMATED COUNTERS ── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target   = +el.dataset.count;
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target.toLocaleString() + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
    }, step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── GALLERY LIGHTBOX ── */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lbImg  = lightbox.querySelector('#lb-img');
  const prev   = lightbox.querySelector('.lb-prev');
  const next   = lightbox.querySelector('.lb-next');
  const close  = lightbox.querySelector('.lb-close');
  const items  = Array.from(document.querySelectorAll('.gallery-item img'));
  let current  = 0;

  const open = (idx) => {
    current = idx;
    lbImg.src = items[idx].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  const showPrev = () => open((current - 1 + items.length) % items.length);
  const showNext = () => open((current + 1) % items.length);

  items.forEach((img, idx) => {
    img.parentElement.querySelector('.gallery-item-overlay')?.addEventListener('click', () => open(idx));
    img.addEventListener('click', () => open(idx));
  });

  if (close)  close.addEventListener('click', closeLb);
  if (prev)   prev.addEventListener('click', showPrev);
  if (next)   next.addEventListener('click', showNext);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });
}

/* ── BOOKING FORM ── */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  /* Set min date for arrival/departure */
  const today    = new Date().toISOString().split('T')[0];
  const arrival  = document.getElementById('arrival');
  const departure= document.getElementById('departure');
  if (arrival)   arrival.min   = today;
  if (departure) departure.min = today;

  if (arrival && departure) {
    arrival.addEventListener('change', () => {
      departure.min = arrival.value;
      if (departure.value && departure.value < arrival.value) departure.value = arrival.value;
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('.btn-book');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing…';
    btn.disabled = true;

    /* Simulate API call */
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed!';
      btn.style.background = 'linear-gradient(135deg, #27ae60, #1e8449)';
      showToast('🎉 Booking confirmed! We\'ll email your details shortly.');
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 2000);
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form-group');
    const existing = group?.querySelector('.field-error');
    if (existing) existing.remove();

    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#e74c3c';
      if (group) {
        const err = document.createElement('span');
        err.className = 'field-error';
        err.style.cssText = 'color:#e74c3c;font-size:.72rem;margin-top:2px;';
        err.textContent = 'This field is required';
        group.appendChild(err);
      }
    } else {
      field.style.borderColor = '#27ae60';
    }
  });

  // Email validation
  const email = form.querySelector('#email');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    valid = false;
    email.style.borderColor = '#e74c3c';
    const group = email.closest('.form-group');
    if (group && !group.querySelector('.field-error')) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'color:#e74c3c;font-size:.72rem;margin-top:2px;';
      err.textContent = 'Enter a valid email address';
      group.appendChild(err);
    }
  }
  return valid;
}

/* ── NEWSLETTER ── */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showToast('Please enter a valid email address.', 'error'); return;
    }
    showToast('✅ Subscribed! Thank you for joining us.');
    input.value = '';
  });
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${msg}`;
  toast.style.background = type === 'error' ? '#c0392b' : '#2b2b2b';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── SUBTLE PARALLAX ── */
function initParallax() {
  const hero = document.querySelector('.hero-bg');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.28}px)`;
  }, { passive: true });
}

/* ── FACILITY CARD TILT ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.facility-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - .5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - .5) * -10;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
