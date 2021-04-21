import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
} from 'react-native';
import I18n from 'react-native-i18n';

import {useAppSelector, useAppDispatch} from '../../../../hooks/redux';
import {setBikesListByFrameNumber} from '../../../../storage/actions';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '../../../../sharedComponents/buttons/transpLightBtn';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getWidthPx,
    getVertical,
    getVerticalPx,
    getCenterLeftPx,
    getPosWithMinHeight,
    getHorizontalPx,
} from '../../../../helpers/layoutFoo';
import Loader from '../loader/loader';

interface Props {
    navigation: any;
    route: any;
}

const AddingByNumber: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const frame: string = useAppSelector(state => state.user.frameNumber);
    const isLoading: boolean = useAppSelector(state => state.bikes.loading);

    const trans = I18n.t('AddingByNumber');

    const [inputFrame, setInputFrame] = useState('');
    const [canGoFoward, setCanGoFoward] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');
    const [areaHeigh, setAreaHeigh] = useState(0);

    // do pobrania nazwy użytkownika zz local sorage
    useEffect(() => {
        if (typeof frame === 'string' && !props.route?.params?.emptyFrame) {
            setInputFrame(frame);
        }
    }, [frame, props.route?.params?.emptyFrame]);

    // do wstawiania wartości do inputa i reset powiadomień o błdnym wypełnieniu
    const hendleInputFrame = (value: string) => {
        setInputFrame(value);
        setForceMessageWrong('');
    };

    // valizadja poprawności inputa
    const hendleValidationOk = (value: string) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    };

    // validacja błędów, tu: czy wszystkie znaki są cyframi
    const hendleValidationWrong = (value: string) => {
        // const reg = new RegExp('^[0-9]+$');
        // if (value.length > 0 && !reg.test(value)) return true;
        return false;
    };

    // walidacja po naciśnięciu przyciku 'Dalej'
    const hendleGoFoward = async () => {
        if (canGoFoward) {
            const trimmedInputFrame = inputFrame?.trim();
            try {
                await dispatch(setBikesListByFrameNumber(trimmedInputFrame));
                props.navigation.navigate({
                    name: 'BikeSummary',
                    params: {frameNumber: trimmedInputFrame},
                });
                return;
            } catch (error) {
                if (error.notFound) {
                    props.navigation.navigate({
                        name: 'BikeData',
                        params: {frameNumber: trimmedInputFrame},
                    });
                    return;
                }
                const errorMessage = error?.errorMessage || 'Error';
                Alert.alert('Error', errorMessage);
            }
        } else {
            setForceMessageWrong('Pole wymagane');
        }
    };

    const handleAreaHeight = (layout: any) => {
        setAreaHeigh(layout.height);
    };

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: headHeight,
        },
        area: {
            width: '100%',
            height: areaHeigh,
            minHeight: getVertical(414),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 351 - 100, 100),
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#555555',
            textAlign: 'left',
        },
        infoBtn: {
            position: 'relative',
            height: getHorizontalPx(29),
            marginTop: 3,
            width: getWidthPx(),
        },
        botton: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65 + 100),
        },
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Loader />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={styles.container}
            onLayout={({nativeEvent}) => handleAreaHeight(nativeEvent.layout)}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={styles.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{trans.text}</Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={trans.placeholder}
                            onChangeText={hendleInputFrame}
                            validationOk={hendleValidationOk}
                            validationWrong={hendleValidationWrong}
                            messageWrong={trans.messageWrong}
                            value={inputFrame}
                            validationStatus={setCanGoFoward}
                            forceMessageWrong={forceMessageWrong}
                            maxLength={10}
                            // keyboardType={"numeric"}
                        />

                        <TranspLightBtn
                            style={styles.infoBtn}
                            title={trans.infoBtn}
                            algin="right"
                            color="#3587ea"
                            onpress={() =>
                                props.navigation.navigate('AddingInfo')
                            }
                        />
                    </View>

                    <BigRedBtn
                        style={styles.botton}
                        title={trans.btn}
                        onpress={() => hendleGoFoward()}
                    />
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                getHeight={setHeadHeight}
                inner={trans.head}
            />
        </SafeAreaView>
    );
};

export default AddingByNumber;
