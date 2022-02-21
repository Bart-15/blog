import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer"
export default combineReducers({
<<<<<<< HEAD
    auth: authReducer,
    post: postReducer
=======
    user: authReducer,
    post: postReducer,
    error: errorReducer
>>>>>>> 3b6211e80d17d9a88c14fb623102be62ae2d3032
})