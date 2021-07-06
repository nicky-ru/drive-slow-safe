import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.user.UPDATE: {
            const { address } = action;
            let nextState = { address };

            return nextState;
        }
        default:
            return state;
    }
}