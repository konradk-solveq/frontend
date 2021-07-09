import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {Animated, FlatList, View} from 'react-native';

import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {Map} from '../../../../../models/map.model';

import Swipe from '../../../../../sharedComponents/navi/swipe/swipe';
import CurvedShape from '../../../../../sharedComponents/svg/curvedShape';
import BottomListItem from './bottomListItem/bottomListItem';

import styles from './style';

const zeroContainerHeight = getVerticalPx(50);
const minContainerHeight = getVerticalPx(248);
const maxContainerHeight = getVerticalPx(582);

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {
    data: Map[];
    onPress: (mapID: string) => void;
}

const BottomList: React.FC<IProps> = ({data, onPress}: IProps) => {
    const containerHeight = useRef(new Animated.Value(minContainerHeight))
        .current;
    const [isUp, setIsUp] = useState(false);

    useEffect(() => {
        const shoudMinimize = !data?.length;
        const shoudlMaximize =
            data?.length && containerHeight?.__getValue() < minContainerHeight;
        if (shoudMinimize || shoudlMaximize) {
            const previousHeigth = !isUp
                ? minContainerHeight
                : maxContainerHeight;
            Animated.timing(containerHeight, {
                toValue: shoudMinimize ? zeroContainerHeight : previousHeigth,
                duration: 800,
                useNativeDriver: false,
            }).start();
        }
    }, [data?.length, containerHeight, isUp]);

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
        if (!data?.length) {
            return;
        }

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
                    data={data}
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
