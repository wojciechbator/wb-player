import { AUDIO_CONTEXT_INIT, INPUT_STREAM_VALUE, GAIN_NODE_VALUES, FILTER_NODE_VALUES, ADD_NODE, REMOVE_NODE } from '../types/audioTypes';

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

export const gainValuesCreator = (gainNode) => {
    return dispatch => {
        dispatch(storeGainNodeValues(gainNode));
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

export const removeNodeCreator = (node) => {
    return dispatch => {
        dispatch(removeNodeFromChain(node));
    }
}