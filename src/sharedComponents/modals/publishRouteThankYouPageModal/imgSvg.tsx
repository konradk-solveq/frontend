import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Circle, G, Path} from 'react-native-svg';

import {getHorizontalPx} from '../../../helpers/layoutFoo';

interface IProps {
    size?: number;
    containerStyle?: ViewStyle;
}

const ImgSvg: React.FC<IProps> = ({size, containerStyle}: IProps) => {
    const imgSize = size || getHorizontalPx(286);

    return (
        <View style={[styles.container, containerStyle]}>
            <Svg width={imgSize} height={imgSize} viewBox="0 0 286 286">
                <G fill="none" fill-rule="evenodd">
                    <Path
                        fill="#FDF5F5"
                        d="M137.86 0h10.28C224.28 0 286 64.02 286 143s-61.72 143-137.86 143h-10.28C61.72 286 0 221.98 0 143S61.72 0 137.86 0z"
                        opacity=".7"
                    />
                    <Path
                        fill="#76CE5A"
                        d="M20 44l59-20v218l-59 20zm187 0l59-20v218l-59 20z"
                    />
                    <Path fill="#2CBA3F" d="M207 44L79 24v218l128 20z" />
                    <Path
                        stroke="#FFEECD"
                        strokeDasharray="4 4"
                        strokeWidth="2"
                        d="M20 102.17c15.35-10.7 35.01-20.75 59-30.12C114.98 58 95.65 215.8 132.78 188.01c5.93-4.44 31.88-15.7 36.9-15.01 26.4 3.67 10.43 70 37.32 70 21.33 0 41-13.48 59-40.44"
                    />
                    <Path
                        stroke="#FFEECD"
                        strokeDasharray="4 4"
                        strokeWidth="2"
                        d="M20 220c15.35-8.73 35.01-8.73 59 0 35.98 13.09 20.36-63 58.99-65.74 24.04-1.71 5.01-48.86 27.49-48.86 45.52 0 0-34.16 41.52-34.16 21.33 0 41 27.67 59 83.02"
                    />
                    <Path
                        stroke="#D8232A"
                        strokeLinecap="round"
                        strokeWidth="9"
                        d="M20 187.77l59-20.76c22.32-44.64 45.32-56.98 69-37.01s43.34 37.14 59 51.5c25.29-29.85 44.95-49.45 59-58.79"
                    />
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // paddingHorizontal: 60,
    },
});

export default ImgSvg;
