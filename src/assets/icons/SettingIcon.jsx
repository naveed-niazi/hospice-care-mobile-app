import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { FONT_COLOR_INACTIVE } from "../../theme/colors";

function SettingIcon({ color, size, style }) {
    return (
        <View style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <G transform="translate(-16 -300)">
                        <G transform="translate(0 280)">
                            <G transform="translate(16 20)">
                                <Path d="M0 0H24V24H0z"></Path>
                                <Path
                                    fill={color}
                                    fillRule="nonzero"
                                    d="M13.73 1.25c.581 0 1.085.398 1.21.944l.022.12.32 2.24.25.123.313.172.307.188.242.162 2.129-.854a1.261 1.261 0 011.37.341l.078.1.068.109 2.009 3.476c.27.495.184 1.105-.211 1.497l-.106.093-1.783 1.393.012.133.015.259.004.254-.004.254-.015.259-.012.132 1.786 1.396c.41.324.561.858.411 1.351l-.048.133-.058.12-1.991 3.444c-.28.513-.868.752-1.421.6l-.127-.043-2.109-.848-.259.173-.307.187-.31.172-.232.114-.32 2.229a1.233 1.233 0 01-.98 1.052l-.13.019-.124.006h-4a1.239 1.239 0 01-1.21-.944l-.022-.12-.322-2.242-.248-.12-.313-.173-.307-.188-.244-.163-2.127.855a1.261 1.261 0 01-1.37-.341l-.078-.1-.068-.109-2.01-3.476a1.257 1.257 0 01.212-1.497l.105-.093 1.783-1.394-.011-.133-.015-.26L3.48 12l.005-.253.015-.26.011-.133-1.785-1.395a1.244 1.244 0 01-.413-1.367l.047-.12.061-.117L3.41 4.91c.28-.513.869-.752 1.422-.6l.127.043 2.107.847.26-.172.307-.187.31-.172.232-.114.32-2.229c.067-.534.472-.947.981-1.052l.13-.019.123-.006h4zm-.221 1.5h-3.56l-.347 2.426a.75.75 0 01-.266.473l-.091.064-.101.051a6.919 6.919 0 00-1.525.886.75.75 0 01-.623.13l-.106-.034L4.61 5.83 2.827 8.917l1.934 1.512a.75.75 0 01.277.462l.011.11-.005.112a7.118 7.118 0 00-.065.887c0 .263.022.546.065.887a.75.75 0 01-.2.609l-.083.075-1.934 1.512 1.784 3.086 2.279-.915a.75.75 0 01.542-.007l.1.047.095.062c.478.368.981.66 1.517.88a.75.75 0 01.433.477l.025.11.347 2.427h3.559l.349-2.426a.75.75 0 01.266-.473l.091-.064.1-.051a6.919 6.919 0 001.525-.886.75.75 0 01.624-.13l.106.034 2.278.915 1.784-3.087-1.934-1.511a.75.75 0 01-.277-.462l-.01-.11.005-.112c.044-.348.064-.617.064-.887s-.02-.54-.064-.887a.75.75 0 01.2-.609l.082-.075 1.934-1.513-1.785-3.086-2.277.916a.75.75 0 01-.542.007l-.1-.047-.095-.062a6.555 6.555 0 00-1.517-.88.75.75 0 01-.434-.477l-.024-.11-.348-2.427z"
                                ></Path>
                                <Path
                                    fill={
                                        color == "#1AD79E"
                                            ? "#FFF"
                                            : FONT_COLOR_INACTIVE
                                    }
                                    fillRule="nonzero"
                                    d="M11.73 7.75A4.254 4.254 0 0115.98 12a4.254 4.254 0 01-4.25 4.25A4.254 4.254 0 017.48 12a4.254 4.254 0 014.25-4.25zm0 1.5A2.754 2.754 0 008.98 12a2.754 2.754 0 002.75 2.75A2.754 2.754 0 0014.48 12a2.754 2.754 0 00-2.75-2.75z"
                                ></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );
}

export default SettingIcon;