import React from 'react';
import {View, Image, StyleSheet, ViewStyle, ImageStyle} from 'react-native';

import Svg, {G, Path} from 'react-native-svg';

import DefaultImage from '../../assets/images/track.png';
import {getVerticalPx} from '../../helpers/layoutFoo';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const DEFAULT_LOGO_WIDTH = 44;
const DEFAULT_LOGO_HEIGHT = 34;

interface IProps {
    containerStyles?: ViewStyle;
    imageStyles?: ImageStyle;
    noBackgroundImage?: boolean;
    logoSize?: {height: number; width: number};
}

const RouteImagePlaceholder: React.FC<IProps> = ({
    containerStyles,
    imageStyles,
    noBackgroundImage,
    logoSize,
}: IProps) => {
    return (
        <View style={[styles.container, containerStyles]}>
            {!noBackgroundImage && (
                <Image
                    resizeMode="contain"
                    style={[styles.image, imageStyles]}
                    source={{uri: DEFAULT_IMAGE}}
                />
            )}
            <View style={styles.svgWrapper}>
                <Svg
                    viewBox={'0 0 44 34'}
                    width={getVerticalPx(logoSize?.width || DEFAULT_LOGO_WIDTH)}
                    height={getVerticalPx(
                        logoSize?.width || DEFAULT_LOGO_HEIGHT,
                    )}>
                    <G fill="#D8232A" fillRule="evenodd">
                        <Path d="M27.59 21.29L38.285 7.507h-6.12c-.985 0-1.795.09-2.43.264-.63.181-1.168.404-1.608.668-.44.265-.817.557-1.131.884-.294.299-9.696 11.953-9.718 11.967l14.454 10.846c.314.174.636.362.95.55.314.195.692.369 1.132.529.44.16.978.285 1.614.396.635.105 1.439.154 2.424.154h6.126L27.59 21.29z" />
                        <Path d="M12.095 21.304L28.589 0H21.56c-1.125 0-2.054.104-2.78.306a7.744 7.744 0 00-1.852.758c-.503.306-.936.64-1.3 1.016C15.295 2.428.29 21.29.276 21.31l10.06 7.536c.363.194.726.41 1.09.626.362.222.796.424 1.299.605a10.55 10.55 0 001.85.452c.72.119 1.656.181 2.781.181h7.028l-12.288-9.406z" />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: getVerticalPx(106),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    svgWrapper: {
        position: 'absolute',
    },
});

export default RouteImagePlaceholder;
