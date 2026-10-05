const fs = require('fs');
const path = require('path');

const root = __dirname;
const pages = [
  'index.html',
  'services.html',
  'family-practice.html',
  'wellness.html',
  'telehealth.html',
  'blog.html',
  'about.html',
  'contact.html',
];
const dmSansHref = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
const dmSansStack = ':root { --font-sans: var(--font-dm-sans, "DM Sans"), "Inter", "Aptos", "Helvetica Neue", Arial, sans-serif; --font-display: var(--font-sans); --font-serif: var(--font-sans); --heading-font: var(--font-dm-sans, "DM Sans"), "Inter", "Aptos", "Helvetica Neue", Arial, sans-serif; }';

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

test('site loads and applies DM Sans as the primary readable font', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const layout = read('app/layout.tsx');
  for (const page of pages) {
    const html = read(page);
    assert(html.includes(dmSansHref), `${page} should load DM Sans`);
  }
  assert(layout.includes(dmSansHref), 'Next layout should load DM Sans');
  assert(css.includes('/* DM Sans site-wide font system. */'), 'missing DM Sans final font layer');
  assert(css.includes(dmSansStack), 'static CSS should make DM Sans the primary font token');
  assert(globals.includes('/* DM Sans site-wide font system. */'), 'Next globals missing DM Sans layer');
  assert(globals.includes(dmSansStack), 'Next globals should make DM Sans the primary font token');
  assert(css.includes('body, button, input, textarea, select { font-family: var(--font-sans); }'), 'form controls should inherit DM Sans');
  assert(css.includes('h1, h2, h3, h4, h5, h6, .page-hero h1, .contact-hero h1, .full-video-home .lean-hero-copy h1 { font-family: var(--heading-font); }'), 'headings should use the DM Sans heading token');
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
  const innerPages = ['services.html', 'family-practice.html', 'wellness.html', 'telehealth.html', 'blog.html', 'about.html', 'contact.html'];
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

test('homepage video carousel stays video-only without photo backplates', () => {
  const home = read('index.html');
  const nextHome = read('app/page.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const markup of [home, nextHome]) {
    assert(!markup.includes('--hero-photo'), 'homepage video carousel should not use photo backplates behind videos');
    assert(!markup.includes('poster="https://images.unsplash.com/'), 'homepage video carousel should not show photo posters over videos');
  }
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Homepage video-only carousel correction. */'), 'missing homepage video-only carousel correction layer');
    assert(stylesheet.includes('.hero-video-carousel .media-slide { background-image: none; background-color: #f7fcff; }'), 'video slides should use a light fallback, not a flat blue panel');
    assert(stylesheet.includes('.hero-video-carousel .media-slide::before { display: none; }'), 'video slides should not place photo/gradient layers over videos');
  }
});

