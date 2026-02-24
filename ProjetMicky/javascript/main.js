/* ════════════════════════════════════════════════
   MAIN.JS
════════════════════════════════════════════════ */


/* ── Cursor ──────────────────────────────────── */
if (window.matchMedia('(pointer: fine) and (hover: hover)').matches) {
  var cur = document.getElementById('cur');
  document.addEventListener('mousemove', function(e) {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
}

/* ── Render Loader ───────────────────────────── */
window.showRenderLoader = function(onComplete) {
  console.log('[loader] showRenderLoader appelé');

  var loader = document.getElementById('render-loader');
  var bar    = document.getElementById('rl-bar');
  var pct    = document.getElementById('rl-pct');
  var meta   = document.getElementById('rl-meta');

  console.log('[loader] éléments trouvés →', {
    loader: !!loader,
    bar:    !!bar,
    pct:    !!pct,
    meta:   !!meta
  });

  if (!loader) {
    console.warn('[loader] ❌ #render-loader introuvable → onComplete() immédiat');
    onComplete();
    return;
  }

  var MIN_DURATION = 1200;
  var startTime    = Date.now();

  var steps = [
    { p: 8,   label: 'Lecture des métadonnées…' },
    { p: 22,  label: 'Décodage des pistes vidéo…' },
    { p: 41,  label: 'Chargement des effets…' },
    { p: 58,  label: 'Rendu des transitions…' },
    { p: 74,  label: 'Synchronisation audio…' },
    { p: 88,  label: 'Finalisation…' },
    { p: 100, label: 'Prêt.' },
  ];

  var i = 0;
  bar.style.width  = '0%';
  pct.textContent  = '0%';
  meta.textContent = 'Initialisation…';
  loader.classList.remove('fade-out');
  loader.classList.add('active');

  console.log('[loader] ✅ classe active ajoutée | classes =', loader.className);
  console.log('[loader] styles computed → opacity :', getComputedStyle(loader).opacity, '| pointer-events :', getComputedStyle(loader).pointerEvents);

  function step() {
    if (i >= steps.length) {
      var elapsed   = Date.now() - startTime;
      var remaining = Math.max(0, MIN_DURATION - elapsed);
      console.log('[loader] steps terminés | elapsed =', elapsed + 'ms | remaining =', remaining + 'ms');

      setTimeout(function() {
        console.log('[loader] → fade-out start');
        loader.classList.add('fade-out');

        setTimeout(function() {
          console.log('[loader] → fade-out terminé, onComplete() appelé');
          loader.classList.remove('active', 'fade-out');
          onComplete();
        }, 420);
      }, remaining);
      return;
    }

    var s = steps[i++];
    bar.style.width  = s.p + '%';
    pct.textContent  = s.p + '%';
    meta.textContent = s.label;
    console.log('[loader] step ' + i + '/' + steps.length + ' →', s.p + '%', '|', s.label);

    setTimeout(step, 80 + Math.random() * 140);
  }

  step();
};




/* ── Compteur animé stats hero ───────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
    var target    = parseInt(el.getAttribute('data-target'));
    var suffix    = el.getAttribute('data-suffix') || '';
    var duration  = 1400;
    var startTime = null;
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}


/* ── Compteur animé impact projet ────────────── */
function animateImpact() {
  document.querySelectorAll('.pd-impact-val[data-target]').forEach(function(el) {
    var target    = parseFloat(el.getAttribute('data-target'));
    var suffix    = el.getAttribute('data-suffix') || '';
    var isFloat   = target % 1 !== 0;
    var duration  = 1400;
    var startTime = null;
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var v = easeOut(p) * target;
      el.textContent = (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}


/* ── Scroll reveal ───────────────────────────── */
window.triggerReveals = function() {
  var elements = document.querySelectorAll('.reveal');
  console.log('[triggerReveals] trouvés =', elements.length);

  elements.forEach(function(el, i) {
    setTimeout(function() {
      el.classList.add('in');
    }, i * 70);
  });

  // Stats counter
  var statsEl = document.querySelector('.stats-strip');
  if (statsEl) {
    setTimeout(animateCounters, 400);
  }
};




/* ── Skill bars ──────────────────────────────── */
window.animateBars    = function() {
  document.querySelectorAll('.bar-fill').forEach(function(bar) {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.getBoundingClientRect();
    bar.style.transition = 'width 1.4s cubic-bezier(0.16,1,0.3,1)';
    bar.style.width = bar.getAttribute('data-w') + '%';
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
  if ((e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   && i > 0)
    router.go(PAGE_ORDER[i - 1]);
});


/* ════════════════════════════════════════════════
   DONNÉES PROJETS
════════════════════════════════════════════════ */
window._PROJECTS = {
  Projet1: {
    title:  'Nom Projet 1',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   'Description du projet/role.',
    stats:  [
      { lbl: 'Format',    val: 'XXX' },
      { lbl: 'Délai',     val: 'XXX' },
      { lbl: 'Diffusion', val: 'XXX' },
      { lbl: 'Langue',    val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    impact: [
      { value: 2.4, suffix: 'M',   label: 'Vues totales',      icon: '▶' },
      { value: 68,  suffix: '%',   label: 'Taux de rétention', icon: '⏱' },
      { value: 320, suffix: 'K',   label: 'Reach Instagram',   icon: '◈' },
      { value: 4.9, suffix: '/5',  label: 'Note client',       icon: '★' },
    ],
    year:   '2026',
    client: 'ENTREPRISE A',
    video:  '/ProjetMicky/videos/videoInersio.mp4',
    prev: null,
    next: 'Projet2',
  },
  Projet2: {
    title:  'Nom Projet 2',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   'Description du projet/role.',
    stats:  [
      { lbl: 'Format',    val: 'XXX' },
      { lbl: 'Délai',     val: 'XXX' },
      { lbl: 'Diffusion', val: 'XXX' },
      { lbl: 'Langue',    val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3', 'Logiciel 4'],
    impact: [
      { value: 1.2, suffix: 'M',   label: 'Vues totales',      icon: '▶' },
      { value: 72,  suffix: '%',   label: 'Taux de rétention', icon: '⏱' },
      { value: 180, suffix: 'K',   label: 'Reach Instagram',   icon: '◈' },
      { value: 5.0, suffix: '/5',  label: 'Note client',       icon: '★' },
    ],
    year:   '2025',
    client: 'ENTREPRISE A',
    image:  '/ProjetMicky/images/illustration.png',
    prev: 'Projet1',
    next: 'Projet3',
  },
  Projet3: {
    title:  'Nom Projet 3',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   'Description du projet/role.',
    stats:  [
      { lbl: 'Format',    val: 'XXX' },
      { lbl: 'Délai',     val: 'XXX' },
      { lbl: 'Diffusion', val: 'XXX' },
      { lbl: 'Langue',    val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    impact: [
      { value: 850, suffix: 'K',   label: 'Vues totales',      icon: '▶' },
      { value: 61,  suffix: '%',   label: 'Taux de rétention', icon: '⏱' },
      { value: 95,  suffix: 'K',   label: 'Reach Instagram',   icon: '◈' },
      { value: 4.8, suffix: '/5',  label: 'Note client',       icon: '★' },
    ],
    year:   '2025',
    client: 'ENTREPRISE B',
    image:  '/ProjetMicky/images/illustration.png',
    prev: 'Projet2',
    next: 'Projet4',
  },
  Projet4: {
    title:  'Nom Projet 4',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   'Description du projet/role.',
    stats:  [
      { lbl: 'Format',    val: 'XXX' },
      { lbl: 'Délai',     val: 'XXX' },
      { lbl: 'Diffusion', val: 'XXX' },
      { lbl: 'Langue',    val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2'],
    impact: [
      { value: 400, suffix: 'K',   label: 'Vues totales',      icon: '▶' },
      { value: 58,  suffix: '%',   label: 'Taux de rétention', icon: '⏱' },
      { value: 60,  suffix: 'K',   label: 'Reach Instagram',   icon: '◈' },
      { value: 4.7, suffix: '/5',  label: 'Note client',       icon: '★' },
    ],
    year:   '2024',
    client: 'ENTREPRISE C',
    image:  '/ProjetMicky/images/illustration.png',
    prev: 'Projet3',
    next: 'Projet5',
  },
  Projet5: {
    title:  'Nom Projet 5',
    tags:   ['Tag1', 'Tag2', 'Tag3'],
    desc:   'Description du projet/role.',
    stats:  [
      { lbl: 'Format',    val: 'XXX' },
      { lbl: 'Délai',     val: 'XXX' },
      { lbl: 'Diffusion', val: 'XXX' },
      { lbl: 'Langue',    val: 'XXX' },
    ],
    tools:  ['Logiciel 1', 'Logiciel 2', 'Logiciel 3'],
    impact: [
      { value: 600, suffix: 'K',   label: 'Vues totales',      icon: '▶' },
      { value: 65,  suffix: '%',   label: 'Taux de rétention', icon: '⏱' },
      { value: 110, suffix: 'K',   label: 'Reach Instagram',   icon: '◈' },
      { value: 5.0, suffix: '/5',  label: 'Note client',       icon: '★' },
    ],
    year:   '2024',
    client: 'ENTREPRISE A',
    image:  '/ProjetMicky/images/illustration.png',
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
  if (e.key === 'Escape')     window.closeLightbox();
  if (e.key === 'ArrowRight') window.lbNav(1, null);
  if (e.key === 'ArrowLeft')  window.lbNav(-1, null);
});

function renderTimeline(p, vid) {
  var tracks = {
    'v2': randomClips(2, 4, 8),
    'v1': randomClips(5, 8, 3),
    'a1': randomClips(4, 6, 5),
    'a2': randomClips(1, 3, 12),
  };

  Object.keys(tracks).forEach(function(id) {
    var lane = document.getElementById('pd-tl-' + id);
    if (!lane) return;
    lane.innerHTML = '';
    tracks[id].forEach(function(clip, i) {
      var el = document.createElement('div');
      el.className = 'pd-tl-clip';
      el.style.left  = clip.left  + '%';
      el.style.width = clip.width + '%';
      lane.appendChild(el);
      setTimeout(function() { el.classList.add('clip-in'); }, 120 + i * 60);
    });
  });

  var playhead  = document.getElementById('pd-playhead');
  var tcOverlay = document.getElementById('pd-timecode');
  var clipsCol  = document.getElementById('pd-tl-clips');

  // ── Ruler ────────────────────────────────────
  function buildRuler(duration) {
    var ruler = document.getElementById('pd-tl-ruler');
    if (!ruler) return;
    ruler.innerHTML = '';

    // Choisit un intervalle lisible selon la durée
    var interval;
    if      (duration <= 60)  interval = 10;
    else if (duration <= 180) interval = 30;
    else if (duration <= 600) interval = 60;
    else                      interval = 120;

    var steps = Math.floor(duration / interval);

    for (var i = 0; i <= steps; i++) {
      var sec  = i * interval;
      var pct  = sec / duration;

      var tick = document.createElement('div');
      tick.className  = 'pd-tl-tick';
      tick.style.left = 'calc(52px + (100% - 52px) * ' + pct + ')';
      tick.style.height = '10px';
      ruler.appendChild(tick);

      var lbl = document.createElement('span');
      lbl.className  = 'pd-tl-tick-lbl';
      lbl.style.left = tick.style.left;
      lbl.textContent = formatTC(sec);
      ruler.appendChild(lbl);
    }

    // Tick final = durée exacte si non alignée
    if (duration % interval !== 0) {
      var endTick = document.createElement('div');
      endTick.className  = 'pd-tl-tick';
      endTick.style.left = 'calc(52px + (100% - 52px) * 1)';
      endTick.style.height = '10px';
      ruler.appendChild(endTick);

      var endLbl = document.createElement('span');
      endLbl.className  = 'pd-tl-tick-lbl';
      endLbl.style.left = endTick.style.left;
      endLbl.textContent = formatTC(duration);
      ruler.appendChild(endLbl);
    }
  }

  function formatTC(seconds) {
    var s = Math.floor(seconds);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    s = s % 60;
    m = m % 60;
    if (h > 0) {
      return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }
    return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }

  function updateTimecode(seconds) {
    if (!tcOverlay) return;
    var t  = Math.floor(seconds);
    var h  = Math.floor(t / 3600);
    var m  = Math.floor((t % 3600) / 60);
    var s  = t % 60;
    var fr = Math.floor((seconds % 1) * 25);
    tcOverlay.textContent = [h, m, s].map(function(v) {
      return String(v).padStart(2, '0');
    }).join(':') + ':' + String(fr).padStart(2, '0');
  }

  if (vid) {
    // Si durée déjà connue (cache)
    if (vid.duration && !isNaN(vid.duration)) {
      buildRuler(vid.duration);
    } else {
      buildRuler(60); // placeholder
      vid.addEventListener('loadedmetadata', function() {
        buildRuler(vid.duration);
      });
    }

    vid.addEventListener('timeupdate', function() {
      if (!vid.duration) return;
      var pct = (vid.currentTime / vid.duration) * 100;
      if (playhead) playhead.style.left = pct + '%';
      updateTimecode(vid.currentTime);
    });

  } else {
    buildRuler(60); // pas de vidéo → ruler générique
  }

  // ── Scrubbing ──────────────────────────────────
  if (!clipsCol) return;
  var isScrubbing = false;

  function getPct(e) {
    var rect    = clipsCol.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }

  function scrubTo(e) {
    if (!vid || !vid.duration) return;
    var pct = getPct(e);
    var t   = pct * vid.duration;
    vid.currentTime = t;
    if (playhead) playhead.style.left = (pct * 100) + '%';
    updateTimecode(t);
  }

  clipsCol.style.cursor = 'col-resize';

  clipsCol.addEventListener('mousedown', function(e) {
    isScrubbing = true;
    var wasPlaying = vid && !vid.paused;
    if (vid && wasPlaying) vid.pause();
    scrubTo(e);

    function onMove(e) { if (isScrubbing) scrubTo(e); }
    function onUp() {
      isScrubbing = false;
      if (vid && wasPlaying) vid.play();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  });

  clipsCol.addEventListener('touchstart', function(e) {
    isScrubbing = true; scrubTo(e);
  }, { passive: true });
  clipsCol.addEventListener('touchmove', function(e) {
    if (isScrubbing) scrubTo(e);
  }, { passive: true });
  clipsCol.addEventListener('touchend', function() {
    isScrubbing = false;
  });
}



function randomClips(minCount, maxCount, seed) {
  var count = minCount + (seed % (maxCount - minCount + 1));
  var clips = []; var pos = 1;
  for (var i = 0; i < count; i++) {
    var w = 6 + ((seed * (i + 3)) % 18);
    var g = 1 + ((seed * (i + 1)) % 4);
    if (pos + w > 99) break;
    clips.push({ left: pos, width: w });
    pos += w + g;
  }
  return clips;
}


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

  // ── Preview vidéo ou image ──
  var preview = document.querySelector('.pd-preview');
  var playBtn = preview ? preview.querySelector('.play-btn') : null;
  var vid = null; // ← déclaré ici

  if (preview) {
    if (p.video) {
      vid = document.createElement('video'); // ← assigné ici
      vid.src         = p.video;
      vid.preload     = 'metadata';
      vid.controls    = false;
      vid.loop        = false;
      vid.muted       = false;
      vid.playsInline = true;
      vid.volume      = 0.4;
      vid.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
      preview.appendChild(vid);

      var SVG_MUTE   = '<path d="M1 4.5H3.5L7 1.5V12.5L3.5 9.5H1V4.5Z" fill="white"/><line x1="10" y1="4" x2="13" y2="10" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="13" y1="4" x2="10" y2="10" stroke="white" stroke-width="1.5" stroke-linecap="round"/>';
      var SVG_UNMUTE = '<path d="M1 4.5H3.5L7 1.5V12.5L3.5 9.5H1V4.5Z" fill="white"/><path d="M9.5 4.5C10.5 5.3 11 6.1 11 7C11 7.9 10.5 8.7 9.5 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M11.5 2.5C13.2 3.8 14 5.3 14 7C14 8.7 13.2 10.2 11.5 11.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>';

      var muteBtn = document.createElement('button');
      muteBtn.style.cssText = [
        'position:absolute;bottom:14px;right:14px;z-index:10;',
        'width:40px;height:40px;border-radius:50%;border:none;',
        'background:rgba(15,15,14,.72);backdrop-filter:blur(8px);',
        '-webkit-backdrop-filter:blur(8px);',
        'display:none;align-items:center;justify-content:center;',
        'opacity:0;transition:opacity .25s,transform .25s cubic-bezier(0.34,1.56,0.64,1);',
        'box-shadow:0 4px 16px rgba(15,15,14,.22);'
      ].join('');
      muteBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">' + SVG_UNMUTE + '</svg>';
      muteBtn.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.12)'; });
      muteBtn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
      preview.appendChild(muteBtn);

      muteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        vid.muted = !vid.muted;
        muteBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">'
          + (vid.muted ? SVG_MUTE : SVG_UNMUTE) + '</svg>';
      });

      preview.addEventListener('click', function(e) {
        if (muteBtn.contains(e.target)) return;
        if (vid.paused) { vid.play(); } else { vid.pause(); }
      });

      vid.addEventListener('play', function() {
        if (playBtn) {
          playBtn.style.opacity       = '0';
          playBtn.style.transform     = 'translate(-50%, -50%) scale(.8)';
          playBtn.style.pointerEvents = 'none';
        }
        muteBtn.style.display = 'flex';
        requestAnimationFrame(function() { muteBtn.style.opacity = '1'; });
      });

      vid.addEventListener('pause', function() {
        if (playBtn) {
          playBtn.style.opacity       = '1';
          playBtn.style.transform     = 'translate(-50%, -50%) scale(1)';
          playBtn.style.pointerEvents = 'all';
        }
        muteBtn.style.opacity = '0';
        setTimeout(function() { muteBtn.style.display = 'none'; }, 250);
      });

      vid.addEventListener('ended', function() {
        vid.currentTime = 0;
        vid.dispatchEvent(new Event('pause'));
      });

      if (playBtn) {
        playBtn.style.display = 'flex';
        playBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          vid.play();
        });
      }

    } else {
      if (playBtn) playBtn.style.display = 'none';
      if (p.image) {
        preview.style.backgroundImage    = 'url(' + p.image + ')';
        preview.style.backgroundSize     = 'cover';
        preview.style.backgroundPosition = 'center';
      }
    }
  }

  // ← renderTimeline ici, vid est maintenant défini
  renderTimeline(p, vid);

  // ── Tags ──
  if ($('pd-tags'))
    $('pd-tags').innerHTML = p.tags.map(function(t) {
      return '<span class="modal-tag">' + t + '</span>';
    }).join('');

  // ── Stats ──
  if ($('pd-stats'))
    $('pd-stats').innerHTML = p.stats.map(function(s) {
      return '<div class="pd-stat-card">' +
        '<div class="modal-stat-lbl">' + s.lbl + '</div>' +
        '<div class="modal-stat-val">' + s.val + '</div>' +
        '</div>';
    }).join('');

  // ── Outils ──
  if ($('pd-tools'))
    $('pd-tools').innerHTML = p.tools.map(function(t) {
      return '<span class="modal-tool">' + t + '</span>';
    }).join('');

  // ── Impact ──
  if ($('pd-impact') && p.impact) {
    $('pd-impact').innerHTML = p.impact.map(function(item) {
      return '<div class="pd-impact-card">' +
        '<span class="pd-impact-icon">' + item.icon + '</span>' +
        '<div class="pd-impact-val" data-target="' + item.value + '" data-suffix="' + item.suffix + '">0' + item.suffix + '</div>' +
        '<div class="pd-impact-lbl">' + item.label + '</div>' +
        '</div>';
    }).join('');
    setTimeout(animateImpact, 300);
  }

  // ── Navigation projets ──
  if ($('pd-nav-projects')) {
    var nav = '<div class="pd-nav-inner">';
    if (p.prev) {
      var pp = window._PROJECTS[p.prev];
      nav += '<a href="/project/' + p.prev + '" class="pd-nav-card pd-nav-prev" data-route="project:' + p.prev + '">' +
        '<span class="pd-nav-dir">← Précédent</span>' +
        '<span class="pd-nav-name">' + pp.title + '</span></a>';
    } else { nav += '<div></div>'; }
    if (p.next) {
      var pn = window._PROJECTS[p.next];
      nav += '<a href="/project/' + p.next + '" class="pd-nav-card pd-nav-next" data-route="project:' + p.next + '">' +
        '<span class="pd-nav-dir">Suivant →</span>' +
        '<span class="pd-nav-name">' + pn.title + '</span></a>';
    }
    nav += '</div>';
    $('pd-nav-projects').innerHTML = nav;
  }
};



window.initImages = function() {
  var base = (window.ASSET_BASE || '').replace(/\/+$/, '');
  var imgs = document.querySelectorAll('img[data-src]');

  console.log('[initImages] base =', base, '| images =', imgs.length);

  imgs.forEach(function(img, i) {
    var path = img.getAttribute('data-src').replace(/^\//, '');
    img.src  = base + '/' + path;

    console.log('[img ' + i + '] →', img.src);

    function markLoaded() {
      console.log('[img ' + i + '] ✅');
      img.classList.add('loaded');
      var thumb = img.closest('.pc-thumb');
      if (thumb) thumb.classList.add('img-loaded');
    }

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load',  markLoaded);
      img.addEventListener('error', function() {
        console.error('[img ' + i + '] ❌ →', img.src);
      });
    }
  });
};


window.initCutEffect = function() {
  document.querySelectorAll('.proj-card').forEach(function(card) {
    // Évite les doublons sans cloner
    if (card._cutReady) return;
    card._cutReady = true;

    var cut = card.querySelector('.proj-cut');
    if (!cut) return;

    card.addEventListener('mouseenter', function() {
      cut.classList.remove('cut-playing');
      void cut.offsetWidth;
      cut.classList.add('cut-playing');
    });
    card.addEventListener('mouseleave', function() {
      cut.classList.remove('cut-playing');
    });
  });
};


