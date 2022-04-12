import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {MapsTypesT, RouteDetailsActionT} from '@type/screens/routesMap';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

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
     * We use modal to cover navigation components
     * like tab-bottom.
     *
     * Hiding modal is delayed to allow
     * other animations to finish.
     */
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(
            () => {
                setVisible(show);
            },
            show ? 0 : 800,
        );

        return () => clearTimeout(timer);
    }, [show]);

    const onAproveAction = useCallback(() => {
        onPressAction('remove');
        setAproveAction(false);
    }, [onPressAction]);

    const showAdditionalAprove = useCallback(() => {
        onClose();
        setAproveAction(true);
    }, [onClose]);

    return (
        <>
            <Modal transparent animationType="fade" visible={visible}>
                <BottomModal
                    show={show}
                    openModalHeight={getFVerticalPx(138)}
                    header={<HorizontalSpacer height={8} />}
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
                show={aproveAction}
                onPress={onAproveAction}
                text={contentAlert}
                pressText={t('alert.positive')}
                cancelText={t('alert.negative')}
                onCancel={() => setAproveAction(false)}
            />
        </>
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
