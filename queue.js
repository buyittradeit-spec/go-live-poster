/* Scheduled posts panel (owner only) for the poster-variant bot.
   Hidden for everyone else. Turn it on once per browser by opening the page with #queue at the end
   of the address (#queue-off turns it off again). It reads the bot's feed from buyitprintables.com:
   drafts get an Approve button (opens a pre-filled GitHub issue - press Submit), ready posts get
   Copy + Open. "Ask for posts" opens the bot's request form with the link box filled in. */
(function () {
  var FEED = 'https://buyitprintables.com/social/feed.json';
  var REPO = 'https://github.com/buyittradeit-spec/buyitprintables';
  var KEY = 'glp-queue-owner';
  try {
    if (location.hash === '#queue') localStorage.setItem(KEY, '1');
    if (location.hash === '#queue-off') localStorage.removeItem(KEY);
    if (localStorage.getItem(KEY) !== '1') return;
  } catch (e) { if (location.hash !== '#queue') return; }

  var css = document.createElement('style');
  css.textContent =
    '.vq{max-width:1180px;margin:20px auto 0;background:var(--panel,#1b1916);border:1px solid var(--line,#3a342b);border-radius:6px;padding:16px;display:grid;gap:12px}' +
    '.vq h2{font-family:var(--f-display,system-ui);text-transform:uppercase;margin:0;font-size:20px}.vq h2 span{color:var(--amber,#f2a33a)}' +
    '.vq-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}' +
    '.vq-item{border:1px solid var(--line,#3a342b);border-radius:4px;padding:10px;display:grid;gap:8px;background:var(--panel-2,#23201c)}' +
    '.vq-meta{font-family:var(--f-mono,monospace);font-size:12px;color:var(--muted,#a39888);display:flex;gap:10px;flex-wrap:wrap}' +
    '.vq-st{font-weight:600;text-transform:uppercase}.vq-st.draft{color:var(--warn,#f2a33a)}.vq-st.ready{color:var(--ok,#4cc38a)}' +
    '.vq pre{white-space:pre-wrap;margin:0;font:13px/1.45 var(--f-body,system-ui)}.vq-act{display:flex;gap:8px;flex-wrap:wrap}';
  document.head.appendChild(css);

  var box = document.createElement('section');
  box.className = 'vq';
  box.setAttribute('aria-labelledby', 'vqTitle');
  box.innerHTML = '<div class="vq-top"><h2 id="vqTitle">Scheduled <span>posts</span></h2>' +
    '<div class="vq-act"><button type="button" class="btn" id="vqAsk">Ask for posts for this link</button>' +
    '<a class="btn" target="_blank" rel="noopener" href="' + REPO + '/issues?q=is%3Aopen+label%3Aposter-queue">Poster queue issue</a>' +
    '<button type="button" class="btn" id="vqReload">Refresh</button></div></div>' +
    '<p class="note" id="vqNote">Loading…</p><div id="vqList" style="display:grid;gap:10px"></div>';
  var anchor = document.getElementById('buyitstreams');
  (anchor && anchor.parentNode ? anchor.parentNode : document.body).insertBefore(box, anchor || null);

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function when(iso) {
    try { return new Date(iso).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); }
    catch (e) { return iso; }
  }
  function copy(t, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = o; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () { prompt('Copy this:', t); });
    else prompt('Copy this:', t);
  }

  function render(feed) {
    var list = document.getElementById('vqList'), noteEl = document.getElementById('vqNote');
    var items = (feed.items || []);
    noteEl.textContent = (feed.tester_mode ? 'Tester mode: one test post a day for the YouTube community tester. ' : '') +
      (items.length ? '' : 'Nothing waiting right now.') + ' Updated ' + when(feed.updated) + '.';
    list.innerHTML = items.map(function (i, n) {
      var acts = '';
      if (i.status === 'draft') acts += '<a class="btn primary" target="_blank" rel="noopener" href="' + esc(feed.approve_url + encodeURIComponent(i.id)) + '">Approve</a>';
      acts += '<button type="button" class="btn" data-copy="' + n + '">Copy text</button>';
      if (i.open_url) acts += '<a class="btn' + (i.status === 'ready' ? ' primary' : '') + '" target="_blank" rel="noopener" href="' + esc(i.open_url) + '">Open ' + esc(i.platform_name || i.platform) + '</a>';
      return '<div class="vq-item"><div class="vq-meta"><span class="vq-st ' + esc(i.status) + '">' + esc(i.status) + '</span>' +
        '<span>' + esc(i.platform_name || i.platform) + '</span><span>' + esc(when(i.scheduled_for)) + '</span><span>' + esc(i.id) + '</span></div>' +
        '<pre>' + esc(i.text) + '</pre>' + (i.image_url ? '<span class="note">Picture: ' + esc(i.image_url) + '</span>' : '') +
        '<div class="vq-act">' + acts + '</div></div>';
    }).join('');
    Array.prototype.forEach.call(list.querySelectorAll('[data-copy]'), function (b) {
      b.addEventListener('click', function () { copy(items[+b.getAttribute('data-copy')].text, b); });
    });
  }

  function load() {
    document.getElementById('vqNote').textContent = 'Loading…';
    fetch(FEED + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () { document.getElementById('vqNote').textContent = "Couldn't load the queue from buyitprintables.com yet."; });
  }

  document.getElementById('vqReload').addEventListener('click', load);
  document.getElementById('vqAsk').addEventListener('click', function () {
    var u = document.getElementById('url');
    var link = u && u.value.trim();
    var q = '?template=poster-variants.yml&labels=poster-variants&title=' + encodeURIComponent('Poster variants' + (link ? ': ' + link : ''));
    if (link) q += '&product_url=' + encodeURIComponent(link);
    window.open(REPO + '/issues/new' + q, '_blank', 'noopener');
  });
  load();
})();
