import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
    Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {RegularStackRoute} from '@navigation/route';
import {
    removePlanendMap,
    removePrivateMapMetaData,
} from '@storage/actions/maps';
import {userIdSelector} from '@storage/selectors/auth';
import {
    selectMapDataByIDBasedOnTypeSelector,
    selectorTypeEnum,
} from '../../../../storage/selectors/map';
import {getImagesThumbs, getSliverImageToDisplay} from '@utils/transformData';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {RouteDetailsRouteType} from '@type/rootStack';

import {I18n} from '@translations/I18n';
import {getVerticalPx} from '@helpers/layoutFoo';
import {EditBtn, BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '@sharedComponents/sliverTopBar/sliverTopBar';
import BottomModal from '@sharedComponents/modals/bottomModal/bottomModal';
import Description from './description/description';

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
    const route = useRoute<RouteDetailsRouteType>();
    const mapID: string = route?.params?.mapID;
    const privateMap: boolean = !!route?.params?.private;
    const favouriteMap: boolean = !!route?.params?.favourite;
    const mapData = useAppSelector(
        selectMapDataByIDBasedOnTypeSelector(mapID, getMapType(route?.params)),
    );
    const userID = useAppSelector(userIdSelector);
    const images = getImagesThumbs(mapData?.images || []);

    const [showBottomModal, setShowBottomModal] = useState(false);

    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;

    const headerBackgroundHeight =
        getVerticalPx(100); /* equal to header height */

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
                            {!favouriteMap && (
                                <BigRedBtn
                                    title={
                                        !privateMap
                                            ? trans.reportButton
                                            : trans.deleteButton
                                    }
                                    onpress={onPressHandler}
                                    style={styles.reportButton}
                                />
                            )}
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
                                        style={styles.removeRouteButton}
                                    />
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
                                </>
                            )}
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

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    headerBackground: {
        zIndex: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    header: {
        zIndex: 3,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        margin: 0,
    },
    leftActionButton: {
        marginRight: 20,
    },
    content: {
        marginHorizontal: 40,
        marginBottom: getVerticalPx(35),
    },
    reportButton: {
        height: 50,
    },
    removeRouteButton: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(30),
        height: 50,
    },
    textButtonContainer: {
        width: '100%',
        height: '100%',
    },
    textButton: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        lineHeight: 24,
        color: '#555555',
    },
    textbuttonAction: {
        color: '#3587ea',
    },
});

export default RouteDetails;
