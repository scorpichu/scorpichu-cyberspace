'use client'

import { useState, useEffect, useRef } from 'react'

interface BlogFormProps {
  onPostCreated: () => void
}

interface SelectedFile {
  file: File
  preview: string
}

export default function BlogForm({ onPostCreated }: BlogFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [tags, setTags] = useState('')
  const [author, setAuthor] = useState('naomi')
  const [tempAuthor, setTempAuthor] = useState('naomi')
  const [posting, setPosting] = useState(false)
  const [postingStatus, setPostingStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedAuthor = localStorage.getItem('blogAuthor')
    if (storedAuthor) {
      setAuthor(storedAuthor)
      setTempAuthor(storedAuthor)
    }
  }, [])

  // Clean up object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      selectedFiles.forEach((sf) => URL.revokeObjectURL(sf.preview))
    }
  }, [selectedFiles])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: SelectedFile[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setSelectedFiles((prev) => [...prev, ...newFiles])

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSetAuthor = () => {
    const newAuthor = tempAuthor.trim() || 'naomi'
    setAuthor(newAuthor)
    localStorage.setItem('blogAuthor', newAuthor)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required!')
      return
    }

    setPosting(true)
    try {
      let images: { src: string; name: string }[] = []

      // Upload files first if any are selected
      if (selectedFiles.length > 0) {
        setPostingStatus('Uploading images...')
        const formData = new FormData()
        selectedFiles.forEach((sf) => formData.append('files', sf.file))

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          alert('Failed to upload images')
          return
        }

        images = await uploadRes.json()
      }

      // Create the post
      setPostingStatus('Posting...')
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          tags: tags.trim(),
          author: author,
          images: images,
        }),
      })

      if (res.ok) {
        setTitle('')
        setContent('')
        setSelectedFiles([])
        setTags('')
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
        onPostCreated()
      } else {
        alert('Failed to create post')
      }
    } catch (err) {
      console.error('Error creating post:', err)
      alert('Error creating post')
    } finally {
      setPosting(false)
      setPostingStatus('')
    }
  }

  const titleColor = title.length >= 100 ? '#e53e3e' : '#2d3748'
  const contentColor = content.length >= 5000 ? '#e53e3e' : '#2d3748'

  return (
    <div className="new-post-form">
      <div className="form-header">
        <span className="form-icon">&#x270E;</span>
        <h2>New Post</h2>
      </div>

      <div className="user-info-section">
        <label>Who&apos;s Posting?</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={tempAuthor}
            onChange={(e) => setTempAuthor(e.target.value)}
            placeholder="Your name"
          />
          <button type="button" onClick={handleSetAuthor} className="set-user-btn">
            Set
          </button>
        </div>
        <p style={{ fontSize: '14px', color: '#718096', marginTop: '5px' }}>
          Currently posting as: <strong>{author}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            maxLength={100}
            placeholder="Post title..."
          />
          <span className="character-count" style={{ color: titleColor }}>
            {title.length}/100
          </span>
        </div>

        <div className="form-control">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 5000))}
            maxLength={5000}
            placeholder="What's on your mind?"
            rows={8}
          />
          <span className="character-count" style={{ color: contentColor }}>
            {content.length}/5000
          </span>
        </div>

        <div className="form-control">
          <label>Images</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="file-input"
          />
          {selectedFiles.length > 0 && (
            <div className="image-previews">
              {selectedFiles.map((sf, idx) => (
                <div key={idx} className="image-preview-item">
                  <img src={sf.preview} alt={`Preview ${idx + 1}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="remove-image-btn"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-control">
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="tag-input"
          />
          <span className="tag-hint">Separate tags with commas</span>
        </div>

        <button type="submit" className="submit-btn" disabled={posting}>
          {posting ? postingStatus || 'Posting...' : success ? 'Posted!' : 'Publish Post'}
        </button>
      </form>
    </div>
  )
}
