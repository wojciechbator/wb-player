import React, { Component } from 'react';
import io from 'socket.io-client';

import AudioChain from '../audio';
import PresetsContainer from '../presets';
import DraggableList from '../draggable/DraggableList';
import './studio.css';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
        const socket = io();
        console.log(socket);
    }
      
    render() {
        return (
            <div className="studio-container">
                <PresetsContainer />
                <DraggableList />
                <AudioChain />
            </div>
        );
    }
}
