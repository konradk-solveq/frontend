import React, {useRef, useState} from 'react';
import {Animated, FlatList, View} from 'react-native';

import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../../hooks/redux';
import {Map} from '../../../../../models/map.model';
import {mapsListSelector} from '../../../../../storage/selectors';

import Swipe from '../../../../../sharedComponents/navi/swipe/swipe';
import CurvedShape from '../../../../../sharedComponents/svg/curvedShape';
import BottomListItem from './bottomListItem/bottomListItem';

import styles from './style';

const minContainerHeight = getVerticalPx(248);
const maxContainerHeight = getVerticalPx(582);

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {
    onPress: (mapID: string) => void;
}

const BottomList: React.FC<IProps> = ({onPress}: IProps) => {
    const containerHeight = useRef(new Animated.Value(minContainerHeight))
        .current;
    const [isUp, setIsUp] = useState(false);

    const d = useAppSelector(mapsListSelector);

    const startAnimation = (revert?: boolean) => {
        Animated.timing(containerHeight, {
            toValue: !revert ? maxContainerHeight : minContainerHeight,
            duration: 800,
            useNativeDriver: false,
        }).start(() => {
            setIsUp(revert ? false : true);
        });
    };

    const onSwipeFlatButton = () => {
        console.log('[ON SWIPE]', isUp);
        startAnimation(isUp);
    };

    const renderItem = ({item}: RenderItem) => {
        return (
            <BottomListItem
                data={item}
                onPressTile={onPress}
                onPressButton={onPress}
            />
        );
    };

    return (
        <Animated.View style={[styles.container, {height: containerHeight}]}>
            <Swipe direction={!isUp ? 4 : 8} onSwipeAction={onSwipeFlatButton}>
                <View style={styles.flatButtonContainer}>
                    <View style={styles.flatButton} />
                </View>
            </Swipe>
            <CurvedShape />
            <View style={styles.listContainer}>
                <FlatList
                    data={d}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={isUp}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        </Animated.View>
    );
};

export default BottomList;
