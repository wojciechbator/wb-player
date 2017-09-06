import { AUDIO_CONTEXT_INIT, GAIN_NODE_VALUES, FILTER_NODE_VALUES } from '../types/audioTypes';

const initialState = {
    audioContext: null
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUDIO_CONTEXT_INIT:
            return Object.assign({}, state, {
                audioContext: action.audioContext
            });
        case GAIN_NODE_VALUES:
            return Object.assign({}, state, {
                gainNode: action.gainNode
            });
        case GAIN_NODE_VALUES:
            return Object.assign({}, state, {
                filterNode: action.filterNode
            });
        default:
            return state;
    }
}

export default audioReducer;