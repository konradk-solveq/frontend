import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import {MIN_ROUTE_LENGTH} from '@helpers/global';
import {useAppSelector} from '@hooks/redux';
import {trackerActiveSelector} from '@storage/selectors';
import {
    trackerRecordingStateSelector,
    trackerStartTimeSelector,
} from '@storage/selectors/routes';
import {RecordingStateT} from '@storage/reducers/routes';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {StateType} from '@type/components/bottomModal';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {
    appContainerHorizontalMargin,
    BOTTOM_TAB_HEIGHT,
    screenHeight,
} from '@theme/commonStyle';
import colors from '@theme/colors';

import {BottomModal} from '@components/modals';
import {HorizontalSpacer} from '@components/divider';
import {
    FillUpButton,
    PrimaryButton,
    SecondaryButton,
} from '@components/buttons';

import {FullMetrics, Metrics} from '@containers/Recording/components';
import {PopUpHint} from '@containers/Recording/components';

export const BOTTOM_MODAL_HEIGHT = 303;
export const BOTTOM_MODAL_HEIGHT_AFTER_START = 223;
const BOTTOM_SPACE_AFTER_START = getFVerticalPx(50);
const BOTTOM_SPACE = getFVerticalPx(50) + BOTTOM_TAB_HEIGHT;

interface IProps {
    onPressStart: (e: GestureResponderEvent) => void;
    onPressPauseResume: (
        e: GestureResponderEvent,
        shouldPause: boolean,
    ) => void;
    onPressStop: () => void;
    totalDistance?: number;
    topSpace?: number;
    testID?: string;
}

