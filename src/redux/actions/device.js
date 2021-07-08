import * as types from '../constants/types';

export function getDevice(imei, hasOrder, status, policyId) {
    return {
        type: types.device.GET,
        imei,
        hasOrder,
        status,
        policyId,
    }
}