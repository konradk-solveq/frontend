import React from 'react';
import {View, StyleSheet, Text, ScrollView, Platform} from 'react-native';
import I18n from 'react-native-i18n';
import {useNavigation} from '@react-navigation/native';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {showedLocationInfoSelector} from '../../../../storage/selectors/app';

import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {
    onRecordTripActionHandler,
    showLocationInfo,
} from '../../../../utils/showAndroidLlocationInfo';

interface IProps {
    onPress: () => void;
}

const EmptyList: React.FC<IProps> = ({onPress}: IProps) => {
    const trans: any = I18n.t('MainMyRoutes');
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const isLocationInfoShowed = useAppSelector(showedLocationInfoSelector);

    const doAction = () => {
        Platform.OS === 'ios' || isLocationInfoShowed
            ? onRecordTripActionHandler(navigation)
            : showLocationInfo(navigation, dispatch);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{trans.title}</Text>

                <Text style={styles.text}>{trans.text}</Text>

                <BigRedBtn
                    style={styles.btnRecord}
                    title={trans.btnRecord}
                    onpress={doAction}
                />

                <BigWhiteBtn
                    style={styles.btnCheck}
                    title={trans.btnCheck}
                    onpress={onPress}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 40,
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 40,
        lineHeight: 52,
        color: '#d8232a',
        textAlign: 'center',
        marginTop: getVerticalPx(37),
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        lineHeight: 30,
        letterSpacing: 0.5,
        color: '#313131',
        textAlign: 'left',
        marginTop: getVerticalPx(20),
    },
    btnRecord: {
        height: 50,
        width: '100%',
        marginTop: getVerticalPx(40),
    },
    btnCheck: {
        height: 50,
        width: '100%',
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(145),
    },
});

export default EmptyList;
