// Sherpa Capital Group — Full Design Injection Loader
// Hosted on GitHub, loaded via <script> tag in Weebly SEO Header Code

(function() {
  // 1. Inject Google Fonts
  var h = document.head || document.getElementsByTagName("head")[0];

  var p1 = document.createElement("link");
  p1.rel = "preconnect"; p1.href = "https://fonts.googleapis.com";
  h.appendChild(p1);

  var p2 = document.createElement("link");
  p2.rel = "preconnect"; p2.href = "https://fonts.gstatic.com"; p2.crossOrigin = "";
  h.appendChild(p2);

  var fl = document.createElement("link");
  fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
  h.appendChild(fl);

  // 2. Inject CSS
  var st = document.createElement("style");
  st.textContent = ":root{--forest:#2E7D32;--forest-deep:#1B5E20;--forest-light:#4CAF50;--slate-900:#0F172A;--slate-800:#1E293B;--slate-700:#334155;--slate-400:#94A3B8;--slate-300:#CBD5E1;--slate-200:#E2E8F0;--slate-100:#F1F5F9;--cream:#FAFAF8;--white:#FFFFFF;--font-display:'Cormorant Garamond',Georgia,serif;--font-body:'DM Sans',-apple-system,sans-serif;--ease:cubic-bezier(0.16,1,0.3,1)}\n*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}\nhtml{scroll-behavior:smooth;font-size:16px}\nbody{font-family:var(--font-body);color:var(--slate-800);background:var(--cream);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}\n\n/* NAV */\n.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 clamp(1.5rem,4vw,4rem);height:80px;display:flex;align-items:center;justify-content:space-between;background:rgba(15,23,42,0.0);backdrop-filter:blur(0px);transition:all 0.5s var(--ease);border-bottom:1px solid rgba(255,255,255,0.0)}\n.nav.scrolled{background:rgba(15,23,42,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.08);height:70px}\n.nav-logo{display:flex;align-items:center;gap:0.75rem;text-decoration:none;color:var(--white)}\n.nav-links{display:flex;align-items:center;gap:2.2rem;list-style:none}\n.nav-links a{color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.78rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.3s;position:relative}\n.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--forest-light);transition:width 0.3s var(--ease)}\n.nav-links a:hover{color:var(--white)}\n.nav-links a:hover::after{width:100%}\n.nav-links a.active{color:var(--white)}\n.nav-links a.active::after{width:100%}\n.nav-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}\n.nav-toggle span{width:24px;height:2px;background:var(--white);transition:all 0.3s}\n\n/* PAGE HERO */\n.page-hero{position:relative;height:45vh;min-height:340px;display:flex;align-items:center;justify-content:center;overflow:hidden}\n.page-hero.tall{height:65vh;min-height:500px}\n.page-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 30%}\n.page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.5) 50%,rgba(15,23,42,0.85) 100%)}\n.page-hero-content{position:relative;z-index:2;text-align:center;padding:0 2rem;max-width:800px;animation:fadeUp 1.2s var(--ease) both}\n@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}\n.hero-logo-mark{margin-bottom:1.5rem}\n.hero-headline{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,3.8rem);font-weight:400;color:var(--white);line-height:1.15;margin-bottom:0.5rem;letter-spacing:-0.01em}\n.hero-headline em{font-style:italic;color:var(--forest-light)}\n.hero-sub{font-family:var(--font-body);font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--slate-400);margin-bottom:1.5rem}\n.hero-divider{width:60px;height:1px;background:var(--forest-light);margin:0 auto 1.5rem;animation:divGrow 1.5s var(--ease) 0.5s both}\n@keyframes divGrow{from{width:0;opacity:0}to{width:60px;opacity:1}}\n.hero-tagline{font-size:1rem;color:rgba(255,255,255,0.7);max-width:520px;margin:0 auto;line-height:1.7}\n\n/* SECTIONS */\n.section{padding:clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,6rem)}\n.section-label{font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--forest);font-weight:600;margin-bottom:1rem}\n.section-heading{font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--slate-900);line-height:1.2;margin-bottom:1.5rem}\n.section-heading em{font-style:italic}\n.container{max-width:1200px;margin:0 auto}\n.bg-white{background:var(--white)}\n.bg-cream{background:var(--cream)}\n.bg-dark{background:var(--slate-900);color:var(--white)}\n.bg-dark .section-label{color:var(--forest-light)}\n.bg-dark .section-heading{color:var(--white)}\n\n/* GRID UTILS */\n.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}\n.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}\n\n/* ABOUT STATS */\n.about-stats{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:2.5rem;padding-top:2.5rem;border-top:1px solid var(--slate-200)}\n.stat-number{font-family:var(--font-display);font-size:2.8rem;font-weight:400;color:var(--forest);line-height:1;margin-bottom:0.3rem}\n.stat-label{font-size:0.8rem;color:var(--slate-400);letter-spacing:0.05em;text-transform:uppercase}\n\n/* CONTENT TEXT */\n.content-text{color:var(--slate-700);font-size:1.05rem;line-height:1.8}\n.content-text p{margin-bottom:1.5rem}\n\n/* IMAGE WITH ACCENT */\n.img-frame{position:relative;overflow:hidden}\n.img-frame img{width:100%;height:100%;object-fit:cover;filter:saturate(0.8);transition:transform 0.8s var(--ease)}\n.img-frame:hover img{transform:scale(1.03)}\n.img-accent{position:absolute;top:-12px;left:-12px;width:80px;height:80px;border-top:2px solid var(--forest);border-left:2px solid var(--forest)}\n\n/* CARDS */\n.card{position:relative;padding:2.5rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);transition:all 0.5s var(--ease);overflow:hidden}\n.card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--forest);transition:height 0.5s var(--ease)}\n.card:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);transform:translateY(-4px)}\n.card:hover::before{height:100%}\n.card-title{font-family:var(--font-display);font-size:1.5rem;font-weight:500;margin-bottom:0.75rem;color:var(--white)}\n.card-desc{color:var(--slate-400);font-size:0.95rem;line-height:1.7}\n.card-list{list-style:none;padding:0;margin-top:1rem}\n.card-list li{padding:0.5rem 0;border-top:1px solid rgba(255,255,255,0.05);color:var(--slate-300);font-size:0.85rem;display:flex;align-items:center;gap:0.75rem}\n.card-list li::before{content:'';width:4px;height:4px;background:var(--forest-light);border-radius:50%;flex-shrink:0}\n\n/* PARAM GRID */\n.param-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--slate-200)}\n.param-item{padding:2.5rem;border-right:1px solid var(--slate-200);border-bottom:1px solid var(--slate-200);transition:background 0.3s}\n.param-item:hover{background:var(--slate-100)}\n.param-item:nth-child(3n){border-right:none}\n.param-label{font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--slate-400);margin-bottom:0.5rem}\n.param-value{font-family:var(--font-display);font-size:1.5rem;color:var(--slate-900);font-weight:500}\n\n/* FUNDED LOANS GRID */\n.funded-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}\n.funded-card{position:relative;overflow:hidden;aspect-ratio:4/3;background:var(--slate-200)}\n.funded-card img{width:100%;height:100%;object-fit:cover;filter:saturate(0.7) brightness(0.85);transition:all 0.6s var(--ease)}\n.funded-card:hover img{filter:saturate(0.9) brightness(0.7);transform:scale(1.05)}\n.funded-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(15,23,42,0.9) 0%,rgba(15,23,42,0.1) 50%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem}\n.funded-label{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--forest-light);margin-bottom:0.3rem}\n.funded-title{font-family:var(--font-display);font-size:1.15rem;color:var(--white);font-weight:500;line-height:1.3}\n\n/* CONTACT */\n.contact-grid{display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;margin-top:3rem}\n.contact-item{text-align:center}\n.contact-item-label{font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--slate-400);margin-bottom:0.5rem}\n.contact-item-value{font-family:var(--font-display);font-size:1.2rem;color:var(--white)}\n.contact-item-value a{color:var(--white);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.2);transition:border-color 0.3s}\n.contact-item-value a:hover{border-color:var(--forest-light)}\n\n/* BUTTONS */\n.btn-primary{display:inline-block;padding:1rem 3rem;background:var(--forest);color:var(--white);text-decoration:none;font-size:0.8rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;border:none;cursor:pointer;transition:all 0.3s var(--ease)}\n.btn-primary:hover{background:var(--forest-deep);transform:translateY(-2px);box-shadow:0 8px 30px rgba(46,125,50,0.3)}\n\n/* FOOTER */\n.footer{background:var(--slate-900);border-top:1px solid rgba(255,255,255,0.06);padding:2.5rem clamp(1.5rem,5vw,6rem)}\n.footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}\n.footer-copy{font-size:0.8rem;color:var(--slate-400)}\n.footer-links{display:flex;gap:2rem;list-style:none}\n.footer-links a{color:var(--slate-400);text-decoration:none;font-size:0.8rem;transition:color 0.3s}\n.footer-links a:hover{color:var(--white)}\n\n/* REVEAL */\n.reveal{opacity:0;transform:translateY(40px);transition:opacity 0.8s var(--ease),transform 0.8s var(--ease)}\n.reveal.visible{opacity:1;transform:translateY(0)}\n\n/* RESPONSIVE */\n@media(max-width:900px){\n.nav-links{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.98);flex-direction:column;justify-content:center;gap:2rem;padding:2rem;z-index:999}\n.nav-links.open{display:flex}\n.nav-toggle{display:flex}\n.grid-2{grid-template-columns:1fr}\n.grid-3,.funded-grid{grid-template-columns:1fr 1fr}\n.param-grid{grid-template-columns:1fr 1fr}\n.param-item:nth-child(3n){border-right:1px solid var(--slate-200)}\n.param-item:nth-child(2n){border-right:none}\n.footer-inner{flex-direction:column;gap:1.5rem;text-align:center}\n}\n@media(max-width:600px){\n.funded-grid{grid-template-columns:1fr}\n.param-grid{grid-template-columns:1fr}\n.param-item{border-right:none !important}\n.page-hero{height:40vh;min-height:300px}\n.page-hero.tall{height:55vh;min-height:420px}\n.contact-grid{gap:2rem}\n}\n\n/* === WEEBLY OVERRIDE === */\n.wrapper, .birdseye-header, .nav-wrap, .desktop-nav, .mobile-nav-wrap,\n.banner-wrap, .wsite-header-section, .main-wrap,\n.footer-wrap, .wsite-footer,\n#wsite-content, .wsite-elements,\n#wsite-menus, .wsite-menu-default, .wsite-menu-wrap,\n.header-wrap, #header, .birdseye-header *,\n.wsite-mobile-menu, .wsite-header-elements,\n.wsite-header, .header-inner,\n.not-found-wrap, .wsite-not-found,\n.wsite-header-section .wsite-section-wrap,\n.banner-wrap .wsite-section-wrap,\n#wsite-title, .wsite-logo, .wsite-title-container {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\nbody {\n  background: var(--cream) !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n#sherpa-inject {\n  display: block !important;\n  position: relative;\n  z-index: 100;\n}\n/* Fallback mode: un-hide Weebly content when page has no injection route */\nbody.sherpa-fallback .wrapper,\nbody.sherpa-fallback .main-wrap,\nbody.sherpa-fallback #wsite-content,\nbody.sherpa-fallback .wsite-elements,\nbody.sherpa-fallback .main-wrap .wsite-elements {\n  display: block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n  pointer-events: auto !important;\n  position: static !important;\n  height: auto !important;\n  overflow: visible !important;\n}";
  h.appendChild(st);

  // 3. Run page injection
})();

