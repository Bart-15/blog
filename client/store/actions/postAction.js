import {GET_POSTS, GET_POST, GET_ERRORS, POST_LOADING, POST_ERRORS} from './types';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;
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
            payload: err.response.data
        })
    }
}


const setPostLoading = () => {
    return {
        type: POST_LOADING,
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        axios.delete(`${BASE_URL}/posts/${id}`);
        dispatch(getPosts());
    } catch (e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}

export const getSinglePost = (id) => async dispatch => {
    dispatch(setPostLoading());
    try {
        const res = await axios.get(`${BASE_URL}/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload: res.data.post
        })
    }catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}

export const editPost = (id, data, router) => async dispatch => {
    try{
        await axios.patch(`${BASE_URL}/posts/${id}`, data)
        router.push('/posts');
    }catch(e){
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}

export const addPost = (data, router) => async dispatch => {
    try{
        await axios.post(`${BASE_URL}/posts`, data);
        router.push('/posts');
    }catch(e){
        dispatch({
            type:POST_ERRORS,
            payload: e.response.data
        })
    }
}


export const toggleIsFeatured = (id) => async dispatch => {
    try{
        await axios.patch(`${BASE_URL}/posts/featured/${id}`);
    }catch(err) {
        dispatch({
            type: POST_ERRORS,
            payload: err.response.data
        })
    }
}