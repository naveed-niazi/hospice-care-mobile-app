import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    PRIMARY_COLOR_DARK_V2,
    PRIMARY_COLOR_LIGHT,
} from "../../theme/colors";

const PatientDetailSkeleton = () => {
    return (
        <View style={{ marginVertical: 30 }}>
            <SkeletonPlaceholder speed={700} highlightColor={PRIMARY_COLOR}>
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <SkeletonPlaceholder.Item>
                        <View
                            style={{
                                width: 100,
                                height: 20,
                                borderRadius: 4,
                                backgroundColor: PRIMARY_COLOR,
                            }}
                            width={100}
                            height={20}
                            backgroundColor={PRIMARY_COLOR_LIGHT}
                            borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={50}
                            height={10}
                            backgroundColor={PRIMARY_COLOR_LIGHT}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                        marginLeft={100}
                        flexDirection="row"
                    >
                        <SkeletonPlaceholder.Item
                            width={50}
                            height={20}
                            borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                            marginLeft={20}
                            width={20}
                            height={20}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    marginTop={9}
                    justifyContent="space-between"
                >
                    <SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                            width={120}
                            height={60}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                        marginLeft={30}
                        flexDirection="column"
                    >
                        <SkeletonPlaceholder.Item
                            width={200}
                            height={20}
                            borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={200}
                            height={20}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
};

export default PatientDetailSkeleton;
