# PLATINA HOTEL — Complete Website Documentation

## 📁 File & Folder Structure

```
platina-hotel/
├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← All custom styles, variables, animations
├── js/
│   └── main.js         ← All JavaScript: nav, form, gallery, counters, etc.
├── images/             ← Drop your own images here (uses Unsplash CDN by default)
│   └── (your photos)
└── README.md           ← This file
```

---

## 🎨 Design Details

### Fonts (Google Fonts)
| Role       | Font                | Weights          |
|------------|---------------------|------------------|
| Headings   | Playfair Display    | 400, 700, Italic |
| Body text  | Poppins             | 300, 400, 500, 600 |
| Nav / caps | Montserrat          | 500, 600, 700    |

### Colour Palette
| Variable        | Hex       | Usage                         |
|-----------------|-----------|-------------------------------|
| `--primary`     | `#e8533a` | CTA buttons, accents, dividers |
| `--primary-h`   | `#d44428` | Hover state of primary        |
| `--dark`        | `#2b2b2b` | Welcome section bg, stats bg  |
| `--dark2`       | `#333333` | Footer background             |
| `--light-bg`    | `#f9f9f9` | Contact info section bg       |
| `--text`        | `#555555` | Body text                     |
| `--heading`     | `#222222` | Section titles                |
| `--gold`        | `#c8a96e` | Decorative accent             |
| `--border`      | `#e5e5e5` | Form & card borders           |

---

## 🧩 Sections

1. **Navbar** — Fixed, transparent → white on scroll. Hamburger menu on mobile.
2. **Hero** — Full-viewport, coral/salmon gradient with overlay image. Animated heading + CTA button.
3. **Facilities** — 3-column image cards with hover tilt, overlay label, and zoom.
4. **Stats Strip** — Dark bg, 4 animated counters (guests, rooms, satisfaction, service).
5. **Welcome / About** — Split grid: hotel images left | dark text panel right.
6. **Services** — 3×2 icon grid with flip-colour hover on icons.
7. **Gallery Strip** — 5-column image strip with lightbox (keyboard navigation: ←→ Esc).
8. **Booking Form** — Validated form with date pickers, selects, and success animation.
9. **Contact Info** — 4-column strip with address, phone, emails, support.
10. **Footer** — 4-column: brand + social | newsletter | Instagram grid | follow us links.

---

## ⚡ JavaScript Features (main.js)

| Feature              | Description                                          |
|----------------------|------------------------------------------------------|
| Preloader            | Spinning ring; fades out after `window.load`         |
| Navbar               | Transparent → white + shadow after 60px scroll       |
| Hamburger            | Full-screen overlay nav for mobile                   |
| Scroll Progress Bar  | Top-of-viewport colored bar tracking page position   |
| Back to Top          | Appears after 400px scroll, smooth scroll to top     |
| Scroll Reveal        | IntersectionObserver — fade + slide elements in      |
| Active Nav Links     | IntersectionObserver highlights current section link |
| Animated Counters    | Counts up from 0 when stat section enters viewport   |
| Gallery Lightbox     | Open/close, previous/next, keyboard support          |
| Booking Form         | Client-side validation, date constraints, submission UX |
| Newsletter           | Email validation + toast on submit                   |
| Parallax             | Subtle hero background Y-axis drift on scroll        |
| Card Tilt            | 3D perspective tilt on facility cards (mousemove)    |
| Toast Notifications  | Animated slide-in confirmation messages              |

---

## 📱 Responsive Breakpoints

| Breakpoint  | Behaviour                                      |
|-------------|------------------------------------------------|
| ≥ 1024px    | Full desktop layout, all columns visible       |
| 768–1024px  | Footer & contact switch to 2-col grid          |
| ≤ 768px     | Hamburger nav, stacked sections, 2-col gallery |
| ≤ 480px     | Full single-column, 2-col gallery hidden items |

---

## 🚀 How to Run

### Option A — Open directly
Double-click `index.html` → opens in browser. Works out of the box (uses CDN links).

### Option B — Local server (recommended for best results)
```bash
cd platina-hotel
npx serve .
# or
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

### Option C — Deploy to Netlify
1. Drag the `platina-hotel/` folder to [netlify.app/drop](https://app.netlify.com/drop)
2. Live in 10 seconds — no build step needed.

---

## 🖼️ Adding Your Own Images

Replace the Unsplash URLs in `index.html` with local paths:
```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-..." />

<!-- After (with local file) -->
<img src="images/pool.jpg" />
```
Save your images into the `images/` folder.

---

## 📦 External Libraries Used

| Library        | Version | Purpose                  | CDN |
|----------------|---------|--------------------------|-----|
| Bootstrap      | 5.3.2   | Grid, utilities          | jsDelivr |
| Font Awesome   | 6.4.2   | Icons                    | cdnjs |
| Google Fonts   | —       | Typography               | fonts.googleapis.com |

No npm, no build step — pure HTML/CSS/JS.

---

## ✅ Browser Support
Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, mobile browsers.
