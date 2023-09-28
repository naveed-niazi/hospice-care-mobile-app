import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useWindowDimensions, View, ScrollView, Text } from "react-native";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import * as FileSystem from "expo-file-system";

import { ACs } from "../store/actions";

const RenderReport = ({ patientNumber }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState("");
    const [time, setTime] = useState(0);
    const getData = (path) => {
        FileSystem.readAsStringAsync(path, {
            encoding: FileSystem.EncodingType.UTF8,
        }).then(
            (data) => setData(data),
            (err) => {
                console.log("FileData error", err);
                dispatch(ACs.storeFileInMemory(patientNumber, getData));
            }
        );
    };

    useEffect(() => {
        FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}${patientNumber}.html`
        ).then(
            (data) => {
                getData(`${FileSystem.documentDirectory}${patientNumber}.html`);
            },
            (err) => {
                // get the chart and store it in memory
                setTime(time + 1);
                if (time < 5)
                    dispatch(ACs.storeFileInMemory(patientNumber, getData));
            }
        );
        //
    }, [patientNumber]);
    const { width } = useWindowDimensions();
    return data == "" ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Loading....</Text>
        </View>
    ) : (
        <WebView source={{ html: data }} />
    );
};
export default RenderReport;
