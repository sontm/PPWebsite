export const LOCAL_RECENT_VIEWED = "LOCAL_RECENT_VIEWED";
export const LOCAL_CART_ADDED = "LOCAL_CART_ADDED";
export const LOCAL_JWT_TOKEN = "LOCAL_JWT_TOKEN";
export const LOCAL_CSRF_TOKEN = "LOCAL_CSRF_TOKEN";

export const CONFIG_PRICE_DIVIDED_RANGE = 5;
export const CONFIG_PRICE_ROUNDUP_TO = 10000;

export const API_BASE_URL = 'http://localhost:4000/graphql';
export const ACCESS_TOKEN = 'accessToken';
export const STORAGE_CART_PROD = 'cartProdIds';

export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;
export const CONFIG_MAX_PRODUCT_PRICE = 1000000000;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

//DISCOUNT_TYPE_DISCOUNT, DISCOUNT_TYPE_COUPON, DISCOUNT_TYPE_GIFT
export const DISCOUNT_TYPE_DISCOUNT = "discount";
export const DISCOUNT_TYPE_COUPON = "coupon";
export const DISCOUNT_TYPE_GIFT = "gift";

export default class AppConstants  {
    static get API_AUTH_URL() {
        //return "http://localhost";
        return "http://localhost:1337";
    }
    static get API_CMS_URL() {
        // For Products, Categories
        // return "http://localhost/cms";
        return "http://localhost:1337";
    }
    static get API_USER_URL() {
        // For Profile...
        //return "http://localhost/account/admin";
        return "http://localhost:1337";
    }
    static get API_ORDER_URL() {
        // Carts, Orders
        //return "http://localhost/user";
        return "http://localhost:1337";
    }

    static addProductToRecentView(id) {
        let v = localStorage.getItem(LOCAL_RECENT_VIEWED);
        if (!v) {
            v = "";
        }
        if (v.indexOf(":" + id + ":") <= -1) {
            // add if not exist
            v += "" + id + ":";
            localStorage.setItem(LOCAL_RECENT_VIEWED, v);
        }
    }
    static getProductRecentView() {
        let v = localStorage.getItem(LOCAL_RECENT_VIEWED);
        let result = [];
        if (v) {
            let vArr = v.split(":")
            
            vArr.forEach(e => {
                if (e && e != "") {
                    result.push(e);
                }
            });
        }
        return result;
    }
}

