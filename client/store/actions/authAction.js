import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {GET_ERRORS, SET_USER, GET_PROFILE} from './types'

axios.defaults.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = (data) => async dispatch => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, data, {withCredentials: true});
        const {token} = res.data;
        const decoded = jwt_decode(token)
        dispatch({
            type:SET_USER,
            payload: decoded
        })
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response
        })
    }
}


export const profile = () => async dispatch => {
    const res = await axios.get(`${BASE_URL}/profile`)
    console.log(res)
}