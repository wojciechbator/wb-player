import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gainValuesCreator, removeNodeCreator } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Button } from 'primereact/components/button/Button';
import { Slider } from 'primereact/components/slider/Slider';

import './gain.css';


class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            gainNode: this.props.audioContext.createGain(),
        }
        
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
        this.setState({ gainNode: {gain: { value: 0.5 } } });
        this.props.gainValuesCreator(this.state.gainNode.gain.value);

        audioChain(this.props.currentChain[this.props.currentChain.indexOf(this.state.gainNode.gain.value) - 1], 
                    this.state.gainNode, 
                    this.props.currentChain[this.props.currentChain.indexOf(this.state.gainNode.gain.value) + 1], 
                    true, 
                    true, 
                    this.props.audioContext);
    
    }

    onVolumeChange(event) {
        this.setState({ gainNode: {gain: { value: event.value / 100 } } });
        this.props.gainValuesCreator(event.value);
    }

    render() {
        return (
            <div>
                <Fieldset legend="GAIN" toggleable={true}>
                    <div className="wrapper">
                        <h3>Gain: {Math.round(this.state.gainNode.gain.value * 100)}</h3>
                        <Slider orientation='vertical' animate={true} value={Math.round(this.state.gainNode.gain.value * 100)} onChange={this.onVolumeChange} />
                    </div>
                    <Button label="REMOVE" onClick={this.props.removeNode}/>
                </Fieldset>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        gainNode: {
            gain: {
                value: store.audio.gainNode.volume
            }
        }
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({gainValuesCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GainNode);