//getToKnowEachOther
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import I18n from 'react-native-i18n';
import {setUserName} from '../../../storage/actions/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

import {
    setObjSize,
    getWidthPx,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
    getVertical,
    getCenterLeftPx,
    getPosAndWid,
    getPosWithMinHeight,
    getPosStaticHeight,
} from '../../../helpers/layoutFoo';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';

interface Props {
    navigation: any;
}

const GetToKnowEachOther: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const trans = I18n.t('GetToKnowEachOther');

    const name: string = useAppSelector(state => state.user.userName);

    const [inputName, setInputName] = useState('');

    useEffect(() => {
        if (typeof name === 'string') {
            setInputName(name);
        }
    }, [name]);

    const hendleValidationOk = (value: string) => {
        if (value.length > 2) {
            return true;
        }
        return false;
    };

    setObjSize(334, 50);
    let bottons = {
        position: 'absolute',
        width: getWidthPx(),
        height: 50,
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getVerticalPx(65),
    };

    interface Logo {
        position: string;
        width: number;
        height: number;
        left: number;
        top: string;
    }

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        title: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#313131',
        },
        logo: getPosStaticHeight(110, 20, 66),

        text: getPosAndWid(334, 78, 138),
        light30: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(30),
            color: '#313131',
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380, 90),
        input: {
            height: 50,
            marginTop: getHorizontalPx(6),
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{trans.title}</Text>

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
                            dispatch(setUserName(''));
                            navigation.navigate('AddingByNumber');
                        }}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.goFoward}
                        onpress={() => {
                            dispatch(setUserName(inputName));
                            navigation.navigate('AddingByNumber');
                        }}
                    />
                </View>
            </View>

            <StackHeader
                onpress={() => navigation.navigate('PermitsDeclarations')}
                getHeight={() => {}}
                inner={''}
            />

            <View style={styles.logo}>
                <KroosLogo />
            </View>
        </SafeAreaView>
    );
};

export default GetToKnowEachOther;
