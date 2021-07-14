import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function wallet(state = initialState.wallet, action) {
    switch (action.type) {
        case types.wallet.CONNECT: {
            return {...state, isConnected: true};
        }
        case types.wallet.UPDATE_ADDRESS: {
            return {...state, address: action.address};
        }
        case types.wallet.UPDATE_CHAIN: {
            return {...state, chainId: action.chainId};
        }
        default:
            return state;
    }
}