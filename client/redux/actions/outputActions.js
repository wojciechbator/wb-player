import { ADD_OUTPUT_CONTEXT, ADD_OUTPUT_NODE, REMOVE_OUTPUT_NODE, MERGED_AUDIO_CHANNELS } from '../types/outputTypes';

export const addOutputContext = (outputContext) => {
    return {
        type: ADD_OUTPUT_CONTEXT,
        outputContext
    }
}

export const outputContextCreator = (outputContext) => {
    return dispatch => {
        dispatch(addOutputContext(outputContext));
    }
}

export const addAudioToOutput = (audoNode) => {
    return {
        type: ADD_OUTPUT_NODE,
        audoNode
    }
}

export const addOutputAudioCreator = (audoNode) => {
    return dispatch => {
        dispatch(addAudioToOutput(audoNode));
    }
}

export const removeAudioToOutput = (audoNode) => {
    return {
        type: REMOVE_OUTPUT_NODE,
        audoNode
    }
}

export const removeOutputAudioCreator = (audoNode) => {
    return dispatch => {
        dispatch(removeAudioToOutput(audoNode));
    }
}

export const mergedAudioChannels = (mergedAudio) => {
    return {
        type: MERGED_AUDIO_CHANNELS,
        mergedAudio
    }
}

export const mergedAudioCreator = (mergedAudio) => {
    return dispatch => {
        dispatch(mergedAudioChannels(mergedAudio));
    }
}