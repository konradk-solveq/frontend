import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import I18n from 'react-native-i18n';

import AnimSvg from '../../../helpers/animSvg';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import SmallRedBtn from '../../../sharedComponents/buttons/smallRedBtn';

interface Props {
    style?: any;
}

const AddBike: React.FC<Props> = ({ style }: Props) => {
    const trans = I18n.t('MainHome');

    const navigation = useNavigation();
    setObjSize(334, 50);
    const width = getWidthPx();

    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    );
    const [boxStyle, setBoxStyle] = useState({});

    const handleShadowBox = (layout: any) => {
        const b = 30;
        const w = layout.width - 1;
        const h = layout.height - 1;

        let svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
            -b +
            ' ' +
            -b +
            ' ' +
            (w + b * 2) +
            ' ' +
            (h + b * 2) +
            '" width="' +
            (w + b + b) +
            '" height="' +
            (h + b + b) +
            '">';
        svg +=
            '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' +
            b * .6 +
            '"/></filter>';
        svg +=
            '<rect filter="url(#filter)" opacity=".3" fill="#aaaaaa" stroke="none" width="' +
            w +
            '" height="' +
            h +
            '" x="' +
            0 +
            '" y="' +
            0 +
            '" ry="24"/>';
        svg +=
            '<rect fill="#fff" stroke="none" width="' +
            w +
            '" height="' +
            h +
            '" x="' +
            0 +
            '" y="' +
            0 +
            '" ry="' +
            getHorizontalPx(32) +
            '"/>';
        svg += '</svg>';

        setSource(svg);

        setBoxStyle({
            position: 'absolute',
            left: -b,
            top: -b,
            width: w + b * 2,
            height: h + b * 2,
        });
    };

    const styles = StyleSheet.create({
        container: {
            width: width,
            // height: getVerticalPx(264),
            borderRadius: getHorizontalPx(32),
            backgroundColor: 'transparent',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        title: {
            marginTop: getVerticalPx(30),
            left: getHorizontalPx(20),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'left',
        },
        content: {
            marginTop: getVerticalPx(8),
            marginBottom: getVerticalPx(20),
            left: getHorizontalPx(20),
            width: getHorizontalPx(280),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            letterSpacing: 0.5,
            fontSize: 18,
            lineHeight: 22,
            color: '#555555',
        },
        button: {
            height: 35,
            alignSelf: 'flex-end',
            marginRight:  getHorizontalPx(34),
            marginBottom: getVerticalPx(30),
        },
        buttonText: {
            fontFamily: 'DIN2014Narrow-Light',
            letterSpacing: 0.5,
            fontSize: 18,
        },
    });

    return (
        <View
            style={[styles.container, style]}
            onLayout={({ nativeEvent }) => handleShadowBox(nativeEvent.layout)}>
            <AnimSvg source={source} style={boxStyle} />

            <View>
                <View style={[styles.column]}>
                    <Text style={styles.title}>Dodaj kolejny rower</Text>
                    <Text style={styles.content}>{trans.text}</Text>
                </View>
                <SmallRedBtn
                    style={styles.button}
                    onpress={() => {
                        navigation.navigate({
                            name: 'AddingByNumber',
                            params: { emptyFrame: true },
                        });
                    }}
                    title={trans.btn}
                />
            </View>
        </View>
    );
};

export default AddBike;