const CounterContainer: React.FC<IProps> = ({
    onPressStart,
    onPressPauseResume,
    onPressStop,
    totalDistance = 0,
    topSpace = 0,
    testID = 'counter-container',
}: IProps) => {
    /**
     * Keeps information that counter has been fired
     * and `default` state should not be longer presented
     */
    const recordProccessWasStartedRef = useRef(false);
    /**
     * Recording process is active (from start to stop)
     */
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const recordingState = useAppSelector(trackerRecordingStateSelector);
    /**
     * Helps to check if timer should be running
     */
    const isRecordingActive = isTrackerActive && recordingState === 'recording';
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);

    const [showPopUpHint, setShowPopUpHint] = useState(false);
    const [openBottomModal, setOpenBottomModal] = useState(false);
    const [modalHeight, setModalHeight] = useState(getFVerticalPx(300));

    useEffect(() => {
        if (
            recordingState === 'not-started' &&
            !recordProccessWasStartedRef.current
        ) {
            setModalHeight(getFVerticalPx(BOTTOM_MODAL_HEIGHT));
        } else if (recordingState === 'recording') {
            recordProccessWasStartedRef.current = true;
            setModalHeight(getFVerticalPx(BOTTOM_MODAL_HEIGHT_AFTER_START));
        }
    }, [recordingState]);

    const closeContentOpacity = useSharedValue(1);
    const openContentOpacity = useSharedValue(0);
    const bottomSpaceHeight = useSharedValue(BOTTOM_SPACE);
    const closeContentAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(closeContentOpacity.value, {
            duration: closeContentOpacity.value < 0 ? 150 : 500,
        }),
    }));
    const openContentAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(openContentOpacity.value, {
            duration: openContentOpacity.value >= 0.2 ? 500 : 150,
        }),
    }));
    const bottomSpaceAnimation = useAnimatedStyle(() => ({
        height: withTiming(bottomSpaceHeight.value, {
            duration: 200,
        }),
    }));

    /**
     * Adjust height of bottom modal based on the state of the recording
     * and the bottom tabBar visibility
     */
    useEffect(() => {
        bottomSpaceHeight.value = !recordProccessWasStartedRef.current
            ? BOTTOM_SPACE
            : BOTTOM_SPACE_AFTER_START;
    }, [bottomSpaceHeight, recordingState]);

    /**
     * Calculates opacity based on modal height
     */
    const updateModalContentVisibility = useCallback(
        (type: StateType, position?: number) => {
            switch (type) {
                case 'closed':
                    if (openBottomModal) {
                        setOpenBottomModal(false);
                    }

                    closeContentOpacity.value = 1;
                    openContentOpacity.value = 0;
                    break;
                case 'open':
                    if (!openBottomModal) {
                        setOpenBottomModal(true);
                    }

                    closeContentOpacity.value = 0;
                    openContentOpacity.value = 1;
                    break;
                case 'active':
                    if (position) {
                        const opacityToChange = Math.abs(position) / 1000;
                        if (position > screenHeight / 2) {
                            closeContentOpacity.value =
                                closeContentOpacity.value > 0
                                    ? closeContentOpacity.value -
                                      opacityToChange
                                    : 0;
                            openContentOpacity.value =
                                openContentOpacity.value < 1
                                    ? openContentOpacity.value + opacityToChange
                                    : 1;
                        } else {
                            closeContentOpacity.value =
                                closeContentOpacity.value < 1
                                    ? closeContentOpacity.value +
                                      opacityToChange
                                    : 1;
                            openContentOpacity.value =
                                openContentOpacity.value > 0
                                    ? openContentOpacity.value - opacityToChange
                                    : 0;
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        [closeContentOpacity, openContentOpacity, openBottomModal],
    );

    const onPressStopHandler = (finishedAnimation?: boolean) => {
        /**
         * When route is not long enough, user can not stop recording instantly
         */
        if (!finishedAnimation && totalDistance >= MIN_ROUTE_LENGTH) {
            setShowPopUpHint(true);
            return;
        }
        setShowPopUpHint(false);
        onPressStop();
    };

    return (
        <View style={styles.container} pointerEvents="box-none" testID={testID}>
            <BottomModal
                show
                openModal={openBottomModal}
                openModalHeight={modalHeight}
                isReactive
                isSwipeable
                autoClose
                openDuration={500}
                closeDuration={500}
                drawUnderStatusBar
                onChangeState={updateModalContentVisibility}
                style={styles.modal}>
                <View>
                    <Animated.View
                        style={[
                            styles.metricsContainer,
                            closeContentAnimation,
                        ]}>
                        <Metrics
                            onOpenPress={() => {
                                setOpenBottomModal(true);
                                closeContentOpacity.value = 0;
                                openContentOpacity.value = 1;
                            }}
                            startTime={trackerStartTime}
                            started={isRecordingActive}
                        />
                    </Animated.View>
                    <Animated.View style={[{}, openContentAnimation]}>
                        <FullMetrics
                            onOpenPress={() => {
                                setOpenBottomModal(false);
                                closeContentOpacity.value = 1;
                                openContentOpacity.value = 0;
                            }}
                            startTime={trackerStartTime}
                            started={isRecordingActive}
                            topSpace={topSpace}
                        />
                    </Animated.View>

                    <HorizontalSpacer height={25} />
                </View>
            </BottomModal>

            <View style={styles.startButtonContainer}>
                <ActionButtons
                    onPressStart={onPressStart}
                    onPressPauseResume={onPressPauseResume}
                    onPressStop={onPressStopHandler}
                    started={recordProccessWasStartedRef.current}
                    recordingState={recordingState}
                    testID={`${testID}-action-buttons`}
                />

                <Animated.View style={bottomSpaceAnimation} />
                {recordingState && recordingState !== 'not-started' && (
                    <PopUpHint
                        show={showPopUpHint}
                        onPress={() => setShowPopUpHint(false)}
                    />
                )}
            </View>
        </View>
    );
};

interface IPropsActionButtons {
    started?: boolean;
    onPressStart: (e: GestureResponderEvent) => void;
    onPressPauseResume: (e: GestureResponderEvent, resume: boolean) => void;
    onPressStop: (finishedAnimation?: boolean) => void;
    recordingState: RecordingStateT;
    testID?: string;
}

const ActionButtons: React.FC<IPropsActionButtons> = React.memo(
    ({
        started = false,
        onPressStart,
        onPressPauseResume,
        onPressStop,
        recordingState,
        testID = 'action-buttons',
    }: IPropsActionButtons) => {
        const {t} = useMergedTranslation('MainCounter.actions');
        const [isProcessing, setIsProcessing] = useState(false);

        const onPressStartHandler = useCallback(
            (e: GestureResponderEvent) => {
                setIsProcessing(true);
                onPressStart(e);
            },
            [onPressStart],
        );

        const onPressPauseResumeHandler = useCallback(
            (e: GestureResponderEvent) => {
                setIsProcessing(true);
                onPressPauseResume(e, recordingState !== 'paused');
            },
            [onPressPauseResume, recordingState],
        );

        const onPressStopHandler = useCallback(
            (finishedAnimation?: boolean) => {
                setIsProcessing(true);
                onPressStop(finishedAnimation);
            },
            [onPressStop],
        );

        useEffect(() => {
            setIsProcessing(false);
        }, [started]);

        return !started ? (
            <PrimaryButton
                text={t('startRecording')}
                withoutShadow
                withLoader={isProcessing}
                onPress={onPressStartHandler}
                testID={`${testID}-start-button`}
            />
        ) : (
            <View style={styles.row}>
                <SecondaryButton
                    text={
                        recordingState === 'paused'
                            ? t('resumeRecording')
                            : t('pauseRecording')
                    }
                    onPress={onPressPauseResumeHandler}
                    style={styles.actionButton}
                    testID={`${testID}-pause-resume-button`}
                />
                <FillUpButton
                    text={t('stopRecording')}
                    onReleaseAction={() => onPressStopHandler(false)}
                    onFilledAction={() => onPressStopHandler(true)}
                    containerStyle={styles.actionButton}
                    testID={`${testID}-stop-button`}
                />
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    modal: {
        backgroundColor: colors.whiteGrey,
        paddingHorizontal: appContainerHorizontalMargin,
    },
    startButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 11,
    },
    metricsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
    },
    actionButton: {
        width: getFHorizontalPx(171),
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: appContainerHorizontalMargin,
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default React.memo(CounterContainer);
