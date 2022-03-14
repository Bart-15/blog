import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
    post: postReducer,
    error:errorReducer,
})