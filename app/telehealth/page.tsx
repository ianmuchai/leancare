import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Telehealth | Leancare Health",
};

const content = "\u003csection class=\"page-hero tele-hero\"\u003e\n      \u003cdiv class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\"\u003e\n        \u003cimg class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format\u0026fit=crop\u0026w=1600\u0026q=80\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n      \u003c/div\u003e\u003cp class=\"eyebrow\"\u003eTelehealth + Behavioral Health\u003c/p\u003e\u003ch1\u003eCare when an office visit is not practical.\u003c/h1\u003e\u003cp\u003eVirtual visits and behavioral health support are available when appropriate.\u003c/p\u003e\u003ca class=\"button button-primary\" href=\"/contact\"\u003eRequest appointment\u003c/a\u003e\u003c/section\u003e\n    \u003csection class=\"split-section\"\u003e\u003cdiv class=\"section-copy reveal\"\u003e\u003cp class=\"eyebrow\"\u003eVirtual access\u003c/p\u003e\u003ch2\u003eVirtual care when appropriate.\u003c/h2\u003e\u003cp\u003eUse telehealth for follow-up questions and select care needs.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"process-list reveal\"\u003e\u003carticle\u003e\u003cspan\u003e1\u003c/span\u003e\u003cp\u003eRequest an appointment or call the clinic.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e2\u003c/span\u003e\u003cp\u003eComplete secure intake or screening steps when needed.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e3\u003c/span\u003e\u003cp\u003eMeet with your provider and leave with a clear next step.\u003c/p\u003e\u003c/article\u003e\u003c/div\u003e\u003c/section\u003e";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="telehealth" />
      <RawPage html={content} />
    </>
  );
}