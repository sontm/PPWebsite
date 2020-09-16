import axios from 'axios';
import AppConstants, {LOCAL_CSRF_TOKEN} from './AppConstant'

class Backend {
    constructor() {
    }
    createHeader() {
        //if(Cookies.get('XSRF-TOKEN')) {
        if (localStorage.getItem(LOCAL_CSRF_TOKEN)) {
            var headers = {
                            'Content-Type': 'application/json',
                            // 'Access-Control-Allow-Credentials':true, // CORS error ??
                            //'Authorization': 'CSRF-TOKEN ' + localStorage.getItem(LOCAL_CSRF_TOKEN)
                            //'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_CSRF_TOKEN)
                        };
        } else {
            var headers = {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Credentials':false,
            };
        }
        return headers;
    }

    // -------------------------------Category-Brands---------------------------------------
    getAllCategories(onOK, onError) {
        console.log("getAllCategories")
        console.log("  " + AppConstants.API_URL + "/prod-categories")
        axios.get(AppConstants.API_URL + "/prod-categories",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // -------------------------------USER---------------------------------------
    login({username, password}, onOK, onError) {
        axios.post("http://localhost:8080/auth/login",
            JSON.stringify({'email': username, 'password': password}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserProfile(onOK, onError) {
        axios.get("http://localhost:8080/profile",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    
    //product {id, name, quantity, oldPrice, newPrice, discountPercent}
    addUserCartItem(userId, product, onOK, onError) {
        axios.post("http://localhost:5000" + "/order/cart",
            JSON.stringify({'userId': userId, 'product': product}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
}

const backend = new Backend();
export default backend;
