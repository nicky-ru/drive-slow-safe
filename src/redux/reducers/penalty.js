import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function penalty(state = initialState.penalty, action) {
    switch (action.type) {
        case types.penalty.ADD: {
            let { penaltyId, penalty } = action;
            let nextState = Object.assign({}, state);
            if (!nextState[penaltyId]) {
                nextState[penaltyId] = penalty;
            }
            return nextState;
        }
        default:
            return state;
    }
}