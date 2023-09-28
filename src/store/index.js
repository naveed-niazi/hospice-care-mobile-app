import { createStore, combineReducers, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import FSStorage from "redux-persist-fs-storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import ReduxThunk from "redux-thunk";

import authReducer from "./reducers/auth";
import visitsReducer from "./reducers/visits";
import patientReducer from "./reducers/patients";
import userReducer from "./reducers/user";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    visits: visitsReducer,
    patients: patientReducer,
    user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// store is created that provides the data to the whole app
export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
export default store;
