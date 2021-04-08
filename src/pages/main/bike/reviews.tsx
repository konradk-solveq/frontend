import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import Svg, { G, Path, Circle } from 'react-native-svg';
import AnimSvg from '../../../helpers/animSvg';

import {
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

const ww = Dimensions.get('window').width;

const Reviews: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const w = ww * (125 / 414);
    const l = getCenterLeftPx();

    const [source, setSource] = useState('<svg xmlns="http://www.w3.org/2000/svg"/>'); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const areas: Array<any> = [];
    const handleShadowBox = (layout: any) => {
        areas.push(layout);

        if (areas.length == props.list.length) {
            let b = 10;
            let w = 0;
            let h = areas[0].height - 1;

            for (let i = 0; i < areas.length; i++) {
                w += areas[i].width;
                w += (i == areas.length - 1 ? 0 : getVerticalPx(15));
            }
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (-b) + ' ' + (-b) + ' ' + (w + (b * 2)) + ' ' + (h + (b * 2)) + '" width="' + (w + b + b) + '" height="' + (h + b + b) + '">';


            let x = 0;
            let y = getVerticalPx(5);
            for (let i = 0; i < areas.length; i++) {
                let ww = areas[i].width;
                svg += '<rect fill="#fdf5f5" stroke="#313131" stroke-width="1.2" stroke-dasharray="1.5 1.5" stroke-dashoffset="0" stroke="none" width="' + ww + '" height="' + h + '" x="' + x + '" y="' + y + '" ry="' + getHorizontalPx(16) + '"/>';

                x += ww + getVerticalPx(15) + 1;
            }

            svg += '</svg>';

            setSource(svg);
            // console.log('%c svg:', svg)

            setBoxStyle({
                position: 'absolute',
                // marginTop: getVerticalPx(10),

                marginLeft: getCenterLeftPx(),
                left: -b,
                top: -b,
                width: w + (b * 2),
                height: h + (b * 2) + getVerticalPx(10),
                // backgroundColor: 'grey'
            })
        }
    }



    const styles = StyleSheet.create({
        container: {
            left: 0,
            width: ww
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
        list: {
            paddingTop: getVerticalPx(10),
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
                <AnimSvg
                    source={source}
                    style={boxStyle}
                />

                <View style={styles.list}>

                    {props.list.map((e, i) => (
                        <View
                            style={[
                                styles.item,
                                i == 0 && styles.fitstItem,
                                i == props.list.length - 1 && styles.latItem
                            ]}
                            key={'item_' + i}
                        >
                            <View
                                style={styles.box}
                                key={'box_' + i}
                                onLayout={e => handleShadowBox(e.nativeEvent.layout)}
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