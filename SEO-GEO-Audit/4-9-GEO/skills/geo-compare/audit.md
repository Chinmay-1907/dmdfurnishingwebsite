# GEO Cross-Platform Comparison Audit

**URL:** https://dmdredesign.netlify.app (production: dmdfurnishing.com)
**Date:** 2026-04-09
**Status:** COMPLETE
**Source:** geo-platform-analysis agent audit findings

---

## Platform Score Comparison

| Platform | Score | Grade | Best Dimension | Worst Dimension |
|----------|-------|-------|----------------|-----------------|
| Google AI Overviews | 44/100 | D+ | Content Structure (58) | Source Authority (18) |
| Google Gemini | 35/100 | D | Content Quality (62) | Google Ecosystem (12) |
| Bing Copilot | 34/100 | D | Technical Signals (62) | Microsoft Ecosystem (10) |
| ChatGPT Web Search | 32/100 | D | Content Preferences (45) | Entity Recognition (22) |
| Perplexity AI | 28/100 | F | Source Directness (52) | Community Validation (5) |
| **Overall Average** | **34.6/100** | **D** | | |

---

## Dimension Heatmap

Scores for each evaluation dimension across all platforms. Higher is better.

### On-Site Dimensions (DMD controls directly)

| Dimension | Platform | Score | Assessment |
|-----------|----------|-------|------------|
| Content Structure | Google AIO | 58 | Question headings + FAQ schema present but missing snippet-bait paragraphs and tables |
| Content Quality | Gemini | 62 | 6 long-form articles, good topical clustering, professional tone |
| Content Preferences | ChatGPT | 45 | Factual writing, niche expertise, but no author attribution or data tables |
| Content Preferences | Bing Copilot | 50 | Professional tone, structured headings, detailed service descriptions |
| Source Directness | Perplexity | 52 | Original first-party content, but not uniquely citable |
| Technical SEO | Google AIO | 52 | Excellent schema + SSR, but no IndexNow, domain mismatch in sitemap |
| Technical Signals | Bing Copilot | 62 | Fast TTFB (<110ms), clean URLs, SSR, OG tags |
| Technical Access | Perplexity | 15 | Crawler allowed but zero discovery paths exist |
| Crawler Access | ChatGPT | 25 | All AI bots allowed; staging domain and zero Bing presence hurt |

**On-site average: 47/100** -- The site's technical implementation and content quality are its relative strengths.

### Off-Site Dimensions (External actions required)

| Dimension | Platform | Score | Assessment |
|-----------|----------|-------|------------|
| Source Authority | Google AIO | 18 | Zero backlinks, no GBP, no third-party mentions |
| Entity Recognition | ChatGPT | 22 | No Wikipedia/Wikidata, LinkedIn 404, brand collision with DMD disease |
| Knowledge Graph | Gemini | 30 | Rich schema but zero external corroboration |
| Google Ecosystem | Gemini | 12 | No GBP, no YouTube, no Merchant Center |
| Microsoft Ecosystem | Bing Copilot | 10 | LinkedIn 404, no GitHub, no Bing Places |
| Bing Index Strength | Bing Copilot | 15 | No BWT verification, no IndexNow, likely not indexed |
| Community Validation | Perplexity | 5 | Zero Reddit, zero forums, zero review sites |
| Freshness | Perplexity | 40 | Recent dates but low publishing volume |

**Off-site average: 19/100** -- This is the critical weakness. DMD is essentially invisible to external validation systems.

---

## Gap Analysis: On-Site vs. Off-Site

```
ON-SITE READINESS:   ████████████████████░░░░░░░░░░░░░░░░░░░░  47/100
OFF-SITE AUTHORITY:  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  19/100
                     ──────────────────────────────────────────
GAP:                 28 points
```

The 28-point gap between on-site readiness and off-site authority represents the core problem. DMD has built a technically sound, well-structured website with quality content, but has done virtually nothing to establish the business's existence in the broader web ecosystem that AI platforms use to validate sources.

---

## Platform-by-Platform Signal Requirements

### What Each Platform Needs Most (Top 3 signals, ranked)

