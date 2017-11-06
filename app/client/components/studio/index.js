import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Button } from 'primereact/components/button/Button';
import { InputText } from 'primereact/components/inputtext/InputText';

import Audio from '../audio';
import Player from '../player';
import Recorder from '../recorder';
import PresetsContainer from '../presets';
import NodesList from '../nodesList';
import { savePresetCreator, storePresetsCreator, updatePresetCreator } from '../../redux/actions/presetActions';

import './studio.css';

class StudioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPresetProperly: null,
            updatedPresetProperly: null,
            presetName: ''
        }
        this.savePreset = this.savePreset.bind(this);
        this.updatePreset = this.updatePreset.bind(this);
        this.handlePresetName = this.handlePresetName.bind(this);
    }

    handlePresetName(event) {
        this.setState({ presetName: event.target.value });
    }

    getPresets() {
        axios.get('/api/presets')
            .then(data => this.props.storePresetsCreator(data))
            .catch(error => { throw new Error(error); });
    }

    savePreset() {
        const presetObject = {
            name: this.state.presetName,
            gain: 50,
            delay: false,
            distortion: 400,
            bass: 50,
            middle: 50,
            treble: 50,
            currentChain: this.props.currentChain
        }
        axios.post('/api/presets', presetObject)
            .then(response => {
                this.setState({ savedPresetProperly: true });
                this.props.savePresetCreator(presetObject);
            })
            .catch(error => this.setState({ savedPresetProperly: false }));
    }

    updatePreset(presetId) {
        const newPresetObject = {
            name: this.state.presetName,
            gain: 52,
            delay: false,
            distortion: 380,
            bass: 52,
            middle: 52,
            treble: 52,
            currentChain: this.props.currentChain
        }
        axios.put(`/api/presets/${presetId}`, newPresetObject)
            .then(response => {
                this.setState({ updatedPresetProperly: true });
                this.props.updatePresetCreator(presetId, newPresetObject);
            })
            .catch(error => this.setState({ updatedPresetProperly: false }));
    }

    render() {
        return (
            <div>
                <Player />
                <div>
                    <div className="studio-container">
                        <PresetsContainer />
                        <NodesList />
                        <Audio />
                    </div>
                    <div className="save-button-wrapper">
                        <InputText className="save-file-input" onChange={this.handlePresetName} placeholder="name preset..." />
                        <Button className="save-button" label="Save preset" onClick={this.savePreset}/>
                    </div>
                </div>
                <Recorder initialAudio={this.props.audioContext} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        audioContext: state.audio.audioContext
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ savePresetCreator, storePresetsCreator, updatePresetCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudioPage);
