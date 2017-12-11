import { put, select, call } from 'redux-saga/effects';
import LoggedInActions, {getToken, isLoggedIn} from "../redux/LoginRedux";
import AppStateActions from "../redux/AppStateRedux";
import { Asset, Font } from 'expo';
import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';
import { Ionicons, SimpleLineIcons, EvilIcons } from '@expo/vector-icons';

const selectLoggedInStatus = (state) => isLoggedIn(state.login);
const selectGetToken = (state) => getToken(state.login);

// process STARTUP actions
const startup = function * startup (api, action) {
    const isLoggedIn = yield select(selectLoggedInStatus);
    yield call(loadAssetsAsync);
    yield put(AppStateActions.setRehydrationComplete());
    if (isLoggedIn) {
        const token = yield select(selectGetToken);
        yield call(api.setToken, token);
        const response = yield call(api.me);
        if(response.ok) {
            yield put(LoggedInActions.autoLogin(response.data));
        }
        else {
            yield put(LoggedInActions.logout());
        }
    }
    else {
        yield put(LoggedInActions.logout());
    }
};

const loadAssetsAsync = async () => {
    try {
        await Promise.all([
            Asset.loadAsync([
                background,
                logo,
            ]),
            Font.loadAsync([
                Ionicons.font,
                EvilIcons.font,
                SimpleLineIcons.font,
                { 'Roboto': require('../assets/fonts/Roboto-Regular.ttf') },
                { 'Raleway': require('../assets/fonts/Raleway-Medium.ttf') },
                { 'Couture': require('../assets/fonts/Couture-Bold.ttf') },
                {'Rubik-Black': require('../../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf')},
                {'Rubik-BlackItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf')},
                {'Rubik-Bold': require('../../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf')},
                {'Rubik-BoldItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf')},
                {'Rubik-Italic': require('../../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf')},
                {'Rubik-Light': require('../../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf')},
                {'Rubik-LightItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf')},
                {'Rubik-Medium': require('../../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf')},
                {'Rubik-MediumItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf')},
                {'Rubik-Regular': require('../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf')},
                {'rubicon-icon-font': require('../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')},
            ]),
        ]);
    } catch (e) {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(
            'There was an error caching assets (see: App.js), perhaps due to a ' +
            'network timeout, so we skipped caching. Reload the app to try again.'
        );
        console.log(e);
    }
};

export default startup;
