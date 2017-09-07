import { AUDIO_CONTEXT_INIT, INPUT_STREAM_VALUE, GAIN_NODE_VALUES, FILTER_NODE_VALUES, ADD_NODE, REMOVE_NODE } from '../types/audioTypes';

const initialState = {
    audioContext: null,
    gainNode: {
        volume: 0
    },
    currentChain: [],
    filterNode: null
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUDIO_CONTEXT_INIT:
            return Object.assign({}, state, {
                audioContext: action.audioContext
            });
        case INPUT_STREAM_VALUE:
            return Object.assign({}, state, {
                inputStream: action.inputStream
            });
        case GAIN_NODE_VALUES:
            return Object.assign({}, state, {
                gainNode: action.gainNode
            });
        case GAIN_NODE_VALUES:
            return Object.assign({}, state, {
                filterNode: action.filterNode
            });
        case ADD_NODE:
            return Object.assign({}, state, {
                currentChain: state.currentChain.concat(action.node)
            });
        case REMOVE_NODE:
            return Object.assign({}, state, {
                currentChain: state.currentChain.splice(action.currentChain.indexOf(action.node), 1)
            });
        default:
            return state;
    }
}

export default audioReducer;