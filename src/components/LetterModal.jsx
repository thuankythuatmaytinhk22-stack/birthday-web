import { useEffect } from "react";
import "./LetterModal.css";

export default function LetterModal({ letter, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!letter) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="letter-paper" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="letter-title">{letter.title}</h2>
        <div className="letter-divider">❦</div>
        <p className="letter-content">{letter.content}</p>
        <div className="letter-signature">💖 With love 💖</div>
      </div>
    </div>
  );
}