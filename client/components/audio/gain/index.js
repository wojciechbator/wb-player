import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { observeGainNodeChanges } from '../../../services/gain/GainNodeService';
import GenericAudioNode from '../generic';
import { gainValuesCreator, addNodeCreator } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';

class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            gainNode: this.props.audioContext.createGain()
        }
        
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
        this.setState({ gainValue: {gain: { value: 0.5 } } });
        this.props.gainValuesCreator(this.state.gainNode.gain.value);
        this.props.addNodeCreator(this.state.gainNode.gain.value);

        audioChain(this.props.currentChain[this.props.currentChain.indexOf(this.state.gainNode.gain.value) - 1], 
                    this.state.gainNode, 
                    this.props.currentChain[this.props.currentChain.indexOf(this.state.gainNode.gain.value) + 1], 
                    true, 
                    true, 
                    this.props.audioContext);
    
    }

    onVolumeChange(event) {
        this.setState({ gainValue: {gain: { value: event.value / 100 } } });
        observeGainNodeChanges(this.state.gainNode.gain.value, 500).subscribe(value => this.props.gainValuesCreator(value));
    }

    render() {
        return (
            <div>
                <GenericAudioNode type='GAIN' volume={Math.round(this.state.gainNode.gain.value * 100)} onVolumeChange={this.onVolumeChange} />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({gainValuesCreator, addNodeCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GainNode);