| Rank | Google AIO | ChatGPT | Perplexity | Gemini | Bing Copilot |
|------|-----------|---------|------------|--------|-------------|
| #1 | Backlinks for organic ranking | Wikipedia/Wikidata entry | Reddit/forum mentions | Google Business Profile | Bing index presence |
| #2 | Direct-answer paragraph format | LinkedIn company page (working) | Original citable research | YouTube channel | IndexNow protocol |
| #3 | Google Business Profile | Named expert authors | Community participation | Topical depth (15+ articles) | LinkedIn company page (working) |

### What DMD Currently Has vs. What Each Platform Requires

| Signal | DMD Has It? | Google AIO | ChatGPT | Perplexity | Gemini | Bing |
|--------|-------------|-----------|---------|------------|--------|------|
| SSR HTML | YES | Needs | Needs | Needs | Needs | Needs |
| Schema markup | YES | Needs | Needs | Neutral | Needs | Neutral |
| AI crawler access | YES | Neutral | Needs | Needs | Neutral | Neutral |
| Fast page load | YES | Needs | Neutral | Neutral | Neutral | Needs |
| OG/Twitter meta tags | YES | Neutral | Neutral | Neutral | Neutral | Needs |
| FAQ schema | YES | Needs | Needs | Neutral | Needs | Neutral |
| Speakable markup | YES | Needs | Neutral | Neutral | Neutral | Neutral |
| Long-form content | YES (6 posts) | Needs | Needs | Needs | Needs | Needs |
| Backlinks | NO (zero) | CRITICAL | Important | Important | Important | Important |
| Google Business Profile | NO | Important | Neutral | Neutral | CRITICAL | Helpful |
| Wikipedia article | NO | Helpful | CRITICAL | Helpful | Important | Helpful |
| Wikidata entry | NO | Helpful | CRITICAL | Helpful | Important | Helpful |
| LinkedIn page | NO (404) | Helpful | Important | Neutral | Helpful | CRITICAL |
| YouTube channel | NO | Helpful | Neutral | Helpful | CRITICAL | Neutral |
| Reddit mentions | NO (zero) | Helpful | Helpful | CRITICAL | Neutral | Neutral |
| IndexNow | NO | Neutral | Helpful | Neutral | Neutral | CRITICAL |
| BWT verification | NO | Neutral | Important | Neutral | Neutral | CRITICAL |
| Named author bios | NO | Helpful | Important | Helpful | Important | Helpful |
| Comparison tables | NO | Important | Helpful | Neutral | Helpful | Important |
| Direct-answer paragraphs | NO | CRITICAL | Helpful | Neutral | Helpful | Helpful |

**Legend:** CRITICAL = platform-specific blocker | Important = significant factor | Helpful = contributes | Neutral = minimal effect | Needs = uses this signal

---

## Brand Collision Impact Across Platforms

"DMD" = Duchenne Muscular Dystrophy in every major knowledge base.

| Platform | Entity Resolution Behavior | Impact on DMD Furnishing |
|----------|---------------------------|--------------------------|
| Google AIO | Uses Knowledge Graph; "DMD" resolves to disease | SEVERE: Full brand queries may trigger medical AIO instead of business |
| ChatGPT | Uses Bing + Wikipedia; "DMD" = disease entity | SEVERE: ChatGPT will discuss the disease unless "DMD Furnishing" is specified exactly |
| Perplexity | Uses web + Reddit; "DMD" on Reddit = disease | SEVERE: Community signals all point to medical content |
| Gemini | Uses Google KG + YouTube; "DMD" = disease | SEVERE: Knowledge Panel for "DMD" is the disease |
| Bing Copilot | Uses Bing KG + LinkedIn; "DMD" = disease | SEVERE: Even "DMD furniture" may trigger disambiguation |

**Cross-platform mitigation:** Always use "DMD Furnishing" (never just "DMD") in every external reference, anchor text, directory listing, social profile, and structured data. Create Wikidata entry with explicit "different from" relation to disambiguate.

---

## Comparative Advantage Analysis

### Where DMD is strongest relative to competitors in AI search

1. **Schema depth** -- Organization + LocalBusiness + WebSite + WebPage + Article + FAQPage + Service + HowTo + BreadcrumbList + CollectionPage + SpeakableSpecification. This is unusually comprehensive for a small business and ahead of most competitors.

