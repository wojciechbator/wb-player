import React from 'react';
import './header.css';
import logo from '../../assets/images/logo.svg';

const Header = (props) => (
    <div className='header'>
        <img className='logo' src={logo} alt="logo" />
    </div>
);

export default Header;