import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getHorizontalPx,
    getCenterLeftPx,
    getVerticalPx,
    getHeightPx,
    getWidthPx,
} from '../../helpers/layoutFoo';

import BigRedBtn from '../../sharedComponents/buttons/bigRedBtn';
import PanelProps from '../../sharedComponents/radio/panel';
import TranspLightBtn from '../../sharedComponents/buttons/transpLightBtn';

interface Props {
    board: number;
    list: Array<Function>;
    setBoard: Function;
    goFoward: Function;
}

// elementy ekranu, które nie przesówają się w czasie przewijania ekranu na turtorialu first run
const StaticElements: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Onboarding');

    setObjSize(334, 50);
    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        panel: {
            position: 'absolute',
            top: getHorizontalPx(67) - 8,
        },
        skip: {
            position: 'absolute',
            left: getHorizontalPx(333),
            top: getHorizontalPx(60),
        },
        redBtn: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <PanelProps
                style={styles.panel}
                active={props.board - 1}
                listBtn={props.list}
            />

            <TranspLightBtn
                style={styles.skip}
                title={trans.skip}
                onpress={() => props.goFoward()}
            />

            <View style={styles.redBtn}>
                <BigRedBtn
                    title={trans.goFoward}
                    onpress={() => {
                        if (props.board < props.list.length) {
                            props.setBoard(props.board + 1);
                        } else {
                            props.goFoward();
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default StaticElements;
