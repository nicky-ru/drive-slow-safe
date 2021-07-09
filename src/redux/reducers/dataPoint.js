import initialState from "../constants/initialState";
import * as types from "../constants/types";

// export function dataPoint(state = initialState.dataPoint, action) {
//     switch (action.type) {
//         case types.vehicle.GET: {
//             let { accelerometer, latitude, longitude, timestamp } = action;
//             return {...state, accelerometer: accelerometer, latitude: latitude, longitude: longitude, timestamp: timestamp};
//         }
//         default:
//             return state;
//     }
// }

export function dataPoint(state = initialState.dataPoint, action) {
    switch (action.type) {
        case types.dataPoint.GET: {
            let { latitude, longitude, timestamp } = action;
            return {...state, latitude: latitude, longitude: longitude, timestamp: timestamp};
        }
        default:
            return state;
    }
}