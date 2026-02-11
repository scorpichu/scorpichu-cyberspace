import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Naomi's Cyberspace",
  description: "HELLO! i'm NAOMI! My personal digital hideout where I share my obsessions with fashion, music, books, yuri, anime, and more!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="container">
          <div id="headerArea">
            <div id="header"></div>
            <Navbar />
          </div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
