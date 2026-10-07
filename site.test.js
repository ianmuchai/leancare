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
const leancareFontHref = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
const leancareFontStack = ':root { --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; --font-display: var(--font-sans); --font-serif: var(--font-sans); --heading-font: var(--font-sans); }';

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

test('site loads and applies Tablecraft-style compact Inter typography', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const layout = read('app/layout.tsx');
  for (const page of pages) {
    const html = read(page);
    assert(html.includes(leancareFontHref), `${page} should load the compact Tablecraft-style font`);
  }
  assert(layout.includes(leancareFontHref), 'Next layout should load the compact Tablecraft-style font');
  assert(css.includes('/* Tablecraft-style compact typography refinement. */'), 'missing Tablecraft-style font layer');
  assert(css.includes(leancareFontStack), 'static CSS should use the compact Inter/system stack');
  assert(globals.includes('/* Tablecraft-style compact typography refinement. */'), 'Next globals missing Tablecraft-style font layer');
  assert(globals.includes(leancareFontStack), 'Next globals should use the compact Inter/system stack');
  assert(css.includes('body, button, input, textarea, select { font-family: var(--font-sans); font-weight: 400; }'), 'form controls should inherit the cleaner Inter treatment');
  assert(css.includes('h1, h2, h3, h4, h5, h6, .page-hero h1, .contact-hero h1, .full-video-home .lean-hero-copy h1 { font-family: var(--heading-font); font-weight: 500; letter-spacing: 0; }'), 'headings should use the compact sans heading treatment');
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

test('mobile layout uses polished responsive composition', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Mobile polish and responsive composition pass. */'), 'missing final mobile polish layer');
    assert(stylesheet.includes('.header-info-strip { display: flex; gap: 8px; justify-content: flex-start; min-height: 34px; overflow-x: auto; padding: 6px 14px; scrollbar-width: none; }'), 'mobile info strip should become a compact scrollable rail');
    assert(stylesheet.includes('.site-header-shell { grid-template-columns: minmax(132px, 168px) 44px; min-height: 64px; padding: 0 16px; }'), 'mobile header should use a tighter logo/menu grid');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav { background: rgba(255, 255, 255, 0.96); border: 1px solid rgba(63, 162, 219, 0.16); border-radius: 18px; box-shadow: 0 22px 54px rgba(16, 33, 49, 0.18); display: flex !important; flex-direction: column; gap: 6px; inset: 104px 12px auto 12px; max-height: calc(100vh - 120px); overflow: auto; padding: 14px; position: fixed; }'), 'mobile nav should open as a polished sheet');
    assert(stylesheet.includes('.full-video-home { align-items: end; min-height: auto; padding: 18px 14px 28px; }'), 'mobile homepage hero should be shorter and fit the viewport better');
    assert(stylesheet.includes('.nola-inspired-polish .lean-hero-copy { border-radius: 20px; gap: 12px; max-width: none; padding: 20px; width: 100%; }'), 'mobile hero card should be compact and full-width');
    assert(stylesheet.includes('.full-video-home .lean-hero-copy h1 { font-size: clamp(30px, 9vw, 38px); line-height: 1.04; }'), 'mobile hero heading should be balanced, not oversized');
    assert(stylesheet.includes('.hero-actions, .hero-access-list, .lean-hero-facts { grid-template-columns: 1fr; width: 100%; }'), 'mobile hero controls should stack cleanly');
    assert(stylesheet.includes('.lean-home-services, .depth-section, .story-team-section, .lean-visit-strip, .insight-strip { padding-left: 16px; padding-right: 16px; width: calc(100% - 24px); }'), 'mobile sections should have consistent breathing room');
    assert(stylesheet.includes('.page-hero, .contact-hero { min-height: 300px; padding: 52px 18px 42px; }'), 'mobile inner-page heroes should be compact and readable');
  }
});

test('mobile homepage uses separate video-first hero composition', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Mobile-first hero restructure and simplified rhythm. */'), 'missing mobile-first hero restructure layer');
    assert(stylesheet.includes('.full-video-home { background: #f7fbff; display: grid; gap: 14px; grid-template-columns: 1fr; min-height: auto; padding: 12px 14px 26px; }'), 'mobile hero should become a simple grid instead of an overlaid desktop hero');
    assert(stylesheet.includes('.hero-video-carousel { aspect-ratio: 16 / 10; border-radius: 24px; box-shadow: 0 18px 46px rgba(16, 33, 49, 0.16); inset: auto; min-height: 0; overflow: hidden; position: relative; }'), 'mobile video carousel should be a standalone top panel');
    assert(stylesheet.includes('.full-video-home .hero-content { margin: 0; position: relative; z-index: 2; }'), 'mobile card should sit below the video, not on top of it');
    assert(stylesheet.includes('.nola-inspired-polish .lean-hero-copy { background: rgba(255, 255, 255, 0.98); box-shadow: 0 16px 34px rgba(16, 33, 49, 0.10); min-height: 0; }'), 'mobile hero card should be readable and compact below the video');
    assert(stylesheet.includes('.hero-service-dock { display: none; }'), 'mobile should remove the floating dock from the hero');
    assert(stylesheet.includes('.lean-home-services { margin-top: 18px; }'), 'mobile content should start close to the hero without wasted space');
    assert(stylesheet.includes('.section-copy h2, .depth-copy h2, .team-card-copy h2, .lean-visit-strip h2, .insight-strip h2 { font-size: clamp(24px, 7vw, 32px); line-height: 1.12; }'), 'mobile section headings should use manageable sizes');
  }
});

