import React, { Component } from 'react';

import splashImage from '../../assets/images/splash.png'
import './splash.css';

const SplashScreen = (props) => (
    <div className="splash-wrapper">
        <img className="splash-image" src={splashImage} alt="Splash screen" />
    </div>
);

export default SplashScreen;