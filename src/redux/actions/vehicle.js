import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function getVehicleById(vehicleId) {
    return dispatch => {
        return smartContract.methods.vehicles(vehicleId).call()
            .then(vehicle => {
                dispatch({
                    type: types.vehicle.GET,
                    brand: vehicle.brand,
                    model: vehicle.model,
                    year: vehicle.year
                })
            })
            .catch(e => console.log("Error while dispatching getVehicleById: ", e));
    }
}