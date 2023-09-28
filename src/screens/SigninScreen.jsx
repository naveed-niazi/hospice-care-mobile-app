import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    ActivityIndicator,
    Pressable,
} from "react-native";
import { Button, CheckBox, Icon } from "react-native-elements";
import commonStyles from "../theme/commonStyles";
import { useDispatch, useSelector } from "react-redux";

//---
import { FAILURE } from "../constants";
import Alert from "../components/Alert";
//---
import { FontAwesome } from "@expo/vector-icons";
import LoginSVG from "../assets/icons/LoginSVG";
import { ACs } from "../store/actions";
import utils from "../utils";
import HideIcon from "../assets/icons/Hide";
import ShowIcon from "../assets/icons/ShowIcon";
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    FONT_COLOR_SECONDARY,
    FONT_COLOR_PRIMARY,
    BUTTON_INACTIVE,
} from "../theme/colors";
import SquareCheckIcon from "../assets/icons/SquareCheck";

const initialCred = {
    email: "",
    password: "",
    errMessage: "",
    stayLoggedIn: true,
    loading: false,
};

const SigninScreen = ({ navigation }) => {
    const state = useSelector((state) => state.auth);
    const [loginCred, setLoginCred] = useState(initialCred);
    const [showPassoword, setShowPassword] = useState(true);
    const dispatch = useDispatch();

    const signin = () => {
        setLoginCred({ ...loginCred, loading: true });
        const verify = utils.loginCredVerification({
            email: loginCred.email,
            password: loginCred.password,
        });
        if (verify.OK) {
            dispatch(ACs.clearError());
            dispatch(
                ACs.signin({
                    email: loginCred.email,
                    password: loginCred.password,
                    stayLoggedIn: loginCred.stayLoggedIn,
                })
            );
        } else {
            setLoginCred({ ...loginCred, errMessage: verify.error });
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {},
        });
    }, [navigation]);

    useEffect(() => {
        setLoginCred({
            ...loginCred,
            errMessage: state.errMessage,
            loading: false,
        });
    }, [state.errMessage]);

    return (
        <View style={styles.page}>
            <View style={styles.main_div}>
                <View style={styles.svg}>
                    <LoginSVG />
                </View>
                {/* username with label and input */}
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input_container}
                    label="Email"
                    value={loginCred.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) =>
                        setLoginCred({
                            ...loginCred,
                            email: text,
                            errMessage: "",
                        })
                    }
                />
                {/* passoword with name and input */}
                <Text style={styles.label}>Password</Text>
                <View
                    style={{
                        ...commonStyles.RowAlignSpaceBetween,
                        ...styles.input_container,
                    }}
                >
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        label="Password"
                        value={loginCred.password}
                        secureTextEntry={showPassoword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) =>
                            setLoginCred({
                                ...loginCred,
                                password: text,
                                errMessage: "",
                            })
                        }
                        inlineImageLeft="search_icon"
                    />
                    <Pressable
                        style={{ paddingHorizontal: 15 }}
                        onPress={() => setShowPassword(!showPassoword)}
                    >
                        {showPassoword ? <ShowIcon /> : <HideIcon />}
                    </Pressable>
                </View>
                <View
                    style={{
                        ...commonStyles.RowAlignSpaceBetween,
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                >
                    <Pressable
                        style={commonStyles.RowAlignSpaceBetween}
                        onPress={() =>
                            setLoginCred({
                                ...loginCred,
                                stayLoggedIn: !loginCred.stayLoggedIn,
                            })
                        }
                    >
                        <SquareCheckIcon status={loginCred.stayLoggedIn} />
                        <Text
                            style={{
                                ...styles.forgot_password_text,
                                marginLeft: 10,
                                color: FONT_COLOR_SECONDARY,
                            }}
                        >
                            Keep me logged in
                        </Text>
                    </Pressable>
                    {/* <Text style={styles.forgot_password_text}>
                        Forgot Password?
                    </Text> */}
                </View>
                <View></View>
                {loginCred.loading ? (
                    <ActivityIndicator size="large" color={SECONDARY_COLOR} />
                ) : (
                    <Button
                        containerStyle={styles.button_container}
                        buttonStyle={styles.button_style}
                        titleStyle={styles.title}
                        title="Sign in"
                        onPress={signin}
                    />
                )}
            </View>
            {loginCred.errMessage ? (
                <Alert message={loginCred.errMessage} type={FAILURE} />
            ) : null}
        </View>
    );
};

export default SigninScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    image: {
        width: 110,
        height: 64,
    },
    main_div: {
        height: 408,
        marginTop: 160,
        margin: 15,
        // alignItems: "center",
        // alignContent: "center",
        // textAlign:'start'
    },
    svg: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
    },
    input_wrap: {},
    input_container: {
        height: 48,
        alignSelf: "stretch",
        marginTop: 5,
        paddingLeft: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(116,120,128,0.16)",
        color: FONT_COLOR_PRIMARY,
    },
    input: {
        color: FONT_COLOR_PRIMARY,
        width: "80%",
    },
    label: {
        height: 16,
        width: 140,
        color: "#94969D",
        // fontFamily: "Inter",
        fontSize: 12,
        letterSpacing: 0,
        lineHeight: 16,
        marginTop: 20,
    },
    checkbox: {
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 0,
        margin: 0,
        paddingLeft: 0,
    },
    checkbox_text: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 20,
        color: FONT_COLOR_SECONDARY,
    },
    forgot_password_text: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 20,
        color: SECONDARY_COLOR,
    },
    button_container: {
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
});
