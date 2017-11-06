import { STORE_SOCKET } from '../types/socketTypes';

const initialState = {
    socket: null
}

export const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SOCKET:
            return { ...state, socket: action.socket }
        default:
            return state;
    }
}