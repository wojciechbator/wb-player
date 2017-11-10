import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'primereact/components/button/Button';
import { InputText } from 'primereact/components/inputtext/InputText';

import GainNode from './gain';
import FilterNode from './filter';
import Growl from '../growl';
import { savePresetCreator, storePresetsCreator, updatePresetCreator } from '../../redux/actions/presetActions';
import './audio.css';

class Audio extends Component {
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
        this.hideGrowl = this.hideGrowl.bind(this);
    }

    handlePresetName(event) {
        this.setState({ presetName: event.target.value });
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
            <div className='audio-chain'>
                <div className='audio-header'>
                    
                </div>
                {this.state.showGrowl === true && <Growl positive={true} header='Success' body='Operation done right!' onClick={this.hideGrowl} liveTime={2000} />}
                <InputText onChange={this.handlePresetName} placeholder="name preset..." />
                <Button className="save-button" label="Save preset" onClick={this.savePreset} />
                {this.props.currentChain.map((element, i) => <GainNode key={i} index={i} node={element} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Audio);