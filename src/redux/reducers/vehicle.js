import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function vehicle(state = initialState.vehicle, action) {
    switch (action.type) {
        case types.vehicle.GET: {
            let { brand, model, year } = action;
            return {...state, brand: brand, model: model, year: year};
        }
        default:
            return state;
    }
}