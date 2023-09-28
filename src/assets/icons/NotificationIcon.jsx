import React from "react";
import { View } from "react-native";
import Svg, { Path, G, Circle } from "react-native-svg";

function NotificationIcon() {
    return (
        <View style={{ marginLeft: 15 }}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-335 -64)">
                        <G transform="translate(0 44)">
                            <G transform="translate(335 20)">
                                <Path d="M0 0H24V24H0z"></Path>
                                <G
                                    fill="#8A93A7"
                                    fillRule="nonzero"
                                    transform="translate(3 1)"
                                >
                                    <Path d="M9 .25a.75.75 0 01.743.648L9.75 1v1.291c3.375.374 6 3.235 6 6.709v8.25H17a.75.75 0 01.102 1.493L17 18.75H1a.75.75 0 01-.102-1.493L1 17.25h1.25V9a6.751 6.751 0 016-6.709V1A.75.75 0 019 .25zm0 3.5A5.25 5.25 0 003.75 9v8.25h10.5V9a5.25 5.25 0 00-5.034-5.246zm2 15.5a.75.75 0 01.75.75 2.75 2.75 0 11-5.5 0 .75.75 0 011.493-.102L7.75 20a1.25 1.25 0 002.494.128L10.25 20a.75.75 0 01.75-.75z"></Path>
                                </G>
                                <Circle
                                    cx="18"
                                    cy="8"
                                    r="5"
                                    fill="#1AD79E"
                                    stroke="#212531"
                                    strokeWidth="2"
                                ></Circle>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default NotificationIcon;
