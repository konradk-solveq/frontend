//getToKnowEachOther
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from "react-redux";
import I18n from 'react-native-i18n';
import { setUserName, getUserName } from '../../../store/actions/index';

import {
    initAppSize,
    setObjSize,
    getWidth,
    getWidthPxOf,
    getHeightPx,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
    getPosStaticHeight
} from '../../../helpers/layoutFoo';

import KroosLogo from './krossLogo';
import DinLight30 from '../../../sharedComponents/text/dinLight30';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

interface GetToKnowProps {
    navigation: any,
    name: string,
    setName: Function,
    getName: Function
};

const GetToKnowEachOther: React.FC<GetToKnowProps> = (props: GetToKnowProps) => {

    const [inputName, setInputName] = useState('');

    useEffect(() => {
        props.getName();
        if (typeof props.name == 'string') setInputName(props.name);
    }, [props.name])

    const hendleValidationOk = (value: string) => {
        if (value.length > 2) return true;
        return false
    }

    initAppSize();

    setObjSize(334, 50);
    let bottons = {
        position: 'absolute',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeft(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getTopPx(65)
    }

    let styles = StyleSheet.create({
        logo: getPosStaticHeight(110, 20, 66),
        text: getPosAndWid(334, 78, 138),
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380, 90),
        input: {
            height: 50,
            marginTop: 6,
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        }
    })

    return (
        <>
            <View style={styles.logo}>
                <KroosLogo />
            </View>

            <View style={styles.text}>
                <DinLight30
                    algin='left'
                    inner={I18n.t('GetToKnowEachOther-text')}
                />
            </View>

            <View style={styles.inputAndPlaceholder}>
                <View style={styles.input}>
                    <OneLineTekst
                        placeholder={I18n.t('GetToKnowEachOther-placeholder')}
                        onChangeText={setInputName}
                        validationOk={hendleValidationOk}
                        value={inputName}
                    />
                </View>
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={I18n.t('GetToKnowEachOther-pomin')}
                        onpress={() => {
                            props.setName('');
                            props.navigation.navigate('TurtorialNFC')
                        }}
                    ></BigWhiteBtn>
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={I18n.t('GetToKnowEachOther-dalej')}
                        onpress={() => {
                            props.setName(inputName);
                            props.navigation.navigate('TurtorialNFC');
                        }}
                    ></BigRedBtn>
                </View>
            </View>

        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        name: state.user.userName
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setName: (name: string) => dispatch(setUserName(name)),
    getName: async () => dispatch(await getUserName()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GetToKnowEachOther)