import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {I18n} from '../../../../I18n/I18n';

import AnimSvg from '../../../helpers/animSvg';
import {useAppSelector} from '../../../hooks/redux';
import {UserBike} from '../../../models/userBike.model';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    // route: any,
    style?: any;
    type: string;
    toEnd: number | null | undefined;
    warranty: any;
    details: any;
}

const Warranty: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();

    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const handleShadowBox = (layout: any) => {
        let b = 30;
        let w = layout.width - 1;
        let h = layout.height - 1;

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
            '<rect filter="url(#filter)" opacity=".12" fill="#000" stroke="none" width="' +
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
            left: l,
            width: w,
            borderRadius: getHorizontalPx(32),
            backgroundColor: 'transparent',
        },
        textLine: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        leftText: {
            marginTop: getVerticalPx(22),
            marginBottom: getVerticalPx(22),
            left: getHorizontalPx(30.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        rightText: {
            marginTop: getVerticalPx(15),
            left: getHorizontalPx(28.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'left',
        },
        line: {
            borderBottomColor: '#ebebeb',
            borderBottomWidth: 1,
        },
        dots: {
            position: 'absolute',
            right: getHorizontalPx(17),
            bottom: getVerticalPx(17),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(20),
            color: '#313131',
        },
    });

    const heandleWarrantyDetails = () => {
        props.navigation.navigate('WarrantyDetails', {details: props.details});
    };

    const warrantyText =
        props.toEnd === null
            ? I18n.t('MainBike.warranty.lifetime')
            : !props.toEnd
                ? I18n.t('MainBike.warranty.noInfo')
                : `${props.toEnd} ${props.warranty.days}`;
    return (
        <View
            style={[styles.container, props.style]}
            onLayout={({nativeEvent}) => handleShadowBox(nativeEvent.layout)}>
            <AnimSvg source={source} style={boxStyle} />

            {/* TODO: temporary disabled details view */}
            {/* <TouchableWithoutFeedback
                onPress={() => heandleWarrantyDetails()}
            > */}
            <View>
                <View style={[styles.textLine, styles.line]}>
                    <Text style={styles.leftText}>{props.warranty.state}</Text>
                    <Text style={styles.rightText}>{props.type}</Text>
                </View>

                <View style={styles.textLine}>
                    <Text style={styles.leftText}>{props.warranty.toEnd}</Text>
                    <Text style={styles.rightText}>{warrantyText}</Text>
                    {/* <Text style={styles.dots}>. . .</Text> */}
                </View>
            </View>

            {/* </TouchableWithoutFeedback> */}
        </View>
    );
};

export default Warranty;
