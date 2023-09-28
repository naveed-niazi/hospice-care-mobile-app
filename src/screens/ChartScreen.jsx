import React, { useLayoutEffect } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
//---
import {
    FONT_COLOR_INACTIVE,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR,
} from "../theme/colors";
import RenderReport from "../components/RenderReport";
import { ScrollView } from "react-native-gesture-handler";
import CrossIcon from "../assets/icons/CrossIcon";
//---
const NavigationSideStructure = (props) => {
    const goBack = () => {
        props.navigationProps.goBack();
    };
    return (
        <TouchableOpacity activeOpacity={1} onPress={goBack}>
            <View style={styles.toggler_icon}>
                <CrossIcon/>
            </View>
        </TouchableOpacity>
    );
};

const ChartScreen = ({ route, navigation }) => {
    const { patientNumber } = route.params;

    // setting up all the header styling and functionality
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 50, backgroundColor: PRIMARY_COLOR },
            title: "Chart",
            headerTitleAlign: "center",
            headerLeft: () => (
                <NavigationSideStructure navigationProps={navigation} />
            ),
            headerRight: null,
        });
    }, [navigation]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: FONT_COLOR_PRIMARY,
            }}
        >
                    <RenderReport patientNumber={patientNumber} />
        </SafeAreaView>
    );
};

export default ChartScreen;

const styles = StyleSheet.create({
    main_div: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
    },
    toggler_icon: {
        marginLeft: 15,
        alignSelf: "center",
    },
});
