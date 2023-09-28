
import { actions } from "../actions";

const initalState = {
    userInfo: {},
    profileURI: "",
    errMessage: "",
};
let newState = {};
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case actions.GET_USERINFO:
            newState = {
                ...state,
                userInfo: action.payload.userInfo ?? state.userInfo,
                errMessage: action.payload.errMessage ?? state.errMessage,
            };
            
            return newState;
        case actions.NEW_PROFILE:
            newState = {
                ...state,
                profileURI: action.payload.image,
            };
            
            return newState;
        case actions.SIGNOUT:
            newState = { ...initalState };     
            return newState;
        default:
            return state;
    }
};

export default userReducer;
