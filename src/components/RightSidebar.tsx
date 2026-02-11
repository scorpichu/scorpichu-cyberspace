export default function RightSidebar() {
  return (
    <>
      <h3>Current Obsessions</h3>
      <h4> (SUPER UPDATED!!!)</h4>
      <ul>
        <li>Yuri</li>
        <li>Heisei Retro + cybercore + frutiger aero + frutiger metro aesthetics...</li>
        <li><a href="https://youtu.be/PkyqNegikro?si=r6lhMYS3707W5LMS" target="_blank" rel="noopener noreferrer">THIS remix...</a></li>
        <li>updating my website...</li>
        <li>trade a Kpop idol on roblox...</li>
      </ul>

      <div className="image-area">
        <h4>Current Visual Mood</h4>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mood-heisei.jpeg" alt="Heisei retro aesthetic" />
        <p style={{ fontSize: '0.8rem', color: '#4a5568', textAlign: 'center' }}>Heisei retro + cybercore vibes</p>
      </div>

      <div className="image-area">
        <h4>Yuri Moment</h4>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mood-yuri.png" alt="Yuri manga panel" />
        <p style={{ fontSize: '0.8rem', color: '#4a5568', textAlign: 'center' }}>Current Yuri Obsession</p>
      </div>

      <h3>Now Playing</h3>
      <div className="box now-playing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/album-cover.jpg" alt="Album Cover" className="album-art" />
        <div className="song-info">
          <div className="song-title">Tomatomat - Collect Call Garage</div>
          <div className="artist">Tomatomat</div>
        </div>
      </div>
    </>
  )
}
