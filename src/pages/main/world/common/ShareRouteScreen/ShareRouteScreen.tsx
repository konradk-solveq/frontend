import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {InteractionManager, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

import i18next from '@translations/i18next';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {
    ShareRouteScreenNavigationPropT,
    ShareRouteScreenRouteT,
} from '@type/rootStack';
import useFetchShareLink from '@hooks/useFetchShareLink';
import {callSystemShare} from '@utils/callSystemShare';

import GenericScreen from '@pages/template/GenericScreen';
import ShareRouteImage from '@sharedComponents/images/ShareRouteImage';
import FailedResponseModal from '@sharedComponents/modals/fail/failedResponseModal';
import {ShareBtn} from '@sharedComponents/buttons';

import Placeholder from './Placeholder';
import styles from './style';

const ShareRouteScreen: React.FC = () => {
    const trans: any = useMemo(
        () =>
            i18next.t('ShareScreen', {
                returnObjects: true,
            }),
        [],
    );
    const navigation = useNavigation<ShareRouteScreenNavigationPropT>();
    const {mapID} = useRoute<ShareRouteScreenRouteT>().params;

    const [shareBtnIsVisible, setShareBtnIsVisible] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);

    const {sharedContent, shareError, isFetching} = useFetchShareLink(mapID);

    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    /**
     * Show error modal
     */
    useEffect(() => {
        if (shareError && !isFetching) {
            setShowErrorModal(true);
        }
    }, [isFetching, shareError]);

    const callSharing = useCallback(() => {
        if (sharedContent?.url && !shareError) {
            setShareBtnIsVisible(true);

            callSystemShare(sharedContent.url, {
                title: trans.ShareContent.Route.title,
                message: trans.ShareContent.Route.title,
                subject: trans.ShareContent.Route.subject,
            });
        }
    }, [sharedContent?.url, shareError, trans]);

    /**
     * Call share menu
     */
    useFocusEffect(
        React.useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                callSharing();
            });

            return () => task.cancel();
        }, [callSharing]),
    );

    const onImageLoadedHandler = () => {
        setShowPlaceholder(false);
    };

    const onCloseModalHandler = () => {
        setShowErrorModal(false);
        navigateBack();
    };

    return (
        <GenericScreen screenTitle={trans.header} contentBelowHeader>
            <View style={styles.innerContainer}>
                <View style={styles.content}>
                    <Placeholder
                        showPlaceholder={showPlaceholder}
                        layout={{
                            width: getHorizontalPx(358),
                            height: getVerticalPx(239),
                        }}>
                        <ShareRouteImage
                            imgUrl={sharedContent?.content?.image}
                            onImageLoaded={onImageLoadedHandler}
                            containerStyles={styles.shareImageContainer}
                        />
                    </Placeholder>

                    <View>
                        {shareBtnIsVisible && (
                            <ShareBtn
                                onPress={callSharing}
                                iconStyle={styles.sharebutton}
                            />
                        )}
                    </View>
                </View>
            </View>
            <FailedResponseModal
                testID={'ShareRouteScreen-modal'}
                showModal={showErrorModal}
                errorMessage={shareError}
                onClose={onCloseModalHandler}
            />
        </GenericScreen>
    );
};

export default ShareRouteScreen;
