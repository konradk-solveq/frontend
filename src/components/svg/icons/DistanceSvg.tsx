import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    size?: number;
    color?: string;
}

const DistanceSvg: React.FC<IProps> = ({
    size = 32,
    color = colors.red,
}: IProps) => (
    <Svg
        width={getFVerticalPx(size)}
        height={getFVerticalPx(size)}
        viewBox="0 0 32 32">
        <Path
            d="M5.333 26.667h18.278A4.389 4.389 0 0 0 28 22.278v0a4.389 4.389 0 0 0-4.389-4.389h-8.404a3.611 3.611 0 0 1-3.611-3.61v0a3.611 3.611 0 0 1 3.611-3.612h4.631"
            stroke={color}
            strokeWidth="2.267"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="5.333" cy="26.667" r="2.667" fill={color} />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.667 10.666c2.209 0 4-3.538 4-5.6s-1.791-3.733-4-3.733c-2.21 0-4 1.671-4 3.733 0 2.062 1.79 5.6 4 5.6Zm0-4a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z"
            fill={color}
        />
    </Svg>
);

export default DistanceSvg;
