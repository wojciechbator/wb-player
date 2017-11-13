export const nodeMapper = (nodeName) => {
    switch (nodeName) {
        case 'lowpass', 'bandpass', 'highpass':
            return null;
        case 'GainNode':
            return null;
        case 'WaveShaperNode':
            return null;
        case 'DelayNode':
            return null;
        default:
            return null;
    }
}