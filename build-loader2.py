import re, json

with open('/home/user/workspace/sherpa-injection-code.html', 'r') as f:
    html = f.read()

# Extract the CSS (between <style> and </style>)
css_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
css_content = css_match.group(1).strip() if css_match else ''

# Extract the JS (between <script> and </script>) - the full IIFE
js_match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
js_content = js_match.group(1).strip() if js_match else ''

# Build the loader: inject fonts + CSS via JS, then run the page injection IIFE
loader_lines = []
loader_lines.append('// Sherpa Capital Group — Full Design Injection Loader')
loader_lines.append('// Hosted on GitHub, loaded via <script> tag in Weebly SEO Header Code')
loader_lines.append('')
loader_lines.append('(function() {')
loader_lines.append('  // 1. Inject Google Fonts')
loader_lines.append('  var h = document.head || document.getElementsByTagName("head")[0];')
loader_lines.append('')
loader_lines.append('  var p1 = document.createElement("link");')
loader_lines.append('  p1.rel = "preconnect"; p1.href = "https://fonts.googleapis.com";')
loader_lines.append('  h.appendChild(p1);')
loader_lines.append('')
loader_lines.append('  var p2 = document.createElement("link");')
loader_lines.append('  p2.rel = "preconnect"; p2.href = "https://fonts.gstatic.com"; p2.crossOrigin = "";')
loader_lines.append('  h.appendChild(p2);')
loader_lines.append('')
loader_lines.append('  var fl = document.createElement("link");')
loader_lines.append('  fl.rel = "stylesheet";')
loader_lines.append('  fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";')
loader_lines.append('  h.appendChild(fl);')
loader_lines.append('')
loader_lines.append('  // 2. Inject CSS')
loader_lines.append('  var st = document.createElement("style");')

# Properly escape CSS for JS string
css_escaped = css_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
loader_lines.append('  st.textContent = "' + css_escaped + '";')
loader_lines.append('  h.appendChild(st);')
loader_lines.append('')
loader_lines.append('  // 3. Run page injection')
loader_lines.append('})();')
loader_lines.append('')
# Append the original IIFE directly — it's already self-contained
loader_lines.append(js_content)

loader = '\n'.join(loader_lines)

with open('/home/user/workspace/sherpa-hosted/sherpa-inject.js', 'w') as f:
    f.write(loader)

print(f"Loader JS created: {len(loader)} bytes")
