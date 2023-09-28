import React from "react";
import Svg, { G, Path } from "react-native-svg";

function HideIcon() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G transform="translate(-319 -396)">
                    <G transform="translate(16 160)">
                        <G transform="translate(0 200)">
                            <G transform="translate(0 24)">
                                <G transform="translate(303 12)">
                                    <Path d="M0 0H24V24H0z"></Path>
                                    <Path
                                        fill="#8A93A7"
                                        fillRule="nonzero"
                                        d="M19.55 5.4l.9 1.2-16 12-.9-1.2 2.152-1.614a9.463 9.463 0 01-2.4-3.513.75.75 0 010-.546C4.698 8.151 8.125 5.75 12 5.75a9.24 9.24 0 015.058 1.5l.013.009L19.55 5.4zm1.149 6.327a.75.75 0 010 .546C19.3 15.849 15.874 18.25 12 18.25a9.25 9.25 0 01-3.143-.547l-.359-.139 1.452-1.087c.662.18 1.35.273 2.05.273 3.063 0 5.796-1.792 7.084-4.517l.104-.232-.03-.073a7.96 7.96 0 00-.952-1.599l-.024-.029 1.201-.9a9.458 9.458 0 011.316 2.327zM12 7.25c-3.063 0-5.796 1.792-7.084 4.517l-.105.231.016.038a7.963 7.963 0 002.1 2.833l2.353-1.765A2.968 2.968 0 019.068 12c0-1.63 1.31-2.95 2.932-2.95.677 0 1.317.232 1.828.642l1.95-1.463A7.738 7.738 0 0012 7.25zm0 3.3c-.792 0-1.432.645-1.432 1.45l.007.131 1.967-1.474A1.421 1.421 0 0012 10.55z"
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

export default HideIcon;
