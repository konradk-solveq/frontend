import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
    Text,
    KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {I18n} from '../../../../../I18n/I18n';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';

import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import EditForm from './form/editForm';

const isIOS = Platform.OS === 'ios';

const EditDetails = () => {
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
                    />
                    <SliverTopBar>
                        <View style={styles.content}>
                            {/* <Description mapID={route?.params?.mapID || ''} /> */}
                            {/* <BigRedBtn
                                title={trans.reportButton}
                                onpress={() => {}}
                                style={styles.reportButton}
                            /> */}
                            <KeyboardAvoidingView
                                style={styles.keyboard}
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                                enabled>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}>
                                    <View style={styles.container}>
                                        {/* <View style={styles.titleWrapper}>
                                            <Text style={[styles.title]}>
                                                {`${
                                                    'Janek kolanek' ||
                                                    trans.defaultUserName
                                                }${trans.title}`}
                                            </Text>
                                        </View> */}
                                        {/* <Description
                                            mapID={route?.params?.mapID || ''}
                                        /> */}
                                        {/* <AuthForm onSubmit={onSubmitHandler} /> */}
                                        <EditForm onSubmit={() => {}} />
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
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
    reportButton: {
        height: 50,
    },
    container: {
        // paddingHorizontal: 40,
    },

    titleWrapper: {
        marginTop: getVerticalPx(50),
        marginBottom: getVerticalPx(135),
    },

    title: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 30,
        color: '#313131',
    },

    keyboard: {
        flex: 1,
    },
});

export default EditDetails;
