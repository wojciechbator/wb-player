import React, { Component } from 'react';

import StudioPage from './studio';
import Header from './header';
import Footer from './footer';

export default class MainPage extends Component {
    render() {
        return (
            <div className='main-wrapper'>
                <Header />
                <div className='body-wrapper'>
                    <StudioPage />
                </div>
                <Footer />
            </div>
        );
    }
}