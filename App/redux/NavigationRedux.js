import { NavigationActions } from 'react-navigation';
import { PrimaryNav } from '../navigation/RootNavigation';

const { navigate, reset } = NavigationActions;
const { getStateForAction, getPathAndParamsForState } = PrimaryNav.router;

const INITIAL_STATE = getStateForAction(
    NavigationActions.init()
);

const NOT_LOGGED_IN_STATE = getStateForAction(reset({
    index: 0,
    actions: [
        navigate({ routeName: 'LoginStack' })
    ]
}));

const LOGGED_IN_STATE = getStateForAction(
    navigate({routeName: 'VerifySMS'})
);

const MAIN_SCREEN_STATE = getStateForAction(reset({
    index: 0,
    actions: [
        navigate({ routeName: 'MainStack' })
    ]
}));

export function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_REHYDRATION_COMPLETE':
            return INITIAL_STATE;
        case 'LOGOUT':
            return NOT_LOGGED_IN_STATE;
        case 'LOGIN_SUCCESS':
            return LOGGED_IN_STATE;
        case 'VERIFICATION_SUCCESS':
            return MAIN_SCREEN_STATE;
        case 'AUTO_LOGIN':
            return MAIN_SCREEN_STATE;
        case 'BOOKING_CLOSE':
            return MAIN_SCREEN_STATE;
        case NavigationActions.BACK:
        case NavigationActions.INIT:
        case NavigationActions.NAVIGATE:
        case NavigationActions.RESET:
        case NavigationActions.SET_PARAMS:
        case NavigationActions.URI:
            const nextState = getStateForAction(action, state);

            // Return current state if the next route name is the same as the current
            if (nextState === null || getPathAndParamsForState(nextState).path === getPathAndParamsForState(state).path) {
                return state;
            }

            return nextState;

        default:
            return state;
    }
}
