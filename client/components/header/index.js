import React from 'react';
import './header.css';
import logo from '../../assets/images/logo.png';

const Header = (props) => (
    <div className='header'>
        <img className='logo' src={logo} alt="logo" />
        <div className="header-text">Play and record Your music</div>
    </div>
);

export default Header;