'use client'

import { useState } from 'react'
import type { BlogPost } from '@/lib/types'

interface BlogPostProps {
  post: BlogPost
  onDelete: (id: string) => void
}

export default function BlogPost({ post, onDelete }: BlogPostProps) {
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/posts?id=${post.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        onDelete(post.id)
      } else {
        alert('Failed to delete post')
      }
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Error deleting post')
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes

    return `${month} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`
  }

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl)
  }

  const closeModal = () => {
    setModalImage(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  const parseTags = (tagsString: string): string[] => {
    if (!tagsString.trim()) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
  }

  const paragraphs = post.content.split('\n').filter(p => p.trim())
  const tagList = parseTags(post.tags || '')

  return (
    <>
      <article className="blog-post" id={`post-${post.id}`}>
        <button
          className="delete-post-btn"
          onClick={handleDelete}
          disabled={deleting}
          title="Delete post"
        >
          {deleting ? '...' : '×'}
        </button>

        <h2>{post.title}</h2>

        <div className="post-date">{formatDate(post.created_at)}</div>
        <div className="post-author">by {post.author}</div>

        <div className="post-content">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {post.images && post.images.length > 0 && (
          <div className={post.images.length === 1 ? '' : 'image-grid'}>
            {post.images.map((img, idx) => (
              <div key={idx} className="image-caption">
                <img
                  src={img.src}
                  alt={img.name || `${post.title} - image ${idx + 1}`}
                  className="blog-image"
                  onClick={() => handleImageClick(img.src)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        )}

        {tagList.length > 0 && (
          <div className="tags">
            {tagList.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {modalImage && (
        <div
          className="image-modal"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              fontSize: '30px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
          <img
            src={modalImage}
            alt="Full size"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
