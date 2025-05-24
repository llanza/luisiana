import heart from './assets/heart.svg'
import bigHeart from './assets/big-heart.png'
import anayluis from './assets/anayluis.jpg'
import photo1 from './assets/los2.jpeg'
import photo2 from './assets/luisiana2.jpeg'
import photo3 from './assets/luisiana3.jpeg'
import photo4 from './assets/luisiana4.jpeg'
import play from './assets/play.svg'
import stop from './assets/stop.svg'
import playlist from './assets/playlist.svg'
import juanlu from './assets/juanlu.webp'
import flores from './assets/flores.png'
import './App.css'
import React, {useEffect, useState} from 'react'

function App() {
  const [showHeart, setShowHeart] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const slideShowInterval = React.useRef(null);

  const photos = [photo2, photo3, photo4, photo1];

  const handleHeartClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  }

  const handlePlaylistClick = () => {
    setShowPlaylist((prev) => {
      if(!prev) setShowSlideshow(false);
      return !prev
    });
  }

  const handlePlayClick = () => {
    setShowSlideshow((prev) => {
      if  (!prev) {
        setShowPlaylist(false);
        setSlideIndex(0);
      } 
      return !prev;
    });
  }

  useEffect(() => {
    if (showSlideshow){
      slideShowInterval.current = setInterval(() => {
        setSlideIndex(prev => (prev + 1) % photos.length);
    }, 2000);
  } else {
    clearInterval(slideShowInterval.current);
  }
  return () => clearInterval(slideShowInterval.current);
}, [showSlideshow, photos.length]);

const handleCloseSlideshow = () => {
  setShowSlideshow(false);
}


  const weddingDate = new Date("Sep 14, 2025 11:00:00").getTime();

  const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML = `Faltan ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;


      if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "¡Es hoy!";
      }
  }, 1000);

  return (
    <>
      <div className='card'>
        <div className="text save-date">
        <span>SAVE</span>
        <span>THE</span>
        <span className='date'>DATE</span>
        </div>
        <div className='text luis-ana'>Ana & Luis</div>
        <div className="image-container">
        {showSlideshow ? (
          <img 
          src={photos[slideIndex]} 
          alt={`slide-${slideIndex}`} 
          className='slideshow-photo' 
          onClick={handleCloseSlideshow}
          style={{ cursor: 'pointer' }}
          />
        ) : showPlaylist ? (
         <div style={{ width: '100%', marginTop: 16 }}>
            <iframe
              style={{ borderRadius: 12, width: '100%', minHeight: 200, maxHeight: 352 }}
              src="https://open.spotify.com/embed/playlist/1hFhnUELDy8Z2wCMEqFLHj?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        ) : (
          <img src={anayluis} alt="los 2" />
          )}
        </div>
        
        <div className="date-icons">
            <div className="date-countdown">
              <p id='wedding-date' className='wedding-date'>14 de Septiembre de 2025</p>
              <p id='countdown'className='countdown'></p>
            </div>
            
            <div className="icons">
                <button onClick={handleHeartClick}>
                  <img src={heart} alt="heart" />
                </button>
                <button onClick={handlePlayClick}>
                  <img src={showSlideshow ? stop : play} alt={showSlideshow ? "stop" : "play"} />
                </button>
                <button onClick={handlePlaylistClick}>
                  <img src={playlist} alt="playlist" />
                </button>
            </div>
        </div>
        {showHeart && (
          <img src={juanlu} alt="heart-animation" className="heart-anim" />
        )}

      </div>
      {/* <div className="flores"><img src={flores} alt="flores" /></div> */}
    </>
  )
}

export default App
