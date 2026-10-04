const fs = require('fs');
const path = require('path');

const root = __dirname;
const pages = [
  'index.html',
  'services.html',
  'family-practice.html',
  'wellness.html',
  'telehealth.html',
  'about.html',
  'contact.html',
];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}

test('all required static pages exist', () => {
  for (const page of pages) {
    assert(fs.existsSync(path.join(root, page)), `${page} is missing`);
  }
});

test('every page has shared navigation, appointment CTA, and footer disclaimer', () => {
  for (const page of pages) {
    const html = read(page);
    assert(html.includes('class="site-header"'), `${page} missing shared header`);
    assert(html.includes('href="services.html"'), `${page} missing services nav link`);
    assert(html.includes('href="contact.html"'), `${page} missing contact nav link`);
    assert(html.includes('Request appointment'), `${page} missing appointment CTA`);
    assert(html.includes('For emergencies, call 911.'), `${page} missing emergency disclaimer`);
  }
});

test('services page exposes keyboard-accessible dynamic service tabs', () => {
  const html = read('services.html');
  const serviceButtons = (html.match(/class="service-tab"/g) || []).length;
  assert(serviceButtons === 3, 'services.html should include exactly three service tabs');
  assert(html.includes('data-service-panel'), 'services.html missing dynamic service panel');
  assert(html.includes('aria-selected="true"'), 'services.html missing selected tab state');
});

test('script implements mobile nav, active nav, services tabs, and testimonial controls', () => {
  const js = read('script.js');
  assert(js.includes('initMobileNav'), 'missing initMobileNav');
  assert(js.includes('initActiveNav'), 'missing initActiveNav');
  assert(js.includes('initServiceTabs'), 'missing initServiceTabs');
  assert(js.includes('initTestimonials'), 'missing initTestimonials');
});

test('css defines professional responsive system and reduced motion path', () => {
  const css = read('styles.css');
  assert(css.includes('--font-sans'), 'missing professional font token');
  assert(css.includes('@media (max-width: 760px)'), 'missing mobile breakpoint');
  assert(css.includes('prefers-reduced-motion'), 'missing reduced-motion media query');
});

test('css uses logo-inspired vibrant brand palette and image composition system', () => {
  const css = read('styles.css');
  assert(css.includes('--logo-blue'), 'missing actual logo blue token');
  assert(css.includes('--logo-magenta'), 'missing actual logo magenta token');
  assert(css.includes('--logo-pale-blue'), 'missing logo pale blue token');
  assert(css.includes('.image-stack'), 'missing layered image-stack design');
  assert(css.includes('.image-badge'), 'missing image badge treatment');
});

test('layout includes additional tablet and small-phone responsive breakpoints', () => {
  const css = read('styles.css');
  assert(css.includes('@media (max-width: 920px)'), 'missing tablet breakpoint');
  assert(css.includes('@media (max-width: 540px)'), 'missing small-phone breakpoint');
});

test('homepage is streamlined around three real services', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const services = ['Primary Care', 'Psychiatric/Behavioural Services', 'Chronic Disease Management'];
  assert(html.includes('lean-home-services'), 'homepage missing streamlined three-service section');
  for (const service of services) {
    assert(html.includes(service), `homepage missing ${service}`);
  }
  assert(!html.includes('brand-energy'), 'homepage should not keep the redundant brand energy section');
  assert(!html.includes('care-cockpit'), 'homepage should not keep the redundant care cockpit section');
  assert(!html.includes('route-band reveal'), 'homepage should not keep repeated route cards');
  assert(!html.includes('service-preview reveal'), 'homepage should not keep duplicate service preview cards');
  assert(!html.includes('Wellness care <span>'), 'homepage should not list wellness as a standalone service card');
  assert(!html.includes('Virtual care <span>'), 'homepage should not list virtual care as a standalone service card');
  assert(css.includes('/* Streamlined three-service homepage cleanup. */'), 'missing streamlined homepage CSS layer');
});

test('services page only exposes the approved three services', () => {
  const html = read('services.html');
  const js = read('script.js');
  const serviceButtons = html.match(/class="service-tab"/g) || [];
  assert(serviceButtons.length === 3, 'services page should include exactly three service tabs');
  for (const service of ['Primary Care', 'Psychiatric/Behavioural Services', 'Chronic Disease Management']) {
    assert(html.includes(service), `services page missing ${service}`);
    assert(js.includes(service), `script service model missing ${service}`);
  }
  for (const retired of ['Weight Management', 'Vitamin Injections', 'Wellness care', 'Virtual care']) {
    assert(!html.includes(retired), `services page still exposes retired service ${retired}`);
  }
});

