import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AnimSvg from '../../../helpers/animSvg';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import {BigRedBtn} from '../../../sharedComponents/buttons';

interface Props {
    style?: any;
}

const AddBike: React.FC<Props> = ({style}: Props) => {
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
            b * 0.4 +
            '"/></filter>';
        svg +=
            '<rect filter="url(#filter)" opacity=".8" fill="#f5e6e7" stroke="none" width="' +
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
            height: getVerticalPx(264),
            borderRadius: getHorizontalPx(32),
            backgroundColor: 'transparent',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        content: {
            marginTop: getVerticalPx(8),
            marginBottom: getVerticalPx(22),
            left: getHorizontalPx(30.5),
            width: '80%',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            letterSpacing: 0.5,
            fontSize: getHorizontalPx(18),
            color: '#555555',
        },
        title: {
            marginTop: getVerticalPx(30),
            left: getHorizontalPx(28.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'left',
        },
        button: {
            height: 35,
            width: 120,
            alignSelf: 'flex-end',
            marginRight: 35,
            marginTop: getVerticalPx(8),
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
            onLayout={({nativeEvent}) => handleShadowBox(nativeEvent.layout)}>
            <AnimSvg source={source} style={boxStyle} />

            <View>
                <View style={[styles.column]}>
                    <Text style={styles.title}>Dodaj kolejny rower</Text>
                    <Text style={styles.content}>
                        Jeżeli chcesz w jednym miejscu zarządzać Twoimi rowerami
                        KROSS oraz rowerami innych producentów, dodaj je do
                        aplikacji.
                    </Text>
                </View>
                <BigRedBtn
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onpress={() => {
                        navigation.navigate({
                            name: 'AddingByNumber',
                            params: {emptyFrame: true},
                        });
                    }}
                    title="Dodaj kolejny"
                />
            </View>
        </View>
    );
};

export default AddBike;
