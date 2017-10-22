import { 
    AUDIO_CONTEXT_INIT, 
    INPUT_STREAM_VALUE, 
    GAIN_NODE_VALUES, 
    FILTER_NODE_VALUES, 
    ADD_NODE, 
    REMOVE_NODE, 
    ADD_NODE_TO_AVAILABLE_NODES, 
    REMOVE_NODE_FROM_AVAILABLE_NODES 
} from '../types/audioTypes';

const initialState = {
    audioContext: null,
    gainNode: {
        volume: 0
    },
    currentChain: [],
    filterNode: null,
    availableNodes: []
}

export const audioReducer = (state = initialState, action) => {
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
                gainNode: {
                    volume: action.gainNodeVolume
                }
            });
        case FILTER_NODE_VALUES:
            return Object.assign({}, state, {
                filterNode: action.filterNode
            });
        case ADD_NODE:
            return Object.assign({}, state, {
                currentChain: state.currentChain.concat(action.node)
            });
        case REMOVE_NODE:
            return Object.assign({}, state, {
                currentChain: state.currentChain.splice(state.currentChain.indexOf(action.node) - 1, 1)
            });
        case ADD_NODE_TO_AVAILABLE_NODES:
            return Object.assign({}, state, {
                availableNodes: state.availableNodes.concat(action.node)
            });
        case REMOVE_NODE_FROM_AVAILABLE_NODES:
            return Object.assign({}, state, {
                availableNodes: state.availableNodes.splice(action.availableNodesChain.indexOf(action.node) - 1, 1)
            });
        default:
            return state;
    }
}