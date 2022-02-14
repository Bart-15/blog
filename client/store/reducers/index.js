import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer"
export default combineReducers({
    user: authReducer,
    post: postReducer,
    error: errorReducer
})