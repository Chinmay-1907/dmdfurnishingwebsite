# Skill: geo-audit (GEO Checklist) — dmdredesign.netlify.app
**Date:** 2026-04-09 | **Status:** COMPLETE

## Summary
Structured pass/fail GEO audit checklist for DMD Furnishing covering all components of AI search visibility. The site passes technical access requirements but fails on authority, entity, and platform dimensions. Of 10 major checkpoints, 3 pass, 1 is partial, and 6 fail.

## Checklist Results

| Check | Status | Notes |
|-------|--------|-------|
| AI Crawler Access | PASS | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot all allowed in robots.txt |
| llms.txt | PASS | Present with business description, services, and contact info |
| Server-Side Rendering | PASS | Next.js 15 SSR delivers full HTML to all crawlers |
| Schema Markup | PARTIAL | Organization + Product schemas present; sameAs contains broken URLs (LinkedIn 404) |
| Entity Recognition | FAIL | No Wikipedia, Wikidata, or Knowledge Graph presence; AI cannot verify entity |
| Brand Mentions | FAIL | Zero detectable brand mentions on external authoritative sources |
| Content Citability | FAIL | Product descriptions too generic; no unique data points or quotable statistics |
| Platform Readiness | FAIL | Average 35/100; absent from directories, review sites, and industry platforms |
| Social Proof | FAIL | LinkedIn 404; no YouTube; no active social media corroborating entity claims |
| Cross-Source Consistency | FAIL | NAP (Name, Address, Phone) not consistent — appears on zero external citation sources |

## Key Findings
- Technical foundation is strong — the site is fully accessible to AI crawlers with proper SSR and explicit permissions
- The critical gap is external authority: AI systems cross-reference multiple sources to validate entities before citing them, and DMD has zero external corroboration
- Content structure is appropriate for AI consumption but lacks the depth and uniqueness that triggers citation

## Recommendations
- Fix sameAs schema links immediately (broken LinkedIn URL undermines trust signals)
- Establish entity presence on Wikidata, Google Business Profile, and 5+ industry directories within 30 days
- Create a YouTube channel and LinkedIn company page to provide social proof signals
- Enrich on-site content with unique project statistics, materials expertise, and industry insights that AI systems would cite
