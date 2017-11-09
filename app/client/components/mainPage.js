import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import { storeSocketCreator } from '../redux/actions/socketActions';
import StudioPage from './studio';
import PresetsContainer from './presets';
import NodesList from './nodesList';
import AudioInitializer from '../utils/AudioInitializer';
import AudioChain from '../utils/AudioChain';
import Header from './header';
import Footer from './footer';

import './mainLayout.css';

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
            <div className='app-container'>
                <AudioInitializer />
                <AudioChain />
                <Header />
                <div className='content-wrapper'>
                    <div className='left-menu'>
                        <PresetsContainer />
                        <NodesList />
                    </div>
                    <StudioPage />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ storeSocketCreator }, dispatch);

export default connect(null, mapDispatchToProps)(MainPage);