import {createActions, createReducer} from "reduxsauce";
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    topExpertsRequest: null,
    topExpertsSuccess: ['topExperts'],
    searchExpertsRequest: ['query'],
    searchExpertsSuccess: ['searchExperts'],
    expertRequest: ['id'],
    expertSuccess: ['expert'],
    packageRequest: ['id'],
    packageSuccess: ['expertPackage'],
});

export const ExpertTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    fetching: false,
    topExperts: null,
    searchExperts: null,
    expert: null,
    expertPackage: {},
});

/* ------------- Reducers ------------- */
// Login Requests
export const topExpertsRequest = (state) => state.merge({ fetching: true });
export const topExpertsSuccess = (state, { topExperts }) => state.merge({ fetching: false, topExperts});
export const searchExpertsRequest = (state) => state.merge({ fetching: true, searchExperts: null });
export const searchExpertsSuccess = (state, { searchExperts }) => state.merge({ fetching: false, searchExperts });
export const expertRequest = (state) => state.merge({ fetching: true, expert: null});
export const expertSuccess = (state, { expert }) => state.merge({ fetching: false, expert });
export const packageRequest = (state) => state.merge({ fetching: true, expertPackage: {}});
export const packageSuccess = (state, { expertPackage }) => state.merge({ fetching: false, expertPackage });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.TOP_EXPERTS_REQUEST]: topExpertsRequest,
    [Types.TOP_EXPERTS_SUCCESS]: topExpertsSuccess,
    [Types.SEARCH_EXPERTS_REQUEST]: searchExpertsRequest,
    [Types.SEARCH_EXPERTS_SUCCESS]: searchExpertsSuccess,
    [Types.EXPERT_REQUEST]: expertRequest,
    [Types.EXPERT_SUCCESS]: expertSuccess,
    [Types.PACKAGE_REQUEST]: packageRequest,
    [Types.PACKAGE_SUCCESS]: packageSuccess,
});

/* ------------- Selectors ------------- */
export const topExperts = (expertState) => expertState.topExperts;