test('mobile information strip is shorter and auto-scrolls horizontally', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Mobile compact auto-scrolling information strip. */'), 'missing compact mobile auto-scroll info strip layer');
    assert(stylesheet.includes('.header-info-strip { min-height: 24px; max-height: 24px; overflow: hidden; padding: 2px 0; position: relative; }'), 'mobile information strip should be shorter and clipped');
    assert(stylesheet.includes('.header-info-item { animation: mobile-info-marquee 22s linear infinite; background: transparent; border: 0; flex: 0 0 auto; font-size: 11px; min-height: 20px; padding: 0 18px 0 0; }'), 'mobile information items should auto-scroll in a compact line');
    assert(stylesheet.includes('.info-icon { height: 16px; width: 16px; }'), 'mobile information icons should be smaller');
    assert(stylesheet.includes('@keyframes mobile-info-marquee { from { transform: translateX(-115%); } to { transform: translateX(100vw); } }'), 'mobile information strip should scroll from left to right');
  }
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

test('homepage hero card uses direct service links and inner heroes expose appointment CTAs', () => {
  const home = read('index.html');
  const nextHome = read('app/page.tsx');
  const removedLine = 'Primary care, psychiatric support, chronic care, telehealth, weight management, and vitamin injections under one attentive team.';
  for (const markup of [home, nextHome]) {
    assert(!markup.includes(removedLine), 'homepage hero should remove the redundant service sentence');
    assert(!markup.includes('Transparent visit path'), 'homepage hero should replace the transparent visit chip');
    assert(markup.includes('Chronic illness management'), 'homepage hero should include the chronic illness management chip');
  }

  const staticHeroMatch = home.match(/<div class="hero-content reveal lean-hero-copy[\s\S]*?<\/div>\s*<div class="hero-service-dock/);
  assert(staticHeroMatch, 'static homepage hero card missing');
  const staticHero = staticHeroMatch[0];
  for (const expected of [
    '<a href="services.html#primary-care">Whole-family primary care</a>',
    '<a href="services.html#chronic-disease-management">Chronic illness management</a>',
    '<a href="services.html#behavioral-services">Mental wellness support</a>',
  ]) {
    assert(staticHero.includes(expected), `static homepage hero chip should link to ${expected}`);
  }

  const nextHeroMatch = nextHome.match(/<div class=\\"hero-content reveal lean-hero-copy[\s\S]*?<\/div>\\n      <div class=\\"hero-service-dock/);
  assert(nextHeroMatch, 'Next homepage hero card missing');
  const nextHero = nextHeroMatch[0];
  for (const expected of [
    '<a href=\\"/services#primary-care\\">Whole-family primary care</a>',
    '<a href=\\"/services#chronic-disease-management\\">Chronic illness management</a>',
    '<a href=\\"/services#behavioral-services\\">Mental wellness support</a>',
  ]) {
    assert(nextHero.includes(expected), `Next homepage hero chip should link to ${expected}`);
  }

  for (const page of ['services.html', 'about.html', 'blog.html']) {
    const heroMatch = read(page).match(/<section class="[^"]*(?:page-hero|contact-hero)[\s\S]*?<\/section>/);
    assert(heroMatch, `${page} missing hero section`);
    assert(heroMatch[0].includes('<a class="button button-primary" href="contact.html">Request appointment</a>'), `${page} should show a body appointment CTA before scrolling`);
  }

  for (const page of ['app/services/page.tsx', 'app/about/page.tsx', 'app/blog/page.tsx']) {
    const markup = read(page);
    const hasNormalCta = markup.includes('class=\\"button button-primary\\" href=\\"/contact\\">Request appointment</a>');
    const hasSerializedCta = markup.includes('class=\\"button button-primary\\" href=\\"/contact\\"\\u003eRequest appointment\\u003c/a');
    assert(hasNormalCta || hasSerializedCta, `${page} should show a body appointment CTA before scrolling`);
  }

  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Linked homepage hero care paths. */'), 'missing linked hero care paths CSS layer');
    assert(stylesheet.includes('.hero-access-list a { align-items: center; background: #f7fbff; border: 1px solid rgba(63, 162, 219, 0.18); border-radius: 8px; color: #203442; display: inline-flex; font-size: clamp(13.5px, 0.95vw, 15px); font-weight: 600; gap: 8px; justify-content: flex-start; line-height: 1.22; min-height: 42px; padding: 9px 11px; text-decoration: none; transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease; }'), 'hero service links should look like clean clickable card controls');
    assert(stylesheet.includes('.hero-access-list a:hover, .hero-access-list a:focus-visible { background: #ffffff; border-color: rgba(240, 0, 190, 0.36); color: #126493; transform: translateY(-1px); }'), 'hero service links should have a restrained interactive state');
  }
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
  const linkedSupportTags = [
    '<a href="telehealth.html">Telehealth</a>',
    '<a href="services.html#behavioral-services">Behavioral Health</a>',
    '<a href="wellness.html#weight-management">Weight Management</a>',
    '<a href="wellness.html#vitamin-injections">Vitamin Injections</a>',
  ];
  for (const link of linkedSupportTags) {
    assert(html.includes(link), `homepage support tag should be clickable: ${link}`);
  }
  const nextHome = read('app/page.tsx');
  for (const link of [
    '<a href=\\"/telehealth\\">Telehealth</a>',
    '<a href=\\"/services#behavioral-services\\">Behavioral Health</a>',
    '<a href=\\"/wellness#weight-management\\">Weight Management</a>',
    '<a href=\\"/wellness#vitamin-injections\\">Vitamin Injections</a>',
  ]) {
    assert(nextHome.includes(link), `Next homepage support tag should be clickable: ${link}`);
  }
  assert(read('wellness.html').includes('id="weight-management"'), 'wellness page should expose a weight management anchor');
  assert(read('wellness.html').includes('id="vitamin-injections"'), 'wellness page should expose a vitamin injections anchor');
  assert(css.includes('.support-tags a'), 'support tag links should keep the existing pill styling');
  assert(html.includes('direct-primary-care'), 'homepage should borrow the benchmark direct-primary-care cue');
  assert(html.includes('mental-wellness'), 'homepage should borrow the benchmark mental wellness cue');
  assert(html.includes('chronic-care'), 'homepage should borrow the benchmark chronic care cue');
  assert(css.includes('.depth-grid'), 'missing richer homepage depth grid styling');
  assert(!html.includes('Patient stories'), 'homepage should remove the patient stories section');
  assert(html.includes('aria-label="Provider team"'), 'provider section should remain after removing patient stories');
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
  assert(heroCard.includes('Chronic illness management'), 'hero card should include the chronic illness management cue');
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
  assert(css.includes(leancareFontStack), 'font stack should follow the compact Tablecraft-style Inter pairing');
  assert(css.includes('body { font-size: 14px; }'), 'base font size should be smaller');
  assert(css.includes('h1, h2, h3 { font-family: var(--heading-font); font-variation-settings: normal; }'), 'headings should use the compact sans display treatment');
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
  assert(css.includes(leancareFontStack), 'missing professional compact font stack');
  assert(css.includes('h1, h2, h3, h4, h5, h6, .page-hero h1, .contact-hero h1, .full-video-home .lean-hero-copy h1 { font-family: var(--heading-font); font-weight: 500; letter-spacing: 0; }'), 'heading font should apply globally and to page overrides');
  assert(css.includes('h1, .full-video-home .lean-hero-copy h1, .page-hero h1, .contact-hero h1 { font-weight: 500; }'), 'main headings should use medium Tablecraft-style weight, not bold');
  assert(css.includes('h2, h3, .lean-service-grid h3, .depth-grid strong, .team-card h2, .lean-visit-strip h2, .depth-grid-head h2 { font-weight: 500; }'), 'section and card headings should not be bold');
  assert(css.includes('.eyebrow, .lean-service-grid span, .depth-grid span, .panel-kicker { font-weight: 700; }'), 'small topic labels should not use extra-bold weights');
  assert(css.includes('.site-nav a, .phone-link { font-weight: 500; }'), 'navigation text should be closer to the original site medium weight');
  assert(css.includes('.button, .header-cta { font-weight: 600; }'), 'button text should stay readable without feeling heavy');
  assert(!css.includes('font-weight: 840;'), 'final CSS should not keep the homepage title at 840 weight');
});

