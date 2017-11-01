import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REDIRECT_TO_LOGIN } from '../types/authenticationTypes';
import { push } from 'react-router-redux';

export const loginFailed = () => {
    return {
        type: LOGIN_FAILURE,
        isAuthenticated: false
    }
}

export const loginSuccess = (token, loggedUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loggedUser', loggedUser);
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        isAuthenticated: false
    }
}

export const loginRedirect = () => {
    return {
        type: REDIRECT_TO_LOGIN
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
        dispatch(push('/'));
    }
}

export const logoutCreator = () => {
    return dispatch => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}

export const loginRedirectCreator = () => {
    return dispatch => {
        dispatch(loginRedirect());
        dispatch(push('/login'));
    }
}