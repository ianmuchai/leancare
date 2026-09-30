import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "About | Leancare Health",
};

const content = "\u003csection class=\"page-hero about-hero\"\u003e\n      \u003cdiv class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\"\u003e\n        \u003cimg class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n      \u003c/div\u003e\u003cp class=\"eyebrow\"\u003eAbout Leancare\u003c/p\u003e\u003ch1\u003eProvider-led care in Jacksonville.\u003c/h1\u003e\u003cp\u003eLeancare provides primary care, behavioral health support, and chronic care management.\u003c/p\u003e\u003c/section\u003e\n    \u003csection class=\"provider-profile reveal\"\u003e\u003cdiv\u003e\u003cimg src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"Eunice Binyanya, DNP, ARNP, FNP-C\" /\u003e\u003c/div\u003e\u003carticle\u003e\u003cp class=\"eyebrow\"\u003eLead Family Practice Provider\u003c/p\u003e\u003ch2\u003eEunice Binyanya, DNP, ARNP, FNP-C\u003c/h2\u003e\u003cp\u003eProvider-led care with practical follow-up.\u003c/p\u003e\u003ca class=\"button button-secondary\" href=\"/contact\"\u003eRequest appointment\u003c/a\u003e\u003c/article\u003e\u003c/section\u003e\n    \u003csection class=\"values-row reveal\"\u003e\u003carticle\u003e\u003cspan\u003e01\u003c/span\u003e\u003ch2\u003eCompassion\u003c/h2\u003e\u003cp\u003eRespectful care.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e02\u003c/span\u003e\u003ch2\u003eIntegrity\u003c/h2\u003e\u003cp\u003eClear follow-through.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e03\u003c/span\u003e\u003ch2\u003eWellness\u003c/h2\u003e\u003cp\u003eOngoing support.\u003c/p\u003e\u003c/article\u003e\u003c/section\u003e";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="about" />
      <RawPage html={content} />
    </>
  );
}