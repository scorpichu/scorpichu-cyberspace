'use client'

import { useState, useEffect, useCallback } from 'react'
import BlogForm from '@/components/BlogForm'
import BlogPostComponent from '@/components/BlogPost'
import BlogIndex from '@/components/BlogIndex'
import { BlogPost } from '@/lib/types'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleDelete = async (id: string) => {
    // Remove from state immediately for optimistic UI
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div id="flex">
      <aside>
        <h2>Blog Index</h2>
        <BlogIndex posts={posts} onDelete={handleDelete} />
      </aside>
      <main>
        <h1>scorpiblog...</h1>
        <p style={{ color: '#4a5568', marginBottom: '30px' }}>ANYTHING ANYWHERE ANYTIME</p>
        <BlogForm onPostCreated={fetchPosts} />
        {loading ? (
          <p style={{ textAlign: 'center', color: '#718096' }}>Loading posts...</p>
        ) : (
          posts.map(post => (
            <BlogPostComponent key={post.id} post={post} onDelete={handleDelete} />
          ))
        )}
      </main>
    </div>
  )
}
