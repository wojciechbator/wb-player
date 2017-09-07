import { initializeAudioContext, storeInputStream, storeGainNodeValues, storeFilterNodeValues, addNodeToChain, removeNodeFromChain } from '../actions/audioActions';

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