import * as types from '../constants/types';

export function updateAccount(address) {
    return {
        type: types.wallet.UPDATE_ADDRESS,
        address
    };
}