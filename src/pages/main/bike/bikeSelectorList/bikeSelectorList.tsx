import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import {UserBike} from '../../../../models/userBike.model';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';
import {nfcIsSupported} from '../../../../helpers/nfc';

import BikeButton from '../../../../sharedComponents/buttons/bikeButton';
import BikeIcon from '../../../../sharedComponents/svg/bikeIcon';
import {BothStackRoute} from '../../../../navigation/route';

interface Props {
    style?: any;
    list: UserBike[];
    callback: Function;
    currentBike: string | undefined;
    buttonText: string;
}

const {width} = Dimensions.get('window');

const BikeSelectorList: React.FC<Props> = ({
    list,
    callback,
    currentBike,
    buttonText,
}: Props) => {
    const navigation = useNavigation();

    const [nfc, setNfc] = useState();

    nfcIsSupported().then(r => {
        setNfc(r);
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
        },
        item: {
            marginLeft: 15,
        },
        fitstItem: {
            marginLeft: getCenterLeftPx(),
        },
        lastItem: {
            marginLeft: 0,
            marginRight: getCenterLeftPx(),
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
            const isSame = currentBike === e.description.serial_number;

            return (
                <View
                    style={[styles.item, isFirsEl && styles.fitstItem]}
                    key={e.description.serial_number}>
                    <BikeButton
                        text={e.description?.name || 'rower'}
                        onPress={() => callback(e.description.serial_number)}
                        {...(isSame && {icon: <BikeIcon />})}
                    />
                </View>
            );
        }, []);

        buttons.push(
            <View
                style={[
                    styles.item,
                    styles.lastItem,
                    list.length == 0 && styles.fitstItem,
                ]}
                key={`${list.length}_add`}>
                <BikeButton
                    text={`+ ${buttonText}`}
                    onPress={() => {
                        const pushAction = StackActions.push(
                            nfc
                                ? BothStackRoute.TURTORIAL_NFC_SCREEN
                                : BothStackRoute.ADDING_BY_NUMBER_SCREEN,
                            {
                                emptyFrame: true,
                            },
                        );

                        navigation.dispatch(pushAction);
                    }}
                    buttonStyle={styles.button}
                    textStyle={styles.text}
                    testID="add-bike-btn"
                />
            </View>,
        );

        return buttons;
    };

    return (
        <View style={styles.container}>
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
