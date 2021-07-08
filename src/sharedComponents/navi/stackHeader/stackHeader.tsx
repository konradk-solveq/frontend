import React, {useState, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    TextStyle,
} from 'react-native';
import TopBackBtn from './topBackBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHeightPx,
} from '../../../helpers/layoutFoo';
import {getStatusBarHeight} from '../../../utils/detectIOSDevice';

interface Props {
    // * wartości wymagane
    style?: any;
    onpress?: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    rightActions?: Element;
    hideBackArrow?: boolean;
    titleStyle?: TextStyle;
}

const ww = Dimensions.get('window').width;

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
        width: ww,
        height: getHeightPx(),
    };

    setObjSize(226, 23);
    const title = {
        position: 'absolute',
        width: getWidthPx(),
        left: getCenterLeftPx(),
        top: getVerticalPx(3),
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: 18,
        color: '#313131',
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
        actionButtons: {
            marginTop: 3,
            alignItems: 'flex-end',
            marginRight: 40,
        },
    });

    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.wrap}>
                {!props.hideBackArrow && (
                    <TopBackBtn
                        // style={styles.topBtn}
                        onpress={() => props.onpress()}
                    />
                )}

                <Text style={[styles.title, props.titleStyle]}>
                    {props.inner}
                </Text>

                {props.rightActions && (
                    <View style={styles.actionButtons}>
                        {props.rightActions}
                    </View>
                )}
            </View>
        </View>
    );
};

export default StackHeader;
