import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import {useAppSelector, useAppDispatch} from '../../../hooks/redux';

import { setBikeData } from '../../../storage/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {Bike} from '../../../models/userBike.model';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getHorizontalPx,
    getWidthPx,
    getHeightPx,
} from '../../../helpers/layoutFoo';
import deepCopy from '../../../helpers/deepCopy';

interface Message {
  frameNumber: string;
  producer: string;
  model: string;
  size: string;
  color: string;
}

interface Props {
    navigation: any, // <<--- #askBartosz (1) ? nie mam pojęcia ajk to typować, da się wogóle ?
    route: any,
};

const BikeData: React.FC<Props> = ({navigation, route}: Props) => {
    const dispatch = useAppDispatch();
    const trans = I18n.t('BikeData');

    const frame: string = useAppSelector(state => state.user.frame);
    const userBike: Bike = useAppSelector(state => state.bikes.userBike);

    const frameNumber = route?.params?.frameNumber || frame;
    const [data, setData] = useState<Bike>({
        frameNumber: frameNumber,
        producer: userBike.producer || '',
        model: userBike.model || '',
        size: userBike.size || '',
        color: userBike.color || '',
    }); // dane poszczególnych pól
    const [messages, setMessages] = useState<Message>({
        frameNumber: '',
        producer: '',
        model: '',
        size: '',
        color: ''
    }); // widomości przy wilidaci po wciśnięciu 'DALEJ'
    const [canGoFoward, setCanGoFoward] = useState({ // sant poprawności danych w komponencie
        frameNumber: false,
        producer: false,
        model: false, // <<--- #askBartosz (2) ? czy lepeiej ten stan przechowywać w komponencie i odpytywać go callbackiem ?
        size: false,
        color: false
    });


    // zmiana danych w State po zmiane wartości w komponencie
    const hendleChangeDataValue = (key: string, value: string) => {
        let newData = deepCopy(data);
        newData[key] = value;
        setData(newData);

        let newMessages = deepCopy(messages);
        newMessages[key] = '';
        setMessages(newMessages);
    }

    // zmiana statusu poprawności komponentu do walidacji dla przycisku 'DALEJ'
    const handleSetCanGoFoard = (key: string, value: boolean) => {
        let newCanGoFoward = deepCopy(canGoFoward);
        newCanGoFoward[key] = value;
        setCanGoFoward(newCanGoFoward);
    }

  useEffect(() => {
    let canGoForw = {...canGoFoward};
    Object.keys(data).forEach(k => {
      const key = k as keyof Bike;
      const canGo = data[key] ? true : false;
      canGoForw[key] = canGo;
    });
    setCanGoFoward(canGoForw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const hendleGoFoward = () => { // validacja przycisku 'DALEJ'

        let keys = Object.keys(data); // pomowne sprawdzenie dala zapamiętanych danych
        let newCanGoFoward = deepCopy(canGoFoward);
        for (let key of keys) {
            newCanGoFoward[key] = hendleValidationOk(data[key]);
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
            dispatch(
                setBikeData(
                data.frameNumber,
                data.producer,
                data.model,
                data.size,
                data.color,
                ),
            );
            navigation.navigate('CyclingProfile')
        }
    }

    const hendleValidationOk = (value: string) => {
        if (value.length > 2) return true;
        return false
    }

    const hendleValidationWrong = (value: string) => {
        const reg = new RegExp('^[0-9]+$');
        if (value.length > 0 && !reg.test(value)) return true;
        return false
    }

    useEffect(() => { // do obsługi listy
        if (route.params) {
            let params = route.params;

            if (params.key) {
                if (params.value) hendleChangeDataValue(params.key, params.value);
                if (params.status) handleSetCanGoFoard(params.key, params.status)
            }
        }
    }, [route.params])

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(30),
            color: '#555555',
            textAlign: 'left',
        },
        title: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(45),
            marginBottom: getVerticalPx(30)
        },
        inputAndPlaceholder: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(10)
        },
        botton: {
            width: getWidthPx(),
            height: getHeightPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(10),
            marginBottom: headHeight + getVerticalPx(65)
        }
    })

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.title, styles.light30]}>
                        {trans.title}
                    </Text>

                    <OneLineTekst
                        style={styles.inputAndPlaceholder}
                        placeholder={trans.frameNum}
                        onChangeText={(value: string) => hendleChangeDataValue('frameNumber', value)}
                        validationOk={hendleValidationOk}
                        // validationWrong={hendleValidationWrong}
                        messageWrong={trans.wrong}
                        value={data.frameNumber}
                        validationStatus={(value: boolean) => handleSetCanGoFoard('frameNumber', value)}
                        forceMessageWrong={messages.frameNumber}
                    />

                    <ListInputBtn
                        style={styles.inputAndPlaceholder}
                        placeholder={trans.producer.title}
                        onpress={() => navigation.navigate('ListPageInput', {
                            header: trans.producer.listHeader,
                            list: trans.producer.listData,
                            last: trans.producer.listDataLast,
                            key: 'producer',
                            backTo: 'BikeData'
                        })}
                        validationOk={hendleValidationOk}
                        messageWrong={trans.wrong}
                        value={data.producer}
                        valueName={trans.producer.list}

                        validationStatus={(value: boolean) => handleSetCanGoFoard('producer', value)}
                        forceMessageWrong={messages.producer}
                    />

                    <OneLineTekst
                        style={styles.inputAndPlaceholder}
                        placeholder={trans.model}
                        onChangeText={(value: string) => hendleChangeDataValue('model', value)}
                        validationOk={hendleValidationOk}
                        // validationWrong={hendleValidationWrong}
                        messageWrong={trans.wrong}
                        value={data.model}
                        validationStatus={(value: boolean) => handleSetCanGoFoard('model', value)}
                        forceMessageWrong={messages.model}
                    />

                    <OneLineTekst
                        style={styles.inputAndPlaceholder}
                        placeholder={trans.size}
                        onChangeText={(value: string) => hendleChangeDataValue('size', value)}
                        validationOk={hendleValidationOk}
                        // validationWrong={hendleValidationWrong}
                        messageWrong={trans.wrong}
                        value={data.size}
                        validationStatus={(value: boolean) => handleSetCanGoFoard('size', value)}
                        forceMessageWrong={messages.size}
                    />

                    <OneLineTekst
                        style={styles.inputAndPlaceholder}
                        placeholder={trans.color}
                        onChangeText={(value: string) => hendleChangeDataValue('color', value)}
                        validationOk={hendleValidationOk}
                        // validationWrong={hendleValidationWrong}
                        messageWrong={trans.wrong}
                        value={data.color}
                        validationStatus={(value: boolean) => handleSetCanGoFoard('color', value)}
                        forceMessageWrong={messages.color}
                    />

                    <BigRedBtn
                        style={styles.botton}
                        title={trans.btn}
                        onpress={() => hendleGoFoward()}
                    ></BigRedBtn>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeightt}
            ></StackHeader>
        </SafeAreaView>
    )
}

export default BikeData;
