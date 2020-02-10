import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { UserReducer } from "./UserReducer";

export const reducers = combineReducers({
    utility: UtilityReducer,
    user: UserReducer
});
