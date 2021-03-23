

import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber, getFrameNumber } from '../../../../store/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import DinLight30 from '../../../../sharedComponents/text/dinLight30';
import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '../../../../sharedComponents/buttons/transpLightBtn';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

import {
    initAppSize,
    setObjSize,
    getWidth,
    getHeightPx,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
} from '../../../../helpers/layoutFoo';



interface WrongScanProps {
    navigation: any,
    setFrame: Function,
    getFrame: Function,
    frame: string
};

const AddingByNumber: React.FC<WrongScanProps> = (props: WrongScanProps) => {

    const [inputFrame, setInputFrame] = useState('');

    useEffect(() => {
        props.getFrame();
        if (typeof props.frame == 'string') setInputFrame(props.frame);
    }, [props.frame])

    const hendleValidationOk = (value: string) => {
        if (value.length > 8) return true;
        return false
    }

    const hendleValidationWrong = (value: string) => {
        const reg = new RegExp('^[0-9]+$');
        if (value.length > 0 && !reg.test(value)) return true;
        return false
    }

    initAppSize();

    setObjSize(334, 50);
    const botton = {
        position: 'absolute',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeft(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getTopPx(65)
    }

    setObjSize(334, 29);
    const h = getHeightPx();
    const infoBtn = {
        position: 'relative',
        height: h > 29 ? h : 29,
        marginTop: 3
    }

    const styles = StyleSheet.create({
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 351, 100),
        title: getPosAndWid(334, 51, 138),
        infoBtn,
        botton,
    })

    return (
        <>
            <StackHeader
                onpress={() => { }}
                inner={I18n.t('AddingByNumber-title')}
            ></StackHeader>

            <View style={styles.title}>
                <DinLight30
                    algin='left'
                    inner={I18n.t('AddingByNumber-text')}
                />
            </View>

            <View style={styles.inputAndPlaceholder}>
                <OneLineTekst
                    placeholder={I18n.t('AddingByNumber-placeholder')}
                    onChangeText={setInputFrame}
                    validationOk={hendleValidationOk}
                    validationWrong={hendleValidationWrong}
                    messageWrong={I18n.t('AddingByNumber-message-wrong')}
                    value={inputFrame}
                />
                <View style={styles.infoBtn}>
                    <TranspLightBtn
                        title={I18n.t('AddingByNumber-info-btn')}
                        algin='right'
                        color='#3587ea'
                    ></TranspLightBtn>
                </View>
            </View>

            <View style={styles.botton}>
                <BigRedBtn
                    title={I18n.t('AddingByNumber-btn')}
                ></BigRedBtn>
            </View>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddingByNumber)