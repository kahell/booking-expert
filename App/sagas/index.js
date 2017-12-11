import { takeLatest, all } from 'redux-saga/effects';
import DebugConfig from '../config/DebugConfig';

/* ------------- Types ------------- */
import { StartupTypes } from '../redux/StartupRedux';
import { LoginTypes } from "../redux/LoginRedux";
import { ExpertTypes } from "../redux/ExpertRedux";
import { BookingTypes } from "../redux/BookingRedux";

/* ------------- Sagas ------------- */
import startup from "./StartupSagas";
import { login, verify, register } from "./LoginSagas";
import showErrorAlert from "./UiSagas";
import {getExpert, searchExperts, topExpert, getPackage } from "./ExpertSaga";
import {getBookingList, postBooking} from "./BookingSaga";

/* ------------- API ------------- */
import API from '../services/Api';
import FixtureAPI from '../services/FixtureApi';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

const rootSaga = function * root () {
    yield all([
        takeLatest(StartupTypes.STARTUP, startup, api),

        takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
        takeLatest(LoginTypes.LOGIN_FAILURE, showErrorAlert),

        takeLatest(LoginTypes.VERIFICATION_REQUEST, verify, api),
        takeLatest(LoginTypes.VERIFICATION_FAILURE, showErrorAlert),

        takeLatest(LoginTypes.REGISTER_REQUEST, register, api),
        takeLatest(LoginTypes.REGISTER_FAILURE, showErrorAlert),

        takeLatest(ExpertTypes.TOP_EXPERTS_REQUEST, topExpert, api),
        takeLatest(ExpertTypes.SEARCH_EXPERTS_REQUEST, searchExperts, api),
        takeLatest(ExpertTypes.EXPERT_REQUEST, getExpert, api),
        takeLatest(ExpertTypes.PACKAGE_REQUEST, getPackage, api),

        takeLatest(BookingTypes.BOOKING_REQUEST, postBooking, api),
        takeLatest(BookingTypes.BOOKING_FAILURE, showErrorAlert),

        takeLatest(BookingTypes.BOOKING_LIST_REQUEST, getBookingList, api),
    ]);
};

export default rootSaga;
