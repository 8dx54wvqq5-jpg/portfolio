// Shared analytics: high-intent clicks + referral attribution.
// Loaded on every page so any utm-tagged link reports back, not just Home/DWS/360.
// Page-specific events (audio played, scrolled to end, image zoomed) stay inline
// in their own pages. Requires the Vercel `window.va` shim (set in <head>).

// high-intent click tracking (once per visit per type)
(function () {
  var fired = {};
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    var name = null;
    if (href.indexOf('mailto:') === 0) name = 'Contact · email clicked';
    else if (href.indexOf('linkedin.com') !== -1) name = 'Contact · LinkedIn clicked';
    else if (href.indexOf('resume') !== -1 || href.indexOf('.pdf') !== -1) name = 'Resume · opened';
    if (name && !fired[name]) { fired[name] = 1; window.va && window.va('event', { name: name }); }
  }, true);
  // named CTAs that aren't plain links (or need a specific name): data-track="Page · what"
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-track]') : null;
    var name = el && el.getAttribute('data-track');
    if (name && !fired[name]) { fired[name] = 1; window.va && window.va('event', { name: name }); }
  }, true);
})();

// deepest case-study section reached, as a Clarity tag for filtering recordings
// ("reached Impact"). Queries sections on each check because x-dc re-renders
// rebuild the DOM, so held references go stale.
(function () {
  var best = -1, queued = false;
  function check() {
    queued = false;
    var secs = document.querySelectorAll('section[data-screen-label]');
    for (var i = secs.length - 1; i > best; i--) {
      if (secs[i].getBoundingClientRect().top < window.innerHeight * 0.6) {
        best = i;
        window.clarity && window.clarity('set', 'deepest_section', secs[i].getAttribute('data-screen-label'));
        break;
      }
    }
  }
  window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(check); } }, { passive: true });
})();

// tracked CTAs: press feedback (matches [data-nav]:active), hover-only arrow
// nudge (matches the Work cards' arrow), and smooth in-page jumps that land
// below the fixed toolbar. Reduced motion: tiny press, no nudge, instant jump.
(function () {
  if (!document.getElementById('cta-css')) {
    var s = document.createElement('style');
    s.id = 'cta-css';
    s.textContent = [
      'section[data-frame]{scroll-margin-top:64px}',
      '[data-track]{transition:transform .14s ease}',
      '[data-track]:active{transform:scale(0.97)}',
      '[data-track] .cta-arr{display:inline-block;transition:transform .3s cubic-bezier(0.16,1,0.3,1)}',
      '@media (hover:hover) and (pointer:fine){[data-track]:hover .cta-arr{transform:translateX(4px)}[data-track]:hover .cta-arr.down{transform:translateY(3px)}}',
      // primary prototype buttons mirror the Connect button (assets/connect.js);
      // !important because the buttons carry inline backgrounds
      '[data-track].cta-btn{cursor:pointer;transition:transform .15s cubic-bezier(0.34,1.56,0.64,1),background-color .15s ease}',
      '[data-track].cta-btn:hover{background:#2B70FF!important;transform:translateY(-1px) scale(1.02)}',
      '[data-track].cta-btn:active{transform:scale(0.97)}',
      '@media (prefers-reduced-motion:reduce){[data-track].cta-btn{transition:background-color .15s ease}[data-track].cta-btn:hover,[data-track].cta-btn:active{transform:none}}',
      '@media (prefers-reduced-motion:reduce){[data-track]{transition-duration:.05s}[data-track]:active{transform:scale(0.99)}[data-track]:hover .cta-arr,[data-track]:hover .cta-arr.down{transform:none}}'
    ].join('');
    document.head.appendChild(s);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-track][href^="#"]') : null;
    var target = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + target.id);
  });
})();

// deep links to a case-study section (/dispute-workspace#s7) land on it after render
(function () {
  function land() {
    if (window._pfHashDone || !location.hash) return;
    var t = document.getElementById(location.hash.slice(1));
    if (!t) return;
    window._pfHashDone = true;
    setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 300);
  }
  if (document.readyState === 'complete') land(); else window.addEventListener('load', land);
})();

// generic engagement: scroll-to-end + time-on-page for every page that
// doesn't already have its own bespoke tracking (DWS/360/AI-Intake keep theirs)
(function () {
  var page = (document.title.split('·')[0] || document.title).trim();
  var start = Date.now();
  var scrolledEnd = false;

  function onScroll() {
    if (scrolledEnd) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max >= 0.9) {
      scrolledEnd = true;
      window.va && window.va('event', { name: page + ' · scrolled to end' });
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var timeReported = false;
  function reportTime() {
    if (timeReported) return;
    timeReported = true;
    var seconds = Math.round((Date.now() - start) / 1000);
    var bucket = seconds < 10 ? '<10s' : seconds < 30 ? '10-30s' : seconds < 60 ? '30-60s' : seconds < 180 ? '1-3m' : '3m+';
    window.va && window.va('event', { name: page + ' · time on page · ' + bucket, data: { seconds: seconds } });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') reportTime();
  });
  window.addEventListener('pagehide', reportTime);
})();

// referral attribution: ?utm_source=company -> custom event (free on Pro plan)
(function () {
  try {
    var p = new URLSearchParams(location.search);
    var c = (p.get('utm_source') || p.get('c') || '').trim();
    if (!c) return;
    // ponytail: call clarity directly, not via boot.js's va wrapper — that wrapper
    // installs on window load and this fires at defer time, so the mirror misses it.
    var fire = function () {
      window.clarity && window.clarity('event', 'Referral · ' + c);
      window.va && window.va('event', { name: 'Referral · ' + c, data: { page: location.pathname } });
    };
    if (window.va) fire(); else { var n = 0, t = setInterval(function () { if (window.va || ++n > 20) { clearInterval(t); if (window.va) fire(); } }, 300); }
  } catch (e) {}
})();
