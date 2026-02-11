import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ marginBottom: '20px' }}>The page you&apos;re looking for doesn&apos;t exist in this cyberspace.</p>
      <Link href="/" className="recent-post-read-more">
        ← Back to Home
      </Link>
    </main>
  )
}
