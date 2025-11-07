import { db } from '~/server/db'
import { generateHTML } from '@tiptap/html/server'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'

// TipTap extensions for HTML generation
const extensions = [
  StarterKit,
  Image,
  LinkExtension,
]

export async function GET(request: Request) {
  // Get the base URL from the request
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  // Fetch published posts
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 20, // Most recent 20 posts
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  // Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Leandra Tejedor</title>
    <link>${baseUrl}</link>
    <description>Blog posts by Leandra Tejedor</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post) => {
        const postUrl = `${baseUrl}/blog/${post.slug}`
        const contentHtml = generateHTML(post.content as any, extensions)
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      ${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
    </item>`
      })
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  })
}

