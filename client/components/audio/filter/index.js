import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gainValuesCreator, addNodeCreator } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

import './filter.css';

class FilterNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            filterNode: {
                lowpass: 50,
                bandpass: 50,
                highpass: 50
            }
        }
        
        this.onBassChange = this.onBassChange.bind(this);
        this.onMiddleChange = this.onMiddleChange.bind(this);
        this.onTrebleChange = this.onTrebleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ filterNode: this.props.audioContext.createBiquadFilter() });
        const node = this.props.audioContext.createBiquadFilter();
        audioChain(this.props.currentChain[this.props.currentChain.indexOf(this.state.filterNode) - 1], 
                    this.state.filterNode, 
                    this.props.currentChain[this.props.currentChain.indexOf(this.state.filterNode) + 1], 
                    true, 
                    true, 
                    this.props.audioContext);
    
    }

    onBassChange(event) {
        this.setState({ filterNode: {lowpass: { value: event.value } } });
    }

    onMiddleChange(event) {
        this.setState({ filterNode: {bandpass: { value: event.value } } });
    }
    
    onTrebleChange(event) {
        this.setState({ filterNode: {highpass: { value: event.value } } });
    }

    render() {
        return (
            <div>
                <div>
                    <Fieldset legend="FILTER" toggleable={true}>
                        <div className="wrapper">
                            <h3>Filters</h3>
                            <div className="filter-sliders">
                                <label>Bass</label>
                                <Slider className="slider" orientation='vertical' animate={true} value={this.state.filterNode.lowpass} onChange={this.onBassChange} />
                                <label>Middle</label>
                                <Slider className="slider" orientation='vertical' animate={true} value={this.state.filterNode.bandpass} onChange={this.onMiddleChange} />
                                <label>Treble</label>
                                <Slider className="slider" orientation='vertical' animate={true} value={this.state.filterNode.highpass} onChange={this.onTrebleChange} />
                            </div>
                        </div>
                    </Fieldset>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        filterNode: {
            gain: {
                value: store.audio.gainNode.volume
            }
        }
    }
}

// const mapDispatchToProps = (dispatch) => bindActionCreators({gainValuesCreator, addNodeCreator}, dispatch);

export default connect(mapStateToProps, null)(FilterNode);