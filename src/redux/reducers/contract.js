import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function contract(state = initialState.contract, action) {
    switch (action.type) {
        case types.contract.UPDATE: {
            const { address, admin } = action;
            return {
                address: address,
                admin: admin
            };
        }
        default:
            return state;
    }
}