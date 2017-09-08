import React, { Component } from 'react';

import AudioChain from '../audio';
import PresetsContainer from '../presets';
import './studio.css';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
    }
      
    render() {
        return (
            <div className="studio-container">
                <PresetsContainer />
                <AudioChain />
            </div>
        );
    }
}
