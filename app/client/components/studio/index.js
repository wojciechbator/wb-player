import React from 'react';

import Audio from '../audio';
import Diagnostics from '../diagnostics';
import Player from '../player';
import Recorder from '../recorder';

import './studio.css';

const StudioPage = props => (
    <div className='studio-container'>
        <div className='control-panel'>
            <Player/>
            <Recorder/>
        </div>
        <Diagnostics/>
        <Audio/>
    </div>
);

export default StudioPage;
