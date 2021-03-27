

import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber, getFrameNumber } from '../../../store/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getTop,
    getTopPx,
    getWidth,
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
    navigation: any, // <<--- #askBartosz ? nie mam pojęcia ajk to typować, da się wogóle ?
    route: any,
    setBikeData: Function,
    getBikeData: Function,
    bikeData: Data,
};

const BikeData: React.FC<Props> = (props: Props) => {

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
        model: false, // <<--- #askBartosz ? czy lepeiej ten stan przechowywać w komponencie i odpytywać go callbackiem ?
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
                newMessages[key] = I18n.t('BikeData-btn-wrong'),
                goFoward = false;
            }
        }
        setMessages(newMessages);

        if (goFoward) { }
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

    useEffect(() => { // do bsługi listy
        if (props.route.params) {
            let params = props.route.params;

            if (params.key) {
                if (params.value) hendleChangeDataValue(params.key, params.value);
                if (params.status) handleSetCanGoFoard(params.key, params.status)
            }
        }
    }, [props.route.params])

    const [headHeight, setHeadHeightt] = useState(0);

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            color: '#555555',
            textAlign: 'left',
        },
        title: {
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTop(45),
            marginBottom: getTop(30)
        },
        inputAndPlaceholder: {
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTop(10)
        },
        botton: {
            width: getWidth(),
            height: getHeightPx() < 50 ? 50 : getHeightPx(),
            left: getCenterLeft(),
            marginTop: getTopPx(10) < 10 ? 10 : getTopPx(10),
            marginBottom: headHeight
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(65)
        }
    })

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.title, styles.light30]}>
                        {I18n.t('BikeData-title')}
                    </Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-frame-num')}
                            onChangeText={(value: string) => hendleChangeDataValue('frameNumber', value)}
                            validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.frameNumber}
                            validationStatus={(value: boolean) => handleSetCanGoFoard('frameNumber', value)}
                            forceMessageWrong={messages.frameNumber}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <ListInputBtn
                            placeholder={I18n.t('BikeData-input-producer')}
                            onpress={() => props.navigation.navigate('ListPageInput', {
                                header: I18n.t('BikeData-input-producer-list-header'),
                                list: I18n.t('BikeData-input-producer-list-data'),
                                last: I18n.t('BikeData-input-producer-list-data-last'),
                                key: 'producer',
                                backTo: 'BikeData'
                            })}
                            validationOk={hendleValidationOk}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.producer}
                            valueName={I18n.t('BikeData-input-producer-list')}

                            validationStatus={(value: boolean) => handleSetCanGoFoard('model', value)}
                            forceMessageWrong={messages.producer}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-model')}
                            onChangeText={(value: string) => hendleChangeDataValue('model', value)}
                            validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.model}
                            validationStatus={(value: boolean) => handleSetCanGoFoard('model', value)}
                            forceMessageWrong={messages.model}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-size')}
                            onChangeText={(value: string) => hendleChangeDataValue('size', value)}
                            validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.size}
                            validationStatus={(value: boolean) => handleSetCanGoFoard('size', value)}
                            forceMessageWrong={messages.size}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-color')}
                            onChangeText={(value: string) => hendleChangeDataValue('color', value)}
                            validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.color}
                            validationStatus={(value: boolean) => handleSetCanGoFoard('color', value)}
                            forceMessageWrong={messages.color}
                        />
                    </View>

                    <View style={styles.botton}>
                        <BigRedBtn
                            title={I18n.t('AddingByNumber-btn')}
                            onpress={() => hendleGoFoward()}
                        ></BigRedBtn>
                    </View>

                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={I18n.t('BikeData-header')}
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