test('homepage sections below hero use Tablecraft-style lighter typography instead of bold blocks', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const tablecraftPostHeroLayer = '/* Tablecraft-style post-hero typography cleanup. */';
  const postHeroSectionScale = '.lean-home-services h2, .depth-section h2, .story-team-section h2, .lean-visit-strip h2, .insight-strip h2 { font-family: var(--font-sans); font-size: clamp(21px, 2.2vw, 31px); font-weight: 500; letter-spacing: 0; line-height: 1.12; }';
  const postHeroCardScale = '.lean-service-grid h3, .depth-grid strong, .team-card h2, .insight-list a { font-family: var(--font-sans); font-size: clamp(16px, 1.22vw, 20px); font-weight: 500; letter-spacing: 0; line-height: 1.22; }';
  const postHeroCopyScale = '.lean-home-services p, .depth-section p, .story-team-section p, .lean-visit-strip p, .insight-strip p, .story-cards blockquote p { font-size: clamp(14px, 0.98vw, 15.5px); font-weight: 400; line-height: 1.58; }';
  const postHeroStrongReset = '.depth-section strong, .story-team-section strong, .lean-visit-strip strong, .insight-strip strong, .hero-service-dock strong { font-weight: 500; }';
  const postHeroLabelReset = '.lean-home-services .eyebrow, .depth-section .eyebrow, .story-team-section .eyebrow, .lean-visit-strip .eyebrow, .insight-strip .eyebrow, .lean-service-grid span, .depth-grid span { font-size: 12px; font-weight: 500; letter-spacing: 0.04em; }';
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes(tablecraftPostHeroLayer), 'missing Tablecraft-style post-hero typography cleanup layer');
    assert(stylesheet.includes(postHeroSectionScale), 'post-hero section headings should be compact and medium weight');
    assert(stylesheet.includes(postHeroCardScale), 'post-hero card headings should no longer be bold blocks');
    assert(stylesheet.includes(postHeroCopyScale), 'post-hero copy should be regular, compact, and readable');
    assert(stylesheet.includes(postHeroStrongReset), 'post-hero strong text should not render as heavy bold');
    assert(stylesheet.includes(postHeroLabelReset), 'post-hero labels should use restrained Tablecraft-like sizing');
  }
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
  assert(css.includes('.site-nav a, .phone-link { font-weight: 500; }'), 'nav emphasis should stay controlled');
  assert(css.includes('.button, .header-cta { font-weight: 600; }'), 'button emphasis should stay controlled');
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