2. **SSR content delivery** -- Next.js 15 SSR means every AI crawler gets fully rendered HTML. Many competitors using older React/Angular SPAs serve empty shells to crawlers.

3. **AI crawler permissions** -- Explicit Allow directives for 9 AI crawlers in robots.txt. Many competitors block AI crawlers or have no explicit policy.

4. **Niche topical focus** -- 100% of content is on-topic for commercial furniture / FF&E / hospitality. Zero content dilution.

5. **Page speed** -- Sub-100ms TTFB across all pages. Faster than most competitors on any platform.

### Where DMD is weakest relative to any indexed competitor

1. **Zero off-site presence** -- Any competitor with a single backlink, a LinkedIn page, or one Reddit mention outranks DMD on authority signals.

2. **Zero Google ecosystem presence** -- Any competitor with a Google Business Profile automatically outranks DMD on Gemini and local Google AIO queries.

3. **Zero community mentions** -- Any competitor mentioned even once on Reddit or Houzz outranks DMD on Perplexity.

4. **Brand collision** -- Competitors with non-colliding brand names have a permanent structural advantage in entity recognition.

---

## Cross-Platform Quick Win Stack (by effort level)

### 30 Minutes or Less

| Action | Estimated Impact | Platforms Helped |
|--------|-----------------|------------------|
| Add msvalidate.01 meta tag | +5 | Bing Copilot, ChatGPT |
| Create Bing Places listing | +3 | Bing Copilot |

### 1-2 Hours

| Action | Estimated Impact | Platforms Helped |
|--------|-----------------|------------------|
| Fix/create LinkedIn company page | +26 combined | All 5 |
| Create Wikidata entry | +33 combined | All 5 |
| Implement IndexNow API key | +13 combined | Bing Copilot, ChatGPT |

### 3-4 Hours

| Action | Estimated Impact | Platforms Helped |
|--------|-----------------|------------------|
| Create Google Business Profile | +25 combined | Google AIO, Gemini, Bing |
| Add direct-answer paragraphs to all blog posts | +15 combined | Google AIO, ChatGPT, Bing |
| Add HTML comparison tables | +16 combined | Google AIO, Bing Copilot |
| Submit to 5+ business directories | +15 combined | ChatGPT, Bing, Perplexity |

### Ongoing (Weeks/Months)

| Action | Estimated Impact | Platforms Helped |
|--------|-----------------|------------------|
| Build 10+ quality backlinks | +46 combined | All 5 |
| Reddit/forum participation | +17 combined | Perplexity, Google AIO, ChatGPT |
| Launch YouTube channel | +15 combined | Gemini, Google AIO, Perplexity |
| Expand blog to 15-20 articles | +20 combined | All 5 |

---

## Platform ROI Ranking

If DMD can only focus on a limited number of platforms, which ones offer the best return?

| Rank | Platform | Why Prioritize | Realistic Target Score (6 mo) |
|------|----------|---------------|------------------------------|
| 1 | Google AI Overviews | Highest search volume; content structure fixes have direct impact; GBP creation is a quick win | 72/100 |
| 2 | Google Gemini | Shares signals with Google AIO (GBP, schema, content); YouTube investment pays double | 70/100 |
| 3 | Bing Copilot | IndexNow + BWT + LinkedIn fix are all quick wins with immediate indexing impact | 65/100 |
| 4 | ChatGPT Web Search | Requires hardest-to-get signals (Wikipedia, Wikidata); Bing improvements help indirectly | 62/100 |
| 5 | Perplexity AI | Requires sustained community building which is the slowest strategy to execute | 58/100 |

---

## Summary Verdict

DMD Furnishing has invested heavily in on-site technical excellence but has zero off-site authority. The site is like a beautifully furnished building with no address, no phone listing, and no sign out front. AI platforms can technically crawl and parse the content, but they have no external signals to trust it, cite it, or surface it.

The path from 34.6 to 65+ requires a two-track strategy:
1. **On-site polish** (direct-answer paragraphs, tables, author bios) -- quick wins, moderate impact
2. **Off-site establishment** (GBP, LinkedIn, Wikidata, backlinks, Reddit) -- higher effort, transformative impact

The single most impactful first action is creating a Google Business Profile, which immediately unlocks visibility on both Google AI Overviews and Google Gemini for any location-based or "near me" query in the commercial furniture space.
