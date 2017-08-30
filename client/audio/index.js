import React, { Component } from 'react';

export default class Audio extends Component {
    constructor(props) {
        super(props);
        const state = {
            BUFF_SIZE_RENDERER: 16384,
            audioInput: null,
            inputStream: null,
            gainNode: null,
            scriptProcessorNode: null,
            scriptProcessorAnalysisNode: null,
            analyserNode: null
        }
        this.captureAudio();
    }

    captureAudio() {
        const audioContext = new AudioContext();
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {

            navigator.getUserMedia({ audio: true },
                (stream) => {
                    this.startInput(audioContext, stream);
                },
                (error) => {
                    alert('Error capturing audio.');
                }
            );

        } else { alert('getUserMedia not supported in this browser.'); }
    }

    startInput(audioContext, stream) {
        // Improve this mess ffs
        this.setState({ gainNode: audioContext.createGain() });
        this.state.gainNode.connect(audioContext.destination);
        this.setState({ inputStream: audioContext.createMediaStreamSource(stream) });
        this.state.inputStream.connect(this.state.gainNode);
        this.setState({ scriptProcessorNode: audioContext.createScriptProcessor(this.state.BUFF_SIZE_RENDERER, 1, 1) })
        this.state.scriptProcessorNode.onaudioprocess = this.processInputBuffer;
        this.state.inputStream.connect(this.state.scriptProcessorNode);
        this.setState({ scriptProcessorAnalysisNode: audioContext.createScriptProcessor(2048, 1, 1) });
        this.state.scriptProcessorAnalysisNode.connect(this.state.gainNode);
        this.setState({ analyserNode: audioContext.createAnalyser() });
        this.state.analyserNode.smoothingTimeConstant = 0;
        this.state.analyserNode.fftSize = 2048;
        this.state.inputStream.connect(this.state.analyserNode);
        this.state.analyserNode.connect(this.state.scriptProcessorAnalysisNode);
        const bufferLength = this.state.analyserNode.frequencyBinCount;
        const arrayFreqDomain = new Uint8Array(bufferLength);
        const arrayTimeDomain = new Uint8Array(bufferLength);

        console.log("bufferLength " + bufferLength);

        this.state.scriptProcessorAnalysisNode.onaudioprocess = () => {

            this.state.analyserNode.getByteFrequencyData(arrayFreqDomain);
            this.state.analyserNode.getByteTimeDomainData(arrayTimeDomain);

            if (this.state.inputStream.playbackState == this.state.inputStream.PLAYING_STATE) {

                this.showSomeData(arrayFreqDomain, 5, "frequency");
                this.showSomeData(arrayTimeDomain, 5, "time");
            }
        };
    }

    processInputBuffer(event) {
        let i, N, inp, inputOutputBuffer;
        inputOutputBuffer = event.inputBuffer.getChannelData(0);
    }

    changeVolume(event) {
        const currVolume = event.target.value;
        this.setState({ gainNode: { gain: { value: currVolume } } });
        console.log("currVolume ", currVolume);
    }

    showSomeData(givenTypedArray, numRowToDisplay, label) {

        const sizeBuffer = givenTypedArray.length;
        let index = 0;
        console.log("__________ " + label);
        if (label === "time") {
            for (; index < numRowToDisplay && index < sizeBuffer; index += 1) {

                let currValueTime = (givenTypedArray[index] / 128) - 1.0;
                console.log(currValueTime);
            }
        } else if (label === "frequency") {
            for (; index < numRowToDisplay && index < sizeBuffer; index += 1) {

                console.log(givenTypedArray[index]);
            }
        } else {
            throw new Error("ERROR - must pass time or frequency");
        }
    }

    render() {
        return (
            <div>
                <p>Volume</p>
                <input id="volume" type="range" min="0" max="1" step="0.1" value="0.5" onChange={this.changeVolume} />
            </div>
        );
    }
}
