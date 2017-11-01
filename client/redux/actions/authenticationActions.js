import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SAVE_TOKEN } from '../types/authenticationTypes';

export const loginFailed = () => {
    return {
        type: LOGIN_FAILURE,
        isAuthenticated: false
    }
}

export const loginSuccess = (loggedUser) => {
    return {
        type: LOGIN_SUCCESS,
        loggedUser,
        isAuthenticated: true
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        isAuthenticated: false
    }
}

export const saveToken = (jwtToken) => {
    return {
        type: SAVE_TOKEN,
        jwtToken
    }
}

export const loginFailedCreator = () => {
    return dispatch => {
        dispatch(loginFailed());
    }
}

export const loginSuccessCreator = (loggedUser) => {
    return dispatch => {
        dispatch(loginSuccess(loggedUser));
    }
}

export const logoutCreator = () => {
    return dispatch => {
        dispatch(logout());
    }
}

export const saveTokenCreator = (jwtToken) => {
    return dispatch => {
        dispatch(saveToken(jwtToken));
    }
}