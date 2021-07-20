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
                const latitude = dataPoint.latitude;
                const longitude = dataPoint.longitude;
                const timestamp = dataPoint.timestamp;

                dispatch({
                    type: types.dataPoint.GET,
                    latitude,
                    longitude,
                    timestamp
                })
            })
            .catch(e => console.log("Error while dispatching getDataPoint: ", e));
    }
}