import { ADD_OUTPUT_CONTEXT, MERGED_AUDIO_CHANNELS, ADD_OUTPUT_NODE, REMOVE_OUTPUT_NODE } from '../types/outputTypes';

const initialStore = {
    outputContext: new (window.AudioContext || window.webkitAudioContext),
    mergedAudio: null,
    audioChain: []
}

export const outputReducer = (state = initialStore, action) => {
    switch(action.type) {
        case MERGED_AUDIO_CHANNELS:
            return Object.assign({}, state, { mergedAudio: action.mergedAudio });
        case ADD_OUTPUT_NODE:
            return Object.assign({}, state, { audioChain: state.audioChain.concat(action.audoNode) });
        case REMOVE_OUTPUT_NODE:
            return Object.assign({}, state, { audioChain: state.audioChain.splice(state.audioChain.indexOf(action.audoNode) - 1, 1)});
        default:
            return state;
    }
}