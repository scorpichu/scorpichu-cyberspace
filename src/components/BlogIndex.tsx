'use client'

import { BlogPost } from '@/lib/types'

interface BlogIndexProps {
  posts: BlogPost[]
  onDelete: (id: string) => void
}

export default function BlogIndex({ posts, onDelete }: BlogIndexProps) {
  const handleScrollToPost = (postId: string) => {
    const element = document.getElementById(`post-${postId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const formatIndexDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
  }

  const handleDelete = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation()

    if (!confirm('Delete this post?')) return

    try {
      const res = await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        onDelete(postId)
      } else {
        alert('Failed to delete post')
      }
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Error deleting post')
    }
  }

  return (
    <div className="blog-index">
      {posts.length === 0 ? (
        <p style={{ color: '#718096', fontSize: '14px', fontStyle: 'italic' }}>
          No posts yet
        </p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="blog-index-item">
            <a
              href={`#post-${post.id}`}
              className="blog-index-title"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToPost(post.id)
              }}
            >
              {post.title}
            </a>
            <div className="blog-index-date">{formatIndexDate(post.created_at)}</div>
            <button
              className="delete-index-btn"
              onClick={(e) => handleDelete(e, post.id)}
              title="Delete post"
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  )
}
