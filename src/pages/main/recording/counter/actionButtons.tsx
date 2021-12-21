import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';

interface IProps {
    leftBtnTitle: string;
    leftBtnCallback: () => void;
    rightBtnTitle: string;
    rightBtnCallback: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const ActionButtons: React.FC<IProps> = ({
    leftBtnTitle,
    leftBtnCallback,
    rightBtnTitle,
    rightBtnCallback,
    disabled,
    loading,
}: IProps) => {
    const styles = StyleSheet.create({
        buttons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            left: getHorizontalPx(40),
            bottom: getVerticalPx(65),
            width: getHorizontalPx(334),
            height: mainButtonsHeight(50),
            zIndex: 10,
        },
        btn: {
            width: getHorizontalPx(157),
        },
        rightBtn: {
            marginLeft: getHorizontalPx(20),
        },
    });
    return (
        <View style={styles.buttons}>
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
                    withLoader={loading}
                />
            </View>
        </View>
    );
};

export default React.memo(ActionButtons);
