import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import I18n from 'react-native-i18n';
import AnimSvg from '@helpers/animSvg';

import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';

import {useAppSelector, useAppDispatch} from '@hooks/redux';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';

import {pointToComaString, simplyTimer} from '@helpers/stringFoo';

import laurelWreath from './laurelWreath';
import {useNavigation, useRoute} from '@react-navigation/core';
import {RegularStackRoute} from '@navigation/route';

import styles from './style';
import {
    trackerErrorSelector,
    trackerLoadingSelector,
} from '@storage/selectors/routes';
import {
    abortSyncCurrentRouteData,
    clearError,
    syncCurrentRouteData,
} from '@storage/actions/routes';

import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import PoorConnectionModal from '@sharedComponents/modals/poorConnectionModal/poorConnectionModal';
import DataPreview from '@sharedComponents/dataPreview/dataPreview';
import ShortRouteModal from '@sharedComponents/modals/shortRouteModal/ShortRouteModal';

import {TESTING_MODE} from '@env';
import {CounterThankYouPageRouteT} from '@type/rootStack';

enum Action {
    next = 'next',
    prev = 'prev',
    home = 'home',
}

interface Props {}

const CounterThankYouPage: React.FC<Props> = () => {
    const scrollRef = useRef<null | ScrollView>(null);
    const canGoForwardRef = useRef(true);

    const trans: any = I18n.t('CounterThankYouPage');
    const isSyncData = useAppSelector(trackerLoadingSelector);
    const error = useAppSelector(trackerErrorSelector);
    const navigation = useNavigation();
    const route = useRoute<CounterThankYouPageRouteT>();
    const dispatch = useAppDispatch();

    useCustomBackNavButton(() => {}, true);
    const name = useAppSelector<string>(state => state.user.userName);
    const userName = name ? ' ' + name : ' ' + trans.defaultName;

    const [show, setShow] = useState(true);
    const randomNum = () => 1;
    // const randomNum = () => Math.floor(Math.random() * 2);
    const [titleType, setTitleType] = useState(1);
    const [goForward, setGoForward] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const setShowVisible = useCallback(() => {
        setShow(true);
    }, []);

    const setShowHidden = useCallback(() => {
        setTimeout(() => {
            setShow(false);
            setTitleType(randomNum());
        }, 300);
    }, []);

    useEffect(() => {
        setShowVisible();
        navigation.addListener('focus', setShowVisible);
        navigation.addListener('blur', setShowHidden);

        return () => {
            navigation.removeListener('focus', setShowVisible);
            navigation.removeListener('blur', setShowHidden);
        };
    }, [navigation, setShowHidden, setShowVisible]);

    useEffect(() => {
        const t = setTimeout(() => {
            scrollRef.current?.scrollToEnd({animated: true, duration: 1000});
        }, 2000);

        return () => clearTimeout(t);
    }, []);

    const onGoForward = useCallback(
        (prev?: boolean) => {
            /**
             * It seems, that sidpatching this action blocks navigator.
             * It's temporary solution
             */
            setTimeout(() => {
                dispatch(clearError());
            }, 0);
            if (goForward === Action.home) {
                navigation.navigate(RegularStackRoute.HOME_SCREEN);
                return;
            }
            if (goForward === Action.next && !prev) {
                navigation.navigate({
                    name: RegularStackRoute.EDIT_DETAILS_SCREEN,
                    params: {redirectTo: RegularStackRoute.KROSS_WORLD_SCREEN},
                });
                return;
            }

            navigation.navigate(RegularStackRoute.HOME_SCREEN);
        },
        [dispatch, goForward, navigation],
    );

    useEffect(() => {
        if (!isSyncData && goForward) {
            if (error?.message && error?.statusCode >= 400) {
                setShowErrorModal(true);
                return;
            }
            if (canGoForwardRef.current) {
                onGoForward();
            }
        }
    }, [error?.statusCode, isSyncData, onGoForward, goForward, error.message]);

    const heandleSaveDistance = ratio => {
        let d = route?.params?.distance;

        if (typeof d === 'undefined') {
            d = 0.001;
        } else {
            d = Number(d.replace(',', '.'));
        }

        let res = d * (ratio / 100);
        if (res < 0) {
            res = 0;
        }

        return res.toFixed(1).replace('.', ',');
    };

    const heandleGetTitleType = () => {
        if (titleType == 0) {
            let num = heandleSaveDistance(23);
            return (
                ' ' +
                num +
                ' ' +
                (num === 1 ? trans.type_1[0] : trans.type_1[1])
            );
        } else {
            let num = heandleSaveDistance(5);
            return ' ' + num + ' ' + trans.type_2;
        }
    };

    const onSaveRouteHandler = (forward: string) => {
        setGoForward(forward);
        dispatch(syncCurrentRouteData());
    };

    const onCancelRouteHandler = (forward: string) => {
        setGoForward(forward);
        dispatch(abortSyncCurrentRouteData(true));
    };

    const onCloseErrorModalHandler = () => {
        canGoForwardRef.current = false;
        setShowErrorModal(false);

        onGoForward(true);
    };

    if (isSyncData) {
        return (
            <>
                <Loader />
                <PoorConnectionModal
                    onAbort={() => onCancelRouteHandler(Action.home)}
                />
            </>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView
                    ref={scrollRef}
                    decelerationRate={0.1}
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>{userName + trans.title}</Text>
                    <Text style={styles.subTitle}>
                        {trans.subTilte + heandleGetTitleType()}
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
                            <Text
                                style={styles.value}
                                testID={'counter-distance'}>
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
                            <Text style={styles.value} testID={'counter-time'}>
                                {simplyTimer(
                                    route?.params?.time - route?.params?.pause,
                                )}
                                <Text style={styles.unit}>
                                    {' ' + trans.timeUnit}
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.breakName}>
                        {trans.break + '  '}
                        <Text
                            style={styles.breakValue}
                            testID={'counter-pause'}>
                            {simplyTimer(route?.params?.pause)}
                        </Text>
                        <Text style={styles.unit}>{' ' + trans.breakUnit}</Text>
                    </Text>

                    <View style={styles.btnContainer}>
                        <View style={styles.btnCancel}>
                            <BigWhiteBtn
                                title={trans.btnCancel}
                                testID={'counter-cancel-btn'}
                                onpress={() => onSaveRouteHandler(Action.prev)}
                            />
                        </View>
                        <View style={styles.btnSave}>
                            <BigRedBtn
                                title={trans.btnSave}
                                testID={'counter-submit-btn'}
                                onpress={() => onSaveRouteHandler(Action.next)}
                            />
                        </View>
                    </View>
                </ScrollView>

                {TESTING_MODE === 'true' && (
                    <DataPreview
                        title={'podgląd danych'}
                        dataList={[
                            {
                                name: 'is Sync Data',
                                value: isSyncData,
                            },
                            {
                                name: 'user Name',
                                value: userName,
                            },
                            {
                                name: 'show',
                                value: show,
                            },
                            {
                                name: 'title Type',
                                value: titleType,
                            },
                            {
                                name: 'go Forward',
                                value: goForward,
                            },
                            {},
                            {section: 'error'},
                            {
                                name: 'message',
                                value: error.message,
                            },
                            {
                                name: 'status Code',
                                value: error.statusCode,
                            },
                            {},
                            {section: 'route'},
                            {
                                name: 'distance',
                                value: route?.params?.distance,
                            },
                            {
                                name: 'time',
                                value: route?.params?.time,
                            },
                            {
                                name: 'pause',
                                value: route?.params?.pause,
                            },
                        ]}
                    />
                )}
            </View>

            <ShortRouteModal
                showModal={showErrorModal}
                showAlterMessage={!error?.routeToShort ? error?.message : ''}
                onClose={onCloseErrorModalHandler}
            />
        </SafeAreaView>
    );
};

export default CounterThankYouPage;
