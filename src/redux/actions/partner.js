import * as types from '../constants/types';

export function getPartner(name) {
    return {
        type: types.partner.GET,
        name,
    };
}