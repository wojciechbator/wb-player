export default class AudioStream {
    constructor() {
        play();
    }

    getLiveInput() {
        navigator.webkitGetUserMedia({ audio: true }, onStream, onStreamError);
    };

    play() {
        const contextClass = window.AudioContext;
        const context = new contextClass();
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.connect(gain);
        gain.connect(context.destination);
        source.play(0);
    }

    onStream(stream) {
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