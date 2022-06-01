import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

interface IProps {
    imageSize?: number;
    viewBox?: number;
}

const PlusSvg: React.FC<IProps> = ({imageSize = 14, viewBox = 14}: IProps) => {
    const size = getFVerticalPx(imageSize);
    return (
        <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0a1.5 1.5 0 00-1.5 1.5v4h-4a1.5 1.5 0 100 3h4v4a1.5 1.5 0 003 0v-4h4a1.5 1.5 0 000-3h-4v-4A1.5 1.5 0 007 0z"
                fill="#C63733"
            />
        </Svg>
    );
};

export default PlusSvg;
