import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioChain extends Component {
    componentDidMount() {
        this.props.inputStream && this.props.analyserNode && this.props.analyserNode.connect(this.props.currentChain[0]);
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
        analyserNode: state.audio.analyserNode,
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain
    }
}

export default connect(mapStateToProps)(AudioChain);

