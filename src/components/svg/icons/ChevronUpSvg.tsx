import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    size?: number;
    color?: string;
}

const ChevronUpSvg: React.FC<IProps> = ({
    size = 24,
    color = colors.red,
}: IProps) => (
    <Svg
        width={getFVerticalPx(size)}
        height={getFVerticalPx(size)}
        viewBox="0 0 24 24">
        <Path
            d="M20.243 14.243 12 9l-8.243 5.243"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ChevronUpSvg;
