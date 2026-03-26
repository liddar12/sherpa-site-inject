# Sherpa Capital Group — Site Redesign Deploy Guide v2

## What This Does

A single `<script>` tag in Weebly's Header Code field loads a JavaScript file
from jsDelivr CDN (backed by your GitHub repo at `liddar12/sherpa-site-inject`). That script:

- Hides all default Weebly elements (header, nav, content, footer)
- Injects a custom nav, hero, content sections, and footer for each of the 7 pages
- Detects which page you're on by URL path and shows the right content
- Loads Google Fonts (Cormorant Garamond + DM Sans)
- Adds scroll animations and responsive mobile nav

All images (logo, heroes, section photos) are self-hosted in the same GitHub repo
and served via jsDelivr CDN. No dependencies on Imgur, Unsplash, or other third parties.

---

## The Code to Paste

```html
<script src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/sherpa-inject.js"></script>
```

---

## Step-by-Step Deploy Instructions

### STEP 1: Log into Weebly
1. Open browser → go to **https://www.weebly.com**
2. Log in with your credentials
3. Click on the **Sherpa Capital Group** site

### STEP 2: Open the Editor
1. You should land in the site editor
2. If you land on the dashboard, click **"Edit Site"**

### STEP 3: Go to Settings → SEO
1. Click **"Settings"** in the top navigation bar
2. Click **"SEO"** in the left sidebar
3. Scroll down to find the **"Header Code"** text box (NOT "Footer Code" — there are two boxes)

### STEP 4: Backup the Existing Header Code
1. Click inside the **Header Code** text box
2. Select all existing content (**Ctrl+A / Cmd+A**)
3. **Copy it** (**Ctrl+C / Cmd+C**) and paste into a text file on your computer — save it as `sherpa-old-header-code.txt`
4. This backup is also available at: https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/BACKUP-header-code-original.html

### STEP 5: Replace with the Script Tag
1. With the Header Code still selected, **delete it**
2. Paste this exact line:

```html
<script src="https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/sherpa-inject.js"></script>
```

3. Click **"Save"** (blue button next to the Header Code box)

### STEP 6: Publish
1. Click **"Publish"** (top-right corner, blue button)
2. Confirm the publish dialog if one appears
3. Wait for "Published" confirmation

### STEP 7: Verify
1. Open a **new incognito/private window** (Ctrl+Shift+N / Cmd+Shift+N)
2. Go to **http://www.sherpacapitalgroup.com** (use HTTP, not HTTPS)
3. You should see the new design
4. If you still see the old design, **hard refresh**: Ctrl+Shift+R / Cmd+Shift+R
5. Check all 7 pages — click through the nav links

> **Note:** HTTPS does not work for this site (TLS handshake fails). Always use `http://` when testing.

---

## Page URL Mapping

| Nav Label | Weebly Page Slug | What Displays |
|---|---|---|
| Home | `/` | Hero + About + Services + Transactions + CTA |
| The Team | `/the-team` | Hero + Ashish Parikh + Rahul Shah bios |
| Bridge Loans | `/loan-parameters` | Hero + Parameters grid + What We Finance |
| Funded Loans | `/funded-loans` | Hero + 37 property cards |
| Equity | `/equity` | Hero + Value-Add + Note Purchases |
| Contact | `/contact` | Hero + Contact info + Email CTA |
| Information | `/information` | → Redirects to Equity content (alias) |

The nav shows 6 links. `/information` is a hidden alias — if anyone has an old bookmark
to that page, they'll see the Equity content instead of a broken page.

---

## How to Undo (Rollback)

If anything goes wrong:

1. Go to **Settings → SEO → Header Code**
2. Delete the `<script>` line
3. Paste back the original CSS from your backup file (`sherpa-old-header-code.txt`), or copy it from:
   https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/BACKUP-header-code-original.html
4. Click **Save → Publish**
5. Open incognito and verify at `http://www.sherpacapitalgroup.com`
6. The site reverts to the pre-redesign look within seconds of publishing

---

## What's Hosted Where

| Asset | Location | Backup |
|---|---|---|
| Injection script (60KB) | jsDelivr CDN → GitHub `sherpa-inject.js` | GitHub repo |
| Mountain logo | jsDelivr CDN → GitHub `assets/logo.png` | GitHub repo |
| 5 hero images | jsDelivr CDN → GitHub `assets/hero-*.jpg` | GitHub repo |
| 3 section images | jsDelivr CDN → GitHub `assets/*.jpg` | GitHub repo |
| 42 property photos | Weebly uploads (`//www.sherpacapitalgroup.com/uploads/...`) | Weebly |
| 2 team headshots | Weebly uploads | Weebly |
| Build source | GitHub `sherpa-injection-code.html` | GitHub repo |
| Build script | GitHub `build-loader2.py` | GitHub repo |
| Old Header Code CSS | GitHub `BACKUP-header-code-original.html` | GitHub repo |

**GitHub repo:** https://github.com/liddar12/sherpa-site-inject
**CDN base:** https://cdn.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/

---

## Future Edits

To update content, images, or styles after deployment:

1. **Clone or pull the repo:**
   ```
   git clone https://github.com/liddar12/sherpa-site-inject.git
   cd sherpa-site-inject
   ```

2. **Edit the source HTML:**
   Edit `sherpa-injection-code.html` — this is the master file containing all CSS, page content, and JS logic.

3. **Rebuild the JS loader:**
   ```
   python3 build-loader2.py
   ```
   This reads `sherpa-injection-code.html` and outputs `sherpa-inject.js`.

4. **Push to GitHub:**
   ```
   git add -A
   git commit -m "describe your change"
   git push
   ```

5. **Purge the CDN cache (required — without this, changes take up to 7 days):**
   ```
   curl https://purge.jsdelivr.net/gh/liddar12/sherpa-site-inject@main/sherpa-inject.js
   ```

6. Changes go live in **1-2 minutes** after purge. No Weebly changes needed.

---

## Known Limitations

- **HTTPS:** The site only works over HTTP. HTTPS returns a TLS error. This is a Weebly/domain configuration issue, not related to the injection.
- **SEO:** All visible content is JavaScript-rendered. Google can index it, but some crawlers may not. The hidden Weebly HTML still exists in the source. Monitor Google Search Console after deploy.
- **Performance:** The script is 60KB served from a global CDN. Adds ~100-300ms to initial load on a typical connection. The script is render-blocking (intentional — prevents flash of unstyled Weebly content).
- **Property images:** The 42 funded loan photos use protocol-relative URLs pointing to Weebly uploads. They work over HTTP and will work over HTTPS if SSL is ever enabled.
