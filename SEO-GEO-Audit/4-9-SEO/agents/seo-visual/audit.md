# Visual & Rendering Audit -- dmdredesign.netlify.app
**Agent:** seo-visual | **Date:** 2026-04-09 | **Status:** COMPLETE
**Target:** https://dmdredesign.netlify.app

## Overall Score: 74/100

## Executive Summary

The site presents a polished, dark-themed luxury furniture brand with strong above-the-fold content on most pages. Heading hierarchy is well-structured across all 10 pages. The primary issues are: missing `<main>` landmarks on Blog and Contact pages, duplicate title tag on the Blog page, missing spaces in multi-line H1 rendering on About and Services pages, several undersized touch targets on mobile, and the hero carousel images all sharing the same generic alt text. Product catalog (180 items) renders correctly with filtering, search, and proper product card structure.

---

## Page-by-Page Analysis

### 1. Homepage (/)
- **Title:** Custom Hospitality Furniture & FF&E Solutions
- **Above-fold:** Hero carousel with 4 rotating background images, H1, tagline paragraph, 2 CTA buttons visible
- **H1:** "Designed. Manufactured. Delivered." -- clear, prominent, gold-colored serif text
- **CTA visibility:** YES -- "Schedule a Call" (primary) and "Request a Quote" (secondary) both visible above fold
- **Hero image loading:** First image eager-loaded; remaining 3 lazy-loaded (correct pattern)
- **Visual issues:**
  - Full-page screenshot shows below-fold sections render as near-black due to lazy-loaded images not triggering during static capture; this is expected Playwright behavior, not a user-facing issue
  - Hero carousel images all have identical alt text "DMD Furnishing commercial hospitality furniture" -- should be unique per slide
- **Heading hierarchy:** H1 > H2 (x6) > H3 (x14) -- clean, no skips
- **Mobile (375x812):** PASS -- responsive hamburger menu, H1 readable, CTAs stacked vertically and prominent, no horizontal scroll detected (scrollWidth === clientWidth at 360px)
- **Stats bar:** 285+ Rooms / 5+ Projects / 180+ Products / Nationwide -- visible below hero
- **Sections audit:** Who We Serve (6 sector cards), Recent Work (4 projects), Before/After slider, Why DMD (6 value props), Process (6 steps), FAQ (7 questions), CTA footer -- all present

### 2. About (/about)
- **Title:** About DMD Furnishing | Hospitality FF&E Manufacturer | DMD Furnishing
- **Above-fold:** Full-width hero image with dark overlay, H1 text, intro paragraph
- **H1:** "Built for Commercial Spaces.Designed for Real-World Use." -- ISSUE: missing space after first period (renders as two lines visually via CSS but textContent concatenates without space)
- **CTA visibility:** YES -- "Schedule a Call" and "Request a Quote" in bottom CTA section
- **Visual issues:** H1 space issue (textContent reads "Spaces.Designed" with no space)
- **Heading hierarchy:** H1 > H2 (x4) > H3 (x11) -- clean
- **Images:** 2 total, both have alt text

### 3. Services (/services)
- **Title:** Commercial Furniture Services | FF&E Solutions | DMD Furnishing
- **Above-fold:** Split hero with text left, image right showing hotel room
- **H1:** "From Concept to Installation.One Team. One Process." -- ISSUE: same missing-space bug ("Installation.One")
- **CTA visibility:** YES -- "Schedule a Consultation" and "See Our Process" (anchor link)
- **Visual issues:**
  - H1 spacing issue as noted
  - Desktop screenshot initially appeared to show same hero as homepage; upon inspection this was a rendering timing issue -- the actual content is distinct
- **Heading hierarchy:** H1 > H2 (x5) > H3 (x7) -- clean
- **Interactive elements:** 6-step process tabs, industry filter buttons (7 industries) -- all functional

### 4. Products (/products)
- **Title:** Commercial Furniture Products | Hotel & Office FF&E | DMD Furnishing
- **Above-fold:** Product Catalog heading, search bar, filter pills (7 Spaces / 21 Categories / 180 Products), category navigation tabs
- **H1:** "Commercial Furniture Catalog" -- clear and SEO-appropriate
- **CTA visibility:** YES -- search bar is primary interaction point; "Book Consultation" in header
- **Visual issues:**
  - Products load all 180 items on a single page with no pagination -- potential performance concern on slower devices
  - Product naming inconsistency: "2-Siter Sofa" appears twice (should be "2-Seater Sofa") -- typo in product data
