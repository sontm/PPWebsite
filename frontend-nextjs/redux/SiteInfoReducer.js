import AppConstants from '../util/AppConstant';
import Backend from '../util/Backend';
import Helpers from '../util/Helpers';

const initialState = {
    categories: [],
    categoriesLevel:[],
    brands: [],
    brandsColumnize: [],
}

export const actClientCategoryGet = () => (dispatch) => {
    Backend.getAllCategories(
        response => {
            console.log("Get All Category OK")
            console.log(response.data)
            dispatch({
                type: 'CATE_GET_OK',
                payload:  response.data
            });
        },
        error => {
            console.log("Get All Category error")
            console.log(error)
        }); 
}

export const actClientBrandGet = () => (dispatch) => {
    Backend.getAllBrands(
        response => {
            console.log("Get All Brand OK")
            console.log(response.data)
            dispatch({
                type: 'BRAND_GET_OK',
                payload:  response.data
            });
        },
        error => {
            console.log("Get All Brand error")
            console.log(error)
        }); 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'CATE_GET_OK':
            let categoriesLevel = Helpers.levelingCategory(action.payload)
            console.log("categoriesLevel-----")
            console.log(categoriesLevel)
            return {
                ...state,
                categories: action.payload,
                categoriesLevel: categoriesLevel
            };
        case 'BRAND_GET_OK':
            return {
                ...state,
                brands: action.payload,
            };
        default:
            return state
    }
};

