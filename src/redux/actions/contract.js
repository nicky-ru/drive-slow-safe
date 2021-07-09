import * as types from '../constants/types';

export function updateContract(address, admin) {
    return {
        type: types.contract.UPDATE,
        address,
        admin
    };
}

export function setPolicies(policies) {
    return {
        type: types.contract.SET_POLICIES,
        policies,
    };
}

export function setDevices(devices) {
    return {
        type: types.contract.SET_DEVICES,
        devices,
    };
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