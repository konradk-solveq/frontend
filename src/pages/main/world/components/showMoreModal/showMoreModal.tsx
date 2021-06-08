import React from 'react';
import {View, Text, Modal, Pressable, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import I18n from 'react-native-i18n';

import AnimSvg from '../../../../../helpers/animSvg';

import styles from './style';
import {useAppDispatch} from '../../../../../hooks/redux';
import {
    addMapToFavourite,
    removeMapFromFavourite,
} from '../../../../../storage/actions/maps';
import {RegularStackRoute} from '../../../../../navigation/route';

const backGround = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414 332">
<filter id="filter" x="-1" width="3" y="-1" height="3">
    <feGaussianBlur stdDeviation="38.75575"/>
</filter>
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z"
 filter="url(#filter)" fill="#aaa" />
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z" fill="#fff"/>
</svg>`;

interface IProps {
    showModal?: boolean;
    mapID: string;
    onPressCancel: () => void;
    removeFav?: boolean;
    isPrivate?: boolean;
    backdropStyle?: ViewStyle;
}

const ShowMoreModal: React.FC<IProps> = ({
    onPressCancel,
    mapID,
    showModal,
    removeFav,
    isPrivate,
    backdropStyle,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const onDetailsButtonPressedHandler = () => {
        onPressCancel();
        navigation.navigate({
            name: 'RouteDetailsScreen',
            params: {mapID: mapID, private: isPrivate},
        });
    };

    const onAddToFavRoutesHandler = () => {
        onPressCancel();
        if (removeFav) {
            dispatch(removeMapFromFavourite(mapID));
            return;
        }
        dispatch(addMapToFavourite(mapID));
    };

    const onStartRouteHandler = () => {
        onPressCancel();
        navigation.navigate({
            name: RegularStackRoute.COUNTER_ROUTE_SCREEN,
            params: {mapID: mapID, private: isPrivate},
        });
    };

    const onPublishRouteHandler = () => {
        onPressCancel();
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {mapID: mapID, private: isPrivate},
        });
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={onPressCancel}>
                <View style={styles.container}>
                    <Pressable onPress={onPressCancel}>
                        <View style={styles.pressableArea} />
                    </Pressable>
                    <AnimSvg style={styles.backGround} source={backGround} />

                    <View style={styles.wrap}>
                        {isPrivate && (
                            <Pressable onPress={onPublishRouteHandler}>
                                <Text style={styles.text}>
                                    {trans.publishTripAction}
                                </Text>
                            </Pressable>
                        )}
                        {removeFav && !isPrivate && (
                            <Pressable onPress={onStartRouteHandler}>
                                <Text style={styles.text}>
                                    {trans.startTripAction}
                                </Text>
                            </Pressable>
                        )}
                        {!isPrivate && (
                            <Pressable onPress={onAddToFavRoutesHandler}>
                                <Text style={styles.text}>
                                    {!removeFav
                                        ? trans.addToFavAction
                                        : trans.removeToFavAction}
                                </Text>
                            </Pressable>
                        )}
                        <Text style={styles.text}>{trans.showOnMapAction}</Text>
                        <Pressable onPress={onDetailsButtonPressedHandler}>
                            <Text style={styles.text}>
                                {trans.routeDetailsAction}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {showModal && <View style={[styles.backdrop, backdropStyle]} />}
        </>
    );
};

export default ShowMoreModal;
