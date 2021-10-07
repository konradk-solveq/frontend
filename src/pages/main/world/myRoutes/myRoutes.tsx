import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {
    loadingMapsSelector,
    privateMapsListSelector,
    privateTotalMapsNumberSelector,
    refreshMapsSelector,
} from '../../../../storage/selectors/map';
import {userNameSelector} from '../../../../storage/selectors';
import {useAppSelector} from '../../../../hooks/redux';
import {Map} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {getImagesThumbs} from '../../../../utils/transformData';
import {RegularStackRoute} from '../../../../navigation/route';
import {translateDateToTodayAndYesterdayString} from '../../../../utils/dateTime';

import FirstTile from '../components/tiles/firstTile';
import NextTile from '../components/tiles/nextTile';
import EmptyList from './emptyList';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import Loader from '../../../../sharedComponents/loader/loader';

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
    sortedByDate?: boolean;
}

const MyRoutes: React.FC<IProps> = ({
    onPress,
    onRefresh,
    onLoadMore,
    sortedByDate,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.MyRoutes');
    const navigation = useNavigation();
    const userName = useAppSelector(userNameSelector);
    const privateMaps = useAppSelector<Map[]>(privateMapsListSelector);
    const totalNumberOfPrivateMaps = useAppSelector(
        privateTotalMapsNumberSelector,
    );
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

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
                params: {mapID: mapID, private: true},
            });
        },
        [navigation],
    );

    const shouldShowDate = useCallback(
        (date: string, index: number) => {
            const m = privateMaps?.[index];
            return date !== m?.createdAtDateString;
        },
        [privateMaps],
    );

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === privateMaps?.length - 1 ? styles.lastTile : undefined;
            const images = getImagesThumbs(item?.images || []);

            if (index === 0) {
                return (
                    <View style={[styles.tileWrapper, lastItemStyle]}>
                        {sortedByDate && (
                            <Text style={styles.separatorHeader}>
                                {translateDateToTodayAndYesterdayString(
                                    item.createdAtDate,
                                )}
                            </Text>
                        )}
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

            const showDate = shouldShowDate(
                item.createdAtDateString,
                index - 1,
            );
            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    {sortedByDate && showDate && (
                        <Text style={styles.separatorHeader}>
                            {translateDateToTodayAndYesterdayString(
                                item.createdAtDate,
                            )}
                        </Text>
                    )}
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
        [privateMaps?.length, onPressTileHandler, shouldShowDate, sortedByDate],
    );

    if (!privateMaps?.length) {
        return <EmptyList onPress={onPress} />;
    }

    const renderListLoader = () => {
        if (isLoading && privateMaps.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }
        return null;
    };

    const basicTitle = `${userName || trans.defaultUserName} ${trans.title}`;
    const secondTitle = `${trans.routesNumberTitle} ${totalNumberOfPrivateMaps}`;

    const rednerModal = () => {
        const itemIsPublic = privateMaps.find(e => {
            if (e.id === activeMapID) {
                return e.isPublic;
            }
        });
        let isPublic = false;
        if (itemIsPublic) {
            isPublic = !!itemIsPublic.isPublic;
        }

        return (
            <ShowMoreModal
                showModal={showModal}
                removeFav
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPrivate
                isPublic={isPublic}
            />
        );
    };

    return (
        <>
            {rednerModal()}
            <View style={styles.horizontalSpace}>
                <FlatList
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <Text style={styles.header}>
                            {totalNumberOfPrivateMaps &&
                            totalNumberOfPrivateMaps > 0
                                ? secondTitle
                                : basicTitle}
                        </Text>
                    }
                    data={privateMaps}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={10}
                    removeClippedSubviews
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderListLoader}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </>
    );
};

export default MyRoutes;
