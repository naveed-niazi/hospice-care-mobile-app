import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
} from "react-native";
import commonStyles from "../theme/commonStyles";
import { useNavigation } from "@react-navigation/native";

import { Avatar } from "react-native-paper";
import { Icon } from "react-native-elements";
//---
//---
import {
    BUTTON_INACTIVE,
    FONT_COLOR_INACTIVE,
    PRIMARY_COLOR,
    PRIMARY_COLOR_LIGHT,
} from "../theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import api, { routes } from "../api";
import InitialIcon from "./InitialIcon";
import PatientDetailSkeleton from "./Skeletons/PatientDetailSkeleton";
// import RenderReport from "./RenderReport";
import RenderReport from "./RenderReport";
import ViewChart from "../assets/icons/ViewChar";
import utils from "../utils";

const PatientDetails = ({ patientNumber }) => {
    const navigation = useNavigation();
    const patient = useSelector((state) =>
        state.patients.patientDetailList.find(
            (patient) => patient.patientNumber === patientNumber
        )
    );
    if (!patient) {
        return (
            <View style={styles.main_div}>
                <PatientDetailSkeleton />
            </View>
        );
    }
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
    }
    return (
        // main view
        <View style={styles.main_div}>
            <View style={styles.heading_container}>
                <Text style={styles.main_heading}>detail</Text>
            </View>

            <View style={commonStyles.RowAlignSpaceBetween}>
                <View style={commonStyles.RowAlignStart}>
                    <View
                        style={{
                            ...commonStyles.RowAlignSpaceBetween,
                            width: "65%",
                        }}
                    >
                        {/*image thumbnail */}
                        <View>
                            <InitialIcon
                                patientNumber={patient.patientNumber}
                                size={25}
                            />
                        </View>
                        {/*name and dnr*/}
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
                                DNR . {patient?.patientNumber}
                            </Text>
                        </View>
                    </View>
                </View>
                {/*chart button */}
                <View>
                    <TouchableOpacity
                        style={styles.touch_container}
                        onPress={() => {
                            navigation.navigate("Chart", {
                                patientNumber: patientNumber,
                            });
                        }}
                    >
                        <View style={commonStyles.RowAlignSpaceAround}>
                            <ViewChart
                                type="feather"
                                name="clipboard"
                                size={16}
                                color={FONT_COLOR_INACTIVE}
                            />
                            <Pressable style={{ marginLeft: 5 }}>
                                <Text style={commonStyles.F14LH16CI}>
                                    View Chart
                                </Text>
                            </Pressable>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 20 }}></View>
            <View style={{ ...commonStyles.RowAlignStart, marginTop: 5 }}>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "30%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CBI}>DOB</Text>
                </View>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "60%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CP}>
                        {patient?.dateOfBirth
                            ? `${new Date(
                                  patient?.dateOfBirth
                              ).toLocaleDateString()} (${
                                  new Date(Date.now()).getFullYear() -
                                  new Date(patient?.dateOfBirth).getFullYear()
                              } yrs)`
                            : " "}
                    </Text>
                </View>
            </View>
            <View style={{ ...commonStyles.RowAlignStart, marginTop: 5 }}>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "30%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CBI}>Gender</Text>
                </View>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "60%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CP}>
                        {utils.getInitials(patient?.sex) || " "}
                    </Text>
                </View>
            </View>
            <View style={{ ...commonStyles.RowAlignStart, marginTop: 5 }}>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "30%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CBI}>Phone</Text>
                </View>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "60%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CP}>
                        {patient?.primaryPhone
                            ? formatPhoneNumber(patient?.primaryPhone)
                            : " "}
                    </Text>
                </View>
            </View>
            <View style={{ ...commonStyles.RowAlignStart, marginTop: 5 }}>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "30%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CBI}>Address</Text>
                </View>
                <View
                    style={{
                        ...commonStyles.ColumnAlignStart,
                        width: "60%",
                        alignSelf: "flex-start",
                    }}
                >
                    <Text style={commonStyles.F14LH30CP}>
                        {`${
                            (patient?.primaryAddress?.street1 ??
                                patient?.primaryAddress?.street1 ??
                                "") +
                            (patient?.primaryAddress?.county ?? "") +
                            (patient?.primaryAddress?.city ?? "") +
                            (patient?.primaryAddress?.state ?? "") +
                            (patient?.primaryAddress?.country ?? "")
                        }`}
                    </Text>
                </View>
            </View>
        </View>
    );
};
PatientDetails.defaultProps = {
    patientNumber: "100001",
};

export default PatientDetails;

const styles = StyleSheet.create({
    main_div: {
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
    },
    heading_container: {
        marginBottom: 10,
    },
    main_heading: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1,
        color: BUTTON_INACTIVE,
        textTransform: "uppercase",
    },
    touch_container: {
        width: 120,
        height: 40,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
