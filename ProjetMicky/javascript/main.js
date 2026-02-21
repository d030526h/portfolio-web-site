/* ════════════════════════════════════════════════
   MAIN.JS — Chargé AVANT router.js
════════════════════════════════════════════════ */

/* ── Cursor ──────────────────────────────────── */
/* ── Cursor (desktop uniquement) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  var cur = document.getElementById('cur');
  document.addEventListener('mousemove', function(e) {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
}


/* ── Scroll reveal ───────────────────────────── */
function triggerReveals() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal:not(.in)').forEach(function(el, i) {
    if (!el.style.transitionDelay)
      el.style.transitionDelay = (i * 0.09) + 's';
    io.observe(el);
  });
}

/* ── Skill bars ──────────────────────────────── */
var barsOk = false;
function animateBars() {
  if (barsOk) return;
  barsOk = true;
  document.querySelectorAll('.bar-fill').forEach(function(b, i) {
    setTimeout(function() { b.style.width = b.dataset.w + '%'; }, i * 130);
  });
}

/* ── Navigation clavier ──────────────────────── */
var PAGE_ORDER = ['hero', 'about', 'portfolio', 'contact'];
document.addEventListener('keydown', function(e) {
  if (!window.router) return;
  var cur_page = router.current ? router.current.split(':')[0] : '';
  var i = PAGE_ORDER.indexOf(cur_page);
  if (i === -1) return;
  if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && i < PAGE_ORDER.length - 1)
    router.go(PAGE_ORDER[i + 1]);
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && i > 0)
    router.go(PAGE_ORDER[i - 1]);
});

