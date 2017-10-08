import React, { Component } from 'react';
import io from 'socket.io-client';

import AudioChain from '../audio';
import Player from '../player';
import AudioRecorder from '../recorder';
import PresetsContainer from '../presets';
import NodesList from '../nodesList';
import './studio.css';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
        const socket = io();
        console.log(socket);
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
                <AudioRecorder />
            </div>
        );
    }
}
