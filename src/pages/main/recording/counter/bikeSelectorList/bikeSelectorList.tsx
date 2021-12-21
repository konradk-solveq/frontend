import React, {useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Animated, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {UserBike} from '../../../../../models/userBike.model';
import {
    setObjSize,
    getVerticalPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';

import BikeButton from '../../../../../sharedComponents/buttons/bikeButton';
import BikeIcon from '../../../../../sharedComponents/svg/bikeIcon';

interface Props {
    style?: any;
    list: UserBike[];
    callback: Function;
    currentBike: string | undefined;
    buttonText: string;
    mapHiden: boolean;
    duration: number;
}

const {width} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios'

const BikeSelectorList: React.FC<Props> = ({
    style,
    list,
    callback,
    currentBike,
    mapHiden,
    duration,
}: Props) => {
    const display = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(display, {
            toValue: mapHiden ? 0 : 1,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [mapHiden, display]);

    const listLeft = display.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getHorizontalPx(isIOS ? 65 : 50)],
    });

    const firstItemLeft = display.interpolate({
        inputRange: [0, 1],
        outputRange: [getHorizontalPx(40), getHorizontalPx(5)],
    });

    const lastItemRight = display.interpolate({
        inputRange: [0, 1],
        outputRange: [getHorizontalPx(40), getHorizontalPx(80)],
    });

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            left: 0,
            width: width,
        },
        scroll: {
            width: width,
        },
        list: {
            paddingTop: getVerticalPx(10),
            left: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderStartColor: 'red',
            height: getHorizontalPx(isIOS ? 60 : 50),
        },
        item: {
            marginLeft: getHorizontalPx(15),
        },
        fitstItem: {
            marginLeft: getHorizontalPx(40),
        },
        lastItem: {
            marginRight: getHorizontalPx(40),
        },
        button: {
            backgroundColor: 'transparent',
        },
        text: {
            color: '#3587ea',
        },
    });

    const renderList = () => {
        const buttons = list.map((e, i) => {
            const isFirsEl = i === 0;
            const isLastEl = i === list.length - 1;
            const isSame = currentBike === e.description.serial_number;

            return (
                <Animated.View
                    style={[
                        styles.item,
                        isFirsEl && {
                            marginLeft: firstItemLeft,
                        },
                        isLastEl && {
                            marginRight: lastItemRight,
                        },
                    ]}
                    key={e.description.serial_number}>
                    <BikeButton
                        text={e.description?.name || 'rower'}
                        onPress={() => callback(e.description.serial_number)}
                        {...(isSame && {icon: <BikeIcon />})}
                    />
                </Animated.View>
            );
        });

        return buttons;
    };

    return (
        <Animated.View
            style={[
                styles.container,
                style,
                {
                    left: listLeft,
                },
            ]}>
            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.list}>{renderList()}</View>
            </ScrollView>
        </Animated.View>
    );
};

export default BikeSelectorList;
