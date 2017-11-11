import { 
    AUDIO_CONTEXT_INIT, 
    INPUT_STREAM_VALUE, 
    NODE_VALUE,
    ADD_NODE, 
    REMOVE_NODE, 
    ADD_NODE_TO_AVAILABLE_NODES, 
    REMOVE_NODE_FROM_AVAILABLE_NODES,
    ADD_COMPRESSOR,
    ADD_MASTER,
    STORE_ANALYSER_NODE
} from '../types/audioTypes';
import { prependArray } from '../../utils/prependArray';

const initialState = {
    audioContext: null,
    inputStream: null,
    analyserNode: null,
    currentChain: [],
    availableNodes: []
}

export const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUDIO_CONTEXT_INIT:
            return { ...state, audioContext: action.audioContext };
        case INPUT_STREAM_VALUE:
            return { ...state, inputStream: action.inputStream };
        case NODE_VALUE:
            let currentChain = state.currentChain;
            currentChain[action.nodeIndex].gain.value = action.nodeValue / 100;
            return { ...state, currentChain };
        case ADD_NODE:
            return { ...state, currentChain: prependArray(action.node, state.currentChain) };
        case REMOVE_NODE:
            return { ...state, currentChain: state.currentChain.filter((element, index) => index != state.currentChain.indexOf(action.node)) };
        case ADD_COMPRESSOR:
            return { ...state, currentChain: state.currentChain.concat(action.compressor) };
        case ADD_MASTER:
            return { ...state, currentChain: state.currentChain.concat(action.master) };
        case ADD_NODE_TO_AVAILABLE_NODES:
            return { ...state, availableNodes: state.availableNodes.concat(action.node) };
        case STORE_ANALYSER_NODE:
            return { ...state, analyserNode: action.analyserNode };
        case REMOVE_NODE_FROM_AVAILABLE_NODES:
            return { ...state, availableNodes: state.availableNodes.filter((element, index) => index != state.availableNodes.indexOf(action.node)) };
        default:
            return state;
    }
}