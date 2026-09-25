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
  assert(serviceButtons >= 5, 'services.html should include at least five service tabs');
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

test('home page uses richer image design instead of a single plain hero image', () => {
  const html = read('index.html');
  assert(html.includes('hero-command'), 'home page missing redesigned command hero');
  assert(html.includes('visual-carousel'), 'home page missing visual carousel shell');
  assert(html.includes('floating-glass-card'), 'home page missing supporting floating glass card');
});

test('pages use the original logo asset and exact logo color values', () => {
  const css = read('styles.css');
  const html = read('index.html');
  assert(css.includes('#3fa2db'), 'missing exact logo blue #3fa2db');
  assert(css.includes('#ff00c2'), 'missing exact logo magenta #ff00c2');
  assert(html.includes('https://www.leancarehealth.com/logo.svg'), 'home page missing original logo asset');
});

test('home page includes professional glass, shimmer, and rotating carousel hooks', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  assert(html.includes('data-hero-carousel'), 'home page missing hero carousel hook');
  assert(html.includes('glass-panel'), 'home page missing glass panel markup');
  assert(css.includes('.glass-panel'), 'css missing glass panel styling');
  assert(css.includes('.shimmer'), 'css missing shimmer styling');
  assert(js.includes('initHeroCarousel'), 'script missing hero carousel initializer');
});


test('home page uses premium typography and a non-clone hero command design', () => {
  const html = read('index.html');
  const css = read('styles.css');
  assert(html.includes('family=Plus+Jakarta+Sans'), 'home page missing Plus Jakarta Sans font');
  assert(html.includes('family=Fraunces'), 'home page missing Fraunces display font');
  assert(html.includes('hero-command'), 'home page missing redesigned hero command module');
  assert(html.includes('data-visual-carousel'), 'home page missing interactive carousel module');
  assert(css.includes('--font-display'), 'css missing premium display font token');
  assert(css.includes('.hero-command'), 'css missing hero command styling');
  assert(css.includes('@keyframes carousel-progress'), 'css missing carousel progress animation');
});

test('home hero is compact and uses an interactive glass showcase instead of mobile imagery', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  assert(html.includes('data-visual-carousel'), 'home page missing main visual carousel');
  assert(html.includes('class="carousel-dot is-active"'), 'home page missing carousel controls');
  assert(!html.includes('hero-portrait-stack'), 'home page still includes unnecessary hero image stack');
  assert(css.includes('clamp(38px, 5.6vw, 68px)'), 'hero font scale is still too large');
  assert(css.includes('.visual-carousel'), 'css missing visual carousel styling');
  assert(css.includes('.carousel-progress'), 'css missing carousel progress styling');
  assert(js.includes('initVisualCarousel'), 'script missing visual carousel initializer');
});

test('home page includes dynamic care cockpit and magnetic glass interactions', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  assert(html.includes('data-care-cockpit'), 'home page missing care cockpit section');
  assert(html.includes('data-care-dock'), 'home page missing interactive care dock');
  assert(html.includes('magnetic-card'), 'home page missing magnetic glass cards');
  assert(css.includes('.care-cockpit'), 'css missing care cockpit styling');
  assert(css.includes('.ambient-orb'), 'css missing ambient orb effects');
  assert(css.includes('@keyframes float-orb'), 'css missing floating orb animation');
  assert(js.includes('initCareDock'), 'script missing care dock initializer');
});

test('home page includes a vibrant brand energy rail and removes orb-led decoration', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  assert(html.includes('brand-energy'), 'home page missing brand energy section');
  assert(html.includes('class="kinetic-strip"'), 'home page missing kinetic ticker strip');
  assert(html.includes('data-spotlight-rail'), 'home page missing spotlight rail');
  assert(html.includes('class="spotlight-card is-active"'), 'home page missing active spotlight card');
  assert(!html.includes('ambient-orb'), 'home page still uses orb-led decoration');
  assert(css.includes('.brand-energy'), 'css missing brand energy styling');
  assert(css.includes('@keyframes ribbon-shift'), 'css missing ribbon animation');
  assert(css.includes('.energy-wave'), 'css missing animated energy wave');
  assert(js.includes('initSpotlightRail'), 'script missing spotlight rail initializer');
});

test('home hero uses a real photo carousel instead of abstract text panels', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  const photoSlides = (html.match(/class="media-slide/g) || []).length;
  assert(html.includes('data-media-carousel'), 'home page missing media carousel hook');
  assert(photoSlides >= 3, 'home page should include at least three media slides');
  assert(html.includes('class="media-caption glass-panel"'), 'home page missing glass media caption');
  assert(!html.includes('Care plans that start with listening.'), 'home page still uses abstract text-panel slide');
  assert(css.includes('.media-carousel'), 'css missing media carousel styling');
  assert(css.includes('@keyframes media-kenburns'), 'css missing carousel image motion');
  assert(js.includes('initMediaCarousel'), 'script missing media carousel initializer');
});

test('home hero typography is restrained and visually balanced', () => {
  const css = read('styles.css');
  assert(css.includes('clamp(32px, 4.4vw, 54px)'), 'hero headline max size is still too large');
  assert(css.includes('.hero-content-balanced'), 'css missing balanced hero content treatment');
  assert(css.includes('max-width: 620px'), 'hero content width is still too wide');
});

test('home hero has both background photo carousel and video-style card carousel', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  const bgSlides = (html.match(/data-bg-slide/g) || []).length;
  assert(html.includes('data-bg-carousel'), 'home hero missing background photo carousel');
  assert(bgSlides >= 3, 'background carousel should include at least three photo slides');
  assert(html.includes('video-card-carousel'), 'home hero missing video-style card carousel');
  assert(html.includes('video-play-button'), 'video-style card missing play treatment');
  assert(css.includes('.hero-bg-carousel'), 'css missing background carousel styling');
  assert(css.includes('.video-card-carousel'), 'css missing video card carousel styling');
  assert(js.includes('initBackgroundCarousel'), 'script missing background carousel initializer');
});

