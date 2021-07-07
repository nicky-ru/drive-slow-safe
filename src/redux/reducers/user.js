import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.user.IS_ADMIN: {
            let { _admin } = action;
            return  Object.assign({}, state.user, {isAdmin: _admin});
        }
        default:
            return state;
    }
}