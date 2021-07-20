import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function device(state = initialState.device, action) {
    switch (action.type) {
        case types.device.GET: {
            let { imei, hasOrder, status, policyId } = action;
            return {...state, imei, hasOrder, status, policyId};
        }
        default:
            return state;
    }
}