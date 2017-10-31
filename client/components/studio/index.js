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
        this.state = {
            savedPresetProperly: null,
            updatedPresetProperly: null
        }
        this.savePreset = this.savePreset.bind(this);
        this.updatePreset = this.updatePreset.bind(this);
    }

    savePreset() {
        const presetObject = {
            currentChain: this.props.currentChain,
            values: []
        }
        fetch('/api/presets', {
            method: 'POST',
            body: presetObject,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => this.setState({ savedPresetProperly: true }))
        .catch(error => this.setState({ savedPresetProperly: false }));
    }

    updatePreset(presetId) {
        const updatedPreset = {
            currentChain: this.props.currentChain,
            values: []
        }
        fetch(`/api/presets/${presetId}`, {
            method: 'PUT',
            body: updatedPreset,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => this.setState({ updatedPresetProperly: true }))
        .catch(error => this.setState({ updatedPresetProperly: false }));
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
