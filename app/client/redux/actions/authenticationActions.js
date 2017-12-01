import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REDIRECT_TO_LOGIN, REDIRECT_TO_REGISTER } from '../types/authenticationTypes';
import { push } from 'react-router-redux';

const loginFailed = () => {
    return {
        type: LOGIN_FAILURE,
        isAuthenticated: false
    };
};

const loginSuccess = (token, loggedUser) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('loggedUser', loggedUser);
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true
    }
}

const logout = () => {
    return {
        type: LOGOUT,
        isAuthenticated: false
    };
};

const loginRedirect = () => {
    return {
        type: REDIRECT_TO_LOGIN
    };
};

const registerRedirect = () => {
    return {
        type: REDIRECT_TO_REGISTER
    };
};

export const loginFailedCreator = () => dispatch => dispatch(loginFailed());

export const loginSuccessCreator = (token, loggedUser) => dispatch => {
    dispatch(loginSuccess(token, loggedUser));
    dispatch(push('/'));
};

export const logoutCreator = () => dispatch => {
    dispatch(logout());
    dispatch(push('/login'));
};

export const loginRedirectCreator = () => dispatch => {
    dispatch(loginRedirect());
    dispatch(push('/login'));
};

export const registerRedirectCreator = () => dispatch => {
    dispatch(registerRedirect());
    dispatch(push('/register'));
};
