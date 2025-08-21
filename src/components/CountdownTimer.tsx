import React, { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string; // Format: 'YYYY-MM-DDT00:00:00'
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsVisible(false);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if timer is done
      if (new Date(targetDate).getTime() - new Date().getTime() <= 0) {
        clearInterval(timer);
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!isVisible) return null;
  
  return (
    <div className="mb-8 animate-fade-in">
      <p className="text-amber-300 mb-3 text-base">Festival Begins In:</p>
      <div className="flex justify-center space-x-3 sm:space-x-4">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md border border-white/20 shadow-lg mb-1">
              <span className="text-xl sm:text-2xl font-bold text-white">{item.value}</span>
            </div>
            <span className="text-xs text-amber-200">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
