import {POST_LOADING, GET_POSTS, GET_POST, POST_ERRORS} from '../actions/types'

const initialState = {
    posts:[],
    post:{},
    loading: false,
    errors:{}
}

const postReducer = (state =  initialState, action) => {
    switch (action.type) {
        case POST_LOADING : 
            return {
                ...state,
                loading: true,
                errors:{}
            }
        case GET_POSTS :
            return {
                ...state,
                posts: action.payload,
                loading: false,
                errors:{}
            }   
        
        case GET_POST : 
            return {
                ...state,
                post: action.payload,
                loading:false,
                errors:{}
        }

        case POST_ERRORS : 
            return {
                ...state,
                errors: action.payload
            }

        default:
        return state;
    }
}

export default postReducer;
