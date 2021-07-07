import { combineReducers } from "redux";

import { user } from "./user";
import { contract } from "./contract";
import { wallet } from "./wallet";
import { policy } from "./policy";
import { penalty } from "./penalty";

const rootReducer = combineReducers({
    wallet,
    contract,
    user,
    policy,
    penalty,
});
export default rootReducer;