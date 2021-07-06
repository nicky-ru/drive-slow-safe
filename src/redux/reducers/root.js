import { combineReducers } from "redux";

import { user } from "./user";
import { contract } from "./contract";

const rootReducer = combineReducers({
    contract,
    user
});
export default rootReducer;