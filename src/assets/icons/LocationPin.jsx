import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

function LocationPin({ style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-112 -264)">
                        <G transform="translate(0 132)">
                            <G transform="translate(16 23)">
                                <G transform="translate(96 76)">
                                    <G transform="translate(0 32)">
                                        <G transform="translate(0 1)">
                                            <Path d="M0 0H16V16H0z"></Path>
                                            <Path
                                                stroke="#8A93A7"
                                                strokeLinejoin="round"
                                                strokeWidth="1.612"
                                                d="M8 1C5.236 1 3 3.191 3 5.9 3 9.575 8 15 8 15s5-5.425 5-9.1C13 3.191 10.764 1 8 1h0z"
                                            ></Path>
                                            <Path
                                                fill="#8A93A7"
                                                d="M8 7.667a1.667 1.667 0 11.001-3.335A1.667 1.667 0 018 7.667z"
                                            ></Path>
                                        </G>
                                    </G>
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default LocationPin;
