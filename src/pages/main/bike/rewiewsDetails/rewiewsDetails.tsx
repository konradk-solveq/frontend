import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getVerticalPx,
    getHeightPx,
    getHorizontalPx,
    getWidthPx,
    getCenterLeftPx,
} from '../../../../helpers/layoutFoo';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import AnimSvg from '../../../../helpers/animSvg';
import {countDaysToEnd} from '../../../../helpers/warranty';
import ServiceMapBtn from '../../../../sharedComponents/buttons/serviceMap';

interface Props {
    navigation: any;
    route: any;
}

const RewiewsDetails: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('RewiewsDetails');
    const details = props.route.params.details;
    const box = props.route.params.box;
    const region = props.route.params.region;
    const location = props.route.params.location;
    // console.log('%c details:', 'background: #ffcc00; color: #003300', details)

    const placeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <path
    fill="#d8232a" stroke="none"
       d="M 17.500434,0 A 17.500033,17.500033 0 0 0 0,17.499565 17.500033,17.500033 0 0 0 17.500434,35 17.500033,17.500033 0 0 0 34.999998,17.499565 17.500033,17.500033 0 0 0 17.500434,0 Z m 0,7.284816 a 7.5885871,7.5885871 0 0 1 7.588423,7.589293 7.5885871,7.5885871 0 0 1 -1.508464,4.524519 l 0.01216,-8.91e-4 -0.08787,0.101782 a 7.5885871,7.5885871 0 0 1 -0.626352,0.720305 l -4.171325,4.797678 v 8.91e-4 l -1.206599,1.387543 -1.205726,-1.387543 -4.161757,-4.78637 a 7.5885871,7.5885871 0 0 1 -0.666369,-0.76641 l -0.05916,-0.06785 0.01131,8.91e-4 A 7.5885871,7.5885871 0 0 1 9.912004,14.874113 7.5885871,7.5885871 0 0 1 17.500426,7.28482 Z m 0,4.704596 a 3.2906114,3.2906114 0 0 0 -3.290954,3.290955 3.2906114,3.2906114 0 0 0 3.290954,3.290085 3.2906114,3.2906114 0 0 0 3.290086,-3.290085 3.2906114,3.2906114 0 0 0 -3.290086,-3.290955 z"
        />
  </svg>`;

    const [headHeight, setHeadHeightt] = useState(0);

    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [animSvgStyle, setAnimSvgStyle] = useState({}); // do odpalania animacji svg

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%', // wh - headHeight,
            top: headHeight,
        },
        area: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
        },
        titleBox: {
            marginTop: getVerticalPx(40),
            paddingTop: getVerticalPx(20),
            paddingRight: getHorizontalPx(10),
            paddingBottom: getVerticalPx(20),
            paddingLeft: getHorizontalPx(10),
            // backgroundColor: '#eee',
            borderRadius: getHorizontalPx(20),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        details: {
            marginTop: getVerticalPx(5),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            color: '#555555',
        },
        map: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
        },
        warning: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            padding: 20,
            backgroundColor: '#d8232a',
            borderRadius: 30,
            marginTop: getVerticalPx(33),
        },
        warningText: {
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'center',
            fontSize: 18,
            lineHeight: 24,
            color: '#fff',
        },
    });

    const hendleDay = (d: string) => {
        const getDate = (dd: string) => {
            let values = dd
                .replace('Z', '')
                .replace(/-|\s|T|:/g, '#')
                .split('#')
                .map(e => Number(e));
            return new Date(...values);
        };

        let date = getDate(d);
        return (
            '' +
            date.getDate() +
            '.' +
            date.getMonth() +
            '.' +
            date.getFullYear()
        );
    };

    const heandlerGetWaranty = () => {};

    const heandleServicesMap = () => {
        if (!region || !location || !box) {
            return;
        }

        props.navigation.navigate('ServicesMap', {
            region: region,
            location: location,
            box: box,
        });
    };

    const handleShadowBox = (layout: any) => {
        let b = 10;
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

        let x = 0;
        let y = 0;
        svg +=
            '<rect fill="#fff" stroke="#313131" stroke-width="1.2" stroke-dasharray="1.5 1.5" stroke-dashoffset="0" stroke="none" width="' +
            w +
            '" height="' +
            h +
            '" x="' +
            x +
            '" y="' +
            y +
            '" ry="' +
            getHorizontalPx(16) +
            '"/>';

        svg += '</svg>';

        setSource(svg);

        setAnimSvgStyle({
            position: 'absolute',
            // marginTop: getVerticalPx(10),

            left: -b,
            top: -b + getVerticalPx(40) - 2,
            width: w + b * 2,
            height: h + b * 2 + getVerticalPx(10),
            // backgroundColor: 'grey'
        });
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
                <ScrollView>

                    <View style={styles.area}>
                    <AnimSvg
                        source={source}
                        style={[styles.animSvg, animSvgStyle]}
                    />
                        <View
                            style={styles.titleBox}
                            onLayout={({nativeEvent}) =>
                                handleShadowBox(nativeEvent.layout)
                            }>
                            <Text style={styles.title}>{details.info}</Text>
                            <Text style={styles.details}>
                                {trans.daysLeft[0] +
                                    ' ' +
                                    countDaysToEnd(details.date) +
                                    ' ' +
                                    trans.daysLeft[1]}
                            </Text>
                        </View>
                    </View>

                    <ServiceMapBtn
                        style={styles.map}
                        title={trans.servisMap}
                        height={174}
                        region={region}
                        location={location}
                        onpress={() => heandleServicesMap()}
                    />

                    <View style={styles.warning}>
                        <Text style={styles.warningText}>{trans.warning}</Text>
                    </View>

                    <View style={styles.spaceOnEnd} />
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('TabMenu')}
                inner={trans.header}
                getHeight={setHeadHeightt}
            />
        </SafeAreaView>
    );
};

export default RewiewsDetails;
