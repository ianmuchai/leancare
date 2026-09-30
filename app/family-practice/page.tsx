import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Primary Care | Leancare Health",
};

const content = "\u003csection class=\"page-hero service-hero\"\u003e\n      \u003cdiv class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\"\u003e\n        \u003cimg class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n      \u003c/div\u003e\u003cp class=\"eyebrow\"\u003eFamily Practice\u003c/p\u003e\u003ch1\u003ePrimary care for everyday needs.\u003c/h1\u003e\u003cp\u003eVisits, prevention, labs, medication refills, and follow-up.\u003c/p\u003e\u003ca class=\"button button-primary\" href=\"/contact\"\u003eRequest appointment\u003c/a\u003e\u003c/section\u003e\n    \u003csection class=\"detail-grid reveal\"\u003e\u003carticle\u003e\u003cspan\u003e01\u003c/span\u003e\u003ch2\u003eEveryday health\u003c/h2\u003e\u003cp\u003eSupport for common concerns, follow-ups, medication questions, and routine care.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e02\u003c/span\u003e\u003ch2\u003ePreventive focus\u003c/h2\u003e\u003cp\u003eGuidance that helps you stay ahead of small issues before they become bigger ones.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e03\u003c/span\u003e\u003ch2\u003eFamily-centered\u003c/h2\u003e\u003cp\u003eCare built for real schedules, real questions, and long-term trust.\u003c/p\u003e\u003c/article\u003e\u003c/section\u003e\n    \u003csection class=\"split-section\"\u003e\u003cdiv class=\"section-copy reveal\"\u003e\u003cp class=\"eyebrow\"\u003eHow visits feel\u003c/p\u003e\u003ch2\u003eClear visits. Clear next steps.\u003c/h2\u003e\u003cp\u003eWe keep visits practical and easy to understand.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"image-panel reveal\"\u003e\u003cimg src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"A healthcare provider holding a stethoscope\" /\u003e\u003c/div\u003e\u003c/section\u003e";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="family-practice" />
      <RawPage html={content} />
    </>
  );
}