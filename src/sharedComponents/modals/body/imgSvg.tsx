import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

import {getHorizontalPx} from '@helpers/layoutFoo';
import AnimSvg from '@helpers/animSvg';

interface IProps {
    size?: number;
    containerStyle?: ViewStyle;
}

const line = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 296" width="412" height="296">
        <path d="M1.7 132.2c-4.3 31.4 11.5 45.6 47.6 42.5 54-4.6 52 113.4 147.6 84.4 34.6-10.5 51-100.1 110-95.7 88.3 6.7 60.6-110 108.1-82.6" stroke="#D8232A" fill="none" 
        fill-rule="evenodd" stroke-dasharray="6 9" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -1000"/>
        </path>
    </svg>`;

const imgHeight = getHorizontalPx(296);

const ImgSvg: React.FC<IProps> = ({size, containerStyle}: IProps) => {
    const imgSize = size || getHorizontalPx(416);

    return (
        <View style={[styles.container, containerStyle]}>
            <Svg width={imgSize} height={imgHeight} viewBox={'0 0 416 296'}>
                <AnimSvg
                    style={[styles.strokeLine, {width: size}]}
                    source={line}
                />
                <G>
                    <Path
                        fill="#F67E83"
                        fillOpacity={0.2}
                        d="M202.7 0h10.6C292.1 0 356 66.3 356 148s-63.9 148-142.7 148h-10.6C123.9 296 60 229.7 60 148S123.9 0 202.7 0z"
                    />
                    <Path
                        fill="#FFF"
                        stroke="#D8232A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m251.6 71 34.4 34.4L165.4 226 131 191.6z"
                    />
                    <Path
                        stroke="#D8232A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m243 105-13-13m-13 39-13-13m-13 39-13-13m-13 39-13-13"
                    />
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    strokeLine: {
        height: imgHeight,
    },
});

export default ImgSvg;
