import React, { useState } from "react";
import "./AnimatedLockBackground.css"; // Correctly naming the CSS file
import lockGif from "./lock2.gif"; // Assuming your lock gif is stored as lock2.gif

const AnimatedLockBackground = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleLockClick = () => {
    if (isUnlocked) return; // If already unlocked, do nothing.

    setClickCount((prevCount) => prevCount + 1);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false); // Stop shaking after animation
    }, 500);

    if (clickCount + 1 === 3) {
      // Unlock after 3 clicks
      setIsUnlocked(true);
    }
  };

  return (
    <div className="lock-container">
      {!isUnlocked ? (
        <img
          src={lockGif} // Correctly reference the GIF file you uploaded.
          alt="Lock"
          className={`lock ${isShaking ? "shake" : ""}`} // Fix template literal usage
          onClick={handleLockClick}
        />
      ) : (
        <div className="unlock-message">Unlocked!</div> // Replace with unlock animation or message.
      )}
    </div>
  );
};

export default AnimatedLockBackground;
