// -------------------- CONFIG TAILWIND --------------------
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#C1A261',
        background: '#0D1117',
        textmain: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1536px',
        '2xl': '1920px',
      },
    },
  },
};


// -------------------- SÉLECTEURS GLOBAUX --------------------
const headerEl         = document.querySelector('header');
const headerName       = document.getElementById('header-name');
const headerContainer  = document.getElementById('header-container');
const homeSection      = document.querySelector('section[data-animate]');
const menuBtn          = document.getElementById('menu-btn');
const mobilePanel      = document.getElementById('mobile-panel');
const overlay          = document.getElementById('mobile-overlay');
const closeBtn         = document.getElementById('close-mobile-btn');
const mobileLinks      = document.querySelectorAll('#mobile-panel nav a');

const panelProject         = document.getElementById('project-panel');
const closePanel           = document.getElementById('close-panel');
const panelTitle           = document.getElementById('panel-title');
const panelSubtitle        = document.getElementById('panel-subtitle');
const panelAbout           = document.getElementById('panel-about');
const panelTech            = document.getElementById('panel-tech');
const panelImagesContainer = document.getElementById('panel-images');
const dotsContainer        = document.getElementById('carousel-dots');
const nextBtn              = document.getElementById('next-img');
const prevBtn              = document.getElementById('prev-img');

const filterButtons = document.querySelectorAll('.filter-btn');
const allCards      = Array.from(document.querySelectorAll('.project-card'));
const projectsGrid  = document.getElementById('projects-grid');

let currentIndex  = 0;
let currentFilter = 'Tous';


// -------------------- OBSERVER HOME --------------------
if (headerName && headerContainer && homeSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headerName.classList.remove('show');
        headerContainer.classList.remove('scrolled');
      } else {
        headerName.classList.add('show');
        if (window.innerWidth >= 768) headerContainer.classList.add('scrolled');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(homeSection);
}


// -------------------- MOBILE PANEL --------------------
function openMobilePanel() {
  mobilePanel.classList.remove('translate-x-full');
  overlay.classList.replace('opacity-0', 'opacity-100');
  overlay.classList.replace('pointer-events-none', 'pointer-events-auto');
  document.body.style.overflow = 'hidden';
  closeBtn?.classList.add('open');

  menuBtn?.querySelectorAll('span').forEach((span, i) => {
    if (i === 0) span.classList.add('rotate-45', 'translate-y-1');
    if (i === 1) span.classList.add('opacity-0');
    if (i === 2) span.classList.add('-rotate-45', '-translate-y-1');
  });
}

function closeMobilePanel() {
  mobilePanel.classList.add('translate-x-full');
  overlay.classList.replace('opacity-100', 'opacity-0');
  overlay.classList.replace('pointer-events-auto', 'pointer-events-none');
  document.body.style.overflow = '';
  closeBtn?.classList.remove('open');

  menuBtn?.querySelectorAll('span').forEach((span, i) => {
    if (i === 0) span.classList.remove('rotate-45', 'translate-y-1');
    if (i === 1) span.classList.remove('opacity-0');
    if (i === 2) span.classList.remove('-rotate-45', '-translate-y-1');
  });
}

menuBtn?.addEventListener('click', () => {
  mobilePanel.classList.contains('translate-x-full') ? openMobilePanel() : closeMobilePanel();
});

overlay?.addEventListener('click', closeMobilePanel);
closeBtn?.addEventListener('click', closeMobilePanel);
mobileLinks.forEach(link => link.addEventListener('click', closeMobilePanel));

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobilePanel();
});


// -------------------- SCROLL ANIMATIONS --------------------
function initScrollAnimations(selector = '[data-animate]', offset = 100) {
  const elements = document.querySelectorAll(selector);
  const isInView = el => el.getBoundingClientRect().top <= window.innerHeight - offset;
  const reveal   = el => {
    el.classList.add('opacity-100', 'translate-y-0');
    el.classList.remove('opacity-0', 'translate-y-6');
  };

  const handleScroll = () => elements.forEach(el => { if (isInView(el)) reveal(el); });
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initScrollAnimations('[data-scroll]');
});


// -------------------- TOGGLE PANELS EXPÉRIENCE --------------------
function togglePanel(id) {
  const panel     = document.getElementById(`xp-panel-${id}`);
  const icon      = document.getElementById(`icon-${id}`);
  const container = panel.parentElement;
  const isOpen    = panel.classList.contains('open');

  // Fermer tous les autres
  document.querySelectorAll("[id^='xp-panel-']").forEach(p => {
    if (p !== panel) {
      p.style.maxHeight = '0';
      p.classList.remove('open');
      p.parentElement.classList.remove('open-parent');
    }
  });
  document.querySelectorAll("[id^='icon-']").forEach(i => {
    if (i !== icon) i.classList.remove('rotate-180');
  });

  panel.style.transition = 'max-height 0.5s ease-in-out';

  if (!isOpen) {
    panel.classList.add('open');
    container.classList.add('open-parent');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    icon.classList.add('rotate-180');
  } else {
    panel.classList.remove('open');
    container.classList.remove('open-parent');
    panel.style.maxHeight = '0';
    icon.classList.remove('rotate-180');
  }
}

