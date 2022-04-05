import React, {useMemo} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
    Edge,
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import {navBarHeight} from '@theme/commonStyle';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';

import styles from './styles';

interface IProps {
    screenTitle?: string;
    children?: React.ReactNode;
    navigationRightActionElement?: Element;
    hideBackArrow?: boolean;
    contentBelowHeader?: boolean;
    transculentStatusBar?: boolean /* Renders screen under statusb bur */;
    transculentBottom?: boolean /* Renders screen under statusb bur */;
    noHeader?: boolean /* doesn't render the header */;
    showCross?: boolean /* Shows cross instead of back arrow */;
    statusBarBackgroundColor?: string;
}

const GenericScreen: React.FC<IProps> = ({
    children,
    screenTitle = '',
    navigationRightActionElement,
    hideBackArrow,
    contentBelowHeader,
    transculentStatusBar,
    transculentBottom,
    noHeader = false,
    showCross = false,
    statusBarBackgroundColor = 'transparent',
}: IProps) => {
    const statusBarHeigh = getAppLayoutConfig.statusBarH();
    const {top} = useSafeAreaInsets();
    const paddingTopWihtoutStatusBar = useMemo(
        () => (transculentStatusBar ? top : 0),
        [transculentStatusBar, top],
    );
    /**
     * Other screens which use header have no SaveAreView used
     */
    const headerHeightModifier = useMemo(
        () => navBarHeight - statusBarHeigh + paddingTopWihtoutStatusBar,
        [statusBarHeigh, paddingTopWihtoutStatusBar],
    );
    const paddingTop = contentBelowHeader && {
        paddingTop: navBarHeight,
    };
    const title = useMemo(() => screenTitle, [screenTitle]);

    const actionElement = useMemo(() => navigationRightActionElement, [
        navigationRightActionElement,
    ]);

    const edges: Edge[] = useMemo(
        () =>
            transculentBottom ? ['right', 'left'] : ['right', 'bottom', 'left'],
        [transculentBottom],
    );

    return (
        <>
            <SafeAreaView
                style={styles.safeAreContainer}
                {...(transculentStatusBar && {
                    edges: edges,
                })}>
                {transculentStatusBar ? (
                    <StatusBar
                        backgroundColor={statusBarBackgroundColor}
                        barStyle="dark-content"
                        translucent={true}
                    />
                ) : (
                    <StatusBar backgroundColor={statusBarBackgroundColor} />
                )}
                <View style={[styles.container, paddingTop]}>
                    {!noHeader && (
                        <StackHeader
                            inner={title}
                            style={{height: headerHeightModifier}}
                            rightActions={actionElement}
                            hideBackArrow={hideBackArrow}
                            showCross={showCross}
                        />
                    )}
                    {children ? children : <Text>Generic Screen</Text>}
                </View>
            </SafeAreaView>
        </>
    );
};

export default GenericScreen;
