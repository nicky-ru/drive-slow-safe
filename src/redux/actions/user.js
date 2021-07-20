import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function isAdmin(_admin) {
    return {
        type: types.user.IS_ADMIN,
        _admin
    };
}

export function listUsersPolicies(sender) {
    return dispatch => {
        return smartContract.methods.showMyPolicies().call({from: sender})
            .then(policies => {
                dispatch({
                    type: types.user.LIST_POLICIES,
                    policies,
                })
            })
            .catch(e => console.log("Error while dispatching listUsersPolicies: ", e));
    }
}

export function listUsersPenalties(sender) {
    return dispatch => {
        return smartContract.methods.showMyPenalties().call({from: sender})
            .then(penalties => {
                dispatch({
                    type: types.user.LIST_PENALTIES,
                    penalties,
                })
            })
            .catch(e => console.log("Error while dispatching listUsersPenalties: ", e));
    }
}