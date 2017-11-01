import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SAVE_TOKEN } from '../types/authenticationTypes';

const initialState = {
    loggedUser: null,
    isAuthenticated: false,
    jwtToken: ''
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILURE:
            return { ...state, isAuthenticated: action.isAuthenticated };
        case LOGIN_SUCCESS:
            return { ...state, loggedUser: action.loggedUser, isAuthenticated: action.isAuthenticated };
        case LOGOUT:
            return { ...state, isAuthenticated: action.isAuthenticated };
        case SAVE_TOKEN:
            return { ...state, jwtToken: action.jwtToken };
        default:
            return state;
    }
} 