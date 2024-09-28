import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './landing_page.css';
import logo from './logowhite.png';

const LandingPage = () => {
  const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1500 } });
  const zoomInProps = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0.5)' }, config: { duration: 1500 } });

  const [isAnimate, setIsAnimate] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Track click state

  const reDirect = () => {
    window.open("https://www.acespvgcoet.in/", "_self");
  };

  const handleClick = () => {
    setIsClicked(true);
    setIsAnimate(true);
    setTimeout(reDirect, 2500);
  };

  return (
    <div className="landing-page">
      <div className={`gif-background ${isAnimate ? `fade-out` : ''}`}></div>
      <animated.div style={fadeInProps} className="header">
        <div className={`logo-ele ${isAnimate ? `animate` : ``}`}>
          <img
            src={logo}
            alt="ACES Logo"
            className={`logo ${isAnimate ? `animate-logo ${isClicked ? 'hover-effect' : ''}` : ''}`} // Apply hover-effect conditionally
            onClick={handleClick}
          />
        </div>
        {!isAnimate && <animated.h1 style={zoomInProps} className={isAnimate ? `hidden` : ``}>Welcome to ACES INAUGURATION 2024-25</animated.h1>}
      </animated.div>
      <div className={`content ${isAnimate ? `hidden` : ``}`}>
        <animated.p style={fadeInProps}>We are excited to have you join us for an amazing year of learning and growth.</animated.p>
      </div>
    </div>
  );
};

export default LandingPage;
