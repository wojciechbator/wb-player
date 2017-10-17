import { ADD_PLAYER_CONTEXT } from '../types/playerTypes';

export const addPlayerContext = (playerContext) => {
    return {
        type: ADD_PLAYER_CONTEXT,
        playerContext
    }
}

export const addPlayerCreator = (playerContext) => {
    return dispatch => {
        dispatch(addPlayerContext(playerContext));
    }
}