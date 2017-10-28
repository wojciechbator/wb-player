import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import Audio from '../audio';
import Player from '../player';
import Recorder from '../recorder';
import PresetsContainer from '../presets';
import NodesList from '../nodesList';
import AudioNodes from '../../utils/AudioNodes';

import './studio.css';

class StudioPage extends Component {
    constructor(props) {
        super(props);
        const socket = io();
    }

    render() {
        return (
            <div className="studio-module">
                <AudioNodes audioContext={this.props.audioContext} />
                <Player />
                <div className="studio-container">
                    <PresetsContainer />
                    <NodesList />
                    <Audio />
                </div>
                <Recorder initialAudio={this.props.audioContext} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        audioContext: state.audio.audioContext,
    }
}

export default connect(mapStateToProps)(StudioPage);
