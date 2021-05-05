import React, {useEffect, useState, useRef} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import AnimSvg from '../../../helpers/animSvg';
import {ScrollView} from 'react-native-gesture-handler';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';
import {getDay, getYear} from '../../../helpers/overviews';

interface Props {
    style?: any;
    list: any;
    details: any;
    description: any;
    onpress?: Function;
    navigation: any;
    box: any;
    region: any;
    location: any;
}

let primeLayout = null;

const ww = Dimensions.get('window').width;

const Reviews: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const w = ww * (125 / 414);

    const [listOn, setListOn] = useState(true);
    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [animSvgStyle, setAnimSvgStyle] = useState({}); // do odpalania animacji svg

    const timeout = useRef();

    useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, []);

    const startTicking = () => {
        setListOn(false);
        timeout.current = setTimeout(() => {
            setListOn(true);
            timeout.current = setTimeout(() => {
                render();
            }, 200);
        }, 100);
    };

    useEffect(() => {
        startTicking();
    }, [props.list]);

    const handleShadowBox = (layout: any) => {
        if (!primeLayout) {
            primeLayout = layout;
        }
    };

    const render = () => {
        if (!primeLayout) {
            startTicking();
            return;
        }

        let b = 10;
        let w = 0;
        let h = primeLayout.height - 1;

        for (let i = 0; i < props.list.length; i++) {
            w += primeLayout.width;
            w += i == props.list.length - 1 ? 0 : getVerticalPx(15);
        }

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
        let y = getVerticalPx(5);
        for (let i = 0; i < props.list.length; i++) {
            let ww = primeLayout.width;
            svg +=
                '<rect fill="' +
                props.list[i].style.color +
                '" stroke="#313131" stroke-width="' +
                (props.list[i].style.dashed ? '1.2' : '0') +
                '" stroke-dasharray="1.5 1.5" stroke-dashoffset="0" stroke="none" width="' +
                ww +
                '" height="' +
                h +
                '" x="' +
                x +
                '" y="' +
                y +
                '" ry="' +
                getHorizontalPx(16) +
                '"/>';

            x += ww + getVerticalPx(15) + 1;
        }

        svg += '</svg>';

        setSource(svg);

        setAnimSvgStyle({
            position: 'absolute',
            left: -b,
            top: -b,
            width: w + b * 2,
            height: h + b * 2 + getVerticalPx(10),
        });
    };

    const styles = StyleSheet.create({
        container: {
            left: 0,
            width: ww,
        },
        title: {
            marginBottom: getVerticalPx(5),
            left: getCenterLeftPx(),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(18),
            color: '#555555',
        },
        scroll: {
            width: ww,
        },
        animSvg: {
            marginLeft: getCenterLeftPx(),
        },
        list: {
            paddingTop: getVerticalPx(10),
            left: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        item: {
            width: w,
            marginLeft: getHorizontalPx(15),
        },
        box: {
            width: w,
            height: w,
            borderRadius: getHorizontalPx(16),
            // backgroundColor: '#fdf5f5',
            // opacity: .5
        },
        fitstItem: {
            marginLeft: getCenterLeftPx(),
        },
        latItem: {
            marginRight: getCenterLeftPx(),
        },
        day: {
            marginTop: getHorizontalPx(18),
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(57),
            color: '#313131',
            textAlign: 'center',
        },
        year: {
            marginTop: -getHorizontalPx(8),
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(18),
            color: '#555555',
            textAlign: 'center',
        },
        type: {
            marginTop: getHorizontalPx(6),
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(18),
            color: '#555555',
            textAlign: 'center',
        },
        mark: {
            width: getHorizontalPx(20),
            height: getHorizontalPx(20),
            position: 'absolute',
            right: getHorizontalPx(8),
            top: getHorizontalPx(4),
        },
    });

    const heandleShowDeatails = e => {
        props.navigation.navigate('RewiewsDetails', {
            details: e,
            box: props.box,
            region: props.region,
            location: props.location,
        });
    };

    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.title}>{props.description.name}</Text>

            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <AnimSvg
                    key={source.length}
                    source={source}
                    style={[styles.animSvg, animSvgStyle]}
                />

                {listOn && (
                    <View style={styles.list}>
                        {props.list.map((e, i) => (
                            <View
                                style={[
                                    styles.item,
                                    i == 0 && styles.fitstItem,
                                    i == props.list.length - 1 &&
                                        styles.latItem,
                                ]}
                                key={'item_' + i}>
                                <TouchableWithoutFeedback
                                    onPress={() => heandleShowDeatails(e)}>
                                    <View
                                        style={styles.box}
                                        onLayout={({nativeEvent}) =>
                                            handleShadowBox(nativeEvent.layout)
                                        }>
                                        <Text style={styles.day}>
                                            {getDay(e.date)}
                                        </Text>
                                        <Text style={styles.year}>
                                            {getYear(e.date)}
                                        </Text>

                                        {e.style.checkmark && (
                                            <Svg
                                                style={styles.mark}
                                                viewBox="0 0 20 20">
                                                <Circle
                                                    cx="10.01"
                                                    cy="10"
                                                    r="9.96"
                                                    fill="#39b54a"
                                                    paint-order="markers fill stroke"
                                                />
                                                <Path
                                                    fill="none"
                                                    stroke="#fff"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2.11"
                                                    d="M7.18 10.19l2.03 2 4.34-4.42"
                                                />
                                            </Svg>
                                        )}
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={styles.type}>{e.info}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Reviews;