- **Heading hierarchy:** H1 > H2 (x2: "Filters", "Need help selecting...") -- appropriate for catalog page
- **Mobile:** PASS -- single-column layout, filter button collapses to toggleable sidebar, search prominent

### 5. Products/Hotel (/products/hotel)
- **Title:** Hotels & Motels Furniture | Commercial FF&E Products | DMD Furnishing
- **Above-fold:** Same catalog layout filtered to "Hotels & Motels" (46 products), "Clear all" filter option visible
- **H1:** "Hotels & Motels Furniture" -- good, descriptive
- **CTA visibility:** YES -- search + "Book Consultation"
- **Visual issues:** None detected
- **Heading hierarchy:** H1 > H2 (x2) -- clean

### 6. Projects (/projects)
- **Title:** Hospitality Furniture Projects | Commercial Installations | DMD Furnishing
- **Above-fold:** Full-width hero image with "Project Portfolio" subtitle, H1, description, 2 CTAs
- **H1:** "Spaces We've Transformed" -- compelling, on-brand
- **CTA visibility:** YES -- "Schedule a Consultation" and "Browse Our Work"
- **Visual issues:** None detected
- **Heading hierarchy:** H1 > H2 (x3) > H3 (featured project) -- clean

### 7. Inspirations (/inspirations)
- **Title:** Hospitality Furniture Design Inspirations | DMD Furnishing
- **Above-fold:** Split layout with design concept cards left, hero image right
- **H1:** Present (inside region "Design inspirations")
- **CTA visibility:** YES -- "Schedule a Consultation" and "Explore Concepts"
- **Visual issues:** None detected
- **Heading hierarchy:** H1 > H2 (x2) -- clean

### 8. Blog (/blog)
- **Title:** "FF&E & Commercial Furniture Blog | DMD Furnishing | DMD Furnishing" -- ISSUE: "DMD Furnishing" duplicated
- **Above-fold:** Breadcrumb (Home / Blog), H1, description paragraph, blog article cards
- **H1:** "Commercial Furniture & FF&E Insights" -- good
- **CTA visibility:** No primary CTA above fold (blog is informational)
- **Visual issues:**
  - NO `<main>` tag -- content is in a generic div, not wrapped in `<main>` landmark
  - Title tag has duplicate brand name
  - Only 1 image on entire page (the logo) -- blog cards have no featured images
- **Heading hierarchy:** H1 > H2 (x7: 6 articles + "Related Resources") > H3 (x4 related links) -- clean
- **Articles:** 6 blog posts listed with category badges, excerpts, read-time estimates

### 9. Contact (/contact)
- **Title:** Contact Us | Request a Consultation | DMD Furnishing
- **Above-fold:** Hero image with "Request a Consultation" heading, "Reach Out to Us" section begins
- **H1:** "Request a Consultation" -- clear
- **CTA visibility:** YES -- consultation form visible below fold
- **Visual issues:**
  - NO `<main>` tag -- content wrapped in generic div
  - Form only has 1 visible input field (email) -- appears to use a shadow DOM component or minimal form design; may reduce conversion if users expect name/phone/message fields
  - Duplicate H2: "Request a Consultation" appears as both H1 and H2
- **Heading hierarchy:** H1 > H2 (x2) > H3 (x5: Address, Phone, Email, Showroom Hours, Quick Links) -- acceptable
- **Mobile (375x812):** PASS -- form stacks vertically, contact info visible, hero text readable

### 10. Schedule Call (/schedule-call)
- **Title:** Free Consultation | Hospitality Furniture | DMD Furnishing
- **Above-fold:** Hero with "Schedule a Call" subtitle, H1, description, 2 CTAs
- **H1:** "Speak with a Hospitality Furniture Specialist" -- excellent, specific
- **CTA visibility:** YES -- "Schedule a Call" and "Request a Video Meeting"
- **Visual issues:** None detected
- **Heading hierarchy:** H1 > H2 (x6) -- well-structured with sections for What to Expect, Who This Is For, What You Get, Booking, Why Partner, FAQ

---

## Mobile Audit Summary (375x812)

| Page | Horizontal Scroll | Nav Responsive | H1 Visible | CTA Visible | Touch Target Issues |
|------|-------------------|----------------|------------|-------------|---------------------|
| Homepage | NO (360=360) | YES (hamburger) | YES | YES (stacked) | YES (see below) |
| Products | NO | YES (hamburger) | YES | YES (search) | Minor |
| Contact | NO | YES (hamburger) | YES | YES | Minor |

