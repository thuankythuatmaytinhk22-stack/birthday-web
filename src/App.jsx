import { useState } from 'react';
import { letters } from './data/letters';
import PhotoCard from './components/PhotoCard';
import Confetti from './components/Confetti';
import './App.css';

export default function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="app">
      {/* Hiệu ứng pháo giấy bắn liên tục */}
      <Confetti />
      
      <header className="header">
        <h1 className="title">🎉 Chúc mừng Thảo Nguyên 🎉</h1>
        <p className="subtitle">Click vào từng bức ảnh để xem lời chúc</p>
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

      {/* Modal hiển thị chi tiết khi click */}
      {selectedLetter && (
        <div className="modal" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedLetter.image} alt={selectedLetter.title} />
            <h2>{selectedLetter.title}</h2>
            <p>{selectedLetter.content}</p>
            <button onClick={() => setSelectedLetter(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}