import { combineReducers } from "redux";

import { user } from "./user";
import { contract } from "./contract";
import { wallet } from "./wallet";

const rootReducer = combineReducers({
    wallet,
    contract,
    user
});
export default rootReducer;