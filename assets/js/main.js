/* Menú móvil, lightbox de galería, formulario WhatsApp y sistema de reseñas/carrusel */
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
  if (form) {
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
  }

  // --- Sistema unificado de calificación por estrellas, reseñas y carrusel dinámico ---
  function initReseñas() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('puntuacion_estrellas');

    if (stars.length > 0) {
      stars.forEach(function (s) {
        s.style.color = '#f97316'; // Por defecto 5 estrellas en naranja
      });

      stars.forEach(function (star) {
        star.addEventListener('click', function () {
          const value = parseInt(this.getAttribute('data-value'), 10);
          if (ratingInput) ratingInput.value = value;

          stars.forEach(function (s, i) {
            if (i < value) {
              s.style.color = '#f97316'; // Activas (naranja)
            } else {
              s.style.color = '#cbd5e1'; // Apagadas (grises)
            }
          });
        });
      });
    }

    const formReseña = document.getElementById('form-reseña');
    const mensajeExito = document.getElementById('mensaje-exito');
    const btnOtraResena = document.getElementById('btn-otra-resena');
    const track1 = document.getElementById('marquee-line-1');
    const track2 = document.getElementById('marquee-line-2');

    // Reseñas iniciales por defecto para que el carrusel nunca luzca vacío
    let reseñasGuardadas = JSON.parse(localStorage.getItem('jags_reseñas')) || [
      { nombre: "Carlos Méndez (Minimercado)", estrellas: 5, comentario: "Excelente servicio de instalación de cámaras CCTV en el local. Súper rápidos y profesionales." },
      { nombre: "Ana Sofía Restrepo", estrellas: 5, comentario: "Repararon mi computador a domicilio en Laureles. Quedó optimizado y funcionando al 100%." },
      { nombre: "Inversiones El Poblado S.A.S.", estrellas: 5, comentario: "Contratamos las redes de datos corporativas y el soporte ha sido impecable desde el primer día." },
      { nombre: "Felipe Arango", estrellas: 5, comentario: "Muy buena atención, claros con la cotización y excelente respaldo técnico en Medellín." }
    ];

    function renderizarCarrusel() {
      if (!track1 || !track2) return;

      let htmlLinea1 = '';
      let htmlLinea2 = '';

      let mitad = Math.ceil(reseñasGuardadas.length / 2);
      let grupo1 = reseñasGuardadas.slice(0, mitad);
      let grupo2 = reseñasGuardadas.slice(mitad);
      if (grupo2.length === 0) grupo2 = grupo1;

      // Multiplicamos para lograr el bucle infinito continuo
      for (let r = 0; r < 3; r++) {
        grupo1.forEach(item => {
          htmlLinea1 += `<div class="testimonial-card-item">
            <div class="t-header">
              <p class="t-author">${item.nombre}</p>
              <div class="t-stars">${'★'.repeat(item.estrellas)}</div>
            </div>
            <p class="t-text">"${item.comentario}"</p>
          </div>`;
        });

        grupo2.forEach(item => {
          htmlLinea2 += `<div class="testimonial-card-item">
            <div class="t-header">
              <p class="t-author">${item.nombre}</p>
              <div class="t-stars">${'★'.repeat(item.estrellas)}</div>
            </div>
            <p class="t-text">"${item.comentario}"</p>
          </div>`;
        });
      }

      track1.innerHTML = htmlLinea1;
      track2.innerHTML = htmlLinea2;
    }

    renderizarCarrusel();

    // Envío del formulario de reseña
    if (formReseña) {
      formReseña.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const nombreInput = document.getElementById('nombre_resena').value.trim();
        const comentarioInput = document.getElementById('comentario_resena').value.trim();
        const estrellasInput = parseInt(ratingInput ? ratingInput.value : 5, 10);

        if (nombreInput && comentarioInput) {
          const nuevaReseña = {
            nombre: nombreInput,
            estrellas: estrellasInput,
            comentario: comentarioInput
          };

          reseñasGuardadas.unshift(nuevaReseña);
          localStorage.setItem('jags_reseñas', JSON.stringify(reseñasGuardadas));

          renderizarCarrusel();

          // Ocultar formulario y mostrar tarjeta de éxito con agradecimiento
          formReseña.style.display = 'none';
          if (mensajeExito) {
            mensajeExito.style.display = 'block';
          }
        }
      });
    }

    // Botón para reiniciar y dejar otra reseña
    if (btnOtraResena) {
      btnOtraResena.addEventListener('click', function () {
        formReseña.reset();
        if (ratingInput) ratingInput.value = '5';
        stars.forEach(s => s.style.color = '#f97316');

        if (mensajeExito) mensajeExito.style.display = 'none';
        formReseña.style.display = 'block';
      });
    }
  }

  // Ejecución segura cuando cargue la página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReseñas);
  } else {
    initReseñas();
  }
})();
document.addEventListener('DOMContentLoaded', function() {
  const zoneBtns = document.querySelectorAll('.zone-btn');
  const zoneText = document.getElementById('zone-text');

  const zoneData = {
    "poblado": "📍 <strong>El Poblado:</strong> Alta disponibilidad para soporte de redes y sistemas CCTV. Visita técnica programada en menos de 24 horas.",
    "laureles": "📍 <strong>Laureles / Estadio:</strong> Cobertura activa para mantenimiento preventivo de equipos informáticos y puntos POS.",
    "centro": "📍 <strong>Medellín Centro:</strong> Atención prioritaria para locales comerciales, oficinas y centros de soporte tecnológico.",
    "sur": "📍 <strong>Itagüí / Sur:</strong> Cobertura metropolitana para instalaciones de seguridad electrónica y revisión en sitio."
  };

  if (zoneBtns.length > 0 && zoneText) {
    zoneBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const zone = this.getAttribute('data-zone');

        // Estilos de botones activos
        zoneBtns.forEach(b => {
          b.style.background = 'rgba(14, 24, 46, 0.8)';
          b.style.borderColor = 'rgba(255,255,255,0.1)';
          b.style.color = 'var(--muted)';
        });

        this.style.background = 'rgba(49, 144, 221, 0.2)';
        this.style.borderColor = 'var(--cyan)';
        this.style.color = '#fff';

        // Cambiar texto
        zoneText.innerHTML = zoneData[zone];
      });
    });
  }
});