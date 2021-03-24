import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Easing, ScrollView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getWidth,
    getWidthPx,
    getHeight,
    getHeightPx,
    getTop,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
    getStandard,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import OnePermit from './onePermit';

interface PermitsProps {
    navigation: any
};

const PermitsDeclarations: React.FC<PermitsProps> = (props: PermitsProps) => {


    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [headHeight, setheadHeightt] = useState(0);


    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height:wh- headHeight,
            top: headHeight,
            // backgroundColor: 'khaki',
        }
    })

    return (
        <>
            <View style={styles.scroll}>
                <ScrollView>

                    <OnePermit
                        check={false}
                        text='Zaznacz wszystkie'
                    ></OnePermit>

                    <OnePermit
                        check={false}
                        text={I18n.t('Permits-1')}
                    ></OnePermit>

                    <OnePermit
                        check={false}
                        text={I18n.t('Permits-2')}
                    ></OnePermit>

                    <OnePermit
                        check={false}
                        text={I18n.t('Permits-3')}
                    ></OnePermit>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('TurtorialNFC')}
                inner={I18n.t('AddingByNumber-title')}
                getHeight={setheadHeightt}
            ></StackHeader>
        </>
    )
}

export default PermitsDeclarations