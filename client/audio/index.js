let context = null;

export default class AudioStream {
    constructor() {
        context = window.AudioContext || window.webkitAudioContext;
        this.getLiveInput();
    }

    getLiveInput() {
        navigator.webkitGetUserMedia({ audio: true }, this.onStream, this.onStreamError);
    };

    onStream(stream) {
        console.log(context);
        const input = context.createMediaStreamSource(stream);
        const filter = context.createBiquadFilter();
        filter.frequency.value = 50.0;
        filter.type = filter.NOTCH;
        filter.Q = 10.0;
        const analyser = context.createAnalyser();
        input.connect(filter);
        filter.connect(analyser);
    }

    onStreamError(error) {
        throw new Error(error);
    }
}