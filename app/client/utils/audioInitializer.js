import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Growl from '../components/growl';
import {initContextCreator, inputStreamCreator} from '../redux/actions/audioActions';
import AudioNodes from './audioNodes';

class AudioInitializer extends Component {
    constructor(props) {
        super(props);
        this.captureAudio = this.captureAudio.bind(this);
        this.state = {
            audioContext: new (window.AudioContext || window.webkitAudioContext),
            showGrowl: false
        };

        this.props.initContextCreator(this.state.audioContext);
        this.onGrowlClick = this.onGrowlClick.bind(this);
        this.captureAudio();
    }

    async captureAudio() {
        if (!navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia ||
                navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
        if (navigator.mediaDevices.getUserMedia) {
            await navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                const inputStream = this.state.audioContext.createMediaStreamSource(stream);
                this.props.inputStreamCreator(inputStream);
            }).catch(error => {
                this.setState({showGrowl: true});
                throw new Error(error);
            });
        } else {
            alert('getUserMedia is not supported in this browser.');
            throw new Error();
        }
    }

    onGrowlClick() {
        this.setState({showGrowl: !this.state.showGrowl});
    }

    render() {
        return (
            <div>
                <Growl header='Problem' body='Error capturing audio' positive={false}
                       showGrowl={this.state.showGrowl === true} onClick={this.onGrowlClick}/>
                <AudioNodes audioContext={this.state.audioContext}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        analyserNode: state.audio.analyserNode
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({initContextCreator, inputStreamCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AudioInitializer);