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
import I18n from 'react-native-i18n';

import {useAppSelector, useAppDispatch} from '../../../hooks/redux';

import {setBikesData} from '../../../storage/actions';
import {validateData} from '../../../utils/validation/validation';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {UserBike} from '../../../models/userBike.model';
import {userBikeValidationRules} from '../../../models/bike.model';
import {BikeBaseData} from '../../../models/bike.model';
import {getBike} from '../../../helpers/transformUserBikeData';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import deepCopy from '../../../helpers/deepCopy';

interface Message {
    serial_number: string;
    producer: string;
    name: string;
    size: string;
    color: string;
}

interface Props {
    navigation: any; // <<--- #askBartosz (1) ? nie mam pojęcia ajk to typować, da się wogóle ?
    route: any;
}

const BikeData: React.FC<Props> = ({navigation, route}: Props) => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('BikeData');

    const frame: string = useAppSelector(state => state.user.frameNumber);
    const userBike = useAppSelector<UserBike | null>(state =>
        getBike(state.bikes.list, frame),
    );

    const frameNumber: string = route?.params?.serial_number || frame;
    const [data, setData] = useState<BikeBaseData>({
        id: userBike?.description?.id || null,
        sku: '',
        serial_number: frameNumber,
        producer: userBike?.description?.producer || '',
        name: userBike?.description?.name || '',
        size: userBike?.description?.size || '',
        color: userBike?.description?.color || '',
    }); // dane poszczególnych pól
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
        name: false, // <<--- #askBartosz (2) ? czy lepeiej ten stan przechowywać w komponencie i odpytywać go callbackiem ?
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
                newMessages[key] = trans.btnWrong;
                goFoward = false;
            }
        }
        setMessages(newMessages);

        if (goFoward) {
            try {
                await dispatch(
                    setBikesData({
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
                // navigation.navigate('CyclingProfile');
                /* start to delete */
                navigation.navigate({
                    name: 'BikeSummary',
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
            fontSize: 30,
            lineHeight: 38,
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
            height: 50,
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(10),
            marginBottom: getVerticalPx(65),
        },
    });

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
                <ScrollView>
                    <Text style={styles.title}>{trans.title}</Text>

                    <KeyboardAwareScrollView>
                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={trans.frameNum}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('serial_number', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'serial_number')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={trans.wrong} //TODO: add bether form messages
                            value={data.serial_number}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('frameNumber', value)
                            }
                            forceMessageWrong={messages.serial_number}
                        />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView>
                        <ListInputBtn
                            style={styles.inputAndPlaceholder}
                            placeholder={trans.producer.title}
                            onpress={() =>
                                navigation.navigate('ListPageInput', {
                                    header: trans.producer.listHeader,
                                    list: trans.producer.listData,
                                    last: trans.producer.listDataLast,
                                    key: 'producer',
                                    backTo: 'BikeData',
                                })
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'producer')
                            }
                            messageWrong={trans.wrong}
                            value={data.producer}
                            valueName={trans.producer.list}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('producer', value)
                            }
                            forceMessageWrong={messages.producer}
                        />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView>
                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={trans.model}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('name', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'name')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={trans.wrong}
                            value={data.name}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('name', value)
                            }
                            forceMessageWrong={messages.name}
                        />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView>
                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={trans.size}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('size', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'size')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={trans.wrong}
                            value={data.size}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('size', value)
                            }
                            forceMessageWrong={messages.size}
                        />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView extraScrollHeight={100}>
                        <OneLineTekst
                            style={styles.inputAndPlaceholder}
                            placeholder={trans.color}
                            onChangeText={(value: string) =>
                                hendleChangeDataValue('color', value)
                            }
                            validationOk={(value: string) =>
                                hendleValidationOk(value, 'color')
                            }
                            // validationWrong={hendleValidationWrong}
                            messageWrong={trans.wrong}
                            value={data.color}
                            validationStatus={(value: boolean) =>
                                handleSetCanGoFoard('color', value)
                            }
                            forceMessageWrong={messages.color}
                        />
                    </KeyboardAwareScrollView>

                    <BigRedBtn
                        style={styles.button}
                        title={trans.btn}
                        onpress={() => hendleGoFoward()}
                    />
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeight}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default BikeData;
