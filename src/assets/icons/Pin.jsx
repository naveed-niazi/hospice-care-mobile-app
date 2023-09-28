import React from "react";
import Svg, { G, Path, Ellipse } from "react-native-svg";

function Pin() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="17"
            viewBox="0 0 13 17"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-50 -248)">
                    <G transform="translate(0 132)">
                        <G transform="translate(16 23)">
                            <G transform="translate(0 76)">
                                <G transform="translate(36 19)">
                                    <Ellipse
                                        cx="4.5"
                                        cy="13"
                                        fill="#1C2028"
                                        opacity="0.2"
                                        rx="4"
                                        ry="2"
                                    ></Ellipse>
                                    <G
                                        fill="#1AD79E"
                                        stroke="#FFF"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    >
                                        <Path d="M4.5-.75c1.447 0 2.759.583 3.709 1.524A5.171 5.171 0 019.75 4.458c0 2.93-3.179 6.523-4.34 7.7-.113.113-.247.246-.402.394a6.924 6.924 0 01-.517-.278C2.493 11.08-.75 7.432-.75 4.458c0-1.437.589-2.74 1.541-3.684A5.255 5.255 0 014.5-.75zm0 4.472a.754.754 0 00-.532.22.727.727 0 00-.218.516c0 .202.085.384.218.517a.754.754 0 001.064.002.727.727 0 00-.001-1.035.754.754 0 00-.531-.22z"></Path>
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

export default Pin;
