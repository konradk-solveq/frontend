import React, {useEffect, useState} from 'react';
import {View, ViewStyle, Image, StyleSheet} from 'react-native';

import {getHorizontalPx} from '../../../../../helpers/layoutFoo';

// top
import Tile_bg_lt from '@assets/images/title-bg/lt.png';
import Tile_bg_ct from '@assets/images/title-bg/ct.png';
import Tile_bg_rt from '@assets/images/title-bg/rt.png';

// middle
import Tile_bg_lm from '@assets/images/title-bg/lm.png';
import Tile_bg_rm from '@assets/images/title-bg/rm.png';

//bottom
import Tile_bg_lb from '@assets/images/title-bg/lb.png';
import Tile_bg_cb from '@assets/images/title-bg/cb.png';
import Tile_bg_rb from '@assets/images/title-bg/rb.png';

// top
const IMAGE_BG_LT = Image.resolveAssetSource(Tile_bg_lt).uri;
const IMAGE_BG_CT = Image.resolveAssetSource(Tile_bg_ct).uri;
const IMAGE_BG_RT = Image.resolveAssetSource(Tile_bg_rt).uri;

// middle
const IMAGE_BG_LM = Image.resolveAssetSource(Tile_bg_lm).uri;
const IMAGE_BG_RM = Image.resolveAssetSource(Tile_bg_rm).uri;

//bottom
const IMAGE_BG_LB = Image.resolveAssetSource(Tile_bg_lb).uri;
const IMAGE_BG_CB = Image.resolveAssetSource(Tile_bg_cb).uri;
const IMAGE_BG_RB = Image.resolveAssetSource(Tile_bg_rb).uri;

interface Props {
    children: React.ReactNode;
    containerStyle?: ViewStyle;
}

const TileBackground: React.FC<Props> = ({children, containerStyle}: Props) => {
    const [tileWidth, setTileWidth] = useState(0);
    const [tileHeight, setTileHeight] = useState(0);
    const BR = 30; // border radius

    const handleShadowBox = (layout: any) => {
        setTileWidth(layout.width - getHorizontalPx(2 * BR));
        setTileHeight(layout.height - getHorizontalPx(2 * BR));
    };

    const styles = StyleSheet.create({
        top: {
            position: 'absolute',
            top: getHorizontalPx(-BR),
            height: getHorizontalPx(2 * BR),
        },
        middle: {
            position: 'absolute',
            resizeMode: 'stretch',
            top: getHorizontalPx(BR),
            height: tileHeight,
        },
        bottom: {
            position: 'absolute',
            bottom: getHorizontalPx(-BR),
            height: getHorizontalPx(2 * BR),
        },
        left: {
            left: getHorizontalPx(-BR),
            width: getHorizontalPx(2 * BR),
        },
        center: {
            resizeMode: 'stretch',
            left: getHorizontalPx(BR),
            width: tileWidth,
        },
        right: {
            right: getHorizontalPx(-BR),
            width: getHorizontalPx(2 * BR),
        },
    });

    const [countParts, setCountParts] = useState(0);
    const [opacity, setOpacity] = useState(0);

    const heandleOnLoad = () => {
        setCountParts(countParts + 1);
    };

    useEffect(() => {
        if (countParts >= 8) {
            setOpacity(1);
        }
    }, [countParts]);

    return (
        <View
            style={[containerStyle, {opacity: opacity}]}
            onLayout={({nativeEvent}) => handleShadowBox(nativeEvent.layout)}>
            {/* top */}
            <Image
                source={{uri: IMAGE_BG_LT}}
                style={[styles.top, styles.left]}
                onLoad={heandleOnLoad}
            />
            <Image
                source={{uri: IMAGE_BG_CT}}
                style={[styles.top, styles.center]}
                onLoad={heandleOnLoad}
            />
            <Image
                source={{uri: IMAGE_BG_RT}}
                style={[styles.top, styles.right]}
                onLoad={heandleOnLoad}
            />

            {/* middle */}
            <Image
                source={{uri: IMAGE_BG_LM}}
                style={[styles.middle, styles.left]}
                onLoad={heandleOnLoad}
            />
            <Image
                source={{uri: IMAGE_BG_RM}}
                style={[styles.middle, styles.right]}
                onLoad={heandleOnLoad}
            />

            {/* bottom */}
            <Image
                source={{uri: IMAGE_BG_LB}}
                style={[styles.bottom, styles.left]}
                onLoad={heandleOnLoad}
            />
            <Image
                source={{uri: IMAGE_BG_CB}}
                style={[styles.bottom, styles.center]}
                onLoad={heandleOnLoad}
            />
            <Image
                source={{uri: IMAGE_BG_RB}}
                style={[styles.bottom, styles.right]}
                onLoad={heandleOnLoad}
            />
            <View>{children}</View>
        </View>
    );
};

export default TileBackground;