test('homepage hero carousel avoids shaky blank slides and header has intentional fit', () => {
  const home = read('index.html');
  const nextHome = read('app/page.tsx');
  const js = read('script.js');
  const runtime = read('public/site-interactions.js');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const videoSources = [...home.matchAll(/<video class="slide-video"[\s\S]*?<source src="([^"]+)"/g)].map((match) => match[1]);
  assert(videoSources.length >= 4, 'homepage should still have four video slides');
  for (const source of videoSources) {
    assert(!source.includes('uhd_4096_2160'), 'homepage should not use heavyweight 4K video files that load as blank panels');
    assert(!source.includes('/8375608/'), 'homepage should remove the shaky/heavy video clip');
  }
  for (const markup of [home, nextHome]) {
    assert(markup.includes('preload="metadata"') || markup.includes('preload=\\"metadata\\"'), 'hero videos should preload metadata for smoother switching');
  }
  for (const script of [js, runtime]) {
    assert(script.includes('const waitForPlayableVideo = (video) =>'), 'media carousel should wait for playable video before switching slides');
    assert(script.includes('video.readyState >= 2'), 'media carousel should check video readiness before changing the active slide');
    assert(script.includes('nextVideo.dataset.videoFailed === \'true\''), 'media carousel should skip failed videos instead of showing a blank slide');
  }
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Intentional hero carousel and header fit correction. */'), 'missing final intentional hero/header correction layer');
    assert(stylesheet.includes('.hero-video-carousel video { opacity: 0.78; filter: saturate(1.1) contrast(1.04); position: relative; z-index: 2; }'), 'hero videos should be visible enough to read as video, not a tinted blank panel');
    assert(stylesheet.includes('.nola-inspired-polish .lean-hero-copy { background: rgba(255, 255, 255, 0.96); }'), 'hero card should be more opaque and readable');
    assert(stylesheet.includes('.site-header-shell { display: grid; grid-template-columns: minmax(172px, 210px) minmax(0, 1fr) max-content; }'), 'header shell should use a stable three-column grid');
    assert(stylesheet.includes('.site-header-shell .phone-link { display: none; }'), 'main header should not duplicate the phone number already shown in the info strip');
    assert(stylesheet.includes('.site-header-shell .nav-toggle, .site-header-shell .menu-toggle { display: none; }'), 'desktop header should not show a menu-toggle artifact');
  }
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
  assert(css.includes(dmSansStack), 'font stack should be firm, sans-led, and DM Sans first');
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
  assert(css.includes(dmSansStack), 'missing professional DM Sans heading font stack');
  assert(css.includes('h1, h2, h3, h4, h5, h6, .page-hero h1, .contact-hero h1, .full-video-home .lean-hero-copy h1 { font-family: var(--heading-font); }'), 'heading font should apply globally and to page overrides');
  assert(css.includes('h1, .full-video-home .lean-hero-copy h1, .page-hero h1, .contact-hero h1 { font-weight: 650; }'), 'main headings should be medium-weight, not heavy bold');
  assert(css.includes('h2, h3, .lean-service-grid h3, .depth-grid strong, .team-card h2, .lean-visit-strip h2, .depth-grid-head h2 { font-weight: 620; }'), 'section and card headings should be firm but not overly bold');
  assert(css.includes('.eyebrow, .lean-service-grid span, .depth-grid span, .panel-kicker { font-weight: 700; }'), 'small topic labels should not use extra-bold weights');
  assert(css.includes('.site-nav a, .button, .phone-link { font-weight: 650; }'), 'navigation and button text should be less heavy');
  assert(!css.includes('font-weight: 840;'), 'final CSS should not keep the homepage title at 840 weight');
});

test('site uses clean card surfaces, readable body text, and softer hero video', () => {
  const css = read('styles.css');
  assert(css.includes('/* Clean card surfaces and readable copy correction. */'), 'missing clean card/readable copy layer');
  assert(css.includes('.hero-video-carousel video { opacity: 0.78; filter: saturate(1.1) contrast(1.04); position: relative; z-index: 2; }'), 'hero video should be visible and polished');
  assert(css.includes('.hero-video-carousel::after { background: rgba(12, 28, 42, 0.05); }'), 'hero video overlay should be a 5 percent wash');
  assert(css.includes('.lean-service-grid article, .depth-grid article, .team-card, .story-cards blockquote, .insight-list a, .lean-visit-list span, .hero-service-dock, .nola-inspired-polish .lean-hero-copy, .feature-grid article, .detail-grid article, .cards-section article, .values-row article, .appointment-grid article, .service-panel, .contact-card { background: rgba(255, 255, 255, 0.94); }'), 'cards should use clean solid surfaces');
  assert(css.includes('.patient-story-rail { background: #102131; }'), 'patient story section should avoid decorative gradients');
  assert(css.includes('p, li, dd, .hero-note, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p { color: #24384a; }'), 'body copy should use a readable color');
  assert(css.includes('p, li, dd, .hero-note, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p { font-weight: 500; }'), 'regular text should be more legible without becoming bold');
  assert(css.includes('.story-cards blockquote { background: rgba(255, 255, 255, 0.10); color: #f7fbff; }'), 'dark-section story cards should remain readable');
});

