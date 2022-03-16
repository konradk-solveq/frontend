import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
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
import {getRouteLengthFuelEquivalent} from '@utils/transformData';

enum Action {
    next = 'next',
    prev = 'prev',
    home = 'home',
}

interface Props {}

const CounterThankYouPage: React.FC<Props> = () => {
    const scrollRef = useRef<null | ScrollView>(null);
    const canGoForwardRef = useRef(true);

    const {t} = useMergedTranslation('CounterThankYouPage');
    const isSyncData = useAppSelector(trackerLoadingSelector);
    const error = useAppSelector(trackerErrorSelector);
    const navigation = useNavigation();
    const route = useRoute<CounterThankYouPageRouteT>();
    const dispatch = useAppDispatch();

    useCustomBackNavButton(() => {}, true);
    const name = useAppSelector<string>(state => state.user.userName);
    const userName = name ? ' ' + name : ' ' + t('defaultName');

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

    const heandleGetTitleType = () => {
        if (titleType == 0) {
            const num = getRouteLengthFuelEquivalent(
                23,
                route?.params?.distance,
            );
            return (
                ' ' + num + ' ' + (num === '1' ? t('type_1.0') : t('type_1.1'))
            );
        } else {
            const num = getRouteLengthFuelEquivalent(
                5,
                route?.params?.distance,
            );
            return t('type_2', {num: num});
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
                    <Text style={styles.title}>
                        {t('title', {name: userName})}
                    </Text>
                    <Text style={styles.subTitle}>
                        {t('subTilte') + heandleGetTitleType()}
                    </Text>

                    {show && (
                        <AnimSvg
                            style={styles.laurelWreath}
                            source={laurelWreath}
                        />
                    )}

                    <View style={styles.recorded}>
                        <View>
                            <Text style={styles.name}>{t('distance')}</Text>
                            <Text
                                style={styles.value}
                                testID={'counter-distance'}>
                                {pointToComaString(
                                    route?.params?.distance || '0.00',
                                )}
                                <Text style={styles.unit}>
                                    {' ' + t('distanceUnit')}
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.name}>{t('time')}</Text>
                            <Text style={styles.value} testID={'counter-time'}>
                                {simplyTimer(
                                    route?.params?.time - route?.params?.pause,
                                )}
                                <Text style={styles.unit}>
                                    {' ' + t('timeUnit')}
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.breakName}>
                        {t('break') + '  '}
                        <Text
                            style={styles.breakValue}
                            testID={'counter-pause'}>
                            {simplyTimer(route?.params?.pause)}
                        </Text>
                        <Text style={styles.unit}>{' ' + t('breakUnit')}</Text>
                    </Text>

                    <View style={styles.btnContainer}>
                        <View style={styles.btnCancel}>
                            <BigWhiteBtn
                                title={t('btnCancel')}
                                testID={'counter-cancel-btn'}
                                onpress={() => onSaveRouteHandler(Action.prev)}
                            />
                        </View>
                        <View style={styles.btnSave}>
                            <BigRedBtn
                                title={t('btnSave')}
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
