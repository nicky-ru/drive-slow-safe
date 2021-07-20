import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function getDeviceById(deviceId) {
    return dispatch => {
        return smartContract.methods.devices(deviceId).call()
            .then(device => {
                dispatch({
                    type: types.device.GET,
                    imei: device.imei,
                    hasOrder: device.hasOrder,
                    status: device.status,
                    policyId: device.policyId,
                })
            })
            .catch(e => console.log("Error while dispatch getDeviceById: ", e));
    }
}