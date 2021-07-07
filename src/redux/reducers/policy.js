import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function policy(state = initialState.policy, action) {
    switch (action.type) {
        case types.policy.ADD: {
            let { policyId, policy } = action;
            let nextState = Object.assign({}, state);
            nextState[policyId] = policy;
            return nextState;
        }
        default:
            return state;
    }
}