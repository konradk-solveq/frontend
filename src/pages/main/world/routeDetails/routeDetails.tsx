import React, {useCallback, useState} from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {RegularStackRoute} from '@navigation/route';
import {
    addPlannedMap,
    removePlannedMap,
    removePrivateMapMetaData,
} from '@storage/actions/maps';
import {
    favouriteMapDataByIDSelector,
    selectMapDataByIDBasedOnTypeSelector,
    selectorMapTypeEnum,
    userIdSelector,
} from '@storage/selectors';
import {getImagesThumbs, getSliverImageToDisplay} from '@utils/transformData';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {RouteDetailsRouteT} from '@type/rootStack';
import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {
    BigRedBtn,
    BigWhiteBtn,
    EditBtn,
    ShareBtn,
} from '@sharedComponents/buttons';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '@sharedComponents/sliverTopBar/sliverTopBar';
import BottomModal from '@sharedComponents/modals/bottomModal/bottomModal';
import Description from './description/description';

import styles from './style';
import {useSharedMapData} from '@hooks/useSharedMapData';
import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import GenericError from '@components/error/GenericError';
import {StackActions} from '@react-navigation/native';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';

const isIOS = Platform.OS === 'ios';

const getMapType = (params: any) => {
    if (params?.private) {
        return selectorMapTypeEnum.private;
    }
    if (params?.favourite) {
        return selectorMapTypeEnum.favourite;
    }
    if (params?.featured) {
        return selectorMapTypeEnum.featured;
    }
    return selectorMapTypeEnum.regular;
};

