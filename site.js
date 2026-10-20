// Go-Live Poster — shared settings and footer.
// Edit the three links below; every page picks them up.
window.GLP = {
  maker: 'BuyItTradeIt',
  site: 'https://buyittradeit.com',
  tipJar: 'https://ko-fi.com/J4V128ZBWE',
  streamlabsAff: 'https://streamlabs.pxf.io/enGjyX'
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
    f.innerHTML = bits.map(function (b) { return '<p>' + b + '</p>'; }).join('');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', footer); else footer();
})();
