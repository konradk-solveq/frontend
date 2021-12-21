import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import AnimSvg from '../../../../helpers/animSvg';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
    mainButtonsHeight,
} from '../../../../helpers/layoutFoo';
import backGround from '../../../../sharedComponents/modals/backGround';
import BigRedBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

interface IProps {
    showModal?: boolean;
    startScan: () => void;
    onPressCancel: () => void;
}

const ScanModal: React.FC<IProps> = ({
    onPressCancel,
    startScan,
    showModal,
}: IProps) => {
    const trans: any = I18n.t('TurtorialNFCmodal');

    useEffect(() => {
        if (showModal) {
            startScan();
        }
    }, [startScan, showModal]);

    setObjSize(350, 23);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        backGround: {
            position: 'absolute',
            width: getHorizontalPx(414),
            height: getHorizontalPx(800),
            left: 0,
            bottom: -(
                getHorizontalPx(800) -
                (getVerticalPx(35 + 81 + 35 + 65 + 145 + 90) + 40 + 23 + 50)
            ),
        },
        wrap: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            position: 'absolute',
            bottom: getVerticalPx(65),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#313131',
            textAlign: 'center',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(23),
            color: '#313131',
            textAlign: 'center',
        },
        svg: {
            width: getHorizontalPx(62),
            height: getHorizontalPx(81),
            left: getHorizontalPx((334 - 62) / 2),
            marginTop: getVerticalPx(35),
        },
        cancelBtn: {
            height: mainButtonsHeight(50),
            marginTop: getVerticalPx(35),
        },
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={onPressCancel}>
            <View style={styles.container}>
                <AnimSvg style={styles.backGround} source={backGround} />

                <View style={styles.wrap}>
                    <Text style={styles.title}>{trans.title}</Text>
                    <Text style={styles.text}>{trans.text}</Text>

                    <Svg style={styles.svg} viewBox="0 0 62 81">
                        <Path
                            transform="translate(-176 -656) translate(0 481) translate(176 175)"
                            fill="#555"
                            fill-rule="nonzero"
                            d="M40.989 0c-.656 0-1.187.531-1.187 1.186 0 .655.531 1.186 1.187 1.186H5.123c-1.503 0-2.727 1.224-2.727 2.727v70.782c0 1.503 1.224 2.726 2.727 2.726H46.83c1.504 0 2.727-1.223 2.727-2.726V38.607c-1.051.047-2.091-.025-3.163-.241v35.173c0 1.05-.855 1.905-1.905 1.905H7.465c-1.05 0-1.905-.855-1.905-1.905V28.31c0 .655.53 1.186 1.186 1.186.614 0 1.12-.466 1.18-1.065l.006-.121v44.761H44.02V37.644c-4.729-1.95-8.066-6.608-8.066-12.033 0-5.424 3.337-10.082 8.066-12.032v-5.67h-7.096c-.274 0-.53.159-.65.405l-1.018 2.098c-.73 1.502-2.28 2.473-3.951 2.473H20.647c-1.67 0-3.22-.97-3.95-2.473l-1.02-2.098c-.12-.246-.375-.406-.65-.406H7.933v18.818c0-.655-.53-1.186-1.186-1.186-.614 0-1.12.467-1.18 1.065l-.007.121V7.44c0-1 .776-1.822 1.757-1.899l.149-.005h7.563c1.176 0 2.27.683 2.783 1.742l1.02 2.097c.335.691 1.048 1.138 1.817 1.138h10.657c.768 0 1.481-.447 1.817-1.138l1.02-2.097c.513-1.059 1.606-1.742 2.782-1.742h7.564c1.05 0 1.905.854 1.905 1.904v5.417c1.073-.216 2.113-.289 3.163-.242V5.1c0-1.503-1.223-2.727-2.727-2.727h-5.838c.655 0 1.186-.53 1.186-1.186 0-.614-.467-1.12-1.065-1.18L40.99 0h5.84c2.739 0 4.98 2.172 5.094 4.884l.004.215v7.846c5.751 1.345 10.048 6.511 10.048 12.666S57.68 36.933 51.928 38.278V75.88c0 2.811-2.287 5.099-5.099 5.099H5.123c-2.811 0-5.099-2.288-5.099-5.1V5.1c0-2.812 2.288-5.1 5.1-5.1h35.865zm7.976 14.972c-5.866 0-10.639 4.773-10.639 10.64 0 5.865 4.773 10.638 10.639 10.638s10.639-4.773 10.639-10.639-4.773-10.639-10.639-10.639zm0 12.958c.852 0 1.657.33 2.265.929.466.46.472 1.21.013 1.677-.462.47-1.213.47-1.678.013-.161-.159-.374-.247-.6-.247-.226 0-.438.088-.6.247-.467.46-1.218.454-1.677-.013-.46-.466-.454-1.217.012-1.677.608-.599 1.412-.929 2.265-.929zm0-3.799c1.608 0 3.127.623 4.276 1.755.467.46.472 1.211.012 1.678-.46.467-1.21.472-1.677.012-.702-.691-1.63-1.072-2.611-1.072-.981 0-1.909.38-2.611 1.072-.467.46-1.218.454-1.678-.012-.46-.467-.454-1.218.013-1.678 1.15-1.132 2.668-1.755 4.276-1.755zm0-3.799c2.365 0 4.598.917 6.287 2.581.467.46.473 1.21.013 1.677-.46.467-1.21.473-1.677.013-1.244-1.224-2.885-1.899-4.623-1.899-1.738 0-3.38.675-4.623 1.9-.466.459-1.218.453-1.677-.014-.46-.466-.454-1.217.013-1.677 1.69-1.664 3.922-2.581 6.287-2.581zM26.809 5.54c.655 0 1.186.53 1.186 1.186 0 .655-.53 1.186-1.186 1.186h-1.665c-.656 0-1.187-.53-1.187-1.186 0-.655.531-1.186 1.187-1.186z"
                        />
                    </Svg>

                    <BigRedBtn
                        style={styles.cancelBtn}
                        title={trans.cancelBtn}
                        onpress={onPressCancel}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ScanModal;
