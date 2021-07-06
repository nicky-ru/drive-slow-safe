import * as types from '../constants/types';

export function updateUser(address) {
    return {
        type: types.user.UPDATE,
        address
    };
}