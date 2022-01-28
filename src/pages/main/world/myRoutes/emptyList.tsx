import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Platform} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {showedLocationInfoSelector} from '@storage/selectors/app';
import {BothStackRoute} from '@navigation/route';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {
    onRecordTripActionHandler,
    showLocationInfo,
} from '@utils/showAndroidLlocationInfo';

import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import NoBikeAddedModal from '@sharedComponents/modals/noBikeAddedModal/noBikeAddedModal';
import {isIOS} from '@utils/platform';

interface IProps {
    onPress: () => void;
}

const EmptyList: React.FC<IProps> = ({onPress}: IProps) => {
    const {t} = useMergedTranslation('MainMyRoutes');
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const isLocationInfoShowed = useAppSelector(showedLocationInfoSelector);

    const [showModal, setShowModal] = useState(false);

    const doAction = () => {
        Platform.OS === 'ios' || isLocationInfoShowed
            ? onRecordTripActionHandler(navigation, isIOS)
            : showLocationInfo(navigation, dispatch);
    };

    const onAddActionHandler = () => {
        navigation.navigate({
            name: BothStackRoute.TURTORIAL_NFC_SCREEN,
            params: {emptyFrame: true},
        });
    };

    const onContinueHandler = () => {
        setShowModal(false);
        onAddActionHandler();
    };

    const onCancelHandler = () => {
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{t('title')}</Text>

                <Text style={styles.text}>{t('text')}</Text>

                <BigRedBtn
                    style={styles.btnRecord}
                    title={t('btnRecord')}
                    onpress={doAction}
                />

                <BigWhiteBtn
                    style={styles.btnCheck}
                    title={t('btnCheck')}
                    onpress={onPress}
                />
            </ScrollView>
            <NoBikeAddedModal
                showModal={showModal}
                onContinue={onContinueHandler}
                onClose={onCancelHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: getHorizontalPx(40),
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(40),
        lineHeight: getFontSize(52),
        color: '#d8232a',
        textAlign: 'center',
        marginTop: getVerticalPx(37),
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(23),
        lineHeight: getFontSize(30),
        letterSpacing: 0.5,
        color: '#313131',
        textAlign: 'left',
        marginTop: getVerticalPx(20),
    },
    btnRecord: {
        height: mainButtonsHeight(50),
        width: '100%',
        marginTop: getVerticalPx(40),
    },
    btnCheck: {
        height: mainButtonsHeight(50),
        width: '100%',
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(145),
    },
});

export default EmptyList;
