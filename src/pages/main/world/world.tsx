import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import I18n from 'react-native-i18n';

import MyRoutes from './myRoutes/myRoutes';
import {getVerticalPx} from '../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {
    loadingMapsSelector,
    nextPaginationCoursor,
    nextPrivatePaginationCoursor,
} from '../../../storage/selectors/map';
import {fetchMapsList} from '../../../storage/actions';
import {
    fetchPlannedMapsList,
    fetchPrivateMapsList,
} from '../../../storage/actions/maps';
import {requestGeolocationPermission} from '../../../utils/geolocation';
import {PickedFilters} from '../../../interfaces/form';
import {checkIfContainsFitlers} from '../../../utils/apiDataTransform/filters';

import FiltersModal from './components/filters/filtersModal';
import {FiltersBtn, MapBtn} from '../../../sharedComponents/buttons';
import BikeMap from './bikeMap/bikeMap';
import TypicalRedBtn from '../../../sharedComponents/buttons/typicalRed';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import PlannedRoutes from './plannedRoutes/plannedRoutes';

import styles from './style';

const isAndroid = Platform.OS === 'android';

enum routesTab {
    BIKEMAP = 'map',
    MYROUTES = 'routes',
    PLANED = 'planed',
}

/* TODO: refresh data if position chagned more than 500 meters */
const World: React.FC = () => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('MainWorld');
    const navigation = useNavigation();

    const statusBarHeight = useStatusBarHeight();
    const nextCoursor = useAppSelector(nextPaginationCoursor);
    const nextPrivateCoursor = useAppSelector(nextPrivatePaginationCoursor);
    const isLoading = useAppSelector(loadingMapsSelector);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});
    const [activeTab, setActiveTab] = useState<routesTab>(routesTab.BIKEMAP);

    useEffect(() => {
        requestGeolocationPermission();
    }, []);

    useEffect(() => {
        const isValid = checkIfContainsFitlers(savedMapFilters);
        if (isValid) {
            if (activeTab === routesTab.BIKEMAP) {
                dispatch(fetchMapsList(undefined, savedMapFilters));
                return;
            }
            if (activeTab === routesTab.MYROUTES) {
                dispatch(fetchPrivateMapsList(undefined, savedMapFilters));
            }
            if (activeTab === routesTab.PLANED) {
                dispatch(fetchPlannedMapsList(undefined, savedMapFilters));
            }
        }
    }, [dispatch, savedMapFilters, activeTab]);

    const handleBikeMap = () => {
        if (activeTab === routesTab.BIKEMAP) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(routesTab.BIKEMAP);
    };
    const handleMyRoutes = () => {
        if (activeTab === routesTab.MYROUTES) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(routesTab.MYROUTES);
    };
    const handlePlaned = () => {
        if (activeTab === routesTab.PLANED) {
            return;
        }
        setSavedMapFilters({});
        setActiveTab(routesTab.PLANED);
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
            if (nextPrivateCoursor && activeTab === routesTab.MYROUTES) {
                dispatch(fetchPrivateMapsList(nextPrivateCoursor));
                return;
            }
            if (nextCoursor && activeTab === routesTab.BIKEMAP) {
                dispatch(fetchMapsList(nextCoursor, savedMapFilters));
                return;
            }
            if (nextCoursor && activeTab === routesTab.PLANED) {
                dispatch(fetchPlannedMapsList(nextCoursor, savedMapFilters));
                return;
            }
        }
    }, [
        dispatch,
        isLoading,
        nextCoursor,
        nextPrivateCoursor,
        activeTab,
        savedMapFilters,
    ]);

    const onRefreshHandler = useCallback(() => {
        if (activeTab === routesTab.MYROUTES) {
            dispatch(fetchPrivateMapsList());
            return;
        }
        if (activeTab === routesTab.BIKEMAP) {
            dispatch(fetchMapsList());
            return;
        }
        if (activeTab === routesTab.PLANED) {
            dispatch(fetchPlannedMapsList());
            return;
        }
    }, [dispatch, activeTab]);

    const renderActiveScreen = useCallback(() => {
        switch (activeTab) {
            case routesTab.BIKEMAP:
                return (
                    <BikeMap
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                    />
                );
            case routesTab.MYROUTES:
                return (
                    <MyRoutes
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                        onPress={() => setActiveTab(routesTab.BIKEMAP)}
                    />
                );
            case routesTab.PLANED:
                return (
                    <PlannedRoutes
                        onRefresh={onRefreshHandler}
                        onLoadMore={onLoadMoreHandler}
                        onPress={() => setActiveTab(routesTab.BIKEMAP)}
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
                    routesTab.MYROUTES === activeTab ? ['order'] : undefined
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
                            onPress={() => {
                                navigation.navigate('RoutesMap');
                            }}
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
                        active={activeTab === routesTab.BIKEMAP}
                        onpress={handleBikeMap}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnMyRoutes}
                        active={activeTab === routesTab.MYROUTES}
                        onpress={handleMyRoutes}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnPlaned}
                        active={activeTab === routesTab.PLANED}
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
