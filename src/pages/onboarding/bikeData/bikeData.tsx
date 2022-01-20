import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Alert,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppSelector, useAppDispatch} from '@hooks/redux';

import {setBikeData} from '@storage/actions';
import {validateData} from '@utils/validation/validation';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '@sharedComponents/inputs/oneLineTekst';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';

import {userBikeValidationRules} from '@models/bike.model';
import {BikeBaseData} from '@models/bike.model';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import deepCopy from '@helpers/deepCopy';
import {frameNumberSelector} from '@storage/selectors';
import {bikeDescriptionByFrameNumberSelector} from '@storage/selectors/bikes';
import {getBikesBaseData} from '@utils/transformData';
import {BothStackRoute} from '@navigation/route';

interface Message {
    serial_number: string;
    producer: string;
    name: string;
    size: string;
    color: string;
}

interface Props {
    navigation: any;
    route: any;
}

const BikeData: React.FC<Props> = ({navigation, route}: Props) => {
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('BikeData');

    const frame: string = useAppSelector(frameNumberSelector);
    const bikeDescription = useAppSelector(state =>
        bikeDescriptionByFrameNumberSelector(state, frame),
    );

    const frameNumber: string = route?.params?.serial_number || frame;
    const [data, setData] = useState(
        getBikesBaseData(bikeDescription, frameNumber),
    ); // dane poszczególnych pól
    const [messages, setMessages] = useState<Message>({
        serial_number: '',
        producer: '',
        name: '',
        size: '',
        color: '',
    }); // widomości przy wilidaci po wciśnięciu 'DALEJ'
    const [canGoFoward, setCanGoFoward] = useState({
        // sant poprawności danych w komponencie
        serial_number: false,
        producer: false,
        name: false,
        size: false,
        color: false,
    });

    // zmiana danych w State po zmiane wartości w komponencie
    const hendleChangeDataValue = (key: string, value: string) => {
        let newData = deepCopy(data);
        newData[key] = value;
        setData(newData);

        let newMessages = deepCopy(messages);
        newMessages[key] = '';
        setMessages(newMessages);
    };

    // zmiana statusu poprawności komponentu do walidacji dla przycisku 'DALEJ'
    const handleSetCanGoFoard = (key: string, value: boolean) => {
        let newCanGoFoward = deepCopy(canGoFoward);
        newCanGoFoward[key] = value;
        setCanGoFoward(newCanGoFoward);
    };

    useEffect(() => {
        let canGoForw = {...canGoFoward};
        Object.keys(data).forEach(k => {
            const key = k as keyof BikeBaseData;
            const canGo = data[key] ? true : false;
            canGoForw[key] = canGo;
        });
        setCanGoFoward(canGoForw);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hendleGoFoward = async () => {
        // validacja przycisku 'DALEJ'

        let keys = Object.keys(data); // pomowne sprawdzenie dala zapamiętanych danych
        let newCanGoFoward = deepCopy(canGoFoward);
        for (let key of keys) {
            newCanGoFoward[key] = hendleValidationOk(
                data[key as keyof BikeBaseData],
                key,
            );
        }

        let goFoward = true;
        let newMessages = deepCopy(messages);

        for (let key in newCanGoFoward) {
            if (newCanGoFoward[key]) {
                newMessages[key] = '';
            } else {
                newMessages[key] = t('btnWrong');
                goFoward = false;
            }
        }
        setMessages(newMessages);

        if (goFoward) {
            try {
                await dispatch(
                    setBikeData({
                        description: {
                            name: data.name,
                            id: null,
                            sku: '',
                            producer: data.producer,
                            serial_number: data.serial_number,
                            size: data.size,
                            color: data.color,
                        },
                    }),
                );
                /* TODO: this change is temporary - business  decision */
                // navigation.navigate(
                //     OnboardingStackRoute.CYCLING_PROFILE_SCREEN,
                // );
                /* start to delete */
                navigation.navigate({
                    name: BothStackRoute.BIKE_SUMMARY_SCREEN,
                    params: {frameNumber: data.serial_number},
                });
                /* end to delete */
            } catch (error) {
                const errorMessage = error?.errorMessage || 'Error';
                Alert.alert('Error', errorMessage);
            }
        }
    };

    const hendleValidationOk = (value: string, fieldName: string) => {
        return validateData(
            userBikeValidationRules[fieldName as keyof BikeBaseData],
            value,
        );
    };

    const hendleValidationWrong = (value: string) => {
        const reg = new RegExp('^[0-9]+$');
        if (value.length > 0 && !reg.test(value)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        // do obsługi listy
        if (route.params) {
            let params = route.params;

            if (params.key) {
                if (params.value) {
                    hendleChangeDataValue(params.key, params.value);
                }
                if (params.status) {
                    handleSetCanGoFoard(params.key, params.status);
                }
            }
        }
    }, [route.params]);

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',
            top: getVerticalPx(-20), // dla lepszego auto scrolingu przy wyborze inputa i pojawieniu się klawiatury
        },
        title: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(45 + 20) + headHeight,
            marginBottom: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            lineHeight: getFontSize(38),
            color: '#555555',
            textAlign: 'left',
        },
        inputAndPlaceholder: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(10),
        },
        button: {
            width: getWidthPx(),
            height: mainButtonsHeight(50),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(10),
            marginBottom: getVerticalPx(65),
        },
    });

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <KeyboardAwareScrollView>
                        <Text style={styles.title}>{t('title')}</Text>

                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={t('frameNum')}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('serial_number', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'serial_number')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={t('wrong')} //TODO: add bether form messages
                            value={data.serial_number}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('frameNumber', value)
                            }
                            forceMessageWrong={messages.serial_number}
                        />

                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={t('producer.title')}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('producer', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'producer')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={t('wrong')}
                            value={data.producer}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('producer', value)
                            }
                            forceMessageWrong={messages.producer}
                        />

                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={t('model')}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('name', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'name')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={t('wrong')}
                            value={data.name}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('name', value)
                            }
                            forceMessageWrong={messages.name}
                        />

                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={t('size')}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('size', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'size')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={t('wrong')}
                            value={data.size}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('size', value)
                            }
                            forceMessageWrong={messages.size}
                            maxLength={
                                10
                            } /* TODO: sync with validation rules */
                        />

                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={t('color')}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('color', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'color')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={t('wrong')}
                            value={data.color}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('color', value)
                            }
                            forceMessageWrong={messages.color}
                        />

                        <BigRedBtn
                            style={styles.button}
                            title={t('btn')}
                            onpress={() => hendleGoFoward()}
                        />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => navigation.goBack()}
                inner={t('header')}
                getHeight={setHeadHeight}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default BikeData;
