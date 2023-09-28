import React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
import { View } from "react-native";
import { FONT_COLOR_INACTIVE, PRIMARY_COLOR } from "../../theme/colors";

function VisitIcon({ color, size, style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.orG/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-16 -204)">
                        <G transform="translate(0 184)">
                            <G transform="translate(16 20)">
                                <Path d="M0 0H24V24H0z"></Path>
                                <Path
                                    fill={color}
                                    d="M2 9h20v12a1 1 0 01-1 1H3a1 1 0 01-1-1V9z"
                                ></Path>
                                <Path
                                    fill={
                                        color == "#1AD79E"
                                            ? "#FFF"
                                            : FONT_COLOR_INACTIVE
                                    }
                                    d="M3 3h18a1 1 0 011 1v3H2V4a1 1 0 011-1z"
                                ></Path>
                                <Rect
                                    width="3"
                                    height="4"
                                    x="6"
                                    y="1"
                                    fill={
                                        color == "#1AD79E"
                                            ? "#FFF"
                                            : FONT_COLOR_INACTIVE
                                    }
                                    rx="1"
                                ></Rect>
                                <Rect
                                    width="4"
                                    height="4"
                                    x="6"
                                    y="12"
                                    fill={
                                        color == "#1AD79E"
                                            ? "#FFF"
                                            : PRIMARY_COLOR
                                    }
                                    rx="1"
                                ></Rect>
                                <Rect
                                    width="3"
                                    height="4"
                                    x="15"
                                    y="1"
                                    fill={
                                        color == "#1AD79E"
                                            ? "#FFF"
                                            : FONT_COLOR_INACTIVE
                                    }
                                    rx="1"
                                ></Rect>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default VisitIcon;
