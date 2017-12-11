import {createActions, createReducer} from "reduxsauce";
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    loginRequest: ['phoneNumber'],
    loginSuccess: ['phoneNumber'],
    loginFailure: ['error'],
    logout: null,
    autoLogin: ['user'],
    verificationRequest: ['phoneNumber', 'password'],
    verificationSuccess: ['token', 'user'],
    verificationFailure: ['error'],
    registerRequest: ['username', 'phoneNumber'],
    registerSuccess: null,
    registerFailure: ['error']
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    isLoggedIn: false,
    loading: false,
    error: null,
    phoneNumber: null,
    username: null,
    token: null,
    user: null,
});

/* ------------- Reducers ------------- */
// Login Requests
export const loginRequest = (state) => state.merge({ loading: true });

export const loginSucess = (state, { phoneNumber }) =>
    state.merge({ loading: false, error: null, phoneNumber });

export const loginFailure = (state, { error }) =>
    state.merge({ loading: false, error });

export const logout = (state) => INITIAL_STATE;

export const autoLogin = (state, {user}) => state.merge({ user });

// SMS Verification
export const verificationRequest = (state) => state.merge({ loading: true });

export const verificationSuccess = (state, { token, user }) =>
    state.merge({ loading: false, error: null, token, user, isLoggedIn: true });

export const verificationFailure = (state, { error }) =>
    state.merge({ loading: false, error });

// Register Requests
export const registerRequest = (state) => state.merge({ loading: true });

export const registerSuccess = (state) =>
    state.merge({ loading: false, error: null});

export const registerFailure = (state, { error }) =>
    state.merge({ loading: false, error });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSucess,
    [Types.LOGIN_FAILURE]: loginFailure,
    [Types.LOGOUT]: logout,
    [Types.AUTO_LOGIN]: autoLogin,
    [Types.VERIFICATION_REQUEST]: verificationRequest,
    [Types.VERIFICATION_SUCCESS]: verificationSuccess,
    [Types.VERIFICATION_FAILURE]: verificationFailure,
    [Types.REGISTER_REQUEST]: registerRequest,
    [Types.REGISTER_SUCCESS]: registerSuccess,
    [Types.REGISTER_FAILURE]: registerFailure,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.isLoggedIn;
export const getToken = (loginState) => loginState.token;