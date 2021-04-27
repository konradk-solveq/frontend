import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
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
    getPosWithMinHeight,
} from '../../../helpers/layoutFoo';
import {validateData} from '../../../utils/validation/validation';
import {userUserValidationRules} from '../../../models/user.model';
import {nfcIsSupported} from '../../../helpers/nfc';

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
    const [areaHeigh, setAreaHeigh] = useState(0);
    const [validationStatus, setValidationStatus] = useState(false);
    const [nfc, setNfc] = useState();

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    useEffect(() => {
        if (typeof name === 'string') {
            setInputName(name);
        }
    }, [name]);

    const hendleValidationOk = (value: string) => {
        return validateData(userUserValidationRules.userName, value);
    };

    const handleAreaHeight = (layout: any) => {
        setAreaHeigh(layout.height);
    };

    const goFoward = () => {
        if (nfc) {
            navigation.navigate('TurtorialNFC');
        } else {
            navigation.navigate('AddingByNumber');
        }
    };

    const hadleOnpress = (inputName: string) => {
        dispatch(setUserName(inputName));
        goFoward();
    };

    const hadleOnpressWithName = (inputName: string) => {
        if (!validationStatus) {
            return;
        }
        dispatch(setUserName(inputName));
        goFoward();
    };

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const bottons = {
        position: 'absolute',
        width: getWidthPx(),
        height: 50,
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getVerticalPx(65 + 100), // 100 - przesunięcie dla scroll o headera
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: headHeight,
        },
        area: {
            width: '100%',
            height: areaHeigh,
            minHeight: getVertical(414),
        },
        title: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#313131',
        },
        logo: {
            position: 'absolute',
            left: getHorizontalPx(152),
            top: getVerticalPx(66),
            width: getHorizontalPx(110),
            height: getHorizontalPx(20),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380 - 100, 90),
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
        <SafeAreaView
            style={styles.container}
            onLayout={({nativeEvent}) => handleAreaHeight(nativeEvent.layout)}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={styles.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{trans.title}</Text>

                    <View style={[styles.inputAndPlaceholder, styles.input]}>
                        <OneLineTekst
                            placeholder={trans.placeholder}
                            onChangeText={setInputName}
                            validationOk={hendleValidationOk}
                            value={inputName}
                            maxLength={20}
                            validationStatus={setValidationStatus}
                        />
                    </View>

                    <View style={styles.bottons}>
                        <View style={styles.btn}>
                            <BigWhiteBtn
                                title={trans.skip}
                                onpress={() => hadleOnpress('')}
                            />
                        </View>

                        <View style={styles.btn}>
                            <BigRedBtn
                                title={trans.goFoward}
                                onpress={() => hadleOnpressWithName(inputName)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => navigation.navigate('Permits')}
                getHeight={setHeadHeight}
                inner={''}
            />

            <View style={styles.logo}>
                <KroosLogo />
            </View>
        </SafeAreaView>
    );
};

export default GetToKnowEachOther;
