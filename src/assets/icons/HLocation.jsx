import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Ellipse, Circle } from "react-native-svg";

function HIcon() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="44"
            viewBox="0 0 24 44"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-265 -173)">
                    <G transform="translate(0 -159)">
                        <G transform="translate(87 332)">
                            <G transform="translate(178)">
                                <Ellipse
                                    cx="12"
                                    cy="40"
                                    fill="#000"
                                    opacity="0.4"
                                    rx="8"
                                    ry="4"
                                ></Ellipse>
                                <G>
                                    <Circle
                                        cx="12"
                                        cy="38"
                                        r="2"
                                        fill="#1AD79E"
                                    ></Circle>
                                    <Path
                                        stroke="#1AD79E"
                                        strokeWidth="1.5"
                                        d="M12 23L12 39"
                                    ></Path>
                                    <Circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="#1AD79E"
                                    ></Circle>
                                    <Path
                                        fill="#FFF"
                                        fillRule="nonzero"
                                        d="M9.98623853 17L9.98623853 12.8691406 14.0183486 12.8691406 14.0183486 17 16 17 16 7 14.0183486 7 14.0183486 11.1259766 9.98623853 11.1259766 9.98623853 7 8 7 8 17z"
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

export default HIcon;
