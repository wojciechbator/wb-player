import React from 'react';
import Search from '../search/search';
import './header.css';
import logo from '../../assets/images/logo.svg';

const Header = (props) => (
    <div className='header'>
        <img className='logo' src={logo} alt="logo" />
        <div className='header-text-search'>
            Search for song: <Search />    
        </div>
        <div className='menu-button'>Wyloguj</div>
    </div>
);

export default Header;