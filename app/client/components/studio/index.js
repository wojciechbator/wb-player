import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Button } from 'primereact/components/button/Button';
import { InputText } from 'primereact/components/inputtext/InputText';

import Growl from '../growl';
import Audio from '../audio';
import Player from '../player';
import Recorder from '../recorder';
import { savePresetCreator, storePresetsCreator, updatePresetCreator } from '../../redux/actions/presetActions';

import './studio.css';

class StudioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPresetProperly: null,
            updatedPresetProperly: null,
            presetName: '',
            showGrowl: false
        }
        this.savePreset = this.savePreset.bind(this);
        this.updatePreset = this.updatePreset.bind(this);
        this.handlePresetName = this.handlePresetName.bind(this);
        this.getPresets = this.getPresets.bind(this);
        this.hideGrowl = this.hideGrowl.bind(this);
    }

    handlePresetName(event) {
        this.setState({ presetName: event.target.value });
    }

    componentDidMount() {
        this.getPresets();
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
                this.setState({ showGrowl: true });
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
                this.setState({ showGrowl: true });
                this.props.updatePresetCreator(presetId, newPresetObject);
            })
            .catch(error => this.setState({ updatedPresetProperly: false }));
    }

    hideGrowl() {
        this.setState({ showGrowl: false })
    }

    render() {
        return (
            <div className='studio-container'>
                {this.state.showGrowl === true && <Growl positive={true} header='Success' body='Operation done right!' onClick={this.hideGrowl} liveTime={2000} />}
                <div className='control-panel'>
                    <Player />
                    <Recorder initialAudio={this.props.audioContext} />
                </div>
                <div>
                    <div>
                        <Audio />
                    </div>
                    <div className="save-button-wrapper">
                        <InputText className="save-file-input" onChange={this.handlePresetName} placeholder="name preset..." />
                        <Button className="save-button" label="Save preset" onClick={this.savePreset}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ savePresetCreator, storePresetsCreator, updatePresetCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudioPage);
