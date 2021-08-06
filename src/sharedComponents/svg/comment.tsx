import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

interface IProps {
    style?: ViewStyle;
    gaved: boolean;
    onpress: () => void;
}

const Comment: React.FC<IProps> = ({style, gaved, onpress}: IProps) => {
    return (
        <TouchableOpacity style={style} onPress={onpress}>
            <Svg viewBox="0 0 16 16">
                {gaved ? (
                    <G fill="none" fillRule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            fill="#3587EA"
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.87 10.73a4.94 4.94 0 011.4-6.91 6.57 6.57 0 017.9.32 4.9 4.9 0 01.68 7 6.49 6.49 0 01-7.72 1.53L2 13.33l.87-2.6z"
                        />
                        <Path
                            stroke="#FFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 8h0M5.33 8h0m5.34 0h0"
                        />
                    </G>
                ) : (
                    <G fill="none" fillRule="evenodd">
                        <Path d="M0 0h16v16H0z" />
                        <Path
                            stroke="#3587EA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2 13.33l.87-2.6a4.94 4.94 0 011.4-6.91 6.57 6.57 0 017.9.32 4.9 4.9 0 01.68 7 6.49 6.49 0 01-7.72 1.53L2 13.33M8 8h0M5.33 8h0m5.34 0h0"
                        />
                    </G>
                )}
            </Svg>
        </TouchableOpacity>
    );
};

export default Comment;