test('regular non-bold copy is larger without changing heading or button scale', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const copyScale = 'p, li, dd, .hero-note, .hero-lede, .page-hero > p, .section-copy > p, .contact-hero > div > p, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p, .insight-list a { font-size: clamp(15px, 1.08vw, 17px); }';
  const mobileCopyScale = 'p, li, dd, .hero-note, .hero-lede, .page-hero > p, .section-copy > p, .contact-hero > div > p, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p, .insight-list a { font-size: 15px; }';
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Larger regular copy correction. */'), 'missing larger regular copy layer');
    assert(stylesheet.includes(copyScale), 'regular non-bold copy should be larger');
    assert(stylesheet.includes('.story-cards blockquote { font-size: clamp(15px, 1.08vw, 17px); }'), 'testimonial copy should be larger');
    assert(stylesheet.includes('.full-video-home .hero-lede { font-size: clamp(15px, 1.08vw, 17px); }'), 'homepage lead copy should be larger');
    assert(stylesheet.includes(mobileCopyScale), 'mobile regular copy should stay readable at 15px');
  }
  assert(css.includes('font-size: clamp(29px, 3.7vw, 46px);'), 'homepage heading scale should remain unchanged');
  assert(css.includes('.site-nav a, .button, .phone-link { font-weight: 650; }'), 'button and nav emphasis should remain controlled');
});

test('regular copy increase reaches inner pages, footer text, and non-bold spans', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const allPageCopySelector = '.two-feature article p, .metric-band span, .process-list p, .provider-profile article p:not(.eyebrow), .feature-grid article p, .detail-grid article p, .cards-section article p, .values-row article p, .appointment-grid article p, .service-panel p, .service-panel dd, .contact-card p, .cta-panel p:not(.eyebrow), .site-footer p, .site-footer a { font-size: clamp(15px, 1.08vw, 17px); }';
  const mobileAllPageCopySelector = '.two-feature article p, .metric-band span, .process-list p, .provider-profile article p:not(.eyebrow), .feature-grid article p, .detail-grid article p, .cards-section article p, .values-row article p, .appointment-grid article p, .service-panel p, .service-panel dd, .contact-card p, .cta-panel p:not(.eyebrow), .site-footer p, .site-footer a { font-size: 15px; }';
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* All-page regular text reach correction. */'), 'missing all-page regular text reach layer');
    assert(stylesheet.includes(allPageCopySelector), 'inner-page regular text and footer copy should be larger');
    assert(stylesheet.includes(mobileAllPageCopySelector), 'inner-page regular text should stay readable on mobile');
  }
  assert(!allPageCopySelector.includes('strong'), 'bold/stat labels should not be included in the regular text increase');
  assert(!allPageCopySelector.includes('.process-list span'), 'step number pills should not be included in the regular text increase');
});

test('top menu text is larger and easier to read', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const headerScale = '.site-nav a, .phone-link, .header-actions .button { font-family: var(--font-sans); font-size: clamp(13px, 0.9vw, 14px); font-weight: 600; letter-spacing: 0; line-height: 1.05; }';
  const headerMobileScale = '.site-nav a { font-size: 20px; }';
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Professional header spacing and font refinement. */'), 'missing professional header refinement layer');
    assert(stylesheet.includes('.site-header { column-gap: clamp(18px, 2.4vw, 34px); min-height: 0; padding-left: 0; padding-right: 0; }'), 'header bar should be slimmer and avoid crowding');
    assert(stylesheet.includes('.site-nav { gap: clamp(10px, 1.2vw, 22px); }'), 'header nav links should keep controlled spacing');
    assert(stylesheet.includes(headerScale), 'header nav, phone, and CTA should use a cleaner DM Sans treatment');
    assert(stylesheet.includes('.site-nav a { padding: 9px 12px; }'), 'nav links should have tighter click padding');
    assert(stylesheet.includes('.header-actions { gap: clamp(10px, 1.2vw, 18px); }'), 'phone and appointment button should fit the bar');
    assert(stylesheet.includes('.header-actions .button { min-height: 42px; padding: 11px 18px; }'), 'header CTA should be compact and better proportioned');
    assert(stylesheet.includes(headerMobileScale), 'mobile nav menu should remain large and tappable');
  }
});

