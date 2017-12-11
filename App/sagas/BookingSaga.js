import { put, call } from 'redux-saga/effects';
import BookingActions from '../redux/BookingRedux';
import ErrorBuilder from "../lib/ErrorBuilder";

export const postBooking = function * postBooking (api, action)
{
    const response = yield call(api.booking, action.query);

    if(response.ok)
    {
        yield put(BookingActions.bookingSuccess(response.data));
        yield put(BookingActions.bookingListRequest());
    }
    else
    {
        yield put(BookingActions.bookingFailure(ErrorBuilder(response)));
    }
};

export const getBookingList = function * getBookingList (api)
{
    const response = yield call(api.bookingList);
    console.log(response);
    if(response.ok)
    {
        yield put(BookingActions.bookingListSuccess(response.data));
    }
    else
    {
        yield put(BookingActions.bookingListFailure(response.data));
    }
};
