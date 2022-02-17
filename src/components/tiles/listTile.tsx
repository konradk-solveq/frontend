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
import {Demi18h28, Demi18h36} from '@components/texts/texts';
import {getFHorizontalPx} from '@src/helpers/appLayoutDimensions';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

interface PropsI {
    onPress?: () => void;
    testID?: string;
}

const ListTile: React.FC<PropsI> = ({onPress, testID}) => {
    const styles = StyleSheet.create({
        area: {
            width: getFHorizontalPx(358),
            height: getFHorizontalPx(311),
            left: getFHorizontalPx(16),
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
        btn: {},
    });

    return (
        <View style={styles.area}>
            <TouchableOpacity
                style={styles.btn}
                onPress={onPress}
                testID={testID || 'list-tile'}>
                <>
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
                                <Demi18h36>2km od Ciebie</Demi18h36>
                                <Demi18h36>Łatwa - Asfaltowa</Demi18h36>
                            </View>
                        </View>
                    </View>
                </>
            </TouchableOpacity>
        </View>
    );
};

export default ListTile;

// world
// import ListTile from '@components/tiles/listTile';
//                {/* <ListTile /> */}
