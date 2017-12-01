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
    STORE_ANALYSER_NODE,
    CLEAR_CHAIN
} from '../types/audioTypes';

const initializeAudioContext = audioContext => {
    return {
        type: AUDIO_CONTEXT_INIT,
        audioContext
    };
};

const storeInputStream = inputStream => {
    return {
        type: INPUT_STREAM_VALUE,
        inputStream
    };
};

const clearCurrentChain = () => {
    return {
        type: CLEAR_CHAIN
    };
};

const addAnalyserNode = analyserNode => {
    return {
        type: STORE_ANALYSER_NODE,
        analyserNode
    };
};

const storeNodeValue = (nodeIndex, node, nodeValue) => {
    return {
        type: NODE_VALUE,
        nodeIndex,
        node,
        nodeValue
    };
};

const addNodeToChain = node => {
    return {
        type: ADD_NODE,
        node
    };
};

const removeNodeFromChain = nodeIndex => {
    return {
        type: REMOVE_NODE,
        nodeIndex
    };
};

const addCompressor = compressor => {
    return {
        type: ADD_COMPRESSOR,
        compressor
    };
};

const addMaster = master => {
    return {
        type: ADD_MASTER,
        master
    };
};

const addNodeToAvailables = node => {
    return {
        type: ADD_NODE_TO_AVAILABLE_NODES,
        node
    };
};

const removeNodeFromAvailables = availableNodes => {
    return {
        type: ADD_NODE_TO_AVAILABLE_NODES,
        availableNodes
    };
}

export const initContextCreator = audioContext => dispatch => dispatch(initializeAudioContext(audioContext));

export const inputStreamCreator = inputStream => dispatch => dispatch(storeInputStream(inputStream));

export const clearChainCreator = () => dispatch => dispatch(clearCurrentChain());

export const nodeValueCreator = (nodeIndex, node, nodeValue) => dispatch => dispatch(storeNodeValue(nodeIndex, node, nodeValue));

export const addNodeCreator = node => dispatch => dispatch(addNodeToChain(node));

export const removeNodeCreator = nodeIndex => dispatch => dispatch(removeNodeFromChain(nodeIndex));

export const addCompressorCreator = compressor => dispatch => dispatch(addCompressor(compressor));

export const addMasterCreator = master => dispatch => dispatch(addMaster(master));

export const addNodeToAvailablesCreator = node => dispatch => dispatch(addNodeToAvailables(node));

export const removeNodeFromAvailablesCreator = availableNodes => dispatch => dispatch(removeNodeFromAvailables(availableNodes));

export const addAnalyserNodeCreator = analyserNode => dispatch => dispatch(addAnalyserNode(analyserNode));