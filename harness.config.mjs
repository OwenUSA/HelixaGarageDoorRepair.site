// Per-site harness config -- Helixa Garage Door Repair.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

export default {
  // Points at the LOCAL reference server. Start it from this site root:
  //   node ../_shared/harness/src/serve-reference.mjs
  // It resolves the port from this value, hard-fails on a collision, and prints the served
  // <title> at startup. Verify that title before trusting any capture -- a sibling's server
  // on a shared port answered 200 with the WRONG site and the numbers looked entirely normal.
  referenceOrigin: process.env.REF_ORIGIN || 'http://127.0.0.1:3209',
  devPort: 3109,

  // ref path -> our route. The package keys on the REFERENCE path.
  // Live reference: https://www.crosbyroofing.com/
  routeMap: {
    '/': '/',
    '/about/': '/about',
    '/residential-roofing/': '/services',
    '/contact-us/': '/contact',
  },

  // The reference has NO privacy page -- confirmed, none was found or saved. /privacy is
  // therefore NOVEL by definition, measured by token conformance only. It has nothing to
  // pair against so it cannot be keyed by a reference path, but it must still be built and
  // render-truth gated, hence this explicit list.
  ourRoutes: ['/', '/about', '/services', '/contact', '/privacy'],

  breakpoints: { diff: [390, 768, 1440], extra: [430], canonical: 1440 },

  // ---- segmentation, PROFILED in Prompt 1 from the saved copy --------------------------
  // Reference stack: WordPress, bespoke "Seoteric-Framework" parent theme + "CrosbyRoofing"
  // child theme, on Bootstrap 5.1. NOT a page builder -- no Divi/Elementor/Fusion/WPBakery
  // markers anywhere in the saved HTML.
  //
  // `section` is a TRAP on this reference and is deliberately NOT first:
  //   - /about yields exactly 1 <section> (the whole page above it is <div> bands),
  //   - /contact yields 1, and it is a NESTED Gravity Forms widget, not a band at all,
  //   - the hero (div#heroSlides) and every page banner (div#page-banner) are <div>.
  // Segmenting on it drops 2290px of /about and mistakes a form widget for a top-level band.
  // The real bands are the body's own element children, so that is what we segment on.
  //
  // `body > div` also excludes <aside#moove_gdpr_cookie_info_bar>, the GDPR plugin's
  // position:fixed cookie bar. That is the overlay trap: it is painted at a different
  // document offset per width, so including it re-sorts the band list and shifts every
  // ordinal id after it. It appears on /about only, we ship no cookie banner (D-15), and it
  // is DELETED in the contract.
  //
  // 'main > section' stays FIRST because it is how OUR side segments: every one of our
  // bands is a <section data-section=...> inside <main>. The reference has no <main>.
  sectionCandidates: ['main > section', 'body > div, body > section', 'section'],

  // EXACT selectors only -- config.mjs REFUSES a [class*=] matcher at startup, because one
  // matched <body class="pb-callbar"> on a sibling and containment-dedup then deleted
  // HEADER and FOOTER from every capture.
  // Bare header/footer are safe HERE and were checked, not assumed: the reference has
  // exactly one <header> and one <footer>, both direct children of <body>, with no nested
  // <header> anywhere (a sibling's Themer wrapped <header> around an inner <header> and the
  // outer one swallowed its own shell bands). Our shell will match that shape.
  chromeSelectors: ['header', 'footer'],
  headerSelector: 'header',
  navToggleSelector: 'button[aria-controls], .navbar-toggler, .menu-toggle, .hamburger',
  drawerSelector: '#navbarText, [data-drawer], .mobile-menu, .nav-drawer',
  ctaSelector: 'a[href^="tel:"], button, [class*=btn], [class*=button]',
  logoSelector: 'header img, .navbar-brand img, .logo img, #logo',
  iconFontFamilies: /fontawesome|font awesome|icomoon|material|gform-icons/i,

  thresholds: { fidelity: 2, struct: 5, token: 0 },
  fidelityMode: 'auto',

  tokenSources: ['app/globals.css', 'app/tokens.css', 'styles/tokens.css'],
  contractPath: 'docs/sections.md',
  reportPath: 'docs/divergence.md',
  copyModulePath: 'content/copy.ts',

  industryAllowlist: [
    'garage door', 'torsion spring', 'extension spring', 'opener', 'cable', 'roller',
    'track', 'panel', 'off-track', 'remote', 'keypad', 'sensor', 'weather seal',
    'residential', 'commercial', 'same-day', 'free estimate', 'repair', 'installation',
    'replacement',
  ],
  gramN: 5,
  trigramMax: 0.15,
  lengthTolerance: 0.1,

  // ---- palette (merged Prompt 5+9) ---------------------------------------------------
  // TARGET PRIMARY HUE WINDOW FOR THIS SITE: 292-315 (magenta / purple)
  //
  // The fleet's hue space is nearly full. Seven sites already hold 46, 150, 184, 217, 252,
  // 270 and 332, which at ~30 degrees of separation leaves roughly four usable windows for
  // the four sites being added. Each new site is therefore assigned one, rather than told
  // to avoid a list -- "avoid these seven" is unsatisfiable guidance at this density.
  //
  // Land the winning primary inside the window above. Steer the masterSeed to get there;
  // never touch the selection rule, which is what keeps the CTA the highest-contrast
  // element. Report how many seeds you tried. Note the auto-selector is structurally biased
  // toward magenta accents -- at fixed OKLCH L/C the lowest luminance sits near hue 300-360
  // -- so seeds landing there are common and must be re-rolled unless that IS your window.
  masterSeed: 3109,
  // ---- assets (Prompt 2) -------------------------------------------------------------
  // Provenance per D-09: NOTHING on the REPLACE list is ever downloaded into this repo.
  // The mirror under reference/assets/ is a measurement artefact and is gitignored.
  // Rules are checked IN ORDER; every `match` is anchored so a lightbox twin
  // (`IMG_8213-e1685546199674`) cannot be swallowed by its thumbnail rule (`IMG_8213`).
  slotRules: [
    // --- shell -----------------------------------------------------------------------
    { match: /^logo@2x$/, id: 'logo-header', sec: 'site-header', prov: 'REPLACE',
      note: 'Their wordmark. Ours is a display-font wordmark; TODO(fact): logo asset (FN-13).' },
    { match: /^logo@3x-white$/, id: 'logo-footer', sec: 'site-footer', prov: 'REPLACE',
      note: 'Their reversed wordmark. Ours is the same wordmark, reversed. TODO(fact): logo asset (FN-13).' },

    // --- home --------------------------------------------------------------------------
    { match: /^crosby-roofing-residential-commercial-services-ga$/, id: 'hero-image',
      sec: 'home-hero', prov: 'REPLACE', note: 'Full-bleed hero photograph.' },
    { match: /^roofing-and-more$/, id: 'home-cta-image', sec: 'home-cta', prov: 'REPLACE',
      note: 'Closing-band photograph; aspect changes across breakpoints.' },
    { match: /^CertainTeed_Logo_Select_Shinglemaster$/, id: 'badge-cert-inline', sec: 'home-why',
      prov: 'REPLACE', note: 'Manufacturer certification badge. TODO(fact): FN-04 — chip at slot dimensions, never an invented credential (D-14).' },
    { match: /^Certainteed-Shingle-Select-Master$/, id: 'badge-cert-panel', sec: 'about-story / contact-main',
      prov: 'REPLACE', note: 'Manufacturer certification badge, panel size. TODO(fact): FN-04 (D-14).' },

    // service-card icons: we ship lucide-react, so no raster asset exists on our side
    { match: /^icon-(repair|residential|commercial|gutters|siding|storm)$/, id: 'icon-service-card',
      sec: 'home-services', prov: 'DELETED',
      note: 'Six bespoke raster service icons. We ship `lucide-react` line icons instead — no raster asset, no placeholder.' },

    // review furniture: D-13 forbids invented ratings and counts
    { match: /^5-stars$/, id: 'badge-5-stars', sec: 'home-reviews', prov: 'DELETED',
      note: 'Five-star graphic. D-13 — no invented rating; the band ships [TESTIMONIAL PLACEHOLDER] blocks.' },
    { match: /^google-reviews$/, id: 'badge-google-reviews', sec: 'home-reviews', prov: 'DELETED',
      note: 'Google Reviews lockup. D-13 — no review count, no third-party review branding.' },

    // --- D-02, the locations tree ------------------------------------------------------
    { match: /^(Augusta-GA|Columbia-SC|Macon-GA|Roofing-Company-in-Columbus)$/, id: 'city-card-photo',
      sec: 'home-locations-grid / about-locations-grid', prov: 'DELETED',
      note: 'City-card photograph in the Meet Our Teams grid. Whole band deleted per D-02.' },

    // --- D-15, the cookie bar ----------------------------------------------------------
    { match: /^gdpr-logo$/, id: 'cookie-bar-logo', sec: '—', prov: 'DELETED',
      note: 'GDPR Cookie Compliance plugin logo. We ship no cookie bar (D-15).' },

    // --- about / services / contact banners --------------------------------------------
    { match: /^A1BE4534-2A82-41AD-8547-D7426AD3B858$/, id: 'about-banner-image',
      sec: 'about-banner', prov: 'REPLACE', note: 'Page-banner photograph.' },
    { match: /^residential-roofing$/, id: 'services-banner-image', sec: 'services-banner',
      prov: 'REPLACE', note: 'Page-banner photograph.' },
    { match: /^8F1D74EC-CDF4-47FA-B8FF-9FE440634A48$/, id: 'contact-banner-image',
      sec: 'contact-banner', prov: 'REPLACE', note: 'Page-banner photograph.' },

    // --- services page body ------------------------------------------------------------
    // Lightbox full-size twins FIRST: they render at 0x0 and must not be mistaken for the
    // thumbnails, which is why every thumbnail rule below is exact-anchored.
    { match: /^(IMG_8213-e\d+|IMG_8909-scaled|IMG_9037-scaled|IMG_9041-scaled|IMG_9972-rotated|Photo_1080295521_.*)$/,
      id: 'lightbox-fullsize-twin', sec: 'services-intro', prov: 'DELETED',
      note: 'Responsive Lightbox full-size twin of a thumbnail; renders 0x0. We ship no lightbox.' },
    { match: /^IMG_8213$/, id: 'services-thumb-1', sec: 'services-intro', prov: 'REPLACE', note: 'Work thumbnail 1 of 5.' },
    { match: /^IMG_8909$/, id: 'services-thumb-2', sec: 'services-intro', prov: 'REPLACE', note: 'Work thumbnail 2 of 5.' },
    { match: /^IMG_9037$/, id: 'services-thumb-3', sec: 'services-intro', prov: 'REPLACE', note: 'Work thumbnail 3 of 5.' },
    { match: /^IMG_9041$/, id: 'services-thumb-4', sec: 'services-intro', prov: 'REPLACE', note: 'Work thumbnail 4 of 5.' },
    { match: /^IMG_9972$/, id: 'services-thumb-5', sec: 'services-intro', prov: 'REPLACE', note: 'Work thumbnail 5 of 5.' },
    { match: /^House6-300x200-1$/, id: 'services-card-image', sec: 'services-grid', prov: 'REPLACE',
      note: 'Service-card photograph; one per card in the eight-card grid.' },
    { match: /^CrosbyRoofingHeder$/, id: 'services-cta-bg', sec: 'services-cta',
      prov: 'REPLACE', note: 'Full-bleed CTA band background; aspect changes hard across breakpoints.' },

    // --- contact -----------------------------------------------------------------------
    { match: /^IMG_0940$/, id: 'contact-photo', sec: 'contact-main', prov: 'REPLACE',
      note: 'Their yard sign. Ours is a generic shop/vehicle slot at the same geometry.' },
  ],
  badgePatterns: [],
  sharedSlots: { 'logo-header': true, 'logo-footer': true, 'badge-cert-panel': true },

  gradientSamples: 5,
};
