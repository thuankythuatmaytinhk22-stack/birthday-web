import { useState } from "react";
import { letters } from "./data/letters";
import PhotoCard from "./components/PhotoCard";
import LetterModal from "./components/LetterModal";
import Confetti from "./components/Confetti";
import "./App.css";

export default function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="app">
      <Confetti />
      <header className="header">
        <h1 className="title">🎉 Happy Birthday 🎉</h1>
        <p className="subtitle">Click vào từng bức ảnh để mở thư chúc nhé!</p>
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

      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      )}

      <footer className="footer">Made with 💖 for you</footer>
    </div>
  );
}