import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import AnimSvg from '../../../helpers/animSvg';
import { ScrollView } from 'react-native-gesture-handler';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';
import { getDay, getYear } from '../../../helpers/overviews';
import deepCopy from '../../../helpers/deepCopy';

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

let areas = [];

const ww = Dimensions.get('window').width;

const Reviews: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const w = ww * (125 / 414);
    // console.log('%c details:', 'background: #ffcc00; color: #003300', props.details)

    // const [areas, setAreas] = useState([]);
    const [listOn, setListOn] = useState(true);
    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [animSvgStyle, setAnimSvgStyle] = useState({}); // do odpalania animacji svg

    const timeout = useRef();

    const startTicking = () => {
        setListOn(false);
        timeout.current = setTimeout(() => {
            setListOn(true);
        }, 100);
    };

    useEffect(() => {
        // setAreas([]);
        // areas = [];
        startTicking();
    }, [props.list]);

    const handleShadowBox = (layout: any, style: any, num: number) => {
        if (num == 0) {
            areas = [];
        }
        if (areas.some(e => e.num == num)) {
            return;
        }

        layout.num = num;
        layout.color = style.color;
        layout.dashed = style.dashed;

        // let newAreas = deepCopy(areas);
        // newAreas.push(layout);
        // setAreas(newAreas);
        areas[num] = layout;
        console.log('num:', num)

        if (areas.length == props.list.length) {
            let b = 10;
            let w = 0;
            let h = areas[0].height - 1;

            for (let i = 0; i < areas.length; i++) {
                w += areas[i].width;
                w += i == areas.length - 1 ? 0 : getVerticalPx(15);
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
            for (let i = 0; i < areas.length; i++) {
                let ww = areas[i].width;
                svg +=
                    '<rect fill="' +
                    areas[i].color +
                    '" stroke="#313131" stroke-width="' +
                    (areas[i].dashed ? '1.2' : '0') +
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
                // marginTop: getVerticalPx(10),

                left: -b,
                top: -b,
                width: w + b * 2,
                height: h + b * 2 + getVerticalPx(10),
                // backgroundColor: 'grey'
            });
        }
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
                                        onLayout={({ nativeEvent }) =>
                                            handleShadowBox(
                                                nativeEvent.layout,
                                                e.style,
                                                i,
                                            )
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
