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
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                const input = context.createMediaStreamSource(stream);
                let filter = context.createBiquadFilter();
                filter.frequency.value = 50.0;
                filter.Q.value = 10.0;
                const analyser = context.createAnalyser();
                input.connect(filter);
                filter.connect(analyser);
                analyser.connect(context.destination);
            }).catch(error => { throw new Error(error) });
        }
        else {
            throw new Error('getUserMedia is not supported in this browser');
        }
    };
}