test('hero background photo carousel is visually above old gradient layers', () => {
  const css = read('styles.css');
  assert(css.includes('.home-hero.photo-bg-active'), 'css missing explicit photo background active state');
  assert(css.includes('.home-hero.photo-bg-active::before'), 'css missing old gradient disable rule');
  assert(css.includes('z-index: 0; /* photo background visible */'), 'background carousel is still likely behind old hero background');
  assert(css.includes('background: transparent; /* reveal photo carousel */'), 'home hero background is not cleared for photos');
});


test('home page has a real video carousel card and bottom photo background section', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const videoSlides = html.match(/data-slide-video/g) || [];
  assert(videoSlides.length >= 4, 'video carousel card should have four real video elements');
  assert(html.includes('bottom-photo-bg'), 'bottom photo background section missing');
  assert(css.includes('.bottom-photo-bg'), 'bottom photo background CSS missing');
});

test('home hero has compact editorial left tools and cinematic video proportions', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const js = read('script.js');
  assert(html.includes('data-hero-tools'), 'home hero missing dynamic left-side tool cluster');
  assert(html.includes('data-tool-output'), 'home hero missing live tool output panel');
  assert(html.includes('cinematic-card'), 'video card missing cinematic layout class');
  assert(css.includes('.hero-toolkit'), 'css missing hero tool cluster styling');
  assert(css.includes('clamp(27px, 3.5vw, 44px)'), 'left hero headline is not smaller and more balanced');
  assert(css.includes('aspect-ratio: 16 / 8.2'), 'video card should be wider and shorter');
  assert(js.includes('initHeroTools'), 'script missing dynamic hero tool initializer');
});

test('hero video card fills the right media side instead of looking like a snippet', () => {
  const css = read('styles.css');
  assert(css.includes('/* Fill-side video card correction. */'), 'missing fill-side video correction layer');
  assert(css.includes('.hero-media { width: 100%; justify-self: stretch; }'), 'hero media should stretch across its grid side');
  assert(css.includes('width: 100%; /* fill media column */'), 'video card width should fill the media column');
  assert(css.includes('min-height: clamp(390px, 39vw, 540px)'), 'video card should have stronger visual presence');
  assert(css.includes('.cinematic-card .tab-video { inset: 0; height: 100%; width: 100%; object-fit: cover; }'), 'video should cover the full card surface');
});

test('hero video card starts level with the left content card', () => {
  const css = read('styles.css');
  assert(css.includes('/* Hero top-aligned media correction. */'), 'missing top alignment correction layer');
  assert(css.includes('align-items: start; /* align left and video card tops */'), 'hero grid should align both columns to the top');
  assert(css.includes('.hero-command { align-self: start; padding-top: 0; }'), 'hero media wrapper should start at the top of its grid cell');
  assert(css.includes('.video-card-carousel.cinematic-card { align-self: start; margin-top: 0; }'), 'video card should not be vertically centered or offset downward');
});

test('second section is calmer, compact, and balanced after the hero', () => {
  const css = read('styles.css');
  assert(css.includes('/* Balanced second-section correction. */'), 'missing balanced second-section correction layer');
  assert(css.includes('padding: clamp(38px, 5vw, 60px) 6vw;'), 'brand energy section still has too much vertical padding');
  assert(css.includes('opacity: 0.22; /* calmer motion layer */'), 'brand energy motion layer is still too visually busy');
  assert(css.includes('min-height: 280px; /* remove unutilized vertical space */'), 'spotlight shell still has too much empty height');
  assert(css.includes('font-size: clamp(26px, 3vw, 40px);'), 'second-section headline/card type is still oversized');
});

test('left side hero panel is more vibrant without losing readability', () => {
  const css = read('styles.css');
  assert(css.includes('/* Vibrant left hero panel correction. */'), 'missing vibrant left hero correction layer');
  assert(css.includes('.home-hero.photo-bg-active .hero-content::before'), 'left hero panel missing animated brand glow layer');
  assert(css.includes('animation: left-panel-shimmer 8s ease-in-out infinite alternate;'), 'left hero glow should have subtle motion');
  assert(css.includes('box-shadow: 0 28px 90px rgba(63, 162, 219, 0.18), 0 18px 60px rgba(255, 0, 194, 0.14);'), 'left hero panel needs stronger blue/magenta depth');
  assert(css.includes('@keyframes left-panel-shimmer'), 'missing left hero shimmer keyframes');
});

test('top bar navigation words have balanced spacing', () => {
  const css = read('styles.css');
  assert(css.includes('/* Top bar spacing correction. */'), 'missing top bar spacing correction layer');
  assert(css.includes('.site-header { gap: clamp(18px, 2.4vw, 34px); }'), 'header gap should be more balanced');
  assert(css.includes('.site-nav { gap: clamp(8px, 1.1vw, 18px); }'), 'nav links need better spacing between words');
  assert(css.includes('padding: 11px clamp(12px, 1.05vw, 18px);'), 'nav link padding should breathe more evenly');
  assert(css.includes('white-space: nowrap;'), 'nav labels should not wrap awkwardly');
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
  const mediaMatch = html.match(/<div class="media-carousel video-card-carousel[\s\S]*?<\/div>\s*<\/div>\s*<div class="floating-glass-card/);
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
