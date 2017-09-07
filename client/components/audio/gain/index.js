import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Gain from './presentation';
import { storeGainNodeValues } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';

class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            volume: 50
        }

        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.setNodeInChain = this.setNodeInChain.bind(this);
    }
    
    componentDidMount() {
        this.setNodeInChain();
    }

    setNodeInChain() {
        const gainNode = this.props.audioContext.createGain();
        // Await inputStream somehow!
        audioChain(this.props.inputStream, null, gainNode, null, true, true, this.props.audioContext);
        this.props.dispatch(storeGainNodeValues(gainNode));
    }
    
    onVolumeChange(event) {
        this.setState({ volume: event.value });
    }
    
    render() {
        return (
            <div>
                <Gain type='GAIN' volume={this.state.volume} onVolumeChange={this.onVolumeChange} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        volume: store.audio.gainNode.volume,
        audioContext: store.audio.audioContext,
        inputStream: store.audio.inputStream
    }
}

export default connect(mapStateToProps)(GainNode);