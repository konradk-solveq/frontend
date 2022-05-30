import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

interface IProps {
    imageSize?: number;
    viewBox?: number;
}

const RemoveSvg: React.FC<IProps> = ({
    imageSize = 12,
    viewBox = 12,
}: IProps) => {
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
                d="M10.95 1.05a1.5 1.5 0 00-2.122 0L6 3.88 3.172 1.05A1.5 1.5 0 001.05 3.172L3.88 6 1.05 8.83a1.5 1.5 0 102.122 2.12L6 8.122l2.828 2.829a1.5 1.5 0 102.122-2.121L8.12 6l2.829-2.828a1.5 1.5 0 000-2.122z"
                fill="#333"
            />
        </Svg>
    );
};

export default RemoveSvg;
