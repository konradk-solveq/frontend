import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import I18n from 'react-native-i18n';

import deepCopy from '../../../helpers/deepCopy';

import {
    setObjSize,
    getWidthPx,
    getHorizontalPx,
    getVerticalPx,
    getCenterLeftPx,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OnePermit from './onePermit';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

interface Props {
    navigation: any;
}

const PermitsDeclarations: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Permits');

    interface staus {
        checked: boolean;
        wrong: boolean;
    }
    let permitStatus: Array<staus> = [];

    // stworzenie tablicy ustawień początkowych dla dowolnej ilości zgód
    trans.paragraph.forEach(() => {
        permitStatus.push({checked: false, wrong: false});
    });

    const [status, setStatus] = useState(permitStatus);
    const [allPerm, setAllPerm] = useState(false);

    // gdy klikniemy zaznacz wszystkie, ponowne odznacza wsszystkie
    const handleChangeAllStatus = (val: boolean) => {
        setAllPerm(val);
        let newStatus = deepCopy(status);
        newStatus.forEach(e => (e.checked = val));
        setStatus(newStatus);
    };

    // gdy zaznaczymy którąś ze zgód, wyłącza lub włącza zaznacz wszystkie jeśli jest taki snan wszystkich checków
    const handleChangeStatus = (num: number, val: boolean) => {
        let newStatus = deepCopy(status);
        newStatus[num].checked = val;

        if (newStatus.some(e => !e.checked)) {
            setAllPerm(false);
        }
        if (newStatus.every(e => e.checked)) {
            setAllPerm(true);
        }

        setStatus(newStatus);
    };

    // po kliknięciu 'DALEJ', walidacja i przejście dalej
    const hendlerGoFoward = () => {
        let canGo = true;
        status.forEach((e, i) => {
            if (trans.paragraph[i].required && !e.checked) {
                canGo = false;
            }
        });

        if (canGo) {
            props.navigation.navigate('GetToKnowEachOther');
        } else {
            let newStatus = deepCopy(status);
            newStatus.map(e => (e.wrong = !e.checked));
            setStatus(newStatus);
        }
    };

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%', // wh - headHeight,
            top: headHeight,
        },
        text: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
        },
        btn: {
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            top: getVerticalPx(11),
            marginBottom: headHeight + getVerticalPx(69),
        },
    });

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
                <ScrollView>
                    <Text
                        style={[
                            styles.text,
                            {
                                marginTop: getVerticalPx(50),
                                fontSize: 30,
                                color: '#313131',
                            },
                        ]}>
                        {trans.title}
                    </Text>

                    <Text
                        style={[
                            styles.text,
                            {
                                marginTop: getVerticalPx(6),
                                fontSize: 18,
                                color: '#555555',
                            },
                        ]}>
                        {trans.text}
                    </Text>

                    <OnePermit
                        checked={allPerm}
                        getCheck={(val: boolean) => handleChangeAllStatus(val)}
                        text={trans.checkAll}
                        marginTop={getVerticalPx(31)}
                        navigation={props.navigation}
                    />

                    {status.map((e: any, i: number) => (
                        <OnePermit
                            checked={e.checked}
                            wrong={trans.paragraph[i].required && e.wrong}
                            getCheck={(val: boolean) =>
                                handleChangeStatus(i, val)
                            }
                            text={trans.paragraph[i].text}
                            marginTop={getVerticalPx(11)}
                            navigation={props.navigation}
                            key={'per_' + i}
                        />
                    ))}

                    <BigRedBtn
                        style={styles.btn}
                        title={trans.btn}
                        onpress={() => hendlerGoFoward()}
                    />
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('Beginning')}
                inner={trans.header}
                getHeight={setHeadHeightt}
            />
        </SafeAreaView>
    );
};

export default PermitsDeclarations;
