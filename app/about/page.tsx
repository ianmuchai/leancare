import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "About | Leancare Health",
};

const content = "<section class=\"page-hero about-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div><p class=\"eyebrow\">About Leancare</p><h1>A clinic built around listening first.</h1><p>At Leancare, patient-centered care means making space for your whole story and building care plans around the person, not the chart alone.</p></section>\n    <section class=\"provider-profile reveal\"><div><img src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=82\" alt=\"Eunice Binyanya, DNP, ARNP, FNP-C\" /></div><article><p class=\"eyebrow\">Lead Family Practice Provider</p><h2>Eunice Binyanya, DNP, ARNP, FNP-C</h2><p>Leading Leancare's family practice with a focus on listening first and building lasting, trusting relationships with every patient.</p><a class=\"button button-secondary\" href=\"/contact\">Request appointment</a></article></section>\n    <section class=\"values-row reveal\"><article><span>01</span><h2>Compassion</h2><p>Care that makes people feel heard, respected, and supported.</p></article><article><span>02</span><h2>Integrity</h2><p>Clear communication and follow-through you can trust.</p></article><article><span>03</span><h2>Wellness</h2><p>Health support that looks beyond a single appointment.</p></article></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="about" />
      <RawPage html={content} />
    </>
  );
}
