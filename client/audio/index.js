let context;
window.addEventListener('load', init, false);

const init = () => {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}

export default class AudioStream {
    constructor() {
        init();
        this.getLiveInput();
    }

    getLiveInput() {
        navigator.webkitGetUserMedia({ audio: true }, this.onStream, this.onStreamError);
    };

    onStream(stream) {
        const input = context.createMediaStreamSource(stream);
        let filter = context.createBiquadFilter();
        filter.frequency.value = 50.0;
        filter.Q.value = 10.0;
        const analyser = context.createAnalyser();
        input.connect(filter);
        filter.connect(analyser);
    }

    onStreamError(error) {
        throw new Error(error);
    }
}