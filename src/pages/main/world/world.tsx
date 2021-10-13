import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import I18n from 'react-native-i18n';

import {RegularStackRoute} from '@navigation/route';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {RouteMapType} from '@models/places.model';
import {PickedFilters} from '@interfaces/form';
import {WorldRouteType} from '@type/rootStack';
import {
    loadingMapsSelector,
    nextPaginationCoursor,
    nextPlannedPaginationCoursor,
    nextPrivatePaginationCoursor,
} from '@storage/selectors/map';
import {
    fetchMapsList,
    fetchPlannedMapsList,
    fetchPrivateMapsList,
} from '@storage/actions';
import {checkIfContainsFitlers} from '@utils/apiDataTransform/filters';
import {getVerticalPx} from '@helpers/layoutFoo';

import {FiltersBtn, MapBtn, TypicalRedBtn} from '@sharedComponents/buttons';
import TabBackGround from '@sharedComponents/navi/tabBackGround';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';

import FiltersModal from './components/filters/filtersModal';
import BikeMap from './bikeMap/bikeMap';
import MyRoutes from './myRoutes/myRoutes';
import PlannedRoutes from './plannedRoutes/plannedRoutes';

import styles from './style';
// import FeaturedRoutes from './featuredRoutes/FeaturedRoutes';

const isAndroid = Platform.OS === 'android';

