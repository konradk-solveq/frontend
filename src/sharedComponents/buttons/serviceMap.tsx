import React from 'react';
import {
    StyleSheet,
    ViewStyle,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Svg, {Path, Circle} from 'react-native-svg';

import {getVerticalPx} from '../../helpers/layoutFoo';
import mapStyle from '../../sharedComponents/maps/styles';

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
    location: any;
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
        mark: {
            width: 36,
            height: 36,
        },
    });

    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    region={props.region}>
                    {props.location && (
                        <Marker
                        anchor={{x: 0.5, y: 0.5}}
                            coordinate={{
                                latitude: props.location.latitude,
                                longitude: props.location.longitude,
                            }}>
                            <Svg viewBox="0 0 36 36" style={styles.mark}>
                                <Circle cx="18" cy="18" r="18" fill="#313131" />
                                <Path
                                    fill="#FFF"
                                    fill-rule="nonzero"
                                    d="M6.565 1.207C7.453.304 8.676-.124 9.922.03c1.245.156 2.33.874 2.976 1.968l1.12 1.899c.247.42.596.774 1.008 1.026l1.866 1.14c1.076.656 1.781 1.76 1.934 3.027.153 1.267-.268 2.512-1.155 3.414-.767.781-1.786 1.207-2.853 1.207-.167 0-.335-.01-.503-.031-1.246-.156-2.33-.874-2.976-1.968l-1.12-1.899c-.202-.343-.473-.643-.79-.879-.318.236-.588.536-.791.88l-1.12 1.898c-.646 1.094-1.73 1.812-2.976 1.968-.168.02-.336.031-.503.031-1.067 0-2.086-.426-2.853-1.207C.3 11.603-.122 10.358.031 9.091c.153-1.267.858-2.37 1.934-3.028l1.866-1.14c.412-.251.761-.606 1.009-1.025l1.026-1.74c.184-.345.418-.665.7-.951zm-1.102 3.74c-.297.373-.658.693-1.063.94l-1.866 1.14c-.783.478-1.295 1.28-1.406 2.201-.112.921.194 1.826.84 2.483.644.656 1.534.967 2.44.854.905-.113 1.693-.635 2.163-1.43l1.12-1.9c.202-.342.453-.652.743-.921l-1.09-.665c-.982-.6-1.655-1.573-1.881-2.703zm4.324-3.8c-.906-.113-1.795.198-2.44.854-.173.176-.32.369-.443.575l.003.002-.074.125c-.285.538-.402 1.155-.326 1.78.111.922.624 1.724 1.406 2.202l1.866 1.14c.567.346 1.047.834 1.387 1.41l1.12 1.9c.47.795 1.258 1.317 2.164 1.43.905.113 1.795-.198 2.44-.854.645-.657.951-1.562.84-2.483-.112-.921-.624-1.723-1.407-2.201l-1.865-1.14c-.568-.346-1.047-.834-1.388-1.411l-1.12-1.898c-.47-.796-1.258-1.318-2.163-1.43zm3.806 7.21c.67-.683 1.76-.683 2.43 0 .67.68.67 1.79 0 2.472-.335.34-.775.511-1.215.511-.44 0-.88-.17-1.215-.511-.67-.682-.67-1.791 0-2.473zm-10.76 0c.671-.683 1.761-.683 2.431 0 .67.68.67 1.79 0 2.472-.335.34-.775.511-1.215.511-.44 0-.88-.17-1.215-.511-.67-.682-.67-1.791 0-2.473zm11.975.611c-.157 0-.314.061-.434.183-.24.243-.24.64 0 .883s.629.243.868 0c.24-.243.24-.64 0-.883-.12-.122-.277-.183-.434-.183zm-10.325.183c-.24-.243-.629-.243-.868 0-.24.243-.24.64 0 .883s.629.243.868 0c.24-.243.24-.64 0-.883zm3.73-6.268c.67-.682 1.76-.681 2.43 0 .67.682.67 1.791 0 2.473-.334.34-.774.511-1.214.511-.44 0-.88-.17-1.216-.511-.67-.682-.67-1.791 0-2.473zm1.216.612c-.158 0-.315.061-.434.183-.24.243-.24.64 0 .883.239.243.628.244.868 0 .239-.243.239-.64 0-.883-.12-.122-.277-.183-.434-.183z"
                                    transform="translate(8.571 11.144)"
                                />
                            </Svg>
                        </Marker>
                    )}
                </MapView>

                <TouchableOpacity
                    style={styles.click}
                    onPress={props.onpress}
                />
            </View>
        </View>
    );
};

export default ServiceMapBtn;
