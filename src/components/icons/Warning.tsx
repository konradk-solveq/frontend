import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {ViewStyle} from 'react-native';
import {getFFontSize} from '@helpers/appLayoutDimensions';

interface IProps {
    style?: ViewStyle;
    size?: number;
    testID?: string;
}
const Warning = ({
    style,
    size = 24,
    testID = 'warranty-icon-warning',
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
            <Circle cx={12} cy={12} r={12} fill="#EFD8D8" />
            <Path
                d="M12.048 13.952c.483 0 .85-.138 1.104-.415.258-.276.397-.668.414-1.174l.177-6.218c.006-.077.009-.153.009-.23v-.212c0-.535-.15-.953-.45-1.253-.3-.3-.718-.45-1.254-.45-.53 0-.95.15-1.262.45-.306.3-.458.718-.458 1.253v.212c0 .077.002.153.008.23l.186 6.218c.011.506.144.898.397 1.174.253.277.63.415 1.13.415zM12.04 19c.347 0 .664-.082.953-.247.288-.159.517-.377.688-.653.17-.27.256-.574.256-.91 0-.335-.085-.638-.256-.908-.17-.277-.4-.494-.688-.653a1.888 1.888 0 00-.953-.247c-.353 0-.674.082-.962.247a1.834 1.834 0 00-.689.653c-.17.27-.256.573-.256.909 0 .335.086.638.256.909.17.276.4.494.689.653.288.165.609.247.962.247z"
                fill="#C63733"
            />
        </Svg>
    );
};

export default Warning;
