import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
//---
import {
    FONT_COLOR_PRIMARY,
    FONT_COLOR_INACTIVE,
    PRIMARY_COLOR_LIGHT,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    BUTTON_INACTIVE,
} from "../theme/colors";
import commonStyles from "../theme/commonStyles";
import { EvilIcons } from "@expo/vector-icons";

import { ACs } from "../store/actions";
import ShowThumbnail from "../components/ShowThumbnail";
//---
const NavigationSideStructure = (props) => {
    const goBack = () => {
        props.navigationProps.goBack();
    };
    return (
        <TouchableOpacity activeOpacity={1} onPress={goBack}>
            <View style={styles.toggler_icon}>
                <Icon
                    type="entypo"
                    name="cross"
                    color={FONT_COLOR_INACTIVE}
                    size={26}
                />
            </View>
        </TouchableOpacity>
    );
};

const ProfilePicture = ({ route, navigation }) => {
    const profilePicture = useSelector((state) => state?.user?.profileURI);
    const [refresh, setRefresh] = useState(0);
    const dispatch = useDispatch();
    // setting up all the header styling and functionality
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 100, backgroundColor: PRIMARY_COLOR },
            title: "Profile Picture",
            headerTitleAlign: "center",
            headerLeft: () => (
                <NavigationSideStructure navigationProps={navigation} />
            ),
        });
    }, [navigation]);

    const imagePicker = async (pickerType) => {
        setRefresh(refresh + 1);
        navigation.navigate("PickedImage", { pickerType, refresh });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: PRIMARY_COLOR_DARK , flex:1}}>
                <View style={styles.image_view}>
                    {profilePicture ? (
                        <Image
                            style={styles.image}
                            source={{ uri: profilePicture }}
                        />
                    ) : (
                        <View
                            style={{
                                ...styles.image,
                                backgroundColor: PRIMARY_COLOR,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View style={styles.icon_area}>
                                <EvilIcons
                                    name="image"
                                    size={50}
                                    color={BUTTON_INACTIVE}
                                />
                            </View>
                            <Text style={styles.no_profile}>
                                No Profile Picture
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.controls_area}>
                    <View
                        style={commonStyles.RowAlignStart}
                        onTouchEnd={() => imagePicker("gallery")}
                    >
                        <Icon
                            type="ant-design"
                            name="picture"
                            color={FONT_COLOR_INACTIVE}
                            size={24}
                            style={{ margin: 15 }}
                        />
                        <Text style={styles.option_text_colors}>
                            Select from library
                        </Text>
                    </View>
                    <View
                        style={commonStyles.RowAlignStart}
                        onTouchEnd={() => imagePicker("camera")}
                    >
                        <Icon
                            type="feather"
                            name="camera"
                            color={FONT_COLOR_INACTIVE}
                            size={24}
                            style={{ margin: 15 }}
                        />
                        <Text style={styles.option_text_colors}>
                            Take a picture
                        </Text>
                    </View>
                    {/* conditional if image already exist */}
                    {profilePicture ? (
                        <View
                            style={{
                                ...commonStyles.RowAlignStart,
                            }}
                        >
                            <Icon
                                type="ant-design"
                                name="delete"
                                color={FONT_COLOR_INACTIVE}
                                size={24}
                                style={{ margin: 15 }}
                            />
                            <Text style={styles.option_text_colors}>
                                Delete profile picture
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfilePicture;

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width,
        left: 0,
        right: 0,
    },
    image_view: {
        marginVertical: 20,
    },
    toggler_icon: {
        marginLeft: 15,
        alignSelf: "center",
    },
    controls_area: {
        position:"absolute",
        bottom:15,
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
        width:"100%"
    },
    option_text_colors: {
        color: FONT_COLOR_PRIMARY,
        letterSpacing: 0,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: "Inter",
    },
    icon_area: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    no_profile: {
        marginTop: 10,
        fontFamily: "Inter-Bold",
        fontSize: 16,
        textAlign: "center",
        color: BUTTON_INACTIVE,
    },
});