test('site-wide regular text has larger readable spacing and icon-only WhatsApp access', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const layout = read('app/layout.tsx');
  const whatsappHref = 'https://wa.me/19042019232';

  for (const page of pages) {
    const html = read(page);
    assert(html.includes(`class="whatsapp-float" href="${whatsappHref}"`), `${page} missing icon-only WhatsApp button`);
    assert(html.includes('aria-label="Chat on WhatsApp"'), `${page} missing WhatsApp accessible label`);
    assert(html.includes('viewBox="0 0 24 24"'), `${page} missing WhatsApp icon SVG`);
    assert(html.includes('M20.52 3.48'), `${page} should use the refined filled WhatsApp mark`);
  }

  assert(layout.includes('className="whatsapp-float"'), 'Next layout missing icon-only WhatsApp button');
  assert(layout.includes(`href="${whatsappHref}"`), 'Next layout should use the provided clinic WhatsApp number');
  assert(layout.includes('M20.52 3.48'), 'Next layout should use the refined filled WhatsApp mark');

  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Final regular-text readability and WhatsApp contact layer. */'), 'missing final text readability/WhatsApp layer');
    assert(stylesheet.includes('body { letter-spacing: 0.002em; word-spacing: 0.018em; }'), 'body text should use subtle professional spacing');
    assert(stylesheet.includes('p:not(.eyebrow), li, dd, .hero-lede, .page-hero > p, .section-copy > p, .contact-hero > div > p, .lean-service-grid p, .depth-copy p, .team-card p, .lean-visit-strip p, .service-panel p, .contact-card p, .insight-list a, .site-footer p, .site-footer a { font-size: clamp(16px, 1.12vw, 18px); letter-spacing: 0.003em; line-height: 1.68; word-spacing: 0.02em; }'), 'regular non-bold copy should be larger with improved spacing');
    assert(stylesheet.includes('h1, h2, h3, h4, h5, h6, strong, b, .button, .site-nav a, .header-info-item, .eyebrow { word-spacing: normal; }'), 'bold/headline/UI text should not inherit loose word spacing');
    assert(stylesheet.includes('.whatsapp-float { align-items: center; background: #25d366; border: 1px solid rgba(255, 255, 255, 0.82); border-radius: 999px; bottom: clamp(18px, 2.4vw, 28px); box-shadow: 0 18px 38px rgba(18, 140, 75, 0.26); color: #ffffff; display: inline-flex; height: 50px; justify-content: center; position: fixed; right: clamp(18px, 2.4vw, 28px); text-decoration: none; transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease; width: 50px; z-index: 1200; }'), 'WhatsApp floating button should be styled as a polished icon-only control');
    assert(stylesheet.includes('.whatsapp-float svg { display: block; fill: currentColor; height: 29px; stroke: none; width: 29px; }'), 'WhatsApp button should show a clean filled icon');
    assert(stylesheet.includes('/* WhatsApp icon and full-width glass top bar refinement. */'), 'missing final WhatsApp/top-bar glass refinement layer');
    assert(stylesheet.includes('.site-header { background: transparent; backdrop-filter: none; box-shadow: 0 14px 36px rgba(16, 33, 49, 0.10); position: sticky; }'), 'site header should not leave a partial plain transparent surface');
    assert(stylesheet.includes('.site-header::before { background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(247, 252, 255, 0.82)); backdrop-filter: saturate(155%) blur(22px); border-bottom: 1px solid rgba(63, 162, 219, 0.14); content: ""; inset: 0; pointer-events: none; position: absolute; z-index: 0; }'), 'header should have one full-width glass backplate across the whole top bar');
    assert(stylesheet.includes('.header-info-strip, .site-header-shell { background: rgba(255, 255, 255, 0.34); backdrop-filter: none; position: relative; z-index: 1; }'), 'both header rows should share the same translucent glass surface');
    assert(stylesheet.includes('.header-info-item { background: rgba(255, 255, 255, 0.24); border-color: rgba(63, 162, 219, 0.08); }'), 'info items should not look like separate opaque patches');
  }
});

