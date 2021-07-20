import * as types from '../constants/types';
import smartContract from "../../contract/driveSlowSafe";

export function getDeviceById(deviceId) {
    return dispatch => {
        return smartContract.methods.devices(deviceId).call()
            .then(device => {
                const imei = device.imei;
                const hasOrder = device.hasOrder;
                const status = device.status;
                const policyId = device.policy;
                dispatch({
                    type: types.device.GET,
                    imei,
                    hasOrder,
                    status,
                    policyId,
                })
            })
            .catch(e => console.log("Error while dispatch getDeviceById: ", e));
    }
}