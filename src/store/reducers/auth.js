import { actions } from "../actions";
import { IDOL, LOADING } from "../../constants";

const initalState = {
    authInfo: {},
    isLoggedIn: false,
    errMessage: "",
    offlineLoginCheck: IDOL,
    notesOffline: false,
    patienDetailOffline: false,
    isOnline: false,
    dataSync: IDOL,
};
let newState = {};
const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case actions.SIGNIN:
            newState = {
                ...state,
                authInfo: action.payload.authInfo ?? {},
                offlineLoginCheck:
                    action.payload.offlineLoginCheck ?? state.offlineLoginCheck,
                errMessage: action.payload.errMessage ?? state.errMessage,
            };

            return newState;

        case actions.GET_USERINFO:
            newState = {
                ...state,
                isLoggedIn: action.payload.userInfo ? true : false,
            };

            return newState;
        case actions.CLEAR_ERROR:
            newState = { ...state, errMessage: "" };

            return newState;
        case actions.SIGNOUT:
            newState = { ...state, isLoggedIn: false };

            return newState;
        case actions.NET_STATUS:
            newState = { ...state, isOnline: action.payload.isOnline };

            return newState;
        case actions.OFFLINE_LOGIN:
            newState = {
                ...state,
                offlineLoginCheck: action.payload.offlineLoginCheck,
            };
            return newState;
        case actions.PROGRESS_NOTES_OFFLINE_SUCCESS:
            return {
                ...state,
                notesOffline: true,
            };
        case actions.PATIENT_DETAIL_OFFLINE_SUCCESS:
            return {
                ...state,
                patienDetailOffline: true,
            };
        case actions.SYNC_START:
            return {
                ...state,
                dataSync: LOADING,
                notesOffline: false,
                patienDetailOffline: false,
            };
        case actions.SYNC_COMPLETE:
            return {
                ...state,
                dataSync: IDOL,
            };
        default:
            return state;
    }
};

export default authReducer;
