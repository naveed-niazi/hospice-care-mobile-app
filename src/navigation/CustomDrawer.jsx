import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
//---icons
import VisitIcon from "../assets/icons/VisitIcon";
import PrivacyIcon from "../assets/icons/PrivacyIcon";
import SettingIcon from "../assets/icons/SettingIcon";
import HelpIcon from "../assets/icons/HelpIcon";

//---
import { Avatar, Title, Caption } from "react-native-paper";
import {
    FONT_COLOR_PRIMARY,
    FONT_COLOR_INACTIVE,
    BORDER_COLOR_PRIMARY,
    BORDER_COLOR_INACTIVE,
    SECONDARY_COLOR,
    PRIMARY_COLOR_LIGHT,
    PRIMARY_COLOR,
} from "../theme/colors";
import { ACs } from "../store/actions";
import InitialIcon from "../components/InitialIcon";

const CustomDrawer = (props) => {
    const profilePicture = useSelector((state) => state?.user?.profileURI);
    const userInfo = useSelector((state) => state?.user.userInfo);
    const name = `${userInfo?.firstName} ${userInfo?.lastName}`;
    const email = userInfo?.email;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = navigation?.getCurrentRoute()?.name;
    return (
        <View style={{ flex: 1, margin: 0, padding: 0 }}>
            <DrawerContentScrollView
                {...props}
                style={{ margin: 0, padding: 0 }}
                contentContainerStyle={{ margin: 0, padding: 0 }}
            >
                <View style={styles.drawerContent}>
                    {/* Profile Section of the side Drawer */}
                    <View style={styles.userInfoSection}>
                        <View
                            style={{ flexDirection: "row", marginTop: 15 }}
                        >
                            <View>
                                {profilePicture ? (
                                    <Avatar.Image
                                        source={{ uri: profilePicture }}
                                        size={60}
                                    />
                                ) : (
                                    <InitialIcon name={name} size={28} />
                                )}
                                <View style={styles.toggler_icon}>
                                    <Icon
                                        type="entypo"
                                        name="edit"
                                        color={FONT_COLOR_PRIMARY}
                                        size={10}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    marginLeft: 15,
                                    flexDirection: "column",
                                }}
                            >
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>
                                    {email}
                                </Caption>
                            </View>
                        </View>
                    </View>
                    {/* Links Section of the side Drawer */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <VisitIcon
                                color={color}
                                size={size}
                                style={styles.drawerItem}
                            />
                        )}
                        focused={route === "Visits"}
                        activeTintColor={SECONDARY_COLOR}
                        activeBackgroundColor={PRIMARY_COLOR_LIGHT}
                        label="Visits"
                        labelStyle={{
                            color: FONT_COLOR_PRIMARY,
                            fontFamily:
                                route === "Visits" ? "Inter-Bold" : "Inter",
                        }}
                        onPress={() => {
                            props.navigation.navigate("Visits", {
                                patientNumber: "100001",
                            });
                        }}
                        itemStyle={{ margin: 0, padding: 0 }}
                        style={
                            route === "Visits" && {
                                borderRightColor: SECONDARY_COLOR,
                                borderRightWidth: 3,
                                borderRadius: 0,
                            }
                        }
                    />
                    <View style={styles.drawerSectionMiddle}></View>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <SettingIcon
                                color={color}
                                size={size}
                                style={styles.drawerItem}
                            />
                        )}
                        focused={route === "Settings"}
                        activeTintColor={SECONDARY_COLOR}
                        activeBackgroundColor={PRIMARY_COLOR_LIGHT}
                        label="Settings"
                        labelStyle={{
                            color: FONT_COLOR_PRIMARY,
                            fontFamily:
                                route === "Settings" ? "Inter-Bold" : "Inter",
                        }}
                        onPress={() => {
                            props.navigation.navigate("Settings");
                        }}
                        itemStyle={{ margin: 0, padding: 0 }}
                        style={
                            route === "Settings" && {
                                borderRightColor: SECONDARY_COLOR,
                                borderRightWidth: 3,
                                borderRadius: 0,
                            }
                        }
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <HelpIcon
                                type="feather"
                                name="help-circle"
                                color={color}
                                size={size}
                                style={styles.drawerItem}
                            />
                        )}
                        focused={route === "Help"}
                        activeTintColor={SECONDARY_COLOR}
                        activeBackgroundColor={PRIMARY_COLOR_LIGHT}
                        label="Help"
                        labelStyle={{
                            color: FONT_COLOR_PRIMARY,
                            fontFamily:
                                route === "Help" ? "Inter-Bold" : "Inter",
                        }}
                        onPress={() => {
                            props.navigation.navigate("Help");
                        }}
                        itemStyle={{ margin: 0, padding: 0 }}
                        style={
                            route === "Help" && {
                                borderRightColor: SECONDARY_COLOR,
                                borderRightWidth: 3,
                                borderRadius: 0,
                            }
                        }
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <PrivacyIcon
                                color={color}
                                size={size}
                                style={styles.drawerItem}
                            />
                        )}
                        focused={route === "Privacy"}
                        activeTintColor={SECONDARY_COLOR}
                        activeBackgroundColor={PRIMARY_COLOR_LIGHT}
                        label="Privacy"
                        labelStyle={{
                            color: FONT_COLOR_PRIMARY,
                            fontFamily:
                                route === "Privacy" ? "Inter-Bold" : "Inter",
                        }}
                        onPress={() => {
                            props.navigation.navigate("Privacy");
                        }}
                        itemStyle={{ margin: 0, padding: 0 }}
                        style={
                            route === "Privacy" && {
                                borderRightColor: SECONDARY_COLOR,
                                borderRightWidth: 3,
                                borderRadius: 0,
                            }
                        }
                    />
                    <View style={styles.drawerSectionMiddle}></View>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                type="material-icons"
                                name="logout"
                                color={color}
                                size={size}
                                style={styles.drawerItem}
                            />
                        )}
                        activeTintColor={SECONDARY_COLOR}
                        activeBackgroundColor={PRIMARY_COLOR_LIGHT}
                        label="Logout"
                        labelStyle={{
                            color: FONT_COLOR_PRIMARY,
                            fontFamily:
                                route === "Logout" ? "Inter-Bold" : "Inter",
                        }}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            dispatch(ACs.signout());
                        }}
                        itemStyle={{ margin: 0, padding: 0 }}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginHorizontal: -10,
        paddingHorizontal: 0,
        marginTop: 20,
    },
    userInfoSection: {
        paddingLeft: 15,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR_PRIMARY,
    },
    toggler_icon: {
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        backgroundColor: SECONDARY_COLOR,
        width: 20,
        height: 20,
        borderRadius: 15,
        justifyContent: "center",
        position: "absolute",
        top: 40,
        left: 40,
    },
    title: {
        fontSize: 18,
        color: FONT_COLOR_PRIMARY,
        marginTop: 3,
        letterSpacing: 0,
        fontFamily: "Inter-Bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 17,
        color: FONT_COLOR_INACTIVE,
    },
    row: {
        marginTop: 20,
        marginHorizontal: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3,
    },
    drawerItem: {
        marginLeft: 10,
    },
    drawerSection: {
        margin: -10,
        paddingHorizontal: 0,
        borderWidth: 0,
    },
    drawerSectionMiddle: {
        borderTopColor: BORDER_COLOR_INACTIVE,
        borderTopWidth: 2,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
    },
    bottomDrawerSection: {
        margin: -10,
        marginBottom: 15,
        borderWidth: 0,
        // borderTopWidth: 1,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
        color: FONT_COLOR_PRIMARY,
        fontFamily: "Inter",
    },
});
