import * as types from '../constants/types';

export function updateContract(address, admin) {
    return {
        type: types.contract.UPDATE,
        address,
        admin
    };
}