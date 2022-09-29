import { combineReducers } from "redux";
import operationsReducer from "./reducer/reducer";

const rootReducer = combineReducers({
    operationsReducer,
})

export default rootReducer;