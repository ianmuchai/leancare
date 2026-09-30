import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Contact | Leancare Health",
};

const content = "\u003csection class=\"contact-hero\"\u003e\n      \u003cdiv class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\"\u003e\n        \u003cimg class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n        \u003cimg class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format\u0026fit=crop\u0026w=1600\u0026q=82\" alt=\"\" /\u003e\n      \u003c/div\u003e\n      \u003cdiv class=\"reveal\"\u003e\u003cp class=\"eyebrow\"\u003eVisit Leancare\u003c/p\u003e\u003ch1\u003eContact Leancare.\u003c/h1\u003e\u003cp\u003eCall, email, or request an appointment.\u003c/p\u003e\u003cdiv class=\"hero-actions\"\u003e\u003ca class=\"button button-primary\" href=\"tel:9042019232\"\u003eCall 904-201-9232\u003c/a\u003e\u003ca class=\"button button-ghost\" href=\"mailto:info@leancaresolutions.com\"\u003eEmail the clinic\u003c/a\u003e\u003c/div\u003e\u003c/div\u003e\n      \u003caside class=\"contact-card reveal\"\u003e\u003ch2\u003eClinic details\u003c/h2\u003e\u003cp\u003e\u003cstrong\u003e3002 Myrtle Ave N, Suite 1\u003c/strong\u003e\u003cbr /\u003eJacksonville, FL 32209\u003c/p\u003e\u003cp\u003e\u003cstrong\u003eMonday-Friday\u003c/strong\u003e\u003cbr /\u003e9:00 a.m.-4:30 p.m.\u003c/p\u003e\u003cp\u003e\u003cstrong\u003ePhone\u003c/strong\u003e\u003cbr /\u003e904-201-9232\u003cbr /\u003e904-374-1121\u003c/p\u003e\u003ca class=\"button button-secondary\" href=\"https://www.google.com/maps/search/?api=1\u0026query=3002%20Myrtle%20Ave%20N%20Suite%201%20Jacksonville%20FL%2032209\"\u003eGet directions\u003c/a\u003e\u003c/aside\u003e\n    \u003c/section\u003e\n    \u003csection class=\"appointment-grid reveal\"\u003e\u003carticle\u003e\u003cspan\u003e01\u003c/span\u003e\u003ch2\u003eCall the clinic\u003c/h2\u003e\u003cp\u003eAsk about availability.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e02\u003c/span\u003e\u003ch2\u003eShare your concern\u003c/h2\u003e\u003cp\u003eTell us which service you need.\u003c/p\u003e\u003c/article\u003e\u003carticle\u003e\u003cspan\u003e03\u003c/span\u003e\u003ch2\u003eArrive prepared\u003c/h2\u003e\u003cp\u003eBring questions and current medications.\u003c/p\u003e\u003c/article\u003e\u003c/section\u003e\n    \u003csection class=\"cta-panel reveal\"\u003e\u003cp class=\"eyebrow\"\u003eImportant\u003c/p\u003e\u003ch2\u003eThis website does not provide medical advice.\u003c/h2\u003e\u003cp\u003eFor emergencies, call 911.\u003c/p\u003e\u003c/section\u003e";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="contact" />
      <RawPage html={content} />
    </>
  );
}