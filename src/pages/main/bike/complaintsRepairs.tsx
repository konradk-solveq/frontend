import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';

import AnimSvg from '../../../helpers/animSvg';

import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getLeftPx,
    getTopPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    style?: any
    list: any,
    description: any
};

const ComplaintsRepairs: React.FC<Props> = (props: Props) => {

    let comp = props.list[0];

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();

    const [source, setSource] = useState('<svg xmlns="http://www.w3.org/2000/svg"/>'); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const areas: Array<any> = [];
    const handleShadowBox = (layout: any) => {
        areas.push(layout);

        if (areas.length == props.list.length) {
            let b = 30;
            let w = areas[0].width - 1;
            let h = 0;

            for (let i = 0; i < areas.length; i++) {
                h += areas[i].height;
                h += (i == areas.length - 1 ? 0 : getTopPx(15));
            }
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (-b) + ' ' + (-b) + ' ' + (w + (b * 2)) + ' ' + (h + (b * 2)) + '" width="' + (w + b + b) + '" height="' + (h + b + b) + '">';

            // for (let i = 0; i < areas.length; i++) {
            svg += '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' + (b * .4) + '"/></filter>'
            // }

            let y = 0;
            for (let i = 0; i < areas.length; i++) {
                let hh = areas[i].height - 1;
                svg += '<rect filter="url(#filter)" opacity=".15" fill="#000" stroke="none" width="' + w + '" height="' + hh + '" x="' + (b * .2) + '" y="' + (y + (b * .2)) + '" ry="' + getLeftPx(26) + '"/>';
                svg += '<rect filter="url(#filter)" opacity="1" fill="#fff" stroke="none" width="' + w + '" height="' + hh + '" x="' + (-b * .35) + '" y="' + (y + (-b * .35)) + '" ry="' + getLeftPx(26) + '"/>';

                y += hh + 1 + getTopPx(15);
            }

            y = 0;
            for (let i = 0; i < areas.length; i++) {
                let hh = areas[i].height - 1;
                svg += '<rect fill="#f0f0f0" stroke="none" width="' + w + '" height="' + hh + '" x="' + 0 + '" y="' + y + '" ry="' + getLeftPx(26) + '"/>';
                y += hh + 1 + getTopPx(15);
            }

            svg += '</svg>';

            setSource(svg);
            // console.log('%c svg:', svg)

            setBoxStyle({
                position: 'absolute',
                left: -b,
                top: -b + getTopPx(15),
                width: w + (b * 2),
                height: h + (b * 2),
                // backgroundColor: 'green'
            })
        }
    }

    const styles = StyleSheet.create({
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getLeftPx(18),
            color: '#555555',
            left: getCenterLeftPx(),
            width: getWidthPx(),
        },
        complaints: {
            left: getCenterLeftPx(),
            width: getWidthPx(),
        },
        container: {
            // alignItems: 'center',
            width: '100%',
            marginTop: getTopPx(15),
            borderRadius: getLeftPx(26),
            // height: '100%',
            // backgroundColor: '#f0f0f0',
        },
        name: {
            marginTop: getTopPx(20),
            left: getLeftPx(20),
            // width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getLeftPx(23),
            color: '#313131',
            textAlign: 'left',
        },
        line: {
            width: getLeftPx(294),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'khaki',
        },
        dayOf: {
            left: getLeftPx(20),
            position: 'relative',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getLeftPx(15),
            color: '#555555',
        },
        state: {
            left: getLeftPx(259),
            position: 'absolute',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getLeftPx(15),
            color: '#555555',
        },
        description: {
            marginTop: getTopPx(8),
            left: getLeftPx(20),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getLeftPx(18),
            color: '#555555',
            width: getLeftPx(294),
            minHeight: getTopPx(69)
        },
        number: {
            marginTop: getTopPx(7),
            marginBottom: getTopPx(20),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getLeftPx(15),
            color: '#555555',
            left: getLeftPx(20),
        },
        dots: {
            position: 'absolute',
            right: getLeftPx(17),
            bottom: getTopPx(20),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getLeftPx(20),
            color: '#313131',
        }
    })

    const getDate = (d: string) => {
        let values = d.replace(/-|\s|:/g, '#').split('#').map(e => Number(e));
        return new Date(...values);
    }

    const hendleDay = (d: string) => {
        let date = getDate(d);
        return '' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

    return (
        <View style={props.style}>

            <Text style={styles.title}>{props.description.name}</Text>

            <View style={styles.complaints}>

                <AnimSvg
                    source={source}
                    style={boxStyle}
                />

                {props.list.map((e, i) => (
                    <View
                        style={styles.container}
                        key={'comp_' + i}
                        onLayout={e => handleShadowBox(e.nativeEvent.layout)}
                    >
                        <Text style={styles.name}>{e.name}</Text>
                        <View>
                            <Text style={styles.dayOf}>{props.description.of + ' ' + hendleDay(e.date)}</Text>
                            <Text style={[styles.state, {
                                color: e.state.type == 1 ? '#2cba3f' : '#d8232a'
                            }]}>
                                {props.description.state[e.state.type]}
                            </Text>
                        </View>
                        <Text style={styles.description}>{e.description}</Text>
                        <Text style={styles.number}>{props.description.number + ' ' + e.id}</Text>


                        <Text style={styles.dots}>. . .</Text>
                    </View>
                ))}

            </View>
        </View>
    )
}

export default ComplaintsRepairs