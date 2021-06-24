import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {I18n} from '../../../../../I18n/I18n';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {RegularStackRoute} from '../../../../navigation/route';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
    selectMapDataByIDBasedOnTypeSelector,
    selectorTypeEnum,
} from '../../../../storage/selectors/map';
import {userIdSelector} from '../../../../storage/selectors/auth';
import {getImagesThumbs} from '../../../../utils/transformData';
import {removePrivateMapMetaData} from '../../../../storage/actions/maps';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import {
    ShareBtn,
    EditBtn,
    BigRedBtn,
} from '../../../../sharedComponents/buttons';
import Description from './description/description';
import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import BottomModal from '../../../../sharedComponents/modals/bottomModal/bottomModal';

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
    const route = useRoute();
    const mapID: string = route?.params?.mapID;
    const privateMap: boolean = route?.params?.private;
    const favouriteMap: boolean = route?.params?.favourite;
    const mapData = useAppSelector(
        selectMapDataByIDBasedOnTypeSelector(mapID, getMapType(route?.params)),
    );
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
            navigation.navigate('Contact');
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
                    <SliverTopBar imgSrc={images?.sliverImg || ''}>
                        <View style={styles.content}>
                            <Description
                                mapData={mapData}
                                images={images}
                                isPrivateView={privateMap}
                                isFavView={favouriteMap}
                            />
                            <BigRedBtn
                                title={
                                    !privateMap
                                        ? trans.reportButton
                                        : trans.deleteButton
                                }
                                onpress={onPressHandler}
                                style={styles.reportButton}
                            />
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
});

export default RouteDetails;
