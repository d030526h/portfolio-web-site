/* ════════════════════════════════════════════════
   ROUTER — SPA compatible XAMPP (sous-dossier)
   window.BASE et window.ASSET_BASE définis dans index.html
════════════════════════════════════════════════ */

const DARK_PAGES = new Set(['hero', 'contact', 'project']);

const ROUTES = {
  '/'          : { page: 'hero',      file: 'pages/hero.html' },
  '/about'     : { page: 'about',     file: 'pages/about.html' },
  '/portfolio' : { page: 'portfolio', file: 'pages/portfolio.html' },
  '/contact'   : { page: 'contact',   file: 'pages/contact.html' },
  '/project'   : { page: 'project',   file: 'pages/project.html' },
};

const CACHE = {};

const router = {
  current: null,

  resolve(fullPath) {
    const path = fullPath.startsWith(BASE)
      ? fullPath.slice(BASE.length) || '/'
      : fullPath;
    if (path.startsWith('/project/')) {
      return { route: ROUTES['/project'], param: path.split('/')[2] };
    }
    const clean = path.replace(/\/+$/, '') || '/';
    return { route: ROUTES[clean] || ROUTES['/'], param: null };
  },

  async load(file) {
    if (CACHE[file]) return CACHE[file];
    // Chemin absolu depuis la racine du site via ASSET_BASE
    const url = ASSET_BASE + file;
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' → ' + url);
    const html = await res.text();
    CACHE[file] = html;
    return html;
  },

  async go(input, param = null, push = true) {
    let path = input;
    if (!path.startsWith('/')) {
      path = (input === 'hero') ? '/' : '/' + input;
    }
    if (param) path = '/project/' + param;

    const { route, param: p } = this.resolve(path);
    if (!route) return;

    const key = p ? 'project:' + p : route.page;
    if (this.current === key) return;

    const vp = document.getElementById('viewport');

    // Fade out
    vp.style.transition = 'opacity .18s ease, transform .18s ease';
    vp.style.opacity    = '0';
    vp.style.transform  = 'translateY(-8px)';

    let html;
    try {
      html = await this.load(route.file);
    } catch(err) {
      console.error('[router] Chargement échoué :', err);
      vp.style.opacity   = '1';
      vp.style.transform = 'translateY(0)';
      return;
    }

    await sleep(180);

    vp.innerHTML = html;

    // Appel renderProject après injection DOM
    if (p && window.renderProject) {
      window.renderProject(p);
    }

    // Fade in
    vp.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      vp.style.opacity   = '1';
      vp.style.transform = 'translateY(0)';
    }));

    this.current = key;

    if (push) {
      const fullUrl = BASE + (path === '/' ? '/' : path);
      history.pushState({ path }, '', fullUrl);
    }

    this.updateUI(route.page);
    document.title = ({
      hero:      'Micky Valat — Monteur Vidéo',
      about:     'À propos — Micky Valat',
      portfolio: 'Portfolio — Micky Valat',
      contact:   'Contact — Micky Valat',
      project:   'Projet — Micky Valat',
    })[route.page] || 'Micky Valat';

    window.scrollTo(0, 0);
    setTimeout(() => {
      triggerReveals();
      if (route.page === 'about') setTimeout(animateBars, 480);
    }, 60);
  },

  updateUI(page) {
    const nav = document.getElementById('nav');
    nav.classList.toggle('on-dark', DARK_PAGES.has(page));
    document.querySelectorAll('.nav-link, .mob-item').forEach(el =>
      el.classList.toggle('active', el.dataset.route === page)
    );
  },

  intercept() {
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-route]') || e.target.closest('a[href^="/"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('http') || href.startsWith('mailto') || href === '#') return;
      e.preventDefault();
      const dr = a.dataset.route;
      if (dr && !href.startsWith('/project/')) {
        this.go(dr);
      } else {
        this.go(href);
      }
    });
  },

  handlePop() {
    window.addEventListener('popstate', e => {
      const path = e.state?.path || window.location.pathname;
      this.go(path, null, false);
    });
  },

  init() {
    this.intercept();
    this.handlePop();
    this.go(window.location.pathname, null, false);
  },
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Init déclenché après que main.js a tout défini
router.init();
