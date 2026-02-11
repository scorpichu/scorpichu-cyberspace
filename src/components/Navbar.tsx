import Link from 'next/link'

export default function Navbar() {
  return (
    <nav id="navbar" style={{ marginBottom: '10px' }}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><a href="https://www.instagram.com/chiu.naomi" target="_blank" rel="noopener noreferrer">IG</a></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><a href="https://open.spotify.com/user/21xhnqjpsvn2oftzl54jjsdly" target="_blank" rel="noopener noreferrer">Spotify</a></li>
      </ul>
    </nav>
  )
}
