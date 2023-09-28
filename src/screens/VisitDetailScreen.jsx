//third party
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Dimensions,
    Platform,
    Animated,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    SafeAreaView,
    Pressable,
} from "react-native";

import { useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from "react-native-maps-directions";
//---styling
import {
    BORDER_COLOR_INACTIVE,
    BUTTON_INACTIVE,
    BUTTON_NORMAL,
    BUTTON_SUCCESS,
    FONT_COLOR_INACTIVE,
    FONT_COLOR_PRIMARY,
    FONT_COLOR_SECONDARY,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    PRIMARY_COLOR_LIGHT,
    SECONDARY_COLOR,
} from "../theme/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import commonStyles from "../theme/commonStyles";

//--- components
import PatientDetails from "../components/PatientDetailInfo";
import ProgressNotes from "../components/ProgressNotes";
import { ACs } from "../store/actions";

import mapStyles from "../theme/mapStyles.json";
import SyncIcon from "../assets/icons/SyncIcon";
import HIcon from "../assets/icons/HLocation";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import InitialIcon from "../components/InitialIcon";
import utils from "../utils";
import TickSync from "../assets/icons/TickSync";
import CrossIcon from "../assets/icons/CrossIcon";
//---
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const VisitDetailScreen = ({ route, navigation }) => {
    //---
    const {
        patientNumber,
        visitId,
        visitLocation,
        visitDate,
        localState,
        userLocation,
    } = route.params;

    //checking if there is anything offline available or not
    const [offlineMessage, setOfflineMessages] = useState([]);

    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isOnline);
    const [loading, setLoading] = useState(false);
    const [placeHolder, setPlaceHoler] = useState("Enter your notes here");

    const theVisit = useSelector((state) =>
        state.visits.visitDetailList.find((visit) => visit.id == visitId)
    );
    const visit = theVisit?.visitDetail;
    const [completed, setCompleted] = useState(
        localState.status === "Completed"
    );
    //local states
    const [message, setMessage] = useState("");
    // we will get the synced time
    const onCloseClick = () => {
        navigation.goBack();
    };
    const addNotes = () => {
        setLoading(true);
        if (isConnected) {
            dispatch(
                ACs.postProgressNotes(patientNumber, message, visitId, () => {
                    setLoading(false);
                    setMessage("");
                })
            );
        } else {
            //store notes offline
            console.log("dispathing offline notes");
            dispatch(ACs.notesStoreOffline(message, visitId, patientNumber));
            setLoading(false);
            setMessage("");
        }
    };
    let scroll = new Animated.Value(0);
    let headerY = Animated.multiply(Animated.diffClamp(scroll, 0, 56), -1);

    let region = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    };
    //react native layout
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 0 },
            headerLeft: () => null,
            headerRight: () => null,
            title: "",
        });
    }, [navigation]);
    const markAsComplete = () => {
        dispatch(ACs.updateVisitStatus(visitId));
        localState.status = "Completed";
        setCompleted(!completed);
    };
    const postOfflineNotes = () => {
        dispatch(ACs.postOfflineNotes(offlineMessage, visitId, true));
    };
    useEffect(() => {
        const config = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000,
        };
        Geolocation.getCurrentPosition(
            (info) => {
                setLocation({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                });
            },
            (error) => {
                // alas can't do anything about it
            },
            config
        );
    }, []);
    const temp = useSelector((state) => state.visits.offlineMessages);
    console.log("OFFLINE MESSAGES LENGTH", offlineMessage.length, visitId);
    useEffect(() => {
        console.log("In use effect checking the data");
        setOfflineMessages(temp.filter((item) => item.visitId == visitId));
        console.log("there are some offline messages", offlineMessage);
    }, [temp, visitId]);
    useEffect(() => {
        console.log(
            "visit location: ",
            visitLocation?.location?.lat,
            visitLocation?.location?.lng
        );
        console.log(
            "user location: ",
            userLocation?.latitude,
            userLocation?.longitude
        );
    }, [visitLocation?.location?.lat, visitLocation?.location?.lng]);
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    return (
        <View style={StyleSheet.absoluteFill}>
            <Animated.ScrollView
                scrollEventThrottle={5}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                stickyHeaderHiddenOnScroll={true}
                style={{ zIndex: 0 }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: scroll },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                <Animated.View
                    style={{
                        height: screenHeight * 0.85,
                        width: "100%",
                        transform: [
                            {
                                translateY: Animated.multiply(scroll, 0.5),
                            },
                        ],
                    }}
                >
                    <MapView
                        moveOnMarkerPress={false}
                        style={StyleSheet.absoluteFill}
                        customMapStyle={mapStyles}
                        initialRegion={{
                            latitude:
                                userLocation?.latitude ??
                                visitLocation?.location?.lat,
                            longitude:
                                userLocation?.longitude ??
                                visitLocation?.location?.lng,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.09,
                        }}
                        // region={{
                        //     latitude: visitLocation?.latitude ?? undefined,
                        //     longitude: visitLocation?.longitude ?? undefined,
                        //     latitudeDelta: 0.9,
                        //     longitudeDelta: 0.9,
                        // }}
                    >
                        <MapViewDirections
                            origin={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude,
                            }}
                            destination={{
                                latitude: visitLocation.location.lat,
                                longitude: visitLocation.location.lng,
                            }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor={SECONDARY_COLOR}
                        />

                        {visitLocation?.location?.lat &&
                            visitLocation?.location?.lng && (
                                <Marker
                                    coordinate={{
                                        latitude: visitLocation?.location?.lat,
                                        longitude: visitLocation?.location?.lng,
                                    }}
                                >
                                    <InitialIcon
                                        size={20}
                                        patientNumber={patientNumber}
                                        addBorder={true}
                                    />
                                </Marker>
                            )}
                        {userLocation?.latitude && userLocation?.longitude && (
                            <Marker
                                coordinate={{
                                    latitude: userLocation?.latitude,
                                    longitude: userLocation?.longitude,
                                }}
                            >
                                <HIcon />
                            </Marker>
                        )}
                    </MapView>
                </Animated.View>
                <View
                    style={{
                        transform: [{ translateY: -20 }],
                        width: screenWidth,
                        backgroundColor: "transparent",
                    }}
                >
                    <View
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            top: 100,
                            backgroundColor: "rgb(245,245,245)",
                        }}
                    />

                    <View style={styles.panelContent}>
                        <View style={styles.main_area}>
                            <View style={styles.top_area}>
                                <View style={styles.the_bar}></View>
                            </View>
                            <View style={styles.main_view}>
                                <Text style={styles.date}>
                                    {visit?.startDate
                                        ? new Date(
                                              visit?.startDate
                                          ).toDateString()
                                        : visitDate ?? "loading..."}
                                </Text>
                                <Text style={styles.last_sync}>
                                    {`Last Sync ${utils.dateAnd12HoursTime(
                                        localState.syntTime
                                    )}`}
                                </Text>
                            </View>
                            <View style={styles.buttons_area}>
                                <View>
                                    <TouchableOpacity
                                        style={styles.status_touch}
                                        onPress={markAsComplete}
                                        disabled={
                                            localState.status === "Completed"
                                        }
                                    >
                                        <View
                                            style={styles.sync_text_container}
                                        >
                                            <Text
                                                style={{
                                                    ...commonStyles.F14LH16CI,
                                                    color:
                                                        localState.status ===
                                                        "Completed"
                                                            ? SECONDARY_COLOR
                                                            : BUTTON_INACTIVE,
                                                }}
                                            >
                                                {localState.status ===
                                                "Completed"
                                                    ? localState.status
                                                    : "Mark as Complete"}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.sync}>
                                    <TouchableOpacity
                                        style={styles.sync_touch}
                                        onPress={postOfflineNotes}
                                        disabled={offlineMessage.length == 0}
                                    >
                                        <View
                                            style={
                                                commonStyles.RowAlignSpaceBetween
                                            }
                                        >
                                            {offlineMessage.length != 0 ? (
                                                <SyncIcon
                                                    size={20}
                                                    color={BUTTON_SUCCESS}
                                                />
                                            ) : (
                                                <TickSync size={20} />
                                            )}
                                        </View>
                                        <View
                                            style={styles.sync_text_container}
                                        >
                                            {offlineMessage.length != 0 ? (
                                                <Text style={styles.sync_text}>
                                                    Sync
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={{
                                                        ...styles.sync_text,
                                                        color: BUTTON_INACTIVE,
                                                    }}
                                                >
                                                    Synced
                                                </Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.seprater}></View>
                            <PatientDetails patientNumber={patientNumber} />
                            <View style={styles.seprater}></View>
                            <View style={styles.notes_view}>
                                <ProgressNotes patientNumber={patientNumber} />
                            </View>
                            {/* input should be shown only when status is incomplete */}
                            <View
                                style={{
                                    ...styles.seprater,
                                    marginBottom: 80,
                                }}
                            ></View>
                            {localState?.status != "Completed" && (
                                <View
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        alignSelf: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            ...styles.inputContainer,
                                            ...commonStyles.RowAlignSpaceBetween,
                                            margin: 15,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <TextInput
                                            mode="flat"
                                            selectionColor={FONT_COLOR_INACTIVE}
                                            value={message}
                                            onChangeText={(text) =>
                                                setMessage(text)
                                            }
                                            style={styles.input}
                                            placeholder={placeHolder}
                                            placeholderTextColor={
                                                FONT_COLOR_INACTIVE
                                            }
                                            keyboardShouldPersistTaps="always"
                                            onFocus={() => setPlaceHoler("")}
                                            onBlur={() =>
                                                setPlaceHoler(
                                                    "Enter your notes here"
                                                )
                                            }
                                            blurOnSubmit={false}
                                            multiline
                                        />
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS==="ios" ? "padding":"height"}
                                            style={styles.icon_container}
                                        >
                                            {loading ? (
                                                <ActivityIndicator
                                                    size="large"
                                                    color={SECONDARY_COLOR}
                                                />
                                            ) : (
                                                <Icon
                                                    type="material-icons"
                                                    name="send"
                                                    color={SECONDARY_COLOR}
                                                    size={24}
                                                    onPress={addNotes}
                                                />
                                            )}
                                        </KeyboardAvoidingView>
                                    </View>
                                </View>
                            )}
                        </View>
                        
                    </View>
                    
                </View>
                
            </Animated.ScrollView>
            
            <Animated.View
                style={{
                    width: "100%",
                    position: "absolute",
                    // transform: [
                    //     {
                    //         translateY: headerY,
                    //     },
                    // ],
                    flex: 1,
                    backgroundColor: "transparent",
                }}
            >
                <Pressable onPress={onCloseClick} style={styles.icon}>
                    <CrossIcon />
                </Pressable>
            </Animated.View>
        </View>
    );
};

