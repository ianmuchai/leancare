import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Telehealth | Leancare Health",
};

const content = "<section class=\"page-hero tele-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div><p class=\"eyebrow\">Telehealth + Behavioral Health</p><h1>Real care, even when your day will not slow down.</h1><p>Virtual visits and confidential screenings help your provider tailor guidance before and during your visit.</p><a class=\"button button-primary\" href=\"/contact\">Request appointment</a></section>\n    <section class=\"split-section\"><div class=\"section-copy reveal\"><p class=\"eyebrow\">Virtual access</p><h2>Care that fits between work, family, and everything else.</h2><p>Use telehealth for medical guidance, follow-ups, and select prescription needs from the comfort of home.</p></div><div class=\"process-list reveal\"><article><span>1</span><p>Request an appointment or call the clinic.</p></article><article><span>2</span><p>Complete secure intake or screening steps when needed.</p></article><article><span>3</span><p>Meet with your provider and leave with a clear next step.</p></article></div></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="telehealth" />
      <RawPage html={content} />
    </>
  );
}
