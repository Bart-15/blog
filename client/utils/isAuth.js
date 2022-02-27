import axios from 'axios';
import store from '../store/store';
import Router from 'next/router'
import {SET_USER, SET_USER_LOADING} from '../store/actions/types'
import {setUserData} from '../store/actions/authAction'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;


const checkAuth = async() => {
    store.dispatch({type:SET_USER_LOADING})
    try {
        const res = await axios.get(`${BASE_URL}/isAuth`)
        if(!res.data.user) return console.log('unauthorized');
        store.dispatch({
            type:SET_USER,
            payload:res.data.user
        })
    }catch(e){
        store.dispatch({type:SET_USER})
        if(e.response.data === 'Unauthorized'){
           Router.push('/login')
        }
    }

}

export default checkAuth;