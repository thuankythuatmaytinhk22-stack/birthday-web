import { useState } from 'react';
import { letters } from './data/letters';
import PhotoCard from './components/PhotoCard';
import Confetti from './components/Confetti';
import CountdownTimer from './components/CountdownTimer';
import Balloons from './components/Balloons';
import FloatingIcons from './components/FloatingIcons';
import './App.css';

export default function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="app">
      <Balloons />
      <FloatingIcons />
      <Confetti />

      <header className="header">
        {/* Khối hiển thị số 20 tuổi */}
        <div className="age-highlight">
          <span className="age-number">20</span>
          <span className="age-text">TUỔI</span>
        </div>

        <h1 className="title">
          <span className="title-emoji">🎊</span>
          Chúc mừng Thảo Nguyên
          <span className="title-emoji">🎊</span>
        </h1>
        
        

        <CountdownTimer />
      </header>

      {/* Khung treo ảnh */}
      <main className="gallery-container">
        <div className="gallery-wire"></div>
        <div className="grid">
          {letters.map((letter) => (
            <PhotoCard
              key={letter.id}
              letter={letter}
              onClick={() => setSelectedLetter(letter)}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <span className="footer-icon">💖</span>
        <span className="footer-icon">💖</span>
      </footer>

      {selectedLetter && (
        <div className="modal" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedLetter.image} alt={selectedLetter.title} />
            <h2>{selectedLetter.title}</h2>
            <p>{selectedLetter.content}</p>
            <button onClick={() => setSelectedLetter(null)}>Đóng 💕</button>
          </div>
        </div>
      )}
    </div>
  );
}