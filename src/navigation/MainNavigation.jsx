import React, { useCallback } from "react";
import { useSelector } from "react-redux";
//---
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//---
import SigninScreen from "../screens/SigninScreen";
import VisitsScreen from "../screens/VisitsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpScreen from "../screens/HelpScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import NotificationScreen from "../screens/NotificationScreen";
import VisitDetailScreen from "../screens/VisitDetailScreen";
//---
import { navigationRef } from "./RootNavigation";
import CustomDrawer from "./CustomDrawer";
//---
import { PRIMARY_COLOR, FONT_COLOR_PRIMARY } from "../theme/colors";
import ProfilePicture from "../screens/ProfilePicture";
import ImageShareScreen from "../screens/ImageShareScreen";
import PatientsListScreen from "../screens/PatientsListScreen";
import NavigationDrawerIcon from "../components/NavigationDrawerIcon";
import ReloadandNotification from "../components/ReloadandNotification";
import PickedImage from "../screens/PickedImage";
import ChartScreen from "../screens/ChartScreen";

const Drawer = createDrawerNavigator();

export default function MainNavigation({ image }) {
    const auth = useSelector((state) => state.auth);
    const Theme = {
        ...DefaultTheme,
        fontFamily: "Inter",
        colors: {
            ...DefaultTheme.colors,
            primary: PRIMARY_COLOR,
            background: PRIMARY_COLOR,
            text: FONT_COLOR_PRIMARY,
            border: PRIMARY_COLOR,
            card: PRIMARY_COLOR,
        },
    };
    const horizontalAnimation = {
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };
    const headerLeft = useCallback(() => <NavigationDrawerIcon />, []);
    const headerRight = useCallback(() => <ReloadandNotification />, []);

    return (
        <NavigationContainer theme={Theme} ref={navigationRef}>
            <Drawer.Navigator
                initialRouteName="Signin"
                screenOptions={{
                    headerLeft: headerLeft,
                    headerRight: headerRight,
                    headerTitleAlign: "center",
                    drawerStyle: {
                        width: 320,
                        paddingLeft: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        fontFamily: "Inter",
                    },
                    headerStyle: {
                        height: 100,
                        backgroundColor: PRIMARY_COLOR,
                    },
                }}
                backBehavior="history"
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                {auth.isLoggedIn ? (
                    <>
                        {image ? (
                            <Drawer.Screen
                                name={"ImageShare"}
                                initialParams={{ image }}
                                component={ImageShareScreen}
                            />
                        ) : null}
                        <Drawer.Screen name="Visits" component={VisitsScreen} />
                        <Drawer.Screen
                            name="PatientsList"
                            component={PatientsListScreen}
                        />
                        <Drawer.Screen
                            name="Settings"
                            component={SettingsScreen}
                        />
                        <Drawer.Screen name="Help" component={HelpScreen} />
                        <Drawer.Screen
                            name="Privacy"
                            component={PrivacyScreen}
                        />
                        <Drawer.Screen
                            name="Notification"
                            component={NotificationScreen}
                        />
                        <Drawer.Screen
                            name="VisitDetail"
                            component={VisitDetailScreen}
                            options={horizontalAnimation}
                        />
                        <Drawer.Screen
                            name="ProfilePicture"
                            component={ProfilePicture}
                        />
                        <Drawer.Screen
                            name="PickedImage"
                            component={PickedImage}
                        />
                        <Drawer.Screen name="Chart" component={ChartScreen} />
                    </>
                ) : (
                    <Drawer.Screen
                        name="Signin"
                        component={SigninScreen}
                        options={{ swipeEnabled: false }}
                    />
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
