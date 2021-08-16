import React from 'react';
import {ViewStyle, TouchableOpacity} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

interface IProps {
    style?: ViewStyle;
    gaved: boolean;
    onpress: () => void;
}

const Download: React.FC<IProps> = ({style, gaved, onpress}: IProps) => {
    return (
        <TouchableOpacity style={style} onPress={onpress}>
            <Svg viewBox="0 0 16 16">
                {gaved ? (
                    <G fill="none" fill-rule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            fill="#3587EA"
                            stroke="#3587EA"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.33 14H4.67c-.74 0-1.34-.6-1.34-1.33V3.33c0-.73.6-1.33 1.34-1.33h4.66l3.34 3.33v7.34c0 .73-.6 1.33-1.34 1.33z"
                        />
                        <Path
                            fill="#FFF"
                            stroke="#3587EA"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width=".67"
                            d="M9.33 2v2.67c0 .36.3.66.67.66h2.67"
                        />
                        <Path
                            stroke="#FFF"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 7.33v4m-2-2l2 2 2-2"
                        />
                    </G>
                ) : (
                    <G fill="none" fill-rule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.33 2v2.67c0 .36.3.66.67.66h2.67"
                        />
                        <Path
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.33 14H4.67c-.74 0-1.34-.6-1.34-1.33V3.33c0-.73.6-1.33 1.34-1.33h4.66l3.34 3.33v7.34c0 .73-.6 1.33-1.34 1.33zM8 7.33v4"
                        />
                        <Path
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9.33l2 2 2-2"
                        />
                    </G>
                )}
            </Svg>
        </TouchableOpacity>
    );
};

export default Download;
