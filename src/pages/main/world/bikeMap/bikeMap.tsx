import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {RegularStackRoute} from '@navigation/route';
import {Map} from '@models/map.model';
import {I18n} from '@translations/I18n';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import {useAppSelector} from '@hooks/redux';
import {
    loadingMapsSelector,
    mapsListSelector,
    refreshMapsSelector,
    selectorMapTypeEnum,
} from '@storage/selectors/map';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import Loader from '@sharedComponents/loader/loader';

import FirstTile from '../components/tiles/firstTile';
import NextTile from '../components/tiles/nextTile';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';

import FeaturedRoutes from '../featuredRoutes/FeaturedRoutesList/FeaturedRoutes';
import styles from './style';

const isIOS = Platform.OS === 'ios';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {
    onRefresh: () => void;
    onLoadMore: () => void;
}

const BikeMap: React.FC<IProps> = ({onRefresh, onLoadMore}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const navigation = useNavigation();

    const mapsData = useAppSelector(mapsListSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const {onLoadMoreHandler} = useInfiniteScrollLoadMore(mapsData?.length);

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const onPressTileHandler = useCallback(
        (mapID?: string) => {
            navigation.navigate({
                name: RegularStackRoute.ROUTE_DETAILS_SCREEN,
                params: {mapID: mapID, private: false},
            });
        },
        [navigation],
    );

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore]);

    const onRefreshHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && mapsData?.length > 1) {
            onRefresh();
        }
    }, [isLoading, isRefreshing, mapsData?.length, onRefresh]);

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === mapsData?.length - 1 ? styles.lastTile : undefined;
            const images = getImagesThumbs(item?.images || []);
            if (index === 0) {
                return (
                    <View style={styles.tileWrapper}>
                        <FirstTile
                            mapData={item}
                            images={images}
                            onPress={onPressHandler}
                            onPressTile={onPressTileHandler}
                            tilePressable
                        />
                    </View>
                );
            }
            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    <NextTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        tilePressable
                    />
                </View>
            );
        },
        [mapsData?.length, onPressTileHandler],
    );

    const renderListLoader = useCallback(() => {
        if (isLoading && mapsData.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }
        return null;
    }, [isLoading, mapsData?.length]);

    return (
        <>
            {mapsData?.length ? (
                <>
                    <ShowMoreModal
                        showModal={showModal}
                        mapID={activeMapID}
                        onPressCancel={() => onPressHandler(false)}
                        backdropStyle={styles.backdrop}
                        isPublished
                        mapType={selectorMapTypeEnum.regular}
                    />
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <FeaturedRoutes key={mapsData?.length} />
                                <Text style={styles.header}>{trans.title}</Text>
                            </>
                        }
                        keyExtractor={item => item.id}
                        data={mapsData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={mapsData?.length || 10}
                        removeClippedSubviews={!isIOS}
                        onEndReached={onEndReachedHandler}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={renderListLoader}
                        refreshing={isLoading && isRefreshing}
                        onRefresh={onRefreshHandler}
                    />
                </>
            ) : null}
        </>
    );
};

export default React.memo(BikeMap);
