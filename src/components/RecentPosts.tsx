'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types'

interface RecentPostsProps {
  filterTag?: string
  limit?: number
}

export default function RecentPosts({ filterTag, limit = 3 }: RecentPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const normalizeTag = (tag: string): string => {
    return tag.trim().replace(/^['"]+|['"]+$/g, '').toLowerCase()
  }

  const parseTags = (tags: string): string[] => {
    if (!tags || !tags.trim()) return []
    return tags.split(',').map(normalizeTag).filter(t => t.length > 0)
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()

        let filteredPosts = data
        if (filterTag) {
          const targetTag = normalizeTag(filterTag)
          filteredPosts = data.filter((post: BlogPost) => parseTags(post.tags).includes(targetTag))
        }

        setPosts(filteredPosts.slice(0, limit))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [filterTag, limit])

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
    hours = hours % 12 || 12
    const minutesStr = minutes < 10 ? '0' + minutes : String(minutes)
    return `${month} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`
  }

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const cleaned = content.replace(/\n/g, ' ')
    if (cleaned.length <= maxLength) return cleaned
    return cleaned.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="recent-post-loader">
        <p>Loading {filterTag ? `${filterTag} posts` : 'recent blogposts'}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="recent-post-error">
        <p>Unable to load recent blog posts. Visit the <Link href="/blog">blog page</Link> directly.</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts-message">
        <p>
          {filterTag
            ? `No ${filterTag} posts yet. Check back soon!`
            : 'No blog posts yet. Check back soon!'}
        </p>
      </div>
    )
  }

  return (
    <>
      {posts.map((post) => {
        const tagList = parseTags(post.tags)
        return (
          <div key={post.id} className="recent-post">
            <h3>{post.title}</h3>
            <div className="recent-post-date">
              <i className="far fa-calendar"></i> {formatDate(post.created_at)}
            </div>
            <div className="recent-post-author">
              <i className="fas fa-user"></i> Posted by: {post.author}
            </div>
            <div className="recent-post-excerpt">{getExcerpt(post.content)}</div>
            {tagList.length > 0 && (
              <div className="recent-post-tags">
                {tagList.map((tag) => (
                  <span key={tag} className="recent-post-tag">{tag}</span>
                ))}
              </div>
            )}
            <Link href="/blog" className="recent-post-read-more">
              Read Full Post →
            </Link>
          </div>
        )
      })}
    </>
  )
}
