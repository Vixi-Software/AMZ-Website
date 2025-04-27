import React, { useState, useEffect } from 'react';

function CountSale({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <div
      style={{
        fontSize: '18px',
        color: '#ff5722',
        textAlign: 'center',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#ffe6d9',
        display: 'inline-block',
        width: '100%',
      }}
    >
      <p className='m-0 fw-normal'>Kết thúc sau:</p>
      <h4 className='m-0 fw-semibold'>{timeLeft.days} ngày : {timeLeft.hours} giờ : {timeLeft.minutes} phút</h4>
    </div>
  );
}

export default React.memo(CountSale);