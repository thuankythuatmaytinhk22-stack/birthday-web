export default function FloatingIcons() {
  const icons = ['💖', '🌟', '🎈', '🎀', '🌸', '✨', '🧁', '🌷'];
  
  const items = Array.from({ length: 20 }).map((_, i) => {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 8 + Math.random() * 8;
    const size = 16 + Math.random() * 20;
    
    return { id: i, icon, left, delay, duration, size };
  });

  return (
    <div className="floating-icons-container">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-icon"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}