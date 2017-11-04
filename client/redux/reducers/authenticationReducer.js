import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REDIRECT_TO_LOGIN } from '../types/authenticationTypes';

const initialState = {
    isAuthenticated: false
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILURE:
            return { ...state, isAuthenticated: action.isAuthenticated };
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: action.isAuthenticated };
        case LOGOUT:
            return { ...state, isAuthenticated: action.isAuthenticated };
        case REDIRECT_TO_LOGIN:
            return { ...state };
        default:
            return state;
    }
} 