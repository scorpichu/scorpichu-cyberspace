import ProfileCard from '@/components/ProfileCard'
import MusicPlayer from '@/components/MusicPlayer'
import BlinkiesGallery from '@/components/BlinkiesGallery'
import UpdatesBox from '@/components/UpdatesBox'
import RecentPosts from '@/components/RecentPosts'
import RightSidebar from '@/components/RightSidebar'

export default function Home() {
  return (
    <>
      <ProfileCard />
      <div id="flex">
        <aside id="leftSidebar">
          <h2>Music Player</h2>
          <MusicPlayer />
          <h2>Myyy Blinkies</h2>
          <BlinkiesGallery />
          <h2>Updates</h2>
          <UpdatesBox />
        </aside>
        <main>
          <h1>Welcome to Naomi&apos;s Cyberspace...</h1>
          <p><strong>Info!</strong></p>
          <p>This website was made to carve my own corner of the internet, hence my cyberspace! ...</p>
          <p>My main interests include Yuri, literature, K/J music, dancing, and dressing up. This space will evolve as I do!</p>
          <p>It will be like my own threads, where no one can really reply LOL... I will be updating with Yuri/Manga recommendations, along with BOOKS! And music recs! How exciting :)</p>
          <h2>Recent Blogposts</h2>
          <RecentPosts />
          <h2>Recent Updates</h2>
          <div className="box">
            <p><strong>Website Launch - Feb 2026</strong></p>
            <p>I am proud to say that I finally decided to make a website for myself... now we&apos;ll see how this changes and evolves over time!</p>
          </div>
        </main>
        <aside id="rightSidebar">
          <RightSidebar />
        </aside>
      </div>
    </>
  )
}