test('top menu text is larger and easier to read', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const headerScale = '.site-nav a, .phone-link, .header-actions .button { font-family: var(--font-sans); font-size: clamp(13px, 0.9vw, 14px); font-weight: 500; letter-spacing: 0; line-height: 1.05; }';
  const headerMobileScale = '.site-nav a { font-size: 20px; }';
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Professional header spacing and font refinement. */'), 'missing professional header refinement layer');
    assert(stylesheet.includes('.site-header { column-gap: clamp(18px, 2.4vw, 34px); min-height: 0; padding-left: 0; padding-right: 0; }'), 'header bar should be slimmer and avoid crowding');
    assert(stylesheet.includes('.site-nav { gap: clamp(10px, 1.2vw, 22px); }'), 'header nav links should keep controlled spacing');
    assert(stylesheet.includes(headerScale), 'header nav, phone, and CTA should use a cleaner Inter treatment');
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

test('top information bar uses real icons and a modern utility treatment', () => {
  const nextHeader = read('components/SiteHeader.tsx');
  const css = read('styles.css');
  const globals = read('app/globals.css');
  const home = read('index.html');
  for (const markup of [home, nextHeader]) {
    assert(markup.includes('info-icon-location') || markup.includes('type="location"'), 'top bar should include a location icon');
    assert(markup.includes('info-icon-clock') || markup.includes('type="clock"'), 'top bar should include a clock icon');
    assert(markup.includes('info-icon-phone') || markup.includes('type="phone"'), 'top bar should include a phone icon');
    assert(markup.includes('<svg') || markup.includes('<InfoIcon'), 'top bar icons should be actual SVG icons, not CSS dots');
  }
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Modern utility bar icons and uncluttered rhythm. */'), 'missing modern utility/header rhythm layer');
    assert(stylesheet.includes('.header-info-item::before { content: none; display: none; }'), 'old pseudo-icon blobs should be disabled');
    assert(stylesheet.includes('.info-icon { align-items: center; background: linear-gradient(135deg, #3fa2db, #1d75a8); border-radius: 999px; color: #ffffff; display: inline-flex; flex: 0 0 auto; height: 28px; justify-content: center; width: 28px; }'), 'info icons should use polished brand-blue icon chips');
    assert(stylesheet.includes('.header-info-strip { background: linear-gradient(90deg, rgba(248, 252, 255, 0.98), rgba(239, 250, 255, 0.94)); box-shadow: inset 0 -1px 0 rgba(63, 162, 219, 0.14); }'), 'top bar should have a modern restrained utility treatment');
  }
});

test('pages use cleaner uncluttered rhythm across homepage and inner pages', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('body[data-page="home"] main > section:not(.home-hero) { padding-block: clamp(54px, 6vw, 82px); }'), 'homepage sections should have calmer vertical rhythm');
    assert(stylesheet.includes('.lean-home-services, .depth-section, .story-team-section, .lean-visit-strip, .insight-strip, .cards-section, .split-section, .two-feature { max-width: 1160px; margin-inline: auto; }'), 'major sections should share a clean centered width');
    assert(stylesheet.includes('.lean-service-grid, .depth-grid, .story-cards, .feature-grid, .detail-grid, .values-row, .appointment-grid, .blog-grid { gap: clamp(18px, 2.4vw, 28px); }'), 'card grids should use consistent uncluttered spacing');
    assert(stylesheet.includes('.lean-service-grid article, .depth-grid article, .team-card, .story-cards blockquote, .feature-grid article, .detail-grid article, .values-row article, .appointment-grid article, .blog-grid article { border: 1px solid rgba(63, 162, 219, 0.14); box-shadow: 0 18px 48px rgba(16, 33, 49, 0.07); }'), 'cards should look clean and consistent without heavy clutter');
    assert(stylesheet.includes('.page-hero, .contact-hero { min-height: clamp(300px, 38vw, 430px); }'), 'inner page heroes should be shorter and less crowded');
  }
});

