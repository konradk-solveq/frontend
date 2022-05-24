import React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';

import {PointDetails} from '../../../../../models/places.model';

import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {Header2, Paragraph} from '@src/components/texts/texts';

interface IProps {
    address: PointDetails;
    containerStyle?: ViewStyle;
}

const AddressBox: React.FC<IProps> = ({address, containerStyle}: IProps) => {
    const styles = StyleSheet.create({
        addressWrap: {
            width: '100%',
            padding: appContainerHorizontalMargin,
            paddingBottom: getFVerticalPx(36),
        },
        addressPlace: {
            marginVertical: getFVerticalPx(16),
        },
        bottomDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        addressContact: {
            alignItems: 'flex-end',
        },
    });

    return (
        <View style={containerStyle}>
            <View style={styles.addressWrap}>
                <Header2>{address.name}</Header2>
                <Paragraph style={styles.addressPlace}>
                    {address.city + '\n' + address.street}
                </Paragraph>
                <View style={styles.bottomDetails}>
                    <View>
                        {address?.openHours ? (
                            <Paragraph>{address.openHours}</Paragraph>
                        ) : null}
                    </View>
                    <View style={styles.addressContact}>
                        {address?.phone ? (
                            <Paragraph>{address.phone}</Paragraph>
                        ) : null}

                        {address?.email ? (
                            <Paragraph>{address.email}</Paragraph>
                        ) : null}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default React.memo(AddressBox);