(function() {
  // Page content map
  var PAGES = {
  "/": `<section class="page-hero tall" id="home">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-home.jpg')"></div>
  <div class="page-hero-content">
    <div class="hero-logo-mark"><img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/logo.png" alt="Sherpa Capital Group" style="height:270px;width:auto;filter:brightness(0) invert(1);"><div style="font-family:var(--font-body);font-size:0.85rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--forest);font-weight:700;margin-top:0.5rem;">Sherpa Capital Group</div></div>
    <h1 class="hero-headline">Precision Capital.<br><em>Chicago Roots.</em></h1>
    <div class="hero-divider"></div>
    <p class="hero-tagline">Boutique private equity real estate. Bridge debt and equity investments secured by commercial real estate across Chicago's most dynamic neighborhoods.</p>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="reveal">
        <p class="section-label">Since 2010</p>
        <h2 class="section-heading">Built on Creativity,<br><em>Execution & Integrity</em></h2>
        <div class="content-text">
          <p>Sherpa Capital Group LLC is a boutique private equity real estate firm specializing in originating bridge debt and equity investments secured by commercial non-owner occupied real estate.</p>
          <p>Founded in 2010 to capitalize on the lack of credit in the real estate industry, Sherpa was built by principals with a combined 35 years of experience in real estate lending. The firm delivers innovative creative lending solutions, diverse product offerings, and exceptional service.</p>
        </div>
        <div class="about-stats">
          <div><div class="stat-number">350+</div><div class="stat-label">Transactions Funded</div></div>
          <div><div class="stat-number">15+</div><div class="stat-label">Years Operating</div></div>
          <div><div class="stat-number">35+</div><div class="stat-label">Years Combined Experience</div></div>
          <div><div class="stat-number">100%</div><div class="stat-label">Chicago Focused</div></div>
        </div>
      </div>
      <div class="img-frame reveal" style="aspect-ratio:4/5">
        <div class="img-accent"></div>
        <img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/residential.jpg" alt="Chicago River" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section bg-dark">
  <div class="container">
    <p class="section-label reveal">What We Do</p>
    <h2 class="section-heading reveal">Two Pillars. <em>One Platform.</em></h2>
    <p class="reveal" style="max-width:600px;color:var(--slate-400);font-size:1.05rem;line-height:1.8;margin-bottom:3rem">Our entrepreneurial lending platform is built on creativity, execution, and integrity — delivering capital solutions across the full commercial real estate spectrum.</p>
    <div class="grid-2" style="gap:2rem">
      <div class="card reveal">
        <h3 class="card-title">Bridge Loans</h3>
        <p class="card-desc">Short-term financing for commercial real estate acquisitions, refinancing, and value-add repositioning across Chicago's core and emerging submarkets.</p>
        <ul class="card-list">
          <li>Non-owner occupied commercial real estate</li>
          <li>Acquisition & refinance</li>
          <li>Value-add and repositioning</li>
          <li>Fast close capabilities</li>
        </ul>
        <p style="margin-top:1.5rem"><a href="/loan-parameters" class="btn-primary" style="padding:0.7rem 2rem;font-size:0.7rem">Learn More</a></p>
      </div>
      <div class="card reveal">
        <h3 class="card-title">Equity Investments</h3>
        <p class="card-desc">Strategic equity partnerships for commercial real estate projects. We co-invest alongside experienced operators to unlock value in Chicago's strongest corridors.</p>
        <ul class="card-list">
          <li>Joint venture equity</li>
          <li>Preferred equity structures</li>
          <li>Co-investment alongside operators</li>
          <li>$250K – $5M capital placements</li>
        </ul>
        <p style="margin-top:1.5rem"><a href="/equity" class="btn-primary" style="padding:0.7rem 2rem;font-size:0.7rem">Learn More</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <p class="section-label reveal">Recently Funded</p>
    <h2 class="section-heading reveal">Selected <em>Transactions</em></h2>
    <div class="grid-3" style="margin-top:2rem">
      
        <div class="funded-card reveal">
          <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1-105-holiday-dr-n-macon-ga-primary-bridge-loan-secured-by-hotel.jpg" alt="CRE Bridge Loan — Hotel Acquisition" loading="lazy" onerror="this.style.display='none'">
          <div class="funded-overlay">
            <span class="funded-label">Bridge Loan</span>
            <span class="funded-title">CRE Bridge Loan — Hotel Acquisition<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.75rem">Atlanta, Georgia</small></span>
          </div>
        </div>
        <div class="funded-card reveal">
          <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/buffalo-new-york-bridge-refinance-of-maturing-regional-bank-loan-office-and-mixed-use-building.jpg" alt="CRE Bridge Loan — Mixed-Use Refinance" loading="lazy" onerror="this.style.display='none'">
          <div class="funded-overlay">
            <span class="funded-label">Bridge Loan</span>
            <span class="funded-title">CRE Bridge Loan — Mixed-Use Refinance<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.75rem">Buffalo, New York</small></span>
          </div>
        </div>
        <div class="funded-card reveal">
          <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/apartment-building-financing-chicago.jpg" alt="Acquisition & Rehab — 2 Apartment Buildings (19 Units)" loading="lazy" onerror="this.style.display='none'">
          <div class="funded-overlay">
            <span class="funded-label">Bridge Loan</span>
            <span class="funded-title">Acquisition & Rehab — 2 Apartment Buildings (19 Units)<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.75rem">Chicago</small></span>
          </div>
        </div>
    </div>
    <p class="reveal" style="text-align:center;margin-top:3rem"><a href="/funded-loans" class="btn-primary">View All Funded Loans</a></p>
  </div>
</section>

<section class="section bg-dark" style="text-align:center;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-home.jpg') center/cover;opacity:0.08"></div>
  <div class="container" style="position:relative;z-index:1">
    <p class="section-label reveal">Get In Touch</p>
    <h2 class="section-heading reveal" style="max-width:500px;margin-left:auto;margin-right:auto">Ready to Discuss<br><em>Your Next Deal?</em></h2>
    <div class="contact-grid reveal">
      <div class="contact-item"><p class="contact-item-label">Phone</p><p class="contact-item-value"><a href="tel:3126026211">312-602-6211</a></p></div>
      <div class="contact-item"><p class="contact-item-label">Email</p><p class="contact-item-value"><a href="mailto:info@sherpacapitalgroup.com">info@sherpacapitalgroup.com</a></p></div>
      <div class="contact-item"><p class="contact-item-label">Office</p><p class="contact-item-value">1720 W. Division St<br>Chicago, IL 60622</p></div>
    </div>
    <p class="reveal" style="margin-top:2.5rem"><a href="/contact" class="btn-primary">Contact Us</a></p>
  </div>
</section>`,
  "/loan-parameters": `<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-bridge.jpg')"></div>
  <div class="page-hero-content">
    <p class="hero-sub">Lending Solutions</p>
    <h1 class="hero-headline">Bridge <em>Loans</em></h1>
  </div>
</section>

<section class="section bg-white">
  <div class="container" style="max-width:800px">
    <div class="content-text reveal" style="text-align:center;margin-bottom:3rem">
      <p style="font-size:1.15rem;line-height:1.9">We evaluate first, mezzanine, and second mortgage loan proposals. Our entrepreneurial platform is built on creativity, execution, and integrity — giving borrowers fast, flexible capital for commercial real estate.</p>
    </div>
  </div>
  <div class="container">
    <div class="param-grid reveal">
      <div class="param-item"><p class="param-label">Loan Size</p><p class="param-value">$100K – $5M</p></div>
      <div class="param-item"><p class="param-label">Loan to Value</p><p class="param-value">Flexible</p><p style="font-size:0.85rem;color:var(--slate-400);margin-top:0.3rem">Based on risk/reward profile</p></div>
      <div class="param-item"><p class="param-label">Rates</p><p class="param-value">Deal-Specific</p><p style="font-size:0.85rem;color:var(--slate-400);margin-top:0.3rem">Based on leverage, sponsorship, equity & exit strategy</p></div>
      <div class="param-item"><p class="param-label">Collateral</p><p class="param-value">Real Estate & Fixed Assets</p></div>
      <div class="param-item"><p class="param-label">Structure</p><p class="param-value">Interest Only</p><p style="font-size:0.85rem;color:var(--slate-400);margin-top:0.3rem">Fast underwriting, quick close</p></div>
      <div class="param-item"><p class="param-label">Closing Costs</p><p class="param-value">Borrower Responsible</p><p style="font-size:0.85rem;color:var(--slate-400);margin-top:0.3rem">All legal and closing costs</p></div>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="grid-2">
      <div class="reveal">
        <p class="section-label">Property Types</p>
        <h2 class="section-heading">What We <em>Finance</em></h2>
        <div class="content-text">
          <p>Non-Owner Occupied Residential, Multifamily, Condo, Retail, Mixed-Use, Hotel, Industrial, Office, Land Development, and Self Storage.</p>
        </div>
        <p class="section-label" style="margin-top:2.5rem">Special Situations</p>
        <div class="content-text">
          <p>Discounted note payoffs. Debtor in possession. Foreclosures. Note purchases of both performing and non-performing real estate debt.</p>
        </div>
      </div>
      <div class="img-frame reveal" style="aspect-ratio:4/3">
        <img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/industrial.jpg" alt="Chicago commercial real estate" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section bg-dark" style="text-align:center">
  <div class="container">
    <p class="section-label reveal">Next Step</p>
    <h2 class="section-heading reveal">Have a Deal to <em>Discuss?</em></h2>
    <p class="reveal" style="color:var(--slate-400);max-width:500px;margin:0 auto 2rem">Contact our team directly. We evaluate every opportunity on its merits and can provide term sheets quickly.</p>
    <p class="reveal"><a href="/contact" class="btn-primary">Submit a Deal</a></p>
  </div>
</section>`,
  "/funded-loans": `<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-funded.jpg')"></div>
  <div class="page-hero-content">
    <p class="hero-sub">Track Record</p>
    <h1 class="hero-headline">Funded <em>Loans</em></h1>
    <div class="hero-divider"></div>
    <p class="hero-tagline">Over 350 transactions funded since 2010 across Chicagoland and select national markets.</p>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="funded-grid">
      
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1-105-holiday-dr-n-macon-ga-primary-bridge-loan-secured-by-hotel.jpg" alt="CRE Bridge Loan — Hotel Acquisition" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">CRE Bridge Loan — Hotel Acquisition<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Atlanta, Georgia</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/buffalo-new-york-bridge-refinance-of-maturing-regional-bank-loan-office-and-mixed-use-building.jpg" alt="CRE Bridge Loan — Mixed-Use Refinance" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">CRE Bridge Loan — Mixed-Use Refinance<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Buffalo, New York</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/apartment-building-financing-chicago.jpg" alt="Acquisition & Rehab — 2 Apartment Buildings (19 Units)" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — 2 Apartment Buildings (19 Units)<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/9631920-orig.jpg" alt="Condo Building Ground Up Construction" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Condo Building Ground Up Construction<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Bucktown</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/chicago-single-family-homes-development-construction-financing.jpg" alt="Construction Financing — Single Family Development" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Construction Financing — Single Family Development<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Bridgeport</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/3100061-orig.jpg" alt="Luxury Home Construction Financing" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Luxury Home Construction Financing<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Bucktown / Wicker Park</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/3242-n-clark-purchase-and-rehab-loan.jpeg" alt="Acquisition Loan — Mixed-Use Building" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition Loan — Mixed-Use Building<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Lakeview / Wrigleyville</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/7802393_1.jpg" alt="Broken Condo Bulk Acquisition & Rehab" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Broken Condo Bulk Acquisition & Rehab<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — North Side</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/8387636-orig.jpg" alt="Acquisition & Rehab — 5 Single Family Homes" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — 5 Single Family Homes<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — North Side</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/9794793-orig.jpg" alt="Spec Single Family Construction" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Spec Single Family Construction<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — North Side</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/181538-orig.jpg" alt="Loft Office Building" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Loft Office Building<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Kinzie Corridor / West Loop</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/2225-w-north-ave-melrose-park-il-primary-photo-1-largehighdefinition.jpg" alt="2nd Lien Rehab — 300,000 Sq. Ft. Industrial" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">2nd Lien Rehab — 300,000 Sq. Ft. Industrial<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago Suburbs</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/4421074-orig.jpeg" alt="Broken Condo Financing" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Broken Condo Financing<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Bronzeville</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/9453983-orig.jpg" alt="Luxury Home Acquisition & Rehab" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Luxury Home Acquisition & Rehab<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">South Suburb of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/6929563-orig.jpg" alt="Acquisition & Rehab — Apartment Building" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — Apartment Building<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">South Suburb of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1317765-orig.jpg" alt="Spec Single Family Construction" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Spec Single Family Construction<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Northwest Suburbs of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/land-development-financing-single-family-homes.jpg" alt="Land Development — 17 Improved Lots" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Land</span>
          <span class="funded-title">Land Development — 17 Improved Lots<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Palatine, Illinois</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/8712370-orig.jpg" alt="Refinance of Multiple Properties" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Refinance of Multiple Properties<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Western Suburb of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/2376343-orig.jpg" alt="Refinance of Spec Home" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Refinance of Spec Home<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Western Suburb of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/8583655-orig.jpg" alt="Construction Financing — New Homes" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Construction Financing — New Homes<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Western Suburb of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/3910426-orig.jpg" alt="Acquisition & Rehab — 3 Single Family Homes" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — 3 Single Family Homes<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Western Suburbs of Chicago</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/elston-lincoln-park-pic1-orig.jpg" alt="Office Building Development Loan" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Office Building Development Loan<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Lincoln Park / Elston Corridor</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/self-stoage-bridge-loan-2-orig.jpg" alt="Self Storage Facility" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Self Storage Facility<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Flint, Michigan</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/5409787-orig.jpg" alt="Acquisition & Rehab — 2 Single Family Homes" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — 2 Single Family Homes<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Glenview & Wheaton</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/6698719-orig.jpg" alt="Acquisition & Rehab — Luxury Single Family Home" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — Luxury Single Family Home<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Glenview</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/3007566-orig.jpg" alt="Acquisition & Rehab — Luxury Single Family Home" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — Luxury Single Family Home<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Lake Bluff</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/9909240-orig_1.jpg" alt="Acquisition & Rehab — Single Family Home" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Acquisition & Rehab — Single Family Home<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Lake Bluff</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/10586_1.jpg" alt="Value Add Retail Center" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Value Add Retail Center<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Romeoville, Illinois</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/spec-construction-financing-orig.jpg" alt="Acquisition & Construction — Single Family Home" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Construction</span>
          <span class="funded-title">Acquisition & Construction — Single Family Home<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Norwood Park</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/2-cvg-airport-indutrial-land-bridge-loan.jpg" alt="CRE Bridge — Industrial Land Acquisition" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">CRE Bridge — Industrial Land Acquisition<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Cincinnati, Ohio</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/missonibaia-condo-building-edgewater-miami-florida.jpg" alt="Luxury Condominium Investment Property" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Luxury Condominium Investment Property<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Miami Beach, Florida</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1672761943145.jpeg" alt="Car Wash & Real Estate Acquisition" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Car Wash & Real Estate Acquisition<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Detroit, Michigan</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1-el-paso-texas-medical-office-building-bridge-loan.jpg" alt="CRE Bridge — Medical Office Building" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">CRE Bridge — Medical Office Building<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">El Paso, Texas</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/fort-myers-motel-bridge-loan-for-acquisition.jpg" alt="Motel Acquisition & Rehab Loan" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Motel Acquisition & Rehab Loan<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Fort Myers, Florida</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/townhome-development-rendering.jpg" alt="Bridge Land Loan — Townhome Development" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Land</span>
          <span class="funded-title">Bridge Land Loan — Townhome Development<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Buffalo, New York</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1-austin-neighborhood-chicago-acquistiion-loan-larrge-affordable-housing-project.webp" alt="Affordable Housing — 300-Unit SRO" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Affordable Housing — 300-Unit SRO<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Chicago — Austin</small></span>
        </div>
      </div>
      <div class="funded-card reveal">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/1-midwest-rd-oak-brook-il-building-bridge-loan-by-sherpa-capital-group.jpg" alt="Office Bridge Acquisition Loan" loading="lazy" onerror="this.parentElement.style.background='var(--slate-700)'">
        <div class="funded-overlay">
          <span class="funded-label">Bridge Loan</span>
          <span class="funded-title">Office Bridge Acquisition Loan<br><small style="color:var(--slate-400);font-family:var(--font-body);font-size:0.72rem">Oak Brook, Illinois</small></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-dark" style="text-align:center">
  <div class="container">
    <p class="section-label reveal">Get Started</p>
    <h2 class="section-heading reveal">Your Deal Could Be <em>Next</em></h2>
    <p class="reveal" style="margin-top:1.5rem"><a href="/contact" class="btn-primary">Contact Us</a></p>
  </div>
</section>`,
  "/equity": `<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-equity.jpg')"></div>
  <div class="page-hero-content">
    <p class="hero-sub">Strategic Partnerships</p>
    <h1 class="hero-headline">Equity <em>Investments</em></h1>
  </div>
</section>

<section class="section bg-white">
  <div class="container" style="max-width:800px">
    <div class="content-text reveal" style="text-align:center;margin-bottom:3rem">
      <p style="font-size:1.15rem;line-height:1.9">Sherpa Capital is an equity investor in commercial real estate assets nationwide. The firm's investment strategy is centered on finding value-add opportunities.</p>
      <p>We are seeking best-in-class sponsors as equity partners and assets that are currently out of favor, complicated, and/or distressed.</p>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="grid-2">
      <div class="reveal">
        <p class="section-label">Investment Focus</p>
        <h2 class="section-heading">Value-Add <em>Opportunities</em></h2>
        <div class="content-text">
          <p>We specialize in $250K – $5 million capital placements targeting multifamily, hospitality, office, retail, industrial, land, residential, and self-storage properties.</p>
          <p>We will also consider second mortgage and mezzanine debt opportunities.</p>
        </div>
      </div>
      <div class="img-frame reveal" style="aspect-ratio:4/3">
        <img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/residential.jpg" alt="Chicago residential real estate" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="img-frame reveal" style="aspect-ratio:4/3">
        <img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-funded.jpg" alt="Commercial real estate" loading="lazy">
      </div>
      <div class="reveal">
        <p class="section-label">Note Purchases</p>
        <h2 class="section-heading">Performing & <em>Non-Performing</em></h2>
        <div class="content-text">
          <p>We purchase performing and non-performing notes secured by real estate. We utilize our hands-on management approach to service the notes and maximize returns.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-dark" style="text-align:center">
  <div class="container">
    <p class="section-label reveal">Partner With Us</p>
    <h2 class="section-heading reveal">Have an Equity <em>Opportunity?</em></h2>
    <p class="reveal" style="color:var(--slate-400);max-width:500px;margin:0 auto 2rem">We evaluate every opportunity on its merits. If you have a deal that fits our investment criteria, we'd like to hear from you.</p>
    <p class="reveal"><a href="/contact" class="btn-primary">Get In Touch</a></p>
  </div>
</section>`,
  "/contact": `<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-contact.jpg')"></div>
  <div class="page-hero-content">
    <p class="hero-sub">Let's Talk</p>
    <h1 class="hero-headline">Contact <em>Us</em></h1>
  </div>
</section>

<section class="section bg-white">
  <div class="container" style="max-width:900px">
    <div class="grid-2 reveal" style="gap:4rem">
      <div>
        <p class="section-label">Reach Out</p>
        <h2 class="section-heading" style="font-size:2rem">We'd Like to<br><em>Hear From You</em></h2>
        <div class="content-text">
          <p>Whether you have a bridge loan to discuss, an equity opportunity, or just want to learn more about how Sherpa Capital operates — our team is directly accessible.</p>
          <p>We evaluate every opportunity on its own merits and can provide term sheets quickly.</p>
        </div>
      </div>
      <div>
        <div style="margin-bottom:2.5rem">
          <p class="section-label">Phone</p>
          <p style="font-family:var(--font-display);font-size:1.3rem;margin-top:0.3rem"><a href="tel:3126026211" style="color:var(--slate-800);text-decoration:none">312-602-6211</a></p>
          <p style="font-family:var(--font-display);font-size:1.3rem;margin-top:0.3rem"><a href="tel:3126026212" style="color:var(--slate-800);text-decoration:none">312-602-6212</a></p>
        </div>
        <div style="margin-bottom:2.5rem">
          <p class="section-label">Email</p>
          <p style="font-family:var(--font-display);font-size:1.3rem;margin-top:0.3rem"><a href="mailto:info@sherpacapitalgroup.com" style="color:var(--forest);text-decoration:none">info@sherpacapitalgroup.com</a></p>
        </div>
        <div>
          <p class="section-label">Office</p>
          <p style="font-family:var(--font-display);font-size:1.3rem;margin-top:0.3rem;line-height:1.5">1720 W. Division Street<br>Chicago, IL 60622</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-cream" style="text-align:center">
  <div class="container" style="max-width:600px">
    <p class="section-label reveal">Submit a Deal</p>
    <h2 class="section-heading reveal">Email Us <em>Directly</em></h2>
    <div class="content-text reveal">
      <p>Send your deal summary, property details, and financing needs to our team. We respond to every inquiry.</p>
    </div>
    <p class="reveal" style="margin-top:2rem"><a href="mailto:info@sherpacapitalgroup.com?subject=Deal%20Submission" class="btn-primary">Email Your Deal</a></p>
  </div>
</section>`,
  "/the-team": `
<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/hero-team.jpg')"></div>
  <div class="page-hero-content">
    <p class="hero-sub">Leadership</p>
    <h1 class="hero-headline">The <em>Team</em></h1>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="content-text reveal" style="text-align:center;max-width:800px;margin:0 auto 3rem">
      <p style="font-size:1.15rem;line-height:1.9">Sherpa Capital Group, LLC is comprised of a team with more than 35 years of combined real estate lending experience. Our management team has a proven multi-year track record of originating, structuring and funding real estate transactions.</p>
    </div>

    <div class="grid-2" style="margin-bottom:4rem">
      <div class="img-frame reveal" style="aspect-ratio:3/4">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/published/ashish-parikh-sherpa-capital-group.jpg?1554828922" alt="Ashish Parikh" loading="lazy">
      </div>
      <div class="reveal">
        <p class="section-label">Managing Principal</p>
        <h2 class="section-heading">Ashish <em>Parikh</em></h2>
        <div class="content-text">
          <p>Ashish Parikh has been in Chicago's real estate industry since 1995. He received his Bachelor of Science in Finance from Purdue University (1995). After graduating from Purdue, he joined the land and home development group at Zale Homes working on a 3,000 acre development in the northern suburbs of Chicago.</p>
          <p>While at Zale Homes, he furthered his education with an M.B.A. with a concentration in Finance from Loyola University. Thereafter, he joined Amresco Capital as an originations analyst in the real estate lending sector. After Amresco, he joined Heller Financial where he was on the portfolio side monitoring a portfolio of structured real estate mortgages.</p>
          <p>With the desire to return to the production side of mortgage lending, he joined Inland Western Retail Real Estate Trust Inc, where he originated mortgage transactions on retail shopping centers throughout the country. Most recently, he co-founded Sherpa Capital Group.</p>
        </div>
        <div style="margin-top:1.5rem">
          <p style="font-size:0.85rem;color:var(--slate-400)"><a href="mailto:info@sherpacapitalgroup.com" style="color:var(--forest);text-decoration:none">info@sherpacapitalgroup.com</a> &nbsp;|&nbsp; P 312-602-6211</p>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="reveal">
        <p class="section-label">Managing Principal</p>
        <h2 class="section-heading">Rahul <em>Shah</em></h2>
        <div class="content-text">
          <p>Rahul Shah has been in the real estate industry since 1999. He received his Bachelor of Science in Finance from University of Illinois – Champaign (1999). After graduating, he joined Inland Western Retail Real Estate Trust, Inc. – a publicly traded REIT.</p>
          <p>While at Inland Western, Rahul was a senior member of the acquisitions team and was directly responsible for acquiring, structuring, negotiating and underwriting over $4.5 billion of commercial real estate assets. He also furthered his education with an M.B.A. from DePaul University.</p>
          <p>Most recently, he co-founded Sherpa Capital Group.</p>
        </div>
        <div style="margin-top:1.5rem">
          <p style="font-size:0.85rem;color:var(--slate-400)"><a href="mailto:info@sherpacapitalgroup.com" style="color:var(--forest);text-decoration:none">info@sherpacapitalgroup.com</a> &nbsp;|&nbsp; P 312-602-6212</p>
        </div>
      </div>
      <div class="img-frame reveal" style="aspect-ratio:3/4">
        <img src="//www.sherpacapitalgroup.com/uploads/1/2/5/3/12533793/rahul-shah-sherpa-capital-group_orig.jpg" alt="Rahul Shah" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section bg-dark" style="text-align:center">
  <div class="container">
    <p class="section-label reveal">Work With Us</p>
    <h2 class="section-heading reveal">Ready to Discuss<br><em>Your Next Deal?</em></h2>
    <p class="reveal" style="color:var(--slate-400);max-width:500px;margin:0 auto 2rem">Our team is directly accessible. We evaluate every opportunity on its merits.</p>
    <p class="reveal"><a href="/contact" class="btn-primary">Contact Us</a></p>
  </div>
</section>
`
};

  // Determine current page
  var path = window.location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (path === '/index' || path === '') path = '/';
  // Remove trailing slash except for root
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  // Handle Weebly 404 pages - check if we have content for this path
  // Also try without leading slash variations

  // Alias: /information maps to /equity (same content on live Weebly site)
  if (path === '/information') path = '/equity';

  var content = PAGES[path];
  var isFallback = !content;

  // Wait for DOM
  function inject() {
    // Aggressively hide Weebly default elements via JS
    var hideSelectors = isFallback
      ? '.birdseye-header, .nav-wrap, .desktop-nav, .mobile-nav-wrap, .banner-wrap, .wsite-header-section, .footer-wrap, .wsite-footer, #wsite-menus, .wsite-header-elements, .wsite-header, #header, .header-wrap, .header-inner, .not-found-wrap'
      : '.wrapper, .birdseye-header, .nav-wrap, .desktop-nav, .mobile-nav-wrap, .banner-wrap, .wsite-header-section, .main-wrap, .footer-wrap, .wsite-footer, #wsite-content, .wsite-elements, #wsite-menus, .wsite-header-elements, .wsite-header, #header, .header-wrap, .header-inner, .not-found-wrap';
    document.querySelectorAll(hideSelectors).forEach(function(el) {
      el.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;height:0!important;overflow:hidden!important;position:absolute!important;pointer-events:none!important;';
    });

    // Fallback: for unmatched pages, keep Weebly content visible but restyle it
    if (isFallback) {
      document.body.classList.add('sherpa-fallback');
      var wrapper = document.querySelector('.wrapper');
      if (wrapper) wrapper.style.cssText = 'display:block!important;visibility:visible!important;opacity:1!important;position:static!important;height:auto!important;overflow:visible!important;';
      var mainWrap = document.querySelector('.main-wrap');
      if (mainWrap) mainWrap.style.cssText = 'display:block!important;visibility:visible!important;padding-top:100px;max-width:1200px;margin:0 auto;padding-left:2rem;padding-right:2rem;padding-bottom:4rem;';
      var wContent = document.querySelector('#wsite-content');
      if (wContent) wContent.style.cssText = 'display:block!important;visibility:visible!important;opacity:1!important;';
      // Also show wsite-elements inside the content
      document.querySelectorAll('.main-wrap .wsite-elements').forEach(function(el) {
        el.style.cssText = 'display:block!important;visibility:visible!important;opacity:1!important;';
      });
    }

    // Create injection container
    var container = document.createElement('div');
    container.id = 'sherpa-inject';

    // Build nav
    var navLinks = [
      ['/', 'Home'],
      ['/the-team', 'The Team'],
      ['/loan-parameters', 'Bridge Loans'],
      ['/funded-loans', 'Funded Loans'],
      ['/equity', 'Equity'],
      ['/contact', 'Contact']
    ];
    var navLinksHtml = navLinks.map(function(item) {
      var active = (path === item[0]) ? ' class="active"' : '';
      return '<li><a href="' + item[0] + '"' + active + '>' + item[1] + '</a></li>';
    }).join('\n');

    var navHtml = '<nav class="nav" id="nav">' +
      '<a href="/" class="nav-logo"><img src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/logo.png" alt="Sherpa Capital Group" style="height:70px;width:auto;filter:brightness(0) invert(1);"><span style="font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--forest);font-weight:700;white-space:nowrap;">Sherpa Capital<br>Group</span></a>' +
      '<ul class="nav-links" id="navLinks">' + navLinksHtml + '</ul>' +
      '<button class="nav-toggle" onclick="toggleNav()"><span></span><span></span><span></span></button>' +
      '</nav>';

    var footerHtml = '<footer class="footer"><div class="footer-inner">' +
      '<p class="footer-copy">&copy; 2026 Sherpa Capital Group LLC. All rights reserved.</p>' +
      '<ul class="footer-links">' +
      '<li><a href="/">Home</a></li>' +
      '<li><a href="/loan-parameters">Bridge Loans</a></li>' +
      '<li><a href="/equity">Equity</a></li>' +
      '<li><a href="/contact">Contact</a></li>' +
      '</ul></div></footer>';

    if (isFallback) {
      // Fallback: inject nav at top, footer at bottom, keep Weebly page content
      var navContainer = document.createElement('div');
      navContainer.id = 'sherpa-inject';
      navContainer.innerHTML = navHtml;
      document.body.insertBefore(navContainer, document.body.firstChild);
      var footerContainer = document.createElement('div');
      footerContainer.innerHTML = footerHtml;
      document.body.appendChild(footerContainer);
    } else {
      container.innerHTML = navHtml + content + footerHtml;
      document.body.appendChild(container);
    }

    // Initialize nav scroll behavior
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Initialize reveal animations
    var ro = new IntersectionObserver(function(entries) {
      entries.forEach(function(en, i) {
        if (en.isIntersecting) {
          setTimeout(function() { en.target.classList.add('visible'); }, i * 80);
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function(el) { ro.observe(el); });

    // Nav toggle for mobile
    window.toggleNav = function() {
      document.getElementById('navLinks').classList.toggle('open');
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();