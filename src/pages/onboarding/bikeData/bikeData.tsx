

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
    navigation: any,
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

    const [data, setData] = useState(startData);

    const hendleChangeDataValue = (key: string, value: string) => {
        console.log(' key: ', key)
        let newData = deepCopy(data);
        newData[key] = value;
        setData(newData);
    }



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
            width:'100%',
            height: getTopPx(65)
        }
    })

    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.title, styles.light30]}>
                        {I18n.t('BikeData-title')}
                    </Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-frame-num')}
                            onChangeText={(value: string) => hendleChangeDataValue('frameNumber', value)}
                            // validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.frameNumber}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <ListInputBtn
                            placeholder={I18n.t('BikeData-input-producer')}
                            onChangeText={(value: string) => hendleChangeDataValue('producer', value)}
                            // validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.producer}
                            valueName={I18n.t('BikeData-input-producer-list')}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={I18n.t('BikeData-input-model')}
                            onChangeText={(value: string) => hendleChangeDataValue('model', value)}
                            // validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.frameNumber}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <ListInputBtn
                            placeholder={I18n.t('BikeData-input-size')}
                            onChangeText={(value: string) => hendleChangeDataValue('size', value)}
                            // validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.producer}
                            valueName={I18n.t('BikeData-input-size-list')}
                        />
                    </View>

                    <View style={styles.inputAndPlaceholder}>
                        <ListInputBtn
                            placeholder={I18n.t('BikeData-input-color')}
                            onChangeText={(value: string) => hendleChangeDataValue('color', value)}
                            // validationOk={hendleValidationOk}
                            // validationWrong={hendleValidationWrong}
                            messageWrong={I18n.t('BikeData-input-wrong')}
                            value={data.producer}
                            valueName={I18n.t('BikeData-input-color-list')}
                        />
                    </View>


                    <View style={styles.botton}>
                        <BigRedBtn
                            title={I18n.t('AddingByNumber-btn')}
                        ></BigRedBtn>
                    </View>

                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('TurtorialNFC')}
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