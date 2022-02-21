import {GET_ERRORS, SET_USER, SET_USER_LOADING} from '../actions/types'
import isEmpty from '../../validation/is-empty'

const initialState = {
    isAuth: false,
    user: {},
    loading:false
}


const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER :
            return {
                ...state,
                isAuth:!isEmpty(action.payload),
                user: action.payload,
                loading:false
            }
        case SET_USER_LOADING : 
            return {
                ...state,
                loading:true
            }     
        default: 
        return state;
    }
}

export default authReducer;