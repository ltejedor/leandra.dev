import { db } from '~/server/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { generateHTML } from '@tiptap/html/server'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

// TipTap extensions for HTML generation
const extensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-lg max-w-full h-auto',
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

  // Generate HTML from TipTap JSON
  const html = generateHTML(post.content as any, extensions)

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="text-[var(--color-text-secondary)] text-sm">
            Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
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