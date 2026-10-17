import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    // Đặt ngày sinh nhật: 18/10 (năm hiện tại hoặc năm sau nếu đã qua)
    const getTargetDate = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let target = new Date(currentYear, 9, 18, 0, 0, 0); // Tháng 9 là tháng 10 (0-indexed)

      // Nếu ngày 18/10 đã qua, chuyển sang năm sau
      if (now > new Date(currentYear, 9, 19)) {
        target = new Date(currentYear + 1, 9, 18, 0, 0, 0);
      }
      return target;
    };

    const targetDate = getTargetDate();

    const updateTime = () => {
      const now = new Date();
      const diff = targetDate - now;

      // Kiểm tra hôm nay có phải sinh nhật không (trong khoảng 18/10)
      const isToday =
        now.getDate() === 18 && now.getMonth() === 9;

      if (diff <= 0 || isToday) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isToday) {
    return (
      <div className="countdown-today">
        <span className="countdown-emoji">🎂</span>
        <span className="countdown-today-text">
          Hôm nay là sinh nhật Thảo Nguyên! Chúc mừng sinh nhật! 🎉
        </span>
        <span className="countdown-emoji">🎈</span>
      </div>
    );
  }

  return (
    <div className="countdown">
      <p className="countdown-label">
        ⏰ Còn lại tới sinh nhật Thảo Nguyên (18/10):
      </p>
      <div className="countdown-grid">
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.days}</div>
          <div className="countdown-unit">Ngày</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.hours}</div>
          <div className="countdown-unit">Giờ</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.minutes}</div>
          <div className="countdown-unit">Phút</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.seconds}</div>
          <div className="countdown-unit">Giây</div>
        </div>
      </div>
    </div>
  );
}