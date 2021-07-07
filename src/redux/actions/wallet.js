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

export function lock() {
    return {
        type: types.wallet.LOCK
    };
}

export function unlock() {
    return {
        type: types.wallet.UNLOCK
    };
}