/* ════════════════════════════════════════════════
   DONNÉES PROJETS
   ⚠️ Remplace /ProjetMicky/ par ton nom de dossier
════════════════════════════════════════════════ */
window._PROJECTS = {
  Projet1: {
    title:  'Nom Projet 1 — ENTREPRISE A',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   "Description du projet/role.",
    stats:  [
      { lbl: 'Format',   val: 'XXX' },
      { lbl: 'Délai',    val: 'XXX' },
      { lbl: 'Diffusion',val: 'XXX' },
      { lbl: 'Langue',   val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    year:   '2026',
    client: 'ENTREPRISE A',
    video:  '/ProjetMicky/videos/videoInersio.mp4',
    shots:  [
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
    ],
    prev: null,
    next: 'Projet2',
  },
  Projet2: {
    title:  'Nom Projet 2 — ENTREPRISE A',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   "Description du projet/role.",
    stats:  [
      { lbl: 'Format',   val: 'XXX' },
      { lbl: 'Délai',    val: 'XXX' },
      { lbl: 'Diffusion',val: 'XXX' },
      { lbl: 'Langue',   val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3', 'Logiciel 4'],
    year:   '2025',
    client: 'ENTREPRISE A',
    image:  '/ProjetMicky/images/illustration.png',
    shots:  [
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
    ],
    prev: 'Projet1',
    next: 'Projet3',
  },
  Projet3: {
    title:  'Nom Projet 3 — ENTREPRISE B',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   "Description du projet/role.",
    stats:  [
      { lbl: 'Format',   val: 'XXX' },
      { lbl: 'Délai',    val: 'XXX' },
      { lbl: 'Diffusion',val: 'XXX' },
      { lbl: 'Langue',   val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    year:   '2025',
    client: 'ENTREPRISE B',
    image:  '/ProjetMicky/images/illustration.png',
    shots:  [
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
    ],
    prev: 'Projet2',
    next: 'Projet4',
  },
  Projet4: {
    title:  'Nom Projet 4 — ENTREPRISE C',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   "Description du projet/role.",
    stats:  [
      { lbl: 'Format',   val: 'XXX' },
      { lbl: 'Délai',    val: 'XXX' },
      { lbl: 'Diffusion',val: 'XXX' },
      { lbl: 'Langue',   val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2'],
    year:   '2024',
    client: 'ENTREPRISE C',
    image:  '/ProjetMicky/images/illustration.png',
    shots:  [
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
    ],
    prev: 'Projet3',
    next: 'Projet5',
  },
  Projet5: {
    title:  'Nom Projet 5 — ENTREPRISE A',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   "Description du projet/role.",
    stats:  [
      { lbl: 'Format',   val: 'XXX' },
      { lbl: 'Délai',    val: 'XXX' },
      { lbl: 'Diffusion',val: 'XXX' },
      { lbl: 'Langue',   val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    year:   '2024',
    client: 'ENTREPRISE A',
    image:  '/ProjetMicky/images/illustration.png',
    shots:  [
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
      '/ProjetMicky/images/illustration.png',
    ],
    prev: 'Projet4',
    next: null,
  },
};

/* ════════════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════════════ */
var _lbImages = [];
var _lbIndex  = 0;

window.openLightbox = function(imgs, i) {
  _lbImages = imgs; _lbIndex = i;
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  if (!lb || !img) return;
  img.src = imgs[i];
  document.getElementById('lb-counter').textContent = (i + 1) + ' / ' + imgs.length;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  var lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
};

window.lbNav = function(dir, e) {
  if (e) e.stopPropagation();
  _lbIndex = (_lbIndex + dir + _lbImages.length) % _lbImages.length;
  var img = document.getElementById('lb-img');
  img.style.opacity = '0';
  setTimeout(function() {
    img.src = _lbImages[_lbIndex];
    document.getElementById('lb-counter').textContent = (_lbIndex + 1) + ' / ' + _lbImages.length;
    img.style.opacity = '1';
  }, 160);
};

document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape')      window.closeLightbox();
  if (e.key === 'ArrowRight')  window.lbNav(1, null);
  if (e.key === 'ArrowLeft')   window.lbNav(-1, null);
});

/* ════════════════════════════════════════════════
   RENDER PROJECT
════════════════════════════════════════════════ */
window.renderProject = function(key) {
  var p = window._PROJECTS[key];
  if (!p) { if (window.router) router.go('portfolio'); return; }

  document.title = p.title + ' — Micky Valat';
  var $ = function(id) { return document.getElementById(id); };

  if ($('pd-title'))  $('pd-title').textContent  = p.title;
  if ($('pd-client')) $('pd-client').textContent = p.client;
  if ($('pd-desc'))   $('pd-desc').textContent   = p.desc;
  if ($('pd-year'))   $('pd-year').textContent   = p.year;


// Preview : vidéo ou image
var preview = document.querySelector('.pd-preview');
var playBtn = preview ? preview.querySelector('.play-btn') : null;

if (preview) {
  if (p.video) {
    // Créer la vidéo
    var vid = document.createElement('video');
    vid.src              = p.video;
    vid.preload          = 'metadata'; // charge juste la 1ère frame
    vid.controls         = false;
    vid.loop             = false;
    vid.playsInline      = true;
    vid.style.cssText    = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:18px;';
    preview.appendChild(vid);

    // Afficher le bouton play
    if (playBtn) {
      playBtn.style.display = 'flex';
      playBtn.onclick = function() {
        vid.play();
        // Cacher le bouton dès que la lecture démarre
        playBtn.style.opacity    = '0';
        playBtn.style.transform  = 'scale(.8)';
        playBtn.style.pointerEvents = 'none';
      };
      // Quand la vidéo se termine : remettre le bouton
      vid.addEventListener('ended', function() {
        playBtn.style.opacity       = '1';
        playBtn.style.transform     = 'scale(1)';
        playBtn.style.pointerEvents = 'all';
        vid.currentTime = 0; // revenir à la 1ère frame
      });
      // Clic sur la vidéo pour pause/reprise (sans bouton)
      vid.addEventListener('click', function() {
        if (!vid.paused) {
          vid.pause();
          playBtn.style.opacity       = '1';
          playBtn.style.transform     = 'scale(1)';
          playBtn.style.pointerEvents = 'all';
        }
      });
    }

  } else {
    // Pas de vidéo : pas de bouton play
    if (playBtn) playBtn.style.display = 'none';
    if (p.image) {
      preview.style.backgroundImage    = 'url(' + p.image + ')';
      preview.style.backgroundSize     = 'cover';
      preview.style.backgroundPosition = 'center';
    }
  }
}



  // Tags
  if ($('pd-tags'))
    $('pd-tags').innerHTML = p.tags.map(function(t) {
      return '<span class="modal-tag">' + t + '</span>';
    }).join('');

  // Stats
  if ($('pd-stats'))
    $('pd-stats').innerHTML = p.stats.map(function(s) {
      return '<div class="pd-stat-card">' +
        '<div class="modal-stat-lbl">' + s.lbl + '</div>' +
        '<div class="modal-stat-val">' + s.val + '</div>' +
        '</div>';
    }).join('');

  // Outils
  if ($('pd-tools'))
    $('pd-tools').innerHTML = p.tools.map(function(t) {
      return '<span class="modal-tool">' + t + '</span>';
    }).join('');

  // Galerie aperçus
  if ($('pd-gallery')) {
    var imgs = (p.shots && p.shots.length) ? p.shots : [p.image, p.image, p.image];
    $('pd-gallery').innerHTML = imgs.map(function(src, i) {
      return '<div class="pd-shot" onclick="openLightbox(' + JSON.stringify(imgs) + ',' + i + ')">' +
        '<img src="' + src + '" alt="Aperçu ' + (i + 1) + '" ' +
        'onerror="this.style.opacity=\'0\'" />' +
        '</div>';
    }).join('');

    // Animation d'entrée décalée
    setTimeout(function() {
      document.querySelectorAll('.pd-shot').forEach(function(el, i) {
        setTimeout(function() { el.classList.add('shot-in'); }, i * 110);
      });
    }, 120);
  }

  // Navigation projets
  if ($('pd-nav-projects')) {
    var nav = '<div class="pd-nav-inner">';
    if (p.prev) {
      var pp = window._PROJECTS[p.prev];
      nav += '<a href="/project/' + p.prev + '" class="pd-nav-card pd-nav-prev">' +
        '<span class="pd-nav-dir">← Précédent</span>' +
        '<span class="pd-nav-name">' + pp.title + '</span></a>';
    } else { nav += '<div></div>'; }
    if (p.next) {
      var pn = window._PROJECTS[p.next];
      nav += '<a href="/project/' + p.next + '" class="pd-nav-card pd-nav-next">' +
        '<span class="pd-nav-dir">Suivant →</span>' +
        '<span class="pd-nav-name">' + pn.title + '</span></a>';
    }
    nav += '</div>';
    $('pd-nav-projects').innerHTML = nav;
  }
};