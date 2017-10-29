import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {Button} from 'primereact/components/button/Button';

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
        this.savePreset = this.savePreset.bind(this);
    }

    savePreset() {
        console.log("SAVE PRESET MOCK");
    }

    render() {
        return (
            <div>
                <AudioNodes audioContext={this.props.audioContext} />
                <Player />
                <div className="studio-container">
                    <PresetsContainer />
                    <NodesList />
                    <Audio />
                </div>
                <div className="save-button">
                    <Button label="Save preset" onClick={this.savePreset}/>
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
