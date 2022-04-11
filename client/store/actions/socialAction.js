import axios from 'axios';
import { GET_SOCIALS, SOCIAL_ERRORS, SOCIAL_LOADING } from './types';

axios.withCredentials = true;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getSocials = () => async (dispatch) => {
    dispatch(setSocialLoading);
    try{
        const res = await axios.get(`${BASE_URL}/socials`);
        dispatch({
            type:GET_SOCIALS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:SOCIAL_ERRORS,
            payload:err.response.data
        })
    }


}


export const updateSocialLinks = (id, data) => async (dispatch) => {
    try{
        await axios.patch(`${BASE_URL}/socials/${id}`, data)
        dispatch(getSocials());
    } catch(err) {
        dispatch({
            type:SOCIAL_ERRORS,
            payload:err.response.data
        })
    } 
}

const setSocialLoading = () => {
    return {
        type: SOCIAL_LOADING,
    }
}