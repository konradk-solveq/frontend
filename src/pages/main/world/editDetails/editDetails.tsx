import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, Platform, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {ImagesMetadataType} from '../../../../interfaces/api';
import {
    loadingMapsSelector,
    mapDataByIDSelector,
    mapIdToAddSelector,
    privateDataByIDSelector,
    mapsErrorSelector,
} from '../../../../storage/selectors/map';
import {editPrivateMapMetaData} from '../../../../storage/actions/maps';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {getImagesThumbs} from '../../../../utils/transformData';
import {ImageType, MapFormDataResult} from '../../../../interfaces/form';
import useCustomBackNavButton from '../../../../hooks/useCustomBackNavBtn';
import {EditDetailsRouteType} from '@type/rootStack';
import {MapType} from '@models/map.model';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import EditForm from './form/editForm';
import Loader from '@components/svg/loader/loader';
import PublishRouteThankYouPageModal from '../../../../sharedComponents/modals/publishRouteThankYouPageModal/publishRouteThankYouPageModal';
import WrongResponseModal from '../../../../sharedComponents/modals/fail/failedResponseModal';

import styles from './style';

const isIOS = Platform.OS === 'ios';

const EditDetails = () => {
    const wasPublishedBeforeRef = useRef(false);

    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const route = useRoute<EditDetailsRouteType>();
    const mapID = route?.params?.mapID;
    const privateMap = route?.params?.private;
    const redirectToScreen = route?.params?.redirectTo;

    const newPrivateMapID = useAppSelector(mapIdToAddSelector);
    const mapData: MapType | undefined = useAppSelector(
        !privateMap
            ? mapDataByIDSelector(mapID)
            : privateDataByIDSelector(mapID || newPrivateMapID),
    );
    const error = useAppSelector(mapsErrorSelector);
    const isLoading = useAppSelector(loadingMapsSelector);

    const images = getImagesThumbs(mapData?.pictures);
    const [submit, setSubmit] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const onBackHandler = useCallback(() => {
        if (redirectToScreen) {
            navigation.navigate(redirectToScreen);
            return;
        }
        navigation.goBack();
    }, [navigation, redirectToScreen]);

    useCustomBackNavButton(onBackHandler, true);

    const onScrollToTopHandler = (p: boolean) => {
        setScrollToTop(p);
    };

    useEffect(() => {
        if (mapData?.isPublic) {
            wasPublishedBeforeRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (submit && !isLoading) {
            if (error?.statusCode < 400) {
                setShowModal(true);
                setSubmit(false);
                return;
            }
            setShowErrorModal(true);
            setSubmit(false);
        }
    }, [isLoading, error?.statusCode, submit, onBackHandler]);

    const onSubmitHandler = (
        data: MapFormDataResult,
        publish: boolean,
        imgsToAdd?: ImageType[],
        imgsToRemove?: string[],
    ) => {
        const iToRemove: string[] = [];
        images.images.forEach(i => {
            if (imgsToRemove?.includes(i)) {
                const iTD = mapData?.images?.find(
                    im => i.includes(im.id) && im.type !== 'map',
                );
                if (iTD?.id) {
                    iToRemove.push(iTD?.id);
                }
            }
        });
        const imgsToChange: ImagesMetadataType = {
            save: imgsToAdd,
            delete: iToRemove,
        };
        dispatch(
            editPrivateMapMetaData(
                data,
                imgsToChange,
                publish,
                mapID || newPrivateMapID,
            ),
        );
        setSubmit(true);
        setIsPublished(publish);
    };

    if (isLoading && submit) {
        return <Loader />;
    }

    return (
        <>
            <SafeAreaView style={[styles.safeAreaView, safeAreaStyle]}>
                <View
                    style={[
                        styles.innerContainer,
                        {paddingTop: headerBackgroundHeight},
                    ]}>
                    <StackHeader
                        onpress={onBackHandler}
                        inner=""
                        style={styles.header}
                    />
                    <SliverTopBar
                        scrollToTopPosition={scrollToTop}
                        resetScrollPosition={() => onScrollToTopHandler(false)}
                        imgSrc={images?.sliverImg || ''}>
                        <View style={styles.content}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.container}>
                                    <EditForm
                                        onSubmit={onSubmitHandler}
                                        mapData={mapData}
                                        imagesData={images}
                                        scrollTop={() =>
                                            onScrollToTopHandler(true)
                                        }
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </SliverTopBar>
                    <PublishRouteThankYouPageModal
                        showModal={showModal}
                        onPress={onBackHandler}
                        isPublished={isPublished}
                        wasPublished={wasPublishedBeforeRef.current}
                        onBackPress={() => setShowModal(false)}
                    />
                    <WrongResponseModal
                        showModal={showErrorModal}
                        errorMessage={error?.message}
                        onClose={() => setShowErrorModal(false)}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default EditDetails;
