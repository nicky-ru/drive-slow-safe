import * as types from '../constants/types';

export function addPolicy(policyId, policy) {
    return {
        type: types.policy.ADD,
        policyId,
        policy
    };
}

export function getPolicy(status, holderId, vehicleId, deviceId, premium, lockedFunds, fundsUsed) {
    return {
        type: types.policy.GET,
        status,
        holderId,
        vehicleId,
        deviceId,
        premium,
        lockedFunds,
        fundsUsed,
    }
}