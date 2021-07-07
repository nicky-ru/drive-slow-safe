import * as types from '../constants/types';

export function isAdmin(_admin) {
    return {
        type: types.user.IS_ADMIN,
        _admin
    };
}

export function setPolicies(policies) {
    return {
        type: types.user.SET_POLICIES,
        policies,
    };
}

export function setPenalties(penalties) {
    return {
        type: types.user.SET_PENALTIES,
        penalties,
    };
}