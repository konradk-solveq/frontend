import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {
    loadingMapsSelector,
    privateMapsListSelector,
    refreshMapsSelector,
} from '../../../../storage/selectors/map';
import {userNameSelector} from '../../../../storage/selectors';
import {useAppSelector} from '../../../../hooks/redux';
import {Map} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {getImagesThumbs} from '../../../../utils/transformData';

import NextTile from '../components/tiles/nextTile';
import EmptyList from './emptyList';

import styles from './style';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import Loader from '../../../../sharedComponents/loader/loader';
import FirstTile from '../components/tiles/firstTile';

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

const MyRoutes: React.FC<IProps> = ({
    onPress,
    onRefresh,
    onLoadMore,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.MyRoutes');
    const navigation = useNavigation();
    const userName = useAppSelector(userNameSelector);
    const privateMaps = useAppSelector(privateMapsListSelector);
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
                name: 'RouteDetailsScreen',
                params: {mapID: mapID, private: true},
            });
        },
        [navigation],
    );

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === privateMaps?.length - 1 ? styles.lastTile : undefined;
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
        [privateMaps?.length, onPressTileHandler],
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

    return (
        <>
            <View style={styles.horizontalSpace}>
                <Text style={styles.header}>
                    {userName || trans.defaultUserName}
                    {trans.title}
                </Text>
            </View>
            <ShowMoreModal
                showModal={showModal}
                removeFav
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPrivate
            />
            <View style={styles.horizontalSpace}>
                <FlatList
                    keyExtractor={item => item.id}
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
