import * as types from '../constants/types';

export function getVehicle(brand, model, year) {
    return {
        type: types.vehicle.GET,
        brand,
        model,
        year,
    };
}