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
  assert(homeBgTags.length >= 3, 'homepage should keep background photo carousel photos');
  assert(homeVideoTags.length >= 4, 'homepage right media card should use four direct video slides');
  for (const tag of homeBgTags) {
    assert(!tag.includes('www.leancarehealth.com/_next/image'), 'homepage background carousel still depends on original-site _next/image URLs');
    assert(/images\.unsplash\.com|images\.pexels\.com/.test(tag), 'homepage background carousel should use direct reliable photo URLs');
  }
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
  assert(bgTags.length >= 3, 'homepage background should keep at least three photo slides');
  assert(videoSources.length >= 4, 'homepage media carousel should provide four video clips');
  assert(new Set(videoSources).size >= 4, 'homepage video clips should be distinct');
  for (const tag of bgTags) {
    assert(/images\.unsplash\.com/.test(tag), 'homepage background photos should use direct Unsplash photo URLs');
    assert(!tag.includes('photo-1511895426328-dc8714191300'), 'homepage should not reuse the old family-sunset photo');
    assert(!tag.includes('photo-1576091160550-2173dba999ef'), 'homepage should not reuse the old telehealth office photo');
  }
  for (const source of videoSources) {
    assert(source.startsWith('https://videos.pexels.com/video-files/'), 'homepage videos should use direct Pexels video files');
  }
  assert(css.includes('/* Homepage distinct opaque video carousel correction. */'), 'missing homepage opaque video correction layer');
  assert(css.includes('/* Homepage true video carousel correction. */'), 'missing true video carousel layer');
  assert(css.includes('.video-card-carousel .video-slide video'), 'homepage video slides should be styled directly');
  assert(js.includes('querySelectorAll(\'[data-slide-video]\')'), 'media carousel should manage multiple slide videos');
});

test('homepage right media card is a video carousel without photo slides', () => {
  const html = read('index.html');
  const js = read('script.js');
  const css = read('styles.css');
  const mediaMatch = html.match(/<div class="media-carousel video-card-carousel[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/);
  assert(mediaMatch, 'homepage media carousel markup not found');
  const media = mediaMatch[0];
  const videoSlides = media.match(/<figure class="media-slide video-slide[\s\S]*?<video/g) || [];
  assert(videoSlides.length >= 4, 'homepage right media card should have at least three video slides');
  assert(!media.includes('<img'), 'homepage right media card should not include photo carousel images');
  assert(!media.includes('data-video-src'), 'homepage right media card should not use hidden photo slides to swap one video source');
  assert(media.includes('data-slide-video'), 'each video carousel slide should expose its own video element');
  assert(css.includes('/* Homepage true video carousel correction. */'), 'missing true video carousel CSS correction');
  assert(css.includes('.video-card-carousel .video-slide video'), 'video carousel slides need direct video styling');
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
  assert(css.includes('.home-hero.photo-bg-active .hero-bg-carousel::after { background: rgba(255, 255, 255, 0.46); }'), 'homepage photo overlay should be more transparent');
  assert(css.includes('.page-photo-carousel::after { background: rgba(255, 255, 255, 0.56); }'), 'inner page photo overlays should reveal more image detail');
  assert(css.includes('.lean-hero-copy { min-height: clamp(430px, 42vw, 560px); padding: clamp(34px, 4.4vw, 62px); }'), 'left hero card should be larger and better proportioned');
  assert(css.includes('.lean-home-hero { grid-template-columns: minmax(430px, 0.96fr) minmax(480px, 1.04fr); }'), 'homepage hero columns should give the left card more presence');
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
  assert(css.includes('.lean-home-hero { min-height: min(760px, calc(100vh - 64px)); }'), 'homepage hero should have a tighter viewport fit');
  assert(css.includes('.lean-hero-copy, .hero-command, .video-card-carousel { min-height: clamp(430px, 50vw, 600px); }'), 'left card and video card should share matched section height');
  assert(css.includes('.video-card-carousel { height: 100%; }'), 'video card should fill its side of the hero');
  assert(css.includes('.lean-home-services { padding-top: clamp(34px, 4.4vw, 58px); }'), 'services section should sit closer to the hero without dead space');
  assert((main.match(/class="button /g) || []).length <= 2, 'homepage main should avoid button clutter');
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
