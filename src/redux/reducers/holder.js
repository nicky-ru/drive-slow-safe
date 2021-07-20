import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function holder(state = initialState.holder, action) {
    switch (action.type) {
        case types.holder.GET: {
            let { rating, multiplier, penaltyMultiplier, accumulatedKM } = action;
            return {...state, rating, multiplier, penaltyMultiplier, accumulatedKM};
        }
        default:
            return state;
    }
}