test('header CTA active tabs visit strip and testimonials use the refined UI pass', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Refined header tabs, CTA position, visit strip, and testimonials. */'), 'missing refined header/testimonial correction layer');
    assert(stylesheet.includes('.site-header-shell { padding: 0 clamp(24px, 3.6vw, 54px) 0 clamp(42px, 6.4vw, 96px); }'), 'header appointment CTA should move further right');
    assert(stylesheet.includes('.site-header-shell .header-actions { justify-self: end; transform: translateX(clamp(8px, 1.6vw, 22px)); }'), 'header CTA should be anchored further to the right edge');
    assert(stylesheet.includes('.site-header-shell .site-nav > a.is-active, .site-header-shell .nav-group-label.is-active { background: rgba(255, 255, 255, 0.82); border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(63, 162, 219, 0.34); color: #126493; }'), 'active nav state should be a clean rectangular chip, not a wide pill');
    assert(stylesheet.includes('.lean-visit-strip { background: #f7fbff; border: 1px solid rgba(63, 162, 219, 0.16); border-radius: 22px; color: #102131; }'), 'bottom hours/location section should use a cleaner clinical card');
    assert(stylesheet.includes('.lean-visit-strip h2 { font-size: clamp(24px, 2.8vw, 36px); font-weight: 620; letter-spacing: 0; line-height: 1.08; }'), 'visit strip heading should be corrected and readable');
    assert(stylesheet.includes('.lean-visit-list span { align-items: center; background: #ffffff; border: 1px solid rgba(63, 162, 219, 0.16); border-radius: 14px; color: #25384b; display: flex; font-size: clamp(14px, 1vw, 16px); font-weight: 600; gap: 10px; }'), 'visit strip details should use clean readable cards');
    assert(stylesheet.includes('.patient-story-rail { background: #ffffff; border: 1px solid rgba(63, 162, 219, 0.16); border-radius: 24px; color: #102131; }'), 'testimonial section should no longer use the disliked dark blank styling');
    assert(stylesheet.includes('.story-team-section .story-cards blockquote { opacity: 1; transform: none; }'), 'testimonial cards should remain visible even before reveal effects run');
    assert(stylesheet.includes('.story-cards { display: grid; grid-auto-columns: minmax(260px, 1fr); grid-auto-flow: column; overflow-x: auto; }'), 'testimonials should use a clean horizontal card rail');
  }
});

test('desktop header uses one full glossy glass surface instead of partial transparency', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Desktop glossy glass header correction. */'), 'missing desktop glossy glass header correction layer');
    assert(stylesheet.includes('@media (min-width: 761px) {'), 'desktop glossy correction should not affect the mobile layout');
    assert(stylesheet.includes('.site-header { background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(247, 252, 255, 0.76)); backdrop-filter: saturate(170%) blur(24px); -webkit-backdrop-filter: saturate(170%) blur(24px); box-shadow: 0 18px 42px rgba(16, 33, 49, 0.11); position: sticky; }'), 'desktop header should use one glossy glass surface');
    assert(stylesheet.includes('.site-header::before { background: linear-gradient(115deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.18) 42%, rgba(63, 162, 219, 0.10) 74%, rgba(255, 0, 194, 0.08)); border-bottom: 1px solid rgba(63, 162, 219, 0.16); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92); }'), 'desktop header should have a subtle glossy sheen across the whole bar');
    assert(stylesheet.includes('.header-info-strip, .site-header-shell { background: transparent; backdrop-filter: none; }'), 'desktop header rows should not create separate half-transparent surfaces');
    assert(stylesheet.includes('.site-header-shell { background: linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08)); }'), 'desktop nav shell should keep only a soft gloss, not a separate glass panel');
  }
});

test('desktop information strip uses a clean integrated utility ribbon', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Desktop utility strip clinical ribbon correction. */'), 'missing desktop utility ribbon correction layer');
    assert(stylesheet.includes('.header-info-strip { align-items: center; background: linear-gradient(90deg, rgba(247, 252, 255, 0.92), rgba(239, 249, 255, 0.86)); border-bottom: 1px solid rgba(63, 162, 219, 0.14); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72); display: flex; gap: clamp(22px, 4vw, 64px); justify-content: center; min-height: 32px; padding: 0 clamp(36px, 6vw, 96px); }'), 'desktop info strip should read as one integrated ribbon');
    assert(stylesheet.includes('.header-info-item { background: transparent; border: 0; box-shadow: none; color: #22384a; font-size: 12px; font-weight: 450; gap: 7px; min-height: 32px; padding: 0; }'), 'desktop info items should not render as separate pills');
    assert(stylesheet.includes('.header-info-item + .header-info-item { position: relative; }'), 'desktop info items should have subtle structured separation');
    assert(stylesheet.includes('.header-info-item + .header-info-item::after { background: rgba(63, 162, 219, 0.18); content: ""; height: 14px; left: calc(clamp(22px, 4vw, 64px) / -2); position: absolute; width: 1px; }'), 'desktop info separators should be light dividers, not capsules');
    assert(stylesheet.includes('.header-info-strip .info-icon { background: #2f96cf; box-shadow: 0 5px 12px rgba(47, 150, 207, 0.18); height: 18px; width: 18px; }'), 'desktop info icons should be smaller and neater');
  }
});

