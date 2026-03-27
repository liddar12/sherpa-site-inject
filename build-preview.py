"""
Build a multi-page static preview site from the injection code.
Each page is a standalone HTML file that renders exactly what the injection would show.
"""
import re

with open('/home/user/workspace/sherpa-injection-code.html', 'r') as f:
    source = f.read()

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', source, re.DOTALL)
css = css_match.group(1).strip() if css_match else ''

# Extract the JS (the full IIFE with page content map)
js_match = re.search(r'<script>(.*?)</script>', source, re.DOTALL)
js_full = js_match.group(1).strip() if js_match else ''

# Extract page content from the PAGES map
# Each entry: "/path": `...content...`
pages_raw = re.findall(r'"(/[^"]*)":\s*`(.*?)`(?=\s*,?\s*"(?:/[^"]*)":\s*`|\s*\};\s*$)', js_full, re.DOTALL)

# Build a cleaner extraction - get each page's HTML content
page_map = {}
# Find the PAGES object
pages_block = re.search(r'var PAGES = \{(.*?)\};', js_full, re.DOTALL)
if pages_block:
    block = pages_block.group(1)
    # Split on route keys
    entries = re.split(r'\s*"(/[^"]*)":\s*`', block)
    # entries[0] is empty, then alternating: path, content`...
    i = 1
    while i < len(entries) - 1:
        path = entries[i]
        # Content ends at the closing backtick
        content = entries[i+1]
        # Remove trailing backtick and comma
        content = re.sub(r'`\s*,?\s*$', '', content)
        page_map[path] = content.strip()
        i += 2

print(f"Found {len(page_map)} pages: {list(page_map.keys())}")

# Extract nav links from the inject() function
nav_match = re.search(r"var navLinks = \[(.*?)\];", js_full, re.DOTALL)
nav_links = []
if nav_match:
    pairs = re.findall(r"\['([^']*)',\s*'([^']*)'\]", nav_match.group(1))
    nav_links = pairs

print(f"Nav links: {nav_links}")

# Extract footer HTML pattern
footer_match = re.search(r"var footerHtml = '(.*?)';", js_full, re.DOTALL)
footer_html = ''
if footer_match:
    footer_html = footer_match.group(1).replace("' +\n      '", "").replace("' +\n    '", "").replace("\\'", "'")

# Build footer manually since the regex is fragile
footer_html = '''<footer class="footer"><div class="footer-inner">
<p class="footer-copy">&copy; 2026 Sherpa Capital Group LLC. All rights reserved.</p>
<ul class="footer-links">
<li><a href="index.html">Home</a></li>
<li><a href="loan-parameters.html">Bridge Loans</a></li>
<li><a href="equity.html">Equity</a></li>
<li><a href="contact.html">Contact</a></li>
</ul></div></footer>'''

# Map routes to filenames for the preview
route_to_file = {
    '/': 'index.html',
    '/the-team': 'the-team.html',
    '/loan-parameters': 'loan-parameters.html',
    '/funded-loans': 'funded-loans.html',
    '/equity': 'equity.html',
    '/contact': 'contact.html',
}

# Also create information.html that shows equity content
route_to_file['/information'] = 'information.html'
if '/information' not in page_map and '/equity' in page_map:
    page_map['/information'] = page_map['/equity']

# Fix internal links in content to point to .html files instead of bare paths
def fix_links(html):
    """Convert /path links to path.html for static site"""
    for route, filename in route_to_file.items():
        if route == '/':
            # Home link: href="/" -> href="index.html"
            html = html.replace('href="/"', 'href="index.html"')
        else:
            html = html.replace(f'href="{route}"', f'href="{filename}"')
    return html

# Build nav HTML for each page
def build_nav(active_path):
    links = []
    for path, label in nav_links:
        filename = route_to_file.get(path, 'index.html')
        active = ' class="active"' if path == active_path else ''
        links.append(f'<li><a href="{filename}"{active}>{label}</a></li>')
    
    return f'''<nav class="nav scrolled" id="nav">
<a href="index.html" class="nav-logo"><img src="assets/logo.png" alt="Sherpa Capital Group" style="height:50px;width:auto;filter:brightness(0) invert(1);"></a>
<ul class="nav-links" id="navLinks">
{chr(10).join(links)}
</ul>
<button class="nav-toggle" onclick="toggleNav()"><span></span><span></span><span></span></button>
</nav>'''

# Build each page
for route, content in page_map.items():
    filename = route_to_file.get(route)
    if not filename:
        continue
    
    nav_html = build_nav(route)
    page_content = fix_links(content)
    footer = fix_links(footer_html)
    
    # Fix asset paths - they reference CDN in the injection, keep as relative for preview
    page_content = page_content.replace(
        'https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/assets/',
        'assets/'
    )
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sherpa Capital Group — Preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
{css}
/* Preview mode: force all reveals visible */
.reveal {{ opacity: 1 !important; transform: none !important; }}
/* Preview banner */
.preview-banner {{ position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; background: #2E7D32; color: white; text-align: center; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 12px; }}
.preview-banner a {{ color: white; text-decoration: underline; }}
.preview-banner .dismiss {{ cursor: pointer; opacity: 0.7; margin-left: 12px; }}
</style>
</head>
<body>
<div id="sherpa-inject">
{nav_html}
{page_content}
{footer}
</div>

<div class="preview-banner" id="previewBanner">
    &#9888; PREVIEW MODE — This is how the site will look after deploying to Weebly
    <span class="dismiss" onclick="document.getElementById('previewBanner').style.display='none'">&times;</span>
</div>

<script>
// Nav scroll behavior
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {{
  nav.classList.toggle('scrolled', window.scrollY > 60);
}});
// Mobile nav toggle
window.toggleNav = function() {{
  document.getElementById('navLinks').classList.toggle('open');
}};
// Reveal animations
var ro = new IntersectionObserver(function(entries) {{
  entries.forEach(function(en, i) {{
    if (en.isIntersecting) {{
      setTimeout(function() {{ en.target.classList.add('visible'); }}, i * 80);
      ro.unobserve(en.target);
    }}
  }});
}}, {{ threshold: 0.15 }});
document.querySelectorAll('.reveal').forEach(function(el) {{ ro.observe(el); }});
</script>
</body>
</html>'''
    
    outpath = f'/home/user/workspace/sherpa-hosted/preview/{filename}'
    with open(outpath, 'w') as f:
        f.write(html)
    print(f"  Built: preview/{filename} ({len(html):,} bytes)")

# Copy assets to preview directory  
import shutil, os
assets_src = '/home/user/workspace/sherpa-hosted/assets'
assets_dst = '/home/user/workspace/sherpa-hosted/preview/assets'
if os.path.exists(assets_dst):
    shutil.rmtree(assets_dst)
shutil.copytree(assets_src, assets_dst)
print(f"\n  Copied assets/ ({len(os.listdir(assets_dst))} files)")
print("\nPreview site built!")
