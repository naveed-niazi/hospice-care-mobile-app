import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

function CalenderIcon({ style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-112 -232)">
                        <G transform="translate(0 132)">
                            <G transform="translate(16 23)">
                                <G transform="translate(96 76)">
                                    <G transform="translate(0 1)">
                                        <Path d="M0 0H16V16H0z"></Path>
                                        <G
                                            stroke="#8A93A7"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            transform="translate(1 1)"
                                        >
                                            <Rect
                                                width="14"
                                                height="13"
                                                x="0"
                                                y="1"
                                                rx="2"
                                            ></Rect>
                                            <Path d="M0 5h14v7a2 2 0 01-2 2H2a2 2 0 01-2-2V5h0z"></Path>
                                            <Path
                                                strokeLinecap="square"
                                                d="M4 2L4 0"
                                            ></Path>
                                            <Path
                                                strokeLinecap="square"
                                                d="M10 2L10 0"
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

export default CalenderIcon;