test('final header layer removes desktop info pills and upgrades mobile menu', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Effective final header and mobile menu correction. */'), 'missing effective final header/menu correction layer');
    assert(stylesheet.includes('body .site-header .header-info-strip { background: linear-gradient(90deg, #f7fcff 0%, #eef8fd 48%, #f7fbff 100%); border-bottom: 1px solid rgba(63, 162, 219, 0.12); box-shadow: none; gap: clamp(28px, 5vw, 82px); min-height: 30px; padding: 0 clamp(34px, 6vw, 92px); }'), 'desktop info bar needs a visible integrated strip override');
    assert(stylesheet.includes('body .site-header .header-info-item { background: transparent !important; border: 0 !important; border-radius: 0; box-shadow: none !important; min-height: 30px; padding: 0; }'), 'desktop info items should be forced out of pill styling');
    assert(stylesheet.includes('body .site-header .header-info-strip .info-icon { background: transparent; box-shadow: none; color: #278fc8; height: 16px; width: 16px; }'), 'desktop info icons should no longer appear as blue bubbles');
    assert(stylesheet.includes('body.nav-open .site-header-shell::before { background: rgba(16, 33, 49, 0.34); backdrop-filter: blur(8px); content: ""; inset: 88px 0 0; position: fixed; z-index: 90; }'), 'mobile nav should include a polished dimmed backdrop');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav { background: linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(238, 248, 253, 0.96)); border: 1px solid rgba(63, 162, 219, 0.18); border-radius: 26px 26px 0 0; box-shadow: 0 -18px 54px rgba(16, 33, 49, 0.24); display: grid !important; gap: 8px; inset: auto 10px 10px 10px; max-height: min(72vh, 560px); overflow: auto; padding: 18px; position: fixed; z-index: 110; }'), 'mobile nav should become a clear modern bottom sheet');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav > a, body.nav-open .site-header-shell .nav-group-label { background: #ffffff; border: 1px solid rgba(63, 162, 219, 0.14); border-radius: 16px; box-shadow: 0 10px 24px rgba(16, 33, 49, 0.08); color: #102131; font-size: 17px; min-height: 52px; padding: 14px 16px; }'), 'mobile menu links should be large clear cards');
  }
});

test('header command ribbon and mobile nav redesign are visually distinct', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Header command ribbon and mobile nav redesign v2. */'), 'missing unmistakable header/menu redesign layer');
    assert(stylesheet.includes('body .site-header .header-info-strip { background: linear-gradient(90deg, #102131 0%, #126493 52%, #102131 100%) !important; border-bottom: 0; color: #ffffff; min-height: 34px; }'), 'desktop top bar should become a visibly different dark command ribbon');
    assert(stylesheet.includes('body .site-header .header-info-item { color: #ffffff !important; font-weight: 500; opacity: 0.95; }'), 'desktop top bar text should invert for the dark ribbon');
    assert(stylesheet.includes('body .site-header .header-info-strip .info-icon { color: #ffffff; opacity: 0.9; }'), 'desktop top bar icons should be simple white line icons');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav { background: #102131 !important; border: 0; border-radius: 0; color: #ffffff; display: grid !important; gap: 10px; inset: 88px 0 0 0; max-height: none; overflow: auto; padding: 24px 18px 96px; position: fixed; z-index: 130; }'), 'mobile menu should become a full-screen command panel');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav > a, body.nav-open .site-header-shell .nav-group-label { background: rgba(255, 255, 255, 0.10) !important; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 18px; color: #ffffff !important; font-size: 18px; min-height: 58px; padding: 16px 18px; }'), 'mobile menu links should be large high-contrast tiles');
    assert(stylesheet.includes('body.nav-open .site-header-shell .site-nav::before { color: #8ed8ff; content: "LeanCare menu"; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; padding: 4px 2px 10px; text-transform: uppercase; }'), 'mobile menu should have a clear branded label');
  }
});

