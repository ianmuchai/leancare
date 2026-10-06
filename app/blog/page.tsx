import type { Metadata } from 'next';
import { PageBodyMarker } from '@/components/PageBodyMarker';
import { RawPage } from '@/components/RawPage';

export const metadata: Metadata = {
  title: "Blog | Leancare Health",
};

const content = "<section class=\"page-hero compact-hero blog-hero\">\n      <div class=\"page-photo-carousel\" data-page-hero-carousel aria-hidden=\"true\">\n        <img class=\"page-photo-slide is-active\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n        <img class=\"page-photo-slide\" data-page-hero-slide src=\"https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=82\" alt=\"\" />\n      </div>\n      <p class=\"eyebrow\">Health tips & insights</p>\n      <h1>Simple guidance between visits.</h1>\n      <p>Short notes on prevention, everyday care, mental wellness, and chronic condition support.</p>\n      <a class=\"button button-primary\" href=\"/contact\">Request appointment</a>\n    </section>\n\n    <section class=\"cards-section reveal blog-grid\">\n      <article><span>Primary Care</span><h2>When to schedule a routine visit</h2><p>Book care when symptoms linger, medications need review, or it is time for screening and prevention.</p><a href=\"/services\">Read more</a></article>\n      <article><span>Behavioural Health</span><h2>Support that starts with listening</h2><p>Confidential care can help with mood, focus, sleep, stress, and medication follow-up.</p><a href=\"/services#behavioral-services\">Read more</a></article>\n      <article><span>Chronic Care</span><h2>Small check-ins can prevent bigger issues</h2><p>Regular monitoring helps keep diabetes, blood pressure, asthma, and cholesterol care on track.</p><a href=\"/services#chronic-disease-management\">Read more</a></article>\n    </section>";

export default function Page() {
  return (
    <>
      <PageBodyMarker page="blog" />
      <RawPage html={content} />
    </>
  );
}
