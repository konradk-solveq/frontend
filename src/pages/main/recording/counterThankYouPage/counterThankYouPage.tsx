import React, {useCallback, useEffect, useRef, useState} from 'react';
import {InteractionManager, ScrollView, StyleSheet, View} from 'react-native';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';

import {useNavigation, useRoute, StackActions} from '@react-navigation/core';
import {RegularStackRoute} from '@navigation/route';

import {
    trackerErrorSelector,
    trackerLoadingSelector,
} from '@storage/selectors/routes';
import {
    abortSyncCurrentRouteData,
    clearError,
    syncCurrentRouteData,
} from '@storage/actions/routes';

import PoorConnectionModal from '@sharedComponents/modals/poorConnectionModal/poorConnectionModal';

import {CounterParamsLsitT, CounterThankYouPageRouteT} from '@type/rootStack';
import {
    getRouteLengthCarbonEquivalent,
    getRouteLengthFuelEquivalent,
} from '@utils/transformData';
import GenericScreen from '@src/pages/template/GenericScreen';
import {ThankYouPageContainer} from '@src/containers/Recording';
import ShortRouteModal from '@src/sharedComponents/modals/shortRouteModal/ShortRouteModal';
import {Loader} from '@components/loader';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@src/theme/colors';

enum Action {
    next = 'next',
    prev = 'prev',
    home = 'home',
}

const CounterThankYouPage: React.FC = () => {
    const scrollRef = useRef<null | ScrollView>(null);
    const canGoForwardRef = useRef(true);
    const route = useRoute<CounterThankYouPageRouteT>();
    const params: Required<CounterParamsLsitT['CounterThankYouPage']> =
        route.params;

    const isSyncData = useAppSelector(trackerLoadingSelector);
    const error = useAppSelector(trackerErrorSelector);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useCustomBackNavButton(() => {}, true);
    const userName = useAppSelector<string>(state => state.user.userName);

    const [goForward, setGoForward] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

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
                navigation.navigate('HomeTab');
                return;
            }
            if (goForward === Action.next && !prev) {
                navigation.navigate({
                    name: 'EditDetails',
                    params: {
                        redirectTo: RegularStackRoute.KROSS_WORLD_SCREEN,
                        publish: true,
                    }),
                );
                return;
            }

            navigation.navigate('HomeTab');
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
                InteractionManager.runAfterInteractions(() => {
                    onGoForward();
                });
            }
        }
    }, [error?.statusCode, isSyncData, onGoForward, goForward, error.message]);

    const handleRouteAction = (forward: string) => {
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

    if (isSyncData || !!goForward) {
        return (
            <>
                <View style={styles.loaderContainer}>
                    <Loader
                        color={colors.red}
                        androidSize={getFVerticalPx(48)}
                    />
                </View>
                {!goForward && (
                    <PoorConnectionModal
                        onAbort={() => onCancelRouteHandler(Action.home)}
                    />
                )}
                <ShortRouteModal
                    showModal={showErrorModal}
                    showAlterMessage={
                        !error?.routeToShort ? error?.message : ''
                    }
                    onClose={onCloseErrorModalHandler}
                />
            </>
        );
    }

    return (
        <GenericScreen hideBackArrow>
            <ThankYouPageContainer
                userName={userName}
                routeParams={params}
                savingsValues={{
                    fuel: getRouteLengthFuelEquivalent(8, params.distance),
                    resource: getRouteLengthCarbonEquivalent(
                        8,
                        2350,
                        params.distance,
                    ),
                }}
                onSaveAction={() => handleRouteAction(Action.prev)}
                onPublishAction={() => handleRouteAction(Action.next)}
            />

            <ShortRouteModal
                showModal={showErrorModal}
                showAlterMessage={!error?.routeToShort ? error?.message : ''}
                onClose={onCloseErrorModalHandler}
            />
        </GenericScreen>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

export default CounterThankYouPage;
