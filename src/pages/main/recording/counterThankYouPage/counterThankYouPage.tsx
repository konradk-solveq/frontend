import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import AnimSvg from '../../../../helpers/animSvg';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {useAppSelector, useAppDispatch} from '../../../../hooks/redux';

import {
    pointToComaString,
    twoDigits,
    simplyTimer,
} from '../../../../helpers/stringFoo';

import laurelWreath from './laurelWreath';

interface Props {
    navigation: any;
    name: string;
    getName: Function;
}

const CounterThankYouPage: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('CounterThankYouPage');
    const dispatch = useAppDispatch();

    const name = useAppSelector<string>(state => state.user.userName);
    const userName = name ? ' ' + name : ' ' + trans.defaultName;

    const [show, setShow] = useState(true);
    const randomNum = () => Math.floor(Math.random() * 2);
    const [titleType, setTitleType] = useState(randomNum());
    const [distance, setDistance] = useState(103.66);
    const [time, setTime] = useState(5519500);
    const [breakTime, setBreakTime] = useState(1551500);

    useEffect(() => {
        setShow(true);
        props.navigation.addListener('focus', () => {
            setShow(true);
        });
        props.navigation.addListener('blur', () => {
            setTimeout(() => {
                setShow(false);
                setTitleType(randomNum());
            }, 300);
        });
        //   return unsubscribe;
    }, [props.navigation]);

    const heandleGetTitleType = () => {
        if (titleType == 0) {
            let num = Math.floor(distance / 11);
            if (num < 1) {
                num = 1;
            }
            return (
                ' ' + num + ' ' + (num == 1 ? trans.type_1[0] : trans.type_1[1])
            );
        } else {
            let num = Math.floor(distance / 7);
            if (num < 1) {
                num = 1;
            }
            return ' ' + num + ' ' + trans.type_2;
        }
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            width: '100%',
            height: '100%',
        },
        title: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(90),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            lineHeight: 52,
            color: '#2cba3f',
            textAlign: 'center',
        },
        laurelWreath: {
            width: getHorizontalPx(334),
            height: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(20),
        },
        recorded: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(20),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        name: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            lineHeight: 22,
            color: '#555555',
            textAlign: 'left',
        },
        value: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 57,
            color: '#555555',
            textAlign: 'left',
        },
        unit: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 18,
            color: '#555555',
            textAlign: 'left',
        },
        breakName: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            color: '#555555',
            textAlign: 'center',
            marginTop: getVerticalPx(32),
        },
        breakValue: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            color: '#555555',
            textAlign: 'left',
        },
        btnSave: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            height: 50,
            marginTop: getVerticalPx(52),
        },
        btnCancel: {
            width: getHorizontalPx(334),
            height: 50,
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(65),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <Text style={styles.title}>
                        {userName + trans.title + heandleGetTitleType()}
                    </Text>

                    {show && (
                        <AnimSvg
                            style={styles.laurelWreath}
                            source={laurelWreath}
                        />
                    )}

                    <View style={styles.recorded}>
                        <View>
                            <Text style={styles.name}>{trans.distance}</Text>
                            <Text style={styles.value}>
                                {pointToComaString(distance.toFixed(2))}
                                <Text style={styles.unit}>
                                    {' ' + trans.distanceUnit}
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.name}>{trans.time}</Text>
                            <Text style={styles.value}>
                                {simplyTimer(time)}
                                <Text style={styles.unit}>
                                    {' ' + trans.timeUnit}
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.breakName}>
                        {trans.break + '  '}
                        <Text style={styles.breakValue}>
                            {simplyTimer(breakTime)}
                        </Text>
                        <Text style={styles.unit}>{' ' + trans.breakUnit}</Text>
                    </Text>

                    <View style={styles.btnSave}>
                        <BigRedBtn title={trans.btnSave} onpress={() => {}} />
                    </View>

                    <View style={styles.btnCancel}>
                        <BigWhiteBtn
                            title={trans.btnCancel}
                            onpress={() => {}}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CounterThankYouPage;
