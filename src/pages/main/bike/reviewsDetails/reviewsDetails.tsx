import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getVerticalPx,
    getHorizontalPx,
    getWidthPx,
    getCenterLeftPx,
} from '../../../../helpers/layoutFoo';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../helpers/animSvg';
import {getCountedDaysText} from '../../../../helpers/reviews';
import ServiceMapBtn from '../../../../sharedComponents/buttons/serviceMap';
import {RegularStackRoute} from '../../../../navigation/route';

interface Props {
    navigation: any;
    route: any;
}

const ReviewsDetails: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('ReviewsDetails');
    const details = props.route.params.details;
    const box = props.route.params.box;
    const region = props.route.params.region;
    const location = props.route.params.location;

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
            marginBottom: getVerticalPx(123),
        },
        warningText: {
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'center',
            fontSize: 18,
            lineHeight: 24,
            color: '#fff',
        },
        optionsTextWrapper: {
            marginBottom: 15,
            marginTop: 30,
            fontSize: 18,
            fontFamily: 'DIN2014Narrow-Light',
        },
        optionsText: {
            paddingVertical: 0.2,
            letterSpacing: 0.5,
            fontSize: 18,
            fontFamily: 'DIN2014Narrow-Light',
        },
    });

    const heandleServicesMap = () => {
        if (!region || !location || !box) {
            return;
        }

        props.navigation.navigate(RegularStackRoute.SERVICES_MAP_SCREEN, {
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
            left: -b,
            top: -b + getVerticalPx(40) - 2,
            width: w + b * 2,
            height: h + b * 2 + getVerticalPx(10),
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
                                {getCountedDaysText(
                                    details.date,
                                    trans.daysLeft[0],
                                    trans.daysLeft[1],
                                    trans.pastDate,
                                )}
                            </Text>
                        </View>

                        {details?.operations && (
                            <View>
                                <Text style={styles.optionsTextWrapper}>
                                    {trans.descriptionTitle}
                                </Text>
                                {details.operations?.map((e: string) => {
                                    return (
                                        <Text
                                            key={JSON.stringify(e)}
                                            style={styles.optionsText}>
                                            {' '}
                                            - {e}
                                        </Text>
                                    );
                                })}
                            </View>
                        )}
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
                onpress={() =>
                    props.navigation.navigate(RegularStackRoute.TAB_MENU_SCREEN)
                }
                inner={trans.header}
                getHeight={setHeadHeightt}
            />
        </SafeAreaView>
    );
};

export default ReviewsDetails;
