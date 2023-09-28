import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";

function TickSync({ size, color }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-339 -185)">
                    <G transform="translate(0 132)">
                        <G transform="translate(16 23)">
                            <G transform="translate(319 26)">
                                <G transform="translate(4 4)">
                                    <Path d="M0 0H16V16H0z"></Path>
                                    <Circle
                                        cx="8"
                                        cy="8"
                                        r="7"
                                        stroke={color}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.2"
                                    ></Circle>
                                    <Path
                                        stroke={color}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.2"
                                        d="M11.1819805 8.18198052L5.18198052 8.18198052 5.18198052 5.18198052"
                                        transform="rotate(-45 8.182 6.682)"
                                    ></Path>
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

TickSync.defaultProps = {
    size: "16",
    color: "#8A93A7",
};
export default TickSync;
