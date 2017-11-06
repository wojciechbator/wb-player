import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import { storeSocketCreator } from '../redux/actions/socketActions';
import StudioPage from './studio';
import Header from './header';
import Footer from './footer';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const socket = io();        
        this.props.storeSocketCreator(socket);        
    }

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

const mapDispatchToProps = dispatch => bindActionCreators({ storeSocketCreator }, dispatch);

export default connect(null, mapDispatchToProps)(MainPage);