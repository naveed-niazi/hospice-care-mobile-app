import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

function SyncSmall({ color }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-339 -329)">
                    <G transform="translate(0 132)">
                        <G transform="translate(16 167)">
                            <G transform="translate(319 26)">
                                <G transform="translate(4 4)">
                                    <Path d="M0 0H16V16H0z"></Path>
                                    <G
                                        stroke={color}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.2"
                                        transform="translate(1.333 2)"
                                    >
                                        <Path d="M8.15 10.5H4.44A4.458 4.458 0 01.21 7.363a4.526 4.526 0 011.663-5.03"></Path>
                                        <Path d="M6.66666667 9L8.1508379 10.5 6.66666667 12"></Path>
                                        <Path d="M5.182 1.5h3.71a4.458 4.458 0 014.232 3.137 4.526 4.526 0 01-1.663 5.03"></Path>
                                        <Path d="M6.66666667 3L5.18249543 1.5 6.66666667 0"></Path>
                                    </G>
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}
SyncSmall.defaultProps = {
    color: "#1AD79E",
};

export default SyncSmall;
