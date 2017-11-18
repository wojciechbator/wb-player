import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { DataList } from 'primereact/components/datalist/DataList';

import { clearChainCreator, addNodeCreator } from '../../redux/actions/audioActions';
import { storePresetsCreator } from '../../redux/actions/presetActions';

import './presets.css';

class Presets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        };
        this.getPresets = this.getPresets.bind(this);
        this.setPresetFromDatabase = this.setPresetFromDatabase.bind(this);
    }

    componentDidMount() {
        this.getPresets();
    }

    setPresetFromDatabase() {
        this.props.clearChainCreator();
        this.state.presets[this.state.presets.length - 1].currentChain.map(element => {
            this.props.availableNodes.map(availableNode => {
                if (element.name === availableNode.constructor.name) {
                    this.props.addNodeCreator(availableNode);
                }
            });
        });
    }

    getPresets() {
        axios.get('/api/presets')
            .then(response => {
                this.setState({ presets: response.data })
                this.props.storePresetsCreator(response.data)
            })
            .catch(error => { throw new Error(error); });
    }
    
    render() {
        return (
            <div className='presets-container'>
                <div className='presets-header'>Presets</div>
                <div className='presets-list'>
                    {this.state.presets.map((preset, key) => <div key={key} className='preset' onDoubleClick={this.setPresetFromDatabase}>{preset.name}</div>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        presets: state.preset.presets.data,
        currentChain: state.audio.currentChain,
        availableNodes: state.audio.availableNodes
    }
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ storePresetsCreator, clearChainCreator, addNodeCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Presets);