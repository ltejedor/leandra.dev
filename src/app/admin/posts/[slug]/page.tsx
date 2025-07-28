'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '~/trpc/react'
import { Button } from '~/app/_components/ui'
import TipTapEditor from '~/app/_components/TipTapEditor'
import Link from 'next/link'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function AdminPostEditor() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const isNew = slug === 'new'

  const [title, setTitle] = useState('')
  const [currentSlug, setCurrentSlug] = useState('')
  const [content, setContent] = useState<any>(null)
  const [published, setPublished] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  // Fetch existing post if editing
  const { data: post, isLoading } = api.post.getForEdit.useQuery(
    { slug },
    { enabled: !isNew }
  )

  // Save mutation
  const saveMutation = api.post.upsert.useMutation({
    onSuccess: (data) => {
      setAutoSaveStatus('saved')
      if (isNew) {
        router.push(`/admin/posts/${data.slug}`)
      }
    },
    onError: (error) => {
      console.error('Save error:', error)
      setAutoSaveStatus('unsaved')
    }
  })

  // Load post data when editing
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setCurrentSlug(post.slug)
      setContent(post.content)
      setPublished(post.published)
    }
  }, [post])

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (isNew && title) {
      setCurrentSlug(generateSlug(title))
    }
  }, [title, isNew])

  // Auto-save functionality
  useEffect(() => {
    if (!title || !content) return

    const timeoutId = setTimeout(() => {
      if (autoSaveStatus === 'unsaved') {
        setAutoSaveStatus('saving')
        saveMutation.mutate({
          slug: currentSlug,
          title,
          content,
          published: false // Auto-save as draft
        })
      }
    }, 2000) // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId)
  }, [title, content, currentSlug, autoSaveStatus])

  const handleSave = (shouldPublish?: boolean) => {
    if (!title || !content) return

    saveMutation.mutate({
      slug: currentSlug,
      title,
      content,
      published: shouldPublish ?? published
    })
  }

  const handleContentChange = (newContent: any) => {
    setContent(newContent)
    setAutoSaveStatus('unsaved')
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    setAutoSaveStatus('unsaved')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading post...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost">← Back to Admin</Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {isNew ? 'Create New Post' : 'Edit Post'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {autoSaveStatus === 'saving' && 'Saving...'}
              {autoSaveStatus === 'saved' && 'Saved'}
              {autoSaveStatus === 'unsaved' && 'Unsaved changes'}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
              placeholder="Enter post title..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={currentSlug}
              onChange={(e) => setCurrentSlug(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
              placeholder="post-slug"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <TipTapEditor
              initialContent={content}
              onChange={handleContentChange}
              placeholder="Start writing your post..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="published" className="text-sm text-gray-300">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => handleSave(false)}
                disabled={!title || !content || saveMutation.isPending}
              >
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={!title || !content || saveMutation.isPending}
              >
                {published ? 'Update & Publish' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 