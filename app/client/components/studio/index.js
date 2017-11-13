import React, { Component } from 'react';

import Audio from '../audio';
import Diagnostics from '../diagnostics';
import Player from '../player';
import Recorder from '../recorder';

import './studio.css';

export default class StudioPage extends Component {
    render() {
        return (
            <div className='studio-container'>
                <div className='control-panel'>
                    <Player />
                    <Recorder />
                </div>
                <Diagnostics />
                <Audio />
            </div>
        );
    }
}
