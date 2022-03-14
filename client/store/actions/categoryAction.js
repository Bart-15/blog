import axios from 'axios';
import {GET_CATEGORIES, GET_CATEGORY, CATEGORIES_LOADING, GET_ERRORS, SUCCESS} from './types'

axios.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getCategories = () => async (dispatch) => {
    dispatch(categoryLoading());
    try {
        const res = await axios.get(`${BASE_URL}/categories`)
        const {categories, success} = res.data;
        dispatch({
            type:GET_CATEGORIES,
            payload: categories
        })
    }catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response.data
        })
    }
}

export const addCat = (router, data) => async dispatch => {
    try{
      await axios.post(`${BASE_URL}/categories`, data)
    dispatch(router.back())
    }catch(e) {
      await dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}


const categoryLoading = () => {
    return {
        type:CATEGORIES_LOADING
    }
}

export const deleteCategory = (id) => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/categories/${id}`)
        dispatch(getCategories());

    }catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}

export const getSingleCategory = (id) => async dispatch => {
    dispatch(categoryLoading());
    try {
       const res = await axios.get(`${BASE_URL}/categories/${id}`)

       const {category} = res.data;
        dispatch({
            type:GET_CATEGORY,
            payload: category
        })


    }catch(e){
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}

export const updateCategory = (router,data) => async dispatch => {
    try {
        await axios.patch(`${BASE_URL}/categories/${data.id}`, data)
        dispatch(router.back())
    } catch (e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }
}