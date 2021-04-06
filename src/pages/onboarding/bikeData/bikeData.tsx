import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber, getFrameNumber } from '../../../storage/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getTopPx,
    getLeftPx,
    getWidthPx,
    getHeightPx,
} from '../../../helpers/layoutFoo';
import deepCopy from "../../../helpers/deepCopy";

interface Data {
    frameNumber: string,
    producer: string,
    model: string,
    size: string,
    color: string
};

interface Props {
    navigation: any, // <<--- #askBartosz (1) ? nie mam pojęcia ajk to typować, da się wogóle ?
    route: any,
    setBikeData: Function,
    getBikeData: Function,
    bikeData: Data,
};

const BikeData: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('BikeData');

    let startData: Data = {
        frameNumber: '',
        producer: '',
        model: '',
        size: '',
        color: ''
    }

    const [data, setData] = useState(startData); // dane poszczególnych pól
    const [messages, setMessages] = useState(startData); // widomości przy wilidaci po wciśnięciu 'DALEJ'
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

    const hendleGoFoward = () => { // validacja przycisku 'DALEJ'
        let goFoward = true;

        let newMessages = deepCopy(messages);

        for (let key in canGoFoward) {
            if (canGoFoward[key]) {
                newMessages[key] = '';
            } else {
                newMessages[key] = trans.btnWrong,
                    goFoward = false;
            }
        }
        setMessages(newMessages);

        if (goFoward) {
            props.navigation.navigate('PermitsDeclarations')
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
        if (props.route.params) {
            let params = props.route.params;

            if (params.key) {
                if (params.value) hendleChangeDataValue(params.key, params.value);
                if (params.status) handleSetCanGoFoard(params.key, params.status)
            }
        }
    }, [props.route.params])

    const [headHeight, setHeadHeightt] = useState(0);

    initAppSize();

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getLeftPx(30),
            color: '#555555',
            textAlign: 'left',
        },
        title: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getTopPx(45),
            marginBottom: getTopPx(30)
        },
        inputAndPlaceholder: {
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getTopPx(10)
        },
        botton: {
            width: getWidthPx(),
            height: getHeightPx(),
            left: getCenterLeftPx(),
            marginTop: getTopPx(10),
            marginBottom: headHeight + getTopPx(65)
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
                        onpress={() => props.navigation.navigate('ListPageInput', {
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
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeightt}
            ></StackHeader>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        frame: state.user.frameNumber
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setFrame: (num: string) => dispatch(setFrameNumber(num)),
    getFrame: async () => dispatch(await getFrameNumber()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BikeData)