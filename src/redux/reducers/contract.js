import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function contract(state = initialState.contract, action) {
    switch (action.type) {
        case types.contract.GET_ADDRESS: {
            return {...state, address: action.address};
        }
        case types.contract.GET_ADMIN: {
            return {...state, admin: action.admin};
        }
        case types.contract.LIST_POLICIES: {
            return {...state, policies: action.policies};
        }
        case types.contract.LIST_DEVICES: {
            return {...state, devices: action.devices};
        }
        case types.contract.LIST_HOLDERS: {
            return {...state, holders: action.holders};
        }
        case types.contract.LIST_VEHICLES: {
            return {...state, vehicles: action.vehicles};
        }
        case types.contract.LIST_PARTNERS: {
            return {...state, partners: action.partners};
        }
        default:
            return state;
    }
}