export default VisitDetailScreen;

const styles = StyleSheet.create({
    the_bar: {
        marginTop: 8,
        height: 4,
        width: 40,
        borderRadius: 2,
        backgroundColor: "#4E5260",
        marginBottom: 20,
    },
    icon: {
        marginTop: 10,
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        // position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR_LIGHT,
        zIndex: 100,
    },
    map_view: {
        height: "60%",
        width: "100%",
    },
    main_background: {
        height: "100%",
        width: "100%",
    },
    top_area: {
        backgroundColor: PRIMARY_COLOR,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    main_area: {
        backgroundColor: PRIMARY_COLOR,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    date: {
        fontSize: 16,
        lineHeight: 32,
        letterSpacing: 0,
        textAlign: "center",
        color: FONT_COLOR_PRIMARY,
    },
    last_sync: {
        fontSize: 12,
        lineHeight: 16,
        textAlign: "center",
        color: FONT_COLOR_INACTIVE,
    },
    buttons_area: {
        display: "flex",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    button_container: {
        height: 48,
        width: 120,
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR_LIGHT,
        borderRadius: 6,
        color: FONT_COLOR_PRIMARY,
    },
    dropdown_style: {
        marginTop: 15,
        paddingVertical: 0,
        marginLeft: -20,
        backgroundColor: PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR_DARK,
    },
    dropdown_area: {
        width: 120,
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
        marginTop: 15,
        marginLeft: -8,
        backgroundColor: PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
        backgroundColor: PRIMARY_COLOR,
        //borderWidth: 0,
    },
    dropdown_text: {
        //width: 120,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0,
        lineHeight: 20,
        color: FONT_COLOR_INACTIVE,
        borderWidth: 0,
    },
    sync: {
        marginLeft: 10,
    },

    sync_touch: {
        width: 120,
        height: 48,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        borderRadius: 6,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    status_touch: {
        width: 160,
        height: 48,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        borderRadius: 6,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    sync_text_container: {
        marginLeft: 8,
    },
    status_text_container: {
        // marginLeft: 8,
    },
    sync_text: {
        fontSize: 14,
        lineHeight: 16,
        color: BUTTON_SUCCESS,
    },
    status_text: {
        fontSize: 14,
        lineHeight: 16,
        color: BUTTON_INACTIVE,
    },
    dropdown_row: {
        display: "flex",
        flexDirection: "row",
        width: 130,
        height: 40,
        paddingVertical: 0,
        marginHorizontal: 0,
        //justifyContent: "center",
        // alignSelf: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 0,
        marginBottom: -1,
    },
    dropdown_row_text: {
        color: FONT_COLOR_INACTIVE,
    },
    seprater: {
        borderTopWidth: 10,
        borderTopColor: PRIMARY_COLOR_DARK,
    },
    panelContent: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "rgba(116,120,128,0.16)",
        backgroundColor: "#292E3B",
        borderRadius: 5,
        padding: 12,
    },
    input: {
        alignSelf: "stretch",
        marginTop: 0,
        paddingLeft: 10,
        width: "80%",
        color: FONT_COLOR_PRIMARY,
    },
    notes_view: {
        width: "100%",
        minHeight: 300,
    },
    icon_container: {},
});
