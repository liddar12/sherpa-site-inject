/**
 * Sherpa Capital Group — Storyblok Renderer
 * Fetches content from Storyblok CDN API and renders using the Sherpa design system.
 * All text and style overrides are editable via Storyblok CMS.
 */

const STORYBLOK_TOKEN = '0c2CL470mDGLNHiNrQzEsgtt';
const API_BASE = 'https://api.storyblok.com/v2/cdn';

// Use published content by default; fall back to draft inside the Storyblok Visual Editor
const isStoryblokEditor = (window.location !== window.parent.location) ||
  new URLSearchParams(window.location.search).has('_storyblok');
const SB_VERSION = isStoryblokEditor ? 'draft' : 'published';

// ── WebP image optimization via Storyblok Image Service ──
function sbWebP(url) {
  if (!url || !url.includes('a.storyblok.com')) return url;
  // Normalize S3 URLs to CDN URLs (image service only works on CDN)
  url = url.replace('https://s3.amazonaws.com/a.storyblok.com/', 'https://a.storyblok.com/');
  if (url.includes('/m/')) return url.replace(/\/?$/, '') + '/filters:format(webp)';
  return url + '/m/filters:format(webp)';
}

// ── Global site settings (loaded once, used everywhere) ──
let SITE = {};

async function loadSiteSettings() {
  try {
    const resp = await fetch(`${API_BASE}/stories/site-settings?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}`);
    if (resp.ok) {
      const data = await resp.json();
      SITE = data.story?.content || {};
    }
  } catch(e) { /* use defaults */ }
}

// ── Style override helper ──
function styleOverride(blok, prefix) {
  const p = prefix ? `${prefix}_` : '';
  const parts = [];
  const ff = blok[`${p}font_family`];
  const fs = blok[`${p}font_size`];
  const fc = blok[`${p}font_color`];
  if (ff) parts.push(`font-family:${ff}`);
  if (fs) parts.push(`font-size:${fs}`);
  if (fc) parts.push(`color:${fc}`);
  return parts.length ? ` style="${parts.join(';')}"` : '';
}

function headingStyle(blok, extraStyle) {
  const parts = [];
  const ff = blok.heading_font_family;
  const fs = blok.heading_font_size;
  const fc = blok.heading_font_color;
  if (ff) parts.push(`font-family:${ff}`);
  if (fs) parts.push(`font-size:${fs}`);
  if (fc) parts.push(`color:${fc}`);
  if (extraStyle) parts.push(extraStyle);
  return parts.length ? ` style="${parts.join(';')}"` : '';
}

// ── Storyblok editable attribute ──
function sbAttr(blok) {
  if (!blok._editable) return '';
  try {
    const json = blok._editable.replace('<!--#storyblok#', '').replace('-->', '');
    return ` data-blok-c='${json}' data-blok-uid="${blok._uid}"`;
  } catch(e) { return ''; }
}

