// Loaded render-blocking (no defer) in every page <head>: cross-document
// View Transitions only work if the opt-in rule and the pagereveal listener
// exist before the new page's first paint. Deferred scripts run too late.
// Cross-document View Transitions: cross-fade between same-origin pages, and
// keep the left-nav panel + chat pill pinned (named elements morph in place
// instead of redrawing — Figma "layers panel stays, content swaps" feel).
// Native, no dep. No-ops in browsers without support (normal nav). a11y: off
// under prefers-reduced-motion.
(function () {
  if (document.getElementById('vt-css')) return;
  var s = document.createElement('style');
  s.id = 'vt-css';
  s.textContent = [
    '@view-transition{navigation:auto}',
    '[data-leftnav]{view-transition-name:ln-panel}',
    '#ab-chat-trigger{view-transition-name:chat-pill}',
    '@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}',
    // Study card morph (see pageswap/pagereveal below): the clicked card grows
    // into the study's first frame (#s0), Figma-style "frame opens". #s0 is
    // used rather than the hero image, which sits below the fold. Its reveal
    // fade is held at full opacity while it morphs. UA defaults already scale
    // both snapshots to width, top-aligned; the pair is clipped to the box.
    'html.vt-hero-in #s0{view-transition-name:study-hero}',
    'html.vt-hero-in #s0 [data-reveal]{opacity:1!important;transform:none!important}',
    '::view-transition-group(study-hero){animation-duration:.45s;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}',
    '::view-transition-image-pair(study-hero){overflow:clip;border-radius:14px}',
    // Mobile top-bar declutter: the dark toolbar crams desktop-canvas chrome
    // that overflows ~400px screens and clips Connect/nav off the right edge.
    // Hide the decorative bits; keep logo (Home), breadcrumb, Connect, 2 avatars.
    '@media (max-width:880px){',
    '[data-toolmsg]{display:none!important}',                          // Move/Hand/T/Comment tools
    '.presence-av:nth-child(n+3){display:none!important}',             // keep first 2 avatars (you + Abhikant)
    '[data-connect]+div{display:none!important}',                      // zoom % indicator (both pages)
    '#toolbar-center{display:none!important}',                         // homepage "Drafts / … Portfolio" title
    '#toolbar-center+div>div:nth-child(2){display:none!important}',    // homepage "N here now"
    '}',
    // Touch devices fire :hover on tap → hover tooltips stick and leak off the
    // edge ("Reset view" under the logo). Useless on touch; suppress them.
    '@media (hover:none){[data-tip]::after,.presence-av::after{display:none!important}}'
  ].join('');
  document.head.appendChild(s);

  // Old page: name the on-screen card (a link wrapping a -hero screenshot)
  // being followed. Covers homepage frames + mobile cards, Work cards, and
  // next-study cards.
  window.addEventListener('pageswap', function (e) {
    if (!e.viewTransition || !e.activation || !e.activation.entry) return;
    var dest = new URL(e.activation.entry.url).pathname;
    var imgs = document.querySelectorAll('a[href] img[src*="-hero."]');
    for (var i = 0; i < imgs.length; i++) {
      var a = imgs[i].closest('a[href]'), r = imgs[i].getBoundingClientRect();
      if (a.pathname === dest && r.width && r.bottom > 0 && r.top < innerHeight) {
        a.style.viewTransitionName = 'study-hero';
        return;
      }
    }
  });
  // New page: name #s0 for the length of the transition only. The class stays
  // ~1s longer so the reveal's own 0.8s fade has finished underneath it
  // (dropping it early would dip the frame's opacity).
  window.addEventListener('pagereveal', function (e) {
    if (!e.viewTransition) return;
    var root = document.documentElement;
    root.classList.add('vt-hero-in');
    e.viewTransition.finished.finally(function () { setTimeout(function () { root.classList.remove('vt-hero-in'); }, 1000); });
  });
})();
