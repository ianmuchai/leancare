import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Wellness | Leancare Health",
};

const content = "<section class=\"page-hero wellness-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div><p class=\"eyebrow\">Wellness</p><h1>Support for the habits, energy, and momentum you want back.</h1><p>Leancare wellness services connect physician-supervised weight care with targeted vitamin injection options.</p><a class=\"button button-primary\" href=\"/contact\">Request appointment</a></section>\n    <section class=\"two-feature reveal\"><article><p class=\"eyebrow\">Weight Management</p><h2>Built around your actual life.</h2><p>Sustainable, physician-supervised weight loss support tailored to your goals, routines, and health picture.</p><a href=\"/contact\">Start a conversation</a></article><article><p class=\"eyebrow\">Vitamin Injections</p><h2>Targeted wellness support.</h2><p>Nutrient injection therapy designed to support energy, immunity, and overall wellness goals.</p><a href=\"/contact\">Ask about options</a></article></section>\n    <section class=\"metric-band reveal\"><div><strong>Personal</strong><span>Plans fit your goals</span></div><div><strong>Practical</strong><span>Steps you can maintain</span></div><div><strong>Connected</strong><span>Wellness and primary care aligned</span></div></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="wellness" />
      <RawPage html={content} />
    </>
  );
}
