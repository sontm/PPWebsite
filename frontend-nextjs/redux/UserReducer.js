import Backend from '../util/Backend';
import Helpers from '../util/Helpers';
import { notification } from 'antd';
import AppContant from '../util/AppConstant'
import {LOCAL_CSRF_TOKEN, LOCAL_CARTS, LOCAL_RECENTVIEWS} from '../util/AppConstant'

const USER_LOGIN_OK = 'USER_LOGIN_OK';
const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_PROFILE_START = 'USER_PROFILE_START';
const USER_PROFILE_OK = 'USER_PROFILE_OK';
const USER_PROFILE_ERR = 'USER_PROFILE_ERR';

const USER_GET_RECENTVIEWS = 'USER_GET_RECENTVIEWS';
const USER_GET_FAVORITES = 'USER_GET_FAVORITES';
const USER_GET_CARTITEMS = 'USER_GET_CARTITEMS';
const USER_UPDATE_CARTITEM = 'USER_UPDATE_CARTITEM';

const USER_PLACEORDER_OK = 'USER_PLACEORDER_OK';
const USER_PLACEORDER_ERR = 'USER_PLACEORDER_ERR';
const USER_GET_ORDERS = 'USER_GET_ORDERS';

const USER_ADD_ADDR_OK = 'USER_ADD_ADDR_OK';
const USER_GET_ADDR_OK = 'USER_GET_ADDR_OK';

const USER_SET_CHECKOUT_ADDR = 'USER_SET_CHECKOUT_ADDR';

const USER_LOGOUT= 'USER_LOGOUT';

// userProfile
    // id, userId(FB, Google, username), email,phone,fullName,pictureUrl,userType(local, facebook, google),accessToken
const initialState = {
    isLogined: false,
    isLoading: false,
    isFirstFetched: false,
    userProfile: null,
    recentViews:[], // array of {ProductID, UserID (Logined only), When, ViewCount...}
    favorites: [],
    cartItems: [], // array of {ProductID, UserID (Logined only), UserID, Quantity...}
    orders: [],
    address: [],
    checkoutAddressId: 0
};

export const actUserLogout = () => (dispatch) => {
    console.log("  actUserLogout")
    localStorage.removeItem(LOCAL_CSRF_TOKEN)
    dispatch({
        type: USER_LOGOUT,
        payload:  ""
    });
}

export const actUserLogin = ({username, password}, router, fromBeforeLogin) => (dispatch) => {
    console.log("  Do Login with:" + username + "," + password)
    dispatch({
        type: USER_LOGIN_START,
        payload:  ""
    });
    Backend.login({username, password},
        response => {
            console.log("actUserLogin Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            console.log(response.data.jwt)
            localStorage.setItem(LOCAL_CSRF_TOKEN, response.data.jwt)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
            // Back to location before Login
            router.push(fromBeforeLogin)
        },
        error => {
            console.log("actUserLogin error")
        }); 
}

export const actUserAddLoginWithFaceBook = (values, history) => (dispatch) => {
    console.log("  actUserAddLoginWithFaceBook")
    Backend.addLoginWithFacebook(values,
        response => {
            console.log("actUserAddLoginWithFaceBook Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            localStorage.setItem(LOCAL_CSRF_TOKEN, response.data.csrf)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddLoginWithFaceBook error")
        }); 
}

export const actUserAddLoginWithGoogle = (values, history) => (dispatch) => {
    console.log("  actUserAddLoginWithGoogle")
    Backend.addLoginWithGoogle(values,
        response => {
            console.log("actUserAddLoginWithGoogle Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            localStorage.setItem(LOCAL_CSRF_TOKEN, response.data.csrf)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddLoginWithGoogle error")
        }); 
}

export const actUserGetProfile = () => (dispatch) => {
    console.log("  actUserGetProfile")
    dispatch({
        type: USER_PROFILE_START,
        payload:  ""
    });
    Backend.getUserProfile(
        response => {
            console.log("actUserGetProfile Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_PROFILE_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetProfile error")
            dispatch({
                type: USER_PROFILE_ERR
            });
        });
}



export const actUserUpdateCartItem = (userId, productId, quantity) => (dispatch) => {
    console.log("  actUserUpdateCartItem:" + userId + ",productId:" + productId)
    if (userId) {
        Backend.addUserCartItem(userId, productId, quantity,
            response => {
                console.log("addUserCartItem Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                // Active: true
                // ProductID: "5f57b1eff958e833c62f8d4c"
                // Quantity: 4
                // UserID: "5f709e5101479d0499b6243d"
                // createdAt: "2020-10-04T05:51:20.442Z"
                // id: "5f7962d73092c0056e3799f4"
                console.log(response.data)
                dispatch({
                    type: USER_UPDATE_CARTITEM,
                    payload:  response.data
                });
            },
            error => {
                console.log("addUserCartItem error")
                console.log(error)
            }); 
    } else {
        // Add to Local Storage with format: {pid, quantity}
        let v = localStorage.getItem(LOCAL_CARTS);
        let cartItems = JSON.parse(v);
        console.log("^^^^^^^^Carts Storage")
        console.log(cartItems)
        let isFound = false;
        if (cartItems && cartItems.length) {
            // pid: "5f57b1eff958e833c62f8d4c"
            // q: 4
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].ProductID == productId) {
                    // Existed, Increase
                    cartItems[i].Quantity++;
                    isFound = true;
                    break;
                }
            }
            
            if (!isFound) {
                // add new 
                cartItems.push({ProductID: productId, Quantity: 1});
            }
            
        } else {
            cartItems = [];
            cartItems.push({ProductID: productId, Quantity: 1});
        }
        console.log("^^^^^^^^ New Carts Storage")
        console.log(cartItems)
        localStorage.setItem(LOCAL_CARTS, JSON.stringify(cartItems));

        dispatch({
            type: 'LOCAL_CART_ITEMS',
            payload:  cartItems
        });
    }
}
// TODO: Set Active is True
export const actUserDeleteCartItem = (itemId) => (dispatch) => {
    console.log("  actUserDeleteCartItem:itemId:" + itemId)
        Backend.deleteUserCartItem(itemId,
            response => {
                console.log("deleteUserCartItem Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: 'USER_DELETE_CARTITEM',
                    payload:  response.data
                });
            },
            error => {
                console.log("deleteUserCartItem error")
                console.log(error)
            }); 
}

