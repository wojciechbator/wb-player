import React, { Component } from 'react';
import Context from './utils/Context';
import Player from './utils/Player';
import Recorder from './utils/Recorder';

export default class AcquireAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analyser: null,
            recorder: null
        }
    }

    componentDidMount() {
        const { onStop, onStart, audioElement, audioBitsPerSecond, mimeType } = this.props;
        const options = {
            audioBitsPerSecond, mimeType
        }

        if (audioElement) {
            const analyser = Context.getAnalyser();
            Player.create(audioElement);
            this.setState({
                analyser
            });
        } else {
            const analyser = Context.getAnalyser();
            this.setState({
                analyser, recorder: new Recorder(onStart, onStop, options)
            });
        }
    }

    render() {
        const { record, onStop } = this.props;
        const { analyser, recorder } = this.state;

        record ?
            recorder ?
                recorder.startRecording() : ''
            : {
                if(recorder) {
                    recorder.stopRecording(onStop);
                    this.clear();
                }
            }
            
        return (
            <div>
                <audio id='player' controls></audio>
            </div>
        )
    }
}