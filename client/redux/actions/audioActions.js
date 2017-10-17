import { AUDIO_CONTEXT_INIT, 
    INPUT_STREAM_VALUE, 
    DISTORTION_VALUES, 
    GAIN_NODE_VALUES, 
    FILTER_NODE_VALUES, 
    ADD_NODE, 
    REMOVE_NODE,
    ADD_NODE_TO_AVAILABLE_NODES,
    REMOVE_NODE_FROM_AVAILABLE_NODES 
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

export const storeGainNodeValues = (gainNodeVolume) => {
    return {
        type: GAIN_NODE_VALUES,
        gainNodeVolume
    }
}

export const storeDistortionValues = (distortionNode) => {
    return {
        type: GAIN_NODE_VALUES,
        distortionNode
    }
}

export const storeFilterNodeValues = (filterNode) => {
    return {
        type: FILTER_NODE_VALUES,
        filterNode
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

export const gainValuesCreator = (gainNodeVolume) => {
    return dispatch => {
        dispatch(storeGainNodeValues(gainNodeVolume));
    }
}

export const filterValuesCreator = (filterNode) => {
    return dispatch => {
        dispatch(storeFilterNodeValues(filterNode));
    }
}

export const addNodeCreator = (node) => {
    return dispatch => {
        dispatch(addNodeToChain(node));
    }
}

export const removeNodeCreator = (node, audioChain) => {
    return dispatch => {
        dispatch(removeNodeFromChain(node, audioChain));
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