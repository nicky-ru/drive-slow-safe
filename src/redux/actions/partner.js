import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function getPartnerById(partnerId) {
    return dispatch => {
        return smartContract.methods.partners(partnerId).call()
            .then(partner => {
                dispatch({
                    type: types.partner.GET,
                    name: partner.name
                })
            })
            .catch(e => console.log("Error while dispatching getPartnerById: ", e));
    }
}