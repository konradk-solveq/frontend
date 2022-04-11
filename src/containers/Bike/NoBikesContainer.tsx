import React from 'react';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';

import colors from '@theme/colors';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import ServicePointsTile from '@pages/main/bike/components/tiles/ServicePointsTile';
import {AddBikeTile} from '@components/tiles';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    onPressTile: (e: GestureResponderEvent) => void;
}

const NoBikesContainer: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressTile,
}: IProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.tileContainer}>
                <AddBikeTile
                    onPressPrimary={onPressPrimary}
                    onPressSecondary={onPressSecondary}
                />
            </View>
            <ServicePointsTile onPressTile={onPressTile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.screenBackgroundPrimary,
        paddingHorizontal: appContainerHorizontalMargin,
        paddingBottom: getFVerticalPx(40),
    },
    tileContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },
});

export default NoBikesContainer;
