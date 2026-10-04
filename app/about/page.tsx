import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "About | Leancare Health",
};

const content = "<section class=\"page-hero about-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div><p class=\"eyebrow\">About Leancare</p><h1>Provider-led care in Jacksonville.</h1><p>Leancare provides primary care, behavioral health support, and chronic care management.</p></section>\n    <section class=\"provider-profile reveal doctor-profile\"><div class=\"provider-portrait-frame\"><img src=\"/eunice-binyanya-provider.jpeg\" alt=\"Eunice Binyanya, DNP, ARNP, FNP-C, Lead Family Practice Provider\" /><span>Lead Family Practice Provider</span></div><article><p class=\"eyebrow\">Lead Family Practice Provider</p><h2>Eunice Binyanya, DNP, ARNP, FNP-C</h2><p>Eunice leads Leancare's family practice with a focus on listening first, practical follow-up, and care plans patients can actually live with.</p><div class=\"provider-credentials\"><span>DNP</span><span>ARNP</span><span>FNP-C</span></div><a class=\"button button-secondary\" href=\"/contact\">Request appointment</a></article></section>\n    <section class=\"values-row reveal\"><article><span>01</span><h2>Compassion</h2><p>Respectful care.</p></article><article><span>02</span><h2>Integrity</h2><p>Clear follow-through.</p></article><article><span>03</span><h2>Wellness</h2><p>Ongoing support.</p></article></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="about" />
      <RawPage html={content} />
    </>
  );
}
