import { getAllBlogPosts } from '../../lib/blog-posts';
import { siteUrl, siteName } from '../../lib/metadata';

// Static export-safe: the feed is generated once at build time.
export const dynamic = 'force-static';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toPubDate(isoDate) {
  return new Date(`${isoDate}T00:00:00.000Z`).toUTCString();
}

export async function GET() {
  const posts = [...getAllBlogPosts()].sort(
    (a, b) => new Date(b.isoDate) - new Date(a.isoDate)
  );

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <pubDate>${toPubDate(post.isoDate)}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const lastBuildDate = posts.length > 0 ? toPubDate(posts[0].isoDate) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteName} Blog`)}</title>
    <link>${siteUrl}/blog</link>
    <description>FF&amp;E, commercial furniture, and hospitality procurement insights from the DMD Furnishing editorial team.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
