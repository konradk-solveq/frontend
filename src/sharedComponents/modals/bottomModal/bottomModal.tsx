import React from 'react';
import {View, Text, Modal, Pressable} from 'react-native';

import AnimSvg from '../../../helpers/animSvg';

import {BigRedBtn, BigWhiteBtn} from '../../buttons';

import styles from './style';

const backGround = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414 332">
<filter id="filter" x="-1" width="3" y="-1" height="3">
    <feGaussianBlur stdDeviation="38.75575"/>
</filter>
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z"
 filter="url(#filter)" fill="#aaa" />
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z" fill="#fff"/>
</svg>`;

interface IProps {
    showModal?: boolean;
    onPressCancel: () => void;
    leftBtnTitle: string;
    rightBtnTitle: string;
    onPressLeft: () => void;
    onPressRight: () => void;
}

const BottomModal: React.FC<IProps> = ({
    onPressCancel,
    showModal,
    onPressLeft,
    onPressRight,
    leftBtnTitle,
    rightBtnTitle,
}: IProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={onPressCancel}>
            <View style={styles.container}>
                <Pressable onPress={onPressCancel}>
                    <View style={styles.pressableArea} />
                </Pressable>
                <AnimSvg style={styles.backGround} source={backGround} />

                <View style={styles.wrap}>
                    <Text style={styles.text}>
                        Czy chcesz usunąć nagraną trasę?
                    </Text>
                    <View style={styles.btnsWrapper}>
                        <BigWhiteBtn
                            style={[styles.btn, styles.leftBtn]}
                            onpress={onPressLeft}
                            title={leftBtnTitle}
                        />
                        <BigRedBtn
                            onpress={onPressRight}
                            style={styles.btn}
                            title={rightBtnTitle}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default BottomModal;
