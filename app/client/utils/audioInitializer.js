import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initContextCreator, inputStreamCreator } from '../redux/actions/audioActions';
import AudioNodes from './audioNodes';

class AudioInitializer extends Component {
    constructor(props) {
        super(props);
        this.captureAudio = this.captureAudio.bind(this);
        this.state = {
            audioContext: new (window.AudioContext || window.webkitAudioContext)
        }
        this.props.initContextCreator(this.state.audioContext);
        this.captureAudio();
    }

    async captureAudio() {
        if (!navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia ||
                navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
        if (navigator.mediaDevices.getUserMedia) {
            await navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                const inputStream = this.state.audioContext.createMediaStreamSource(stream);
                this.props.inputStreamCreator(inputStream);
            }).catch(error => {
                alert('Error capturing audio.');
                throw new Error(error);
            });
        } else {
            alert('getUserMedia is not supported in this browser.');
            throw new Error();
        }
    }

    render() {
        return <AudioNodes audioContext={this.state.audioContext} />;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ initContextCreator, inputStreamCreator }, dispatch);

export default connect(null, mapDispatchToProps)(AudioInitializer);