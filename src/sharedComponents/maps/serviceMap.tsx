import React from 'react';
import { StyleSheet, ViewStyle, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../helpers/layoutFoo';


interface Props {
    style?: ViewStyle;
    height: number,
    title: string,
    onpress: Function,
    region:{
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    }
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
    });

    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 52.1588812,
                        longitude: 16.85517745,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                />
            </View>
        </View>
    );
};

export default ServiceMapBtn;
