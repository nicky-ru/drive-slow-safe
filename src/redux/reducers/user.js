import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.user.IS_ADMIN: {
            return {...state, isAdmin: action._admin};
        }
        case types.user.SET_POLICIES: {
            return {...state, policies: action.policies};
        }
        case types.user.SET_PENALTIES: {
            return {...state, penalties: action.penalties};
        }
        default:
            return state;
    }
}