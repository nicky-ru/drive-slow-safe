import * as types from '../constants/types';

export function updateAccount(address) {
    return {
        type: types.wallet.UPDATE_ADDRESS,
        address
    };
}

export function updateChain(chainId) {
    return {
        type: types.wallet.UPDATE_CHAIN,
        chainId
    };
}

export function connect() {
    return {
        type: types.wallet.CONNECT
    };
}