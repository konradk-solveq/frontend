import React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

interface Props {
    colors?: Array<string>;
    style?: ViewStyle;
}

const ColorCircle: React.FC<IProps> = ({colors, style}: Props) => (
    <Svg style={style} viewBox="0 0 24 24">
        {colors && colors.length == 1 && (
            <Circle cx="12" cy="12" r="12" fill={colors[0]} />
        )}
        {colors && colors.length == 2 && (
            <>
                <Path
                    fill={colors[0]}
                    d="M20.48 3.52L3.52 20.48A12 12 0 0012 24a12 12 0 0012-12 12 12 0 00-3.52-8.48z"
                />
                <Path
                    fill={colors[1]}
                    d="M12 0A12 12 0 000 12a12 12 0 003.52 8.48L20.48 3.52A12 12 0 0012 0z"
                />
            </>
        )}
        {colors && colors.length == 3 && (
            <>
                <Path
                    fill={colors[0]}
                    d="M12 0a12 12 0 00-8.49 3.5A12 12 0 001.61 18L12 12z"
                />
                <Path
                    fill={colors[1]}
                    d="M12 0a12 12 0 018.49 3.5 12 12 0 011.9 14.5L12 12z"
                />
                <Path
                    fill={colors[2]}
                    d="M22.4 18a12 12 0 01-7.29 5.6A12 12 0 011.61 18L12 12z"
                />
            </>
        )}
        {colors && colors.length > 3 && (
            <>
                <Path
                    d="M11.12.03A12 12 0 00.04 11.11L11.12.03z"
                    fill="#ec183c"
                />
                <Path
                    d="M12 0a12 12 0 00-.88.03L.04 11.11A12 12 0 000 12a12 12 0 00.6 3.7L15.71.6A12 12 0 0012 0z"
                    fill="#f6a604"
                />
                <Path
                    d="M15.71.6L.61 15.7a12 12 0 001.74 3.41L19.11 2.35A12 12 0 0015.71.6z"
                    fill="#f6e51f"
                />
                <Path
                    d="M19.11 2.35L2.35 19.11a12 12 0 002.59 2.58L21.69 4.94a12 12 0 00-2.58-2.59z"
                    fill="#7adb05"
                />
                <Path
                    d="M21.69 4.94L4.94 21.69a12 12 0 003.41 1.74L23.42 8.36a12 12 0 00-1.73-3.42z"
                    fill="#4fb0f5"
                />
                <Path
                    d="M23.42 8.36L8.35 23.43A12 12 0 0012 24a12 12 0 00.98-.04l10.97-10.97A12 12 0 0024 12a12 12 0 00-.58-3.64z"
                    fill="#2583f2"
                />
                <Path
                    d="M23.95 12.99L12.98 23.96a12 12 0 0010.97-10.97z"
                    fill="#9300f6"
                />
            </>
        )}
    </Svg>
);

export default ColorCircle;
