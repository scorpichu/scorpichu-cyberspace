export interface BlogPost {
  id: string
  title: string
  content: string
  tags: string
  author: string
  images: { src: string; name: string }[]
  created_at: string
}

export interface Song {
  title: string
  artist: string
  src: string
}
