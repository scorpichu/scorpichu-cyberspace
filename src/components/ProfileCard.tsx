export default function ProfileCard() {
  return (
    <div id="profile-section" className="box">
      <div className="profile-container">
        <div className="profile-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/profile.png" alt="Naomi's Profile" className="profile-pic" />
          <div className="profile-status">
            <span className="status-dot online"></span>
            <span className="status-text">online</span>
          </div>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Naomi</h2>
          <p className="profile-tagline">yuri lover &bull; choco lover &bull; music lover</p>
          <div className="profile-details">
            <p className="profile-intro">
              HELLO! i&apos;m NAOMI! Otherwise known as CHIU Naomi, Nami, scorpichu, depending on where u met me.
              This is my personal digital hideout where I share my obsessions with fashion, music, books, yuri, anime, and more!
              retro aesthetics, K/J music, and whatever else catches my eye.
              Feel free to look around and pay the blog page a visit! (yes you can create posts!)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
