import {GET_CATEGORIES, GET_CATEGORY, CATEGORIES_LOADING} from '../actions/types'
 
const initialState = {
    categories: [],
    category: {},
    loading: false
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES : {
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        }
        case CATEGORIES_LOADING : {
            return {
                ...state,
                loading: true
            }
        }
        case GET_CATEGORY : {
            return {
                ...state,
                category: action.payload,
                loading: false
            }
        }        
        default: 
        return state;
    }
}

export default categoryReducer;