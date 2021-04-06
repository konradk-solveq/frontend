import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import Svg, { G, Path, Circle } from 'react-native-svg';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    style?: any
    list: any,
    description: any
};

const Reviews: React.FC<Props> = (props: Props) => {

    // props.list

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = ww * (125 / 414);
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            left: 0,
            width: ww
        },
        title: {
            marginBottom: getVerticalPx(15),
            left: getCenterLeftPx(),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(18),
            color: '#555555',
        },
        scroll: {
            width: ww,
        },
        list: {
            left: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        item: {
            width: w,
            marginLeft: getHorizontalPx(15)
        },
        box: {
            width: w,
            height: w,
            borderRadius: getHorizontalPx(16),
            backgroundColor: '#fdf5f5',
        },
        fitstItem: {
            marginLeft: getCenterLeftPx(),
        },
        latItem: {
            marginRight: getCenterLeftPx(),
        },
        day: {
            marginTop: getHorizontalPx(16),
            width: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(57),
            color: '#313131',
            textAlign: 'center',
        },
        light: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(18),
            color: '#555555',
            textAlign: 'center',
        },
        year: {
            marginTop: -ww * (8 / 414),
        },
        type: {
            marginTop: ww * (6 / 414),
        },
        mark: {
            width: getHorizontalPx(20),
            height: getHorizontalPx(20),
            position: 'absolute',
            right: getHorizontalPx(8),
            top: getHorizontalPx(4),
        }
    })

    const getDate = (d: string) => {
        let values = d.replace(/-|\s|:/g, '#').split('#').map(e => Number(e));
        return new Date(...values);
    }

    const hendleDay = (d: string) => {
        let date = getDate(d);
        return '' + date.getDate() + '.' + date.getMonth();
    }

    const hendleYear = (d: string) => {
        let date = getDate(d);
        return '' + date.getFullYear();
    }

    return (
        <View style={[styles.container, props.style]}>

            <Text style={styles.title}>{props.description.name}</Text>

            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.list}>

                    {props.list.map((e, i) => (
                        <View
                            style={[styles.item,
                            i == 0 && styles.fitstItem,
                            i == props.list.length - 1 && styles.latItem
                            ]}
                            key={'item_' + i}
                        >
                            <View
                                style={styles.box}
                                key={'box_' + i}
                            >
                                <Text style={styles.day}>{hendleDay(e.date)}</Text>
                                <Text style={[styles.light, styles.year]}>{hendleYear(e.date)}</Text>

                                {e.state == 1 && <Svg style={styles.mark} viewBox="0 0 20 20">
                                    <Circle cx="10.01" cy="10" r="9.96" fill="#39b54a" paint-order="markers fill stroke" />
                                    <Path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.11" d="M7.18 10.19l2.03 2 4.34-4.42" />
                                </Svg>}

                            </View>
                            <Text style={[styles.light, styles.type]}>{e.type}</Text>

                        </View>
                    ))}

                </View>
            </ScrollView >

        </View >
    )
}

export default Reviews