import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import colors from '@theme/colors';
import {Loader} from '@src/components/loader';
import useFetchShareLink from '@src/hooks/useFetchShareLink';
import {callSystemShare} from '@src/utils/callSystemShare';
import customInteractionManager from '@src/utils/customInteractionManager/customInteractionManager';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';
import {ErrorModal} from '@src/components/modals';

interface IProps {
    showModal: boolean;
    mapId: string;
    onClose: () => void;
}

const RouteShareModal: React.FC<IProps> = ({showModal, mapId, onClose}) => {
    const {sharedContent, shareError, isFetching} = useFetchShareLink(mapId);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const systemShareCalledRef = useRef(false);
    const {t} = useMergedTranslation('ShareScreen.ShareContent.Route');

    useEffect(() => {
        if (shareError && !isFetching) {
            setShowErrorModal(true);
        }
    }, [isFetching, shareError, mapId]);

    const onCloseModalHandler = useCallback(() => {
        setShowErrorModal(false);
        systemShareCalledRef.current = false;
        setIsLoading(false);
        onClose();
    }, [setShowErrorModal, onClose]);

    const callSharing = useCallback(() => {
        if (
            sharedContent?.url &&
            !shareError &&
            !systemShareCalledRef.current
        ) {
            systemShareCalledRef.current = true;
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

    const handleShare = useCallback(() => {
        const task = customInteractionManager.runAfterInteractions(() => {
            if (showModal) {
                setIsLoading(true);
                callSharing();
            }
        });

        return () => task.cancel();
    }, [callSharing, showModal]);

    useEffect(handleShare, [handleShare]);

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

                <ErrorModal
                    testID={'share-route-modal-error'}
                    showModal={showErrorModal}
                    errorTitle={t('errorTitle')}
                    errorMessage={shareError}
                    handleClose={onCloseModalHandler}
                    isFullScreen
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
