import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {BigRedBtn, BigWhiteBtn} from '../../../../sharedComponents/buttons';

interface IProps {
    leftBtnTitle: string;
    leftBtnCallback: () => void;
    rightBtnTitle: string;
    rightBtnCallback: () => void;
    disabled?: boolean;
}

const ActionButtons: React.FC<IProps> = ({
    leftBtnTitle,
    leftBtnCallback,
    rightBtnTitle,
    rightBtnCallback,
    disabled,
}: IProps) => {
    return (
        <View style={styles.bottons}>
            <View style={styles.btn}>
                <BigWhiteBtn
                    title={leftBtnTitle}
                    onpress={leftBtnCallback}
                    disabled={!!disabled}
                />
            </View>

            <View style={[styles.btn, styles.rightBtn]}>
                <BigRedBtn
                    title={rightBtnTitle}
                    onpress={rightBtnCallback}
                    disabled={!!disabled}
                />
            </View>
        </View>
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
    rightBtn: {
        marginLeft: 20,
    },
});

export default React.memo(ActionButtons);
