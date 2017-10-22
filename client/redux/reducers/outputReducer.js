import { ADD_OUTPUT_CONTEXT, MERGED_AUDIO_CHANNELS, ADD_OUTPUT_NODE, REMOVE_OUTPUT_NODE } from '../types/outputTypes';
import { prependArray } from '../../utils/prependArray';

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
            return Object.assign({}, state, { audioChain: prependArray(action.audioNode, state.currentChain) });
        case REMOVE_OUTPUT_NODE:
            return Object.assign({}, state, { audioChain: state.audioChain.filter((element, index) => index != state.currentChain.indexOf(action.node))});
        default:
            return state;
    }
}