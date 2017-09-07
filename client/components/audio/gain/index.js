import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Gain from './presentation';
import { storeGainNodeValues, addNodeToChain } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';

class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            volume: 50
        }
        
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }
    
    componentDidMount() {
        const gainNode = this.props.audioContext.createGain();
        this.props.dispatch(storeGainNodeValues(gainNode));
        this.props.dispatch(addNodeToChain(gainNode));
        audioChain(this.props.currentChain[this.props.currentChain.indexOf(gainNode) - 1], gainNode, this.props.currentChain[this.props.currentChain.indexOf(gainNode) + 1], true, true, this.props.audioContext);
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
        inputStream: store.audio.inputStream,
        currentChain: store.audio.currentChain
    }
}

export default connect(mapStateToProps)(GainNode);