'use client'

import { api } from '~/trpc/react'
import Link from 'next/link'
import { Button } from '~/app/_components/ui'
import DevelopmentOnly from '~/app/_components/DevelopmentOnly'

function AdminDashboard() {
  const { data: posts, isLoading, refetch } = api.post.getAll.useQuery()
  const togglePublish = api.post.togglePublish.useMutation({
    onSuccess: () => {
      refetch()
    }
  })
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  if (isLoading) {
    return <div className="min-h-screen bg-[var(--color-canvas)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">Loading posts...</div>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Admin</h1>
          <Link href="/admin/posts/new">
            <Button>Create New Post</Button>
          </Link>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-white">Title</th>
                <th className="text-left p-4 text-white">Slug</th>
                <th className="text-left p-4 text-white">Status</th>
                <th className="text-left p-4 text-white">Updated</th>
                <th className="text-left p-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <tr key={post.id} className="border-b border-gray-700">
                  <td className="p-4 text-white">{post.title}</td>
                  <td className="p-4 text-gray-300">{post.slug}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.published 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 space-x-2">
                    <Link href={`/admin/posts/${post.slug}`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish.mutate({ id: post.id })}
                      disabled={togglePublish.isPending}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this post?')) {
                          deletePost.mutate({ id: post.id })
                        }
                      }}
                      disabled={deletePost.isPending}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts?.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No posts yet. <Link href="/admin/posts/new" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">Create your first post</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <DevelopmentOnly>
      <AdminDashboard />
    </DevelopmentOnly>
  )
} 