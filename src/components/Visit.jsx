import React, { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
//---
import { useNavigation } from "@react-navigation/native";

import {
    BUTTON_BACKGROUND_COLOR,
    BUTTON_FAIL,
    BUTTON_INACTIVE,
    BUTTON_NORMAL,
    FONT_COLOR_INACTIVE,
    FONT_COLOR_SECONDARY,
    BUTTON_SUCCESS,
    PRIMARY_COLOR,
    PRIMARY_COLOR_LIGHT,
    SECONDARY_COLOR,
    PRIMARY_COLOR_DARK,
} from "../theme/colors";
import commonStyles from "../theme/commonStyles";
import { ACs } from "../store/actions";
import Pin from "../assets/icons/Pin";
import TickSync from "../assets/icons/TickSync";
import SyncSmall from "../assets/icons/SyncSmall";
import CalenderIcon from "../assets/icons/CalenderIcon";
import LocationPin from "../assets/icons/LocationPin";

const Visit = ({ visit, userLocation }) => {
    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isOnline);
    const [localState, setLocalState] = useState({ status: "Loading" });
    const navigation = useNavigation();
    const buttonColor =
        localState.status == "Completed" ? BUTTON_SUCCESS : BUTTON_INACTIVE;
    const [offlineMessage, setOfflineMessages] = useState([]);
    const temp1 = useSelector((state) => state.visits?.offlineStats);
    useEffect(() => {
        const temp2 = temp1?.find((stat) => stat.visitId == visit.id);
        setLocalState(temp2);
    }, [temp1]);
    const navigateToVisitDetail = () => {
        // on click on map area the VISIT DETAIL SCREEN will open
        if (isConnected) {
            dispatch(ACs.getVisitDetails(visit));
        }
        navigation.navigate("VisitDetail", {
            visitId: visit.id,
            userLocation: userLocation,
            patientNumber: visit.patientnumber,
            visitLocation: visit,
            visitDate: visit.starteventdatetime,
            localState,
        });
    };
    const temp = useSelector((state) => state.visits.offlineMessages);
    useEffect(() => {
        setOfflineMessages(temp.filter((item) => item.visitId == visit.id));
    }, [temp, visit.id]);

    return (
        <Pressable
            onPress={navigateToVisitDetail}
            style={styles.mainView}
            style={({ pressed }) => [
                {
                    borderRadius: 6,
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                    backgroundColor: pressed
                        ? PRIMARY_COLOR_LIGHT
                        : PRIMARY_COLOR,
                },
                styles.wrapperCustom,
            ]}
        >
            {/* Showing the patient name and status */}
            <View style={commonStyles.RowAlignSpaceBetween}>
                <View>
                    <Text style={styles.patient_name}>
                        {`${visit.patientfirstname} ${visit.patientlastname}`}
                    </Text>
                    <Text style={styles.dnr}>DNR . {visit.patientnumber}</Text>
                </View>

                <View style={commonStyles.RowAlignSpaceBetween}>
                    <View style={styles.button_container}>
                        <Text
                            style={{
                                ...styles.title,
                                color: buttonColor,
                                borderRadius: 4,
                            }}
                        >
                            {localState.status === "Completed"
                                ? localState.status
                                : "Pending"}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginLeft: 5,
                            backgroundColor: PRIMARY_COLOR_LIGHT,
                            width: 24,
                            height: 24,
                            borderRadius: 4,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {offlineMessage.length > 0 ? (
                            <SyncSmall color={buttonColor} />
                        ) : (
                            <TickSync color={buttonColor} />
                        )}
                    </View>
                </View>
            </View>
            {/* now the location part of the list will show up */}

            <View style={commonStyles.RowAlignStart}>
                <View style={styles.map_container}>
                    <View
                        style={{
                            ...styles.map_container,
                            alignItems: "center",
                        }}
                    >
                        <Pin />
                    </View>
                </View>
                <View></View>
                {/* the date and the address part of things */}
                <View style={{ marginTop: 10 }}>
                    <View style={{ ...commonStyles.RowAlignStart, margin: 5 }}>
                        <CalenderIcon style={styles.icon_container} />
                        <Text style={styles.visit_info}>
                            {new Date(visit.starteventdatetime).toDateString()}
                        </Text>
                    </View>
                    <View style={{ ...commonStyles.RowAlignStart, margin: 5 }}>
                        <LocationPin style={styles.icon_container} />
                        <Text style={styles.visit_info}>
                            {visit.address
                                ? `${visit?.address?.street1} ${visit?.address?.city}`
                                : "Loading..."}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default Visit;

const styles = StyleSheet.create({
    mainView: {
        marginVertical: 15,
        zIndex: 2,
    },
    patient_name: {
        fontSize: 16,
        lineHeight: 24,
        color: FONT_COLOR_SECONDARY,
        marginLeft: 0,
        paddingLeft: 0,
        fontFamily: "Inter-Bold",
    },
    dnr: {
        fontSize: 12,
        color: "#94969D",
        lineHeight: 16,
        fontFamily: "Inter",
    },
    button_container: {
        height: 26,
        padding: 0,
        width: 80,
        justifyContent: "center",
        backgroundColor: PRIMARY_COLOR_LIGHT,
        padding: 4,
        marginHorizontal: 4,
        borderRadius: 6,
    },
    button: {},
    title: {
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0,
        lineHeight: 16,
        textAlign: "center",
        fontFamily: "Inter-Bold",
        color: "#94969D",
    },
    button_icon_container: {
        width: 26,
        height: 26,
        backgroundColor: BUTTON_BACKGROUND_COLOR,
        justifyContent: "center",
        marginHorizontal: 4,
        borderRadius: 4,
    },
    map_container: {
        width: 85,
        height: 50,
        marginTop: 15,
        marginRight: 15,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: PRIMARY_COLOR_DARK,
    },
    map_view: {
        width: 85,
        height: 85,
    },
    icon_container: {
        marginRight: 15,
        width: 15,
        height: 15,
        // alignSelf:"center"
        alignItems: "center",
    },
    visit_info: {
        fontSize: 12,
        letterSpacing: 0,
        color: FONT_COLOR_INACTIVE,
        fontFamily: "Inter",
    },

    calender_container: {},
    pressed: {
        marginTop: -2,
        marginBottom: 2,
    },
});
