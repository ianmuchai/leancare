# Professional Multi-Page Wellness Brand Redesign

## Purpose

Rebuild the current LeanCare Health & Wellness site into a professional, multi-page wellness brand experience. The result should feel dynamic, polished, credible, and memorable without looking like a cheap template or a single scrolling landing page.

## Key Feedback Addressed

- Replace the one-page scroll structure with real static pages.
- Redesign the first page so it feels more premium, intentional, and healthcare-appropriate.
- Increase dynamic behavior beyond basic scroll reveals.
- Use more professional typography and avoid cheap-template font choices.
- Keep the energy and wellness personality, but control it with stronger design discipline.

## Audience

The site is for Jacksonville-area patients and families looking for approachable primary care, wellness support, telehealth, behavioral health screenings, weight management, and vitamin injections. The experience should make the practice feel warm, modern, energetic, medically credible, and easy to contact.

## Success Criteria

- The home page first viewport feels premium, confident, and wellness-forward.
- The site uses a true multi-page structure instead of one long scrolling page.
- Navigation between pages is obvious on desktop and mobile.
- Appointment and phone actions are visible and repeated without overwhelming the layout.
- Core clinic facts remain accurate and easy to scan: address, hours, phone numbers, email, services, and emergency disclaimer.
- Motion and interaction add energy and usefulness without blocking access to content.
- Typography feels modern, professional, and healthcare-appropriate.
- The implementation remains static HTML, CSS, and JavaScript.

## Content Direction

Use the existing live-site positioning as the factual base:

- Bringing wellness, compassion, and integrity in healthcare.
- Personal, unhurried healthcare for Jacksonville families.
- Services: family practice, telehealth, behavioral health, weight management, vitamin injections.
- Lead provider: Eunice Binyanya, DNP, ARNP, FNP-C.
- Location: 3002 Myrtle Ave N, Suite 1, Jacksonville, FL 32209.
- Hours: Monday-Friday, 9:00 a.m.-4:30 p.m.; Saturday-Sunday closed.
- Contact: 904-201-9232, 904-374-1121, info@leancaresolutions.com.

The copy tone should be professional, clear, and energetic. Use concise headlines, confident service framing, and warm patient-centered language. Avoid exaggerated wellness hype.

## Visual System

Use a vivid but controlled palette rather than a single-hue theme. The visual foundation should feel professional and clinical enough for healthcare, with energetic accents for wellness:

- Deep ink for authority.
- Clean white and soft mist backgrounds for clarity.
- Teal and green for health and calm.
- Coral and citron accents for energy.

Typography should move away from cheap-template display fonts. Use a modern professional sans stack for most content, with a refined editorial accent only where it improves hierarchy. Prioritize readable, confident type over novelty.

Avoid a medical-template look. Do not bury the brand in small nav text. The first viewport must clearly signal LeanCare, healthcare, wellness, and Jacksonville access.

## Site Structure

Build a true multi-page static site:

- `index.html`: Home page with a premium hero, service preview, trust snapshot, and clear routes into the rest of the site.
- `services.html`: Overview of all services with dynamic service tabs or filters.
- `family-practice.html`: Primary care and family practice page.
- `wellness.html`: Weight management and vitamin injection wellness page.
- `telehealth.html`: Telehealth and behavioral health access page.
- `about.html`: Practice story, provider feature, and care philosophy.
- `contact.html`: Appointment CTA, address, hours, phone numbers, email, and visit details.

Each page should feel like a complete destination, not an anchor section extracted from a long page.

## Shared Layout

- Persistent header with real page navigation.
- Strong active-page state.
- Appointment CTA and phone CTA in the header.
- Mobile drawer navigation that feels polished.
- Shared footer with brand, core links, contact information, hours, and emergency disclaimer.

## Home Page

- Premium first viewport with a strong LeanCare brand presence, concise headline, appointment CTA, phone CTA, clinic-status card, and image treatment.
- Avoid the current overly stylized magazine-template feel.
- Include a service preview that routes users to separate service pages.
- Add trust signals: rating, unhurried care, Jacksonville location, weekday hours, provider-led care.
- Keep below-fold content useful, but do not make the home page behave like all pages stacked vertically.

## Services Experience

The services page should be more dynamic than a static list:

- Use service filters or tabbed cards for Family Practice, Telehealth, Behavioral Health, Weight Management, and Vitamin Injections.
- Selecting a service updates a detail panel with what it is for, visit type, and primary CTA.
- Each major service should also route to the relevant dedicated page.

## About / Trust

- Feature Eunice Binyanya, DNP, ARNP, FNP-C with a relationship-centered care message.
- Include patient-centered credibility without inventing medical claims.
- Use refined spacing, tasteful image treatment, and clear hierarchy.

## Contact / Appointment

- Make address, hours, phone numbers, email, and appointment action highly visible.
- Include quick action buttons for call, email, and directions.
- Include a concise emergency disclaimer.

## Interaction Design

Use lightweight JavaScript only:

- Mobile drawer open/close with `aria-expanded`.
- Active page highlighting based on the current file.
- Service tabs or filters with keyboard-accessible buttons.
- Dynamic service detail panel on `services.html`.
- Testimonial or trust-card carousel where appropriate.
- Subtle page-load and scroll reveal animations using IntersectionObserver.
- Optional progress accent only if it feels professional and does not cheapen the site.

Interactions must not hide essential information from keyboard or small-screen users.

## Accessibility

- Use semantic HTML landmarks and section headings.
- Keep links and buttons keyboard reachable.
- Provide descriptive alt text for images.
- Maintain strong color contrast for text.
- Respect `prefers-reduced-motion` by disabling large animation effects.
- Avoid tiny text in critical content areas.

## Implementation Scope

Create or replace these local static files:

- `index.html`: professional home page.
- `services.html`: dynamic services overview.
- `family-practice.html`: family practice page.
- `wellness.html`: wellness services page.
- `telehealth.html`: telehealth and behavioral health page.
- `about.html`: provider and practice story page.
- `contact.html`: contact and appointment page.
- `styles.css`: shared responsive visual system and motion styles.
- `script.js`: shared navigation and page interactions.

No build system, framework, or dependency installation is needed.

## Verification

Because this is a static site, verify by opening `index.html` in a browser or serving the folder locally. Check:

- Desktop layouts for all pages at common wide viewport sizes.
- Mobile layout around 390px width.
- Navigation between pages.
- Mobile drawer behavior.
- Service-tab interaction.
- Testimonial or trust-card behavior.
- No obvious text overlap.
- Reduced-motion CSS path exists.
