# High-Energy Wellness Brand Redesign

## Purpose

Rebuild the current static LeanCare Health & Wellness website into a high-energy wellness brand experience with louder visuals, playful interactions, and a more editorial voice. The page should still feel trustworthy enough for healthcare while moving away from a quiet clinic brochure.

## Audience

The site is for Jacksonville-area patients and families looking for approachable primary care, wellness support, telehealth, behavioral health screenings, weight management, and vitamin injections. The experience should make the practice feel warm, modern, active, and easy to contact.

## Success Criteria

- The first viewport immediately feels bold, memorable, and wellness-forward.
- Appointment and phone actions are visible and repeated without overwhelming the page.
- Core clinic facts remain accurate and easy to scan: Jacksonville address, weekday hours, phone numbers, email, services, and emergency disclaimer.
- The redesign works as a static site using only `index.html`, `styles.css`, and `script.js`.
- Mobile layout feels intentionally designed, not just compressed.
- Motion and interaction add energy without blocking access to content.

## Content Direction

Use the existing live-site positioning as the factual base:

- Bringing wellness, compassion, and integrity in healthcare.
- Personal, unhurried healthcare for Jacksonville families.
- Services: family practice, telehealth, behavioral health, weight management, vitamin injections.
- Lead provider: Eunice Binyanya, DNP, ARNP, FNP-C.
- Location: 3002 Myrtle Ave N, Suite 1, Jacksonville, FL 32209.
- Hours: Monday-Friday, 9:00 a.m.-4:30 p.m.; Saturday-Sunday closed.
- Contact: 904-201-9232, 904-374-1121, info@leancaresolutions.com.

The copy tone should become more editorial and energetic: short punchy headlines, confident service framing, and warm patient-centered language.

## Visual System

The redesign should use a vivid, mixed palette rather than a single-hue theme. The page may use electric coral, acid yellow, teal, warm cream, ink, and fresh green accents. Typography should pair expressive display headlines with clean readable body text. Layout should favor full-width bands, asymmetric editorial composition, kinetic cards, big numbers, stamps, strips, and image-forward moments.

Avoid a medical-template look. Do not bury the brand in small nav text. The first viewport must clearly signal LeanCare and wellness care.

## Page Structure

1. Header
   - Sticky or floating navigation.
   - Brand mark and direct links to services, experience, provider, visit, and appointment.
   - Primary appointment CTA and mobile menu.

2. Hero
   - Large editorial headline around feeling cared for, heard, and energized.
   - Strong appointment and phone CTAs.
   - Real clinic facts as visual badges: rating, open hours, Jacksonville, unhurried care.
   - Energetic image treatment using available remote images from the live site.

3. Service Lanes
   - Five service cards: family practice, telehealth, behavioral health, weight management, vitamin injections.
   - Cards should be colorful, interactive, and scannable.
   - A selected-card interaction can update a short detail panel.

4. Experience Section
   - Explain what makes LeanCare different: listening first, personal plans, follow-through.
   - Use bold steps or rhythm rather than dense paragraphs.

5. Provider / Trust Section
   - Feature Eunice Binyanya with credentials and a relationship-centered care message.
   - Include patient-centered credibility without inventing medical claims.

6. Social Proof
   - Use short patient quote cards or rotating testimonials.
   - Keep quotes concise and framed as patient stories.

7. Visit / Appointment Section
   - Make address, hours, phone, email, and appointment action highly visible.
   - Include a final energetic CTA.

8. Footer
   - Include brand, services, contact information, copyright, and emergency disclaimer.

## Interaction Design

Use lightweight JavaScript only:

- Mobile menu open/close with `aria-expanded`.
- Scroll reveal animations using IntersectionObserver.
- Service card selection that updates a detail panel.
- Testimonial rotation or manual quote switching.
- Optional subtle pointer-following or scroll-progress accent if it remains performant and non-disruptive.

Interactions must not hide essential information from keyboard or small-screen users.

## Accessibility

- Use semantic HTML landmarks and section headings.
- Keep links and buttons keyboard reachable.
- Provide descriptive alt text for images.
- Maintain strong color contrast for text.
- Respect `prefers-reduced-motion` by disabling large animation effects.
- Avoid tiny text in critical content areas.

## Implementation Scope

Replace the existing local static files:

- `index.html`: rebuilt markup and content structure.
- `styles.css`: full responsive visual system and motion styles.
- `script.js`: navigation and small interactions.

No build system, framework, or dependency installation is needed.

## Verification

Because this is a static site, verify by opening `index.html` in a browser or serving the folder locally. Check:

- Desktop layout at common wide viewport sizes.
- Mobile layout around 390px width.
- Mobile menu behavior.
- Service-card interaction.
- Testimonial behavior.
- No obvious text overlap.
- Reduced-motion CSS path exists.
