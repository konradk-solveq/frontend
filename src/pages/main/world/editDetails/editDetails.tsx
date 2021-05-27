import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {useAppSelector} from '../../../../hooks/redux';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {I18n} from '../../../../../I18n/I18n';
import {mapDataByIDSelector} from '../../../../storage/selectors/map';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {getImagesThumbs} from '../../../../utils/transformData';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import EditForm from './form/editForm';

const isIOS = Platform.OS === 'ios';

const EditDetails = () => {
    const trans: any = I18n.t('RoutesDetails');
    const navigation = useNavigation();
    const route = useRoute();
    const mapID: string = route?.params?.mapID;
    const mapData = useAppSelector(mapDataByIDSelector(mapID));
    const images = getImagesThumbs(mapData?.images || []);

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
                    <SliverTopBar imgSrc={images?.images?.[0] || ''}>
                        <View style={styles.content}>
                            <KeyboardAvoidingView
                                style={styles.keyboard}
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                                enabled>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}>
                                    <View style={styles.container}>
                                        {/* <AuthForm onSubmit={onSubmitHandler} /> */}
                                        <EditForm
                                            onSubmit={() => {}}
                                            mapData={mapData}
                                            imagesData={images}
                                        />
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
