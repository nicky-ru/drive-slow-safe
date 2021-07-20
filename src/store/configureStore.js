import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/root";

let store;
export default initialState => {
    if (store) {
        return store;
    }
    let createdStore;

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        createdStore = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(thunk,),
                window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        );
    } else {
        createdStore = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(thunk,))
        );
    }

    store = createdStore;
    return store;
};