test('information strip scrolls away while compact nav remains sticky and minimal', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Minimal sticky nav and scrolling info bar refinement. */'), 'missing sticky nav/info bar refinement layer');
    assert(stylesheet.includes('.site-header { position: sticky; top: -36px; z-index: 1000; }'), 'header should use a negative sticky offset so the info strip scrolls away and the nav stays fixed');
    assert(stylesheet.includes('.site-header-shell { position: relative; top: auto; z-index: 2; }'), 'main nav shell should sit above the info strip inside the sticky header');
    assert(stylesheet.includes('.home-hero, .full-video-home { position: relative; z-index: 0; }'), 'hero should stay beneath the sticky navigation layer');
    assert(stylesheet.includes('.hero-video-carousel { z-index: 0; }'), 'hero carousel should never stack over the header');
    assert(stylesheet.includes('.header-info-strip { background: #f8fcff; min-height: 28px; padding: 4px clamp(22px, 5vw, 76px); }'), 'information bar should be smaller and minimal');
    assert(stylesheet.includes('.info-icon { height: 20px; width: 20px; }'), 'information bar icons should be reduced to a decent size');
    assert(stylesheet.includes('.info-icon svg { height: 12px; width: 12px; stroke-width: 2; }'), 'information bar svg icons should be smaller');
    assert(stylesheet.includes('.site-header-shell .site-nav { gap: clamp(30px, 4vw, 58px); }'), 'top nav tabs should have better spacing');
    assert(stylesheet.includes('.site-header-shell .site-nav > a, .site-header-shell .nav-group-label { font-weight: 500; }'), 'top nav text should be less bold');
    assert(stylesheet.includes('.site-header-shell .header-actions .button { font-size: 13px; min-height: 38px; min-width: 174px; padding: 0 18px; }'), 'request appointment button should be smaller');
    assert(stylesheet.includes('.header-info-item { color: #203442; font-family: var(--font-sans); font-size: 12px; font-weight: 400; letter-spacing: 0.01em; min-height: 26px; padding: 2px 10px 2px 3px; }'), 'info bar text should keep its size but use regular readable typography');
    assert(stylesheet.includes('.header-info-item a { color: inherit; font-weight: 400; text-decoration: none; }'), 'info bar links should not appear bold against the other details');
  }
});

test('homepage service cards hero chips and provider section are balanced and readable', () => {
  const css = read('styles.css');
  const globals = read('app/globals.css');
  for (const stylesheet of [css, globals]) {
    assert(stylesheet.includes('/* Balanced offer cards, hero chips, and patient story rail. */'), 'missing balanced homepage cards/story rail layer');
    assert(stylesheet.includes('.hero-access-list span { font-size: clamp(13.5px, 0.95vw, 15px); font-weight: 600; line-height: 1.22; min-height: 42px; }'), 'hero support chips should be more readable');
    assert(stylesheet.includes('.lean-home-services { padding-top: clamp(38px, 4.8vw, 62px); padding-bottom: clamp(38px, 4.8vw, 62px); }'), 'what-we-offer section should reduce dead vertical space');
    assert(stylesheet.includes('.lean-service-grid article { display: grid; grid-template-rows: auto auto 1fr auto; min-height: 260px; padding: clamp(22px, 2.8vw, 34px); }'), 'what-we-offer cards should be balanced and equal height');
    assert(stylesheet.includes('.lean-service-grid article::after { background: linear-gradient(90deg, #3fa2db, #f000be); border-radius: 999px; content: ""; height: 4px; left: 24px; position: absolute; right: 24px; top: 18px; }'), 'service cards should have a restrained brand accent');
    assert(stylesheet.includes('.lean-service-grid { align-items: stretch; grid-template-columns: repeat(3, minmax(0, 1fr)); }'), 'what-we-offer cards should keep equal columns without overflow');
    assert(stylesheet.includes('.lean-service-grid h3 { overflow-wrap: anywhere; text-wrap: balance; font-size: clamp(20px, 1.75vw, 24px); line-height: 1.08; }'), 'long behavioural services heading should wrap inside its card');
    assert(stylesheet.includes('.lean-service-grid p { font-size: clamp(14.5px, 0.98vw, 16px); line-height: 1.55; }'), 'service card body copy should fit neatly');
    assert(stylesheet.includes('.story-team-section { max-width: none; padding: clamp(34px, 4vw, 56px) clamp(18px, 4vw, 48px); }'), 'provider section should span wider and reduce vertical spacing');
    assert(stylesheet.includes('.story-team-section .provider-team-card { grid-column: 1 / -1; grid-template-columns: minmax(240px, 320px) minmax(0, 1fr); max-width: 980px; margin-inline: auto; }'), 'provider card should remain balanced after patient stories are removed');
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

test('homepage removes patient stories while keeping the provider card', () => {
  const html = read('index.html');
  const nextHome = read('app/page.tsx');
  const css = read('styles.css');
  const removedStoryText = [
    'Patient stories',
    'patient-story-rail',
    'story-cards',
    'James Patterson',
    'Danielle Reeves',
    'Finally a clinic that treats me like a person',
    'Dr. Binyanya actually listens',
  ];
  for (const text of removedStoryText) {
    assert(!html.includes(text), `homepage should remove patient story text: ${text}`);
    assert(!nextHome.includes(text), `Next homepage should remove patient story text: ${text}`);
  }
  assert((html.match(/<blockquote>/g) || []).length === 0, 'homepage should not render testimonial blockquotes');
  assert(html.includes('aria-label="Provider team"'), 'provider card section should remain');
  assert(nextHome.includes('Provider team'), 'Next provider card section should remain');
  assert(css.includes('.story-team-section .provider-team-card'), 'provider card styling should remain');
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
    assert(stylesheet.includes('.button, .header-cta, .hero-actions .button-primary, .header-actions .button { font-family: var(--font-sans); font-size: 14px; font-weight: 600; letter-spacing: 0; line-height: 1; }'), 'buttons should use a cleaner compact Inter treatment');
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
