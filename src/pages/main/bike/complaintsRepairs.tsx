import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AnimSvg from '../../../helpers/animSvg';

import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';

interface Props {
    style?: any
    list: any,
    description: any
};

const ComplaintsRepairs: React.FC<Props> = (props: Props) => {

    let comp = props.list[0];

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
                h += (i == areas.length - 1 ? 0 : getVerticalPx(15));
            }
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (-b) + ' ' + (-b) + ' ' + (w + (b * 2)) + ' ' + (h + (b * 2)) + '" width="' + (w + b + b) + '" height="' + (h + b + b) + '">';

            // for (let i = 0; i < areas.length; i++) {
            svg += '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' + (b * .4) + '"/></filter>'
            // }

            let y = 0;
            for (let i = 0; i < areas.length; i++) {
                let hh = areas[i].height - 1;
                svg += '<rect filter="url(#filter)" opacity=".3" fill="#888" stroke="none" width="' + w + '" height="' + hh + '" x="' + 0 + '" y="' + y + '" ry="' + getHorizontalPx(26) + '"/>';

                y += hh + 1 + getVerticalPx(15);
            }

            y = 0;
            for (let i = 0; i < areas.length; i++) {
                let hh = areas[i].height - 1;
                svg += '<rect fill="#fff" stroke="none" width="' + w + '" height="' + hh + '" x="' + 0 + '" y="' + y + '" ry="' + getHorizontalPx(26) + '"/>';
                y += hh + 1 + getVerticalPx(15);
            }

            svg += '</svg>';

            setSource(svg);
            // console.log('%c svg:', svg)

            setBoxStyle({
                position: 'absolute',
                left: -b,
                top: -b + getVerticalPx(15),
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
            fontSize: getHorizontalPx(18),
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
            marginTop: getVerticalPx(15),
            borderRadius: getHorizontalPx(26),
            // height: '100%',
            // backgroundColor: '#f0f0f0',
        },
        name: {
            marginTop: getVerticalPx(20),
            left: getHorizontalPx(20),
            // width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'left',
        },
        line: {
            width: getHorizontalPx(294),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'khaki',
        },
        dayOf: {
            left: getHorizontalPx(20),
            position: 'relative',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        state: {
            left: getHorizontalPx(259),
            position: 'absolute',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        description: {
            marginTop: getVerticalPx(8),
            left: getHorizontalPx(20),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(18),
            color: '#555555',
            width: getHorizontalPx(294),
            minHeight: getVerticalPx(69)
        },
        number: {
            marginTop: getVerticalPx(7),
            marginBottom: getVerticalPx(20),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
            left: getHorizontalPx(20),
        },
        dots: {
            position: 'absolute',
            right: getHorizontalPx(17),
            bottom: getVerticalPx(20),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(20),
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