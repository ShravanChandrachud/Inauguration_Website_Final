import React from 'react';
import { useSpring, animated } from 'react-spring';
import './landing_page.css';
import logo from './logoblack.png';

const LandingPage = () => {
  const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1500 } });
  const zoomInProps = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0.5)' }, config: { duration: 1500 } });

  return (
    <div className="landing-page">
      <div className="gif-background"></div>
      <animated.div style={fadeInProps} className="header">
        <img src={logo} alt="ACES Logo" className="logo" />
        <animated.h1 style={zoomInProps}>Welcome to ACES INAUGRATION 2024-25</animated.h1>
      </animated.div>
      <div className="content">
        <animated.p style={fadeInProps}>We are excited to have you join us for an amazing year of learning and growth.</animated.p>
      </div>
    </div>
  );
};

export default LandingPage;