test('header uses two-tier contact bar with requested page structure', () => {
  const nextHeader = read('components/SiteHeader.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const expectedLabels = ['Home', 'Family Practice', 'Wellness', 'Blog', 'About', 'Contact'];
  for (const markup of [...pages.map((page) => read(page)), nextHeader]) {
    assert(markup.includes('class="header-info-strip"') || markup.includes('className="header-info-strip"'), 'header should include a slim contact information strip');
    assert(markup.includes('3002 Myrtle Ave N, Suite 1, Jacksonville, FL 32209'), 'header should show the clinic address');
    assert(markup.includes('Mon-Fri, 9:00 a.m. - 4:30 p.m.'), 'header should show the clinic hours');
    assert(markup.includes('904-201-9232') && markup.includes('904-374-1121'), 'header should show both phone numbers');
    assert(markup.includes('class="site-header-shell"') || markup.includes('className="site-header-shell"'), 'header should separate the main nav shell from the info strip');
    assert(markup.includes('class="nav-group"') || markup.includes('className="nav-group"'), 'header should use creative dropdown nav groups');
    assert(markup.includes('class="nav-chevron"') || markup.includes('className="nav-chevron"'), 'dropdown labels should include a restrained chevron');
    for (const label of expectedLabels) {
      assert(markup.includes(`>${label}<`) || markup.includes(`>{item.label}<`) || markup.includes(`label: '${label}'`), `header missing top-level page ${label}`);
    }
    assert(!markup.includes('data-nav-link="services">Services'), 'Services should not remain a top-level header page');
  }
  assert(fs.existsSync(path.join(root, 'blog.html')), 'static blog page should exist because Blog is in the header');
  assert(fs.existsSync(path.join(root, 'app/blog/page.tsx')), 'Next blog route should exist because Blog is in the header');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Two-tier clinical header and 5 percent hero transparency. */'), 'missing final two-tier header layer');
    assert(stylesheet.includes('.header-info-strip { background: rgba(247, 252, 255, 0.92); border-bottom: 1px solid rgba(63, 162, 219, 0.13); color: #31475a; display: flex; font-size: 12px; gap: clamp(14px, 3vw, 38px); justify-content: center; min-height: 26px; padding: 4px clamp(20px, 4vw, 64px); }'), 'info strip should be slimmer and fit the requested top bar rhythm');
    assert(stylesheet.includes('.nav-group-menu { background: rgba(255, 255, 255, 0.96); border: 1px solid rgba(63, 162, 219, 0.16); border-radius: 16px; box-shadow: 0 18px 48px rgba(16, 33, 49, 0.14); opacity: 0; padding: 8px; pointer-events: none; position: absolute; top: calc(100% + 10px); transform: translateY(6px); transition: opacity 180ms ease, transform 180ms ease; visibility: hidden; }'), 'dropdown menus should be polished but restrained');
    assert(stylesheet.includes('.hero-video-carousel::after { background: rgba(12, 28, 42, 0.05); }'), 'hero media wash should be exactly 5 percent');
    assert(stylesheet.includes('.menu-toggle, .nav-toggle { display: none; }'), 'desktop header should not show the menu toggle artifact');
  }
});

