import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function getHolderById(holderId) {
    return dispatch => {
        return smartContract.methods.holders(holderId).call()
            .then(holder => {
                dispatch({
                    type: types.holder.GET,
                    rating: holder.rating,
                    multiplier: holder.multiplier,
                    penaltyMultiplier: holder.penaltyMultiplier,
                    accumulatedKM: holder.accumulatedKM
                })
            })
            .catch(e => console.log("Error while dispatching getHolderById: ", e));
    }
}