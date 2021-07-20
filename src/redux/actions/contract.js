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
        type: types.contract.SET_POLICIES,
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

export function setHolders(holders) {
    return {
        type: types.contract.SET_HOLDERS,
        holders,
    };
}

export function setVehicles(vehicles) {
    return {
        type: types.contract.SET_VEHICLES,
        vehicles,
    };
}

export function setPartners(partners) {
    return {
        type: types.contract.SET_PARTNERS,
        partners,
    };
}