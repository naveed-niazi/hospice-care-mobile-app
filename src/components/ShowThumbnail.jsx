import * as React from "react";
import { View } from "react-native";

import Svg, { Circle, Rect, Defs, Mask, Image } from "react-native-svg";

const ShowThumbnail = ({ image }) => (
    <View style={{ aspectRatio: 1 }}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Defs>
                <Mask id="mask" x="0" y="0" height="100%" width="100%">
                    <Rect
                        height="100%"
                        width="100%"
                        fill="#fff"
                        fillOpacity="0.5"
                    />
                    <Circle r="50" cx="50" cy="50" fill="#fff" />
                </Mask>
            </Defs>
            <Image
                href={{
                    uri: image,
                }}
                height="100%"
                width="100%"
                mask="url(#mask)"
            />
        </Svg>
    </View>
);
export default ShowThumbnail;
