import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Contact | Leancare Health",
};

const content = "<section class=\"contact-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div>\n      <div class=\"reveal\"><p class=\"eyebrow\">Visit Leancare</p><h1>Ready for care that does not feel rushed?</h1><p>Call, email, or use the appointment request link to start with the Leancare team.</p><div class=\"hero-actions\"><a class=\"button button-primary\" href=\"tel:9042019232\">Call 904-201-9232</a><a class=\"button button-ghost\" href=\"mailto:info@leancaresolutions.com\">Email the clinic</a></div></div>\n      <aside class=\"contact-card reveal\"><h2>Clinic details</h2><p><strong>3002 Myrtle Ave N, Suite 1</strong><br />Jacksonville, FL 32209</p><p><strong>Monday-Friday</strong><br />9:00 a.m.-4:30 p.m.</p><p><strong>Phone</strong><br />904-201-9232<br />904-374-1121</p><a class=\"button button-secondary\" href=\"https://www.google.com/maps/search/?api=1&query=3002%20Myrtle%20Ave%20N%20Suite%201%20Jacksonville%20FL%2032209\">Get directions</a></aside>\n    </section>\n    <section class=\"appointment-grid reveal\"><article><span>01</span><h2>Call the clinic</h2><p>Speak with the team about availability and the care path that fits your needs.</p></article><article><span>02</span><h2>Share your concern</h2><p>Tell us whether you need primary care, wellness support, telehealth, or behavioral health screening.</p></article><article><span>03</span><h2>Arrive prepared</h2><p>Bring questions. We will help you leave with a clear next step.</p></article></section>\n    <section class=\"cta-panel reveal\"><p class=\"eyebrow\">Important</p><h2>This website does not provide medical advice.</h2><p>For emergencies, call 911.</p></section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="contact" />
      <RawPage html={content} />
    </>
  );
}
