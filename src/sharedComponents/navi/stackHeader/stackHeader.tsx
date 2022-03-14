import React, {useCallback, useEffect, useMemo} from 'react';
import {Text, View, TextStyle, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getVerticalPx} from '@helpers/layoutFoo';
import {isAndroid} from '@utils/platform';
import TopBackBtn from './topBackBtn';

import styles from './styles';
import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {Header2} from '@src/components/texts/texts';
import {IconButton} from '@src/components/buttons';
import {MykrossIconFont} from '@src/theme/enums/iconFonts';
import TopCrossBtn from './topCrossBtn';

interface Props {
    style?: ViewStyle;
    onpress?: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    rightActions?: Element;
    hideBackArrow?: boolean;
    titleStyle?: TextStyle;
    forceBackArrow?: boolean;
    showCross?: boolean;
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
    forceBackArrow,
    showCross = false,
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

    const BackButton = useCallback(
        () =>
            showCross ? (
                <TopCrossBtn onPress={onPressHandler} />
            ) : (
                <TopBackBtn onpress={onPressHandler} />
            ),
        [showCross, onPressHandler],
    );

    return (
        <View style={[styles.container, {height: navBarHeight}, style]}>
            <View style={styles.wrap}>
                {(forceBackArrow || showBackArrow) && <BackButton />}

                <Header2 style={titleStyle}>{inner}</Header2>

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
