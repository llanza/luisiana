import heart from './assets/heart.svg'
import bigHeart from './assets/big-heart.png'
import photo1 from './assets/photo1.jpeg'
import photo2 from './assets/photo2.jpeg'
import photo3 from './assets/photo3.jpeg'
import photo4 from './assets/photo4.jpeg'
import photo5 from './assets/photo5.jpeg'
import photo6 from './assets/photo6.jpeg'
import photo7 from './assets/photo7.jpeg'
import photo8 from './assets/photo8.jpeg'
import photo9 from './assets/photo9.jpeg'
import photo10 from './assets/photo10.jpeg'
import photo11 from './assets/photo11.jpeg'
import photo12 from './assets/photo12.jpeg'
import photo13 from './assets/photo13.jpeg'
import photo14 from './assets/photo14.jpeg'

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
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false
  });
  const slideShowInterval = React.useRef(null);

  const photos = [photo2, photo3, photo4, photo5, photo6, photo7];

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

  useEffect(() => {
    const weddingDate = new Date("2025-09-14T11:00:00-05:00").getTime();

    const interval = setInterval( () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true
        });
        return;   
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        finished: false
      });
  }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  

  return (
    <>
    <div className='outer-card'>
      <div className='card'>
        <div className='card-image-top'>
        {showSlideshow ? (
          <img 
          src={photos[slideIndex]} 
          alt={`slide-${slideIndex}`} 
          className='card-image' 
          onClick={handleCloseSlideshow}
          style={{ cursor: 'pointer' }}
          />
        ) : showPlaylist ? (
         <div className='playlist-container'>
            <iframe
              src="https://open.spotify.com/embed/playlist/1hFhnUELDy8Z2wCMEqFLHj?utm_source=generator"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        ) : (
          <img src={photo4} alt="los 2" className='card-image'/>
          )}

          {!showPlaylist && (
            <>
              <div className="overlay-text save-date">
                <span>SAVE</span>
                <span>THE</span>
                <span className='date'>DATE</span>
              </div>
              <div className='overlay-text luis-ana'>Ana & Luis</div>
            </>
          )}
 
          {showHeart && (
          <img src={juanlu} alt="heart-animation" className="heart-anim" />
          )}

        </div>
        
        <div className="date-icons">
            <div className="date-countdown">
              <p id='wedding-date' className='wedding-date'>14 de Septiembre de 2025</p>
              {countdown.finished ? (<div className='countdown-finished'>¡Es hoy!</div>) : (
                <div className='countdown'>
                <div className='countdown-unit'>
                  <span className='countdown-number'>{countdown.days}</span>
                  <span className='countdown-label'>días</span>
                </div>
                <div className='countdown-unit'>
                  <span className='countdown-number'>{countdown.hours}</span>
                  <span className='countdown-label'>horas</span>
                </div>
                <div className='countdown-unit'>
                  <span className='countdown-number'>{countdown.minutes}</span>
                  <span className='countdown-label'>minutos</span>
                </div>
                <div className='countdown-unit'>
                  <span className='countdown-number'>{countdown.seconds}</span>
                  <span className='countdown-label'>segundos</span>
                </div>
              </div>
              )}
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
      </div>
      <div className="flores"><img src={flores} alt="flores" /></div>
     </div>
    </>
  )
}

export default App
