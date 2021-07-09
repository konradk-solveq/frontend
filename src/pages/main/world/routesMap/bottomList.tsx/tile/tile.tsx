import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Map} from '../../../../../../models/map.model';

import {BigRedBtn} from '../../../../../../sharedComponents/buttons';
import BikeIcon from '../../../../../../sharedComponents/svg/bikeIcon';
import ClockIcon from '../../../../../../sharedComponents/svg/clockIcon';

import styles from './style';

interface IProps {
    data: Map;
    onPressTile: (mapID: string) => void;
    onPressButton: (mapID: string) => void;
}

const Tile: React.FC<IProps> = ({data, onPressTile, onPressButton}: IProps) => {
    const onPressTileHandler = () => {
        onPressTile(data.id);
    };

    const onPressButtonHandler = () => {
        onPressButton(data.id);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.tile]}>
                <Pressable onPress={onPressTileHandler}>
                    <View style={styles.leftTileCell}>
                        <Text style={styles.title} numberOfLines={1}>
                            {data.name}
                        </Text>
                        <View style={styles.row}>
                            <View style={[styles.textRow, styles.leftCell]}>
                                <BikeIcon containerStyle={styles.icon} />
                                <Text style={styles.distance}>
                                    {data.distanceInKilometers}
                                </Text>
                                <Text style={styles.suffix}>km</Text>
                            </View>
                            <View style={styles.textRow}>
                                <ClockIcon containerStyle={styles.icon} />
                                <Text style={styles.time}>
                                    {data.formattedTimeString}
                                </Text>
                                <Text style={styles.suffix}>h</Text>
                            </View>
                        </View>
                        <Text style={styles.distanceToRoute}>
                            {data.distanceToRouteInKilometers} km od Ciebie
                        </Text>
                    </View>
                </Pressable>
                <BigRedBtn
                    onpress={onPressButtonHandler}
                    title=">"
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

export default React.memo(Tile);
