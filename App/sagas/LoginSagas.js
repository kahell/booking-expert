import { put, call } from 'redux-saga/effects';
import LoginActions from '../redux/LoginRedux';
import ErrorBuilder from "../lib/ErrorBuilder";


// attempts to login
export const login = function * login (api, action)
{
    const response = yield call(api.login, action.phoneNumber);
    console.log(response);
    
    if(response.ok)
    {
      yield put(LoginActions.loginSuccess(action.phoneNumber));
    }
    else
    {
      yield put(LoginActions.loginFailure(ErrorBuilder(response)));
    }
};

export const verify = function * verify (api, action)
{
    const { phoneNumber, password } = action;
    const response = yield call(api.verify, phoneNumber, password);

    if(response.ok)
    {
        yield call(api.setToken, response.data.token);
        yield put(LoginActions.verificationSuccess(response.data.token, response.data.user));
    }
    else
    {
        yield put(LoginActions.verificationFailure(ErrorBuilder(response)));
    }

};

export const register = function * register (api, action)
{
    const { phoneNumber, username } = action;
    const response = yield call(api.register, username, phoneNumber);

    if(response.ok)
    {
        yield put(LoginActions.loginRequest(phoneNumber));
    }
    else
    {
        yield put(LoginActions.registerFailure(ErrorBuilder(response)));
    }

};
