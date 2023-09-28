//imports
import * as FileSystem from "expo-file-system";
import api from "../../api";
import { OFFLINE_LOGIN } from "./offlineActions";
import { FAILURE, SUCCESS } from "../../constants";
import db from "../../db";
import store from "..";
var qs = require("qs");

//---actions
export const NEW_PROFILE = "NEW_PROFILE";
export const UPDATE_USERINFO = "UPDATE_USERINFO";
export const GET_USERINFO = "GET_USERINFO";

//---action creators (ACs)
export const getUserInfo = () => {
    return async (dispatch) => {
        // first we will check the internet connection information
        const isConnected = store.getState().auth.isOnline;
        console.log("Coneection Checkup Going On", isConnected);
        if (isConnected) {
            api.get("/proxy/pim/web/api/user/currentinfo", {
                params: {
                    agency: "demo1",
                },
            })
                .then((response) => {
                    dispatch({
                        type: GET_USERINFO,
                        payload: { userInfo: response.data },
                    });
                    dispatch({
                        type: OFFLINE_LOGIN,
                        payload: { offlineLoginCheck: SUCCESS },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: GET_USERINFO,
                        payload: { errMessage: "Unable to Load User Info" },
                    });
                    dispatch({
                        type: OFFLINE_LOGIN,
                        payload: { offlineLoginCheck: FAILURE },
                    });
                });
        } else {
            // try and load data from the offline store
            db.get("user")
                .then((data) => {
                    dispatch({
                        type: GET_USERINFO,
                        payload: { userInfo: data.userInfo },
                    });
                })
                .catch((err) => {});
        }
    };
};
export const addNewProfile = (image) => {
    return async (dispatch) => {
        const fileName = image.split("/").pop();
        try {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory);
        } catch (err) {
            //NOT GONNA DO ANYTHING
        }
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });
        } catch (err) {
        } finally {
            dispatch({ type: NEW_PROFILE, payload: { image: newPath } });
        }
    };
};

export const getProfilePicture = () => {
    return async (dispatch) => {
        db.get("profilePath")
            .then((resData) => {
                dispatch({
                    type: NEW_PROFILE,
                    payload: { image: resData.imagePath },
                });
            })
            .catch((err) => {});
    };
};
