import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        <img src="src/assets/los3.jpeg" alt="los 3" />
        
        <div className="date-icons">
            <p>14/09/25</p>
            <p id='countdown'></p>
            <div className="icons">
                <button onClick={() => alert('Liked!')}>❤️</button>
                <button onClick={() => alert('Rewind!')}>⏪</button>
                <button onClick={() => alert('Play Music!')}>🎵</button>
                <button onClick={() => alert('Forward!')}>⏩</button>
                <button onClick={() => alert('Added!')}>➕</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
