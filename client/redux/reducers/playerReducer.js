import { ADD_PLAYER_CONTEXT } from '../types/playerTypes';

const initialStore = {
    playerContext: null
}

export const playerReducer = (state = initialStore, action) => {
    switch(action.type) {
        case ADD_PLAYER_CONTEXT:
            return Object.assign({}, state, { playerContext: action.playerContext });
        default:
            return state;
    }
}