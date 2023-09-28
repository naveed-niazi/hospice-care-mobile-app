import { authApi, routes } from "../../api";
import { FAILURE, NO_NEED, SUCCESS } from "../../constants";
import store from "..";
import { ACs } from "./index";
import utils from "../../utils";
import { OFFLINE_LOGIN } from "./offlineActions";
var qs = require("qs");

//---actions
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SYNC_START = "SYNC_START";
export const SYNC_COMPLETE = "SYNC_COMPLETE";
//---action creators (ACs)
export const signin = ({ email, password, stayLoggedIn }) => {
    return (dispatch) => {
        authApi
            .post(
                "/token",
                qs.stringify({
                    password: password,
                    username: email,
                    client_id: "pim-login",
                    grant_type: "password",
                })
            )
            .then((response) => {
                response.data.stayLoggedIn = stayLoggedIn;
                dispatch({
                    type: SIGNIN,
                    payload: {
                        authInfo: response.data,
                    },
                });
                // until we don't have refresh token api we will save user credentials in db
                // by dispatching another action
                dispatch(ACs.getUserInfo());
            })
            .catch((err) => {
                // dipatching to store error in database
                dispatch({
                    type: SIGNIN,
                    payload: {
                        errMessage:
                            utils.getCamelCase(
                                err?.response?.data?.error_description
                            ) ?? "Login Failed!",
                    },
                });
                dispatch({
                    type: OFFLINE_LOGIN,
                    payload: { offlineLoginCheck: SUCCESS },
                });
            });
    };
};

export const clearError = () => {
    return { type: CLEAR_ERROR };
};

export const syncData = () => {
    /*
     * On Press, we will set the offline dataLoaded to false
     * then first we will send all the offline data at once
     * after that we will load all the new data and merge it
     * with old data
     */
    return (dispatch) => {
        // first dispatch is to set loading
        dispatch({ type: SYNC_START });
        dispatch(ACs.postOfflineNotes(null, null, true));
        dispatch(ACs.getVisitsList());
    };
};

export const syncComplete = () => {
    return { type: SYNC_COMPLETE };
};
export const signout = () => {
    return { type: SIGNOUT };
    // remove the data from database
    // ret  urn (dispatch) => {
    //     db.get("userInfo")
    //         .then((doc) => db.remove(doc))
    //         .then(() => dispatch({ type: SIGNOUT }));
    // };
};
