const AUDIO_CONTEXT_INIT = 'AUDIO_CONTEXT_INIT';

export const initializeAudioContext = () => {
    return {
        type: AUDIO_CONTEXT_INIT,
        audioContext: new AudioContext()
    }
}