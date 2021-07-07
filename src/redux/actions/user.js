import * as types from '../constants/types';

export function isAdmin(_admin) {
    return {
        type: types.user.IS_ADMIN,
        _admin
    };
}