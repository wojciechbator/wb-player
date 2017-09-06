import { AUDIO_CONTEXT_INIT, GAIN_NODE_VALUES, FILTER_NODE_VALUES } from '../types/audioTypes';

export const initializeAudioContext = (audioContext) => {
    return {
        type: AUDIO_CONTEXT_INIT,
        audioContext
    }
}

export const storeGainNodeValues = (gainNode) => {
    return {
        type: GAIN_NODE_VALUES,
        gainNode
    }
}

export const storeFilterNodeValues = (filterNode) => {
    return {
        type: FILTER_NODE_VALUES,
        filterNode
    }
}