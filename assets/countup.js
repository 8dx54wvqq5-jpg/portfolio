// Count-up for headline stats: <span data-countup="33">33</span>.
// The markup holds the final value, so no-JS and reduced motion show it as is.
// Counts once per value per page load, when the number is mostly on screen.
// x-dc re-renders rebuild the DOM, so new nodes are picked up by a
// MutationObserver; a value that already counted is left at its final text.
(function () {
  if (window.__countupInit) return;
  window.__countupInit = true;
  if (!window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var DURATION = 900;
  var counted = {};    // data-countup values that already started
  var seen = new WeakSet();

  function run(el) {
    var to = parseFloat(el.getAttribute('data-countup'));
    var t0 = performance.now();
    var key = el.getAttribute('data-countup');
    function frame(now) {
      // x-dc can rebuild the row mid-count; keep writing to the live node
      if (!el.isConnected) el = document.querySelector('[data-countup="' + key + '"]') || el;
      var p = Math.min(1, (now - t0) / DURATION);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var key = e.target.getAttribute('data-countup');
      if (counted[key]) { e.target.textContent = key; return; }
      counted[key] = true;
      run(e.target);
    });
  }, { threshold: 0.6 });

  function scan() {
    document.querySelectorAll('[data-countup]').forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      if (counted[el.getAttribute('data-countup')]) return;
      el.style.fontVariantNumeric = 'tabular-nums';
      el.textContent = '0';
      io.observe(el);
    });
  }

  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();
