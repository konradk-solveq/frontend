import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getHorizontalPx,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import PanelProps from '@sharedComponents/radio/panel';
import TranspLightBtn from '@sharedComponents/buttons/transpLightBtn';

interface Props {
    board: number;
    list: Array<Function>;
    setBoard: Function;
    goForward: Function;
}

// elementy ekranu, które nie przesówają się w czasie przewijania ekranu na turtorialu first run
const StaticElements: React.FC<Props> = ({
    board,
    list,
    setBoard,
    goForward,
}: Props) => {
    const trans = I18n.t('Onboarding');

    const getButtonTitle = () => {
        switch (board) {
            case 1:
                return trans.btn_1;
            case 2:
                return trans.btn_2;
            case 3:
                return trans.btn_3;
            case 4:
                return trans.btn_4;
            case 5:
                return trans.btn_5;
        }
        return '';
    };

    setObjSize(334, 50);
    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        panel: {
            position: 'absolute',
            top: getHorizontalPx(67 - 8),
        },
        skip: {
            position: 'absolute',
            left: getHorizontalPx(333),
            top: getHorizontalPx(60),
        },
        redBtn: {
            position: 'absolute',
            width: getWidthPx(),
            height: mainButtonsHeight(50),
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <PanelProps
                style={styles.panel}
                active={board - 1}
                listBtn={list}
            />

            <TranspLightBtn
                style={styles.skip}
                title={trans.skip}
                onpress={() => goForward()}
            />

            <View style={styles.redBtn}>
                <BigRedBtn
                    title={getButtonTitle()}
                    onpress={() => {
                        if (board < list.length) {
                            setBoard(board + 1);
                        } else {
                            goForward();
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default StaticElements;
