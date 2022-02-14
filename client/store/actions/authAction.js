import axios from 'axios'
import {GET_ERRORS, SET_USER, GET_PROFILE, SET_USER_LOADING} from './types'

axios.defaults.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = (data, router) => async dispatch => {
    try {
        dispatch(setUserLoading());
        const res = await axios.post(`${BASE_URL}/login`, data);
        router.push('/dashboard')
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }
}

const setUserLoading = () => {
    return {
        type:SET_USER_LOADING
    }
}

export const profile = () => async dispatch => {
    const res = await axios.get(`${BASE_URL}/profile`)
}



