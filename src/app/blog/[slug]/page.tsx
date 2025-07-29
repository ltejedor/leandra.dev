import { db } from '~/server/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { generateHTML } from '@tiptap/html/server'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Tag } from '~/app/_components/ui'
import { extractHeadings } from '~/lib/toc-utils'
import { TableOfContents } from '~/app/_components/ui/TableOfContents'

// TipTap extensions for HTML generation - match client configuration
const extensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-xl max-w-full h-auto my-8 border border-[var(--color-border)] shadow-xl hover:shadow-2xl transition-shadow duration-300 relative',
      style: 'box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 107, 53, 0.1);'
    },
  }),
]

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await db.post.findUnique({
    where: { slug },
  })

  if (!post || !post.published) {
    notFound()
  }

  // Generate TOC data before HTML generation
  const tocHeadings = extractHeadings(post.content as any)

  // Generate HTML from TipTap JSON with heading IDs
  const html = generateHTML(post.content as any, extensions)

  // Add IDs to headings in the HTML using a more robust approach
  let htmlWithIds = html;
  tocHeadings.forEach(({ id, text, level }) => {
    // Create a more specific pattern that matches the exact heading level and text
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const headingPattern = new RegExp(
      `(<h${level}[^>]*>)(\\s*${escapedText}\\s*)(</h${level}>)`,
      'i'
    );
    
    // Replace the heading with one that includes the ID
    htmlWithIds = htmlWithIds.replace(headingPattern, (match, openTag, content, closeTag) => {
      // Check if ID already exists in the opening tag
      if (openTag.includes('id=')) {
        return match; // Skip if ID already exists
      }
      // Add the ID to the opening tag
      const updatedOpenTag = openTag.replace(/(<h\d+)([^>]*)(>)/, `$1 id="${id}"$2$3`);
      return updatedOpenTag + content + closeTag;
    });
  });

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      {/* Hero Section */}
      <div className="py-24 border-b border-[var(--color-border)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 inline-flex items-center group transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Writing
          </Link>
          
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                {post.title}
              </h1>
              {/* Subtle orange accent line */}
              <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-[var(--color-accent)] opacity-60"></div>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[var(--color-text-secondary)]">
              <time className="text-sm font-medium uppercase tracking-widest">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="hidden sm:block text-[var(--color-text-muted)]">•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Tag key={tag} variant="default" size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex gap-8">
            {/* Main content */}
            <article className="flex-1 max-w-5xl prose prose-invert prose-xl 
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
              prose-p:text-[var(--color-text-primary)] prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-[var(--color-text-primary)] prose-li:leading-relaxed
              prose-a:text-[var(--color-accent)] prose-a:no-underline prose-a:font-medium
              hover:prose-a:text-[var(--color-accent-hover)] prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-em:text-[var(--color-text-secondary)] prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent)] 
              prose-blockquote:bg-[var(--color-canvas-subtle)] prose-blockquote:rounded-r-lg
              prose-blockquote:text-[var(--color-text-secondary)] prose-blockquote:py-4 prose-blockquote:px-6
              prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-canvas-muted)] 
              prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-[var(--color-canvas-subtle)] prose-pre:border prose-pre:border-[var(--color-border)]
              prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto
              prose-ul:space-y-2 prose-ol:space-y-2
              prose-img:rounded-xl prose-img:border prose-img:border-[var(--color-border)]
              prose-img:my-8 prose-img:shadow-2xl prose-img:transition-all prose-img:duration-300
              hover:prose-img:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,107,53,0.2)]">
              <div dangerouslySetInnerHTML={{ __html: htmlWithIds }} />
            </article>

            {/* Table of Contents - hidden on mobile, shown on desktop */}
            {tocHeadings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <TableOfContents headings={tocHeadings} />
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-[var(--color-border)] py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to all posts</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Generate static params for published posts
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true },
    take: 100,
  })
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await db.post.findUnique({
    where: { slug },
    select: { title: true },
  })

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.title, // You could add an excerpt field for better descriptions
  }
} 
