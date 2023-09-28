import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, TextInput, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Icon } from "react-native-elements";
//---
import PatientNameList from "../components/PatientNameList";
import {
    BUTTON_INACTIVE,
    SECONDARY_COLOR,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR_LIGHT,
    PRIMARY_COLOR_DARK,
    FONT_COLOR_INACTIVE,
    PRIMARY_COLOR,
} from "../theme/colors";
import { ACs } from "../store/actions";
import utils from "../utils";
import { ERROR, IDOL, LOADING, SUCCESS } from "../constants";
import Alert from "../components/Alert";
//---
const ImageShareScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patients.patientList);
    const [placeholder, setPlaceHolder] = useState("Search...");
    const [patientsList, setPatientsList] = useState([]);
    const [name, setName] = useState("");
    const selectedId = useRef("afhskdjfah");
    const [result, showResult] = useState(IDOL);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 60 },
            headerLeft: () => (
                <Ionicons
                    name="chevron-back"
                    size={35}
                    color={BUTTON_INACTIVE}
                    style={{ marginLeft: 10 }}
                    onPress={goBack}
                />
            ),
            headerRight: () => (
                <Button
                    containerStyle={styles.button_container}
                    buttonStyle={styles.button_style}
                    titleStyle={styles.title}
                    disabled={result == LOADING}
                    disabledStyle={{
                        ...styles.button_style,
                        backgroundColor: BUTTON_INACTIVE,
                    }}
                    title="Send"
                    onPress={shareImage}
                />
            ),
            title: "Hummingbird",
        });
    }, [navigation, result]);
    useEffect(() => {
        setPatientsList(
            patients?.filter((patient) => {
                if (
                    patient.firstName
                        .toLowerCase()
                        .indexOf(name.toLowerCase()) > -1
                )
                    return patient;
            })
        );
    }, [name, patients]);

    useEffect(() => {
        dispatch(ACs.getPatientsList());
    }, []);

    const shareImage = () => {
        showResult(LOADING);
        utils.shareImage(route.params.image, selectedId.current, (res) => {
            if (res?.status) {
                showResult(SUCCESS);
                setTimeout(() => {
                    BackHandler.exitApp();
                }, 1000);
            } else {
                showResult(ERROR);
            }
        });
    };
    useEffect(() => {}, [selectedId]);
    const goBack = () => {
        BackHandler.exitApp();
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: PRIMARY_COLOR_DARK }}>
                <Image
                    style={styles.image}
                    source={{ uri: route.params.image }}
                />
            </View>
            <View style={styles.search_area}>
                <View
                    style={{
                        ...styles.inputContainer,
                        ...commonStyles.RowAlignStart,
                        alignItems: "center",
                        margin: 15,
                        marginBottom: 20,
                    }}
                >
                    <View style={styles.icon_container}>
                        <Icon
                            type="ant-design"
                            name="search1"
                            color={BUTTON_INACTIVE}
                            size={24}
                        />
                    </View>
                    <TextInput
                        mode="flat"
                        selectionColor={FONT_COLOR_INACTIVE}
                        blurOnSubmit={false}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                        placeholder={placeholder}
                        onFocus={() => setPlaceHolder("")}
                        onBlur={() => setPlaceHolder("Search...")}
                        placeholderTextColor={BUTTON_INACTIVE}
                        multiline
                    />
                </View>
                <PatientNameList
                    patients={patientsList}
                    selectedId={selectedId}
                    setSelectedId={(id) => (selectedId.current = id)}
                />
            </View>
            {result == SUCCESS ? (
                <Alert message={"Photo Uploaded Successfully"} type={SUCCESS} />
            ) : result == ERROR ? (
                <Alert message={"Unable to upload photo"} type={ERROR} />
            ) : null}
        </View>
    );
};

export default ImageShareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR,
        margin: 0,
        padding: 0,
    },
    low_container: {
        backgroundColor: PRIMARY_COLOR_LIGHT,
        marginTop: 10,
        marginHorizontal: 0,
        paddingHorizontal: 0,
    },
    image: {
        height: 200,
        width: 200,
    },
    button_container: {
        height: 35,
        width: 70,
        marginRight: 15,
        borderRadius: 4,
        padding: 0,
        backgroundColor: SECONDARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
    },
    button_style: {
        backgroundColor: SECONDARY_COLOR,
        alignContent: "center",
        alignSelf: "center",
        marginTop: -3,
    },
    title: {
        fontWeight: "bold",
        letterSpacing: 0.5,
        textAlign: "center",
        color: FONT_COLOR_PRIMARY,
    },
    search_area: {
        marginTop: 20,
        flex: 1,
        width: "100%",
        backgroundColor: PRIMARY_COLOR_LIGHT,
    },
    inputContainer: {
        marginTop: 25,
        borderColor: "rgba(116,120,128,0.16)",
        backgroundColor: "#292E3B",
        borderRadius: 6,
        padding: 12,
        borderWidth: 0,
    },
    icon_container: {
        marginRight: 25,
    },
    input: {
        color: FONT_COLOR_INACTIVE,
        // fontFamily:"Inter",
        lineHeight: 20,
        width: 250,
    },
});
