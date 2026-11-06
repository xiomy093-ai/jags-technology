/* Menú móvil, lightbox de galería y formulario → WhatsApp */
(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-principal');
  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastTrigger = null;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    lightbox.hidden = true;
    if (lightboxImg) {
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function openLightbox(btn) {
    if (!lightbox || !lightboxImg) return;
    lastTrigger = btn;
    lightboxImg.src = btn.getAttribute('data-full') || '';
    lightboxImg.alt = (btn.querySelector('img') && btn.querySelector('img').alt) || '';
    if (lightboxCaption) lightboxCaption.textContent = btn.getAttribute('data-caption') || '';
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
    });
    if (lightboxClose) lightboxClose.focus();
  }

  document.querySelectorAll('.gallery-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(btn);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  var form = document.getElementById('form-solicitud');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = String((document.getElementById('sol-nombre') || {}).value || '').trim();
    var servicio = String((document.getElementById('sol-servicio') || {}).value || '').trim();
    var detalle = String((document.getElementById('sol-detalle') || {}).value || '').trim();
    if (!nombre || !servicio) return;

    var msg = 'Hola, vi la web de Jags y quiero cotizar. Soy ' + nombre + '. Servicio: ' + servicio + '.';
    if (detalle) msg += ' Detalle: ' + detalle;
    var url = 'https://wa.me/573217823068?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  
