import { AUDIO_CONTEXT_INIT, 
    INPUT_STREAM_VALUE, 
    NODE_VALUE,
    ADD_NODE, 
    REMOVE_NODE,
    ADD_NODE_TO_AVAILABLE_NODES,
    REMOVE_NODE_FROM_AVAILABLE_NODES,
    ADD_COMPRESSOR,
    ADD_MASTER
} from '../types/audioTypes';

export const initializeAudioContext = (audioContext) => {
    return {
        type: AUDIO_CONTEXT_INIT,
        audioContext
    }
}

export const storeInputStream = (inputStream) => {
    return {
        type: INPUT_STREAM_VALUE,
        inputStream
    }
}

export const storeNodeValue = (nodeIndex, nodeValue) => {
    return {
        type: NODE_VALUE,
        nodeIndex,
        nodeValue
    }
}

export const addNodeToChain = (node) => {
    return {
        type: ADD_NODE,
        node
    }
}

export const removeNodeFromChain = (node) => {
    return {
        type: REMOVE_NODE,
        node
    }
}

export const addCompressor = (compressor) => {
    return {
        type: ADD_COMPRESSOR,
        compressor
    }
}

export const addMaster = (master) => {
    return {
        type: ADD_MASTER,
        master
    }
}

export const addNodeToAvailables = (node) => {
    return {
        type: ADD_NODE_TO_AVAILABLE_NODES,
        node
    }
}

export const removeNodeFromAvailables = (availableNodes) => {
    return {
        type: ADD_NODE_TO_AVAILABLE_NODES,
        availableNodes
    }
}

export const initContextCreator = (audioContext) => {
    return dispatch => {
        dispatch(initializeAudioContext(audioContext));
    }
}

export const inputStreamCreator = (inputStream) => {
    return dispatch => {
        dispatch(storeInputStream(inputStream));
    }
}

export const nodeValueCreator = (nodeIndex, nodeValue) => {
    return dispatch => {
        dispatch(storeNodeValue(nodeIndex, nodeValue));
    }
}

export const addNodeCreator = (node) => {
    return dispatch => {
        dispatch(addNodeToChain(node));
    }
}

export const removeNodeCreator = (node) => {
    return dispatch => {
        dispatch(removeNodeFromChain(node));
    }
}

export const addCompressorCreator = (compressor) => {
    return dispatch => {
        dispatch(addCompressor(compressor));
    }
}

export const addMasterCreator = (master) => {
    return dispatch => {
        dispatch(addMaster(master));
    }
}

export const addNodeToAvailablesCreator = (node) => {
    return dispatch => {
        dispatch(addNodeToAvailables(node));
    }
}

export const removeNodeFromAvailablesCreator = (availableNodes) => {
    return dispatch => {
        dispatch(removeNodeFromAvailables(availableNodes));
    }
}