import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Family Practice | Leancare Health",
};

const content = "<section class=\"page-hero service-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div><p class=\"eyebrow\">Family Practice</p><h1>Primary care that knows your name and your context.</h1><p>From preventive visits to everyday concerns, Leancare helps families move through healthcare with more clarity and less rush.</p><a class=\"button button-primary\" href=\"/contact\">Request appointment</a></section>\n    <section class=\"detail-grid reveal\"><article><span>01</span><h2>Everyday health</h2><p>Support for common concerns, follow-ups, medication questions, and routine care.</p></article><article><span>02</span><h2>Preventive focus</h2><p>Guidance that helps you stay ahead of small issues before they become bigger ones.</p></article><article><span>03</span><h2>Family-centered</h2><p>Care built for real schedules, real questions, and long-term trust.</p></article></section>\n    <section class=\"split-section\"><div class=\"section-copy reveal\"><p class=\"eyebrow\">How visits feel</p><h2>More signal. Less scramble.</h2><p>You should leave understanding what is happening, what comes next, and how your care plan fits your life.</p></div><div class=\"image-panel reveal\"><img src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=82\" alt=\"A healthcare provider holding a stethoscope\" /></div></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="family-practice" />
      <RawPage html={content} />
    </>
  );
}
