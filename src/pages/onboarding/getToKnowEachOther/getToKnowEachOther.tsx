//getToKnowEachOther
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { connect } from "react-redux";
import I18n from 'react-native-i18n';
import { setUserName, getUserName } from '../../../storage/actions/index';

import {
    initAppSize,
    setObjSize,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
    getHorizontalPx,
    getVerticalPx,
    getCenterLeftPx,
    getPosAndWid,
    getPosWithMinHeight,
    getPosStaticHeight,
} from '../../../helpers/layoutFoo';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

interface Props {
    navigation: any,
    name: string,
    setName: Function,
    getName: Function
};

const GetToKnowEachOther: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('GetToKnowEachOther');

    const [inputName, setInputName] = useState('');

    useEffect(() => {
        props.getName();  // <<--- #askBartosz (3) ? już znalazłem rozwiązanie, chodzi o nie zefiniowany obiekt w local storage
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
        width: getWidthPx(),
        height: getVerticalPx(50),
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getVerticalPx(65)
    }

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white" 
        },
        logo: getPosStaticHeight(110, 20, 66),
        text: getPosAndWid(334, 78, 138),
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(30),
            color: '#313131'
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380, 90),
        input: {
            height: getHorizontalPx(50),
            marginTop: getHorizontalPx(6),
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.logo}>
                <KroosLogo />
            </View>

            <Text style={[styles.text, styles.light30]}>
                {trans.title}
            </Text>

            <View style={styles.inputAndPlaceholder}>
                <View style={styles.input}>
                    <OneLineTekst
                        placeholder={trans.placeholder}
                        onChangeText={setInputName}
                        validationOk={hendleValidationOk}
                        value={inputName}
                    />
                </View>
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={trans.skip}
                        onpress={() => {
                            props.setName('');
                            props.navigation.navigate('TurtorialNFC')
                        }}
                    ></BigWhiteBtn>
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.goFoward}
                        onpress={() => {
                            props.setName(inputName);
                            props.navigation.navigate('TurtorialNFC');
                        }}
                    ></BigRedBtn>
                </View>
            </View>

        </SafeAreaView>
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