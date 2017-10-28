import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioChain extends Component {
    componentWillReceiveProps() {
        this.props.inputStream.connect(this.props.currentChain[0]);
        for (let i = 0; i < this.props.currentChain.length; i++) {
            this.props.currentChain[i + 1] ? 
            this.props.currentChain[i].connect(this.props.currentChain[i + 1]) : 
            this.props.currentChain[i].connect(this.props.audioContext.destination);
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

