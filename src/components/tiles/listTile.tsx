import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextStyle,
    ViewStyle,
    TouchableOpacity as TouchableOpacityRN,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';
import {
    Demi14h48,
    Demi16h24,
    Demi16h36,
    Demi18h28,
    Demi18h36,
} from '@components/texts/texts';
import {getFHorizontalPx} from '@src/helpers/appLayoutDimensions';
import {LikeIcon, MoreIcon, SaveIcon, ShareIcon} from '../icons/reactionIcons';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

interface PropsI {
    onPress?: () => void;
    testID?: string;
}

const ListTile: React.FC<PropsI> = ({onPress, testID}) => {
    const styles = StyleSheet.create({
        wrap: {
            width: getFHorizontalPx(358),
            left: getFHorizontalPx(16),
        },
        area: {
            height: getFHorizontalPx(311),
            marginBottom: getFHorizontalPx(8),
        },
        tile: {
            width: '100%',
            height: '100%',
            borderRadius: getFHorizontalPx(12),
            backgroundColor: '#f0f0f0',
            overflow: 'hidden',
        },
        map: {
            width: '100%',
            height: getFHorizontalPx(163),
            backgroundColor: '#6fda5d',
        },
        description: {
            left: getFHorizontalPx(16),
            top: getFHorizontalPx(8),
            width: getFHorizontalPx(326),
            height: getFHorizontalPx(124),
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        reactions: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
        },
        number: {
            marginLeft: getFHorizontalPx(4),
            marginRight: getFHorizontalPx(16),
            top: getFHorizontalPx(-1),
        },
        edit: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
    });

    return (
        <View style={styles.wrap}>
            <Demi14h48>01.02.2020</Demi14h48>
            <TouchableOpacity onPress={onPress} testID={testID || 'list-tile'}>
                <View style={styles.area}>
                    <View style={styles.tile}>
                        <View style={styles.map}>
                            <View />
                        </View>
                        <View style={styles.description}>
                            <Demi18h28>
                                Wrocław - Trzebcina - Psie pole
                            </Demi18h28>
                            <Demi18h28>34km - 2h 30m</Demi18h28>
                            <View style={styles.row}>
                                <Demi16h36>2km od Ciebie</Demi16h36>
                                <Demi16h36>Łatwa - Asfaltowa</Demi16h36>
                            </View>
                            <View style={styles.reactions}>
                                <LikeIcon check={false} />
                                <Demi16h24 style={styles.number}>20</Demi16h24>
                                <SaveIcon check={false} />
                                <Demi16h24 style={styles.number}>20</Demi16h24>
                                <ShareIcon />
                                <Demi16h24 style={styles.number}>20</Demi16h24>
                            </View>
                            <View style={styles.edit}>
                                <MoreIcon />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ListTile;

// world
// import ListTile from '@components/tiles/listTile';
//                {/* <ListTile /> */}
