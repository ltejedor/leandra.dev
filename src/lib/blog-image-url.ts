const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

export function isRewritableImageSrc(src: string | null | undefined): src is string {
  if (!src) return false
  if (/^https?:\/\//i.test(src)) return false
  return src.startsWith('./') || src.startsWith('/images/blog/')
}

// ./images/foo.jpg → /images/foo.jpg  (served by Next.js from public/)
// /images/blog/slug/foo.jpg → unchanged
export function toLocalImageSrc(src: string): string {
  if (src.startsWith('./')) return src.slice(1)
  return src
}

export function toSupabaseImageSrc(src: string, slug: string): string | null {
  if (!SUPABASE_URL) return null
  const parts = src.split('/')
  const filename = parts[parts.length - 1] ?? src
  const sanitized = sanitizeFilename(filename)
  return `${SUPABASE_URL}/storage/v1/object/public/blog-images/public/${slug}/${sanitized}`
}
