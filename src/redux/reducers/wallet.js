import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function wallet(state = initialState.wallet, action) {
    switch (action.type) {
        case types.wallet.UPDATE_ADDRESS: {
            return {...state, address: action.address};
        }
        default:
            return state;
    }
}