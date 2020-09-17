import Backend from '../util/Backend';
import Helpers from '../util/Helpers';

export const PROD_GET_CARTPRODUCT_OK = 'PROD_GET_CARTPRODUCT_OK';


export const PROD_QUERY_CLEAR = 'PROD_QUERY_CLEAR';
export const PROD_QUERY_OK = 'PROD_QUERY_OK';
export const PROD_GET_PRODS_INCART_OK = 'PROD_GET_PRODS_INCART_OK';
export const PROD_FILTER = 'PROD_FILTER';
export const PROD_GETDETAIL_OK = 'PROD_GETDETAIL_OK';
export const PROD_QUERY_ERR = 'PROD_QUERY_ERR';
export const PROD_BRANDLIST_OK = 'PROD_BRANDLIST_OK';
export const PROD_BRANDCOUNTRYLIST_OK = 'PROD_BRANDCOUNTRYLIST_OK';
export const PROD_ATTRIBUTE_QUERY_OK = 'PROD_ATTRIBUTE_QUERY_OK';
export const PROD_PRICERANGE_QUERY_OK = 'PROD_PRICERANGE_QUERY_OK';

const initialState = {
    productsQuery: [],
    productsQueryFiltered: [],
    brandsQuery:{},
    brandCountriesQuery:{},
    attributesQuery:{},
    priceRangeQuery:[],  // [{name: 1, from:1000, to: 2000},{name: 2, from:2000, to: 4000},]
    productDetail: null,
    filter:"popular", // popular, new, discount, lowprice, highprice
    cartProducts: []
};

export const actProductGetProductsInCart = (productIds) => (dispatch) => {
    Backend.getSomeProducts(productIds,
    response => {
        console.log("Get Some Product of Cart Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        console.log(response.data)
        dispatch({
            type: PROD_GET_CARTPRODUCT_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Product error")
    }); 
}


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case PROD_GET_CARTPRODUCT_OK:
        return {
            ...state,
            cartProducts: action.payload
        };
    
    default:
        return state;
    }
}

  
