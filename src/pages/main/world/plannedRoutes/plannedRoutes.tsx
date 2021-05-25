import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {favouritesMapsSelector} from '../../../../storage/selectors/map';
import {userNameSelector} from '../../../../storage/selectors';
import {useAppSelector} from '../../../../hooks/redux';
import {MapType} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../helpers/layoutFoo';

import NextTile from '../components/tiles/nextTile';
import EmptyList from './emptyList';

import styles from './style';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: MapType;
    index: number;
}

interface IProps {
    onPress: () => void;
}

const PlannedRoutes: React.FC<IProps> = ({onPress}: IProps) => {
    const trans: any = I18n.t('MainWorld.PlannedRoutes');
    const userName = useAppSelector(userNameSelector);
    const favouriteMaps = useAppSelector(favouritesMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const renderItem = ({item, index}: RenderItem) => {
        const lastItemStyle =
            index === favouriteMaps?.length - 1 ? styles.lastTile : undefined;
        return (
            <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                <NextTile mapData={item} onPress={onPressHandler} />
            </View>
        );
    };

    if (!favouriteMaps?.length) {
        return <EmptyList onPress={onPress} />;
    }

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
            />
            <View style={styles.horizontalSpace}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={favouriteMaps}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={10}
                    removeClippedSubviews
                />
            </View>
        </>
    );
};

export default PlannedRoutes;
