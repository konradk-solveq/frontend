import React from 'react';
import {ViewStyle, TouchableOpacity} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

interface IProps {
    style?: ViewStyle;
    gaved: boolean;
    onpress: () => void;
}

const Like: React.FC<IProps> = ({style, gaved, onpress}: IProps) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onpress}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            <Svg viewBox="0 0 16 16">
                {gaved ? (
                    <G fill="none" fill-rule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            fill="#3587EA"
                            stroke="#FFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.67 7.33v5.34c0 .36-.3.66-.67.66H2.67a.67.67 0 01-.67-.66V8c0-.37.3-.67.67-.67h2c1.47 0 2.66-1.2 2.66-2.66V4A1.33 1.33 0 0110 4v3.33h2c.74 0 1.33.6 1.33 1.34L12.67 12c-.2.84-.74 1.38-1.34 1.33H6.67a2 2 0 01-2-2"
                        />
                    </G>
                ) : (
                    <G fill="none" fillRule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.67 7.33v5.34c0 .36-.3.66-.67.66H2.67a.67.67 0 01-.67-.66V8c0-.37.3-.67.67-.67h2c1.47 0 2.66-1.2 2.66-2.66V4A1.33 1.33 0 0110 4v3.33h2c.74 0 1.33.6 1.33 1.34L12.67 12c-.2.84-.74 1.38-1.34 1.33H6.67a2 2 0 01-2-2"
                        />
                    </G>
                )}
            </Svg>
        </TouchableOpacity>
    );
};

export default Like;
