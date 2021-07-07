import * as types from '../constants/types';

export function addPenalty(penaltyId, penalty) {
    return {
        type: types.penalty.ADD,
        penaltyId,
        penalty
    };
}