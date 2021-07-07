import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.user.IS_ADMIN: {
            return {...state, isAdmin: action._admin};
        }
        default:
            return state;
    }
}