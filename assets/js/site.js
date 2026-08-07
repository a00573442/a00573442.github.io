document.addEventListener('DOMContentLoaded', function () {

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

  /* ---- Hero slider: auto cross-fade between slides ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  /* ---- Light parallax on hero background while scrolling ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
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
  if ('IntersectionObserver' in window && revealEls.length) {
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
