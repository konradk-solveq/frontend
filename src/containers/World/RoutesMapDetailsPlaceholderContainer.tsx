import React from 'react';
import {StyleSheet, View} from 'react-native';

import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {AnimatedPlaceholder} from '@components/placeholders';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {HorizontalSpacer} from '@components/divider';

const BASE_HEIGHT = getFVerticalPx(19);
const LARGE_HEIGHT = getFVerticalPx(43);
const CIRCLE_DIAMETER = getFVerticalPx(28);
const BORDER_RADIUS = getFHorizontalPx(6);
const BACKGROUND_COLOR = '#000000';

interface IProps {}

const RoutesMapDetailsPlaceholderContainer: React.FC<IProps> = ({}: IProps) => {
    return (
        <View style={styles.container}>
            {/* Route title */}
            <AnimatedPlaceholder
                layout={{height: BASE_HEIGHT, width: getFHorizontalPx(276)}}
                containerStyle={styles.placeholderContainer}
                showPlaceholder>
                <View
                    style={{
                        height: BASE_HEIGHT,
                        width: getFHorizontalPx(276),
                    }}
                />
            </AnimatedPlaceholder>
            <HorizontalSpacer height={12} />
            {/* Distance and time info */}
            <AnimatedPlaceholder
                layout={{height: BASE_HEIGHT, width: getFHorizontalPx(116)}}
                containerStyle={styles.placeholderContainer}
                showPlaceholder>
                <View
                    style={{
                        height: BASE_HEIGHT,
                        width: getFHorizontalPx(116),
                    }}
                />
            </AnimatedPlaceholder>
            <HorizontalSpacer height={19} />
            {/* Distance to route and route type */}
            <View style={styles.row}>
                <AnimatedPlaceholder
                    layout={{
                        height: BASE_HEIGHT,
                        width: getFHorizontalPx(54) * 2,
                    }}
                    containerStyle={styles.placeholderContainer}
                    showPlaceholder>
                    <View
                        style={{
                            height: BASE_HEIGHT,
                            width: getFHorizontalPx(54),
                        }}
                    />
                </AnimatedPlaceholder>
                <AnimatedPlaceholder
                    layout={{height: BASE_HEIGHT, width: getFHorizontalPx(94)}}
                    containerStyle={styles.placeholderContainer}
                    showPlaceholder>
                    <View
                        style={{
                            height: BASE_HEIGHT,
                            width: getFHorizontalPx(94),
                        }}
                    />
                </AnimatedPlaceholder>
            </View>
            <HorizontalSpacer height={14} />
            {/* Likes */}
            <CirclePlaceholder />
            <HorizontalSpacer height={18} />
            {/* Action buttons */}
            <AnimatedPlaceholder
                layout={{height: LARGE_HEIGHT, width: getFHorizontalPx(358)}}
                containerStyle={styles.placeholderContainer}
                showPlaceholder>
                <View
                    style={{
                        height: LARGE_HEIGHT,
                        width: getFHorizontalPx(358),
                    }}
                />
            </AnimatedPlaceholder>
        </View>
    );
};

const CirclePlaceholder: React.FC = React.memo(() => {
    return (
        <AnimatedPlaceholder
            layout={{height: CIRCLE_DIAMETER, width: CIRCLE_DIAMETER * 5}}
            showPlaceholder>
            <View style={styles.circle} />
        </AnimatedPlaceholder>
    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        backgroundColor: BACKGROUND_COLOR,
        height: CIRCLE_DIAMETER,
        width: CIRCLE_DIAMETER,
        borderRadius: 50,
    },
    placeholderContainer: {
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: BORDER_RADIUS,
    },
});

export default React.memo(RoutesMapDetailsPlaceholderContainer);
