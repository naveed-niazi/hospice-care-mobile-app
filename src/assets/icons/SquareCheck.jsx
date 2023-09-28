import React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
import {
    BUTTON_INACTIVE,
    FONT_COLOR_PRIMARY,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
} from "../../theme/colors";

function SquareCheckIcon({ status }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-16 -456)">
                    <G transform="translate(16 160)">
                        <G transform="translate(0 296)">
                            <Path d="M0 0H24V24H0z"></Path>
                            <Rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                fill={
                                    status ? SECONDARY_COLOR : BUTTON_INACTIVE
                                }
                                rx="4"
                            ></Rect>
                            <Path
                                stroke={
                                    status ? FONT_COLOR_PRIMARY : PRIMARY_COLOR
                                }
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18.7279221 7.5L10.2426407 15.9852814 6 11.7426407"
                            ></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

export default SquareCheckIcon;
