import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {I18n} from '../../../../../I18n/I18n';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import {
    ShareBtn,
    EditBtn,
    BigRedBtn,
} from '../../../../sharedComponents/buttons';
import Description from './description/description';
import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';

const isIOS = Platform.OS === 'ios';

const RouteDetails = () => {
    const trans: any = I18n.t('RoutesDetails');
    const navigation = useNavigation();
    const route = useRoute();
    /* TODO: add selector for route details (image url) based on passed mapID */
    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;

    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const onBackHandler = () => {
        navigation.goBack();
    };

    return (
        <>
            <StatusBar translucent />
            <SafeAreaView style={[styles.safeAreaView, safeAreaStyle]}>
                <View style={{paddingTop: headerBackgroundHeight, flex: 1}}>
                    <StackHeader
                        onpress={onBackHandler}
                        inner=""
                        style={styles.header}
                        rightActions={
                            <View style={styles.actionButtonsContainer}>
                                <EditBtn
                                    onPress={() => {}}
                                    iconStyle={[
                                        styles.actionButton,
                                        styles.leftActionButton,
                                    ]}
                                />
                                <ShareBtn
                                    onPress={() => {}}
                                    iconStyle={styles.actionButton}
                                />
                            </View>
                        }
                    />
                    <SliverTopBar>
                        <View style={styles.content}>
                            <Description mapID={route?.params?.mapID || ''} />
                            <BigRedBtn
                                title={trans.deleteButton}
                                onpress={() => {}}
                                style={styles.deleteButton}
                            />
                        </View>
                    </SliverTopBar>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    headerBackground: {
        zIndex: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    header: {
        zIndex: 3,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        margin: 0,
    },
    leftActionButton: {
        marginRight: 20,
    },
    content: {
        marginHorizontal: 40,
        marginBottom: getVerticalPx(35),
    },
    deleteButton: {
        height: 50,
    },
});

export default RouteDetails;