window.addEventListener('resize', () => {
  document.querySelectorAll("[id^='xp-panel-'].open").forEach(panel => {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });
});


// -------------------- PROJECT FILTER --------------------
function setActiveFilterBtn(activeBtn) {
  filterButtons.forEach(b => {
    b.classList.remove('bg-[#C1A261]', 'text-white', 'scale-105');
    b.classList.add('bg-white', 'text-[#111827]');
    const shine = b.querySelector('span:first-child');
    if (shine) shine.className = 'absolute inset-0 bg-gradient-to-r from-[#C1A261]/0 via-[#C1A261]/10 to-[#C1A261]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700';
  });

  activeBtn.classList.add('bg-[#C1A261]', 'text-white', 'scale-105');
  activeBtn.classList.remove('bg-white', 'text-[#111827]');
  const activeShine = activeBtn.querySelector('span:first-child');
  if (activeShine) activeShine.className = 'absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700';
}

function showFilteredCards(filter) {
  currentFilter = filter;
  projectsGrid.innerHTML = '';

  const filtered = allCards.filter(card => {
    const tags = card.dataset.tags.split(',');
    return filter === 'Tous' || tags.includes(filter);
  });

  filtered.forEach((card, i) => {
    const clone = card.cloneNode(true);
    clone.classList.remove('show');
    projectsGrid.appendChild(clone);
    setTimeout(() => clone.classList.add('show'), i * 80);

    clone.addEventListener('click', () => openProjectPanel(clone));
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveFilterBtn(btn);
    showFilteredCards(btn.dataset.filter);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  if (filterButtons.length > 0) {
    setActiveFilterBtn(filterButtons[0]);
    showFilteredCards(filterButtons[0].dataset.filter);
  }
});


// -------------------- PROJECT PANEL --------------------
function openProjectPanel(card) {
  panelTitle.textContent    = card.dataset.title;
  panelSubtitle.textContent = card.dataset.subtitle;
  panelAbout.innerHTML      = card.dataset.about;
  panelTech.textContent     = card.dataset.tech;

  panelImagesContainer.innerHTML = '';
  card.dataset.images.split(',').forEach(src => {
    const img = document.createElement('img');
    img.src       = src.trim();
    img.className = 'w-full flex-shrink-0 object-cover rounded-xl';
    panelImagesContainer.appendChild(img);
  });

  currentIndex = 0;
  panelImagesContainer.style.transform = 'translateX(0)';
  createDots();

  panelProject.classList.replace('hidden', 'flex');
  const panelContent = panelProject.firstElementChild;
  panelContent.classList.add('panel-animate');
  setTimeout(() => panelContent.classList.add('show'), 10);

  headerEl?.classList.add('header-hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectPanel() {
  const panelContent = panelProject.firstElementChild;
  if (!panelContent) return;

  panelContent.classList.remove('show');
  setTimeout(() => {
    panelProject.classList.replace('flex', 'hidden');
    document.body.style.overflow = 'auto';
    headerEl?.classList.remove('header-hidden');
  }, 300);
}

closePanel?.addEventListener('click', closeProjectPanel);

panelProject?.addEventListener('click', e => {
  if (!panelProject.firstElementChild.contains(e.target)) closeProjectPanel();
});


// -------------------- CAROUSEL --------------------
function createDots() {
  dotsContainer.innerHTML = '';
  Array.from(panelImagesContainer.children).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full hover:bg-[#C1A261] transition-all duration-300';
    dot.addEventListener('click', () => showImage(i));
    dotsContainer.appendChild(dot);
  });
  updateDots();
}

function updateDots() {
  Array.from(dotsContainer.children).forEach((dot, i) => {
    const isActive = i === currentIndex;
    dot.classList.toggle('bg-[#C1A261]/80', isActive);
    dot.classList.toggle('scale-150', isActive);
    dot.classList.toggle('shadow-lg', isActive);
    dot.classList.toggle('bg-gray-900/60', !isActive);
  });
}

function showImage(index) {
  const count = panelImagesContainer.children.length;
  if (!count) return;
  currentIndex = (index + count) % count;
  panelImagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

nextBtn?.addEventListener('click', () => showImage(currentIndex + 1));
prevBtn?.addEventListener('click', () => showImage(currentIndex - 1));


// -------------------- CONTACT FORM --------------------
document.getElementById('contact-form')?.addEventListener('submit', e => {
  const btnText = e.target.querySelector('#btn-text');
  const loader  = document.getElementById('loader');
  if (btnText) btnText.textContent = 'Envoi...';
  loader?.classList.remove('opacity-0');
});
