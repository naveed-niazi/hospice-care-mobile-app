import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
function ViewChart() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-250 -620)">
                    <G transform="translate(0 364)">
                        <G transform="translate(0 176)">
                            <G transform="translate(238 68)">
                                <G transform="translate(12 12)">
                                    <Path d="M0 0H16V16H0z"></Path>
                                    <G
                                        stroke="#8A93A7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        transform="translate(2 .982)"
                                    >
                                        <Path d="M3 10.0175929L5.14285714 7.8747358 6.85714286 9.16045008 9 7.01759294"></Path>
                                        <Path d="M8.571 1.684h2.572c.473 0 .857.368.857.822v10.69c0 .453-.384.822-.857.822H.857c-.473 0-.857-.369-.857-.823V2.506c0-.454.384-.822.857-.822H3.43"></Path>
                                        <Path d="M7.714.795c0-.981-.767-.777-1.714-.777S4.286-.186 4.286.795c-.474 0-.857.398-.857.89v1.484H8.57V1.684c0-.49-.383-.889-.857-.889z"></Path>
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

export default ViewChart;
