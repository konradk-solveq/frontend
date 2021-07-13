import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import TopBackBtn from './topBackBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHeightPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';
import {getStatusBarHeight} from '../../../../../utils/detectIOSDevice';
import HeaderBacgroudShape from './headerBacgroudShape';

interface Props {
    // * wartości wymagane
    style?: any;
    onpress: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    titleOn: boolean; // czy nazwa w headerze ma się pokazać
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    whiteArow: boolean;
    started?: boolean;
}

// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = (props: Props) => {
    const [height, setHeight] = useState(getVerticalPx(100));

    const getHeight = useCallback(async () => {
        if (props.getHeight) {
            const statusBarHeight = await getStatusBarHeight(
                Platform.OS === 'android',
            );
            props.getHeight(height - statusBarHeight);
        }
    }, []);

    useEffect(() => {
        getHeight();
    }, [getHeight]);

    setObjSize(414, 34);
    const wrap = {
        position: 'absolute',
        left: 0,
        top: height * 0.61,
        width: getHorizontalPx(414),
        height: getHeightPx(),
    };

    setObjSize(226, 23);
    const title = {
        position: 'absolute',
        width: getWidthPx(),
        left: getCenterLeftPx(),
        top: getVerticalPx(3 - 28),
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
    };

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: height,
        },
        wrap,
        title,
        background: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: getHorizontalPx(414),
            height: getVerticalPx(116),
        },
        fullView: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
        },
    });

    return (
        <>
            <View style={[styles.container, props.style]}>
                <HeaderBacgroudShape
                    started={props.started}
                    style={styles.background}
                />

                <View style={styles.wrap}>
                    <TopBackBtn
                        onpress={props.onpress}
                        color={props.whiteArow ? '#fff' : '#000'}
                    />

                    {props.titleOn && (
                        <Text style={styles.title}>{props.inner}</Text>
                    )}
                </View>
            </View>
        </>
    );
};

export default StackHeader;
