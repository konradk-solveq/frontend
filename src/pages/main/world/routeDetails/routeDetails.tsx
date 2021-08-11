import React, {useState} from 'react';
import {View, StatusBar, SafeAreaView, Platform, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {RegularStackRoute} from '@navigation/route';
import {
    addPlannedMap,
    removePlanendMap,
    removePrivateMapMetaData,
} from '@storage/actions/maps';
import {userIdSelector} from '@storage/selectors/auth';
import {
    favouriteMapDataByIDSelector,
    selectMapDataByIDBasedOnTypeSelector,
    selectorTypeEnum,
} from '../../../../storage/selectors/map';
import {getImagesThumbs, getSliverImageToDisplay} from '@utils/transformData';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {RouteDetailsRouteType} from '@type/rootStack';
import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';

import {I18n} from '@translations/I18n';
import {getVerticalPx} from '@helpers/layoutFoo';
import {EditBtn, BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '@sharedComponents/sliverTopBar/sliverTopBar';
import BottomModal from '@sharedComponents/modals/bottomModal/bottomModal';
import Description from './description/description';

import styles from './style';

const isIOS = Platform.OS === 'ios';

const getMapType = (params: any) => {
    if (params?.private) {
        return selectorTypeEnum.private;
    }
    if (params?.favourite) {
        return selectorTypeEnum.favourite;
    }
    return selectorTypeEnum.regular;
};

const RouteDetails = () => {
    const trans: any = I18n.t('RoutesDetails');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const norificationContext = useNotificationContext();
    const route = useRoute<RouteDetailsRouteType>();
    const mapID: string = route?.params?.mapID;
    const privateMap: boolean = !!route?.params?.private;
    const favouriteMap: boolean = !!route?.params?.favourite;
    const mapData = useAppSelector(
        selectMapDataByIDBasedOnTypeSelector(mapID, getMapType(route?.params)),
    );
    const favMapName = useAppSelector(favouriteMapDataByIDSelector(mapID))
        ?.name;

    const userID = useAppSelector(userIdSelector);
    const images = getImagesThumbs(mapData?.images || []);

    const [showBottomModal, setShowBottomModal] = useState(false);

    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;

    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const onBackHandler = () => {
        navigation.goBack();
    };

    const onGoToEditHandler = () => {
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {mapID: mapID, private: privateMap},
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
            const message = I18n.t('MainWorld.BikeMap.removeRouteFromPlanned', {
                name: favMapName || '',
            });
            norificationContext.setNotificationVisibility(message);
            dispatch(removePlanendMap(mapID));
            return;
        }
        const addRouteToPlanned = I18n.t(
            'MainWorld.BikeMap.addRouteToPlanned',
            {
                name: mapData?.name || '',
            },
        );
        norificationContext.setNotificationVisibility(addRouteToPlanned);
        dispatch(addPlannedMap(mapID));
    };

    const onPressRemoveFromFacouritesHandler = () => {
        dispatch(removePlanendMap(mapID));
        navigation.goBack();
    };

    return (
        <>
            <StatusBar translucent />
            <SafeAreaView style={[styles.safeAreaView, safeAreaStyle]}>
                <View style={{paddingTop: headerBackgroundHeight, flex: 1}}>
                    <StackHeader
                        onpress={onBackHandler}
                        inner=""
                        style={styles.header}
                        rightActions={
                            <View style={styles.actionButtonsContainer}>
                                {userID === mapData?.ownerId && (
                                    <EditBtn
                                        onPress={onGoToEditHandler}
                                        iconStyle={[
                                            styles.actionButton,
                                            // styles.leftActionButton,
                                        ]}
                                    />
                                )}
                                {/* <ShareBtn
                                    onPress={() => {}}
                                    iconStyle={styles.actionButton}
                                /> */}
                            </View>
                        }
                    />
                    <SliverTopBar imgSrc={sliverImage || ''}>
                        <View style={styles.content}>
                            <Description
                                mapData={mapData}
                                images={images}
                                isPrivateView={privateMap}
                                isFavView={favouriteMap}
                            />
                            {favouriteMap && (
                                <>
                                    <BigRedBtn
                                        title={trans.startButton}
                                        onpress={onPressStartRouteHandler}
                                        style={styles.reportButton}
                                    />
                                    <BigWhiteBtn
                                        title={trans.removeRouteButton}
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
                                                ? trans.addFavRouteButton
                                                : trans.removeFavRouteButton
                                            : trans.deleteButton
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
                                    {`${trans.textPrefix} `}
                                    <Text
                                        onPress={onPressHandler}
                                        style={styles.textbuttonAction}>
                                        {trans.textAction}
                                    </Text>
                                    {trans.textSuffix}
                                </Text>
                            </View>
                        </View>
                    </SliverTopBar>
                </View>
                <BottomModal
                    showModal={showBottomModal}
                    rightBtnTitle={trans.EditScreen.removeRouteBtn}
                    leftBtnTitle={trans.EditScreen.cancelRemoveRouteBtn}
                    onPressRight={onPressDeleteHandler}
                    onPressLeft={onPressCancelHandler}
                    onPressCancel={onPressCancelHandler}
                />
            </SafeAreaView>
        </>
    );
};

export default RouteDetails;
