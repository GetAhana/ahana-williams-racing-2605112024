(function () {
  document.documentElement.classList.add('js');

  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    function setNavOpen(open) {
      primaryNav.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    setNavOpen(false);
    navToggle.addEventListener('click', function () {
      setNavOpen(!primaryNav.classList.contains('nav-open'));
    });
    primaryNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 760px)').matches) setNavOpen(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNavOpen(false);
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'phone_click', {
          event_category: 'Contact',
          event_label: a.href
        });
      }
    });
  });

  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (form.getAttribute('data-netlify') === 'true') return;
      var action = (form.getAttribute('action') || '').trim();
      if (action && action !== '#' && !/^javascript:/i.test(action)) {
        try {
          var u = new URL(action, window.location.href);
          if (u.origin !== window.location.origin) return;
        } catch (err) {
          return;
        }
      }
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a[href]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^tel:/i.test(h)) return;
    try {
      var file = new URL(h, window.location.href).pathname.split('/').pop() || 'index.html';
      if (file === path) a.classList.add('nav-current');
    } catch (err) {}
  });
})();
