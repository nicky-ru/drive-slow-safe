import * as types from '../constants/types';
import smartContract from '../../contract/driveSlowSafe';

// export function getDataPoint(accelerometer, latitude, longitude, timestamp) {
//     return {
//         type: types.device.GET,
//         accelerometer,
//         latitude,
//         longitude,
//         timestamp,
//     }
// }

export function getDataPointById(dataPointId) {
    return dispatch => {
        return smartContract.methods.dataPoints(dataPointId).call()
            .then(dataPoint => {
                dispatch({
                    type: types.dataPoint.GET,
                    latitude: dataPoint.latitude,
                    longitude: dataPoint.longitude,
                    timestamp: dataPoint.timestamp
                })
            })
            .catch(e => console.log("Error while dispatching getDataPoint: ", e));
    }
}