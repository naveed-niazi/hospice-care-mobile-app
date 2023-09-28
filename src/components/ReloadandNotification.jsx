import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import commonStyles from "../theme/commonStyles";
import { SECONDARY_COLOR } from "../theme/colors";
import { Icon } from "react-native-elements";
import { ACs } from "../store/actions";
import SyncIcon from "../assets/icons/SyncIcon";
import NotificationIcon from "../assets/icons/NotificationIcon";
import { IDOL, LOADING } from "../constants";
import { syncData } from "../store/actions/authActions";
const ReloadandNotification = ({ data }) => {
    const navigation = useNavigation();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [needSync, setNeedSync] = useState(false);
    // const route =navigation?.getCurrentRoute()?.name;
    const reloadData = () => {
        console.log("reload data is called");
        dispatch(ACs.syncData());
    };
    //get offline data
    const offlineDataList = useSelector(
        (state) => state.visits.offlineMessages
    );
    useEffect(() => {
        if (offlineDataList && offlineDataList.length > 0) setNeedSync(true);
    }, [offlineDataList]);
    //if there is any offline data
    return (
        <View style={styles.right_view}>
            <View style={commonStyles.RowAlignSpaceBetween}>
                {/* Icon to sync the data */}
                <Pressable
                    onPress={reloadData}
                    // disabled={auth.dataSync === IDOL ? false : true}
                >
                    <View>
                        <SyncIcon
                            color={needSync ? SECONDARY_COLOR : "#8A93A7"}
                            size={28}
                        />
                    </View>
                </Pressable>
                {/* Icon to go to notifications */}
                <Pressable onPress={() => navigation.navigate("Notification")}>
                    <NotificationIcon />
                </Pressable>
            </View>
        </View>
    );
};

export default ReloadandNotification;

const styles = StyleSheet.create({
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
});
