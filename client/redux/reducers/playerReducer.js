import { ADD_PLAYER_CONTEXT, ADD_MERGED_AUDIO } from '../types/playerTypes';

const initialStore = {
    playerContext: null,
    mergedAudio: null
}

export const playerReducer = (state = initialStore, action) => {
    switch(action.type) {
        case ADD_PLAYER_CONTEXT:
            return Object.assign({}, state, { playerContext: action.playerContext });
        case ADD_MERGED_AUDIO:
            return Object.assign({}, state, { mergedAudio: action.mergedAudio });
        default:
            return state;
    }
}