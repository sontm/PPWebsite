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
    createHeader() {
        //if(Cookies.get('XSRF-TOKEN')) {
        if (localStorage.getItem(LOCAL_CSRF_TOKEN)) {
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

    // -------------------------------USER---------------------------------------
    login({username, password}, onOK, onError) {
        axios.post(AppConstants.API_AUTH_URL + "/auth/login",
            JSON.stringify({'email': username, 'password': password}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserProfile(onOK, onError) {
        axios.get(AppConstants.API_USER_URL + "/profile",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    
    //product {id, name, quantity, oldPrice, newPrice, discountPercent}
    addUserCartItem(userId, productId, quantity, onOK, onError) {
        axios.post(AppConstants.API_ORDER_URL + "/order/cart",
            JSON.stringify({'userId': userId, 'productId': productId, 'quantity': quantity}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeaderNoAuth(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserCartItems(userId, onOK, onError) {
        axios.get(AppConstants.API_ORDER_URL + "/order/cart/" + userId,
            { headers: this.createHeaderNoAuth(),})
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
}

const backend = new Backend();
export default backend;
