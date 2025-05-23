import heart from './assets/heart.svg'
import imgUrl from './assets/los2.jpeg'
import play from './assets/play.svg'
import playlist from './assets/playlist.svg'
import './App.css'

function App() {

  const weddingDate = new Date("Sep 14, 2025 00:00:00").getTime();

  const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "The wedding has started!";
      }
  }, 1000);

  return (
    <>
      <div className='card'>
        <div className="text">
            <p>SAVE<br/>THE <strong>DATE</strong></p>
            <h1>Luis & Ana</h1>
        </div>
        <img src={imgUrl} alt="los 2" />
        
        <div className="date-icons">
            <p>14/09/25</p>
            <p id='countdown'></p>
            <div className="icons">
                <button onClick={() => alert('Liked!')}>
                  <img src={heart} alt="heart" />
                </button>
                <button onClick={() => alert('Play Video!')}>
                  <img src={play} alt="play" />
                </button>
                <button onClick={() => alert('Nuestra playlist!')}>
                  <img src={playlist} alt="playlist" />
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
