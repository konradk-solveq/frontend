import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import {navBarHeight} from '@theme/commonStyle';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';

import styles from './styles';

interface IProps {
    screenTitle: string;
    children?: React.ReactNode;
    navigationRightActionElement?: Element;
    hideBackArrow?: boolean;
    contentBelowHeader?: boolean;
}

const GenericScreen: React.FC<IProps> = ({
    children,
    screenTitle,
    navigationRightActionElement,
    hideBackArrow,
    contentBelowHeader,
}: IProps) => {
    const statusBarHeigh = getAppLayoutConfig.statusBarH();
    /**
     * Other screens which use header have no SaveAreView used
     */
    const headerHeightModifier = useMemo(() => navBarHeight - statusBarHeigh, [
        statusBarHeigh,
    ]);
    const paddingTop = contentBelowHeader && {paddingTop: navBarHeight};
    const title = useMemo(() => screenTitle, [screenTitle]);

    const actionElement = useMemo(() => navigationRightActionElement, [
        navigationRightActionElement,
    ]);

    return (
        <SafeAreaView style={styles.safeAreContainer}>
            <View style={[styles.container, paddingTop]}>
                <StackHeader
                    inner={title}
                    style={{height: headerHeightModifier}}
                    rightActions={actionElement}
                    hideBackArrow={hideBackArrow}
                />
                {children ? children : <Text>Generic Screen</Text>}
            </View>
        </SafeAreaView>
    );
};

export default GenericScreen;
