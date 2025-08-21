import React, { useState, useEffect } from 'react';

interface LoaderProps {
  duration?: number; 
}

const Loader: React.FC<LoaderProps> = ({ duration = 7000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, duration / 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-50 to-orange-50 z-[100] flex flex-col items-center justify-center overflow-hidden">
      
      <h2 className="mt-6 text-2xl font-bold text-amber-800 animate-fade-in">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-red-500 to-amber-600">
          Ganpati Bappa Morya, Mangal Murti Morya...
        </span>
      </h2>
      
      {/* Loading progress bar */}
      <div className="mt-6 w-64 h-3 bg-amber-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
          style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-out' }}
        ></div>
      </div>
      
      {/* Auspicious Om symbol */}
      <div className="mt-6 text-amber-600 animate-bounce-subtle">
        <span className="text-2xl">॥ ॐ ॥</span>
      </div>
      
      {/* Decorative dots - represent Kumkum/Sindoor dots used in rituals */}
      <div className="mt-4 flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
      </div>
    </div>
  );
};

export default Loader;