test('top bar matches the screenshot-informed header structure', () => {
  const nextHeader = read('components/SiteHeader.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const staticHeader = read('index.html').match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0] || '';
  for (const markup of [staticHeader, nextHeader]) {
    assert(markup.includes('header-info-strip'), 'header should keep the slim top information strip');
    assert(!markup.includes('class="phone-link"') && !markup.includes('className="phone-link"'), 'main nav row should not include a duplicate phone link');
    assert(markup.includes('Request appointment'), 'main nav row should keep the appointment CTA');
  }
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Screenshot-matched top bar correction. */'), 'missing screenshot-matched top bar correction layer');
    assert(stylesheet.includes('.header-info-strip { align-items: center; background: #f8fcff; border-bottom: 1px solid rgba(63, 162, 219, 0.16); color: #25384b; display: grid; grid-template-columns: minmax(0, max-content) max-content max-content; justify-content: center; min-height: 30px; padding: 0 clamp(28px, 6vw, 96px); }'), 'top info strip should match the screenshot proportions');
    assert(stylesheet.includes('.header-info-item { align-items: center; display: inline-flex; font-size: 13px; font-weight: 500; gap: 8px; min-width: 0; white-space: nowrap; }'), 'top info text should be compact and readable');
    assert(stylesheet.includes('.site-header-shell { align-items: center; display: grid; grid-template-columns: minmax(190px, 238px) minmax(0, 1fr) max-content; min-height: 80px; padding: 0 clamp(42px, 6.4vw, 96px); }'), 'main header row should fit logo, centered nav, and CTA like the screenshot');
    assert(stylesheet.includes('.site-header-shell .site-nav { gap: clamp(24px, 3vw, 44px); justify-content: center; }'), 'nav links should have the wider spacing shown in the screenshot');
    assert(stylesheet.includes('.site-header-shell .header-actions .button { min-height: 46px; min-width: 224px; padding: 0 25px; }'), 'appointment CTA should match the screenshot scale');
    assert(stylesheet.includes('.site-header-shell .nav-toggle, .site-header-shell .menu-toggle { display: none !important; }'), 'desktop header should not show the stray toggle dash');
  }
});

test('newer inner pages use polished page layouts and no grainy wellness meditation photo', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const wellness = read('wellness.html');
  const nextWellness = read('app/wellness/page.tsx');
  assert(!wellness.includes('photo-1518611012118-696072aa579a'), 'wellness page should remove the grainy meditation image');
  assert(!nextWellness.includes('photo-1518611012118-696072aa579a'), 'Next wellness page should remove the grainy meditation image');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Inner page polish and newer-page optimization. */'), 'missing inner page polish layer');
    assert(stylesheet.includes('body[data-page="family-practice"] .page-hero, body[data-page="wellness"] .page-hero, body[data-page="telehealth"] .page-hero, body[data-page="blog"] .page-hero { min-height: 340px; padding: clamp(48px, 6vw, 76px) 6vw; }'), 'newer page heroes should be more compact and consistent');
    assert(stylesheet.includes('body[data-page="blog"] .blog-grid, body[data-page="wellness"] .two-feature, body[data-page="family-practice"] .two-feature, body[data-page="telehealth"] .split-section { max-width: 1120px; margin-inline: auto; }'), 'newer page content grids should be centered and optimized');
    assert(stylesheet.includes('.page-photo-carousel::after { background: linear-gradient(90deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.62) 48%, rgba(255,255,255,0.34) 100%); }'), 'inner page photo overlays should be cleaner and less chaotic');
  }
});

test('homepage uses actual Leancare patient testimonials from the original site', () => {
  const html = read('index.html');
  const nextHome = read('app/page.tsx');
  const css = read('styles.css');
  const testimonials = [
    ['James Patterson', 'Finally a clinic that treats me like a person'],
    ['Latoya Brooks', 'They treated my whole family with such kindness'],
    ['Kevin Okafor', 'Compassion and integrity are not just words'],
    ['Rosa Medina', 'Warm, professional, and unhurried'],
    ['Anthony Guerrero', 'I did my visit from work over video'],
    ['Priya Sharma', 'The weight-management plan was built around my life'],
    ['Marcus Thornton', 'Same-day appointment, no long wait'],
    ['Danielle Reeves', 'Dr. Binyanya actually listens'],
  ];
  for (const [name, excerpt] of testimonials) {
    assert(html.includes(name), `homepage missing original testimonial name: ${name}`);
    assert(html.includes(excerpt), `homepage missing original testimonial copy excerpt: ${excerpt}`);
    assert(nextHome.includes(name), `Next homepage missing original testimonial name: ${name}`);
    assert(nextHome.includes(excerpt), `Next homepage missing original testimonial copy excerpt: ${excerpt}`);
  }
  assert((html.match(/<blockquote>/g) || []).length >= 8, 'homepage should include the full set of original testimonials');
  assert(css.includes('.story-cards blockquote cite'), 'testimonial names and patient types should be styled');
  assert(css.includes('.story-cards blockquote p'), 'testimonial copy should have dedicated styling');
});

