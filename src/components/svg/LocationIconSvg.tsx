import React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    style?: ViewStyle;
    width?: number;
    height?: number;
    color?: string;
    stroke?: string;
    testID?: string;
}

const LocationIconSvg: React.FC<IProps> = ({
    style,
    width = 24,
    height = 24,
    color = colors.red,
    stroke = colors.white,
    testID = 'location-icon-svg-test-id',
}) => {
    return (
        <Svg
            style={style}
            viewBox="0 0 24 24"
            width={getFVerticalPx(width)}
            height={getFVerticalPx(height)}
            testID={testID}>
            <Path
                fill={color}
                stroke={stroke}
                strokeWidth={2}
                d="M10.941 3.73a1.133 1.133 0 0 1 2.118 0l5.851 14.638c.396.99-.59 1.966-1.535 1.521l-4.899-3.369a1.115 1.115 0 0 0-.952 0l-4.9 3.37c-.944.444-1.93-.533-1.534-1.522L10.94 3.73Z"
            />
        </Svg>
    );
};

export default LocationIconSvg;
