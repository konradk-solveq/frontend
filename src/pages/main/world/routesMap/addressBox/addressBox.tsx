import React from 'react';
import {View, Text, ViewStyle, StyleSheet, Dimensions} from 'react-native';

import {PointDetails} from '../../../../../models/places.model';
import AnimSvg from '../../../../../helpers/animSvg';
import {getHorizontalPx} from '../../../../../helpers/layoutFoo';

import adressBackground from '../addressBackgroundSvg';
import styles from './styles';

const {width} = Dimensions.get('window');

interface IProps {
    address: PointDetails;
    containerStyle?: ViewStyle;
}

const AddressBox: React.FC<IProps> = ({address, containerStyle}: IProps) => {
    const dynamicStyle = StyleSheet.create({
        addressWrap: {
            left: getHorizontalPx(40),
            width: getHorizontalPx(334),
            position: 'absolute',
            top: width * 0.37,
        },
    });

    const withSeparator = address?.email && address.phone ? '\u00a0|' : '';
    return (
        <View style={[styles.addressContainer, containerStyle]}>
            <AnimSvg style={styles.address} source={adressBackground} />
            <View style={dynamicStyle.addressWrap}>
                <Text style={styles.addressName}>{address.name}</Text>
                <Text style={styles.addressPalce}>
                    {address.city + '\n' + address.street}
                </Text>
                {address?.email || address?.phone ? (
                    <View style={styles.addressContact}>
                        <Text style={styles.addressEmailPhone}>
                            {`${address.email || ''}${withSeparator} ${
                                address.phone || ''
                            }`}
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default React.memo(AddressBox);
