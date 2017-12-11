import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from "../sagas";

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
        appState: require('./AppStateRedux').reducer,
        navigation: require('./NavigationRedux').reducer,
        login: require('./LoginRedux').reducer,
        booking: require('./BookingRedux').reducer,
        expert: require('./ExpertRedux').reducer,
    });

    return configureStore(rootReducer, rootSaga);
}