export const actUserGetCartItems = (userId) => (dispatch) => {
    console.log("  actUserGetCartItems")
    if (userId) {
        // Logined
    Backend.getUserCartItems(userId,
        response => {
            console.log("actUserGetCartItems Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_CARTITEMS,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetCartItems error")
        }); 
    } else {
        // Not Login, load from Local
        let v = localStorage.getItem(LOCAL_CARTS);
        let cartItems = JSON.parse(v);
        dispatch({
            type: 'LOCAL_CART_ITEMS',
            payload:  cartItems
        });
    }
}


export const actUserGetProductsInCart = (productIds) => (dispatch) => {
    Backend.getSomeProducts(productIds,
    response => {
        console.log("Get Some Product of Cart Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        console.log(response.data)
        dispatch({
            type: 'USER_GET_CARTPRODUCT_OK',
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Product error")
    }); 
}








export const actUserAddRecentViews = (userId, productId) => (dispatch) => {
    console.log("  actUserAddRecentViews:" + userId + ",productId:" + productId)
    if (userId) {
        // Logined
    Backend.addUserRecentViews(userId, productId,
        response => {
            console.log("actUserAddRecentViews Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)

            dispatch({
                type: 'USER_UPDATE_RECENTVIEWS',
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddRecentViews error")
        }); 
    } else {
        // Add to Local Storage
        // Add to Local Storage with format: {pid, quantity}
        let v = localStorage.getItem(LOCAL_RECENTVIEWS);
        let recentViews = JSON.parse(v);
        console.log("^^^^^^^^RecentViews Storage")
        console.log(recentViews)
        let isFound = false;
        if (recentViews && recentViews.length > 0) {
            let isFound = false;
            for (let i = 0; i < recentViews.length; i++) {
                if (recentViews[i].ProductID == productId) {
                    // Existed, Remove Old and Add New to First
                    let newCount = recentViews[i].ViewCount + 1

                    recentViews.splice(i, 1);
                    
                    recentViews.push({ProductID: productId, When: Date.now(), ViewCount:newCount})
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                // Not Existed
                recentViews.push({ProductID: productId, When: Date.now(), ViewCount:1})
            }
        } else {
            recentViews= [{ProductID: productId, When: Date.now(), ViewCount:1}];
        }
        
        console.log("^^^^^^^^ New RecentViews Storage")
        console.log(recentViews)
        localStorage.setItem(LOCAL_RECENTVIEWS, JSON.stringify(recentViews));

        dispatch({
            type: 'LOCAL_RECENTVIEWS',
            payload:  recentViews
        });
    }
}
export const actUserGetRecentViews = (userId) => (dispatch) => {
    console.log("  actUserGetRecentViews:" + userId)
    if (userId) {
        Backend.getUserRecentViews(userId,
            response => {
                console.log("actUserGetRecentViews Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: USER_GET_RECENTVIEWS,
                    payload:  response.data
                });
            },
            error => {
                console.log("actUserGetRecentViews error")
            }); 
    }
}







export const actUserAddFavorites = (userId, productId) => (dispatch) => {
    console.log("  actUserAddFavorites:" + userId + ",productId:" + productId)
    if (userId) {
        Backend.addUserFavorites(userId, productId,
            response => {
                console.log("actUserAddFavorites Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: 'USER_UPDATE_FAVORITE',
                    payload:  response.data
                });
            },
            error => {
                console.log("actUserAddFavorites error")
            }); 
    }
}
// TODO: Set Active is True
export const actUserDeleteFavorites = (itemId) => (dispatch) => {
    console.log("  actUserDeleteFavorites:itemId:" + itemId)
    if (itemId) {
        Backend.deleteUserFavorites(itemId,
            response => {
                console.log("actUserDeleteFavorites Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: 'USER_DELETE_FAVORITE',
                    payload:  response.data
                });
            },
            error => {
                console.log("actUserDeleteFavorites error")
                console.log(error)
            }); 
    }
}

export const actUserGetFavorites = (userId) => (dispatch) => {
    console.log("  actUserGetFavorites:" + userId)
    if (userId) {
        Backend.getUserFavorites(userId,
            response => {
                console.log("actUserGetFavorites Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: USER_GET_FAVORITES,
                    payload:  response.data
                });
            },
            error => {
                console.log("actUserGetFavorites error")
            }); 
    }
}



export const actUserAddAddress = (values, userId, history) => (dispatch) => {
    console.log("  actUserAddAddress")
    values.userId = userId;
    Backend.addUserAddress(values,
        response => {
            console.log("actUserAddAddress Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            if (history) {
                history.goBack();
            }
            dispatch({
                type: USER_ADD_ADDR_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddAddress error")
        }); 
}
export const actUserSetAddressDefault = (values, userId) => (dispatch) => {
    console.log("  actUserSetAddressDefault")
    values.userId = userId;
    Backend.setUserAddressDefault(values,
        response => {
            console.log("actUserSetAddressDefault Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_ADD_ADDR_OK, // can use same dispatch
                payload:  response.data
            });
        },
        error => {
            console.log("actUserSetAddressDefault error")
        }); 
}
export const actUserEditAddress = (values, userId, history) => (dispatch) => {
    console.log("  actUserEditAddress")
    values.userId = userId;
    Backend.editUserAddress(values,
        response => {
            console.log("actUserEditAddress Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            if (history) {
                history.goBack();
            }
            dispatch({
                type: USER_ADD_ADDR_OK, // can use same dispatch
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddAddress error")
        }); 
}
export const actUserGetAllAddress = (userId) => (dispatch) => {
    console.log("  actUserGetAllAddress")
    Backend.getUserAddress(userId,
        response => {
            console.log("actUserGetAllAddress Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_ADDR_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetAllAddress error")
        }); 
}



export const actUserPlaceOrder = (products, userProfile, history) => (dispatch) => {
    console.log("  actUserPlaceOrder")
    Backend.placeOrder(products,userProfile,
        response => {
            console.log("actUserPlaceOrder Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            history.push("/customer/orders")
            notification.success({
                message: response.data.orderNumber,
                description:
                  'Đặt Hàng Thành Công. Mã Đơn Hàng: ' + response.data.orderNumber,
            });
            dispatch({
                type: USER_PLACEORDER_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserPlaceOrder error")
            notification.error({
                message: "Có Lỗi Xảy Ra",
                description:
                  'Đặt Hàng Thất Bại. Xin hãy thử lại sau!',
            });
            history.push("/cart")
        }); 
}
export const actUserGetOrders = (userId) => (dispatch) => {
    console.log("  actUserGetOrders")
    Backend.getUserOrders(userId,
        response => {
            console.log("actUserGetOrders Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_ORDERS,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetOrders error")
        }); 
}


export const actUserSetCheckoutAddress = (id) => (dispatch) => {
    console.log("  actUserPlaceOrder")
    dispatch({
        type: USER_SET_CHECKOUT_ADDR,
        payload:  id
    });
}

// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case USER_LOGIN_START:
    case USER_PROFILE_START:
        return {
            ...state,
            isLoading: true
        };
    case USER_LOGIN_OK:
        return {
            ...state,
            isLogined: true,
            isLoading: false,
            userProfile: action.payload.user
        };
    case USER_PROFILE_OK:
        return {
            ...state,
            isLogined: true,
            isLoading: false,
            userProfile: action.payload
        };
    case USER_PROFILE_ERR:
        return {
            ...state,
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    case USER_LOGOUT:
        return {
            ...state,
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    
    case USER_GET_RECENTVIEWS:
        return {
            ...state,
            recentViews: action.payload
        }
    case 'LOCAL_RECENTVIEWS':
        return {
            ...state,
            recentViews: action.payload
        }
    case 'USER_UPDATE_RECENTVIEWS':
        // Add Single Element to cartItems, if Same, update quantity only
        let oldRecentViews = [...state.recentViews];
        let isFoundItem2 = false;
        for (let idx = 0; idx < oldRecentViews.length; idx++) {
            if (oldRecentViews[idx].id == action.payload.id) {
                // found one, Remove and Push to begin of Queue
                oldRecentViews.splice(idx, 1)
                oldRecentViews.push(action.payload)
                isFoundItem2 = true;
                break;
            }
        }
        if (!isFoundItem2) {
            // Add to items
            oldRecentViews.push(action.payload)
        }
        return {
            ...state,
            recentViews: oldRecentViews
        }
    case 'USER_UPDATE_FAVORITE':
        // Add Single Element to cartItems, if Same, update quantity only
        let oldFavs = [...state.favorites];
        let isFoundItem3 = false;
        for (let idx = 0; idx < oldFavs.length; idx++) {
            if (oldFavs[idx].id == action.payload.id) {
                // found one, Remove and Push to begin of Queue
                // oldFavs.splice(idx, 1)
                // oldFavs.push(action.payload)

                // DO Nothing here
                isFoundItem3 = true;
                break;
            }
        }
        if (!isFoundItem3) {
            // Add to items
            oldFavs.push(action.payload)
        }
        return {
            ...state,
            favorites: oldFavs
        }
    case 'USER_DELETE_FAVORITE':
        // Remove Single Element from cartItems
        let favDel = [...state.favorites];
        for (let idx = 0; idx < favDel.length; idx++) {
            if (favDel[idx].id == action.payload.id) {
                // found one, replace
                favDel.splice(idx, 1)
                break;
            }
        }
        return {
            ...state,
            favorites: favDel
        }
    case USER_GET_FAVORITES:
        return {
            ...state,
            favorites: action.payload
        }
    case USER_GET_CARTITEMS:
        return {
            ...state,
            cartItems: action.payload
        }
    case 'LOCAL_CART_ITEMS':
        return {
            ...state,
            cartItems: action.payload
        }

    case USER_UPDATE_CARTITEM:
        // Add Single Element to cartItems, if Same, update quantity only
        let oldCartItems = [...state.cartItems];
        let isFoundItem = false;
        oldCartItems.forEach((element, idx) => {
            if (element.id == action.payload.id) {
                // found one, replace
                oldCartItems[idx] = action.payload;
                isFoundItem = true;
            }
        })
        if (!isFoundItem) {
            // Add to items
            oldCartItems.push(action.payload)
        }
        return {
            ...state,
            cartItems: oldCartItems
        }
    case 'USER_DELETE_CARTITEM':
        // Remove Single Element from cartItems
        let cartItemsDel = [...state.cartItems];
        for (let idx = 0; idx < cartItemsDel.length; idx++) {
            if (cartItemsDel[idx].id == action.payload.id) {
                // found one, replace
                cartItemsDel.splice(idx, 1)
                break;
            }
        }
        return {
            ...state,
            cartItems: cartItemsDel
        }

    case 'USER_GET_CARTPRODUCT_OK':
        // add a new Field 'Product' in each cartItems
        let cartItems = [...state.cartItems];
        let products = action.payload;
        if (products && products.length) {
            products.forEach((p, idx) => {
                for (let i = 0; i < cartItems.length; i++) {
                    console.log("p.id:" + p.id + ",cid:" + cartItems[i].id)
                    if (p.id == cartItems[i].ProductID) {
                        // found one, replace
                        cartItems[i].Product = p;
                        break;
                    }
                }
            });
            return {
                ...state,
                cartItems: cartItems
            }
        } else {
            return {
                ...state,
            }
        }
    case USER_GET_ORDERS:
        return {
            ...state,
            orders: action.payload
        }
    case USER_ADD_ADDR_OK:
    case USER_GET_ADDR_OK:
        return {
            ...state,
            address: action.payload
        }
    case USER_SET_CHECKOUT_ADDR:
        return {
            ...state,
            checkoutAddressId: action.payload
        } 
    case USER_PLACEORDER_OK:
        return {
            ...state,
            cartItems: []
        }
    default:
        return state;
    }
}
