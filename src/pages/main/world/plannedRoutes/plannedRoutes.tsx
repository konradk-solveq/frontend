import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {RegularStackRoute} from '@navigation/route';
import {
    userNameSelector,
    favouritesMapsSelector,
    loadingMapsSelector,
    refreshMapsSelector,
    selectorMapTypeEnum,
} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import NextTile from '../components/tiles/nextTile';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import EmptyList from './emptyList';

import styles from './style';

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
    onPress: () => void;
    onRefresh: () => void;
    onLoadMore: () => void;
}

const PlannedRoutes: React.FC<IProps> = ({
    onPress,
    onRefresh,
    onLoadMore,
}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.PlannedRoutes');
    const navigation = useNavigation();
    const userName = useAppSelector(userNameSelector);
    const favouriteMaps = useAppSelector(favouritesMapsSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const {onLoadMoreHandler} = useInfiniteScrollLoadMore(
        favouriteMaps?.length,
    );

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const onPressTileHandler = (mapID?: string) => {
        navigation.navigate({
            name: RegularStackRoute.ROUTE_DETAILS_SCREEN,
            params: {
                mapID: mapID,
                private: false,
                favourite: true,
                shareID: null,
            },
        });
    };

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore]);

    const renderItem = ({item, index}: RenderItem) => {
        const lastItemStyle =
            index === favouriteMaps?.length - 1 ? styles.lastTile : undefined;
        const images = getImagesThumbs(item?.images || []);
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
    };

    if (!favouriteMaps?.length) {
        return <EmptyList onPress={onPress} />;
    }

    const renderListLoader = () => {
        if (isLoading && favouriteMaps.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }
        return null;
    };

    return (
        <>
            <ShowMoreModal
                showModal={showModal}
                removeFav
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPublished /* Planned maps can be picked from [published only (by default) */
                mapType={selectorMapTypeEnum.favourite}
            />
            <View style={styles.horizontalSpace}>
                <FlatList
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <Text style={styles.header}>
                            {userName || t('defaultUserName')}
                            {t('title')}
                        </Text>
                    }
                    data={favouriteMaps}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={10}
                    removeClippedSubviews
                    onEndReached={onEndReachedHandler}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderListLoader}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </>
    );
};

export default PlannedRoutes;
