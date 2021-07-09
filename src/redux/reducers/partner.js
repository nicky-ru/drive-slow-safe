import initialState from "../constants/initialState";
import * as types from "../constants/types";

export function partner(state = initialState.partner, action) {
    switch (action.type) {
        case types.partner.GET: {
            return {...state, name: action.name};
        }
        default:
            return state;
    }
}