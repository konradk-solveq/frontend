import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import AnimSvg from '../../helpers/animSvg';

import {getVertical, getVerticalPx} from '../../helpers/layoutFoo';

import loaderSvg from './loaderSvg';

const DEFAULT_WIDTH = 44;
const DEFAULT_HEIGHT = 34;

interface IProps {
    width?: number;
    height?: number;
    spinnerStyle?: ViewStyle;
    logoStyle?: ViewStyle;
}

const Loader: React.FC<IProps> = ({
    width,
    height,
    spinnerStyle,
    logoStyle,
}: IProps) => {
    const circleSize = useMemo(
        () => ({
            width: getVerticalPx((width || DEFAULT_WIDTH) * 2),
            height: getVerticalPx((height || DEFAULT_HEIGHT) * 2),
        }),
        [height, width],
    );

    const logoSize = useMemo(
        () => ({
            width: getVertical(width || DEFAULT_WIDTH),
            height: getVerticalPx(height || DEFAULT_HEIGHT),
        }),
        [height, width],
    );

    return (
        <View style={styles.container}>
            <AnimSvg
                style={[styles.circle, circleSize, spinnerStyle]}
                source={loaderSvg}
            />

            <View style={[styles.logo, logoSize, logoStyle]}>
                <Svg viewBox="0 0 44 34">
                    <G fill="#D8232A" fillRule="evenodd">
                        <Path
                            d="M27.59 21.29L38.285 7.507h-6.12c-.985 0-1.795.09-2.43.264-.63.181-1.168.404-1.608.668-.44.265-.817.557-1.131.884-.294.299-9.696 11.953-9.718 11.967l14.454 10.846c.314.174.636.362.95.55.314.195.692.369 1.132.529.44.16.978.285 1.614.396.635.105 1.439.154 2.424.154h6.126L27.59 21.29z"
                            transform="translate(-185 -431) translate(185 431)"
                        />
                        <Path
                            d="M12.095 21.304L28.589 0H21.56c-1.125 0-2.054.104-2.78.306-.727.202-1.342.46-1.852.758-.503.306-.936.64-1.3 1.016C15.295 2.428.29 21.29.276 21.31l10.06 7.536c.363.194.726.41 1.09.626.362.222.796.424 1.299.605.502.18 1.124.334 1.85.452.72.119 1.656.181 2.781.181h7.028l-12.288-9.406z"
                            transform="translate(-185 -431) translate(185 431)"
                        />
                    </G>
                </Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        padding: getVerticalPx(10),
    },
    logo: {},
});

export default Loader;
