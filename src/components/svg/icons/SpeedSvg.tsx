import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    size?: number;
    color?: string;
}

const SpeedSvg: React.FC<IProps> = ({
    size = 32,
    color = colors.red,
}: IProps) => (
    <Svg
        width={getFVerticalPx(size)}
        height={getFVerticalPx(size)}
        viewBox="0 0 32 32">
        <Path
            d="M28 22.667c0-1.31-.21-2.57-.598-3.75M4 22.667c0-6.627 5.373-12 12-12 3.128 0 5.977 1.197 8.113 3.158"
            fill="none"
            stroke={color}
            strokeWidth="2.267"
            strokeLinecap="round"
        />
        <Path
            d="M16.94 23.799c-.78.531-1.73.495-2.123-.081-.393-.577-.08-1.475.7-2.007.78-.531 8.791-5.31 9.184-4.733.393.577-6.98 6.289-7.76 6.82Z"
            fill={color}
        />
    </Svg>
);

export default SpeedSvg;
