import * as types from '../constants/types';
import smartContract from '../../contract/driveSlowSafe';
import initialState from "../constants/initialState";

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

export function setPolicies(policies) {
    return {
        type: types.contract.LIST_POLICIES,
        policies,
    };
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

export function setVehicles(vehicles) {
    return {
        type: types.contract.LIST_VEHICLES,
        vehicles,
    };
}

export function setPartners(partners) {
    return {
        type: types.contract.LIST_PARTNERS,
        partners,
    };
}