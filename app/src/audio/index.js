export default class AudioStream {
    constructor() {
        const contextClass = window.AudioContext;
        const context = new contextClass();
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.connect(gain);
        gain.connect(context.destination);
    }
}