test('doctor portrait is intentionally placed on homepage and about page', () => {
  const portraitPath = 'public/eunice-binyanya-provider.jpeg';
  const home = read('index.html');
  const about = read('about.html');
  const nextHome = read('app/page.tsx');
  const nextAbout = read('app/about/page.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  assert(fs.existsSync(path.join(root, portraitPath)), 'doctor portrait asset should be available in public');
  for (const markup of [home, about, nextHome, nextAbout]) {
    assert(markup.includes('/eunice-binyanya-provider.jpeg'), 'provider portrait should use the deployed doctor photo asset');
    assert(markup.includes('Eunice Binyanya, DNP, ARNP, FNP-C'), 'provider placement should keep the provider name');
  }
  assert(home.includes('class="team-card provider-team-card"'), 'homepage provider mention should become a portrait card');
  assert(home.includes('class="team-card-photo"'), 'homepage provider card should include a dedicated portrait frame');
  assert(about.includes('class="provider-profile reveal doctor-profile"'), 'about page should use the enhanced doctor profile layout');
  assert(about.includes('class="provider-portrait-frame"'), 'about page should include an intentional portrait frame');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Provider portrait placement correction. */'), 'missing provider portrait CSS layer');
    assert(stylesheet.includes('.provider-team-card { grid-template-columns: minmax(150px, 0.72fr) minmax(0, 1fr); }'), 'homepage provider card should lay out image and copy intentionally');
    assert(stylesheet.includes('.team-card-photo, .provider-portrait-frame { background: linear-gradient(145deg, #f7fcff, #eaf7fd); display: grid; place-items: center; padding: clamp(10px, 1.4vw, 18px); }'), 'doctor portrait should sit inside a composed clinical portrait frame');
    assert(stylesheet.includes('.team-card-photo { aspect-ratio: 0.9; min-height: 300px; }'), 'homepage doctor portrait should have enough height to avoid awkward cropping');
    assert(stylesheet.includes('.provider-portrait-frame { aspect-ratio: 0.9; min-height: 520px; }'), 'about doctor portrait should use a taller intentional frame');
    assert(stylesheet.includes('.team-card-photo img, .provider-portrait-frame img { object-fit: contain; object-position: center center; border-radius: 14px; }'), 'doctor portrait should show the full composed photo, not a harsh crop');
    assert(stylesheet.includes('.doctor-profile { grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1fr); }'), 'about profile should give the portrait proper presence');
    assert(stylesheet.includes('/* Homepage provider card fit correction. */'), 'missing homepage provider card fit correction layer');
    assert(stylesheet.includes('.story-team-section .provider-team-card { grid-column: 1 / -1; grid-template-columns: minmax(240px, 320px) minmax(0, 1fr); max-width: 980px; margin-inline: auto; }'), 'homepage provider card should span the section instead of squeezing the copy');
    assert(stylesheet.includes('.story-team-section .team-card-photo { max-width: 320px; min-height: 0; width: 100%; }'), 'homepage provider portrait should be capped to fit the card');
    assert(stylesheet.includes('.story-team-section .team-card-copy { max-width: 520px; min-width: 0; }'), 'homepage provider copy should have a real readable column');
  }
});

