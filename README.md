# AURA — Premium Architectural & Interior Photography HTML Template

A commercial-grade, image-first HTML5 website template designed specifically for interior photographers, architectural practices, real estate marketers, and boutique hospitality properties.

---

## Technical Specifications

- **Markup:** Semantic HTML5 conforming to WCAG 2.1 AA accessibility standards.
- **Layout Grid:** Bootstrap 5.3.3 Grid system (`bootstrap.min.css`) for layout, with all custom stylings separated.
- **Styling Core:** Vanilla CSS3 Custom properties (variables) for fast design modifications and themes.
- **Animation Framework:** GSAP 3.x (via CDN) with full Intersection Observer fallbacks for reliability and SEO indexability.
- **Dynamic JavaScript:** Custom modular modules for real-time portfolio masonry filtering, custom calendar input handling, and form validations.

---

## File Structure

```text
/home-interior-photography/
├── index.html                  # Homepage 1 (Cinematic slider look)
├── home-2.html                 # Homepage 2 (Split-screen publication style)
├── portfolio.html              # Portfolio index (Real-time category filter)
├── portfolio-details.html      # Case study layout ("The Courtyard Residence")
├── services.html               # Service deliverables grid, packages, comparison table
├── service-details.html        # Service focus detail sheet
├── blog.html                   # Editorial insights grid and search index
├── blog-details.html           # Reading layout with FAQ accordions
├── contact.html                # Travel zones list, map representation, simple messages
├── shoot-enquiry.html          # Dynamic questionnaire form with validation card
├── login.html                  # Client proofing portal login
├── signup.html                 # Client proofing portal registration
├── 404.html                    # Minimalist error redirect page
│
└── assets/
    ├── css/
    │   ├── bootstrap.min.css   # Minified Bootstrap layout grid only
    │   ├── style.css           # Core layouts, forms, buttons, header/footers
    │   ├── dark.css            # Dark mode overrides
    │   └── animations.css      # Page load, reveals, pans, glow and transition presets
    │
    ├── js/
    │   ├── main.js             # Sticky scroll toggles, mobile drawers, sub-navigation
    │   ├── theme-toggle.js     # Early theme injection loader (blocks rendering flash)
    │   ├── portfolio.js        # Masonry layout builder, category filter, image lightbox
    │   ├── enquiry.js          # Forms validation engine, custom date boundaries
    │   └── animations.js       # GSAP entrance timelines and fallback observers
    │
    └── images/                 # Organized image folders containing local Unsplash photography
```

---

## Customization

### Editing Colors & Fonts
Theme colors and typography parameters are managed via CSS Custom Properties declared in `style.css` and `dark.css`. You can change variables in `:root` to apply global changes instantly:

```css
:root {
  --primary-color: #181818;
  --accent-color: #A67C52;       /* Warm Bronze */
  --bg-color: #F7F6F3;           /* Warm Off-White background */
  
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}
```

### Adding Portfolio Items
To add a new project to the filtered portfolio list:
1. Open `portfolio.html`.
2. Scroll to the `<div id="portfolioSourceContainer" style="display: none;">` container.
3. Insert a new card structure specifying the filter category in `data-category`:

```html
<div class="portfolio-card-source" data-category="architecture">
  <a href="assets/images/architecture/your-image.webp" data-lightbox="gallery" data-caption="Your description." class="portfolio-img-wrapper">
    <img src="assets/images/architecture/your-image.webp" alt="Project name">
  </a>
  <div class="portfolio-meta">
    <span class="portfolio-category">Architecture — Location</span>
    <h3 class="portfolio-title"><a href="portfolio-details.html">Project Title</a></h3>
  </div>
</div>
```

---

## Quality Rules Followed

1. **Accessibility (WCAG 2.1 AA):** All interactive buttons and input tags contain descriptive labels or `aria-*` tags. Visible focus borders (`*:focus-visible`) match styling rules.
2. **Zero FOUC (Flash of Unstyled Content):** The `theme-toggle.js` executes inside the document `<head>` prior to visual compilation, preventing theme flashes on page loads.
3. **No Layout Shifts:** Explicit image proportions and flexible layout wrappers avoid layout shifts.
