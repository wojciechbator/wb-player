import React, { Component } from 'react';

import GainNode from '../audio/gain';
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
                <GainNode />
            </div>
        );
    }
}
