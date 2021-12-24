import React, {useCallback, useEffect, useMemo} from 'react';
import {Text, View, TextStyle, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getVerticalPx} from '@helpers/layoutFoo';
import {isAndroid} from '@utils/platform';
import TopBackBtn from './topBackBtn';

import styles from './styles';
import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';

interface Props {
    style?: ViewStyle;
    onpress?: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    rightActions?: Element;
    hideBackArrow?: boolean;
    titleStyle?: TextStyle;
}

// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = ({
    style,
    onpress,
    inner,
    getHeight,
    rightActions,
    hideBackArrow,
    titleStyle,
}: Props) => {
    const navigation = useNavigation();
    const navBarHeight =
        getVerticalPx(100) - (isAndroid ? get.statusBarH() : 0);

    const showBackArrow = useMemo(
        () => navigation.canGoBack() && !hideBackArrow,
        [hideBackArrow, navigation],
    );

    const onGetHeight = useCallback(() => {
        if (getHeight) {
            getHeight(navBarHeight);
        }
    }, [getHeight, navBarHeight]);

    useEffect(() => {
        onGetHeight();
    }, [onGetHeight]);

    const onPressHandler = useCallback(() => {
        if (onpress) {
            onpress();
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [onpress, navigation]);

    return (
        <View style={[styles.container, {height: navBarHeight}, style]}>
            <View style={styles.wrap}>
                {showBackArrow && <TopBackBtn onpress={onPressHandler} />}

                <Text style={[styles.title, titleStyle]}>{inner}</Text>

                {rightActions && (
                    <View style={styles.actionButtonsWraper}>
                        <View style={styles.actionButtons}>{rightActions}</View>
                    </View>
                )}
            </View>
        </View>
    );
};

export default React.memo(StackHeader);
