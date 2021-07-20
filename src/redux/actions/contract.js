import * as types from '../constants/types';
import smartContract from '../../contract/driveSlowSafe';

export function getAddress() {
    const address = smartContract.options.address;
    return {
        type: types.contract.GET_ADDRESS,
        address
    }
}

export function getAdmin() {
    return dispatch => {
        return smartContract.methods.administrator().call()
            .then(admin => {
                dispatch({
                    type: types.contract.GET_ADMIN,
                    admin
                })
            })
            .catch(e => console.log("Error while dispatching getAdmin: ", e));
    }
}

export function listPolicies(sender) {
    return dispatch => {
        return smartContract.methods.getPolicyIds().call({from: sender})
            .then(policies => {
                dispatch({
                    type: types.contract.LIST_POLICIES,
                    policies,
                })
            })
            .catch(e => console.log("Error while dispatching listPolicies: ", e));
    }
}

export function listDeviceIds(sender) {
    return dispatch => {
        return smartContract.methods.getDeviceIds().call({from: sender})
            .then(devices => {
                dispatch({
                    type: types.contract.LIST_DEVICES,
                    devices,
                })
            })
            .catch(e => console.log("Error while dispatching listDeviceIds: ", e));
    }
}

export function listHolders(sender) {
    return dispatch => {
        return smartContract.methods.getHoldersIds().call({from: sender})
            .then(holders => {
                dispatch({
                    type: types.contract.LIST_HOLDERS,
                    holders
                })
            })
            .catch(e => console.log("Error while dispatching listHolders: ", e));
    }
}

export function listVehicles(sender) {
    return dispatch => {
        return smartContract.methods.getVehicleIds().call({from: sender})
            .then(vehicles => {
                dispatch({
                    type: types.contract.LIST_VEHICLES,
                    vehicles,
                })
            })
            .catch(e => console.log("Error while dispatching listVehicles: ", e));
    }
}

export function listPartners() {
    return dispatch => {
        return smartContract.methods.getPartnerIds().call()
            .then(partners => {
                dispatch({
                    type: types.contract.LIST_PARTNERS,
                    partners,
                })
            })
            .catch(e => console.log("Error while dispatching listPartners: ", e));
    }
}