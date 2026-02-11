export default function BlinkiesGallery() {
  const blinkies = [
    { src: '/images/blinkies/blinkiesCafe-hq.gif', alt: 'yuri lover' },
    { src: '/images/blinkies/blinkiesCafe-nE.gif', alt: 'bi #swag' },
    { src: '/images/blinkies/blinkiesCafe-lJ.gif', alt: 'YURI lover' },
    { src: '/images/blinkies/blinkiesCafe-jw.gif', alt: 'MUSIC lover' },
    { src: '/images/blinkies/blinkiesCafe-t3.gif', alt: 'MIKU FAN' },
    { src: '/images/blinkies/blinkiesCafe-4A.gif', alt: 'NAKY' },
    { src: '/images/blinkies/blinkiesCafe-7Z.gif', alt: 'CHOCOCAT' },
  ]

  return (
    <div className="box blinkies-section">
      <div className="blinky-gallery">
        {blinkies.map((blinky) => (
          <img key={blinky.src} src={blinky.src} alt={blinky.alt} title={blinky.alt} />
        ))}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#718096', textAlign: 'center', marginTop: '8px' }}>
        <i className="fas fa-arrow-right"></i> frequently updated!
      </p>
    </div>
  )
}
