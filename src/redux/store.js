import userReducer from "./reducers/userReducer";
import customizedOrderReducer from "./reducers/customizedOrderReducer";
import productsReducer from "./reducers/productsReducer";
import { combineReducers } from "redux";
import { createStore } from "redux";

const rootReducer = combineReducers({
    userData: userReducer,
    customizedOrder: customizedOrderReducer,
    products: productsReducer,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;