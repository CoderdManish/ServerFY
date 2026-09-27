# ServerFY robots.txt and pricing selector

## Outcome
- Replace the current multi-plan pricing presentation with one dynamic access card and a compact central selector.
- Apply the same pricing experience everywhere the shared pricing section appears, including the homepage and `/pricing`.
- Adapt the uploaded crawler format for ServerFY while excluding irrelevant WordPress rules.

## Pricing
- Keep one primary pricing card and remove the Professional and Advanced cards.
- Add controls for access type, module, and duration.
- Functional pricing: 1 month ₹1,300; 2 months ₹2,200; 3 months ₹2,800; 6 months ₹5,500.
- Technical pricing: 1 month ₹1,400; 2 months ₹2,500; 3 months ₹3,000; 6 months ₹5,800.
- Update the primary card price, duration, audience, features, and WhatsApp enquiry message immediately when selections change.
- Mark specialist modules such as IBP and GRC as “Contact us” and send their selected requirement to WhatsApp instead of showing a fixed price.
- Keep the Dedicated card as a custom-contact option and align the surrounding comparison/chooser content with the new model.
- Match the existing navy/orange ServerFY theme with a compact, responsive console-style selector and accessible form controls.

## robots.txt
- Preserve public crawling and the existing admin-console restriction.
- Add explicit groups for Google, Bing, Apple, OpenAI, Claude, Perplexity, and social preview crawlers based on the supplied format.
- Block tracking-parameter duplicates and the hidden admin route within every named crawler group.
- Keep the ServerFY sitemap URL and omit WordPress-only paths that do not exist in this app.

## Verification
- Check the homepage and pricing page on mobile and desktop.
- Confirm selector-driven prices and specialist WhatsApp links.
- Confirm the final crawler file points to the ServerFY sitemap and retains admin exclusions.
