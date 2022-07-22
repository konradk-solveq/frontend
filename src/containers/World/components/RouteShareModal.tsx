import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import colors from '@theme/colors';
import {Loader} from '@src/components/loader';
import useFetchShareLink from '@src/hooks/useFetchShareLink';
import {callSystemShare} from '@src/utils/callSystemShare';
import customInteractionManager from '@src/utils/customInteractionManager/customInteractionManager';
import FailedResponseModal from '@src/sharedComponents/modals/fail/failedResponseModal';
import {useFocusEffect} from '@react-navigation/native';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';

interface IProps {
    showModal: boolean;
    mapId: string;
    onClose: () => void;
}

const RouteShareModal: React.FC<IProps> = ({showModal, mapId, onClose}) => {
    const {sharedContent, shareError, isFetching} = useFetchShareLink(mapId);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useMergedTranslation('ShareScreen.ShareContent.Route');

    useEffect(() => {
        if (shareError && !isFetching) {
            setShowErrorModal(true);
        }
    }, [isFetching, shareError, mapId]);

    const onCloseModalHandler = useCallback(() => {
        setShowErrorModal(false);
        setIsLoading(false);
        onClose();
    }, [setShowErrorModal, onClose]);

    const callSharing = useCallback(() => {
        if (sharedContent?.url && !shareError) {
            callSystemShare(
                sharedContent.url,
                {
                    title: t('title'),
                    message: t('title'),
                    subject: t('subject'),
                },
                onCloseModalHandler,
            );
        }
    }, [sharedContent?.url, shareError, t, onCloseModalHandler]);

    useFocusEffect(
        React.useCallback(() => {
            const task = customInteractionManager.runAfterInteractions(() => {
                if (showModal) {
                    setIsLoading(true);
                    callSharing();
                }
            });

            return () => task.cancel();
        }, [callSharing, showModal]),
    );

    return (
        <>
            <Modal
                animationType={'fade'}
                visible={showModal}
                transparent={true}
                onRequestClose={onClose}>
                <View style={styles.backdrop}>
                    {isFetching && isLoading && (
                        <View style={styles.loaderContainer}>
                            <Loader
                                color={colors.grey}
                                androidSize={44}
                                iosSize={'large'}
                            />
                        </View>
                    )}
                </View>

                <FailedResponseModal
                    testID={'share-route-modal-error'}
                    showModal={showErrorModal}
                    errorMessage={shareError}
                    onClose={onCloseModalHandler}
                />
            </Modal>
        </>
    );
};

export default RouteShareModal;

const styles = StyleSheet.create({
    loaderContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    backdrop: {
        backgroundColor: colors.black,
        opacity: 0.4,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
});
