import Context from './Context';

let analyser, context, recorder, startTime, stream, mediaOptions, blob, handleOnStart, handleOnStop;
let chunks = [];

const constraints = { audio: true, video: false };

navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

export default class Recorder {
    constructor(onStart, onStop, options) {
        handleOnStart = onStart;
        handleOnStop = onStop;
        mediaOptions = options;
    }

    startRecording() {
        startTime = Date.now();

        if (recorder) {
            if (context && context.state === 'suspended') {
                context.resume();
            }

            if (recorder && recorder.state === 'paused') {
                recorder.resume();
                return;
            }

            if (context && recorder && recorder.state === 'inactive') {
                recorder.start(10);
                const source = context.createMediaStreamSource(stream);
                source.connect(analyser);
                handleOnStart && handleOnStart();
            }
        }
        else {
            if (navigator.mediaDevices) {
                console.log('User Media supported in this browser');
                navigator.mediaDevices.getUserMedia(constraints).then(theStream => {
                    stream = theStream;
                    handleOnStart && handleOnStart();
                    MediaRecorder.isTypeSupported(mediaOptions.mimeType) ? recorder = new MediaRecorder(stream, mediaOptions) : recorder = new MediaRecorder(stream);
                    recorder.onStop = this.onStop;
                    recorder.ondataavailable = (event) => {
                        chunks.push(event.data);
                    }

                    context = AudioContext.getAudioContext();
                    analyser = AudioContext.getAnalyser();

                    recorder.start(10);
                    const source = context.createMediaStreamSource(stream);
                    source.connect(analyser);
                });
            } else {
                alert('Audio recording is not supported in this browser');
            }
        }
    }

    stopRecording() {
        if (recorder && recorder.state !== 'inactive') {
            recorder.stop();
            context.suspend();
        }
    }

    onStop(event) {
        const blob = new Blob(chunks, { 'type': mediaOptions.mimeType });
        chunks = [];
        const blobObject = {
            blob, startTime, stopTime: Date.now(), options: mediaOptions, blobURL: window.URL.createObjectURL(blob)
        }

        handleOnStop && handleOnStop(blobObject);
    }
}