import { SOCIAL_ERRORS, GET_SOCIALS, SOCIAL_LOADING, FEATURED } from "../actions/types";

const initialState = {
    socials: [],
    errors: {},
    loading: false
}

const socialReducer = (state =  initialState, action) => {
    switch (action.type) {
        case SOCIAL_LOADING: 
        return {
            ...state,
            loading: true,
            errors: {}
        }


        case GET_SOCIALS :
             return {
            ...state,
            socials: action.payload,
            loading: false,
            errors: {}
        }

        case SOCIAL_ERRORS : 
            return {
            ...state,
            errors: action.payload
            }
        
        default:
        return state;
    }
}

export default socialReducer;