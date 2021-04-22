import React from 'react';
import {
    StyleSheet,
    ViewStyle,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {
    getVerticalPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: ViewStyle;
    height: number;
    title: string;
    onpress: Function;
    region: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
}

const ServiceMapBtn: React.FC<Props> = (props: Props) => {
    const styles = StyleSheet.create({
        title: {
            marginTop: getVerticalPx(55),
            marginBottom: getVerticalPx(15),
            position: 'relative',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            color: '#555555',
        },
        container: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
            borderRadius: 30,
            overflow: 'hidden',
            height: props.height,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        click: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
        },
    });

    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={props.region}
                />

                <TouchableOpacity
                    style={styles.click}
                    onPress={props.onpress}
                />
            </View>
        </View>
    );
};

export default ServiceMapBtn;
