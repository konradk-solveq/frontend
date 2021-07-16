import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import I18n from 'react-native-i18n';

import MyRoutes from './myRoutes/myRoutes';
import {getVerticalPx} from '../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {
    loadingMapsSelector,
    nextPaginationCoursor,
    nextPlannedPaginationCoursor,
    nextPrivatePaginationCoursor,
} from '../../../storage/selectors/map';
import {fetchMapsList} from '../../../storage/actions';
import {
    fetchPlannedMapsList,
    fetchPrivateMapsList,
} from '../../../storage/actions/maps';
import {PickedFilters} from '../../../interfaces/form';
import {checkIfContainsFitlers} from '../../../utils/apiDataTransform/filters';
import useFineWhenInUseLocationPermission from '../../../hooks/useFineWhenInUseLocationPermission';

import FiltersModal from './components/filters/filtersModal';
import {FiltersBtn} from '../../../sharedComponents/buttons';
import BikeMap from './bikeMap/bikeMap';
import TypicalRedBtn from '../../../sharedComponents/buttons/typicalRed';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import PlannedRoutes from './plannedRoutes/plannedRoutes';

import styles from './style';
import {RegularStackRoute} from '../../../navigation/route';
import {RouteMapType} from '../../../models/places.model';
import {WorldRouteType} from '../../../types/rootStack';

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

    useFineWhenInUseLocationPermission();

    useEffect(() => {
        const isValid = checkIfContainsFitlers(savedMapFilters);
        if (isValid) {
            if (activeTab === RouteMapType.BIKE_MAP) {
                dispatch(fetchMapsList(undefined, savedMapFilters));
                return;
            }
            if (activeTab === RouteMapType.MY_ROUTES) {
                dispatch(fetchPrivateMapsList(undefined, savedMapFilters));
            }
            if (activeTab === RouteMapType.PLANNING) {
                dispatch(fetchPlannedMapsList(undefined, savedMapFilters));
            }
        }
    }, [dispatch, savedMapFilters, activeTab]);

    useEffect(() => {
        if (route.params?.activeTab) {
            setActiveTab(route.params.activeTab);
        }
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
                dispatch(fetchPrivateMapsList(nextPrivateCoursor));
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
                return (
                    <MyRoutes
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                        onPress={() => setActiveTab(RouteMapType.BIKE_MAP)}
                        sortedByDate={!!savedMapFilters?.order}
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
            <View style={[styles.headerWrapper, dynamicStyles.headerWrapper]}>
                <Text style={styles.header}>{trans.header}</Text>
                <View style={styles.headerButtons}>
                    <FiltersBtn
                        onPress={onShowModalHanlder}
                        iconStyle={[
                            styles.headerButton,
                            // styles.headerButtonLeft,
                        ]}
                    />
                    <View style={styles.mapBtn}>
                        <MapBtn
                            onPress={navigateTouRouteMap}
                            iconStyle={styles.headerButton}
                        />
                    </View>
                </View>
            </View>

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
        </SafeAreaView>
    );
};

export default World;
