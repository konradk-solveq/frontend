
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';

import TypicalRedBtn from '../../../sharedComponents/buttons/typicalRed';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getCenterTop,
    getLeft,
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

interface Props {
    name: string,
    list: Array<string>,
    getReult: Function,
    active: number
};

const RadioLine: React.FC<Props> = (props: Props) => {

    const [active, setActive] = useState(props.active);
    useEffect(() => {
        setActive(props.active)
        console.log('%c props.active:', props.active)
    }, [props.active])

    const hendleOnpress = (value: number) => {
        props.getReult && props.getReult(value);
        setActive(value);
    }

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        conainer: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getTopPx(15),
        },
        reg18: {
            width: '100%',
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 18,
            color: '#313131',
            textAlign: 'left',
            marginBottom: getTopPx(5),
        },
        list: {
            width: '100%',
            display: 'flex',
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            // backgroundColor: 'khaki'
        }
    })

    return (
        <View style={styles.conainer}>

            <Text style={styles.reg18}>
                {props.name}
            </Text>

            <View style={styles.list}>
                {props.list.map((e, i) => (
                    <TypicalRedBtn
                        title={e}
                        onpress={() => hendleOnpress(i)}
                        active={active == i}
                        key={props.name + '_' + i}
                        height={41}
                    ></TypicalRedBtn>
                ))}
            </View>

        </View>
    )
}
export default RadioLine