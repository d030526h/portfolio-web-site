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
    },
  },
};

// -------------------- HEADER & MOBILE MENU --------------------
const headerName = document.getElementById("header-name");
const headerContainer = document.getElementById("header-container");
const homeSection = document.querySelector("section[data-animate]");
const menuBtn = document.getElementById("menu-btn");
const mobilePanel = document.getElementById("mobile-panel");
const overlay = document.getElementById("mobile-overlay");
const closeBtn = document.getElementById("close-mobile-btn");
const mobileLinks = document.querySelectorAll('#mobile-panel nav a');

// -------------------- OBSERVER HOME --------------------
if (headerName && headerContainer && homeSection) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Retour sur home : cacher nom, centrer nav
          headerName.classList.remove("show");
          headerContainer.classList.remove("scrolled");
        } else {
          // Hors home : montrer nom, déplacer nav
          headerName.classList.add("show");
          if (window.innerWidth >= 640) headerContainer.classList.add("scrolled");
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(homeSection);
}

// -------------------- MOBILE PANEL --------------------
function openMobilePanel() {
  mobilePanel.classList.remove("translate-x-full");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100", "pointer-events-auto");
  document.body.style.overflow = "hidden";

  if (closeBtn) closeBtn.classList.add("open");

  if (menuBtn) {
    menuBtn.children[0].classList.add("rotate-45", "translate-y-1");
    menuBtn.children[1].classList.add("opacity-0");
    menuBtn.children[2].classList.add("-rotate-45", "-translate-y-1");
  }
}

function closeMobilePanel() {
  mobilePanel.classList.add("translate-x-full");
  overlay.classList.remove("opacity-100", "pointer-events-auto");
  overlay.classList.add("opacity-0", "pointer-events-none");
  document.body.style.overflow = "";

  if (closeBtn) closeBtn.classList.remove("open");

  if (menuBtn) {
    menuBtn.children[0].classList.remove("rotate-45", "translate-y-1");
    menuBtn.children[1].classList.remove("opacity-0");
    menuBtn.children[2].classList.remove("-rotate-45", "-translate-y-1");
  }
}

// Hamburger click
menuBtn?.addEventListener("click", () => {
  mobilePanel.classList.contains("translate-x-full") ? openMobilePanel() : closeMobilePanel();
});

// Overlay & close button
overlay?.addEventListener("click", closeMobilePanel);
closeBtn?.addEventListener("click", closeMobilePanel);

// Fermer le menu si la fenêtre devient large
window.addEventListener("resize", () => {
  if (window.innerWidth >= 640) closeMobilePanel();
});

// Fermer le panel au clic sur un lien mobile
mobileLinks.forEach(link => {
  link.addEventListener("click", closeMobilePanel);
});





// -------------------- SCROLL ANIMATIONS --------------------
function initScrollAnimations(selector = "[data-animate]", offset = 100) {
  const elements = document.querySelectorAll(selector);
  const elementInView = (el) => el.getBoundingClientRect().top <= window.innerHeight - offset;
  const displayElement = (el) => {
    el.classList.add("opacity-100", "translate-y-0");
    el.classList.remove("opacity-0", "translate-y-6");
  };
  const handleScroll = () => {
    elements.forEach(el => {
      if (elementInView(el)) displayElement(el);
    });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();            // [data-animate]
  initScrollAnimations("[data-scroll]"); // [data-scroll]
});

