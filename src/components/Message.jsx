import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Avatar } from "react-native-paper";
//--- styling
import {
    BORDER_COLOR_INACTIVE,
    BUTTON_INACTIVE,
    FONT_COLOR_INACTIVE,
    PRIMARY_COLOR,
} from "../theme/colors";
import commonStyles from "../theme/commonStyles";
import api from "../api";
import { ACs } from "../store/actions";
import InitialIcon from "./InitialIcon";
import utils from "../utils";

const Message = ({ chat, index, total }) => (
    <View>
        <View style={commonStyles.RowAlignStart}>
            <View
                style={{
                    ...commonStyles.RowAlignSpaceBetween,
                    marginTop: 15,
                }}
            >
                {/*image thumbnail */}
                <View>
                    <InitialIcon name={chat.personname || "Unknow"} size={20} />
                </View>
                {/*name and dnr*/}
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        marginLeft: 15,
                    }}
                >
                    <Text style={{ ...commonStyles.F16W600LH20CP }}>
                        {chat.personname || "Unknow"}
                    </Text>
                    <Text style={{...commonStyles.F14LH16CI, fontSize:12}}>
                        {chat?.noteddatetime
                            ? utils.noteDateFromString(chat?.noteddatetime)
                            : ""}
                    </Text>
                </View>
            </View>
        </View>
        <View style={{ marginLeft: 55, marginTop: 15 }}>
            <Text style={commonStyles.F14LH20CI}>{chat.note}</Text>
        </View>
        {index == total - 1 ? (
            <View style={styles.seprater_last}></View>
        ) : (
            <View style={styles.seprater}></View>
        )}
    </View>
);

export default Message;

const styles = StyleSheet.create({
    main_div: {
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
    },
    main_heading: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1,
        color: BUTTON_INACTIVE,
        textTransform: "uppercase",
    },
    seprater: {
        borderTopWidth: 1,
        marginLeft: 55,
        marginTop: 15,
        borderColor: BUTTON_INACTIVE,
    },
    seprater_last: {
        borderTopWidth: 1,
        marginTop: 15,
        borderColor: BUTTON_INACTIVE,
    },
});
