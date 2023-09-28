import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { FONT_COLOR_INACTIVE, FONT_COLOR_PRIMARY, SECONDARY_COLOR } from "../../theme/colors";

function PrivacyIcon({ color, size, style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-16 -428)">
                        <G transform="translate(0 408)">
                            <G transform="translate(16 20)">
                                <Path d="M0 0L24 0 24 24 0 24z"></Path>
                                <G transform="translate(3.378 3.378)">
                                    <Path
                                        fill={color}
                                        fillRule="nonzero"
                                        d="M8.585 0l.026.002a.62.62 0 01.126.023l2.628.78 1.347.413.48.151.862.283.565.195.65.242.415.17.244.107.217.104.194.102.17.099.146.097c.317.225.455.437.466.664v.05l-.428 4.508a11.614 11.614 0 01-6.696 9.646l-.287.128-.88.42-.03.014a.626.626 0 01-.041.015l.071-.03a.624.624 0 01-.441.037l-.024-.007a.626.626 0 01-.043-.017l-.028-.012-.857-.41A11.619 11.619 0 01.46 8.314L.001 3.44a.605.605 0 01.154-.411l.084-.091.104-.092.125-.093.147-.095.082-.048.182-.099.205-.1.23-.106.257-.108.436-.17.68-.246.587-.199 1.138-.365L6.056.715l2.331-.69.025-.006a.62.62 0 01.053-.011l-.078.017A.625.625 0 018.562 0h.023zm-.023 1.271l-1.58.469-1.17.356-1.368.43-1.146.378-.724.253-.42.155-.187.072-.326.133-.262.116-.107.052.4 4.21a10.386 10.386 0 005.991 8.618l.287.128.612.291.635-.301a10.381 10.381 0 006.227-8.436l.43-4.509-.109-.053-.262-.116-.326-.133-.388-.147-.452-.163-.49-.17-1.147-.378-1.368-.43-1.17-.356-1.58-.469z"
                                    ></Path>
                                    <Path
                                        stroke={color==SECONDARY_COLOR ? FONT_COLOR_PRIMARY: FONT_COLOR_INACTIVE}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.244"
                                        d="M5.56222772 8.62238435L7.56222772 10.6223843 11.5622277 6.62238435"
                                    ></Path>
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default PrivacyIcon;