// -------------------- TOGGLE PANELS --------------------
function togglePanel(id) {
  const panel = document.getElementById(`xp-panel-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  const container = panel.parentElement; // Le div global

  const isOpen = panel.classList.contains("open");

  // Fermer les autres panels
  document.querySelectorAll("[id^='xp-panel-']").forEach(p => {
    if (p !== panel) {
      p.style.transition = "max-height 0.5s ease-in-out";
      p.style.maxHeight = "0";
      p.classList.remove("open");
      p.parentElement.classList.remove("open-parent");
    }
  });

  document.querySelectorAll("[id^='icon-']").forEach(i => {
    if (i !== icon) i.classList.remove("rotate-180");
  });

  if (!isOpen) {
    panel.classList.add("open");
    container.classList.add("open-parent");

    panel.style.transition = "max-height 0.5s ease-in-out";
    panel.style.maxHeight = panel.scrollHeight + "px";
    icon.classList.add("rotate-180");
  } else {
    panel.classList.remove("open");
    container.classList.remove("open-parent");

    panel.style.transition = "max-height 0.5s ease-in-out";
    panel.style.maxHeight = "0";
    icon.classList.remove("rotate-180");
  }
}

window.addEventListener("resize", () => {
  document.querySelectorAll("[id^='xp-panel-'].open").forEach(panel => {
    panel.style.maxHeight = panel.scrollHeight + "px";
  });
});

// -------------------- PROJECT FILTER --------------------
// -----------------------------
// VARIABLES
// -----------------------------
const buttons = document.querySelectorAll(".filter-btn");
const allCards = Array.from(document.querySelectorAll(".project-card"));
const container = document.getElementById("projects-grid");

// -----------------------------
// FONCTION POUR AFFICHER LES CARTES FILTRÉES
// -----------------------------
function showFilteredCards(filter) {
  container.innerHTML = ""; // vider le container

  const filtered = allCards.filter(card => {
    const tags = card.dataset.tags.split(",");
    return filter === "Tous" || tags.includes(filter);
  });

  let delay = 0;
  filtered.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.remove("show"); // invisible avant animation
    container.appendChild(clone);

    setTimeout(() => {
      clone.classList.add("show"); // ajoute la classe pour l'animation
    }, delay);

    delay += 80; // décalage entre chaque carte
  });

  // Ré-attacher les événements click aux nouveaux clones
  const newCards = container.querySelectorAll('.project-card');
  newCards.forEach(card => {
    card.addEventListener('click', () => {
      console.log("open");
      // Ton code d'ouverture du panneau ici, par ex:
      panelTitle.textContent = card.dataset.title;
      panelSubtitle.textContent = card.dataset.subtitle;
      panelAbout.textContent = card.dataset.about;
      panelTech.textContent = card.dataset.tech;

      panelImagesContainer.innerHTML = '';
      card.dataset.images.split(',').forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        img.className = "w-full flex-shrink-0 object-cover rounded-xl";
        panelImagesContainer.appendChild(img);
      });

      currentIndex = 0;
      panelImagesContainer.style.transform = 'translateX(0)';
      createDots();

      panelProject.classList.remove('hidden');
      panelProject.classList.add('flex');

      const panelContent = panelProject.firstElementChild;
      panelContent.classList.add('panel-animate');
      setTimeout(() => panelContent.classList.add('show'), 10);

      if (headerEl) headerEl.classList.add('header-hidden');
      document.body.style.overflow = 'hidden';
    });
  });
}


// -----------------------------
// CLIC SUR LES BOUTONS
// -----------------------------
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Gestion du bouton actif
    buttons.forEach(b => {
      b.classList.remove("bg-[#C1A261]", "text-white");
      b.classList.add("text-[#111827]");
    });
    btn.classList.add("bg-[#C1A261]", "text-white");
    btn.classList.remove("text-[#111827]");

    showFilteredCards(filter);
  });
});

// -----------------------------
// AFFICHAGE PAR DÉFAUT AU CHARGEMENT
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  if (buttons.length > 0) {
    const firstBtn = buttons[0];
    firstBtn.classList.add("bg-[#C1A261]", "text-white");
    firstBtn.classList.remove("text-[#111827]");
    showFilteredCards(firstBtn.dataset.filter);
  }
});

// -------------------- PROJECT PANEL --------------------
const projectCards = document.querySelectorAll('.project-card');
console.log(projectCards.length);
const panelProject = document.getElementById('project-panel');
const closePanel = document.getElementById('close-panel');
const panelTitle = document.getElementById('panel-title');
const panelSubtitle = document.getElementById('panel-subtitle');
const panelAbout = document.getElementById('panel-about');
const panelTech = document.getElementById('panel-tech');
const panelImagesContainer = document.getElementById('panel-images');
const dotsContainer = document.getElementById('carousel-dots');
const nextBtn = document.getElementById('next-img');
const prevBtn = document.getElementById('prev-img');

let currentIndex = 0;

// -------------------- OUVRIR LE PANEL --------------------
projectCards.forEach(card => {
  console.log("test");
  card.addEventListener('click', () => {
    console.log("open");
        // Remplir les infos
    panelTitle.textContent = card.dataset.title;
    panelSubtitle.textContent = card.dataset.subtitle;
    panelAbout.innerHTML  = card.dataset.about;
    panelTech.textContent = card.dataset.tech;

    // Images
    panelImagesContainer.innerHTML = '';
    card.dataset.images.split(',').forEach(src => {
      const img = document.createElement('img');
      img.src = src.trim();
      img.className = "w-full flex-shrink-0 object-cover rounded-xl";
      panelImagesContainer.appendChild(img);
    });

    currentIndex = 0;
    panelImagesContainer.style.transform = 'translateX(0)';

    // Créer les dots
    createDots();

    // Afficher le panel
    panelProject.classList.remove('hidden');
    panelProject.classList.add('flex');

    const panelContent = panelProject.firstElementChild;
    panelContent.classList.add('panel-animate');
    setTimeout(() => panelContent.classList.add('show'), 10);

    if(headerEl) headerEl.classList.add('header-hidden');
    document.body.style.overflow = 'hidden';
  });
});

// -------------------- FERMER LE PANEL --------------------
closePanel.addEventListener('click', closeProjectPanel);

panelProject.addEventListener('click', e => {
  if (!panelProject.firstElementChild.contains(e.target)) {
    closeProjectPanel();
  }
});

function closeProjectPanel() {
  const panelContent = panelProject.firstElementChild;
  if (!panelContent) return; // sécurité

  panelContent.classList.remove('show');
  setTimeout(() => {
    panelProject.classList.add('hidden');
    panelProject.classList.remove('flex');
    document.body.style.overflow = 'auto';
    if (headerEl) headerEl.classList.remove('header-hidden');
  }, 300);
}


// -------------------- CAROUSEL --------------------
function createDots() {
  dotsContainer.innerHTML = '';
  const imgs = panelImagesContainer.children;
  for (let i = 0; i < imgs.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full hover:bg-[#C1A261] transition-all duration-300';
    dot.addEventListener('click', () => showImage(i));
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    // Gestion de l'état actif
    if (i === currentIndex) {
      dots[i].classList.add('bg-[#C1A261]/80', 'scale-150', 'shadow-lg');
      dots[i].classList.remove('bg-gray-900/60');
      dots[i].style.animation = '';
    } else {
      dots[i].classList.remove('bg-[#C1A261]/80', 'scale-150', 'shadow-lg');
      dots[i].classList.add('bg-gray-900/60');
      dots[i].style.animation = '';
    }
  }
}



function showImage(index) {
  const imgs = panelImagesContainer.children;
  if (imgs.length === 0) return;
  currentIndex = (index + imgs.length) % imgs.length;
  panelImagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));


document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll(".project-card");

    // Remove active class on buttons
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let delay = 0;

    cards.forEach(card => {
      const tags = card.dataset.tags.split(",");

      const shouldShow = filter === "Tous" || tags.includes(filter);

      if (shouldShow) {
        // stagger sur les apparitions
        setTimeout(() => {
          card.classList.remove("project-hide");
          card.classList.add("project-show");
        }, delay);

        delay += 80; // ajoute un léger décalage entre chaque carte
      } else {
        // disparition instant mais animée
        card.classList.remove("project-show");
        card.classList.add("project-hide");
      }
    });
  });
});

document.getElementById('contact-form').addEventListener('submit', e => {
  const btn = e.target.querySelector('button span');
  const loader = document.getElementById('loader');
  
  btn.querySelector('#btn-text').textContent = 'Envoi...';
  loader.classList.remove('opacity-0');
  // Laissez Netlify gérer la soumission (pas de e.preventDefault())
});
