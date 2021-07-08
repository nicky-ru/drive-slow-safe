import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function policy(state = initialState.policy, action) {
    switch (action.type) {
        case types.policy.ADD: {
            let { policyId, policy } = action;
            let nextState = Object.assign({}, state);
            if (!nextState[policyId]) {
                nextState[policyId] = policy;
            }
            return nextState;
        }
        case types.policy.GET: {
            let { status, holderId, vehicleId, deviceId, premium, lockedFunds } = action;
            return {...state, status: status, holderId: holderId, vehicleId: vehicleId, deviceId: deviceId, premium: premium, lockedFunds: lockedFunds};
        }
        default:
            return state;
    }
}