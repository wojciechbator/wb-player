export default class AudioStream {
    constructor() {
        const contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext);
        if (contextClass)
            const context = new contextClass();
        else
            throw new Error('Web Audio API is not available, please use supported browser');

        const source = context.createBufferSource();
        const gain = context.createGain();
        source.connect(gain);
        gain.connect(context.destination);
    }
}