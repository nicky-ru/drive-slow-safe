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
        case types.wallet.UNLOCK: {
            return {...state, isLocked: false};
        }
        case types.wallet.LOCK: {
            return {...state, isLocked: true};
        }
        default:
            return state;
    }
}