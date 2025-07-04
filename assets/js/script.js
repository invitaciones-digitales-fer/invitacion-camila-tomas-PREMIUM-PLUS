
/* ====== Countdown ====== */
const clock = document.getElementById('clock');
const eventDate = new Date('december 9, 2025 21:30:00').getTime();
const pad = n => n.toString().padStart(2, '0');

function updateClock() {
  const gap = eventDate - Date.now();
  const d = Math.floor(gap / 864e5);
  const h = Math.floor(gap / 36e5) % 24;
  const m = Math.floor(gap / 6e4) % 60;
  const s = Math.floor(gap / 1e3) % 60;

  clock.innerHTML = `
    <div><strong>${pad(d)}</strong><span>días</span></div>
    <div><strong>${pad(h)}</strong><span>horas</span></div>
    <div><strong>${pad(m)}</strong><span>min</span></div>
    <div><strong>${pad(s)}</strong><span>seg</span></div>`;
}

setInterval(updateClock, 1000); updateClock();

/* ====== Modal ====== */
const btnGift = document.getElementById('btnGift');
const modal = document.getElementById('modalRegalo');
const close = modal.querySelector('.modal__close');

btnGift.onclick = () => modal.style.display = 'flex';
close.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };


document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Variables principales
    const enterBtn = document.getElementById("enter-button");
    const overlay = document.getElementById("welcome");
    const logo = document.querySelector(".hero__logo");

    // 🎬 Animación de logo después del overlay
    enterBtn?.addEventListener("click", function () {
        overlay.classList.add("fade-out");

        setTimeout(() => {
            overlay.style.display = "none";
            logo.classList.add("fade-zoom"); // Activa animación del logo
        }, 1000);
    });

    // 🔹 Configurar IntersectionObserver para animaciones en scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target); // Solo se ejecuta una vez
            }
        });
    }, { threshold: 0.2 }); // Detecta cuando el elemento está 20% visible

    // Aplicar el observador a todas las secciones con efecto de entrada
    document.querySelectorAll(".hidden, .fade-down, .fade-zoom").forEach(el => observer.observe(el));
});




// ======= const music = document.getElementById('bg-music');
const music = document.getElementById('bg-music');
const enterBtn = document.getElementById('enter-button');
const overlay = document.getElementById('welcome');
const toggle = document.getElementById('music-toggle');
const toggleIcon = document.getElementById('music-icon');
let isPlaying = false;

// Cambia la imagen del ícono según el estado
function updateMusicIcon() {
  toggle.classList.remove('playing', 'pulsing'); // limpia ambas

  if (isPlaying) {
    toggleIcon.src = 'assets/icons/icono-musica_stop.svg';
    toggleIcon.alt = 'Pause';
    toggle.classList.add('playing'); // 🎵 animación de salto
  } else {
    toggleIcon.src = 'assets/icons/icono-musica_play.svg';
    toggleIcon.alt = 'Play';
    toggle.classList.add('pulsing'); // ⏸️ animación de pulso suave
  }
}


// Al hacer clic en "Entrar"
enterBtn.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);

  if (music) {
    music.volume = 1;
    music.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.log('Autoplay bloqueado:', err);
      isPlaying = false;
    }).finally(() => {
      updateMusicIcon(); // <- SIEMPRE actualiza el ícono
    });
  }
});

// Al hacer clic en el botón de música
toggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    updateMusicIcon();
  } else {
    music.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.log('Error al reproducir música manual:', err);
      isPlaying = false;
    }).finally(() => {
      updateMusicIcon(); // <- SIEMPRE actualiza el ícono
    });
  }
});

document.querySelectorAll('.pause-music').forEach(link => {
  link.addEventListener('click', () => {
    if (!music.paused) {
      music.pause();
      isPlaying = false;
      updateMusicIcon();
    }
  });
});




/* ====== Galería modal ====== */
/* -------------- GALERÍA -------------- */
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryModal = document.getElementById('galleryModal');
if (galleryItems.length && galleryModal) {
  const galleryImg = galleryModal.querySelector('.gallery-modal__img');
  const btnCloseGal = galleryModal.querySelector('.gallery-modal__close');
  const btnPrev = galleryModal.querySelector('.gallery-modal__prev');
  const btnNext = galleryModal.querySelector('.gallery-modal__next');

  let current = 0;

  const updateImg = () => {
    const pic = galleryItems[current].querySelector('img');
    galleryImg.src = pic.src;
    galleryImg.alt = pic.alt;
  };

  const openGal = i => {
    current = i;
    updateImg();
    galleryModal.classList.add('gallery-modal--active');
    document.body.style.overflow = 'hidden';
  };
  const closeGal = () => {
    galleryModal.classList.remove('gallery-modal--active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((btn, i) => btn.addEventListener('click', () => openGal(i)));
  btnCloseGal.addEventListener('click', closeGal);
  btnPrev.addEventListener('click', () => { current = (current - 1 + galleryItems.length) % galleryItems.length; updateImg(); });
  btnNext.addEventListener('click', () => { current = (current + 1) % galleryItems.length; updateImg(); });

  /* cerrar con ESC o clic fuera */
  window.addEventListener('keydown', e => {
    if (!galleryModal.classList.contains('gallery-modal--active')) return;
    if (e.key === 'Escape') closeGal();
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  });
  galleryModal.addEventListener('click', e => {
    if (e.target === galleryModal) closeGal();
  });
}

/* -------------- DROPDOWN CALENDARIO -------------- */
const btnCalendar = document.getElementById('btnCalendar');
const calendarMenu = document.getElementById('calendarMenu');

if (btnCalendar && calendarMenu) {
  btnCalendar.addEventListener('click', () => {
    const isOpen = calendarMenu.style.display === 'flex';

    // Toggle display
    calendarMenu.style.display = isOpen ? 'none' : 'flex';

    // Toggle class to change style
    btnCalendar.classList.toggle('open', !isOpen);
  });
}


/* -------------- MODAL ALOJAMIENTOS -------------- */
const btnAloja = document.getElementById('btnAlojamientos');
const modalAlo = document.getElementById('modalAlojamientos');
if (btnAloja && modalAlo) {
  const closeAlo = modalAlo.querySelector('.modal__close');
  btnAloja.onclick = () => modalAlo.style.display = 'flex';
  closeAlo.onclick = () => modalAlo.style.display = 'none';
  window.addEventListener('click', e => { if (e.target === modalAlo) modalAlo.style.display = 'none'; });
}


/* ====== Dropdown Calendario ====== */
// (Eliminado código duplicado de btnCalendar y calendarMenu)


/* ====== Modal Alojamientos ====== */
const btnAlojamientos = document.getElementById('btnAlojamientos');
const modalAlojamientos = document.getElementById('modalAlojamientos');

btnAlojamientos.onclick = () => modalAlojamientos.style.display = 'flex';
modalAlojamientos.querySelector('.modal__close').onclick = () => modalAlojamientos.style.display = 'none';

window.addEventListener('click', e => {
  if (e.target === modalAlojamientos) {
    modalAlojamientos.style.display = 'none';
  }
});

// ===============Agendar evento===================

// (Eliminado código duplicado de btnCalendar y calendarMenu)


