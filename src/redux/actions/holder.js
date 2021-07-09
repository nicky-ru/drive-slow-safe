import * as types from '../constants/types';

export function getHolder(rating, multiplier, penaltyMultiplier, accumulatedKM) {
    return {
        type: types.holder.GET,
        rating,
        multiplier,
        penaltyMultiplier,
        accumulatedKM,
    }
}