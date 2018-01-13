import React, {Component} from 'react';
import {connect} from 'react-redux';

class AudioChain extends Component {
    componentDidMount() {
        this.props.inputStream.connect(this.props.currentChain[0]);
        for (let i = 0; i < this.props.currentChain.length; i++) {
            if (this.props.currentChain[i + 1])
                this.props.currentChain[i].connect(this.props.currentChain[i + 1]);
            else {
                this.props.currentChain[i].connect(this.props.compressorNode);
                this.props.compressorNode.connect(this.props.analyserNode);
                this.props.analyserNode.connect(this.props.audioContext.destination);
            }
        }
    }

    componentDidUpdate() {
        this.props.inputStream.connect(this.props.currentChain[0]);
        if (this.props.currentChain[1]) {
            this.props.inputStream.disconnect(this.props.currentChain[1]);
        }
        for (let i = 0; i < this.props.currentChain.length; i++) {
            if (this.props.currentChain[i + 1]) {
                this.props.currentChain[i].connect(this.props.currentChain[i + 1]);
            }
            else {
                this.props.currentChain[i].connect(this.props.compressorNode);
                this.props.compressorNode.connect(this.props.analyserNode);
                this.props.analyserNode.connect(this.props.audioContext.destination);
            }
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        masterNode: state.audio.masterNode,
        compressorNode: state.audio.compressorNode,
        analyserNode: state.audio.analyserNode,
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain
    };
};

export default connect(mapStateToProps)(AudioChain);

