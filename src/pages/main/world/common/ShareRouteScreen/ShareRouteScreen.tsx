import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

import {I18n} from '@translations/I18n';
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
    const trans: any = I18n.t('ShareScreen');
    const navigation = useNavigation<ShareRouteScreenNavigationPropT>();
    const {mapID} = useRoute<ShareRouteScreenRouteT>().params;

    const shareBtnIsVisible = useRef(false);

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
            shareBtnIsVisible.current = true;

            callSystemShare(sharedContent.url, {
                message: trans.ShareContent.Route.message,
                title: trans.ShareContent.Route.title,
                subject: trans.ShareContent.Route.subject,
            });
        }
    }, [sharedContent?.url, shareError, trans]);

    /**
     * Call share menu
     */
    useEffect(() => {
        callSharing();
    }, [callSharing]);

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
                            imgUrl={sharedContent?.content?.imgUrl}
                            onImageLoaded={onImageLoadedHandler}
                            containerStyles={styles.shareImageContainer}
                        />
                    </Placeholder>

                    <View>
                        {shareBtnIsVisible.current && (
                            <ShareBtn
                                onPress={callSharing}
                                iconStyle={styles.sharebutton}
                            />
                        )}
                    </View>
                </View>
            </View>
            <FailedResponseModal
                testID={'ShareRouteScreen'}
                showModal={showErrorModal}
                errorMessage={shareError}
                onClose={onCloseModalHandler}
            />
        </GenericScreen>
    );
};

export default ShareRouteScreen;
