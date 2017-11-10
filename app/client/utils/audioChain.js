import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioChain extends Component {
    componentWillReceiveProps(nextProps) {
        nextProps.inputStream && nextProps.inputStream.connect(nextProps.currentChain[0]);
        for (let i = 0; i < nextProps.currentChain.length; i++) {
            nextProps.currentChain[i + 1] ? 
            nextProps.currentChain[i].connect(nextProps.currentChain[i + 1]) : 
            nextProps.currentChain[i].connect(nextProps.audioContext.destination);
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        inputStream: state.audio.inputStream,
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain
    }
}

export default connect(mapStateToProps)(AudioChain);

