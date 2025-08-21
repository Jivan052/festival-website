import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  id?: string;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrl,
  id = 'background-video',
  muted = false,
  loop = true,
  className = "w-full h-full object-cover",
  onPlay,
  onPause,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Ensure the video starts playing as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement) {
      // Try to play with sound first
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("AutoPlay with sound was prevented:", error);
          // Many browsers prevent autoplay with sound without user interaction
          // If autoplay with sound fails, we can try muting and then playing
          if (!muted) {
            console.log("Attempting to play muted instead...");
            videoElement.muted = true;
            videoElement.play().then(() => {
              // Let the user know they need to unmute manually
              console.log("Video is playing muted. User needs to click unmute button.");
            }).catch(err => {
              console.error("Even muted autoplay was prevented:", err);
            });
          }
        });
      }
    }
  }, [videoUrl, muted]);
  
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);

  // Check if autoplay with sound might be blocked
  useEffect(() => {
    if (!muted) {
      // If browser might block autoplay with sound, show a hint
      const timer = setTimeout(() => {
        setShowUnmuteHint(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [muted]);

  return (
    <div className="video-container h-full w-full">
      <video
        ref={videoRef}
        id={id}
        autoPlay
        muted={muted}
        loop={loop}
        playsInline
        className={className}
        onPlay={onPlay}
        onPause={onPause}
        onError={onError}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
