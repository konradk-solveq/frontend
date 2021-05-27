import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView, Alert} from 'react-native';
import I18n from 'react-native-i18n';
import AnimSvg from '../../../../helpers/animSvg';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {useAppSelector, useAppDispatch} from '../../../../hooks/redux';

import {pointToComaString, simplyTimer} from '../../../../helpers/stringFoo';

import laurelWreath from './laurelWreath';
import {useNavigation, useRoute} from '@react-navigation/core';
import {RegularStackRoute} from '../../../../navigation/route';

import styles from './style';
import {
    trackerErrorSelector,
    trackerLoadingSelector,
} from '../../../../storage/selectors/routes';
import {
    clearError,
    syncCurrentRouteData,
} from '../../../../storage/actions/routes';

enum Action {
    next = 'next',
    prev = 'prev',
}

interface Props {
    navigation: any;
    name: string;
    getName: Function;
}

const CounterThankYouPage: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('CounterThankYouPage');
    const isSyncData = useAppSelector(trackerLoadingSelector);
    const error = useAppSelector(trackerErrorSelector);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useAppDispatch();
console.log(error)
    const name = useAppSelector<string>(state => state.user.userName);
    const userName = name ? ' ' + name : ' ' + trans.defaultName;

    const [show, setShow] = useState(true);
    const randomNum = () => Math.floor(Math.random() * 2);
    const [titleType, setTitleType] = useState(randomNum());

    const [breakTime, setBreakTime] = useState(1551500);

    const [goForward, setGoForward] = useState('');

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

    const onGoForward = useCallback(() => {
        dispatch(clearError());
        if (goForward === Action.next) {
            navigation.navigate(RegularStackRoute.EDIT_DETAILS_SCREEN);
            return;
        }

        if (goForward === Action.prev) {
            navigation.navigate(RegularStackRoute.KROSS_WORLD_SCREEN);
        }
    }, [dispatch, goForward, navigation]);

    useEffect(() => {
        if (!isSyncData && goForward) {
            if (error?.message) {
                Alert.alert('', error.message, [
                    {
                        text: 'Ok',
                        onPress: onGoForward,
                    },
                ]);
                return;
            }

            onGoForward();
        }
    }, [error.message, isSyncData, onGoForward]);

    const heandleGetTitleType = () => {
        if (titleType == 0) {
            let num = Math.floor(parseFloat(route?.params?.distance) / 11);
            if (num < 1) {
                num = 1;
            }
            return (
                ' ' + num + ' ' + (num == 1 ? trans.type_1[0] : trans.type_1[1])
            );
        } else {
            let num = Math.floor(parseFloat(route?.params?.distance) / 7);
            if (num < 1) {
                num = 1;
            }
            return ' ' + num + ' ' + trans.type_2;
        }
    };

    const onSaveRouteHandler = (forward: string) => {
        console.log('on save handler', forward);
        setGoForward(forward);
        dispatch(syncCurrentRouteData());
    };

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
                                {pointToComaString(
                                    route?.params?.distance || '0.00',
                                )}
                                <Text style={styles.unit}>
                                    {' ' + trans.distanceUnit}
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.name}>{trans.time}</Text>
                            <Text style={styles.value}>
                                {simplyTimer(route?.params?.time)}
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
                        <BigRedBtn
                            title={trans.btnSave}
                            onpress={() => onSaveRouteHandler(Action.next)}
                        />
                    </View>

                    <View style={styles.btnCancel}>
                        <BigWhiteBtn
                            title={trans.btnCancel}
                            onpress={() => onSaveRouteHandler(Action.prev)}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CounterThankYouPage;
