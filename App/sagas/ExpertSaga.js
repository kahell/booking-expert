import { put, call } from 'redux-saga/effects';
import ExpertActions from '../redux/ExpertRedux';

export const topExpert = function * topExpert (api)
{
    const response = yield call(api.topExperts);

    if(response.ok)
    {
        yield put(ExpertActions.topExpertsSuccess(response.data));
    }
};

export const searchExperts = function * searchExperts (api, action)
{
    const response = yield call(api.searchExperts, action.query);
    if(response.ok)
    {
        yield put(ExpertActions.searchExpertsSuccess(response.data));
    }
};

export const getExpert = function * getExpert (api, action)
{
    const response = yield call(api.getExpert, action.id);

    if(response.ok)
    {
        yield put(ExpertActions.expertSuccess(response.data));
    }
};


export const getPackage = function * getPackage (api, action)
{
    const response = yield call(api.getPackage, action.id);

    if(response.ok)
    {
        yield put(ExpertActions.packageSuccess(response.data));
    }
};
