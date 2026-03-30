/**
 * Sherpa Capital Group — Storyblok Renderer
 * Fetches content from Storyblok CDN API and renders using the Sherpa design system.
 * Supports the Storyblok Visual Editor via data-blok-c attributes.
 */

const STORYBLOK_TOKEN = '0c2CL470mDGLNHiNrQzEsgtt';
const API_BASE = 'https://api.storyblok.com/v2/cdn';
const ASSET_BASE = 'https://a.storyblok.com/f/291512806597839';

// ── Storyblok editable attribute ──
function sbEdit(blok) {
  if (!blok._editable) return '';
  return ' ' + blok._editable.replace('<!--#storyblok#', 'data-blok-c="').replace('-->', '"');
}

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

// ── Component renderers ──
const renderers = {
  hero(blok) {
    const bgImg = blok.background_image?.filename || 'https://a.storyblok.com/f/291512806597839/719069/0f966975e7/hero-home.jpg';
    const logo = blok.show_logo ? `<div class="hero-logo-mark"><img src="https://a.storyblok.com/f/291512806597839/38141/e7e79645aa/logo.png" alt="Sherpa Capital Group" style="height:200px;width:auto;filter:brightness(0) invert(1);"></div>` : '';
    const label = blok.label ? `<p class="hero-sub">${blok.label}</p>` : '';
    return `
    <section class="page-hero${blok.show_logo ? ' tall' : ''}"${sbAttr(blok)}>
      <div class="page-hero-bg" style="background-image:url('${bgImg}')"></div>
      <div class="page-hero-content">
        ${logo}
        ${label}
        <h1 class="hero-headline">${blok.headline || ''}<br><em>${blok.headline_italic || ''}</em></h1>
        ${blok.show_logo ? '<div class="hero-divider"></div>' : ''}
        ${blok.tagline ? `<p class="hero-tagline">${blok.tagline}</p>` : ''}
      </div>
    </section>`;
  },

  about_section(blok) {
    const img = blok.image?.filename ? `
      <div class="img-frame reveal" style="aspect-ratio:4/5">
        <div class="img-accent"></div>
        <img src="${blok.image.filename}" alt="" loading="lazy">
      </div>` : '';
    const stats = (blok.stats || []).map(s => `
      <div${sbAttr(s)}>
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
    return `
    <section class="section bg-white"${sbAttr(blok)}>
      <div class="container">
        <div class="grid-2">
          <div class="reveal">
            <p class="section-label">${blok.label || ''}</p>
            <h2 class="section-heading">${blok.heading || ''}<br><em>${blok.heading_italic || ''}</em></h2>
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
    return `
    <section class="section bg-dark"${sbAttr(blok)}>
      <div class="container">
        <p class="section-label reveal">${blok.label || ''}</p>
        <h2 class="section-heading reveal">${blok.heading || ''} <em>${blok.heading_italic || ''}</em></h2>
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
    return `
    <section class="section bg-cream"${sbAttr(blok)}>
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
    return `
    <section class="section bg-dark" style="text-align:center"${sbAttr(blok)}>
      <div class="container" style="max-width:700px">
        <p class="section-label reveal">${blok.label || ''}</p>
        <h2 class="section-heading reveal" style="color:var(--white)">${blok.heading || ''}<br><em>${blok.heading_italic || ''}</em></h2>
        ${blok.description ? `<p class="reveal" style="color:var(--slate-400);max-width:500px;margin:0 auto 2rem">${blok.description}</p>` : ''}
        ${blok.button_text ? `<p class="reveal"><a href="${blok.button_link || '#'}" class="btn-primary">${blok.button_text}</a></p>` : ''}
      </div>
    </section>`;
  },

  text_section(blok) {
    const bg = blok.background === 'dark' ? 'bg-dark' : blok.background === 'cream' ? 'bg-cream' : 'bg-white';
    const width = blok.max_width === 'narrow' ? '800px' : '1200px';
    return `
    <section class="section ${bg}"${sbAttr(blok)}>
      <div class="container" style="max-width:${width}">
        <div class="content-text reveal" style="text-align:center;font-size:1.1rem">
          ${renderRichtext(blok.body)}
        </div>
      </div>
    </section>`;
  },
};

// ── Page renderer ──
function renderNav(currentSlug) {
  const links = [
    ['/', 'Home'],
    ['/the-team', 'The Team'],
    ['/loan-parameters', 'Bridge Loans'],
    ['/funded-loans', 'Funded Loans'],
    ['/equity', 'Equity'],
    ['/contact', 'Contact'],
  ];
  const navLinks = links.map(([href, label]) => {
    const active = currentSlug === href.replace('/', '') || (currentSlug === 'home' && href === '/') ? ' class="active"' : '';
    return `<li><a href="${href}"${active}>${label}</a></li>`;
  }).join('\n');

  return `<nav class="nav scrolled" id="nav">
    <a href="/" class="nav-logo"><img src="https://a.storyblok.com/f/291512806597839/38141/e7e79645aa/logo.png" alt="Sherpa Capital Group" style="height:70px;width:auto;filter:brightness(0) invert(1);"></a>
    <ul class="nav-links" id="navLinks">${navLinks}</ul>
    <button class="nav-toggle" onclick="toggleNav()"><span></span><span></span><span></span></button>
  </nav>`;
}

function renderFooter() {
  return `<footer class="footer"><div class="footer-inner">
    <p class="footer-copy">&copy; 2026 Sherpa Capital Group LLC. All rights reserved.</p>
    <ul class="footer-links">
      <li><a href="/">Home</a></li>
      <li><a href="/loan-parameters">Bridge Loans</a></li>
      <li><a href="/equity">Equity</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div></footer>`;
}

function renderPage(story) {
  const body = story.content.body || [];
  const sections = body.map(blok => {
    const renderer = renderers[blok.component];
    return renderer ? renderer(blok) : `<div style="padding:2rem;background:#fee;text-align:center">Unknown component: ${blok.component}</div>`;
  }).join('\n');

  document.getElementById('app').innerHTML = renderNav(story.slug) + sections + renderFooter();
  document.title = `${story.name} — Sherpa Capital Group`;

  // Init animations
  initScrollBehavior();
  initRevealAnimations();
}

// ── Funded Loans page (special: pulls from folder) ──
async function renderFundedLoansPage() {
  const [pageResp, loansResp] = await Promise.all([
    fetch(`${API_BASE}/stories/funded-loans?token=${STORYBLOK_TOKEN}&version=draft`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/stories?token=${STORYBLOK_TOKEN}&version=draft&starts_with=funded-loans/&per_page=50`).then(r => r.json()),
  ]);

  const loans = loansResp.stories || [];
  const cards = loans.map(loan => {
    const c = loan.content;
    const img = c.image?.filename || '';
    return `
    <div class="funded-card"${sbAttr(c)}>
      ${img ? `<img src="${img}" alt="${loan.name}" loading="lazy" onerror="this.style.display='none'">` : ''}
      <div class="funded-overlay">
        <div class="funded-label">${c.deal_type ? c.deal_type.replace('_',' ').toUpperCase() : 'BRIDGE LOAN'}</div>
        <div class="funded-title">${loan.name}</div>
        <div style="font-size:0.75rem;color:var(--slate-400);margin-top:0.2rem">${c.location || ''}</div>
      </div>
    </div>`;
  }).join('');

  const html = `
    ${renderNav('funded-loans')}
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image:url('https://a.storyblok.com/f/291512806597839/482907/8ff4682c73/hero-funded.jpg')"></div>
      <div class="page-hero-content">
        <p class="hero-sub">Our Portfolio</p>
        <h1 class="hero-headline">Funded <em>Loans</em></h1>
      </div>
    </section>
    <section class="section bg-cream">
      <div class="container">
        <p class="section-label reveal">Recently Funded</p>
        <h2 class="section-heading reveal">Selected <em>Transactions</em></h2>
        <div class="funded-grid reveal">${cards}</div>
      </div>
    </section>
    <section class="section bg-dark" style="text-align:center">
      <div class="container" style="max-width:700px">
        <p class="section-label reveal">Have a Deal?</p>
        <h2 class="section-heading reveal" style="color:var(--white)">Ready to Discuss<br><em>Your Next Deal?</em></h2>
        <p class="reveal"><a href="/contact" class="btn-primary">Contact Us</a></p>
      </div>
    </section>
    ${renderFooter()}`;

  document.getElementById('app').innerHTML = html;
  document.title = 'Funded Loans — Sherpa Capital Group';
  initScrollBehavior();
  initRevealAnimations();
}

// ── Team page (special: pulls team members) ──
async function renderTeamPage() {
  const [pageResp, membersResp] = await Promise.all([
    fetch(`${API_BASE}/stories/the-team?token=${STORYBLOK_TOKEN}&version=draft`).then(r => r.json()),
    fetch(`${API_BASE}/stories?token=${STORYBLOK_TOKEN}&version=draft&starts_with=team/&per_page=20`).then(r => r.json()),
  ]);

  const story = pageResp.story;
  const members = membersResp.stories || [];

  // Render page sections (hero, intro text)
  const body = story.content.body || [];
  let sections = body.map(blok => {
    const renderer = renderers[blok.component];
    return renderer ? renderer(blok) : '';
  }).join('\n');

  // Insert team members before the last section (CTA)
  const memberCards = members.map(m => {
    const c = m.content;
    const photo = c.photo?.filename || '';
    return `
    <div class="grid-2 reveal" style="gap:4rem;margin-bottom:4rem"${sbAttr(c)}>
      <div class="img-frame" style="aspect-ratio:3/4">
        ${photo ? `<img src="${photo}" alt="${m.name}" loading="lazy">` : ''}
      </div>
      <div>
        <p class="section-label">${c.role || ''}</p>
        <h2 class="section-heading" style="font-size:2.2rem">${m.name.split(' ')[0]} <em>${m.name.split(' ').slice(1).join(' ')}</em></h2>
        <div class="content-text">${renderRichtext(c.bio)}</div>
        ${c.email ? `<p style="font-size:0.85rem;color:var(--slate-400)"><a href="mailto:${c.email}" style="color:var(--forest);text-decoration:none">${c.email}</a> &nbsp;|&nbsp; P ${c.phone || ''}</p>` : ''}
      </div>
    </div>`;
  }).join('');

  // Insert members section
  const memberSection = `<section class="section bg-white"><div class="container">${memberCards}</div></section>`;

  // Split sections: everything before CTA + members + CTA
  const allSections = sections.split('</section>');
  const lastSection = allSections.pop(); // empty string after last </section>
  const ctaSection = allSections.pop() + '</section>';
  const beforeCta = allSections.join('</section>') + '</section>';

  document.getElementById('app').innerHTML = renderNav('the-team') + beforeCta + memberSection + ctaSection + renderFooter();
  document.title = 'The Team — Sherpa Capital Group';
  initScrollBehavior();
  initRevealAnimations();
}

// ── Router ──
async function loadPage() {
  let path = window.location.pathname.replace(/\.html$/, '').replace(/^\//, '').replace(/\/$/, '');
  if (!path || path === 'index') path = 'home';

  // Special pages with folder content
  if (path === 'funded-loans') return renderFundedLoansPage();
  if (path === 'the-team') return renderTeamPage();

  // Alias
  if (path === 'information') path = 'equity';

  try {
    const resp = await fetch(`${API_BASE}/stories/${path}?token=${STORYBLOK_TOKEN}&version=draft`);
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
