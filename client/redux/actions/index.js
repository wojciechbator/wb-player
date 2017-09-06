import { AUDIO_CONTEXT_INIT } from '../types';

export const initializeAudioContext = (audioContext) => {
    return {
        type: AUDIO_CONTEXT_INIT,
        audioContext
    }
}