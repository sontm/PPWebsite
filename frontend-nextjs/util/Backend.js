import axios from 'axios';
import AppConstants, {LOCAL_CSRF_TOKEN} from './AppConstant'

class Backend {
    constructor() {
    }
    createHeaderNoAuth() {
        //if(Cookies.get('XSRF-TOKEN')) {
        var headers = {
            'Content-Type': 'application/json',
        };
        return headers;
    }
    createHeader(noUseAuth) {
        //if(Cookies.get('XSRF-TOKEN')) {
        if (localStorage.getItem(LOCAL_CSRF_TOKEN) && !noUseAuth) {
            var headers = {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            // 'Access-Control-Allow-Credentials':true, // CORS error ??
                            //'Authorization': 'CSRF-TOKEN ' + localStorage.getItem(LOCAL_CSRF_TOKEN)
                            'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_CSRF_TOKEN),
                            'APIKEY': 'generic-apikey',
                        };
        } else {
            var headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'APIKEY': 'generic-apikey',
            };
        }
        return headers;
    }

    // -------------------------------Category-Brands---------------------------------------
    getAllCategories(onOK, onError) {
        console.log("getAllCategories")
        axios.get(AppConstants.API_CMS_URL + "/prod-categories",
            { headers: this.createHeaderNoAuth()}) // TODO for no AUTH here
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getAllBrands(onOK, onError) {
        console.log("getAllBrands")
        axios.get(AppConstants.API_CMS_URL + "/prod-brands",
            { headers: this.createHeaderNoAuth()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // -------------------------------USER---------------------------------------
    login({username, password}, onOK, onError) {
        axios.post(AppConstants.API_AUTH_URL + "/auth/local",
            JSON.stringify({'identifier': username, 'password': password}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(true)}) // noUseAuth = true
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserProfile(onOK, onError) {
        axios.get(AppConstants.API_USER_URL + "/users/me",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    
    //product {id, name, quantity, oldPrice, newPrice, discountPercent}
    addUserCartItem(userId, productId, quantity, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/order-carts",
            JSON.stringify({'UserID': userId, 'ProductID': productId, 'Quantity': quantity}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    deleteUserCartItem(itemID, onOK, onError) {
        axios.delete(AppConstants.API_ORDER_URL + "/order-carts/" + itemID,
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserCartItems(userId, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/order-carts?UserID=" + userId,
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }



    getSomeProducts(productIds, onOK, onError) {
        let queryStr = "";
        productIds.forEach((element, idx) => {
            if (idx == 0) {
                queryStr += "?id_in=" + element;
            } else {
                queryStr += "&id_in=" + element;
            }
        });
        axios.get(AppConstants.API_CMS_URL + "/prod-products" + queryStr,
            { headers: this.createHeaderNoAuth()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // Recent Views, Favorite, Cart---------------------------------------
    addUserRecentViews(userId, productId, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/recent-views",
            JSON.stringify({'UserID': userId, 'ProductID': productId}),
        // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserRecentViews(userId, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/recent-views?UserID=" + userId,
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    addUserFavorites(userId, productId, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/favorites",
            JSON.stringify({'UserID': userId, 'ProductID': productId}),
        // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    deleteUserFavorites(itemID, onOK, onError) {
        axios.delete(AppConstants.API_ORDER_URL + "/favorites/" + itemID,
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserFavorites(userId, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/favorites?UserID=" + userId,
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }



    addUserOrder(orderInfo, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/orders",
            JSON.stringify(orderInfo),
        // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    addUserOrderItem(orderItemInfo, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/order-items",
            JSON.stringify(orderItemInfo),
        // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserOrderByOrderNumber(orderNumber, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/orders?OrderNumber="+orderNumber,
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserOrderItemByOrderNumber(orderNumber, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/order-items?ParentOrderNumber="+orderNumber,
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

}

const backend = new Backend();
export default backend;
