import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import AudioChain from '../audio';
import Player from '../player';
import Recorder from '../recorder';
import PresetsContainer from '../presets';
import NodesList from '../nodesList';
import './studio.css';

class StudioPage extends Component {
    constructor(props) {
        super(props);
        const socket = io();
    }
      
    render() {
        return (
            <div className="studio-module">
                <Player />
                <div className="studio-container">
                    <PresetsContainer />
                    <NodesList />
                    <AudioChain />
                </div>
                <Recorder initialAudio={this.props.audioContext} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        audioContext: state.audio.audioContext,
        // outputContext: state.output.outputContext
    }
}

export default connect(mapStateToProps)(StudioPage);
