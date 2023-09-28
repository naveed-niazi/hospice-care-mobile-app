import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
//---
import commonStyles from "../theme/commonStyles";
import {
    SECONDARY_COLOR,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR,
    PRIMARY_COLOR_LIGHT,
    PRIMARY_COLOR_DARK,
} from "../theme/colors";
import { SUCCESS } from "../constants";
//---

const Alert = ({ message, type, remove }) => {
    return (
        <View style={styles.alert_container}>
            <View style={{ ...commonStyles.RowAlignStart }}>
                <View style={styles.icon_container}>
                    {type === SUCCESS ? (
                        <Icon
                            reverse
                            size={15}
                            color={SECONDARY_COLOR}
                            iconStyle={styles.icon}
                            name="check"
                            type="font-awesome"
                            onPress={remove}
                        />
                    ) : (
                        <Icon
                            reverse
                            size={15}
                            color={SECONDARY_COLOR}
                            iconStyle={styles.icon}
                            name="times"
                            type="font-awesome"
                            onPress={remove}
                        />
                    )}
                </View>
                <Text style={styles.alert_text}>{message}</Text>
            </View>
        </View>
    );
};

export default Alert;

const styles = StyleSheet.create({
    alert_container: {
        position: "absolute",
        height: 48,
        bottom: 15,
        width: "90%",
        borderRadius: 28,
        backgroundColor: PRIMARY_COLOR_DARK,
        alignSelf: "stretch",
        flexDirection: "row",
        // marginTop: 100,
        marginHorizontal: 15,
        paddingVertical: 5,
    },
    icon_container: {
        marginHorizontal: 5,
    },
    icon: {
        color: FONT_COLOR_PRIMARY,
        fontSize: 25,
    },
    alert_text: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 20,
        color: FONT_COLOR_PRIMARY,
    },
});
