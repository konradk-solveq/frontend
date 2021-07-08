import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Map} from '../../../../../../models/map.model';
import BikeIcon from '../../../../../../sharedComponents/svg/bikeIcon';
import ClockIcon from '../../../../../../sharedComponents/svg/clockIcon';

interface IProps {
    data: Map;
}

const BottomListItem: React.FC<IProps> = ({data}: IProps) => {
    return (
        <View style={styles.container}>
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
                    <Text style={styles.time}>{data.formattedTimeString}</Text>
                    <Text style={styles.suffix}>h</Text>
                </View>
            </View>
            <Text style={styles.distanceToRoute}>
                {data.distanceToRouteInKilometers} km od Ciebie
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7,
    },
    row: {
        flexDirection: 'row',
    },
    leftCell: {
        marginRight: 30,
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 7,
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
        lineHeight: 29,
    },
    distance: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
        lineHeight: 29,
    },
    suffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
        marginLeft: 5,
    },
    time: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
    },
    distanceToRoute: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 15,
        color: '#555555',
        lineHeight: 19,
    },
});

export default React.memo(BottomListItem);
