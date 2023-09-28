import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

function CrossIcon() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-24 -68)">
                    <G transform="translate(16 60)">
                        <G transform="translate(8 8)">
                            <Path d="M0 0H24V24H0z" opacity="0.5"></Path>
                            <G
                                fill="#FFF"
                                fillRule="nonzero"
                                transform="rotate(-135 10.828 9.172)"
                            >
                                <Path d="M8.75 0v7.25H16v1.5H8.75V16h-1.5V8.75H0v-1.5h7.25V0h1.5z"></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

export default CrossIcon;
