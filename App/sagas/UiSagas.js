import { call } from 'redux-saga/effects';
import { Alert } from 'react-native';

const showErrorAlert = function * showErrorAlert (action) {
    const { error } = action;
    yield call(Alert.alert, error.title, error.message, [{text: (error.button) ? error.button : 'OK'}]);
};

export default showErrorAlert;