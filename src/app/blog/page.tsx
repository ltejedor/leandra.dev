'use client'

import { api } from '~/trpc/react'
import { Card, Button } from "~/app/_components/ui"
import Link from 'next/link'

export default function BlogPage() {
  const { data, isLoading, fetchNextPage, hasNextPage } = api.post.getPublished.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  const posts = data?.pages?.flatMap((page) => page.posts) ?? []

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-canvas)] py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">Loading posts...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white">Blog</h1>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Card key={post.id} variant="interactive" className="group h-full flex flex-col">
                  <div className="flex-1">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
                      {/* You could add an excerpt field or extract text from content */}
                      {post.title}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)] mb-4">
                      <time className="text-[var(--color-accent)]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {hasNextPage && (
              <div className="text-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => fetchNextPage()}
                  disabled={isLoading}
                >
                  Load More Posts
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-secondary)] text-lg">
              No posts published yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
