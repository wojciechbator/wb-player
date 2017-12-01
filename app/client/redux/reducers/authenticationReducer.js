import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REDIRECT_TO_LOGIN, REDIRECT_TO_REGISTER } from '../types/authenticationTypes';

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
            return initialState;
        case REDIRECT_TO_LOGIN:
            return { ...state };
        case REDIRECT_TO_REGISTER:
            return { ...state };
        default:
            return state;
    };
};