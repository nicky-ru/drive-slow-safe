import { combineReducers } from "redux";

import { user } from "./user";
import { contract } from "./contract";
import { wallet } from "./wallet";
import { policy } from "./policy";

const rootReducer = combineReducers({
    wallet,
    contract,
    user,
    policy
});
export default rootReducer;