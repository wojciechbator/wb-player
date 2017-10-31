import { 
    AUDIO_CONTEXT_INIT, 
    INPUT_STREAM_VALUE, 
    NODE_VALUE,
    ADD_NODE, 
    REMOVE_NODE, 
    ADD_NODE_TO_AVAILABLE_NODES, 
    REMOVE_NODE_FROM_AVAILABLE_NODES,
    ADD_COMPRESSOR,
    ADD_MASTER
} from '../types/audioTypes';
import { prependArray } from '../../utils/prependArray';

const initialState = {
    audioContext: null,
    inputStream: null,
    currentChain: [],
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
        case NODE_VALUE:
            return Object.assign({}, state, {
                currentChain: {
                    [action.nodeIndex]: {
                        gain: {
                            value: action.nodeValue
                        }
                    }
                }
            });
        case ADD_NODE:
            return Object.assign({}, state, {
                currentChain: prependArray(action.node, state.currentChain)
            });
        case REMOVE_NODE:
            return Object.assign({}, state, {
                currentChain: state.currentChain.filter((element, index) => index != state.currentChain.indexOf(action.node))
            });
        case ADD_COMPRESSOR:
            return Object.assign({}, state, {
                currentChain: state.currentChain.concat(action.compressor)
            });
        case ADD_MASTER:
            return Object.assign({}, state, {
                currentChain: state.currentChain.concat(action.master)
            });
        case ADD_NODE_TO_AVAILABLE_NODES:
            return Object.assign({}, state, {
                availableNodes: state.availableNodes.concat(action.node)
            });
        case REMOVE_NODE_FROM_AVAILABLE_NODES:
            return Object.assign({}, state, {
                availableNodes: state.availableNodes.filter((element, index) => index != state.availableNodes.indexOf(action.node))
            });
        default:
            return state;
    }
}