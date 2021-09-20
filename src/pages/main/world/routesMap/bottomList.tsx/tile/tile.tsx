import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {simplyTimer} from '../../../../../../helpers/stringFoo';

import {MarkerDetailsType} from '../../../../../../models/map.model';

import {BigRedBtn} from '../../../../../../sharedComponents/buttons';
import BikeIcon from '../../../../../../sharedComponents/svg/bikeIcon';
import ClockIcon from '../../../../../../sharedComponents/svg/clockIcon';
import {transformMetersToKilometersString} from '../../../../../../utils/metersToKilometers';

import styles from './style';

interface IProps {
    data: MarkerDetailsType;
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
    console.log('dist');
    console.log(
        '[distane to route], ',
        transformMetersToKilometersString(2412226.349611576),
    );
    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.tile]}>
                <Pressable onPress={onPressTileHandler}>
                    <View style={styles.leftTileCell}>
                        <Text style={styles.title} numberOfLines={1}>
                            {data?.name}
                        </Text>
                        <View style={styles.row}>
                            <View style={[styles.textRow, styles.leftCell]}>
                                <BikeIcon containerStyle={styles.icon} />
                                <Text style={styles.distance}>
                                    {transformMetersToKilometersString(
                                        data?.distance,
                                    )}
                                </Text>
                                <Text style={styles.suffix}>km</Text>
                            </View>
                            <View style={styles.textRow}>
                                <ClockIcon containerStyle={styles.icon} />
                                <Text style={styles.time}>
                                    {simplyTimer(
                                        data?.totalTime
                                            ? data.totalTime * 1000
                                            : 0,
                                    )}
                                </Text>
                                <Text style={styles.suffix}>h</Text>
                            </View>
                        </View>
                        <Text style={styles.distanceToRoute}>
                            {transformMetersToKilometersString(
                                data?.distanceToRoute,
                            )}{' '}
                            km od Ciebie
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
