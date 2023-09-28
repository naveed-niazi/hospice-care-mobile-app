import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
//--- styling
import { BUTTON_INACTIVE, PRIMARY_COLOR } from "../theme/colors";

import { ACs } from "../store/actions";
import Message from "./Message";

const ProgressNotes = ({ patientNumber }) => {
    const dispatch = useDispatch();
    const notes = useSelector((state) =>
        state.patients.progressNotes.find(
            (note) => note.patientNumber == patientNumber
        )
    );

    useEffect(() => {}, [notes]);
    return (
        <View style={styles.main_div}>
            <Text style={styles.main_heading}> Notes</Text>
            <SafeAreaView style={{ flex: 1 }}>
                {notes?.notesList && notes.notesList.length > 0 ? (
                    <FlatList
                        data={notes.notesList}
                        renderItem={({ item, index }) => (
                            <Message
                                chat={item}
                                index={index}
                                total={notes.length}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View style={styles.no_notes}>
                        <Text style={commonStyles.F14LH20CI}>
                            No Notes Found!
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default ProgressNotes;

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
    no_notes: {
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
});