// ── Richtext renderer ──
function renderRichtext(doc) {
  if (!doc || !doc.content) return '';
  return doc.content.map(node => {
    if (node.type === 'paragraph') {
      const text = (node.content || []).map(c => {
        let t = c.text || '';
        if (c.marks) {
          c.marks.forEach(m => {
            if (m.type === 'bold') t = `<strong>${t}</strong>`;
            if (m.type === 'italic') t = `<em>${t}</em>`;
            if (m.type === 'link') t = `<a href="${m.attrs.href}">${t}</a>`;
          });
        }
        return t;
      }).join('');
      return `<p>${text}</p>`;
    }
    if (node.type === 'heading') {
      const level = node.attrs?.level || 2;
      const text = (node.content || []).map(c => c.text || '').join('');
      return `<h${level}>${text}</h${level}>`;
    }
    if (node.type === 'bullet_list') {
      const items = (node.content || []).map(li => {
        const text = (li.content || []).map(p => (p.content || []).map(c => c.text || '').join('')).join('');
        return `<li>${text}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }
    return '';
  }).join('\n');
}

// ── LinkedIn icon SVG ──
const linkedinIcon = (size = 16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

// ── Component renderers ──
const renderers = {
  hero(blok) {
    const bgImg = sbWebP(blok.background_image?.filename || 'https://a.storyblok.com/f/291512806597839/719069/0f966975e7/hero-home.jpg');

    // Logo size + offset
    const logoH = blok.logo_size || '200px';
    const logoOffParts = ['filter:brightness(0) invert(1)', `height:${logoH}`, 'width:auto'];
    if (blok.logo_vertical_offset) logoOffParts.push(`transform:translateY(${blok.logo_vertical_offset})`);
    // Hero logo visibility: desktop-only, mobile-only, or both
    let logoClass = '';
    if (blok.show_logo) {
      const showDesktop = blok.show_logo_desktop !== false; // default true unless explicitly false
      const showMobile = blok.show_logo_mobile !== false;
      if (showDesktop && !showMobile) logoClass = ' desktop-only';
      else if (!showDesktop && showMobile) logoClass = ' mobile-only';
      // both true = no class (always visible); both false = won't reach here since show_logo would be off
    }
    const logo = blok.show_logo ? `<div class="hero-logo-mark${logoClass}"><img src="https://a.storyblok.com/f/291512806597839/38141/e7e79645aa/logo.png" alt="Sherpa Capital Group" style="${logoOffParts.join(';')}"></div>` : '';

    const label = blok.label ? `<p class="hero-sub">${blok.label}</p>` : '';
    const hStyle = headingStyle(blok, '');

    // Tagline style
    const tParts = [];
    if (blok.tagline_font_size) tParts.push(`font-size:${blok.tagline_font_size}`);
    if (blok.tagline_font_color) tParts.push(`color:${blok.tagline_font_color}`);
    const taglineStyle = tParts.length ? ` style="${tParts.join(';')}"` : '';

    // Image focus point
    const focusMap = { top: 'center top', center: 'center center', bottom: 'center bottom' };
    const bgPos = focusMap[blok.image_focus_point] || 'center 30%';

    // Text vertical position
    const posMap = { top: 'flex-start', bottom: 'flex-end' };
    const alignItems = posMap[blok.text_vertical_position] || 'center';
    const sectionParts = [`align-items:${alignItems}`];
    const contentParts = [];
    if (blok.text_vertical_position === 'top') contentParts.push('padding-top:clamp(100px,15vh,160px)');
    if (blok.text_vertical_position === 'bottom') contentParts.push('padding-bottom:clamp(40px,8vh,80px)');
    if (blok.text_vertical_offset) contentParts.push(`transform:translateY(${blok.text_vertical_offset})`);
    const sectionStyle = sectionParts.length ? sectionParts.join(';') : '';
    const contentStyle = contentParts.length ? ` style="${contentParts.join(';')}"` : '';

    // Divider also follows the same visibility as the logo
    const divider = blok.show_logo ? `<div class="hero-divider${logoClass}"></div>` : '';

    return `
    <section class="page-hero${blok.show_logo ? ' tall' : ''}" style="${sectionStyle}"${sbAttr(blok)}>
      <div class="page-hero-bg" style="background-image:url('${bgImg}');background-position:${bgPos}"></div>
      <div class="page-hero-content"${contentStyle}>
        ${logo}
        ${label}
        <h1 class="hero-headline"${hStyle}>${blok.headline || ''}${blok.headline_italic ? '<br><em>' + blok.headline_italic + '</em>' : ''}</h1>
        ${divider}
        ${blok.tagline ? `<p class="hero-tagline"${taglineStyle}>${blok.tagline}</p>` : ''}
      </div>
    </section>`;
  },

  about_section(blok) {
    const img = blok.image?.filename ? `
      <div class="img-frame reveal" style="aspect-ratio:4/5">
        <div class="img-accent"></div>
        <img src="${sbWebP(blok.image.filename)}" alt="" loading="lazy">
      </div>` : '';
    const stats = (blok.stats || []).map(s => `
      <div${sbAttr(s)}>
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
    const hStyle = headingStyle(blok, '');
    return `
    <section class="section bg-white"${sbAttr(blok)}>
      <div class="container">
        <div class="grid-2">
          <div class="reveal">
            <p class="section-label">${blok.label || ''}</p>
            <h2 class="section-heading"${hStyle}>${blok.heading || ''}${blok.heading_italic ? '<br><em>' + blok.heading_italic + '</em>' : ''}</h2>
            <div class="content-text">${renderRichtext(blok.body)}</div>
            ${stats ? `<div class="about-stats">${stats}</div>` : ''}
          </div>
          ${img}
        </div>
      </div>
    </section>`;
  },

  service_cards(blok) {
    const cards = (blok.cards || []).map(card => {
      const bullets = (card.bullets || '').split('\n').filter(b => b.trim()).map(b =>
        `<li>${b.trim()}</li>`
      ).join('');
      return `
      <div class="card"${sbAttr(card)}>
        <h3 class="card-title">${card.title || ''}</h3>
        <p class="card-desc">${card.description || ''}</p>
        ${bullets ? `<ul class="card-list">${bullets}</ul>` : ''}
        ${card.button_text ? `<p style="margin-top:1.5rem"><a href="${card.button_link || '#'}" class="btn-primary" style="padding:0.7rem 2rem;font-size:0.7rem">${card.button_text}</a></p>` : ''}
      </div>`;
    }).join('');
    const hStyle = headingStyle(blok, '');
    return `
    <section class="section bg-dark"${sbAttr(blok)}>
      <div class="container">
        <p class="section-label reveal">${blok.label || ''}</p>
        <h2 class="section-heading reveal"${hStyle}>${blok.heading || ''}${blok.heading_italic ? ' <em>' + blok.heading_italic + '</em>' : ''}</h2>
        <p class="reveal" style="color:var(--slate-400);max-width:600px;margin-bottom:3rem">${blok.description || ''}</p>
        <div class="grid-2">${cards}</div>
      </div>
    </section>`;
  },

  param_grid(blok) {
    const items = (blok.params || []).map(p => `
      <div class="param-item"${sbAttr(p)}>
        <div class="param-label">${p.label || ''}</div>
        <div class="param-value">${p.value || ''}</div>
        ${p.description ? `<div style="font-size:0.8rem;color:var(--slate-400);margin-top:0.3rem">${p.description}</div>` : ''}
      </div>`).join('');
    return `
    <section class="section bg-white"${sbAttr(blok)}>
      <div class="container">
        <div class="param-grid reveal">${items}</div>
      </div>
    </section>`;
  },

  contact_block(blok) {
    const label = blok.section_label || 'Reach Out';
    const heading = blok.heading || "We'd Like to";
    const headingItalic = blok.heading_italic || 'Hear From You';
    const introText = blok.intro_text ? renderRichtext(blok.intro_text) : `
      <p>Whether you have a bridge loan to discuss, an equity opportunity, or just want to learn more about how Sherpa Capital operates — our team is directly accessible.</p>
      <p>We evaluate every opportunity on its own merits and can provide term sheets quickly.</p>`;
    const hStyle = headingStyle(blok, 'font-size:2rem');
    return `
    <section class="section bg-cream"${sbAttr(blok)}>
      <div class="container" style="max-width:900px">
        <div class="grid-2 reveal" style="gap:4rem">
          <div>
            <p class="section-label">${label}</p>
            <h2 class="section-heading"${hStyle}>${heading}<br><em>${headingItalic}</em></h2>
            <div class="content-text">${introText}</div>
          </div>
          <div>
            <p class="section-label">Phone</p>
            <p style="font-family:var(--font-display);font-size:1.3rem;margin-bottom:0.3rem">${blok.phone1 || ''}</p>
            ${blok.phone2 ? `<p style="font-family:var(--font-display);font-size:1.3rem">${blok.phone2}</p>` : ''}
            <p class="section-label" style="margin-top:2rem">Email</p>
            <p style="font-family:var(--font-display);font-size:1.3rem"><a href="mailto:${blok.email}" style="color:var(--forest);text-decoration:none">${blok.email || ''}</a></p>
            <p class="section-label" style="margin-top:2rem">Office</p>
            <p style="font-family:var(--font-display);font-size:1.3rem">${blok.address_line1 || ''}<br>${blok.address_line2 || ''}</p>
          </div>
        </div>
      </div>
    </section>`;
  },

  cta_section(blok) {
    const hStyle = headingStyle(blok, 'color:var(--white)');
    return `
    <section class="section bg-dark" style="text-align:center"${sbAttr(blok)}>
      <div class="container" style="max-width:700px">
        <p class="section-label reveal">${blok.label || ''}</p>
        <h2 class="section-heading reveal"${hStyle}>${blok.heading || ''}${blok.heading_italic ? '<br><em>' + blok.heading_italic + '</em>' : ''}</h2>
        ${blok.description ? `<p class="reveal" style="color:var(--slate-400);max-width:500px;margin:0 auto 2rem">${blok.description}</p>` : ''}
        ${blok.button_text ? `<p class="reveal"><a href="${blok.button_link || '#'}" class="btn-primary">${blok.button_text}</a></p>` : ''}
      </div>
    </section>`;
  },

  text_section(blok) {
    const bg = blok.background === 'dark' ? 'bg-dark' : blok.background === 'cream' ? 'bg-cream' : 'bg-white';
    const width = blok.max_width === 'narrow' ? '800px' : '1200px';
    const parts = ['text-align:center'];
    if (blok.font_family) parts.push(`font-family:${blok.font_family}`);
    parts.push(`font-size:${blok.font_size || '1.1rem'}`);
    if (blok.font_color) parts.push(`color:${blok.font_color}`);
    return `
    <section class="section ${bg}"${sbAttr(blok)}>
      <div class="container" style="max-width:${width}">
        <div class="content-text reveal" style="${parts.join(';')}">
          ${renderRichtext(blok.body)}
        </div>
      </div>
    </section>`;
  },
};

// ── Nav (reads from SITE settings) ──
function renderNav(currentSlug) {
  const links = [
    ['/', SITE.nav_label_home || 'Home'],
    ['/the-team', SITE.nav_label_team || 'The Team'],
    ['/loan-parameters', SITE.nav_label_bridge || 'Bridge Loans'],
    ['/funded-loans', SITE.nav_label_funded || 'Funded Loans'],
    ['/equity', SITE.nav_label_equity || 'Equity'],
    ['/contact', SITE.nav_label_contact || 'Contact'],
  ];
  const navLinks = links.map(([href, label]) => {
    const active = currentSlug === href.replace('/', '') || (currentSlug === 'home' && href === '/') ? ' class="active"' : '';
    return `<li><a href="${href}"${active}>${label}</a></li>`;
  }).join('\n');

  const navLogoH = SITE.nav_logo_height || '70px';
  return `<nav class="nav scrolled" id="nav">
    <a href="/" class="nav-logo desktop-only"><img src="https://a.storyblok.com/f/291512806597839/38141/e7e79645aa/logo.png" alt="${SITE.site_name || 'Sherpa Capital Group'}" style="height:${navLogoH};width:auto;filter:brightness(0) invert(1);"></a>
    <ul class="nav-links" id="navLinks">${navLinks}</ul>
    <button class="nav-toggle" aria-label="Toggle navigation" onclick="toggleNav()"><span></span><span></span><span></span></button>
  </nav>`;
}

// ── Footer (reads from SITE settings) ──
function renderFooter() {
  const copy = SITE.footer_text || '2026 Sherpa Capital Group LLC. All rights reserved.';
  const labels = {
    home: SITE.nav_label_home || 'Home',
    bridge: SITE.nav_label_bridge || 'Bridge Loans',
    equity: SITE.nav_label_equity || 'Equity',
    contact: SITE.nav_label_contact || 'Contact',
  };
  const footerLinkedin = SITE.footer_linkedin ? `<li><a href="${SITE.footer_linkedin}" target="_blank" rel="noopener" class="linkedin-icon" aria-label="LinkedIn">${linkedinIcon(18)}</a></li>` : '';
  return `<footer class="footer"><div class="footer-inner">
    <p class="footer-copy">&copy; ${copy}</p>
    <ul class="footer-links">
      <li><a href="/">${labels.home}</a></li>
      <li><a href="/loan-parameters">${labels.bridge}</a></li>
      <li><a href="/equity">${labels.equity}</a></li>
      <li><a href="/contact">${labels.contact}</a></li>
      ${footerLinkedin}
    </ul>
  </div></footer>`;
}

// ── Page renderer ──
function renderPage(story) {
  const body = story.content.body || [];
  const sections = body.map(blok => {
    const renderer = renderers[blok.component];
    return renderer ? renderer(blok) : `<div style="padding:2rem;background:#fee;text-align:center">Unknown component: ${blok.component}</div>`;
  }).join('\n');

  document.getElementById('app').innerHTML = renderNav(story.slug) + sections + renderFooter();
  const pageMeta = PAGE_META[story.slug] || { title: `${story.name} — ${SITE.site_name || 'Sherpa Capital Group'}`, description: '' };
  updateMeta({ title: pageMeta.title, description: pageMeta.description, path: `/${story.slug === 'home' ? '' : story.slug}` });

  // Breadcrumbs for standard pages
  const crumbs = [{ name: 'Home', url: DOMAIN + '/' }];
  if (story.slug !== 'home') crumbs.push({ name: story.name, url: DOMAIN + '/' + story.slug });
  injectBreadcrumbs(crumbs);

  initScrollBehavior();
  initRevealAnimations();
}

// ── Funded Loans page (reads text from SITE settings) ──
async function renderFundedLoansPage() {
  const [pageResp, loansResp] = await Promise.all([
    fetch(`${API_BASE}/stories/funded-loans?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/stories?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}&starts_with=funded-loans/&per_page=50`).then(r => r.json()),
  ]);

  const loans = (loansResp.stories || []).sort((a, b) => (a.content.position || 999) - (b.content.position || 999));
  const cards = loans.map(loan => {
    const c = loan.content;
    const img = c.image?.filename || '';
    return `
    <a href="/${loan.full_slug}" class="funded-card"${sbAttr(c)}>
      ${img ? `<img src="${sbWebP(img)}" alt="${loan.name}" loading="lazy" onerror="this.style.display='none'">` : ''}
      <div class="funded-overlay">
        <div class="funded-label">${c.deal_type ? c.deal_type.replace('_',' ').toUpperCase() : 'BRIDGE LOAN'}</div>
        <div class="funded-title">${loan.name}</div>
        <div style="font-size:0.75rem;color:var(--slate-400);margin-top:0.2rem">${c.location || ''}</div>
      </div>
    </a>`;
  }).join('');

  const S = SITE;
  // Hero image and positioning from site_settings
  const heroImg = sbWebP(S.funded_hero_image?.filename || 'https://a.storyblok.com/f/291512806597839/482907/8ff4682c73/hero-funded.jpg');
  const focusMap = { top: 'center top', center: 'center center', bottom: 'center bottom' };
  const bgPos = focusMap[S.funded_hero_image_focus] || 'center 30%';
  const posMap = { top: 'flex-start', bottom: 'flex-end' };
  const alignItems = posMap[S.funded_hero_text_position] || 'center';
  const contentParts = [];
  if (S.funded_hero_text_position === 'top') contentParts.push('padding-top:clamp(100px,15vh,160px)');
  if (S.funded_hero_text_position === 'bottom') contentParts.push('padding-bottom:clamp(40px,8vh,80px)');
  if (S.funded_hero_text_offset) contentParts.push(`transform:translateY(${S.funded_hero_text_offset})`);
  const contentStyle = contentParts.length ? ` style="${contentParts.join(';')}"` : '';
  const hParts = [];
  if (S.funded_hero_heading_font_size) hParts.push(`font-size:${S.funded_hero_heading_font_size}`);
  if (S.funded_hero_heading_font_color) hParts.push(`color:${S.funded_hero_heading_font_color}`);
  const hStyle = hParts.length ? ` style="${hParts.join(';')}"` : '';

  const html = `
    ${renderNav('funded-loans')}
    <section class="page-hero" style="align-items:${alignItems}">
      <div class="page-hero-bg" style="background-image:url('${heroImg}');background-position:${bgPos}"></div>
      <div class="page-hero-content"${contentStyle}>
        <p class="hero-sub">${S.funded_hero_label || 'Our Portfolio'}</p>
        <h1 class="hero-headline"${hStyle}>${S.funded_hero_heading || 'Funded Loans'}${S.funded_hero_heading_italic ? ' <em>' + S.funded_hero_heading_italic + '</em>' : ''}</h1>
      </div>
    </section>
    <section class="section bg-cream">
      <div class="container">
        <p class="section-label reveal">${S.funded_section_label || 'Recently Funded'}</p>
        <h2 class="section-heading reveal">${S.funded_section_heading || 'Selected Transactions'}${S.funded_section_heading_italic ? ' <em>' + S.funded_section_heading_italic + '</em>' : ''}</h2>
        <div class="funded-grid reveal">${cards}</div>
      </div>
    </section>
    <section class="section bg-dark" style="text-align:center">
      <div class="container" style="max-width:700px">
        <p class="section-label reveal">${S.funded_cta_label || 'Have a Deal?'}</p>
        <h2 class="section-heading reveal" style="color:var(--white)">${S.funded_cta_heading || 'Ready to Discuss Your Next Deal?'}${S.funded_cta_heading_italic ? '<br><em>' + S.funded_cta_heading_italic + '</em>' : ''}</h2>
        <p class="reveal"><a href="/contact" class="btn-primary">${S.funded_cta_button || 'Contact Us'}</a></p>
      </div>
    </section>
    ${renderFooter()}`;

  document.getElementById('app').innerHTML = html;
  updateMeta(PAGE_META['funded-loans']);
  injectBreadcrumbs([
    { name: 'Home', url: DOMAIN + '/' },
    { name: 'Funded Loans', url: DOMAIN + '/funded-loans' }
  ]);
  initScrollBehavior();
  initRevealAnimations();
}

// ── Funded Loan detail page ──
async function renderFundedLoanDetail(slug) {
  try {
    const resp = await fetch(`${API_BASE}/stories/funded-loans/${slug}?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const loan = data.story;
    const c = loan.content;
    const imgRaw = c.image?.filename || '';
    const img = sbWebP(imgRaw);
    const dealLabel = c.deal_type ? c.deal_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Bridge Loan';

    const html = `
      ${renderNav('funded-loans')}
      <section class="page-hero" style="min-height:50vh">
        <div class="page-hero-bg" style="background-image:url('${img || sbWebP('https://a.storyblok.com/f/291512806597839/482907/8ff4682c73/hero-funded.jpg')}')"></div>
        <div class="page-hero-content">
          <p class="hero-sub">${dealLabel}</p>
          <h1 class="hero-headline" style="font-size:clamp(1.6rem,3.5vw,2.8rem)">${loan.name}</h1>
          ${c.location ? `<p style="color:var(--slate-300);margin-top:0.5rem;font-family:var(--font-display);font-size:1.1rem">${c.location}</p>` : ''}
        </div>
      </section>
      <section class="section bg-white">
        <div class="container" style="max-width:900px">
          <div class="reveal" style="display:flex;gap:3rem;flex-wrap:wrap">
            ${img ? `<div style="flex:1;min-width:280px"><div class="img-frame" style="aspect-ratio:4/3"><img src="${img}" alt="${loan.name}" loading="lazy"></div></div>` : ''}
            <div style="flex:1;min-width:280px">
              <p class="section-label">${dealLabel}</p>
              <h2 class="section-heading" style="font-size:1.8rem">${loan.name}</h2>
              ${c.location ? `<p style="color:var(--slate-400);margin-bottom:1.5rem;font-family:var(--font-display)">${c.location}</p>` : ''}
              <div class="content-text">${renderRichtext(c.description)}</div>
            </div>
          </div>
          <div class="reveal" style="margin-top:3rem;text-align:center">
            <a href="/funded-loans" class="btn-primary" style="margin-right:1rem">&larr; ${SITE.nav_label_funded || 'All Funded Loans'}</a>
            <a href="/contact" class="btn-primary" style="background:transparent;border:1px solid var(--forest);color:var(--forest)">${SITE.funded_cta_button || 'Discuss a Deal'}</a>
          </div>
        </div>
      </section>
      ${renderFooter()}`;

    document.getElementById('app').innerHTML = html;
    updateMeta({
      title: `${loan.name} — ${SITE.site_name || 'Sherpa Capital Group'}`,
      description: `${dealLabel} — ${loan.name}${c.location ? '. ' + c.location + '.' : ''} Commercial real estate financing by ${SITE.site_name || 'Sherpa Capital Group'}.`,
      path: `/funded-loans/${slug}`,
      image: imgRaw || undefined,
    });
    injectBreadcrumbs([
      { name: 'Home', url: DOMAIN + '/' },
      { name: 'Funded Loans', url: DOMAIN + '/funded-loans' },
      { name: loan.name, url: DOMAIN + '/funded-loans/' + slug }
    ]);
    initScrollBehavior();
    initRevealAnimations();
  } catch (err) {
    window.history.replaceState({}, '', '/funded-loans');
    renderFundedLoansPage();
  }
}

// ── Weebly URL aliases ──
const WEEBLY_REDIRECTS = {
  'cre-bridge-loan-atlanta-georgia---hotel-acquisition': 'funded-loans/cre-bridge-loan-atlanta-georgia-hotel-acquisition',
  'cre-bridge-loan-buffalo-new-york---mixed-use-refinance': 'funded-loans/cre-bridge-loan-buffalo-new-york-mixed-use-refinance',
  'chicago---acquisition-and-rehab-loan-of-2-apartment-buildings': 'funded-loans/chicago-acquisition-and-rehab-loan-of-2-apartment-buildings-',
  'chicago-bucktown---condo-building-construction-financing': 'funded-loans/chicago-bucktown-condo-building-ground-up-construction-finan',
  'chicago-bridgeport--construction-financing-for-single-family-home-development': 'funded-loans/chicago-bridgeport-construction-financing-for-single-family-',
  'chicago-north-side---broken-condo-bulk-acquisition-and-rehab-loan': 'funded-loans/north-side-chicago-broken-condo-bulk-acquisition-and-rehab-l',
  'chicago-north-side---acquisition-and-rehab-financing---5-single-family-homes': 'funded-loans/chicago-north-side-acquisition-and-rehab-financing-5-single-',
  'chicago-north-side---spec-single-family-home-construction-financing': 'funded-loans/chicago-north-side-spec-single-family-construction-financing',
  'chicago-kinzie-corridorwest-loop-ndash-loft-office-building': 'funded-loans/chicago-kinzie-corridor-west-loop-loft-office-building',
  'southside---bronzeville---chicago---broken-condo-financing': 'funded-loans/southside-bronzeville-chicago-broken-condo-financing',
  'south-suburb-of-chicago---luxury-home-acquisition-and-rehab': 'funded-loans/south-suburb-of-chicago-luxury-home-acquisition-and-rehab',
  'south-suburb-of-chicago---acquisition-and-rehab-loan-of-apartment-building': 'funded-loans/south-suburb-of-chicago-acquisition-and-rehab-loan-of-apartm',
  'northwest-suburbs-of-chicago--spec-single-family-construction-financing': 'funded-loans/northwest-suburbs-of-chicago-spec-single-family-construction',
  'palatine-ndash-land-development-17-improved-lots': 'funded-loans/palatine-land-development-17-improved-lots',
  'western-suburb-of-chicago---refinance-multiple-properties': 'funded-loans/western-suburb-of-chicago-refinance-of-multiple-properties',
  'western-suburb-of-chicago---refinance-of-spec-home': 'funded-loans/western-suburb-of-chicago-refinance-of-spec-home',
  'western-suburb-of-chicago---construction-financing-new-homes': 'funded-loans/western-suburb-of-chicago-construction-financing-new-homes',
  'western-suburbs-of-chicago---acquisition-and-rehab-financing---3-single-family-homes': 'funded-loans/western-suburbs-of-chicago-acquisition-and-rehab-financing-3',
  'chicago-lincoln-park---elston-corridor-ndash-office-building-developmen-loan': 'funded-loans/chicago-lincoln-park-elston-corridor-office-building-develop',
  'flint-michigan--self-storage-facility': 'funded-loans/flint-michigan-detroit-self-storage-facility',
  'glenview-and-wheaton---acquisition-and-rehab-financing---2-single-family-homes': 'funded-loans/glenview-and-wheaton-acquisition-and-rehab-financing-2-singl',
  'glenview---acquisition-and-rehab-financing---luxury-single-family-home': 'funded-loans/glenview-acquisition-and-rehab-financing-luxury-single-famil',
  'lake-bluff---acquisition-and-rehab-financing---luxury-single-family-home': 'funded-loans/lake-bluff-acquisition-and-rehab-financing-luxury-single-fam',
  'lake-bluff---acquisition-and-rehab-financing---single-family-home': 'funded-loans/lake-bluff-acquisition-and-rehab-financing-single-family-hom',
  'romeoville-ndash-value-add-retail-center': 'funded-loans/romeoville-value-add-retail-center',
  'norwood-park---chicago-northwest-side---acquisition-and-construction-financing': 'funded-loans/norwood-park-chicago-northwest-side-acquisition-and-construc',
  'cre-bridge-loan-cincinatti-ohio-airport---industrial-land-acquisition': 'funded-loans/cre-bridge-loan-cincinatti-ohio-airport-industrial-land-acqu',
  'cre-bridge-loan-el-paso-texas---medical-office-building': 'funded-loans/cre-bridge-loan-el-paso-texas-medical-office-building',
  'cre-bridge-loan-fort-myers-florida---motel-acquisition-and-rehab-loan': 'funded-loans/cre-bridge-loan-fort-myers-florida-motel-acquisition-and-reh',
  'bridge-land-loan---buffalo-new-york': 'funded-loans/bridge-land-loan-buffalo-new-york',
  'office-bridge-acquisition-loan-ndash-oak-brook-illinois': 'funded-loans/office-bridge-acquisition-loan-oak-brook-illinois',
  'chicago-bucktown---wicker-park---luxury-home-construction-financing': 'funded-loans/chicago-lakeview-wrigleyville-acquisition-loan-for-mixed-use',
};

// ── Team page ──
async function renderTeamPage() {
  const [pageResp, membersResp] = await Promise.all([
    fetch(`${API_BASE}/stories/the-team?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}`).then(r => r.json()),
    fetch(`${API_BASE}/stories?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}&starts_with=team/&per_page=20`).then(r => r.json()),
  ]);

  const story = pageResp.story;
  const members = membersResp.stories || [];

  const body = story.content.body || [];
  let sections = body.map(blok => {
    const renderer = renderers[blok.component];
    return renderer ? renderer(blok) : '';
  }).join('\n');

  const memberCards = members.map(m => {
    const c = m.content;
    const photo = sbWebP(c.photo?.filename || '');
    const nameParts = [];
    if (c.font_family) nameParts.push(`font-family:${c.font_family}`);
    nameParts.push('font-size:' + (c.font_size || '2.2rem'));
    if (c.font_color) nameParts.push(`color:${c.font_color}`);
    const nameStyle = ` style="${nameParts.join(';')}"`;
    return `
    <div class="grid-2 reveal" style="gap:4rem;margin-bottom:4rem"${sbAttr(c)}>
      <div class="img-frame" style="aspect-ratio:3/4">
        ${photo ? `<img src="${photo}" alt="${m.name}" loading="lazy">` : ''}
      </div>
      <div>
        <p class="section-label">${c.role || ''}</p>
        <h2 class="section-heading"${nameStyle}>${m.name.split(' ')[0]} <em>${m.name.split(' ').slice(1).join(' ')}</em></h2>
        <div class="content-text">${renderRichtext(c.bio)}</div>
        ${c.email ? `<p style="font-size:0.85rem;color:var(--slate-400)"><a href="mailto:${c.email}" style="color:var(--forest);text-decoration:none">${c.email}</a> &nbsp;|&nbsp; P ${c.phone || ''}${c.linkedin ? ` &nbsp;|&nbsp; <a href="${c.linkedin}" target="_blank" rel="noopener" class="linkedin-icon">${linkedinIcon(16)}</a>` : ''}</p>` : ''}
      </div>
    </div>`;
  }).join('');

  const memberSection = `<section class="section bg-white"><div class="container">${memberCards}</div></section>`;

  const allSections = sections.split('</section>');
  const lastSection = allSections.pop();
  const ctaSection = allSections.pop() + '</section>';
  const beforeCta = allSections.join('</section>') + '</section>';

  document.getElementById('app').innerHTML = renderNav('the-team') + beforeCta + memberSection + ctaSection + renderFooter();
  updateMeta(PAGE_META['the-team']);
  injectBreadcrumbs([
    { name: 'Home', url: DOMAIN + '/' },
    { name: 'The Team', url: DOMAIN + '/the-team' }
  ]);
  initScrollBehavior();
  initRevealAnimations();
}

// ── SEO: dynamic meta tags ──
const DOMAIN = 'https://www.sherpacapitalgroup.com';
const PAGE_META = {
  home: {
    title: 'Sherpa Capital Group — Boutique Private Equity Real Estate',
    description: 'Boutique private equity real estate. Bridge debt and equity investments secured by commercial real estate across Chicago\'s most dynamic neighborhoods. Since 2010.',
  },
  'the-team': {
    title: 'The Team — Sherpa Capital Group',
    description: 'Meet Ashish Parikh and Rahul Shah, Managing Principals of Sherpa Capital Group with over 35 years of combined real estate lending experience.',
  },
  'loan-parameters': {
    title: 'Bridge Loans — Sherpa Capital Group',
    description: 'Bridge loan parameters: $1M–$20M, 12–24 month terms, up to 75% LTV. Fast closings for acquisition, construction, rehab, and refinance across all commercial property types.',
  },
  'funded-loans': {
    title: 'Funded Loans — Sherpa Capital Group',
    description: 'Browse 37+ funded commercial real estate transactions including bridge loans, acquisition financing, construction loans, and equity investments across the US.',
  },
  equity: {
    title: 'Equity Investments — Sherpa Capital Group',
    description: 'Sherpa Capital Group provides equity co-investments alongside experienced sponsors for value-add and opportunistic commercial real estate projects.',
  },
  contact: {
    title: 'Contact — Sherpa Capital Group',
    description: 'Contact Sherpa Capital Group for bridge loans, equity investments, and commercial real estate financing. 1720 W. Division Street, Chicago, IL 60622.',
  },
};

// ── Structured data: BreadcrumbList JSON-LD ──
function injectBreadcrumbs(items) {
  // Remove any previous breadcrumb JSON-LD
  const prev = document.getElementById('breadcrumb-jsonld');
  if (prev) prev.remove();
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': item.url
    }))
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'breadcrumb-jsonld';
  script.textContent = JSON.stringify(breadcrumb);
  document.head.appendChild(script);
}

function updateMeta(opts) {
  const title = opts.title || SITE.site_name || 'Sherpa Capital Group';
  const desc = opts.description || PAGE_META.home.description;
  const path = opts.path || window.location.pathname;
  const image = sbWebP(opts.image || 'https://a.storyblok.com/f/291512806597839/719069/0f966975e7/hero-home.jpg');
  const url = DOMAIN + path;

  document.title = title;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', desc);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);

  const ogMap = { 'og:title': title, 'og:description': desc, 'og:url': url, 'og:image': image };
  Object.entries(ogMap).forEach(([prop, val]) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (el) el.setAttribute('content', val);
  });
  const twMap = { 'twitter:title': title, 'twitter:description': desc, 'twitter:image': image };
  Object.entries(twMap).forEach(([name, val]) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (el) el.setAttribute('content', val);
  });
}

// ── Router ──
async function loadPage() {
  // Load site settings on first call
  if (!SITE.site_name) await loadSiteSettings();

  let path = window.location.pathname.replace(/\.html$/, '').replace(/^\//, '').replace(/\/$/, '');
  if (!path || path === 'index') path = 'home';

  if (WEEBLY_REDIRECTS[path]) {
    path = WEEBLY_REDIRECTS[path];
    window.history.replaceState({}, '', '/' + path);
  }

  if (path === 'funded-loans') return renderFundedLoansPage();
  if (path === 'the-team') return renderTeamPage();

  if (path.startsWith('funded-loans/')) {
    const slug = path.replace('funded-loans/', '');
    return renderFundedLoanDetail(slug);
  }

  if (path === 'information') path = 'equity';

  try {
    const resp = await fetch(`${API_BASE}/stories/${path}?token=${STORYBLOK_TOKEN}&version=${SB_VERSION}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    renderPage(data.story);
  } catch (err) {
    document.getElementById('app').innerHTML = `
      ${renderNav(path)}
      <section class="section" style="padding-top:120px;text-align:center">
        <h2>Page not found</h2>
        <p style="margin-top:1rem"><a href="/" class="btn-primary">Go Home</a></p>
      </section>
      ${renderFooter()}`;
  }
}

// ── SPA Navigation ──
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/admin')) {
    e.preventDefault();
    window.history.pushState({}, '', href);
    loadPage();
    window.scrollTo(0, 0);
  }
});
window.addEventListener('popstate', loadPage);

// ── UI Behaviors ──
function initScrollBehavior() {
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
}

function initRevealAnimations() {
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        setTimeout(() => en.target.classList.add('visible'), i * 80);
        ro.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

window.toggleNav = function() {
  const links = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  links.classList.toggle('open');
  toggle.classList.toggle('active');
  document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
};

// ── Init ──
loadPage();