const RouteDetails = () => {
    const {t} = useMergedTranslation('RoutesDetails');
    const {t: tmb} = useMergedTranslation('MainWorld.BikeMap');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const notificationContext = useNotificationContext();
    const route = useRoute<RouteDetailsRouteT>();

    const privateMap: boolean = !!route?.params?.private;
    const favouriteMap: boolean = !!route?.params?.favourite;
    const featuredMap: boolean = !!route?.params?.featured;
    const shareID = route?.params?.shareID;
    const cameFromSharedLink: boolean = !!shareID;

    const {mapData: sharedMapData, isLoading, error} = useSharedMapData(
        shareID,
    );
    const mapID = sharedMapData?.id ?? route?.params?.mapID;
    const mapData = useAppSelector(
        selectMapDataByIDBasedOnTypeSelector(mapID, getMapType(route?.params)),
    );

    const isPublished =
        shareID && !mapData ? sharedMapData?.isPublic : mapData?.isPublic;

    const favMapName = useAppSelector(favouriteMapDataByIDSelector(mapID))
        ?.name;

    const userID = useAppSelector(userIdSelector);
    const images = getImagesThumbs(
        (shareID && !mapData ? sharedMapData?.images : mapData?.images) || [],
    );

    const [showBottomModal, setShowBottomModal] = useState(false);

    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;
    const safeAreaBackgroundStyle = {
        backgroundColor: error && !mapID ? '#FAFAFA' : 'transparent',
    };
    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */
    const onBackHandler = useCallback(() => {
        if (cameFromSharedLink) {
            /**
             * we use replace instead of navigate, because if you open the app using the shared link,
             * this screen ends up as the top screen of the stack navigator
             */
            navigation.dispatch(
                StackActions.replace(RegularStackRoute.TAB_MENU_SCREEN),
            );
        } else {
            navigation.goBack();
        }
    }, [cameFromSharedLink, navigation]);

    useCustomBackNavButton(onBackHandler, true);

    const onGoToEditHandler = () => {
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {mapID: mapID, private: privateMap},
        });
    };

    const onShareRouteHandler = () => {
        navigation.navigate({
            name: RegularStackRoute.SHARE_ROUTE_SCREEN,
            params: {mapID: mapID, mapType: getMapType(route.params)},
        });
    };

    const onPressHandler = () => {
        if (privateMap) {
            setShowBottomModal(true);
            return;
        } else {
            navigation.navigate(RegularStackRoute.CONTACT_SCREEN);
        }
        console.log('create ticket');
        /* TODO: user can delete if creted route. For public routes can only make ticket */
    };

    const onPressReportHandler = () => {
        navigation.navigate(RegularStackRoute.CONTACT_SCREEN);
    };

    const onPressDeleteHandler = () => {
        setShowBottomModal(false);
        dispatch(removePrivateMapMetaData(mapID));
        navigation.goBack();
    };

    const onPressCancelHandler = () => {
        setShowBottomModal(false);
    };

    const sliverImage = getSliverImageToDisplay(images);

    const onPressStartRouteHandler = () => {
        navigation.navigate({
            name: RegularStackRoute.COUNTER_SCREEN,
            params: {mapID: mapID, private: privateMap},
        });
    };

    const onPressAddRouteHandler = () => {
        if (favMapName) {
            const message = tmb('removeRouteFromPlanned', {
                name: '',
            });
            notificationContext.setNotificationVisibility(message);
            dispatch(removePlannedMap(mapID));
            return;
        }
        const addRouteToPlanned = tmb('addRouteToPlanned', {name: ''});
        notificationContext.setNotificationVisibility(addRouteToPlanned);
        dispatch(addPlannedMap(mapID));
    };

    const onPressRemoveFromFacouritesHandler = () => {
        dispatch(removePlannedMap(mapID));
        navigation.goBack();
    };

    const handleErrorBtnPress = () => {
        navigation.navigate(RegularStackRoute.TAB_MENU_SCREEN);
    };

    const containerStyle = {
        paddingTop: headerBackgroundHeight,
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <SafeAreaView
                style={[
                    styles.safeAreaView,
                    safeAreaStyle,
                    safeAreaBackgroundStyle,
                ]}>
                <View style={[styles.container, containerStyle]}>
                    <StackHeader
                        forceBackArrow={cameFromSharedLink}
                        onpress={onBackHandler}
                        inner=""
                        style={styles.header}
                        rightActions={
                            <View style={styles.actionButtonsContainer}>
                                {userID ===
                                    (shareID && !mapData
                                        ? sharedMapData?.ownerId
                                        : mapData?.ownerId) && (
                                    <EditBtn
                                        testID={'route-details-edit-btn'}
                                        onPress={onGoToEditHandler}
                                        iconStyle={[
                                            styles.actionButton,
                                            isPublished &&
                                                styles.leftActionButton,
                                        ]}
                                    />
                                )}
                                {isPublished && (
                                    <ShareBtn
                                        testID={'route-details-share-btn'}
                                        onPress={onShareRouteHandler}
                                        iconStyle={styles.actionButton}
                                    />
                                )}
                            </View>
                        }
                    />
                    {error ? (
                        <GenericError
                            errorTitle={t('share.error.title')}
                            errorMessage={t('share.error.message')}
                            buttonText={t('share.error.button')}
                            onButtonPress={handleErrorBtnPress}
                        />
                    ) : (
                        <SliverTopBar imgSrc={sliverImage || ''}>
                            <View style={styles.content}>
                                <Description
                                    mapData={
                                        shareID && !mapData
                                            ? sharedMapData
                                            : mapData
                                    }
                                    images={images}
                                    isPrivateView={privateMap}
                                    isFavView={favouriteMap}
                                    isFeaturedView={featuredMap}
                                />
                                {favouriteMap && (
                                    <>
                                        <BigRedBtn
                                            testID={'route-details-start-btn'}
                                            title={t('startButton')}
                                            onpress={onPressStartRouteHandler}
                                            style={styles.reportButton}
                                        />
                                        <BigWhiteBtn
                                            title={t('removeRouteButton')}
                                            testID={'route-details-remove-btn'}
                                            onpress={
                                                onPressRemoveFromFacouritesHandler
                                            }
                                            style={[
                                                styles.removeRouteButton,
                                                styles.buttonBottomDistance,
                                            ]}
                                        />
                                    </>
                                )}

                                {!favouriteMap && (
                                    <BigRedBtn
                                        title={
                                            !privateMap
                                                ? !favMapName
                                                    ? t('addFavRouteButton')
                                                    : t('removeFavRouteButton')
                                                : t('deleteButton')
                                        }
                                        onpress={
                                            !privateMap
                                                ? onPressAddRouteHandler
                                                : onPressHandler
                                        }
                                        style={[
                                            styles.reportButton,
                                            styles.buttonBottomDistance,
                                        ]}
                                    />
                                )}
                                <View style={styles.textButtonContainer}>
                                    <Text style={styles.textButton}>
                                        {`${t('textPrefix')} `}
                                        <Text
                                            onPress={onPressReportHandler}
                                            style={styles.textbuttonAction}>
                                            {t('textAction')}
                                        </Text>
                                        {t('textSuffix')}
                                    </Text>
                                </View>
                            </View>
                        </SliverTopBar>
                    )}
                </View>
                <BottomModal
                    showModal={showBottomModal}
                    rightBtnTitle={t('EditScreen.removeRouteBtn')}
                    leftBtnTitle={t('EditScreen.cancelRemoveRouteBtn')}
                    onPressRight={onPressDeleteHandler}
                    onPressLeft={onPressCancelHandler}
                    onPressCancel={onPressCancelHandler}
                />
            </SafeAreaView>
        </>
    );
};

export default RouteDetails;
