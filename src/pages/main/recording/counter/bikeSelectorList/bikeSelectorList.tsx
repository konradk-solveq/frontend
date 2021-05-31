import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import {UserBike} from '../../../../../models/userBike.model';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';
import {nfcIsSupported} from '../../../../../helpers/nfc';

import BikeButton from '../../../../../sharedComponents/buttons/bikeButton';
import BikeIcon from '../../../../../sharedComponents/svg/bikeIcon';

interface Props {
    style?: any;
    list: UserBike[];
    callback: Function;
    currentBike: string | undefined;
    buttonText: string;
}

const {width} = Dimensions.get('window');

const BikeSelectorList: React.FC<Props> = ({
    style,
    list,
    callback,
    currentBike,
}: Props) => {
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
            height: 50,
        },
        item: {
            marginLeft: 15,
        },
        fitstItem: {
            marginLeft: getCenterLeftPx(),
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
                <View
                    style={[
                        styles.item,
                        isFirsEl && styles.fitstItem,
                        isLastEl && styles.lastItem,
                    ]}
                    key={e.description.serial_number}>
                    <BikeButton
                        text={e.description?.name || 'rower'}
                        onPress={() => callback(e.description.serial_number)}
                        {...(isSame && {icon: <BikeIcon />})}
                    />
                </View>
            );
        });

        return buttons;
    };

    return (
        <View style={[styles.container, style]}>
            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.list}>{renderList()}</View>
            </ScrollView>
        </View>
    );
};

export default BikeSelectorList;
