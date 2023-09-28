import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { FONT_COLOR_INACTIVE, FONT_COLOR_PRIMARY, SECONDARY_COLOR } from "../../theme/colors";

function HelpIcon({ color, size, style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-16 -364)">
                        <G transform="translate(0 344)">
                            <G transform="translate(16 20)">
                                <Path d="M0 0H24V24H0z"></Path>
                                <Path
                                    fill={color}
                                    fillRule="nonzero"
                                    d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 1.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
                                ></Path>
                                <Path
                                    fill={
                                        color == SECONDARY_COLOR
                                            ? FONT_COLOR_PRIMARY
                                            : FONT_COLOR_INACTIVE
                                    }
                                    fillRule="nonzero"
                                    d="M11.798 14.674c.503 0 .934.417.938.929a.949.949 0 01-.938.937.932.932 0 01-.937-.937.93.93 0 01.937-.93zm.196-7.074c1.628 0 2.749.903 2.749 2.344 0 .91-.427 1.528-1.121 1.987l-.153.097c-.649.397-.948.784-.992 1.568l-.005.174v.111h-1.42v-.11c.009-1.454.4-1.955 1.082-2.402l.116-.074c.516-.324.912-.733.912-1.33 0-.669-.524-1.104-1.176-1.104-.561 0-1.103.334-1.204 1.03l-.015.155H9.25c.043-1.62 1.253-2.446 2.744-2.446z"
                                ></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default HelpIcon;
