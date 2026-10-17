import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const startCountdown = async () => {
      try {
        // Lấy giờ chuẩn của Việt Nam
        const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
        const data = await res.json();
        
        // Giờ hiện tại theo API (đã là giờ VN)
        const now = new Date(data.datetime);
        const currentYear = now.getFullYear();

        // Mốc sinh nhật: 00:00 ngày 18/10
        const BIRTHDAY_HOUR = 0; 
        let target = new Date(currentYear, 9, 18, BIRTHDAY_HOUR, 0, 0);

        // Nếu đã qua 0h ngày 18/10, chuyển sang năm sau
        if (now >= target) {
          target = new Date(currentYear + 1, 9, 18, BIRTHDAY_HOUR, 0, 0);
        }

        const startTime = Date.now();

        const updateTime = () => {
          // Tính thời gian đã trôi qua kể từ lúc gọi API
          const elapsed = Date.now() - startTime;
          const current = new Date(now.getTime() + elapsed);
          
          const diff = target - current;

          // Kiểm tra xem hôm nay có phải ngày 18/10 không
          const isToday = current.getDate() === 18 && current.getMonth() === 9;

          // Nếu đã tới ngày sinh nhật hoặc đã qua mốc
          if (diff <= 0 || isToday) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
            return;
          }

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          setTimeLeft({ days, hours, minutes, seconds, isToday: false });
        };

        updateTime();
        setLoading(false);
        interval = setInterval(updateTime, 1000);

      } catch (error) {
        console.error("Lỗi lấy giờ từ API, dùng giờ máy:", error);
        
        // Fallback nếu API lỗi: Dùng giờ máy
        const now = new Date();
        const currentYear = now.getFullYear();
        const BIRTHDAY_HOUR = 0;
        let target = new Date(currentYear, 9, 18, BIRTHDAY_HOUR, 0, 0);
        if (now >= target) target = new Date(currentYear + 1, 9, 18, BIRTHDAY_HOUR, 0, 0);

        const updateTimeFallback = () => {
          const current = new Date();
          const diff = target - current;
          const isToday = current.getDate() === 18 && current.getMonth() === 9;
          
          if (diff <= 0 || isToday) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
            return;
          }
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft({ days, hours, minutes, seconds, isToday: false });
        };
        
        updateTimeFallback();
        setLoading(false);
        interval = setInterval(updateTimeFallback, 1000);
      }
    };

    startCountdown();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div className="countdown"><p className="countdown-label">Đang tải thời gian...</p></div>;
  }

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