### Touch Target Issues (Mobile Homepage)
The following elements are below the 48x48px minimum recommended by Google:
- Hamburger menu button: 40x40px (below 48x48)
- "View all 5 projects" link: 121x40px (height below 48)
- Phone number link: 100x23px (height below 48)
- Email link: 157x23px (height below 48)
- Footer links (Home, About, Products, Projects): ~34-88px wide x 20px tall
- "Website Policies" link: 87x20px

---

## Issues Found

### Critical
1. **Blog page missing `<main>` landmark** -- Accessibility and SEO impact. Screen readers and crawlers expect main content wrapped in `<main>`.
2. **Contact page missing `<main>` landmark** -- Same impact as above, and this is a key conversion page.

### High
3. **H1 missing spaces on About and Services pages** -- The multi-line H1s render visually correct via CSS line breaks, but the underlying text content concatenates without spaces ("Spaces.Designed", "Installation.One"). This affects screen readers, search engine crawling, and copy-paste behavior.
4. **Blog title tag duplicated brand name** -- "FF&E & Commercial Furniture Blog | DMD Furnishing | DMD Furnishing" wastes title tag character space.
5. **Hero carousel images share identical alt text** -- All 4 homepage hero slides use "DMD Furnishing commercial hospitality furniture". Each should describe its unique content (guestroom collections, restaurant seating, social lounges, outdoor furniture).
6. **OG image URLs point to wrong domain** -- OG images reference `https://dmdfurnishing.com/...` but the site is deployed at `dmdredesign.netlify.app`. When shared on social media, OG images may not load correctly from the production domain if DNS/hosting differs.

### Medium
7. **Contact form has only email field** -- A consultation request form with only an email input may reduce conversion rate. Users typically expect name, phone, and message fields. (Could be intentional minimal design.)
8. **Touch targets below 48x48px on mobile** -- Hamburger menu (40x40), footer links (20px height), phone/email links in CTA section (23px height). Google flags these in mobile-friendly testing.
9. **Product naming typo** -- "2-Siter Sofa" and "3-Siter Sofa" should be "2-Seater Sofa" and "3-Seater Sofa".
10. **SVG logo intrinsic dimensions** -- The logo SVG has natural dimensions of 20000x18000px while rendered at 80x72px. While browsers handle this, it may cause layout shifts during load.
11. **Products page loads all 180 items** -- No pagination; all products rendered in a single DOM. May impact mobile performance and Largest Contentful Paint.

### Low
12. **Blog cards have no featured images** -- Reduces visual appeal and engagement; also means no image to include in social sharing of blog posts.
13. **Footer social icon SVGs missing aria-hidden** -- Social media icon SVGs in footer lack `aria-hidden="true"` (parent links have proper aria-labels, so impact is minimal).
14. **Contact page duplicate heading** -- "Request a Consultation" appears as both H1 and H2 on the same page.
15. **One decorative SVG missing accessibility attributes** -- A divider/decoration SVG in a generic DIV has no aria-hidden and no accessible label.

---

## Recommendations

### Immediate Fixes (1-2 hours)
1. Add `<main>` tags to Blog and Contact page layouts
2. Fix H1 spacing on About (`Built for Commercial Spaces. Designed for Real-World Use.`) and Services (`From Concept to Installation. One Team. One Process.`) -- add space or `\n` separator in source
3. Fix blog title: change to `FF&E & Commercial Furniture Blog | DMD Furnishing`
4. Write unique alt text for each hero carousel image
5. Fix "2-Siter Sofa" / "3-Siter Sofa" typos in product data

### Short-term (1-2 days)
6. Increase mobile touch targets to 48x48px minimum (hamburger, footer links, phone/email links)
7. Update OG image URLs to match deployment domain or ensure production domain resolves correctly
8. Add `aria-hidden="true"` to decorative SVGs in footer
9. Add featured images to blog post cards
10. Consider adding name/phone/message fields to contact form or clarifying the email-only flow with supporting copy

### Medium-term (1 week)
11. Implement pagination or virtual scrolling for the 180-product catalog
12. Optimize SVG logo dimensions (reduce viewBox to reasonable size)
13. Add breadcrumb navigation to more pages (currently only Blog has it)
