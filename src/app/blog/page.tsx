'use client'

import { useState } from 'react'
import { api } from '~/trpc/react'
import { Button, Tag } from "~/app/_components/ui"
import Link from 'next/link'

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)

  const { data, isLoading, fetchNextPage, hasNextPage } = api.post.getPublished.useInfiniteQuery(
    { limit: 10, tag: selectedTag },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  const { data: allTags } = api.post.getTags.useQuery()
  const { data: allPosts } = api.post.getPublished.useQuery({ limit: 100 })

  const posts = data?.pages?.flatMap((page) => page.posts) ?? []
  const totalPosts = allPosts?.posts?.length ?? 0

  // Count posts by tag
  const tagCounts = allTags?.reduce((acc, tag) => {
    const count = allPosts?.posts?.filter(post => post.tags.includes(tag)).length ?? 0
    acc[tag] = count
    return acc
  }, {} as Record<string, number>) ?? {}

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-canvas)] py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center text-[var(--color-text-secondary)]">Loading posts...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0 lg:order-first">
            <div className="sticky top-32">
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTag(undefined)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden text-sm ${selectedTag === undefined
                      ? 'bg-[var(--color-canvas-subtle)] text-white border border-[var(--color-accent)]/30 shadow-lg before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-[var(--color-accent)] before:content-[""]'
                      : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-canvas-subtle)] hover:shadow-md hover:border-[var(--color-accent)]/20 border border-transparent'
                    }`}
                >
                  <span className="flex justify-between items-center">
                    <span className="font-medium">All Posts</span>
                    <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-canvas-muted)] px-1.5 py-0.5 rounded-full">
                      {totalPosts}
                    </span>
                  </span>
                </button>

                {allTags?.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden text-sm ${selectedTag === tag
                        ? 'bg-[var(--color-canvas-subtle)] text-white border border-[var(--color-accent)]/30 shadow-lg before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-[var(--color-accent)] before:content-[""]'
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-canvas-subtle)] hover:shadow-md hover:border-[var(--color-accent)]/20 border border-transparent'
                      }`}
                  >
                    <span className="flex justify-between items-center">
                      <span className="font-medium">{tag}</span>
                      <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-canvas-muted)] px-1.5 py-0.5 rounded-full">
                        {tagCounts[tag] || 0}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl lg:order-last">
            {/* Header */}
            <div className="mb-16">
              <div className="relative">
                <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">Writing</h1>
                {/* Subtle orange accent line */}
                <div className="absolute bottom-2 left-0 w-16 h-0.5 bg-[var(--color-accent)] opacity-60"></div>
              </div>
            </div>

            {/* Posts */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-8 mb-20">
                  {posts.map((post) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="space-y-4 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] hover:bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 h-full flex flex-col">
                          {/* Preview Image */}
                          {post.previewImage && (
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[var(--color-canvas-subtle)] border border-[var(--color-border)]">
                              <img
                                src={post.previewImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                              />
                              {/* Subtle orange accent border on hover */}
                              <div className="absolute inset-0 rounded-lg border-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="space-y-3 flex-1 flex flex-col">
                            {/* Tags - moved to top and made smaller */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                  <Tag key={tag} variant="default" size="sm">
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                            )}

                            {/* Date */}
                            <time className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-white group-hover:text-[var(--color-text-secondary)] transition-colors duration-300 leading-tight">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm flex-1">
                              {post.excerpt || (() => {
                                try {
                                  const content = post.content as any;
                                  const firstParagraph = content?.content?.find((node: any) =>
                                    node.type === 'paragraph' && node.content?.[0]?.text
                                  );
                                  const text = firstParagraph?.content?.[0]?.text || 'Read more...';
                                  return text.length > 120 ? text.substring(0, 120) + '...' : text;
                                } catch {
                                  return 'Read more...';
                                }
                              })()}
                            </p>

                            {/* Read More Link */}
                            <div className="flex items-center text-[var(--color-text-muted)] group-hover:text-white transition-colors duration-300 pt-2 mt-auto">
                              <span className="font-medium text-sm">Read article</span>
                              <svg
                                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Load More */}
                {hasNextPage && (
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => fetchNextPage()}
                      disabled={isLoading}
                      className="px-10 py-4 text-base border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-canvas-subtle)] hover:text-[var(--color-accent)]"
                    >
                      {isLoading ? 'Loading...' : 'Load More Posts'}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {selectedTag ? `No posts tagged "${selectedTag}"` : 'No posts yet'}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed">
                    {selectedTag
                      ? 'Try selecting a different category or view all posts.'
                      : 'Check back soon for new posts.'
                    }
                  </p>
                  {selectedTag && (
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedTag(undefined)}
                      className="mt-6"
                    >
                      View All Posts
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
