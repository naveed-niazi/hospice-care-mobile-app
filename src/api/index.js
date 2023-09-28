import axios from "axios";
import store from "../store";
import { ACs } from "../store/actions";
//--- routes
const BASE_URL = "";
const AUTH_URL = "";
const DOC_URL = "";

const routes = {
    BASE_URL,
    AUTH_URL,
    DOC_URL,
};
//--- axios configurations
const authApi = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    baseURL: AUTH_URL,
});

const docApi = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    baseURL: DOC_URL,
});
docApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().auth.authInfo.access_token}`,
    };
    return config;
});

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().auth.authInfo.access_token}`,
    };
    return config;
});

api.interceptors.response.use(
    (response) => {
        const regex = new RegExp("<!");
        const regex2 = new RegExp("Log In");

        if (regex.test(response.data) || regex2.test(response.data)) {
            store.dispatch(ACs.signout());
        }
        return response;
    },
    async function (error) {
        console.log("getting the error", error);
        // incase of error we will check of status
        if (error?.response?.status == 403 || error?.response?.status == 401) {
            //incase of unauthroized we will log user out
            store.dispatch(ACs.signout());
        }
        return Promise.reject(error);
    }
);

export { docApi, authApi, routes, api };
export default api;
