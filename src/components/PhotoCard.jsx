import "./PhotoCard.css";

export default function PhotoCard({ letter, onClick }) {
  return (
    <div className="photo-card" onClick={onClick}>
      <div className="photo-wrapper">
        <img src={letter.image} alt={letter.title} />
        <div className="photo-overlay">
          <span>✉️ Mở thư</span>
        </div>
      </div>
      <p className="photo-caption">{letter.preview}</p>
    </div>
  );
}