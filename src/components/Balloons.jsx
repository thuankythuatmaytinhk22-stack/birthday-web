export default function Balloons() {
  // Tạo 15 bong bóng với vị trí, màu, tốc độ ngẫu nhiên
  const balloons = Array.from({ length: 15 }).map((_, i) => {
    const colors = ['#FF6B9D', '#FFC75F', '#845EC2', '#4FC3F7', '#F9A826', '#4CAF50', '#FF5252'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 12 + Math.random() * 10;
    const size = 30 + Math.random() * 40;
    
    return { id: i, color, left, delay, duration, size };
  });

  return (
    <div className="balloons-container">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            backgroundColor: b.color,
            width: `${b.size}px`,
            height: `${b.size * 1.2}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <div className="balloon-string"></div>
        </div>
      ))}
    </div>
  );
}