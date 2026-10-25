// Go-Live Poster — shared settings and footer.
// Edit the three links below; every page picks them up.
window.GLP = {
  maker: 'BuyItTradeIt',
  site: 'https://buyittradeit.com',
  tipJar: 'https://ko-fi.com/J4V128ZBWE',
  streamlabsAff: 'https://streamlabs.pxf.io/enGjyX',
  promo: { url: 'https://buyitprintables.com/', name: 'BuyIt Printables', text: 'AI sticker, card, wall art and coloring page makers, plus printables for creators and their fans.' }
};

(function () {
  function tagged(u, medium) {
    try { var x = new URL(u); x.searchParams.set('utm_source', 'go-live-poster'); x.searchParams.set('utm_medium', medium); return x.toString(); }
    catch (e) { return u; }
  }
  window.GLP.tagged = tagged;

  function footer() {
    var f = document.getElementById('credit');
    if (!f) return;
    var G = window.GLP, bits = [];
    bits.push('Free tool made by <a href="' + tagged(G.site, 'credit') + '" target="_blank" rel="noopener">' + G.maker + '</a>. No sign-up, no fees, nothing leaves your browser.');
    var btns = [];
    if (G.tipJar) btns.push('<a class="tipbtn" href="' + G.tipJar + '" target="_blank" rel="noopener">☕ Tip jar</a>');
    if (G.streamlabsAff) btns.push('<a class="tipbtn alt" href="' + G.streamlabsAff + '" target="_blank" rel="noopener sponsored">Get Streamlabs</a>');
    if (btns.length) bits.push('<span class="footbtns">' + btns.join('') + '</span><span class="footnote">Tips keep these tools free. Streaming? Streamlabs runs the tip jar and alerts this overlay hooks into.</span>');
    if (G.streamlabsAff) bits.push('Some links are affiliate links. I may earn a commission at no cost to you.');
    var html = bits.map(function (b) { return '<p>' + b + '</p>'; }).join('');
    if (G.promo && G.promo.url) html += '<a class="promo" href="' + tagged(G.promo.url, 'footer-ad') + '" target="_blank" rel="noopener"><span class="promo-tag">Also from ' + G.maker + '</span><b>' + G.promo.name + ' →</b><span>' + G.promo.text + '</span></a>';
    f.innerHTML = html;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', footer); else footer();

  // Keep the Poster / Recap / Overlay tabs in the same folder as the current page.
  // Netlify's pretty URLs rewrite them to /recap and /overlay, which breaks them
  // when the poster is served from buyittradeit.com/poster/.
  function fixTabs() {
    var base = location.href.replace(/[?#].*$/, '').replace(/[^\/]*$/, '');
    var links = document.querySelectorAll('nav.top a');
    for (var i = 0; i < links.length; i++) {
      var m = (links[i].getAttribute('href') || '').match(/^(?:\.\/|\/)?(recap|overlay)(?:\.html)?$/);
      if (m) links[i].href = base + m[1];
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixTabs); else fixTabs();
})();
