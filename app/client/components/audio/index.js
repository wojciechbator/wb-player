import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {InputText} from 'primereact/components/inputtext/InputText';

import GenericNode from './genericNode';
import Growl from '../growl';
import {addNodeCreator, clearChainCreator} from '../../redux/actions/audioActions';
import {savePresetCreator, storePresetsCreator, updatePresetCreator} from '../../redux/actions/presetActions';
import {validField} from '../../utils/formValidator';
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
        };
        this.savePreset = this.savePreset.bind(this);
        this.onGrowlClick = this.onGrowlClick.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.setPresetFromDatabase = this.setPresetFromDatabase.bind(this);
        this.checkNodeIndexInChain = this.checkNodeIndexInChain.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
    }

    componentDidMount() {
        this.props.presets.length > 0 && this.setPresetFromDatabase();
    }

    setPresetFromDatabase() {
        this.props.clearChainCreator();
        this.props.presets[this.props.presets.length - 1].currentChain.map(element =>
            this.props.availableNodes.map(availableNode =>
                element.name === availableNode.constructor.name && this.props.addNodeCreator(availableNode)));
    }

    handlePresetName(event) {
        this.setState({presetName: event.target.value});
    }

    savePreset() {
        let nodes = [];
        this.props.currentChain.map(node => node.type ?
            nodes.push({name: node.type, value: node.gain ? node.gain.value : 0}) :
            nodes.push({name: node.constructor.name, value: node.gain ? node.gain.value : 0}));
        const presetObject = {
            name: this.state.presetName,
            user: sessionStorage.getItem('loggedUser'),
            currentChain: nodes
        };
        axios.post('/api/presets', presetObject)
            .then(response => {
                this.setState({showGrowl: true});
                this.props.savePresetCreator(presetObject);
            })
            .catch(error => this.setState({savedPresetProperly: false}));
        this.setState({showPopup: false});
    }

    onShowModal() {
        this.setState({showPopup: true});
    }

    onHideModal() {
        this.setState({showPopup: false, presetName: '', textFieldError: null});
        document.getElementById('presetName').value = '';
    }

    onGrowlClick() {
        this.setState({showGrowl: !this.state.showGrowl});
    }

    checkField(event) {
        this.setState({textFieldError: !validField(event.target.value)});
    }

    checkNodeIndexInChain(node, chain, i) {
        return i === 0 ? chain.length - 1 : chain.length - chain.indexOf(node) - 1;
    }

    render() {
        return (
            <div className='preset-container'>
                <Growl positive={true} header='Success' body='Operation done right!' onClick={this.onGrowlClick}
                       showGrowl={this.state.showGrowl === true}/>
                <Dialog header='Save preset' visible={this.state.showPopup} modal={true} dismissableMask={true}
                        onHide={this.onHideModal}>
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
                        <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                                onClick={this.savePreset}
                                disabled={this.state.textFieldError === null || this.state.textFieldError === true}>
                            <i className='fa fa-save'></i>
                        </button>
                        {this.state.textFieldError === true && <div className='error-message'>This field is wrong</div>}
                    </div>
                </Dialog>
                <div className='audio-header'>
                    <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.onShowModal}><i className='fa fa-save'></i></button>
                    <div className='inline-header'>Current Preset</div>
                </div>
                <div className='audio-chain'>
                    {this.props.currentChain.map((element, i) => <GenericNode key={i}
                                                                              index={this.checkNodeIndexInChain(element, this.props.currentChain, i)}
                                                                              node={this.props.currentChain[0]}
                                                                              isMaster={i === 0}/>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain,
        presets: state.preset.presets,
        availableNodes: state.audio.availableNodes
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    savePresetCreator,
    storePresetsCreator,
    updatePresetCreator,
    addNodeCreator,
    clearChainCreator
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Audio);