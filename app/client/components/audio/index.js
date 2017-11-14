import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { InputText } from 'primereact/components/inputtext/InputText';

import GenericNode from './genericNode';
import Growl from '../growl';
import { savePresetCreator, storePresetsCreator, updatePresetCreator } from '../../redux/actions/presetActions';
import { validField } from '../../utils/formValidator';
import './audio.css';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPresetProperly: null,
            updatedPresetProperly: null,
            showPopup: false,
            presetName: '',
            showGrowl: false,
            textFieldError: null
        }
        this.savePreset = this.savePreset.bind(this);
        this.updatePreset = this.updatePreset.bind(this);
        this.onGrowlClick = this.onGrowlClick.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
    }

    handlePresetName(event) {
        this.setState({ presetName: event.target.value });
    }

    savePreset() {
        let nodesNames = [];
        this.props.currentChain.map(node => node.type ? nodesNames.push(node.type) : nodesNames.push(node.constructor.name));
        const presetObject = {
            name: this.state.presetName,
            gain: 50,
            delay: false,
            distortion: 400,
            bass: 50,
            middle: 50,
            treble: 50,
            user: sessionStorage.getItem('loggedUser'),
            currentChain: nodesNames
        }
        axios.post('/api/presets', presetObject)
            .then(response => {
                this.setState({ showGrowl: true });
                this.props.savePresetCreator(presetObject);
            })
            .catch(error => this.setState({ savedPresetProperly: false }));
        this.setState({ showPopup: false });
    }

    updatePreset(presetId) {
        let nodesNames = [];
        this.props.currentChain.map(node => node.type ? nodesNames.push(node.type) : nodesNames.push(node.constructor.name));
        const newPresetObject = {
            name: this.state.presetName,
            gain: 52,
            delay: false,
            distortion: 380,
            bass: 52,
            middle: 52,
            treble: 52,
            user: sessionStorage.getItem('loggedUser'),
            currentChain: nodesNames
        }
        axios.put(`/api/presets/${presetId}`, newPresetObject)
            .then(response => {
                this.setState({ showGrowl: true });
                this.props.updatePresetCreator(presetId, newPresetObject);
            })
            .catch(error => this.setState({ updatedPresetProperly: false }));
        this.setState({ showPopup: false });
    }

    onShowModal() {
        this.setState({ showPopup: true });
    }

    onHideModal() {
        this.setState({ showPopup: false, presetName: '', textFieldError: null });
        document.getElementById('presetName').value = '';
    }

    onGrowlClick() {
        this.setState({ showGrowl: !this.state.showGrowl });
    }

    checkField(event) {
        this.setState({ textFieldError: !validField(event.target.value) });
    }

    render() {
        return (
            <div className='preset-container'>
                <Growl positive={true} header='Success' body='Operation done right!' onClick={this.onGrowlClick} showGrowl={this.state.showGrowl === true} />
                <Dialog header='Save preset' visible={this.state.showPopup} modal={true} dismissableMask={true} onHide={this.onHideModal}>
                    <div className='dialog-body'>
                        <InputText
                            id='presetName'
                            className={this.state.textFieldError === true && 'error-input'}
                            onChange={event => {
                                this.handlePresetName(event);
                                this.checkField(event);
                            }}
                            onBlur={event => this.checkField(event)}
                        />
                        <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only' onClick={this.savePreset} disabled={this.state.textFieldError === null || this.state.textFieldError === true}><i className='fa fa-save'></i></button>
                        {this.state.textFieldError === true && <div className='error-message'>This field is wrong</div>}
                    </div>
                </Dialog>
                <div className='audio-header'>
                    <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only' onClick={this.onShowModal}><i className='fa fa-save'></i></button>
                    <div className='inline-header'>Current Preset</div>
                </div>
                <div className='audio-chain'>
                    {this.props.currentChain.map((element, i) => <GenericNode key={i} index={i} node={element} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Audio);