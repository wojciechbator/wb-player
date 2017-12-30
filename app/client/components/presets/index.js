import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { DataList } from 'primereact/components/datalist/DataList';

import { clearChainCreator, addNodeCreator, nodeValueCreator } from '../../redux/actions/audioActions';
import { storePresetsCreator } from '../../redux/actions/presetActions';

import './presets.css';

class Presets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        };
        this.getPresets = this.getPresets.bind(this);
        this.removePreset = this.removePreset.bind(this);
        this.setPresetFromDatabase = this.setPresetFromDatabase.bind(this);
    }

    componentDidMount() {
        this.getPresets();
    }

    setPresetFromDatabase(key) {
        this.props.clearChainCreator();
        this.state.presets[key].currentChain.map((element, i) => {
            this.props.availableNodes.map(availableNode => {
                if (availableNode.constructor.name === element.name) {
                    this.props.addNodeCreator(availableNode);
                    availableNode.gain && this.props.nodeValueCreator(0, availableNode, element.value);
                }
            });
        });
    }

    getPresets() {
        axios.get('/api/presets')
            .then(response => {
                this.setState({ presets: response.data });
                this.props.storePresetsCreator(response.data);
            })
            .catch(error => { throw new Error(error); });
    }

    removePreset(key) {
        axios.delete(`/api/presets/${this.state.presets[key]._id}`)
            .then(response => {
                this.getPresets();
            });
    }

    render() {
        return (
            <div className='presets-container'>
                <div className='presets-header'>Presets</div>
                <div className='presets-list'>
                    {this.state.presets.map((preset, key) =>
                        <div key={key} className='flexible-preset'>
                            <div className='preset' onDoubleClick={() => this.setPresetFromDatabase(key)}>{preset.name}</div>
                            <button 
                                className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only' 
                                onClick={() => this.removePreset(key)}>
                                <i className='fa fa-times'></i>
                            </button>
                        </div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        presets: state.preset.presets.data,
        currentChain: state.audio.currentChain,
        availableNodes: state.audio.availableNodes
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ storePresetsCreator, clearChainCreator, addNodeCreator, nodeValueCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Presets);