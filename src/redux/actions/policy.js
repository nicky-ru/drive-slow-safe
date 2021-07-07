import * as types from '../constants/types';

export function addPolicy(policyId, policy) {
    return {
        type: types.policy.ADD,
        policyId,
        policy
    };
}