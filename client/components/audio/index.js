import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GainNode from './gain';
import audioChain from '../../utils/audioChain';
import './audio.css';

class AudioChain extends Component {
    render() {
        return (
            <div className='audio-chain'>
                <GainNode 
                    currentChain={this.props.currentChain} 
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext} />
                <GainNode 
                    currentChain={this.props.currentChain} 
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext} />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        audioContext: store.audio.audioContext,
        inputStream: store.audio.inputStream,
        currentChain: store.audio.currentChain
    }
}

export default connect(mapStateToProps)(AudioChain);