test('home page keeps concise media and appointment paths without button clutter', () => {
  const html = read('index.html');
  const buttonLinks = html.match(/class="button /g) || [];
  const videoSlides = html.match(/data-slide-video/g) || [];
  assert(buttonLinks.length <= 5, 'homepage has too many prominent buttons');
  assert(videoSlides.length >= 3, 'homepage should retain a simple video carousel');
  assert(html.includes('href="contact.html"'), 'homepage should keep a direct appointment path');
  assert(html.includes('href="services.html"'), 'homepage should keep one services path');
  assert(!html.includes('data-hero-tools'), 'homepage should remove the redundant interactive tool panel');
  assert(!html.includes('data-spotlight-rail'), 'homepage should remove duplicate spotlight rail controls');
});

test('home page header shows the real Leancare logo image', () => {
  const html = read('index.html');
  const headerMatch = html.match(/<header class="site-header"[\s\S]*?<\/header>/);
  assert(headerMatch, 'home page missing site header');
  const header = headerMatch[0];
  assert(header.includes('class="brand-logo"'), 'home header missing visible brand logo image');
  assert(header.includes('https://www.leancarehealth.com/logo.svg'), 'home header should use original Leancare logo asset');
  assert(!header.includes('class="brand-mark"'), 'home header still uses hidden fallback brand mark');
});

test('inner page hero templates use smaller titles and distinct vibrant page styling', () => {
  const css = read('styles.css');
  assert(css.includes('/* Inner page hero personality correction. */'), 'missing inner page hero correction layer');
  assert(css.includes('.page-hero h1, .contact-hero h1'), 'inner page titles need shared scoped sizing');
  assert(css.includes('font-size: clamp(30px, 4vw, 52px);'), 'inner page title size is still too generic/large');
  assert(css.includes('body[data-page="services"] .page-hero'), 'services page missing distinct hero CSS');
  assert(css.includes('body[data-page="family-practice"] .page-hero'), 'family practice page missing distinct hero CSS');
  assert(css.includes('body[data-page="wellness"] .page-hero'), 'wellness page missing distinct hero CSS');
  assert(css.includes('body[data-page="telehealth"] .page-hero'), 'telehealth page missing distinct hero CSS');
  assert(css.includes('body[data-page="about"] .page-hero'), 'about page missing distinct hero CSS');
  assert(css.includes('body[data-page="contact"] .contact-hero'), 'contact page missing distinct hero CSS');
  assert(css.includes('@keyframes page-hero-sheen'), 'inner page hero should have controlled vibrant motion');
});

test('non-home pages use page-specific inspiring hero photo carousels', () => {
  const css = read('styles.css');
  const js = read('script.js');
  const targetPages = ['services.html', 'family-practice.html', 'wellness.html', 'telehealth.html', 'about.html', 'contact.html'];
  for (const page of targetPages) {
    const html = read(page);
    const slides = (html.match(/data-page-hero-slide/g) || []).length;
    assert(html.includes('data-page-hero-carousel'), `${page} missing page hero carousel`);
    assert(slides >= 3, `${page} should include at least three relevant hero photos`);
  }
  assert(!read('index.html').includes('data-page-hero-carousel'), 'homepage should not use the inner-page carousel treatment');
  assert(css.includes('/* Inner page photo carousel layer. */'), 'missing page hero photo carousel CSS');
  assert(css.includes('.page-photo-carousel'), 'missing page photo carousel styling');
  assert(css.includes('@keyframes page-photo-kenburns'), 'missing subtle page photo motion');
  assert(js.includes('initPageHeroCarousels'), 'missing multi-page hero carousel initializer');
});

test('home page header shows the real Leancare logo image', () => {
  const html = read('index.html');
  const headerMatch = html.match(/<header class="site-header"[\s\S]*?<\/header>/);
  assert(headerMatch, 'home page missing site header');
  const header = headerMatch[0];
  assert(header.includes('class="brand-logo"'), 'home header missing visible brand logo image');
  assert(header.includes('https://www.leancarehealth.com/logo.svg'), 'home header should use original Leancare logo asset');
  assert(!header.includes('class="brand-mark"'), 'home header still uses hidden fallback brand mark');
});

test('hero media layers render above backgrounds and do not hide video/photos', () => {
  const css = read('styles.css');
  assert(css.includes('/* Hero media visibility correction. */'), 'missing hero media visibility correction layer');
  assert(css.includes('.page-photo-carousel { z-index: 0; }'), 'page photo carousel should not sit behind the hero background');
  assert(css.includes('.page-hero > :not(.page-photo-carousel), .contact-hero > :not(.page-photo-carousel) { z-index: 2; }'), 'page hero content should sit above visible photos');
  assert(css.includes('.cinematic-card .tab-video { z-index: 2; opacity: 1; visibility: visible; }'), 'hero video should be visible above the card base');
  assert(css.includes('.video-card-carousel .media-slide::after { display: none; }'), 'media slide overlay should not cover the video');
});

test('site-wide typography and cards are reduced and rebalanced with visible page photos', () => {
  const css = read('styles.css');
  assert(css.includes('/* Site-wide typography and card scale correction. */'), 'missing final typography/card scale correction layer');
  assert(css.includes('body { font-size: 15px; }'), 'base font size should be reduced site-wide');
  assert(css.includes('h2 { font-size: clamp(24px, 2.7vw, 38px); }'), 'global h2 scale is still too large');
  assert(css.includes('.page-hero h1, .contact-hero h1 { font-size: clamp(28px, 3.4vw, 44px); }'), 'inner page titles are still oversized');
  assert(css.includes('.feature-grid article, .detail-grid article, .cards-section article, .values-row article, .appointment-grid article { min-height: 170px; padding: 20px; }'), 'card proportions should be tighter after type reduction');
  assert(css.includes('.page-photo-carousel::after { background: linear-gradient(90deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.42) 46%, rgba(255,255,255,0.16) 100%), linear-gradient(135deg, rgba(63, 162, 219, 0.20), rgba(255, 0, 194, 0.14)); }'), 'page hero photo overlays should reveal more of the photos');
});

test('all pages use reliable hero photo carousels and the homepage card uses direct videos', () => {
  const css = read('styles.css');
  const home = read('index.html');
  const innerPages = ['services.html', 'family-practice.html', 'wellness.html', 'telehealth.html', 'about.html', 'contact.html'];
  const homeBgTags = home.match(/<img class="bg-slide[\s\S]*?>/g) || [];
  const homeVideoTags = home.match(/<video class="slide-video"[\s\S]*?<\/video>/g) || [];
  assert(homeBgTags.length === 0, 'homepage should not use background photo carousel photos');
  assert(homeVideoTags.length >= 4, 'homepage right media card should use four direct video slides');
  for (const tag of homeVideoTags) {
    assert(/videos\.pexels\.com\/video-files\//.test(tag), 'homepage video carousel should use direct reliable video URLs');
    assert(!tag.includes('<img'), 'homepage video carousel should not include image slides');
  }
  for (const page of innerPages) {
    const html = read(page);
    const pageHeroTags = html.match(/<img class="page-photo-slide[\s\S]*?>/g) || [];
    assert(pageHeroTags.length >= 3, page + ' should include at least three visible hero carousel photos');
    for (const tag of pageHeroTags) {
      assert(!tag.includes('www.leancarehealth.com/_next/image'), page + ' carousel still depends on original-site _next/image URLs');
      assert(/images\.unsplash\.com|images\.pexels\.com/.test(tag), page + ' carousel should use direct reliable photo URLs');
    }
  }
  assert(css.includes('/* All-page carousel image reliability correction. */'), 'missing final all-page carousel visibility correction');
  assert(css.includes('/* Homepage true video carousel correction. */'), 'missing homepage true video carousel correction');
});

test('homepage uses distinct background photos and rotates multiple opaque hero videos', () => {
  const html = read('index.html');
  const js = read('script.js');
  const css = read('styles.css');
  const bgTags = html.match(/<img class="bg-slide[\s\S]*?>/g) || [];
  const videoSources = [...html.matchAll(/<video class="slide-video"[\s\S]*?<source src="([^"]+)"/g)].map((match) => match[1]);
  assert(bgTags.length === 0, 'homepage should remove background photo slides');
  assert(videoSources.length >= 4, 'homepage media carousel should provide four video clips');
  assert(new Set(videoSources).size >= 4, 'homepage video clips should be distinct');
  for (const source of videoSources) {
    assert(source.startsWith('https://videos.pexels.com/video-files/'), 'homepage videos should use direct Pexels video files');
  }
  assert(css.includes('/* Full-depth video-led homepage rebuild. */'), 'missing full-depth video-led homepage rebuild layer');
  assert(css.includes('.video-card-carousel .video-slide video'), 'homepage video slides should be styled directly');
  assert(js.includes('querySelectorAll(\'[data-slide-video]\')'), 'media carousel should manage multiple slide videos');
});

test('homepage hero is a full-bleed video carousel without photo slides', () => {
  const html = read('index.html');
  const js = read('script.js');
  const css = read('styles.css');
  const mediaMatch = html.match(/<div class="hero-video-carousel[\s\S]*?<\/div>\s*<div class="hero-content/);
  assert(mediaMatch, 'homepage full-bleed hero video carousel markup not found');
  const media = mediaMatch[0];
  const videoSlides = media.match(/<figure class="media-slide video-slide[\s\S]*?<video/g) || [];
  assert(videoSlides.length >= 4, 'homepage hero should have at least four video slides');
  assert(!media.includes('<img'), 'homepage right media card should not include photo carousel images');
  assert(!media.includes('data-video-src'), 'homepage right media card should not use hidden photo slides to swap one video source');
  assert(media.includes('data-slide-video'), 'each video carousel slide should expose its own video element');
  assert(css.includes('.hero-video-carousel { position: absolute; inset: 0; }'), 'hero video carousel should fill the whole hero');
  assert(css.includes('.full-video-home .hero-content { position: relative; z-index: 3; }'), 'hero copy should layer over the video');
  assert(js.includes('querySelectorAll(\'[data-slide-video]\')'), 'media carousel should manage multiple slide videos');
});

test('site uses restrained clinical styling and concise inner-page copy', () => {
  const css = read('styles.css');
  assert(css.includes('/* Site-wide clinical restraint cleanup. */'), 'missing site-wide clinical restraint cleanup layer');
  assert(css.includes('.shimmer::after { display: none; }'), 'shimmer effects should be disabled');
  assert(css.includes('.page-photo-carousel::after { background: rgba(255, 255, 255, 0.78); }'), 'inner page photo overlays should be plain and restrained');
  assert(css.includes('.page-hero, .contact-hero { background: #ffffff; }'), 'inner page hero backgrounds should be plain');
  assert(css.includes('.cards-section article, .detail-grid article, .values-row article, .appointment-grid article { box-shadow: none; }'), 'inner page cards should not look over-designed');

  const retiredPhrases = [
    'momentum',
    'fully awake',
    'vibrant',
    'watch the plan shift',
    'built around care that moves',
    'glass-panel shimmer',
  ];
  for (const page of pages) {
    const html = read(page);
    const bodyText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    assert(bodyText.split(' ').length < 850, `${page} is still too wordy`);
    for (const phrase of retiredPhrases) {
      assert(!html.toLowerCase().includes(phrase), `${page} still contains vibe-coded phrase/effect: ${phrase}`);
    }
  }
});
test('homepage has mature photo-forward hero and no repeated CTA section', () => {
  const html = read('index.html');
  const css = read('styles.css');
  assert(css.includes('/* Mature photo-forward homepage polish. */'), 'missing mature homepage polish layer');
  assert(!html.includes('hero-bg-carousel'), 'homepage should no longer use the photo background carousel');
  assert(css.includes('.page-photo-carousel::after { background: rgba(255, 255, 255, 0.56); }'), 'inner page photo overlays should reveal more image detail');
  assert(css.includes('.full-video-home .lean-hero-copy { max-width: 720px; }'), 'hero card should be proportioned over the video');
  assert(css.includes('.full-video-home { min-height: min(820px, calc(100vh - 64px)); }'), 'homepage hero should use a tighter full-video viewport');
  assert(!html.includes('bottom-photo-bg'), 'homepage should not repeat appointment CTA in a bottom photo section');
  assert(!html.includes('<section class="cta-panel'), 'homepage should not keep a second CTA panel');
});

test('homepage applies benchmarked clinical revamp with tighter hero fit and original messaging', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const main = html.match(/<main>[\s\S]*?<\/main>/)?.[0] || '';
  assert(html.includes('benchmark-revamp'), 'homepage should use the benchmarked revamp layout marker');
  assert(html.includes('Bringing Wellness, Compassion & Integrity in Healthcare'), 'homepage should preserve original Leancare brand message');
  assert(html.includes('Our providers, nurses, and specialists have the expertise and dedication'), 'homepage should borrow original provider promise');
  assert(html.includes('Experience healthcare that prioritizes your needs'), 'homepage should keep the original appointment promise');
  assert(!html.includes('Care made clear.'), 'homepage should replace the placeholder-style headline');
  assert(css.includes('/* Benchmarked clinical homepage revamp. */'), 'missing benchmarked clinical revamp CSS layer');
  assert(css.includes('.full-video-home { min-height: min(820px, calc(100vh - 64px)); }'), 'homepage hero should have a tighter full-video viewport fit');
  assert(css.includes('.hero-video-carousel { position: absolute; inset: 0; }'), 'video should fill the full hero carousel area');
  assert(css.includes('.lean-home-services { padding-top: clamp(34px, 4.4vw, 58px); }'), 'services section should sit closer to the hero without dead space');
  assert((main.match(/class="button /g) || []).length <= 2, 'homepage main should avoid button clutter');
});

test('homepage restores original-site depth in a cleaner benchmarked structure', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const requiredSections = [
    'What We Offer',
    'Dedicated to your well-being',
    'What sets us apart',
    'Patient stories',
    'Our team loves what they do',
    'Hours & location',
    'Health tips & insights',
  ];
  for (const section of requiredSections) {
    assert(html.includes(section), `homepage missing original-site depth section: ${section}`);
  }
  for (const term of ['Telehealth', 'Behavioral Health', 'Weight Management', 'Vitamin Injections', 'Practice Search Code', 'Eunice Binyanya, DNP, ARNP, FNP-C']) {
    assert(html.includes(term), `homepage missing important original-site content cue: ${term}`);
  }
  assert(html.includes('direct-primary-care'), 'homepage should borrow the benchmark direct-primary-care cue');
  assert(html.includes('mental-wellness'), 'homepage should borrow the benchmark mental wellness cue');
  assert(html.includes('chronic-care'), 'homepage should borrow the benchmark chronic care cue');
  assert(css.includes('.depth-grid'), 'missing richer homepage depth grid styling');
  assert(css.includes('.patient-story-rail'), 'missing patient story rail styling');
  assert(css.includes('.insight-strip'), 'missing health insight strip styling');
});

test('homepage adds restrained Nola-inspired color and optimized hero card without vibe-coded effects', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const heroMatch = html.match(/<div class="hero-content reveal lean-hero-copy[\s\S]*?<\/div>\s*<div class="hero-service-dock/);
  assert(heroMatch, 'homepage hero card markup not found');
  const heroCard = heroMatch[0];
  assert(html.includes('nola-inspired-polish'), 'homepage should mark the restrained benchmark polish layer');
  assert(heroCard.includes('hero-access-list'), 'hero card should include concise access cues');
  assert(heroCard.includes('Whole-family primary care'), 'hero card should borrow the benchmark whole-family care cue');
  assert(heroCard.includes('Transparent visit path'), 'hero card should include a clear access/pricing-style cue');
  assert(heroCard.includes('Mental wellness support'), 'hero card should include mental wellness support cue');
  assert(css.includes('/* Restrained Nola-inspired color and hero card polish. */'), 'missing restrained color/card polish CSS');
  assert(css.includes('.nola-inspired-polish .lean-hero-copy { background: linear-gradient(145deg, rgba(255, 255, 255, 0.90), rgba(246, 251, 255, 0.82)); }'), 'hero card should use a light clinical color wash');
  assert(css.includes('.hero-access-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }'), 'hero card access cues should be laid out as compact columns');
  assert(css.includes('.hero-access-list span::before { background: var(--logo-magenta); }'), 'hero access cues should use restrained brand color markers');
  assert(!css.includes('rainbow'), 'homepage polish should not use rainbow styling');
  assert(!css.includes('neon'), 'homepage polish should avoid neon styling');
});

test('site uses firmer smaller typography across homepage and inner pages', () => {
  const css = read('styles.css');
  assert(css.includes('/* Firm compact typography system. */'), 'missing final compact typography layer');
  assert(css.includes(':root { --font-sans: "Inter", "Aptos", "Helvetica Neue", Arial, sans-serif; --font-display: var(--font-sans); --font-serif: var(--font-sans); }'), 'font stack should be firm and sans-led');
  assert(css.includes('body { font-size: 14px; }'), 'base font size should be smaller');
  assert(css.includes('h1, h2, h3 { font-family: var(--font-sans); font-variation-settings: normal; }'), 'headings should no longer use the soft display font');
  assert(css.includes('h1 { font-size: clamp(30px, 4.1vw, 58px); }'), 'global h1 scale should be reduced');
  assert(css.includes('h2 { font-size: clamp(22px, 2.5vw, 34px); }'), 'global h2 scale should be reduced');
  assert(css.includes('.full-video-home .lean-hero-copy h1 { font-size: clamp(31px, 4.2vw, 52px); }'), 'homepage hero title should be smaller and firmer');
  assert(css.includes('.page-hero h1, .contact-hero h1 { font-size: clamp(25px, 3vw, 38px); }'), 'inner page titles should be significantly reduced');
  assert(css.includes('.hero-lede, .page-hero > p, .section-copy > p, .contact-hero > div > p { font-size: clamp(14px, 1.05vw, 16px); }'), 'lead copy should be compact');
  assert(css.includes('.lean-service-grid h3, .depth-copy h2, .story-team-section h2, .insight-strip h2 { letter-spacing: -0.015em; }'), 'section/card headings should have firmer tracking');
});

test('all page headings use a professional medium-weight heading system', () => {
  const css = read('styles.css');
  assert(css.includes('/* Professional medium-weight heading correction. */'), 'missing professional heading correction layer');
  assert(css.includes(':root { --heading-font: "Aptos Display", "Segoe UI Variable Display", "Inter", "Helvetica Neue", Arial, sans-serif; }'), 'missing professional heading font stack');
  assert(css.includes('h1, h2, h3, .page-hero h1, .contact-hero h1, .full-video-home .lean-hero-copy h1 { font-family: var(--heading-font); }'), 'heading font should apply globally and to page overrides');
  assert(css.includes('h1, .full-video-home .lean-hero-copy h1, .page-hero h1, .contact-hero h1 { font-weight: 650; }'), 'main headings should be medium-weight, not heavy bold');
  assert(css.includes('h2, h3, .lean-service-grid h3, .depth-grid strong, .team-card h2, .lean-visit-strip h2, .depth-grid-head h2 { font-weight: 620; }'), 'section and card headings should be firm but not overly bold');
  assert(css.includes('.eyebrow, .lean-service-grid span, .depth-grid span, .panel-kicker { font-weight: 700; }'), 'small topic labels should not use extra-bold weights');
  assert(css.includes('.site-nav a, .button, .phone-link { font-weight: 650; }'), 'navigation and button text should be less heavy');
  assert(!css.includes('font-weight: 840;'), 'final CSS should not keep the homepage title at 840 weight');
});

test('site uses clean card surfaces, readable body text, and softer hero video', () => {
  const css = read('styles.css');
  assert(css.includes('/* Clean card surfaces and readable copy correction. */'), 'missing clean card/readable copy layer');
  assert(css.includes('.hero-video-carousel video { opacity: 0.72; }'), 'hero video should be more transparent');
  assert(css.includes('.hero-video-carousel::after { background: rgba(12, 28, 42, 0.38); }'), 'hero video overlay should be simpler and less gradient-heavy');
  assert(css.includes('.lean-service-grid article, .depth-grid article, .team-card, .story-cards blockquote, .insight-list a, .lean-visit-list span, .hero-service-dock, .nola-inspired-polish .lean-hero-copy, .feature-grid article, .detail-grid article, .cards-section article, .values-row article, .appointment-grid article, .service-panel, .contact-card { background: rgba(255, 255, 255, 0.94); }'), 'cards should use clean solid surfaces');
  assert(css.includes('.patient-story-rail { background: #102131; }'), 'patient story section should avoid decorative gradients');
  assert(css.includes('p, li, dd, .hero-note, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p { color: #24384a; }'), 'body copy should use a readable color');
  assert(css.includes('p, li, dd, .hero-note, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p { font-weight: 500; }'), 'regular text should be more legible without becoming bold');
  assert(css.includes('.story-cards blockquote { background: rgba(255, 255, 255, 0.10); color: #f7fbff; }'), 'dark-section story cards should remain readable');
});

test('homepage hero and first card are shorter and tighter', () => {
  const css = read('styles.css');
  assert(css.includes('/* Shorter homepage hero correction. */'), 'missing shorter homepage hero correction layer');
  assert(css.includes('.full-video-home { min-height: min(640px, calc(100vh - 96px)); padding: clamp(34px, 5vw, 56px) 6vw; }'), 'homepage hero should be shorter than the previous tall viewport');
  assert(css.includes('.full-video-home .lean-hero-copy { padding: clamp(24px, 3vw, 38px); }'), 'first homepage card should have reduced padding');
  assert(css.includes('.full-video-home .lean-hero-copy { max-width: 660px; }'), 'first homepage card should be slightly narrower');
  assert(css.includes('.hero-service-dock { padding: 16px 18px; }'), 'secondary hero dock should be more compact');
});
test('project is migrated to a Vercel-ready Next.js App Router application', () => {
  const pkg = JSON.parse(read('package.json').replace(/^\uFEFF/, '')); 
  assert(pkg.scripts.dev === 'next dev', 'dev script should run Next.js');
  assert(pkg.scripts.build === 'next build', 'build script should run Next.js');
  assert(pkg.scripts.start === 'next start', 'start script should run Next.js');
  assert(pkg.dependencies && pkg.dependencies.next, 'Next.js dependency missing');
  assert(pkg.dependencies && pkg.dependencies.react && pkg.dependencies['react-dom'], 'React dependencies missing');

  const requiredFiles = [
    'next.config.mjs',
    'tsconfig.json',
    'next-env.d.ts',
    'app/layout.tsx',
    'app/globals.css',
    'app/page.tsx',
    'app/services/page.tsx',
    'app/family-practice/page.tsx',
    'app/wellness/page.tsx',
    'app/telehealth/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'components/SiteHeader.tsx',
    'components/SiteFooter.tsx',
    'components/PageBodyMarker.tsx',
    'components/RawPage.tsx',
    'public/site-interactions.js',
  ];
  for (const file of requiredFiles) {
    assert(fs.existsSync(path.join(root, file)), `${file} missing from Next.js migration`);
  }

  const layout = read('app/layout.tsx');
  assert(layout.includes('import Script from \'next/script\''), 'layout should load client interactions with next/script');
  assert(layout.includes('<SiteHeader />') && layout.includes('<SiteFooter />'), 'layout should use shared header/footer components');
  assert(!layout.includes('next export'), 'layout should not rely on static export mode');

  const home = read('app/page.tsx');
  assert(home.includes('<PageBodyMarker page="home" />'), 'homepage should mark body page state for existing CSS');
  assert(read('components/RawPage.tsx').includes('dangerouslySetInnerHTML'), 'page content should preserve current design markup through the shared RawPage component');
});





test('Next app preserves static UI interaction hooks and reinitializes them after hydration and route changes', () => {
  const header = read('components/SiteHeader.tsx');
  const layout = read('app/layout.tsx');
  const runtime = read('components/SiteRuntime.tsx');
  const interactions = read('public/site-interactions.js');

  assert(header.includes('data-menu-toggle'), 'Next header missing mobile nav toggle hook');
  assert(header.includes('data-nav'), 'Next header missing nav container hook');
  assert(header.includes('data-nav-link'), 'Next header missing active nav link hook');
  assert(header.includes('navKey'), 'Next header should map routes to legacy page keys');

  assert(layout.includes('<SiteRuntime />'), 'layout should include the client runtime reinitializer');
  assert(runtime.includes('usePathname'), 'runtime should re-run interactions after Next route changes');
  assert(runtime.includes('window.LeanCareInit'), 'runtime should call the global interaction initializer');

  assert(interactions.includes('window.LeanCareInit = initLeancareInteractions'), 'interactions should expose a global initializer');
  assert(interactions.includes('document.readyState === \'loading\''), 'interactions should run even when loaded after DOMContentLoaded');
  assert(!interactions.includes("document.addEventListener('DOMContentLoaded', initHeroCarousel);"), 'interactions should not rely on one-off DOMContentLoaded listeners');
});
