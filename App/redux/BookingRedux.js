import {createActions, createReducer} from "reduxsauce";
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    bookingInit: null,
    bookingRequest: ['query'],
    bookingSuccess: ['booking'],
    bookingFailure: ['error'],
    bookingClose: null,
    bookingListRequest: null,
    bookingListSuccess: ['bookingList'],
    bookingListFailure: ['error'],
});

export const BookingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    fetching: false,
    fetchingBookingList: false,
    error: null,
    booking: null,
    isBookingComplete: false,
    bookingList: [],
});

/* ------------- Reducers ------------- */
export const bookingInit = (state) => state.merge({isBookingComplete: false, booking: null});
export const bookingRequest = (state) => state.merge({ fetching: true, booking: null, isBookingComplete: false });
export const bookingSuccess = (state, { booking }) => state.merge({ fetching: false, booking, isBookingComplete: true });
export const bookingFailure = (state, { error }) => state.merge({ fetching: false });
export const bookingClose = (state) => state;
export const bookingListRequest = (state) => state.merge({ fetchingBookingList: true });
export const bookingListSuccess = (state, { bookingList }) => state.merge({ fetchingBookingList: false, bookingList });
export const bookingListFailure = (state, {error}) => state.merge({ fetchingBookingList: false, error });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.BOOKING_INIT]: bookingInit,
    [Types.BOOKING_REQUEST]: bookingRequest,
    [Types.BOOKING_SUCCESS]: bookingSuccess,
    [Types.BOOKING_FAILURE]: bookingFailure,
    [Types.BOOKING_CLOSE]: bookingClose,
    [Types.BOOKING_LIST_REQUEST]: bookingListRequest,
    [Types.BOOKING_LIST_SUCCESS]: bookingListSuccess,
    [Types.BOOKING_LIST_FAILURE]: bookingListFailure,
});

/* ------------- Selectors ------------- */
