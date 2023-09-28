import { StyleSheet } from "react-native";
import {
    BUTTON_INACTIVE,
    FONT_COLOR_INACTIVE,
    FONT_COLOR_PRIMARY,
} from "./colors";
export default commonStyles = StyleSheet.create({
    RowAlignSpaceBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    RowAlignSpaceBetweenNoItemAlign: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    RowAlignSpaceAround: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    ColumnAlignSpaceBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    RowAlignStart: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    ColumnAlignStart: {
        display: "flex",
        justifyContent: "flex-start",
    },
    TopMargin: {
        margin: 15,
    },
    F16W600LH20CP: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 20,
        letterSpacing: 0,
        color: FONT_COLOR_PRIMARY,
        fontFamily: "Inter",
    },
    F14LH16CI: {
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0,
        color: FONT_COLOR_INACTIVE,
        fontFamily: "Inter",
    },
    F14LH20CBI: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: BUTTON_INACTIVE,
        fontFamily: "Inter",
    },
    F14LH30CBI: {
        fontSize: 14,
        lineHeight: 30,
        letterSpacing: 0,
        color: BUTTON_INACTIVE,
        fontFamily: "Inter",
    },
    F14LH20CI: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: FONT_COLOR_INACTIVE,
        fontFamily: "Inter",
    },
    F14LH30CP: {
        fontSize: 14,
        lineHeight: 30,
        letterSpacing: 0,
        color: FONT_COLOR_PRIMARY,
        fontFamily: "Inter",
    },
});
