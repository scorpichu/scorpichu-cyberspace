import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files')

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploaded: { src: string; name: string }[] = []

    for (const file of files) {
      if (!(file instanceof File)) continue

      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const filename = `${timestamp}-${safeName}`

      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error('Upload error:', error)
        continue
      }

      const src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${filename}`
      uploaded.push({ src, name: file.name })
    }

    return NextResponse.json(uploaded)
  } catch (err) {
    console.error('Upload API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
