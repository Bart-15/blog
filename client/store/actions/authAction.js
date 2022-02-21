import axios from 'axios'
import {GET_ERRORS, SET_USER, GET_PROFILE, SET_USER_LOADING} from './types'

axios.defaults.withCredentials = true;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

<<<<<<< HEAD
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
=======
export const login = (data, router) => async dispatch => {
    try {
        dispatch(setUserLoading());
        const res = await axios.post(`${BASE_URL}/login`, data);
>>>>>>> 3b6211e80d17d9a88c14fb623102be62ae2d3032
        router.push('/dashboard')
    } catch (err) {
        await dispatch({
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
<<<<<<< HEAD
    await dispatch({
        type:SET_USER,
        payload:res.data.user
    })
}
=======
}



>>>>>>> 3b6211e80d17d9a88c14fb623102be62ae2d3032
