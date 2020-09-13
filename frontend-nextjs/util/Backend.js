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
                            'Authorization': 'CSRF-TOKEN ' + localStorage.getItem(LOCAL_CSRF_TOKEN)
                        };
        } else {
            var headers = {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials':true
            };
        }
        return headers;
    }

    // Category-Brands---------------------------------------
    getAllCategories(onOK, onError) {
        console.log("getAllCategories")
        console.log("  " + AppConstants.API_URL + "/prod-categories")
        axios.get(AppConstants.API_URL + "/prod-categories",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
}

const backend = new Backend();
export default backend;
