import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, StyleSheet } from "react-native";
import utils from "../utils";
import { docApi } from "../api";
import { SECONDARY_COLOR } from "../theme/colors";
import { Icon } from "react-native-elements/dist/icons/Icon";

const InitialIcon = ({ size, name, patientNumber, addBorder }) => {
    const accessToken = useSelector(
        (state) => state.auth.authInfo.access_token
    );
    const patient = useSelector((state) =>
        state.patients.patientDetailList.find(
            (patient) => patient.patientNumber == patientNumber
        )
    );
    const nameToShow = name || `${patient?.firstName} ${patient?.lastName}`;
    const nameInitials = useMemo(() => utils.getInitials(nameToShow));
    return (
        <View
            style={
                addBorder
                    ? {
                          backgroundColor: "gray",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: Math.floor(size + size / 5),
                          borderWidth: 6,
                          borderColor: SECONDARY_COLOR,
                          width: size * 2 + 6,
                          height: size * 2 + 6,
                      }
                    : {
                          backgroundColor: "gray",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: Math.floor(size + size / 5),
                          width: size * 2,
                          height: size * 2,
                      }
            }
        >
            <View>
                <Text
                    style={{
                        color: "white",
                        fontSize: size,
                        fontFamily: "Inter",
                        position: "absolute",
                        top: 6,
                        left: 6,
                    }}
                >
                    {nameInitials}
                </Text>
                <Image
                    style={{
                        borderRadius: Math.floor(size + size / 5),
                        width: size * 2,
                        height: size * 2,
                    }}
                    source={{
                        uri: `https://document-server-qa.gca-dev.hopsice.com/photouploadservice/patient/demo1/${
                            patient?.patientNumber ?? patientNumber
                        }/`,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }}
                />
            </View>
        </View>
    );
};
InitialIcon.defaultProps = {
    size: 25,
    name: "",
    patientNumber: "-1",
    addBorder: false,
};

export default memo(InitialIcon);

const styles = StyleSheet.create({
    stretch: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    image_view_noborder: {},
});
