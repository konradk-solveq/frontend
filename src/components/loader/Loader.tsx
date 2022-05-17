import React from 'react';
import {ActivityIndicator} from 'react-native';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {isIOS} from '@utils/platform';
import colors from '@theme/colors';

interface IProps {
    color?: string;
    iosSize?: 'small' | 'large';
    androidSize?: number;
    testID?: string;
}

const Loader: React.FC<IProps> = ({
    color = colors.red,
    iosSize,
    androidSize = 24,
    testID = 'loader-test-id',
}: IProps) => {

    return (
        <ActivityIndicator
            size={isIOS ? iosSize : getFHorizontalPx(androidSize)}
            color={color}
            testID={testID}
        />
    );
};

export default Loader;
