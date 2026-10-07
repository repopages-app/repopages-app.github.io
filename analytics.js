// Google Analytics 4, loaded only after the visitor accepts. The choice is kept in localStorage
// ("ga-consent": "yes" | "no"); the footer's "Cookie settings" link shows the bar again.
(function () {
  var ID = 'G-N6J84FWH8J'; // GA4 measurement ID
  var KEY = 'ga-consent';
  function load() {
    if (window.__gaLoaded || ID.indexOf('XXXX') !== -1) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ID);
  }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function hide() { var b = document.getElementById('consent'); if (b) b.hidden = true; }
  function show() {
    var b = document.getElementById('consent'); if (!b) return;
    b.hidden = false;
    b.querySelector('[data-accept]').onclick = function () { write('yes'); hide(); load(); };
    b.querySelector('[data-decline]').onclick = function () { write('no'); hide(); };
  }
  window.showConsent = show;
  // Consent is asked only where the law requires it: the EU/EEA, the UK and Switzerland, detected from the
  // browser's time zone (no request to anyone). An unknown time zone counts as Europe. Elsewhere the
  // counter runs from the first page view; "Cookie settings" in the footer can still switch it off.
  function needsConsent() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (!tz) return true;
    return /^(Europe\/|Atlantic\/(Canary|Madeira|Azores|Faroe|Reykjavik|Jan_Mayen)|Arctic\/)/.test(tz);
  }
  var c = read();
  if (c === 'yes') load();
  else if (c === 'no') {}
  else if (needsConsent()) show();
  else load();
})();
