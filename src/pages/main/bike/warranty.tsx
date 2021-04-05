import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, TouchableWithoutFeedback, View, Text } from 'react-native';

import AnimSvg from '../../../helpers/animSvg';

import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getCenterTop,
    getLeft,
    getLeftPx,
    getTop,
    getTopPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfect,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight
} from '../../../helpers/layoutFoo';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    navigation: any,
    // route: any,
    style?: any
    type: string,
    toEnd: number,
    warranty: any,
    details: any
};

const Warranty: React.FC<Props> = (props: Props) => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();

    const [source, setSource] = useState('<svg xmlns="http://www.w3.org/2000/svg"/>'); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const handleShadowBox = (layout: any) => {
        let b = 30;
        let w = layout.width - 1;
        let h = layout.height - 1;

        // let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (-b) + ' ' + (-b) + ' ' + (w + (b * 2)) + ' ' + (h + (b * 2)) + '" width="' + (w + b + b) + '" height="' + (h + b + b) + '">';
        // svg += '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' + (b * .4) + '"/></filter>'
        // svg += '<rect filter="url(#filter)" opacity=".09" fill="#000" stroke="none" width="' + w + '" height="' + h + '" x="' + 0 + '" y="' + 0 + '" ry="24"/>';
        // svg += '<rect fill="#fff" stroke="none" width="' + w + '" height="' + h + '" x="' + 0 + '" y="' + 0 + '" ry="' + getLeftPx(32) + '"/>';
        // svg += '</svg>';

        // #best
        let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (-b) + ' ' + (-b) + ' ' + (w + (b * 2)) + ' ' + (h + (b * 2)) + '" width="' + (w + b + b) + '" height="' + (h + b + b) + '">';
        svg += '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' + (b * .4) + '"/></filter>'
        svg += '<rect filter="url(#filter)" opacity=".15" fill="#000" stroke="none" width="' + w + '" height="' + h + '" x="' + (b * .2) + '" y="' + (b * .2) + '" ry="24"/>';
        svg += '<rect filter="url(#filter)" opacity="1" fill="#fff" stroke="none" width="' + w + '" height="' + h + '" x="' + (-b * .35) + '" y="' + (-b * .35) + '" ry="24"/>';
        svg += '<rect fill="#f0f0f0" stroke="none" width="' + w + '" height="' + h + '" x="' + 0 + '" y="' + 0 + '" ry="' + getLeftPx(32) + '"/>';
        svg += '</svg>';

        setSource(svg);
        // console.log('%c svg:', svg)

        setBoxStyle({
            position: 'absolute',
            left: -b,
            top: -b,
            width: w + (b * 2),
            height: h + (b * 2),
            // backgroundColor: 'green'
        })
    }

    const styles = StyleSheet.create({
        container: {
            left: l,
            width: w,
            borderRadius: getLeftPx(32),
            backgroundColor: 'transparent' // '#f0f0f0',
        },

        textLine: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // backgroundColor: 'green'
        },
        leftText: {
            marginTop: getTopPx(22),
            marginBottom: getTopPx(22),
            left: getLeftPx(30.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 15,
            color: '#555555',
        },
        rightText: {
            marginTop: getTopPx(15),
            left: getLeftPx(28.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            color: '#313131',
            textAlign: 'left',
        },
        line: {
            borderBottomColor: '#ebebeb',
            borderBottomWidth: 2
        },
        dots: {
            position: 'absolute',
            right: getLeftPx(17),
            bottom: getTopPx(17),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 20,
            color: '#313131',
        }
    })

    const heandleWarrantyDetails = () => {
        props.navigation.navigate('WarrantyDetails', { details: props.details })
    }

    return (
        <View
            style={[styles.container, props.style]}
            onLayout={e => handleShadowBox(e.nativeEvent.layout)}
        >
            <AnimSvg
                source={source}
                style={boxStyle}
            />

            <TouchableWithoutFeedback
                onPress={() => heandleWarrantyDetails()}
            >
                <View>
                    <View style={[styles.textLine, styles.line]}>
                        <Text style={styles.leftText}>{props.warranty.state}</Text>
                        <Text style={styles.rightText}>{props.type}</Text>
                    </View>

                    <View style={styles.textLine}>
                        <Text style={styles.leftText}>{props.warranty.toEnd}</Text>
                        <Text style={styles.rightText}>{'' + props.toEnd + ' ' + props.warranty.days}</Text>
                        <Text style={styles.dots}>. . .</Text>
                    </View>
                </View>

            </TouchableWithoutFeedback>

        </View>
    )
}

export default Warranty