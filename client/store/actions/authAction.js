import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {GET_ERRORS, SET_USER, SET_PROFILE, SET_USER_LOADING} from './types'

axios.defaults.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = (data, router) => async dispatch => {
    dispatch(setUserLoading())
    try {
        const res = await axios.post(`${BASE_URL}/login`, data, {withCredentials: true});
     
        const decode = jwt_decode(res.data.token);
        const user = {
            id: decode.id,
            name: decode.name,
            email: decode.email,
            iat: decode.iat,
            exp: decode.exp
        }
        dispatch({
            type:SET_USER,
            payload: user
        })

        router.push('/dashboard')
    } catch (e) {
       dispatch({
           type:GET_ERRORS,
           payload:e.response === undefined ? {} : e.response.data
       })
    }
}

const setUserLoading = () => {
    return {
        type:SET_USER_LOADING
    }
}

export const setUserData = () => {
    return {
        type:SET_USER
    }
}

export const logout =  (router) => async dispatch => {
    try{
        dispatch(setUserLoading());
        await axios.post(`${BASE_URL}/logout`)
        dispatch(setUserData())
        dispatch(router.push('/login'))
    } catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload: e.response === undefined ? {} : e.response.data
        })
    }

}

export const profile = () => async dispatch => {
    const res = await axios.get(`${BASE_URL}/profile`)
    await dispatch({
        type:SET_USER,
        payload:res.data.user
    })
}

