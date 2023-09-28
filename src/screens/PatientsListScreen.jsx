import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

//---
import PatientRecord from "../components/PatientRecordItem";
import { ACs } from "../store/actions";
import { SECONDARY_COLOR } from "../theme/colors";

const PatientsListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [lastLoaded, setLastLoaded] = useState(-1);
    const patientList = useSelector((state) => state.patients.patientList);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Patients",
        });
    }, [navigation]);
    const fetchPatientsList = () => {
        dispatch(ACs.getPatientsList(lastLoaded, 10, () => setLoading(false)));
    };
    useEffect(() => {
        fetchPatientsList();
    }, []);
    useEffect(() => {
        setLastLoaded(lastLoaded + 10);
    }, [patientList]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {patientList.length > 0 ? (
                <FlatList
                    data={patientList}
                    renderItem={({ item, index }) => (
                        <PatientRecord patient={item} />
                    )}
                    onEndReached={fetchPatientsList}
                    onEndReachedThreshold={0.7}
                    keyExtractor={(item) => item.patientNumber}
                />
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={SECONDARY_COLOR} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default PatientsListScreen;

const styles = StyleSheet.create({
    loading: {
        justifyContent: "center",
        alignContent: "center",
    },
});
