import { ADD_PLAYER_CONTEXT, ADD_MERGED_AUDIO } from '../types/playerTypes';

export const addPlayerContext = (playerContext) => {
    return {
        type: ADD_PLAYER_CONTEXT,
        playerContext
    }
}

export const addMergedAudio = (mergedAudio) => {
    return {
        type: ADD_MERGED_AUDIO,
        mergedAudio
    }
}

export const addPlayerCreator = (playerContext) => {
    return dispatch => {
        dispatch(addPlayerContext(playerContext));
    }
}

export const mergedAudioCreator = (mergedAudio) => {
    return dispatch => {
        dispatch(addMergedAudio(mergedAudio));
    }
}