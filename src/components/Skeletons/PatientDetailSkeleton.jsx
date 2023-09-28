import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const PatientDetailSkeleton = () => {
    return (
        <SkeletonPlaceholder speed={700} highlightColor="#3B3F4E">
            <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                >
                    <SkeletonPlaceholder.Item
                        width={60}
                        height={60}
                        borderRadius={50}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item
                            width={120}
                            height={20}
                            borderRadius={4}
                            highlightColor="#3B3F4E"
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={80}
                            height={12}
                            borderRadius={4}
                            highlightColor="#3B3F4E"
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                    width={90}
                    height={35}
                    borderRadius={5}
                    highlightColor="#3B3F4E"
                />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                        marginTop={8}
                        width={40}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={50}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={45}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={55}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item marginLeft={50}>
                    <SkeletonPlaceholder.Item
                        marginTop={8}
                        width={200}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={35}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={180}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={7}
                        width={210}
                        height={20}
                        borderRadius={4}
                        highlightColor="#3B3F4E"
                    />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};

export default PatientDetailSkeleton;
