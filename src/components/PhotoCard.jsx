export default function PhotoCard({ letter, onClick }) {
  return (
    <div className="photo-card-wrapper">
      {/* Kẹp gỗ và dây treo */}
      <div className="wooden-clip"></div>
      <div className="hanging-wire"></div>
      
      {/* Thẻ ảnh */}
      <div className="photo-card" onClick={onClick}>
        <img src={letter.image} alt={letter.title} />
        <div className="card-content">
          <h3>{letter.title}</h3>
          <p>{letter.preview}</p>
        </div>
      </div>
    </div>
  );
}