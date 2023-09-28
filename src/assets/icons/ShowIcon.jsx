import React from "react";
import Svg, { G, Path } from "react-native-svg";

function ShowIcon() {
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
                                        d="M12 5.75c3.874 0 7.301 2.401 8.699 5.977a.75.75 0 010 .546C19.3 15.849 15.874 18.25 12 18.25c-3.874 0-7.301-2.401-8.699-5.977a.75.75 0 010-.546C4.7 8.151 8.126 5.75 12 5.75zm0 1.5c-3.063 0-5.796 1.792-7.084 4.517L4.811 12l.105.233c1.249 2.642 3.856 4.408 6.806 4.512l.278.005c3.063 0 5.796-1.792 7.084-4.517l.104-.233-.104-.233c-1.249-2.642-3.856-4.408-6.806-4.512zm0 1.8A2.938 2.938 0 0114.932 12c0 1.63-1.31 2.95-2.932 2.95A2.938 2.938 0 019.068 12c0-1.63 1.31-2.95 2.932-2.95zm0 1.5c-.792 0-1.432.645-1.432 1.45 0 .805.64 1.45 1.432 1.45.792 0 1.432-.645 1.432-1.45 0-.805-.64-1.45-1.432-1.45z"
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

export default ShowIcon;
