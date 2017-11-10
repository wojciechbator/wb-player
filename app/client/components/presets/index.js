import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { DataList } from 'primereact/components/datalist/DataList';

import { storePresetsCreator } from '../../redux/actions/presetActions';

import './presets.css';

class Presets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        }
        
        this.getPresets = this.getPresets.bind(this);
    }

    componentDidMount() {
        this.getPresets();
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
                    {this.state.presets.map((preset, key) => <div key={key} className='preset'>{preset.name}</div>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        presets: state.preset.presets.data
    }
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ storePresetsCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Presets);