/* TODO: refresh data if position chagned more than 500 meters */
const World: React.FC = () => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('MainWorld');
    const navigation = useNavigation();
    const route = useRoute<WorldRouteType>();

    const statusBarHeight = useStatusBarHeight();
    const nextCoursor = useAppSelector(nextPaginationCoursor);
    const nextPrivateCoursor = useAppSelector(nextPrivatePaginationCoursor);
    const nextPlannedCoursor = useAppSelector(nextPlannedPaginationCoursor);
    const isLoading = useAppSelector(loadingMapsSelector);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});
    const [activeTab, setActiveTab] = useState<RouteMapType>(
        RouteMapType.BIKE_MAP,
    );

    useEffect(() => {
        const isValid = checkIfContainsFitlers(savedMapFilters);
        if (isValid) {
            if (activeTab === RouteMapType.BIKE_MAP) {
                dispatch(fetchMapsList(undefined, savedMapFilters));
                return;
            }
            if (activeTab === RouteMapType.MY_ROUTES) {
                dispatch(fetchPrivateMapsList(undefined, savedMapFilters));
                return;
            }
            if (activeTab === RouteMapType.PLANNING) {
                dispatch(fetchPlannedMapsList(undefined, savedMapFilters));
                return;
            }
        }
    }, [dispatch, savedMapFilters, activeTab]);

    useEffect(() => {
        if (route.params?.activeTab) {
            setActiveTab(route.params.activeTab);
            navigation.setParams({activeTab: null});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params?.activeTab]);

    const handleBikeMap = () => {
        if (activeTab === RouteMapType.BIKE_MAP) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(RouteMapType.BIKE_MAP);
    };
    const handleMyRoutes = () => {
        if (activeTab === RouteMapType.MY_ROUTES) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(RouteMapType.MY_ROUTES);
    };
    const handlePlaned = () => {
        if (activeTab === RouteMapType.PLANNING) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(RouteMapType.PLANNING);
    };

    const onShowModalHanlder = () => {
        setShowModal(true);
    };

    const onHideModalHandler = () => {
        setShowModal(false);
    };

    const onSetFiltersHandler = (picked: PickedFilters) => {
        setSavedMapFilters(picked);
        onHideModalHandler();
    };

    const onLoadMoreHandler = useCallback(() => {
        if (!isLoading) {
            if (nextPrivateCoursor && activeTab === RouteMapType.MY_ROUTES) {
                dispatch(
                    fetchPrivateMapsList(nextPrivateCoursor, savedMapFilters),
                );
                return;
            }
            if (nextCoursor && activeTab === RouteMapType.BIKE_MAP) {
                dispatch(fetchMapsList(nextCoursor, savedMapFilters));
                return;
            }
            if (nextCoursor && activeTab === RouteMapType.PLANNING) {
                dispatch(
                    fetchPlannedMapsList(nextPlannedCoursor, savedMapFilters),
                );
                return;
            }
        }
    }, [
        dispatch,
        isLoading,
        nextCoursor,
        nextPrivateCoursor,
        nextPlannedCoursor,
        activeTab,
        savedMapFilters,
    ]);

    const onRefreshHandler = useCallback(() => {
        if (activeTab === RouteMapType.MY_ROUTES) {
            dispatch(fetchPrivateMapsList());
            return;
        }
        if (activeTab === RouteMapType.BIKE_MAP) {
            dispatch(fetchMapsList());
            return;
        }
        if (activeTab === RouteMapType.PLANNING) {
            dispatch(fetchPlannedMapsList());
            return;
        }
    }, [dispatch, activeTab]);

    const navigateTouRouteMap = useCallback(() => {
        navigation.navigate(RegularStackRoute.ROUTES_MAP_SCREEN, {
            activeTab: activeTab,
            private: activeTab === RouteMapType.MY_ROUTES,
            favourite: activeTab === RouteMapType.PLANNING,
        });
    }, [activeTab, navigation]);

    const renderActiveScreen = useCallback(() => {
        switch (activeTab) {
            case RouteMapType.BIKE_MAP:
                return (
                    <BikeMap
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                    />
                );
            case RouteMapType.MY_ROUTES:
                /**
                 * My routes should be ordered by date by default.
                 */
                return (
                    <MyRoutes
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                        onPress={() => setActiveTab(RouteMapType.BIKE_MAP)}
                        sortedByDate={!!savedMapFilters?.order || true}
                    />
                );
            case RouteMapType.PLANNING:
                return (
                    <PlannedRoutes
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                        onPress={() => setActiveTab(RouteMapType.BIKE_MAP)}
                    />
                );
            default:
                return (
                    <BikeMap
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                    />
                );
        }
    }, [activeTab, onLoadMoreHandler, onRefreshHandler]);

    const dynamicStyles = StyleSheet.create({
        headerWrapper: {
            top: getVerticalPx(isAndroid ? 65 - statusBarHeight : 65),
        },
        btns: {
            marginTop:
                getVerticalPx(138) < 100
                    ? 100
                    : getVerticalPx(138 - statusBarHeight),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <FiltersModal
                key={activeTab}
                onClose={onHideModalHandler}
                definedFilters={savedMapFilters}
                onSave={onSetFiltersHandler}
                showModal={showModal}
                allowedFilters={
                    RouteMapType.MY_ROUTES === activeTab ? ['order'] : undefined
                }
            />

            <View style={styles.wrap}>
                <View style={[styles.btns, dynamicStyles.btns]}>
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnBikeMap}
                        active={activeTab === RouteMapType.BIKE_MAP}
                        onpress={handleBikeMap}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnMyRoutes}
                        active={activeTab === RouteMapType.MY_ROUTES}
                        onpress={handleMyRoutes}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnPlaned}
                        active={activeTab === RouteMapType.PLANNING}
                        onpress={handlePlaned}
                    />
                </View>
            </View>

            <View style={styles.viewContainer}>{renderActiveScreen()}</View>

            <TabBackGround />

            <StackHeader
                hideBackArrow
                inner={trans.header}
                rightActions={
                    <View style={styles.headerButtons}>
                        <FiltersBtn
                            onPress={onShowModalHanlder}
                            iconStyle={styles.headerButton}
                        />
                        <View style={styles.mapBtn}>
                            <MapBtn
                                onPress={navigateTouRouteMap}
                                iconStyle={styles.headerButton}
                            />
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default World;
