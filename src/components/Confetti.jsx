import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti() {
  const canvasRef = useRef(null);
  const myConfetti = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Khởi tạo confetti gắn với canvas riêng
    myConfetti.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Hàm bắn pháo giấy
    const fire = () => {
      if (!myConfetti.current) return;

      const duration = 3000; // Thời gian của 1 đợt bắn (ms)
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Bắn từ 2 bên trái và phải
        myConfetti.current({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        myConfetti.current({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
      }, 250);

      // Khi đợt này kết thúc, tự động gọi đợt tiếp theo (bắn không dừng)
      setTimeout(() => {
        fire();
      }, duration + 500); // Nghỉ 0.5s rồi bắn tiếp
    };

    // Bắt đầu bắn
    fire();

    return () => {
      if (myConfetti.current) {
        myConfetti.current.reset();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Không chặn click chuột
        zIndex: 9999,
      }}
    />
  );
}