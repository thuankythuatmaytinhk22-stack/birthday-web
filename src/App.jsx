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
      {/* Hiệu ứng nền */}
      <Balloons />
      <FloatingIcons />
      <Confetti />

      <header className="header">
        <div className="header-icons-top">
          <span className="header-icon">🎉</span>
          <span className="header-icon">🎂</span>
          <span className="header-icon">🎈</span>
        </div>
        
        <h1 className="title">
          <span className="title-emoji">🎊</span>
          Chúc mừng Thảo Nguyên
          <span className="title-emoji">🎊</span>
        </h1>
        
        <p className="subtitle">✨ Click vào từng bức ảnh để xem lời chúc ✨</p>

        {/* Đồng hồ đếm ngược */}
        <CountdownTimer />
      </header>

      <main className="grid">
        {letters.map((letter) => (
          <PhotoCard
            key={letter.id}
            letter={letter}
            onClick={() => setSelectedLetter(letter)}
          />
        ))}
      </main>

      {/* Footer icons (Đã xóa chữ "Made with love") */}
      <footer className="footer">
        <span className="footer-icon">💖</span>
        <span className="footer-icon">💖</span>
      </footer>

      {/* Modal hiển thị chi tiết khi click */}
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