import React, { useEffect, useState, memo } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
//---
import { useSelector } from "react-redux";
//---
import {
    SECONDARY_COLOR,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR,
} from "../theme/colors";
import InitialIcon from "./InitialIcon";

const NavigationDrawerIcon = () => {
    const profilePicture = useSelector((state) => state?.user.profileURI);
    const userInfo = useSelector((state) => state?.user.userInfo);
    const [name, setName] = useState(
        `${userInfo?.firstName} ${userInfo?.lastName}`
    );
    const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.toggleDrawer();
    };
    useEffect(() => {
        setName(`${userInfo?.firstName} ${userInfo?.lastName}`);
    }, [userInfo]);

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => toggleDrawer()}>
            <View style={styles.toggler_view}>
                <View>
                    {profilePicture ? (
                        <Avatar.Image
                            source={{ uri: profilePicture }}
                            size={50}
                        />
                    ) : (
                        <InitialIcon name={name} size={23} />
                    )}

                    <View style={styles.toggler_icon}>
                        <Icon
                            type="font-awesome"
                            name="bars"
                            color={FONT_COLOR_PRIMARY}
                            size={10}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(NavigationDrawerIcon);

const styles = StyleSheet.create({
    // all the header stylings
    toggler_view: {
        marginLeft: 15,
    },
    toggler_icon: {
        backgroundColor: SECONDARY_COLOR,
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        justifyContent: "center",
        position: "absolute",
        top: 30,
        left: 35,
    },
});
