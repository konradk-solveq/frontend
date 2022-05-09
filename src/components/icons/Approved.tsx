import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {ViewStyle} from 'react-native';
import {getFFontSize} from '@helpers/appLayoutDimensions';

interface IProps {
    style?: ViewStyle;
    size?: number;
    testID?: string;
}

const Approved = ({
    style,
    size = 24,
    testID = 'warranty-icon-approve',
}: IProps) => {
    const svgSize = getFFontSize(size);
    return (
        <Svg
            width={svgSize}
            height={svgSize}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
            testID={testID}>
            <Circle cx={12} cy={12} r={12} fill="#78BA35" />
            <Path
                d="M7.237 12.763l3.334 3.333 6.762-6.763"
                stroke="#fff"
                strokeWidth={2.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Approved;
