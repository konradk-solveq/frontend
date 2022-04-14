import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    imageSize?: number;
    viewBox?: number;
}

const WarningSvg: React.FC<IProps> = ({
    imageSize = 44,
    viewBox = 24,
}: IProps) => {
    const size = getFHorizontalPx(imageSize);
    const box = getFHorizontalPx(viewBox);
    return (
        <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${box} ${box}`}
            fill="none">
            <Circle cx="12" cy="12" r="9" fill={colors.lightRed} />
            <Path
                d="M12.036 14.214c.362 0 .638-.104.828-.311.194-.208.297-.5.31-.88l.133-5.415a2.25 2.25 0 0 0 .007-.172v-.159c0-.401-.113-.714-.338-.94-.225-.224-.538-.337-.94-.337-.397 0-.712.113-.946.338-.23.225-.344.538-.344.94v.158c0 .058.002.115.006.172l.14 5.415c.008.38.107.672.297.88.19.207.472.311.847.311ZM12.03 18c.26 0 .498-.062.715-.185.216-.12.388-.283.516-.49.128-.203.192-.43.192-.682 0-.251-.064-.479-.192-.682-.128-.207-.3-.37-.516-.49a1.415 1.415 0 0 0-.715-.185c-.265 0-.506.062-.722.186-.216.119-.388.282-.516.49-.128.202-.192.43-.192.681 0 .252.064.479.192.682.128.207.3.37.516.49.216.123.457.185.722.185Z"
                fill={colors.red}
            />
        </Svg>
    );
};

export default WarningSvg;