test('homepage hero uses vibrant posters, subtle scroll reveals, and corrected CTA font', () => {
  const home = read('index.html');
  const nextHome = read('app/page.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const retiredPosters = [
    'photo-1532938911079-1b06ac7ceec7',
    'photo-1498837167922-ddd27525d352',
    'photo-1519494026892-80bbd2d6fd0d',
    'photo-1505751172876-fa1923c5c528',
  ];
  const vibrantPosters = [
    'photo-1550831107-1553da8c8464',
    'photo-1512621776951-a57141f2eefd',
    'photo-1576091160550-2173dba999ef',
  ];
  for (const poster of retiredPosters) {
    assert(!home.includes(`poster="https://images.unsplash.com/${poster}`), `homepage still uses old muted poster ${poster}`);
    assert(!nextHome.includes(`poster="https://images.unsplash.com/${poster}`), `Next homepage still uses old muted poster ${poster}`);
  }
  for (const poster of vibrantPosters) {
    assert(!home.includes(`poster="https://images.unsplash.com/${poster}`), `homepage should not use photo poster ${poster}`);
    assert(!nextHome.includes(`poster="https://images.unsplash.com/${poster}`), `Next homepage should not use photo poster ${poster}`);
  }
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Subtle scroll reveal and hero media polish. */'), 'missing subtle reveal/media polish layer');
    assert(stylesheet.includes('.hero-video-carousel video { filter: saturate(1.08) contrast(1.02); position: relative; z-index: 2; }'), 'hero videos should have a cleaner finish without photo layers');
    assert(stylesheet.includes('.reveal { opacity: 0; transform: translate3d(0, 20px, 0); transition: opacity 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 720ms cubic-bezier(0.22, 1, 0.36, 1); }'), 'reveal elements should slide and fade subtly');
    assert(stylesheet.includes('.reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }'), 'visible reveal state should settle cleanly');
    assert(stylesheet.includes('.reveal.is-visible .lean-service-grid article, .reveal.is-visible .depth-grid article, .reveal.is-visible .story-cards blockquote, .reveal.is-visible .insight-list a { opacity: 1; transform: translate3d(0, 0, 0); }'), 'scroll reveal should cascade into repeated cards');
    assert(stylesheet.includes('.nola-inspired-polish .lean-hero-copy { background: linear-gradient(145deg, rgba(255, 255, 255, 0.90), rgba(246, 251, 255, 0.82)); }'), 'hero copy card should stay readable and not inherit the 5 percent carousel transparency');
    assert(stylesheet.includes('.hero-service-dock { background: rgba(255, 255, 255, 0.82); }'), 'hero dock should stay readable and not inherit the 5 percent carousel transparency');
    assert(stylesheet.includes('.button, .header-cta, .hero-actions .button-primary, .header-actions .button { font-family: var(--font-sans); font-size: 14px; font-weight: 650; letter-spacing: 0; line-height: 1; }'), 'buttons should use a cleaner compact DM Sans treatment');
  }
});

test('homepage hero and first card are shorter and tighter', () => {
  const css = read('styles.css');
  assert(css.includes('/* Shorter homepage hero correction. */'), 'missing shorter homepage hero correction layer');
  assert(css.includes('.full-video-home { min-height: min(560px, calc(100vh - 118px)); padding: clamp(24px, 4vw, 42px) 6vw; }'), 'homepage hero should be shorter and less dominant');
  assert(css.includes('.full-video-home .lean-hero-copy { padding: clamp(20px, 2.5vw, 30px); }'), 'first homepage card should have tighter padding');
  assert(css.includes('.full-video-home .lean-hero-copy { max-width: 620px; }'), 'first homepage card should be narrower and calmer');
  assert(css.includes('.full-video-home .lean-hero-copy h1 { font-size: clamp(27px, 3.2vw, 40px); }'), 'homepage hero title should be reduced to fit the shorter card');
  assert(css.includes('.hero-service-dock { padding: 13px 16px; }'), 'secondary hero dock should be more compact');
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
    'app/blog/page.tsx',
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
