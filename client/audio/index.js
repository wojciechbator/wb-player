import React, { Component } from 'react';

let BUFF_SIZE_RENDERER = 16384,
    audioInput = null,
    inputStream = null,
    gainNode = null,
    scriptProcessorNode = null,
    scriptProcessorAnalysisNode = null,
    analyserNode = null;

export default class Audio extends Component {
    constructor(props) {
        super(props);
        const state = {
            currentVolume: 0.5
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
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        inputStream = audioContext.createMediaStreamSource(stream);
        inputStream.connect(gainNode);
        scriptProcessorNode = audioContext.createScriptProcessor(BUFF_SIZE_RENDERER, 1, 1);
        scriptProcessorNode.onaudioprocess = this.processInputBuffer;
        inputStream.connect(scriptProcessorNode);
        scriptProcessorAnalysisNode = audioContext.createScriptProcessor(2048, 1, 1);
        scriptProcessorAnalysisNode.connect(gainNode);
        analyserNode = audioContext.createAnalyser();
        analyserNode.smoothingTimeConstant = 0;
        analyserNode.fftSize = 2048;
        inputStream.connect(analyserNode);
        analyserNode.connect(scriptProcessorAnalysisNode);
        const bufferLength = analyserNode.frequencyBinCount;
        const arrayFreqDomain = new Uint8Array(bufferLength);
        const arrayTimeDomain = new Uint8Array(bufferLength);


        scriptProcessorAnalysisNode.onaudioprocess = () => {

            analyserNode.getByteFrequencyData(arrayFreqDomain);
            analyserNode.getByteTimeDomainData(arrayTimeDomain);

            if (inputStream.playbackState == inputStream.PLAYING_STATE) {

                this.showSomeData(arrayFreqDomain, 5, "frequency");
                this.showSomeData(arrayTimeDomain, 5, "time");
            }
        };
        this.changeVolume();
    }

    changeVolume() {
        document.getElementById('volume').addEventListener('change', (event) => {
            const currentVolume = event.target.value;
            this.setState({ currentVolume });
            gainNode.gain.value = this.state.currentVolume;
        });
    }

    processInputBuffer(event) {
        let i, N, inp, inputOutputBuffer;
        inputOutputBuffer = event.inputBuffer.getChannelData(0);
    }

    showSomeData(givenTypedArray, numRowToDisplay, label) {
        const sizeBuffer = givenTypedArray.length;
        let index = 0;
        // console.log("__________ " + label);
        if (label === "time") {
            for (; index < numRowToDisplay && index < sizeBuffer; index += 1) {
                let currValueTime = (givenTypedArray[index] / 128) - 1.0;
                // console.log(currValueTime);
            }
        } else if (label === "frequency") {
            for (; index < numRowToDisplay && index < sizeBuffer; index += 1) {
                // console.log(givenTypedArray[index]);
            }
        } else {
            throw new Error("ERROR - must pass time or frequency");
        }
    }

    render() {
        return (
            <div>
                <p>Volume</p>
                <input id="volume" type="range" min="0" max="1" step="0.01" defaultValue="0.5" />
            </div>
        );
    }
}
