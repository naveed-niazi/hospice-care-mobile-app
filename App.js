import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider, Box } from "native-base";

//---
import { useNetInfo } from "@react-native-community/netinfo";
import { persistor, store } from "./src/store";
import { PRIMARY_COLOR } from "./src/theme/colors";
import MainNavigation from "./src/navigation/MainNavigation";
import { ACs } from "./src/store/actions";
import { FAILURE, IDOL, SUCCESS } from "./src/constants";
import Alert from "./src/components/Alert";
require("./src/store/actions/offlineActions");
const fetchFonts = () => {
    return Font.loadAsync({
        Inter: require("./assets/fonts/Inter-Regular.ttf"),
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    });
};
const App = (props) => {
    const dispatch = useDispatch();
    

    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        dispatch(ACs.checkNetStatus());
    }, []);
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={() => setDataLoaded(true)}
            />
        );
    }
    return (
        <SafeAreaView style={styles.main}>
            <NativeBaseProvider>
                <StatusBar backgroundColor={PRIMARY_COLOR} />
                <MainNavigation image={props.imageToShare} />
            </NativeBaseProvider>
            
        </SafeAreaView>
    );
};

export default (props) => {
    console.log(props)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App imageToShare={props.image} />
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: PRIMARY_COLOR,
    },
});
