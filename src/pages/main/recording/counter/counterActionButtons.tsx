import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {BigRedBtn, BigWhiteBtn} from '../../../../sharedComponents/buttons';

import ButtonBackground from './buttonBackground';

interface IProps {
    leftBtnTitle: string;
    leftBtnCallback: () => void;
    rightBtnTitle: string;
    rightBtnCallback: () => void;
    withBackground?: boolean;
    message: string;
}

const CounterActionButtons: React.FC<IProps> = ({
    leftBtnTitle,
    leftBtnCallback,
    rightBtnTitle,
    rightBtnCallback,
    withBackground,
    message,
}: IProps) => {
    return (
        <>
            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={leftBtnTitle}
                        onpress={leftBtnCallback}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={rightBtnTitle}
                        onpress={rightBtnCallback}
                    />
                </View>
            </View>
            <ButtonBackground showModal={withBackground} text={message} />
        </>
    );
};

const styles = StyleSheet.create({
    bottons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        position: 'absolute',
        bottom: getVerticalPx(65),
        height: 50,
        zIndex: 10,
    },
    btn: {
        width: getHorizontalPx(157),
    },
});

export default React.memo(CounterActionButtons);
