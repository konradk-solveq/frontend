/**
 * There is an issue on IOS (this is RN issue). We cannot show
 * multiple modals at the same time.
 *
 * Workaround is nesting them or wait until first
 * has been dismissed.
 *
 * In this component we wait until first modal (bottom action list)
 * is hidden (component is animated).
 *
 * Future possible [solution](https://github.com/software-mansion/react-native-screens/pull/1096)
 *  which doesn't work right now.
 */

import React, {useCallback, useMemo, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {MapsTypesT, RouteDetailsActionT} from '@type/screens/routesMap';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {isIOS} from '@utils/platform';

import {Backdrop} from '@components/backdrop';
import {TransparentButton} from '@components/buttons';
import {HorizontalDivider, HorizontalSpacer} from '@components/divider';
import {BottomModal} from '@components/modals';
import {Alert} from '@components/alerts';

import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    onPressAction: (actionType: RouteDetailsActionT) => void;
    onClose: () => void;
    mapType?: MapsTypesT;
    show?: boolean;
}

const MoreActionsModal: React.FC<IProps> = ({
    onPressAction,
    onClose,
    mapType = 'regular',
    show = false,
}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.moreActionsModal');
    const contentAlert = useMemo(
        () =>
            mapType === 'favourite'
                ? t('alert.content.favourite')
                : t('alert.content.private'),
        [mapType, t],
    );

    const [aproveAction, setAproveAction] = useState(false);
    /**
     * Helper to avoid render two modals at the same time on IOS devices
     */
    const [dissmised, setDissmised] = useState(!isIOS);

    const onDismissHandler = () => {
        setDissmised(isIOS ? false : true);
    };

    const onAproveAction = useCallback(() => {
        onPressAction('remove');
        setAproveAction(false);
        onDismissHandler();
    }, [onPressAction]);

    const showAdditionalAprove = useCallback(() => {
        onClose();
        setAproveAction(true);
    }, [onClose]);

    return (
        <View>
            <Modal
                transparent
                animationType="fade"
                visible={show}
                onDismiss={() => {
                    /**
                     * Triggered on IOS
                     */
                    setDissmised(true);
                }}>
                <BottomModal
                    show={show}
                    openModalHeight={getFVerticalPx(138)}
                    header={<HorizontalSpacer height={8} />}
                    initWithStartHeight
                    style={styles.modal}>
                    <View>
                        <View
                            style={{
                                paddingHorizontal: appContainerHorizontalMargin,
                            }}>
                            <TransparentButton
                                onPress={() => onPressAction('record')}
                                text={t('actions.startRecording')}
                                style={styles.button}
                                containerStyle={styles.buttonContainer}
                            />
                        </View>
                        <HorizontalDivider />
                        <View
                            style={{
                                paddingHorizontal: appContainerHorizontalMargin,
                            }}>
                            <TransparentButton
                                onPress={showAdditionalAprove}
                                text={t('actions.remove')}
                                style={styles.button}
                                containerStyle={styles.buttonContainer}
                            />
                        </View>
                    </View>
                    <HorizontalSpacer height={34} />
                </BottomModal>
                <Backdrop
                    isVisible={show}
                    onPress={onClose}
                    style={styles.backdrop}
                />
            </Modal>

            <Alert
                show={aproveAction && dissmised && !show}
                onPress={onAproveAction}
                text={contentAlert}
                numberOfLines={3}
                pressText={t('alert.positive')}
                cancelText={t('alert.negative')}
                onCancel={() => {
                    setAproveAction(false);
                    onDismissHandler();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        zIndex: 21,
    },
    buttonContainer: {
        justifyContent: 'flex-start',
    },
    button: {
        width: '100%',
    },
    backdrop: {
        zIndex: 20,
    },
});

export default MoreActionsModal;
