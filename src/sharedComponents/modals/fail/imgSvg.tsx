import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import AnimSvg from '../../../helpers/animSvg';

import {setObjSize, getHorizontalPx} from '../../../helpers/layoutFoo';

interface IProps {
    size?: number;
    containerStyle?: ViewStyle;
}

const line = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 296" width="412" height="296">
        <path d="M 0.281 185.032 C 13.009 193.348 24.104 191.533 28.385 188.148 C 31.313 185.833 35.779 177.272 36.793 174.086 C 45.715 146.049 44.235 151.648 49.652 141.394 C 54.543 132.136 66.483 125.605 67.899 124.992 C 71.369 123.491 77.05 121.621 78.311 121.399 C 94.461 118.55 101.526 120.072 103.301 120.195 C 113.547 120.906 114.785 121.95 118.623 122.857 C 125.272 124.428 125.716 124.285 132.814 124.79 C 135.22 124.961 140.562 124.621 141.654 124.479 C 149.359 123.476 154.975 121.279 162.474 116.227 C 175.476 107.468 186.426 97.398 197.223 87.021 C 210.853 73.922 227.158 63.132 245.026 55.524 C 251.321 52.844 268.752 48.49 275.443 48.103 C 280.139 47.831 285.49 47.654 290.53 47.704 C 294.89 47.748 309.528 50.602 314.581 52.61 C 323.111 55.999 326.472 58.316 333.401 63 C 338.506 66.451 344.778 72.659 347.455 76.092 C 349.21 78.343 356.243 87.049 355.857 86.885 C 357.871 89.388 358.57 93.115 360.166 96.844 C 363.727 105.162 364.291 115.88 364.861 126.599 C 365.26 134.098 359.781 159.033 357.859 166.393 C 348.283 203.063 348.467 194.666 347.617 223.735 C 347.468 228.838 349.217 237.703 349.812 238.892 C 350.68 240.627 359.64 262.771 370.351 270.495 C 371.966 271.66 380.373 276.164 382.22 276.505 C 389.248 277.804 391.34 277.24 396.96 276.287 C 400.101 275.754 401.923 274.913 404.685 273.165 C 410.689 269.365 410.438 269.158 412.272 265.457 C 412.623 264.749 414.036 267.232 413.366 266.562 C 410.726 263.922 416.083 269.107 411.939 265.999" stroke="#D8232A" fill="none" 
        fill-rule="evenodd" stroke-dasharray="6 9" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -1000"/>
        </path>
    </svg>`;

const ImgSvg: React.FC<IProps> = ({size, containerStyle}: IProps) => {
    setObjSize(350, 23);
    const imgSize = size || getHorizontalPx(412);

    return (
        <View style={[styles.container, containerStyle]}>
            <View>
                <Svg width={imgSize} height={296}>
                    <AnimSvg
                        style={[styles.strokeLine, {width: size}]}
                        source={line}
                    />
                    <Path
                        fill="#F67E83"
                        opacity={0.2}
                        d="M196.657 0h10.686c79.182 0 143.372 66.262 143.372 148s-64.19 148-143.372 148h-10.686c-79.182 0-143.372-66.262-143.372-148S117.475 0 196.657 0z"
                    />
                </Svg>
                <Svg width={imgSize} height={296} style={styles.background}>
                    <G stroke="#F67E83">
                        <Path
                            fill="#FFF"
                            d="M128.235 106.711l-24.688 81.222 150.467 46.829 34.005-98.588-60.203-106.681z"
                        />
                        <Path
                            strokeLinecap="square"
                            d="M128.145 105.5l159.768 32"
                        />
                        <Path d="M103.547 187.933c26.316-15.127 44.658-24.308 55.025-27.541 15.09-4.707 25.485-5.336 37.21-1.887 10.744 3.16 18.582 10.07 27.534 20.729 7.259 8.642 17.491 27.151 30.698 55.528" />
                        <Path
                            strokeLinecap="square"
                            d="M128.145 107.5l35.169 51M286.909 137.5l-69.333 36"
                        />
                    </G>
                </Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 60,
    },
    background: {
        position: 'absolute',
    },
    strokeLine: {
        height: 296,
    },
});

export default ImgSvg;
