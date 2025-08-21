import React, { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroCountdownTimerProps {
  targetDate: string; // Format: 'YYYY-MM-DDT00:00:00'
}

const HeroCountdownTimer: React.FC<HeroCountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  // Always make the timer visible by default
  const [isVisible] = useState<boolean>(true); 
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'live' | 'closing_soon' | 'ended'>('upcoming');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetDateTime - now;
      
      // Event has already started
      if (difference <= 0) {
        // Festival runs for 10 days (864000000 ms)
        const festivalEndTime = targetDateTime + (10 * 24 * 60 * 60 * 1000);
        
        if (now > festivalEndTime) {
          // Event has ended
          setEventStatus('ended');
        } else if (now > (festivalEndTime - (24 * 60 * 60 * 1000))) {
          // Last day of the event
          setEventStatus('closing_soon');
        } else {
          // Event is currently happening
          setEventStatus('live');
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      } else if (difference < (7 * 24 * 60 * 60 * 1000)) {
        // Within 7 days of the event
        setEventStatus('upcoming');
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
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!isVisible) return null;
  
  return (
    <div className="mb-10 w-full max-w-2xl mx-auto z-20 animate-fade-in countdown-timer-section">
      {eventStatus === 'live' ? (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-4 animate-pulse-gentle shadow-lg countdown-box countdown-glow">
          <div className="text-center">
            <span className="text-xl font-bold">Festival will LIVE soon!</span>
            <p className="text-white/80 mt-1">Join us at the venue for celebrations</p>
            <div className="mt-3 text-sm bg-white/20 rounded-lg px-3 py-2 inline-block">
              Day {Math.ceil((new Date().getTime() - new Date(targetDate).getTime()) / (1000 * 60 * 60 * 24))} of 10
            </div>
          </div>
        </div>
      ) : eventStatus === 'closing_soon' ? (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-4 animate-pulse-gentle shadow-lg countdown-box countdown-glow">
          <div className="text-center">
            <span className="text-xl font-bold">Final Day of Celebrations!</span>
            <p className="text-white/80 mt-1">Don't miss the closing ceremony today</p>
            <div className="mt-3 text-sm bg-white/20 rounded-lg px-3 py-2 inline-block">
              Immersion Ceremony at 4:00 PM
            </div>
          </div>
        </div>
      ) : eventStatus === 'ended' ? (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 shadow-lg countdown-box">
          <div className="text-center">
            <span className="text-xl font-bold">Festival has Ended</span>
            <p className="text-white/80 mt-1">Thank you for celebrating with us</p>
            <div className="mt-3 text-sm bg-white/20 rounded-lg px-3 py-2 inline-block">
              See you next year!
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-amber-300/50"></div>
            <p className="text-amber-300 px-4 text-lg font-medium">
              {timeLeft.days > 30 ? 'Get Ready For Ganesh Utsav' : 
               timeLeft.days > 7 ? 'Countdown to Festival' : 
               timeLeft.days > 1 ? `Just ${timeLeft.days} Days to Go!` : 
               timeLeft.days === 1 ? 'Tomorrow is the Big Day!' : 
               'Festival Begins Today!'}
            </p>
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-amber-300/50"></div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center group relative ${i === 0 ? 'animation-delay-100' : i === 1 ? 'animation-delay-200' : i === 2 ? 'animation-delay-300' : 'animation-delay-400'}`}>
                <div className="w-full h-20 sm:h-24 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-2 overflow-hidden relative hover:bg-white/25 transition-all duration-300 countdown-box">
                  {/* Background animation effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Pulse animation for seconds */}
                  {i === 3 && (
                    <div className="absolute inset-0 bg-amber-500/20 animate-pulse-gentle"></div>
                  )}
                  
                  <span className="text-3xl sm:text-4xl font-bold text-white relative z-10 drop-shadow-md countdown-timer-digit">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-amber-200 uppercase tracking-wide font-semibold countdown-timer-label">{item.label}</span>
                
                {/* Separator dots for all but last item */}
                {i < 3 && (
                  <div className="absolute -right-2 sm:-right-3 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                    <div className="w-1 h-1 rounded-full bg-amber-400/80"></div>
                    <div className="w-1 h-1 rounded-full bg-amber-400/80"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Add to Calendar Button */}
          <button 
            className="mx-auto mt-4 flex items-center bg-white/20 hover:bg-white/30 transition-all duration-300 text-amber-200 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Add to Calendar
          </button>
        </>
      )}
      
      {/* Festival location details */}
      <div className="text-white/70 text-sm text-center mt-2 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Pattandur Agrahara, Bangalore • September 19-28, 2024
      </div>
    </div>
  );
};

export default HeroCountdownTimer;
