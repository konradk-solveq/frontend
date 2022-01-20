import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {
    setObjSize,
    getVerticalPx,
    getHorizontalPx,
    getWidthPx,
    getCenterLeftPx,
    getFontSize,
} from '@helpers/layoutFoo';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '@helpers/animSvg';
import {getCountedDaysText} from '@helpers/reviews';
import ServiceMapBtn from '@sharedComponents/buttons/serviceMap';
import {RegularStackRoute} from '@navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface Props {
    navigation: any;
    route: any;
}

const ReviewsDetails: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('ReviewsDetails');
    const details = props.route.params.details;
    const box = props.route.params.box;
    const region = props.route.params.region;
    const location = props.route.params.location;

    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [animSvgStyle, setAnimSvgStyle] = useState({}); // do odpalania animacji svg

    setObjSize(334, 50);
    const styles = StyleSheet.create({
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
            borderRadius: getHorizontalPx(20),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#313131',
            textAlign: 'center',
        },
        details: {
            marginTop: getVerticalPx(5),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getFontSize(15),
            color: '#555555',
        },
        map: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
        },
        warning: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            padding: getHorizontalPx(20),
            backgroundColor: '#d8232a',
            borderRadius: getHorizontalPx(30),
            marginTop: getVerticalPx(33),
            marginBottom: getVerticalPx(123),
        },
        warningText: {
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'center',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#fff',
        },
        optionsTextWrapper: {
            marginBottom: getHorizontalPx(15),
            marginTop: getHorizontalPx(30),
            fontSize: getFontSize(18),
            fontFamily: 'DIN2014Narrow-Light',
        },
        optionsText: {
            paddingVertical: getHorizontalPx(0.2),
            letterSpacing: 0.5,
            fontSize: getFontSize(18),
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
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
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
                                    t('daysLeft.0'),
                                    t('daysLeft.1'),
                                    t('pastDate'),
                                )}
                            </Text>
                        </View>

                        {details?.operations && (
                            <View>
                                <Text style={styles.optionsTextWrapper}>
                                    {t('descriptionTitle')}
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
                        title={t('servisMap')}
                        height={174}
                        region={region}
                        location={location}
                        onpress={() => heandleServicesMap()}
                    />

                    <View style={styles.warning}>
                        <Text style={styles.warningText}>{t('warning')}</Text>
                    </View>

                    <View style={styles.spaceOnEnd} />
                </ScrollView>
            </View>

            <StackHeader
                onpress={() =>
                    props.navigation.navigate(RegularStackRoute.TAB_MENU_SCREEN)
                }
                inner={t('header')}
            />
        </SafeAreaView>
    );
};

export default ReviewsDetails;
