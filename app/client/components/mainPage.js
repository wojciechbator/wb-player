import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import { storeSocketCreator } from '../redux/actions/socketActions';
import StudioPage from './studio';
import Presets from './presets';
import NodesList from './nodesList';
import AudioInitializer from '../utils/audioInitializer';
import AudioChain from '../utils/audioChain';
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
                {this.props.inputStream && <AudioChain inputStream={this.props.inputStream} />}
                <Header />
                <div className='content-wrapper'>
                    <div className='left-menu'>
                        <Presets />
                        <NodesList />
                    </div>
                    <StudioPage />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inputStream: state.audio.inputStream
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ storeSocketCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);