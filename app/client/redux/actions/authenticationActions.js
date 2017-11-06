import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REDIRECT_TO_LOGIN, REDIRECT_TO_REGISTER } from '../types/authenticationTypes';
import { push } from 'react-router-redux';

const loginFailed = () => {
    return {
        type: LOGIN_FAILURE,
        isAuthenticated: false
    }
}

const loginSuccess = (token, loggedUser) => {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true
    }
}

const logout = () => {
    localStorage.clear();
    return {
        type: LOGOUT,
        isAuthenticated: false
    }
}

const loginRedirect = () => {
    return {
        type: REDIRECT_TO_LOGIN
    }
}

const registerRedirect = () => {
    return {
        type: REDIRECT_TO_REGISTER
    }
}

export const loginFailedCreator = () => {
    return dispatch => {
        dispatch(loginFailed());
    }
}

export const loginSuccessCreator = (token, loggedUser) => {
    return dispatch => {
        dispatch(loginSuccess(token, loggedUser));
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

export const registerRedirectCreator = () => {
    return dispatch => {
        dispatch(registerRedirect());
        dispatch(push('/register'));
    }
}