import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Platform
} from "react-native";
import { Icon } from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
//---
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/Alert";
//---
import {
    FONT_COLOR_PRIMARY,
    FONT_COLOR_INACTIVE,
    BORDER_COLOR_INACTIVE,
} from "../theme/colors";
import Visit from "../components/Visit";
import { ACs } from "../store/actions";
import VisitListSkeleton from "../components/Skeletons/VisitListSkeleton";
import PatientNameList from "../components/PatientNameList";
import PatientDetails from "../components/PatientDetailInfo";
import { LOADING, SUCCESS } from "../constants";

const VisitsScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [showComplete, setShowComplete] = useState(false);
    const [completeMessage, setCompleteMessage] = useState(
        "Data loaded into the memory!"
    );
    const auth = useSelector((state) => state.auth);
    const { isOnline, notesOffline, patienDetailOffline } = auth;
    const [toShow, setToShow] = useState(35);
    const [loading, setLoading] = useState(true);
    const userLocation = useRef({
        latitude: null,
        longitude: null,
    });
    const visitsData = useSelector((state) => state.visits.personVisitsList);
    let polylineData = [];
    for (let i = 0; i < 20; i++) {
        polylineData.push({
            latitude: 30.3753 + i * 0.001,
            longitude: 69.3451 + i * 0.001,
        });
    }
    const data = useSelector((state) => state.auth);

    useEffect(() => {
        // now we will know when these things change state
        console.log(data.patienDetailOffline, data.notesOffline);
        if (data.patienDetailOffline && data.notesOffline) {
            if (data.dataSync === LOADING) {
                setCompleteMessage("Data Sync Complete!");
                dispatch(ACs.syncComplete());
            }
            setShowComplete(true);
            setTimeout(() => {
                setShowComplete(false);
            }, 3000);
        }
    }, [data.patienDetailOffline, data.notesOffline]);

    useEffect(() => {
        visitsData?.length > 0 ? setLoading(!loading) : null;
        if (notesOffline && patienDetailOffline) {
            setLoading(false);
            dispatch(ACs.loadPatientDataInReduxFromPouchDB());
        } else if (isOnline) {
            dispatch(
                ACs.getVisitsList(() => {
                    setLoading(!loading);
                })
            );
        }
        if (isOnline) {
            const config = {
                timeout: 4000,
            };
            Platform.OS === 'android' ?
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                    interval: 10000,
                    fastInterval: 5000,
                })
                    .then(
                        Geolocation.getCurrentPosition(
                            (info) => {
                                console.log("getting the location", info);
                                userLocation.current = {
                                    latitude: info.coords.latitude,
                                    longitude: info.coords.longitude,
                                };
                            },
                            (error) => {
                                console.log("Unable to get location ");
                                console.log(error);
                                // alas can't do anything about it
                            },
                            config
                        )
                    )
                    .catch((err) => {
                        console.log("why not getting the location", err);
                        Geolocation.getCurrentPosition(
                            (info) => {
                                console.log("getting the location", info);
                                setLocation({
                                    latitude: info.coords.latitude,
                                    longitude: info.coords.longitude,
                                });
                            },
                            (error) => {
                                console.log(error);
                                // alas can't do anything about it
                            },
                            config
                        );
                    })
                :
                "";
        } else {
            setLoading(!loading);
            dispatch(ACs.loadPatientDataInReduxFromPouchDB());
        }
    }, [isOnline]);
    const renderItem = useCallback(({ item, index }) => {
        return (
            <View>
                <Visit userLocation={userLocation.current} visit={item} />
                {index != visitsData.length - 1 ? (
                    <View style={styles.line}></View>
                ) : null}
            </View>
        );
    }, []);
    const keyExtractor = useCallback((item) => item.id.toString(), []);
    useEffect(() => { }, [visitsData]);
    return (
        /* 
            now the place where list of visits will be shown or the message that their is no
            visits available at the momont
        */
        <View style={styles.main_view}>
            {loading ? (
                <View>
                    <VisitListSkeleton />
                    <VisitListSkeleton />
                    <VisitListSkeleton />
                    <VisitListSkeleton />
                </View>
            ) : visitsData && visitsData.length > 0 && visitsData[0]?.id ? (
                <SafeAreaView>
                    {/* <Text style={styles.day_heading}>Today</Text> */}
                    <FlatList
                        // maxToRenderPerBatch={14}
                        // decelerationRate={4}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={visitsData.slice(0, toShow)}
                        renderItem={renderItem}
                        onEndReached={() => setToShow(toShow + 20)}
                        onEndReachedThreshold={0.4}
                        keyExtractor={keyExtractor}
                        ListFooterComponent={
                            visitsData.slice(0, toShow).length ==
                                visitsData.length ? null : (
                                <VisitListSkeleton />
                            )
                        }
                    />
                    {showComplete ? (
                        <Alert
                            message={completeMessage}
                            type={SUCCESS}
                            remove={() => setShowComplete(false)}
                        />
                    ) : null}
                </SafeAreaView>
            ) : (
                <View style={styles.message_box}>
                    <View style={styles.message_icon}>
                        <Icon
                            type="entypo"
                            name="calendar"
                            size={48}
                            color={FONT_COLOR_INACTIVE}
                        />
                    </View>
                    <Text style={styles.message_title}>No Existing Visits</Text>
                    <Text style={styles.message_subtitle}>
                        You don't have any visits yet. Please try to synchronize
                        your visits list by clicking the Sync button at the top
                        of this page
                    </Text>
                </View>
            )}
        </View>
    );
};

VisitsScreen.defaultProps = {};
export default VisitsScreen;

const styles = StyleSheet.create({
    // all the header stylings
    notification_bell: {
        marginLeft: 15,
    },
    right_view: {
        marginRight: 15,
    },
    notification: {
        position: "absolute",
        left: 5,
        top: -5,
    },
    message_box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 200,
    },
    message_title: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0,
        lineHeight: 20,
        color: FONT_COLOR_PRIMARY,
        fontFamily: "Inter-Bold",
    },
    message_subtitle: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: FONT_COLOR_INACTIVE,
        display: "flex",
        textAlign: "center",
        fontFamily: "Inter",
    },
    message_icon: {
        margin: 20,
    },
    // all the main view styling
    main_view: {
        margin: 15,
        marginHorizontal: 10,
    },
    day_heading: {
        fontSize: 12,
        letterSpacing: 1,
        lineHeight: 15,
        color: FONT_COLOR_INACTIVE,
        textTransform: "uppercase",
        fontFamily: "Inter-Bold",
    },
    line: {
        borderTopColor: BORDER_COLOR_INACTIVE,
        borderTopWidth: 1,
        marginHorizontal: 15,
    },
});
