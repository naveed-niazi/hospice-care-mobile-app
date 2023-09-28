import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//---
import commonStyles from "../theme/commonStyles";
import InitialIcon from "./InitialIcon";
import utils from "../utils";
import {
    SECONDARY_COLOR,
    FONT_COLOR_PRIMARY,
    BUTTON_INACTIVE,
} from "../theme/colors";

const PatientNameList = ({ patients, selectedId, setSelectedId }) => {
    const [selected, setSelected] = useState("");
    const renderItem = ({ item }) => {
        const color = item.patientNumber === selectedId ? "white" : "black";
        const selected = item.patientNumber === selectedId.current;
        return (
            <Pressable
                onPress={() => {
                    setSelected(item.patientNumber);
                    setSelectedId(item.patientNumber);
                }}
                style={[styles.item]}   
            >
                <View style={commonStyles.RowAlignSpaceBetween}>
                    <View style={commonStyles.RowAlignStart}>
                        <InitialIcon
                            name={`${item.firstName} ${item.lastName}`}
                            patientNumber={item.patientNumber}
                            size={20}
                        />

                        <Text style={[styles.title]}>
                            {utils.getCamelCase(
                                `${item.firstName} ${item.lastName}`
                            )}
                        </Text>
                    </View>
                    {selected ? (
                        <MaterialCommunityIcons
                            name="checkbox-marked-circle"
                            color={SECONDARY_COLOR}
                            backgroundColor={FONT_COLOR_PRIMARY}
                            size={20}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle-outline"
                            color={BUTTON_INACTIVE}
                            backgroundColor={FONT_COLOR_PRIMARY}
                            size={20}
                        />
                    )}
                </View>
            </Pressable>
        );
    };
    useEffect(() => {}, [selected]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={patients}
                renderItem={renderItem}
                keyExtractor={(patient) => patient.patientNumber}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        fontFamily: "Inter",
        fontSize: 16,
        lineHeight: 24,
        color: FONT_COLOR_PRIMARY,
        marginLeft: 10,
    },
});

export default PatientNameList;
