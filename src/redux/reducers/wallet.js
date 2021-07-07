import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function wallet(state = initialState.wallet, action) {
    switch (action.type) {
        case types.wallet.CONNECT: {
            let nextState = Object.assign({}, state);
            nextState.isConnected = true;
            return nextState;
        }
        case types.wallet.UPDATE_ADDRESS: {
            let { address } = action;
            let nextState = Object.assign({}, state);
            nextState.address = address;
            return nextState;
        }
        case types.wallet.UPDATE_CHAIN: {
            let { _chainId } = action;
            let nextState = Object.assign({}, state);
            nextState.chainId = _chainId;
            return nextState;
        }
        default:
            return state;
    }
}