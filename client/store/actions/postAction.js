import {GET_POSTS, GET_ERRORS, POST_LOADING} from './types';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const getPosts = () => async dispatch => {    
    try{
        dispatch(setPostLoading())
        const res = await axios.get(`${BASE_URL}/posts`)
        dispatch({
            type:GET_POSTS,
            payload:res.data.posts
        })

    } catch(err){
        dispatch({
            type:GET_ERRORS,
            payload: err.message
        })
    }
}


const setPostLoading = () => {
    return {
        type: POST_LOADING,
    }
}

