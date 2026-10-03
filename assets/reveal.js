// Word-by-word scroll reveal for section h2 headings.
// Overrides the existing data-reveal IntersectionObserver for h2 elements only.
// Plain IntersectionObserver + CSS (was GSAP + ScrollTrigger, ~70KB). Same look:
// each word fades up 18px over 0.55s ease-out, 70ms apart, once the heading's
// top crosses 88% of the viewport. Headings already above that line reveal at
// once instead of staying hidden.
(function () {
  function init() {
    if (!window.IntersectionObserver) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var css = document.createElement('style');
    css.textContent =
      '.rw{display:inline-block;opacity:0;transform:translateY(18px);' +
      'transition:opacity .55s cubic-bezier(0.215,0.61,0.355,1),transform .55s cubic-bezier(0.215,0.61,0.355,1)}' +
      '.rw-in .rw{opacity:1;transform:none}';
    document.head.appendChild(css);

    // Root extends far above the viewport, so a heading that jumps past it
    // (scroll restore on reload, fast scroll) still counts as seen.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('rw-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '100000px 0px -12% 0px' });

    document.querySelectorAll('h2[data-reveal]').forEach(function (h2) {
      // Prevent existing IntersectionObserver system from also animating this h2
      h2.removeAttribute('data-reveal');
      // Clear any inline styles the IO system already applied
      h2.style.opacity = '';
      h2.style.transform = '';
      h2.style.transition = '';
      h2.style.transitionDelay = '';

      // Split text into word spans, preserving whitespace between them
      var n = 0;
      var tokens = h2.textContent.trim().split(/(\s+)/);
      h2.innerHTML = tokens.map(function (token) {
        if (/^\s+$/.test(token)) return token;
        return '<span class="rw" style="transition-delay:' + (n++ * 70) + 'ms">' + token + '</span>';
      }).join('');

      io.observe(h2);
    });
  }

  // Small delay so x-dc connectedCallback finishes setting up data-reveal IO first,
  // then we take over h2 elements before the user has scrolled.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 60); });
  } else {
    setTimeout(init, 60);
  }
})();
