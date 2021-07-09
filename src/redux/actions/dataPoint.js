import * as types from '../constants/types';

// export function getDataPoint(accelerometer, latitude, longitude, timestamp) {
//     return {
//         type: types.device.GET,
//         accelerometer,
//         latitude,
//         longitude,
//         timestamp,
//     }
// }

export function getDataPoint(latitude, longitude, timestamp) {
    return {
        type: types.dataPoint.GET,
        latitude,
        longitude,
        timestamp,
    }
}