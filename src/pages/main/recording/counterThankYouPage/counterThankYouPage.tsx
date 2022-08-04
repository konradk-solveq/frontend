import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {InteractionManager, ScrollView, StyleSheet, View} from 'react-native';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';

import {useNavigation, useRoute} from '@react-navigation/core';
import {RegularStackRoute} from '@navigation/route';

import {setHeavyTaskProcessingState} from '@storage/actions/app';
import {
    trackerErrorSelector,
    trackerLoadingSelector,
} from '@storage/selectors/routes';
import {
    abortSyncCurrentRouteData,
    clearError,
    syncCurrentRouteData,
} from '@storage/actions/routes';

import {PoorConnectionModal} from '@components/modals';
import {ShortRouteModal} from '@components/modals';

import {CounterParamsLsitT, CounterThankYouPageRouteT} from '@type/rootStack';
import {
    getRouteLengthCarbonEquivalent,
    getRouteLengthFuelEquivalent,
} from '@utils/transformData';
import GenericScreen from '@src/pages/template/GenericScreen';
import {ThankYouPageContainer} from '@src/containers/Recording';
import {Loader} from '@components/loader';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@src/theme/colors';
import {Alert} from '@components/alerts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

enum Action {
    next = 'next',
    prev = 'prev',
    home = 'home',
    abandon = 'abandon',
}

type AlertTranslationT = {
    text: string;
    approve: string;
    cancel: string;
};

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
    const [showAlert, setShowAlert] = useState(false);

    const {t} = useMergedTranslation('CounterThankYouPage');

    const abandonAlertTranslation = useMemo(
        () => t('abandonAlert', {returnObjects: true}) as AlertTranslationT,
        [t],
    );

    const alertData = {
        ...abandonAlertTranslation,
        onPress: () => {
            setShowAlert(false);
            onCancelRouteHandler(Action.abandon);
        },
        onCancel: () => setShowAlert(false),
    };

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
                dispatch(setHeavyTaskProcessingState(false));
                navigation.navigate('HomeTab');
                return;
            }
            if (goForward === Action.next && !prev) {
                navigation.navigate({
                    name: 'EditDetails',
                    params: {
                        redirectTo: RegularStackRoute.KROSS_WORLD_SCREEN,
                        publish: true,
                    },
                });
                return;
            }
            if (goForward === Action.abandon && !prev) {
                dispatch(setHeavyTaskProcessingState(false));
                navigation.navigate('RecordTab');
                return;
            }

            dispatch(setHeavyTaskProcessingState(false));
            navigation.navigate('WorldTab', {
                screen: 'WorldMyRoutes',
                params: {navigateAfterSave: true},
            });
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

    const handleRouteAction = useCallback(
        (forward: string) => {
            setGoForward(forward);
            dispatch(syncCurrentRouteData());
        },
        [dispatch],
    );

    const onCancelRouteHandler = useCallback(
        (forward: string) => {
            setGoForward(forward);
            dispatch(abortSyncCurrentRouteData(true)).then(() => {
                /**
                 * prevent going back to counter after recording the new route after the 'x' button was pressed
                 */
                setGoForward('');
            });
        },
        [dispatch],
    );

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
                    errorTitle={t('errorTitle')}
                    showAlterMessage={
                        !error?.routeToShort ? error?.message : ''
                    }
                    onClose={onCloseErrorModalHandler}
                />
            </>
        );
    }

    return (
        <GenericScreen hideBackArrow noHeader>
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
                onCloseAction={() => setShowAlert(true)}
            />

            {!!error?.message && (
                <ShortRouteModal
                    showModal={showErrorModal}
                    errorTitle={t('errorTitle')}
                    showAlterMessage={
                        !error?.routeToShort ? error?.message : ''
                    }
                    onClose={onCloseErrorModalHandler}
                />
            )}

            <Alert show={showAlert} {...alertData} />
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

export default React.memo(CounterThankYouPage);
