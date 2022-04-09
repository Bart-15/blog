import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import socialReducer from "./socialReducer";
export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
    post: postReducer,
    social: socialReducer,
    error:errorReducer,
})