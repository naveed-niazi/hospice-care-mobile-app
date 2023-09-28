/*this file contains all the actions to load the data
from local database into the application
*/

import NetInfo from "@react-native-community/netinfo";
// import { ACs } from ".";
// import store from "..";
// import { FAILURE, NO_NEED } from "../../constants";

export const NET_STATUS = "CHECK_OFFLINE";
export const OFFLINE_LOGIN = "OFFLINE_LOGIN";
export const OFFLINE_VISITS = "OFFLINE_VISITS";
export const OFFLINE_PATIENTS = "OFFLINE_PATIENTS";
import db from "../../db";
import { GET_USERINFO } from "./userActions";

// const unsubscribe = NetInfo.addEventListener((state) => {
//     console.log("Connection type", state.type);
//     console.log("Is connected?", state.isConnected);
// });

// // Unsubscribe
// // unsubscribe();
export const checkNetStatus = () => {
    console.log("internet connection checkup going on");
    return async (dispatch) => {
        NetInfo.fetch()
            .then((net) => {
                dispatch({
                    type: NET_STATUS,
                    payload: { isOnline: net.isConnected },
                });
            })
            .catch((err) => {});
    };
};

// export const offlineLogin = () => {
//     //offline login is very important topic
//     // Checking persistent storage to verify user login
//     console.log("offline auth going on");
//     return async (dispatch) => {
//         db.get("auth")
//             .then((data) => {
//                 //same user is logged in so find its profile path
//                 console.log(data);
//                 // now we have the auth data, I will check if the user is loggedIn or not
//                 if (data.authInfo.stayLoggedIn) {
//                     /*
//                     now we know user chose to stay logged In
//                     so for now we will send login request with credentials we had stored
//                 */
//                     return db.get("authInfo");
//                 } else {
//                     dispatch({
//                         type: OFFLINE_LOGIN,
//                         payload: { offlineLoginCheck: NO_NEED },
//                     });
//                 }
//             })
//             .then((data) => {
//                 /* now if i get some data init we know that user choose to stay logged in
//              with this information i will like to call the login function with the stored information
//             */
//                 if (data && data.username && data.password) {
//                     //    will be making login request
//                     console.log("request for login is sent");
//                     dispatch(
//                         ACs.signin({
//                             email: data.username,
//                             password: data.password,
//                             stayLoggedIn: true,
//                         })
//                     );
//                 } else {
//                     // login will be considered failure here as well
//                     dispatch({
//                         type: OFFLINE_LOGIN,
//                         payload: { offlineLoginCheck: FAILURE },
//                     });
//                 }
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: OFFLINE_LOGIN,
//                     payload: { offlineLoginCheck: FAILURE },
//                 });
//             });
//     };
// };

// export const offlineFieldCheck = () => {
//     console.log("offline field check going on ");
//     return (dispatch) => {
//         const isOnline = store.getState().auth.isOnline;
//         if (isOnline) {
//             dispatch(offlineLogin());
//         } else {
//             //now we know user is not onlint
//             db.get("auth")
//                 .then((data) => {
//                     // now we check if user chose to stay logged in or not
//                     if (!data.authInfo.stayLoggedIn) {
//                         dispatch({
//                             type: OFFLINE_LOGIN,
//                             payload: { offlineLoginCheck: FAILURE },
//                         });
//                     } else {
//                         console.log("bypassing the general work flow");
//                         // we will get the user info and bypass the login step
//                         db.get("user")
//                             .then((data) => {
//                                 dispatch({
//                                     type: GET_USERINFO,
//                                     payload: { userInfo: data.userInfo },
//                                 });
//                                 return db.get("visits");
//                             })
//                             .then((data) => {
//                                 // now we hav the visits data to display
//                                 dispatch({
//                                     type: OFFLINE_VISITS,
//                                     payload: { visits: data },
//                                 });
//                                 return db.get("patients");
//                             })
//                             .then((data) => {
//                                 //now i will probably have data of patients in my list
//                                 dispatch({
//                                     type: OFFLINE_PATIENTS,
//                                     payload: { patients: data },
//                                 });
//                             })
//                             .catch((err) => {
//                                 dispatch({
//                                     type: OFFLINE_LOGIN,
//                                     payload: { offlineLoginCheck: FAILURE },
//                                 });
//                             });
//                     }
//                 })
//                 .catch((err) => {
//                     dispatch({
//                         type: OFFLINE_LOGIN,
//                         payload: { offlineLoginCheck: FAILURE },
//                     });
//                 });
//         }
//     };
// };
