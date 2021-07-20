import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function addPolicy(policyId, policy) {
    return {
        type: types.policy.ADD,
        policyId,
        policy
    };
}

export function getPolicyById(policyId) {
    return dispatch => {
        return smartContract.methods.policies(policyId).call()
            .then(policy => {
                dispatch({
                    type: types.policy.GET,
                    status: policy.status,
                    holderId: policy.holderId,
                    vehicleId: policy.vehicleId,
                    deviceId: policy.deviceId,
                    premium: policy.premium,
                    lockedFunds: policy.lockedFunds,
                    fundsUsed: policy.fundsUsed,
                })
            })
            .catch(e => console.log("Error while dispatching getPolicyById: ", e));
    }
}