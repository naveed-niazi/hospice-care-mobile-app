import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import commonStyles from "../theme/commonStyles";
//---
//---
import {
    BUTTON_INACTIVE,
    PRIMARY_COLOR,
    PRIMARY_COLOR_LIGHT,
} from "../theme/colors";
import InitialIcon from "./InitialIcon";
import { docApi, routes } from "../api";
import { ACs } from "../store/actions";
const PatientRecord = (props) => {
    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isOnline);
    const { patient } = props;
    const [showImage, setShowImage] = useState(false);

    const navigatation = useNavigation();

    useEffect(() => {
        docApi
            .get(`/photouploadservice/patient/demo1/${patient.patientNumber}/`)
            .then(
                (res) => {
                    setShowImage(true);
                },
                (err) => {}
            );
    }, []);

    return (
        <View style={styles.main_div}>
            <Pressable
                activeOpacity={1}
                onPress={() => {
                    if (isConnected) {
                        dispatch(ACs.getVisitsList());
                        dispatch(ACs.getPatientDetail(patient.patientNumber));
                        dispatch(ACs.getProgressNotes(patient.patientNumber));
                        navigatation.navigate("Visits", {
                            patientNumber: patient.patientNumber,
                        });
                    }
                }}
                // style={styles.touch_container}
                style={({ pressed }) => [
                    pressed
                        ? styles.touch_container_pressed
                        : styles.touch_container,
                ]}
            >
                <View style={commonStyles.RowAlignSpaceBetween}>
                    <View style={commonStyles.RowAlignStart}>
                        <View style={commonStyles.RowAlignSpaceBetween}>
                            <View>
                                <InitialIcon
                                    patientNumber={patient.patientNumber}
                                    name={`${patient?.firstName} ${patient?.lastName}`}
                                    size={23}
                                />
                            </View>
                            <View
                                style={{
                                    ...commonStyles.ColumnAlignStart,
                                    marginLeft: 15,
                                }}
                            >
                                <Text style={{ ...commonStyles.F16W600LH20CP }}>
                                    {`${patient?.firstName} ${patient?.lastName}`}
                                </Text>
                                <Text style={commonStyles.F14LH16CI}>
                                    {patient.patientNumber}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* <View>
                        <View
                            style={{
                                ...commonStyles.ColumnAlignStart,
                                marginLeft: 15,
                            }}
                        >
                            <Text style={commonStyles.F14LH16CI}>
                                {`${patient.sex}`}
                            </Text>
                            <Text style={commonStyles.F14LH16CI}>
                                {`Facility: ${patient.facility}`}
                            </Text>
                        </View>
                    </View> */}
                </View>
            </Pressable>
        </View>
    );
};

export default PatientRecord;

const styles = StyleSheet.create({
    main_div: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    heading_container: {
        marginBottom: 10,
    },
    stretch: {
        width: 35,
        height: 35,
        borderRadius: 20,
    },
    main_heading: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1,
        color: BUTTON_INACTIVE,
        textTransform: "uppercase",
        fontFamily: "Inter",
    },
    touch_container: {
        // width: 120,
        // height: 40,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 4,
    },
    touch_container_pressed: {
        // width: 120,
        // height: 40,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // paddingTop:12,
        paddingBottom: 12,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 4,
    },
});
