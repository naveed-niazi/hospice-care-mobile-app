import React, { useEffect, useRef, useState } from "react";
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
import { Icon } from "react-native-elements";
import commonStyles from "../theme/commonStyles";
import { ACs } from "../store/actions";
import mapStyles from "../theme/mapStyles.json";
import Pin from "../assets/icons/Pin";
import TickSync from "../assets/icons/TickSync";
import SyncSmall from "../assets/icons/SyncSmall";
import CalenderIcon from "../assets/icons/CalenderIcon";
import LocationPin from "../assets/icons/LocationPin";

const Visit = ({ visit }) => {
    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isOnline);
    const [localState, setLocalState] = useState({ status: "Loading" });
    const navigation = useNavigation();
    const buttonColor =
        localState.status == "Started"
            ? BUTTON_NORMAL
            : localState.status == "Completed"
            ? BUTTON_SUCCESS
            : localState.status == "Cancelled"
            ? BUTTON_FAIL
            : BUTTON_INACTIVE;

    const temp1 = useSelector((state) => state.visits?.offlineStats);
    useEffect(() => {
        const temp2 = temp1?.find((stat) => stat.visitId == visit.id);
        setLocalState(temp2);
    }, [temp1]);
    const navigateToVisitDetail = () => {
        // on click on map area the VISIT DETAIL SCREEN will open
        if (isConnected) {
            // getting all the data
            console.log("getting all the data");
            dispatch(ACs.getPatientDetail(visit.patientnumber));
            dispatch(ACs.getProgressNotes(visit.patientnumber));
            dispatch(ACs.getVisitDetails(visit));
        }
        navigation.navigate("VisitDetail", {
            visitId: visit.id,
            patientNumber: visit.patientnumber,
            visitLocation: visit,
            localState,
        });
    };

    return (
        <Pressable onPress={navigateToVisitDetail} style={styles.mainView}>
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
                                borderRadius:4
                            }}
                        >
                            {localState.status}
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
                        {visit.status == "Started" ? (
                            <Icon
                                type="ant-design"
                                name="checkcircleo"
                                containerStyle={styles.button_icon_container}
                                color={BUTTON_NORMAL}
                                size={18}
                            />
                        ) : localState?.status == "Completed" ? (
                            <SyncSmall />
                        ) : (
                            <TickSync />
                        )}
                    </View>
                </View>
            </View>
            {/* now the location part of the list will show up */}

            <View style={commonStyles.RowAlignStart}>
                <View style={styles.map_container}>
                    {visit?.location?.lat && visit?.location?.lng && (
                        <MapView
                            customMapStyle={mapStyles}
                            style={styles.map_view}
                            userInteraction={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            showUserLocation={false}
                            rotateEnabled={false}
                            zoomEnabled={false}
                            moveOnMarkerPress={false}
                            showsUserLocation
                            showsPointsOfInterest={false}
                            showsIndoors={false}
                            showsTraffic={false}
                            initialRegion={{
                                latitude: visit?.location?.lat,
                                longitude: visit?.location?.lng,
                                latitudeDelta: 0.007,
                                longitudeDelta: 0.007,
                            }}
                        >
                            {visit?.location?.lat && visit?.location?.lng && (
                                <Marker
                                    coordinate={{
                                        latitude: visit?.location?.lat,
                                        longitude: visit?.location?.lng,
                                    }}
                                    onPress={() => {}}
                                >
                                    <Pin />
                                </Marker>
                            )}
                        </MapView>
                    )}
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
    button: {

    },
    title: {
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0,
        lineHeight: 16,
        textAlign: "center",
        fontFamily: "Inter-Bold",
        color:"#94969D"
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
