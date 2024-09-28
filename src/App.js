import React, { useState } from 'react';
import './App.css';
import lockgif from "./unlock.gif";
import newgif from "./Lock.gif";
import LandingPage from './landing_page';
import myvideo from './Aces_inauguration_reel_final.mp4';
import confetti from 'canvas-confetti';

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockedLock, setShowUnlockedLock] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);

  const handleLockClick = () => {
    setClicks(prevClicks => {
      if (prevClicks < 2) {
        return prevClicks + 1;
      } else if (prevClicks === 2) {
        setClicks(3);
        setShowUnlockedLock(true);
        setTimeout(() => {
          setShowUnlockedLock(false);
          setIsUnlocked(true);
          setShowVideo(true); // Show video immediately after unlocking
        }, 3000); // Adjust time if needed for smooth transition
      }
      return prevClicks;
    });
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setTimeout(() => {
      setShowLandingPage(true);
      triggerConfetti();
    }, 200);
  };

  const triggerConfetti = () => {
    const count = 500; // Number of confetti pieces per burst
    const rainCount = 200; // Number of continuous raining confetti pieces
    const duration = 3000; // Duration of the continuous effect in milliseconds

    // Initial burst
    confetti({
      particleCount: count,
      spread: 160,
      origin: { y: 0.2, x: 0.5 }, // Centered horizontally, near the top
      angle: 90,
      shapes: ['circle'],
      scalar: 1.2 // Increased size of confetti
    });

    // Continuous rain
    const interval = setInterval(() => {
      confetti({
        particleCount: rainCount,
        spread: 160,
        origin: { y: 0 }, // Confetti starts from the top
        angle: 90, // Straight down
        shapes: ['circle'],
        scalar: 1.2 // Increased size of confetti
      });
    }, 500); // Adjust the interval for the frequency of bursts

    // Stop the confetti after the specified duration
    setTimeout(() => {
      clearInterval(interval);
    }, duration);
  };

  const getShakeClass = () => {
    if (clicks === 1) {
      return 'shake-1';
    } else if (clicks === 2) {
      return 'shake-2';
    }
    return '';
  };

  return (
    <div className={`app ${showVideo || showLandingPage ? 'video-transition' : ''}`}>
      {!isUnlocked && !showVideo && !showLandingPage && (
        <div className={`lock-container ${getShakeClass()} ${isUnlocked ? 'unlocking' : ''}`}>
          <img
            src={clicks < 3 ? newgif : lockgif}
            alt="Lock"
            onClick={handleLockClick}
            className={`lock ${isUnlocked ? 'unlock' : ''}`}
          />
        </div>
      )}

      {showVideo && (
        <div className="video-container show">
          <video
            width="100%"
            height="100%"
            onEnded={handleVideoEnd}
            autoPlay
            className="video-player"
          >
            <source src={myvideo} type="video/mp4" />
          </video>
        </div>
      )}

      {showLandingPage && (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
