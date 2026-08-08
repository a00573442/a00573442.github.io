document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header: transparent -> white on scroll ---- */
  var header = document.getElementById('site-header');
  if (header) {
    var toggleHeader = function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });
  }

  /* ---- Mobile hamburger menu ---- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileClose = document.getElementById('mobile-menu-close');
  var backdrop = document.getElementById('mobile-menu-backdrop');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

    /* close on escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ---- Desktop dropdown: also toggle on click/tap (for tablets without hover) ---- */
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dd) {
    var toggle = dd.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
      if (!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  });

  /* ---- Hero slider: auto cross-fade between slides ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !reduceMotion) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  /* ---- Light parallax on hero background while scrolling ---- */
  var hero = document.querySelector('.hero');
  if (hero && !reduceMotion) {
    var applyParallax = function () {
      var offset = window.scrollY;
      if (offset < window.innerHeight) {
        slides.forEach(function (s) {
          s.style.transform = 'translateY(' + (offset * 0.25) + 'px)';
        });
      }
    };
    window.addEventListener('scroll', applyParallax, { passive: true });
  }

  /* ---- Scroll reveal: fade-up sections/cards as they enter view ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

});
