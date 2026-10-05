import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Wellness | Leancare Health",
};

const content = "\u003csection class=\"page-hero wellness-hero\"\u003e\n      \u003cdiv class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\"\u003e\n        \u003cimg class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format\u0026fit=crop\u0026w=1600\u0026q=80\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format\u0026fit=crop\u0026w=1600\u0026q=84\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n      \u003c/div\u003e\u003cp class=\"eyebrow\"\u003eWellness\u003c/p\u003e\u003ch1\u003eSupport for weight and wellness goals.\u003c/h1\u003e\u003cp\u003eAsk about weight support and vitamin options during your visit.\u003c/p\u003e\u003ca class=\"button button-primary\" href=\"/contact\"\u003eRequest appointment\u003c/a\u003e\u003c/section\u003e\n    \u003csection class=\"two-feature reveal\"\u003e\u003carticle\u003e\u003cp class=\"eyebrow\"\u003eWeight Management\u003c/p\u003e\u003ch2\u003eWeight support.\u003c/h2\u003e\u003cp\u003eSupervised guidance for practical weight goals.\u003c/p\u003e\u003ca href=\"/contact\"\u003eStart a conversation\u003c/a\u003e\u003c/article\u003e\u003carticle\u003e\u003cp class=\"eyebrow\"\u003eVitamin Injections\u003c/p\u003e\u003ch2\u003eVitamin options.\u003c/h2\u003e\u003cp\u003eSimple options reviewed with the clinic team.\u003c/p\u003e\u003ca href=\"/contact\"\u003eAsk about options\u003c/a\u003e\u003c/article\u003e\u003c/section\u003e\n    \u003csection class=\"metric-band reveal\"\u003e\u003cdiv\u003e\u003cstrong\u003ePersonal\u003c/strong\u003e\u003cspan\u003ePlans fit your goals\u003c/span\u003e\u003c/div\u003e\u003cdiv\u003e\u003cstrong\u003ePractical\u003c/strong\u003e\u003cspan\u003eSteps you can maintain\u003c/span\u003e\u003c/div\u003e\u003cdiv\u003e\u003cstrong\u003eConnected\u003c/strong\u003e\u003cspan\u003eWellness and primary care aligned\u003c/span\u003e\u003c/div\u003e\u003c/section\u003e";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="wellness" />
      <RawPage html={content} />
    </>
  );
}