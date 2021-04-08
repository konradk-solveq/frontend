

import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber } from '../../../../storage/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '../../../../sharedComponents/buttons/transpLightBtn';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getWidthPx,
    getHeightPx,
    getVerticalPx,
    getCenterLeftPx,
    getPosAndWid,
    getPosWithMinHeight,
    getHorizontalPx
} from '../../../../helpers/layoutFoo';


interface Props {
    navigation: any,
    setFrame: Function,
    frame: string
};

const AddingByNumber: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('AddingByNumber')

    const [inputFrame, setInputFrame] = useState('');
    const [canGoFoward, setCanGoFoward] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');

    // do pobrania nazwy użytkownika zz local sorage
    useEffect(() => {
        if (typeof props.frame == 'string') setInputFrame(props.frame);
    }, [props.frame])

    // do wstawiania wartości do inputa i reset powiadomień o błdnym wypełnieniu
    const hendleInputFrame = (value: string) => {
        setInputFrame(value);
        setForceMessageWrong('')
    }

    // valizadja poprawności inputa
    const hendleValidationOk = (value: string) => {
        if (value.length > 4) return true;
        return false
    }

    // validacja błędów, tu: czy wszystkie znaki są cyframi
    const hendleValidationWrong = (value: string) => {
        // const reg = new RegExp('^[0-9]+$');
        // if (value.length > 0 && !reg.test(value)) return true;
        return false
    }

    // walidacja po naciśnięciu przyciku 'Dalej'
    const hendleGoFoward = () => {
        if (canGoFoward) {
            props.setFrame(inputFrame);
            props.navigation.navigate({
                name: 'BikeData',
                params: {frameNumber: inputFrame},
            });
        } else {
            setForceMessageWrong('Pole wymagane')
        }
    }

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white"
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 351, 100),
        // title: getPosAndWid(334, 51, 138),
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVerticalPx(138)
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(30),
            color: '#555555',
            textAlign: 'left'
        },
        infoBtn:{
            position: 'relative',
            height: getHorizontalPx(29),
            marginTop: getHorizontalPx(3),
            width: getWidthPx(),
        },
        botton:{
            position: 'absolute',
            width: getWidthPx(),
            height: getVerticalPx(50),
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65)
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <StackHeader
                onpress={() => props.navigation.navigate('GetToKnowEachOther')}
                inner={trans.head}
            ></StackHeader>

            <Text style={[styles.title, styles.light30]}>
                {trans.text}
            </Text>

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
                />

                <TranspLightBtn
                    style={styles.infoBtn}
                    title={trans.infoBtn}
                    algin='right'
                    color='#3587ea'
                    onpress={() => props.navigation.navigate('AddingInfo')}
                />
            </View>

            <BigRedBtn
                style={styles.botton}
                title={trans.btn}
                onpress={() => hendleGoFoward()}
            ></BigRedBtn>

        </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
    return {
        frame: state.user.frameNumber
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setFrame: (num: string) => dispatch(setFrameNumber(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddingByNumber)