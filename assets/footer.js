(function () {
  if (!window.STUDIES) return;

  var caseLabels = {};
  window.STUDIES.forEach(function (study) {
    caseLabels[study.file] = study.footerLabel;
    caseLabels[study.route.slice(1)] = study.footerLabel;
  });

  var file = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
  var standardStyle = "display: flex; justify-content: space-between; margin-top: 24px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #9AA0AC;";

  function row(style, label) {
    return '<div style="' + style + '"><span>© 2026 Abhikant Nirbhavane</span><span>' + label + '</span></div>';
  }

  // Next-study card. The mount's data-next (route) and data-next-title keep a
  // hand-picked order and headline; otherwise it is the following study in
  // STUDIES that has a hero image, wrapping. The card morphs into the next
  // study's first frame (pageswap in assets/vt.js).
  function card(s, title) {
    return '<a class="ns-card" href="' + s.route + '" data-track="Next study · ' + s.short + '">' +
      '<span class="ns-text"><span class="ns-eyebrow">Next case study</span><span class="ns-title">' + (title || s.label) + '</span><span class="ns-arr">Read it →</span></span>' +
      '<span class="ns-img"><img src="' + s.hero + '" alt="" loading="lazy"></span></a>';
  }
  function nextCard(mount) {
    var list = window.STUDIES, cur = -1, pick = mount.getAttribute('data-next');
    for (var i = 0; i < list.length; i++) {
      if (pick && list[i].route === pick && list[i].hero) return card(list[i], mount.getAttribute('data-next-title'));
      if (list[i].files.indexOf(file) !== -1) cur = i;
    }
    if (cur === -1) return '';
    for (var n = 1; n < list.length; n++) {
      var s = list[(cur + n) % list.length];
      if (s.hero) return card(s);
    }
    return '';
  }

  if (!document.getElementById('ns-css')) {
    var ease = 'cubic-bezier(0.23,1,0.32,1)';
    var css = document.createElement('style');
    css.id = 'ns-css';
    css.textContent = [
      '.ns-card{display:grid;grid-template-columns:1fr 1.2fr;align-items:center;gap:24px;margin-top:40px;padding:20px 20px 20px 28px;background:#fff;border:1px solid #E2E4E9;border-radius:14px;box-shadow:0 2px 6px rgba(16,24,40,.06);text-decoration:none;color:#101828;transition:transform 160ms ' + ease + ',box-shadow 200ms ease}',
      '.ns-card:active{transform:scale(.98)}',
      '.ns-text{display:block}',
      ".ns-eyebrow{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#6A7282}",
      '.ns-title{display:block;margin-top:8px;font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.2}',
      '.ns-arr{display:inline-block;margin-top:14px;font-size:14px;font-weight:600;color:#155DFC;transition:transform 200ms ' + ease + '}',
      '.ns-img{display:block;height:170px;border:1px solid #ECEDF1;border-radius:10px;overflow:hidden}',
      '.ns-img img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;transition:transform 400ms ' + ease + '}',
      '@media (hover:hover) and (pointer:fine){.ns-card:hover{box-shadow:0 10px 28px -10px rgba(16,24,40,.22)}.ns-card:hover .ns-img img{transform:scale(1.025)}.ns-card:hover .ns-arr{transform:translateX(4px)}}',
      '@media (max-width:640px){.ns-card{grid-template-columns:1fr;gap:16px;padding:16px}.ns-img{order:-1;height:150px}}',
      '@media (prefers-reduced-motion:reduce){.ns-card,.ns-arr,.ns-img img{transition:none}.ns-card:active{transform:none}}'
    ].join('');
    document.head.appendChild(css);
  }

  function html(mode, mount) {
    if (mode === 'case') return nextCard(mount) + row(standardStyle, caseLabels[file] || 'case study');
    if (mode === 'work') return row(standardStyle.replace('24px', '8px'), window.STUDIES.length + ' case studies · more in the archive on request');
    if (mode === 'about') return row(standardStyle, 'about · designed as an open canvas');
    if (mode === 'home') {
      return '<div style="background: #EDEEF0; padding: 16px 22px; display: flex; justify-content: space-between; align-items: center; font-family: \'JetBrains Mono\', monospace; font-size: 10px; color: #6A7282;"><span>© 2026 Abhikant Nirbhavane</span><a href="index.html" onclick="document.getElementById(\'mobile-view\').style.display=\'none\';document.getElementById(\'viewport\').style.display=\'block\';" style="color: #155DFC; text-decoration: none; font-size: 10px;">desktop view →</a></div>';
    }
    return '';
  }

  function renderAll() {
    document.querySelectorAll('[data-footer]').forEach(function (mount) {
      if (mount.children.length === 0) mount.innerHTML = html(mount.getAttribute('data-footer'), mount);
    });
  }

  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { childList: true, subtree: true });
})();
