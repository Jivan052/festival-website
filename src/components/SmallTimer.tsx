import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface SmallTimerProps {
  festivalDate: string; // Format: 'YYYY-MM-DDT00:00:00'
}

const SmallTimer: React.FC<SmallTimerProps> = ({ festivalDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isFestival, setIsFestival] = useState<boolean>(false);
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetDate = new Date(festivalDate);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setIsFestival(true);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (days > 30) {
        const months = Math.floor(days / 30);
        setTimeRemaining(`${months} month${months > 1 ? 's' : ''} to go`);
      } else {
        setTimeRemaining(`${days} day${days !== 1 ? 's' : ''} to go`);
      }
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(timer);
  }, [festivalDate]);
  
  if (!timeRemaining && !isFestival) return null;
  
  return (
    <div className="fixed top-20 right-4 z-40 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-full px-3 py-1.5 flex items-center text-sm">
        <Clock className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
        <span className="font-medium">
          {isFestival ? 'Festival is Live!' : timeRemaining}
        </span>
      </div>
    </div>
  );
};

export default SmallTimer;
