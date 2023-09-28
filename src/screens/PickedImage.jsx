import React, { useLayoutEffect, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ImageBackground,
    Text,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
    BUTTON_INACTIVE,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK_V2,
    SECONDARY_COLOR,
    FONT_COLOR_SECONDARY,
} from "../theme/colors";
import ShowThumbnail from "../components/ShowThumbnail";
import { ACs } from "../store/actions";
// import { SafeAreaView } from "react-native-safe-area-context";

const imageConfiguration = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
};

const PickedImage = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { pickerType, refresh } = route.params;
    const [pickedImage, setPickedImage] = useState("");

    const load = async (pickerType) => {
        let permissionResult =
            pickerType === "camera"
                ? await ImagePicker.requestCameraPermissionsAsync()
                : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera is required!", [
                { text: "Okay" },
            ]);
            // alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult =
            pickerType === "camera"
                ? await ImagePicker.launchCameraAsync(imageConfiguration)
                : await ImagePicker.launchImageLibraryAsync(imageConfiguration);

        if (pickerResult.cancelled === true)
            navigation.navigate("ProfilePicture");
        setPickedImage(pickerResult.uri);
        // dispatch(ACs.addNewProfile(pickerResult.uri));
    };

    const goBack = () => {
        navigation.goBack();
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 60 },
            headerLeft: () =>
                pickedImage ? (
                    <Ionicons
                        name="chevron-back"
                        size={35}
                        color={BUTTON_INACTIVE}
                        style={{ marginLeft: 10 }}
                        onPress={goBack}
                    />
                ) : null,
            headerRight: () => null,
            title: pickedImage ? "Photo" : null,
        });
    }, [navigation, pickedImage]);
    useEffect(() => {
        load(pickerType);
    }, [refresh]);
    return (
        <View style={styles.main_view}>
            {pickedImage ? (
                <View>
                    <View style={styles.image_View}>
                        <ShowThumbnail image={pickedImage} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ position: "absolute", bottom: 50 }}>
                            <Button
                                containerStyle={styles.button_container}
                                buttonStyle={styles.button_style}
                                titleStyle={styles.title}
                                title="Choose"
                                onPress={() => {
                                    dispatch(ACs.addNewProfile(pickedImage));
                                    navigation.navigate("PatientsList");
                                }}
                            />
                        </View>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
};

export default PickedImage;

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        alignItems: "center",
    },
    image_View: {
        marginTop: 100,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width,
    },
    button_container: {
        marginHorizontal: 20,
        width: Dimensions.get("screen").width - 40,
        height: 48,
        borderRadius: 4,
        backgroundColor: SECONDARY_COLOR,
        justifyContent: "center",
    },
    button_style: {
        backgroundColor: SECONDARY_COLOR,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
        textAlign: "center",
        color: FONT_COLOR_PRIMARY,
    },
    nothing: {
        display: "flex",
        backgroundColor: PRIMARY_COLOR,
    },
});
