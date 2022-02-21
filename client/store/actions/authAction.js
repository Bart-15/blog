import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {GET_ERRORS, SET_USER, GET_PROFILE} from './types'

axios.defaults.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = (data) => async dispatch => {

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

        localStorage.setItem('user', JSON.stringify(user));

        await dispatch({
            type:SET_USER,
            payload: user
        })
        router.push('/dashboard')
    } catch (err) {
        await dispatch({
            type:GET_ERRORS,
            payload: err.response.data
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