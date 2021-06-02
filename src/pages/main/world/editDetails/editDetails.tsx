import React, {useCallback, useEffect, useState} from 'react';
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

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {I18n} from '../../../../../I18n/I18n';
import {ImagesMetadataType} from '../../../../interfaces/api';
import {
    loadingMapsSelector,
    mapDataByIDSelector,
    mapIdToAddSelector,
    privateDataByIDSelector,
    mapsErrorSelector,
} from '../../../../storage/selectors/map';
import {editPrivateMapMetaData} from '../../../../storage/actions/maps';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {getImagesThumbs} from '../../../../utils/transformData';
import {ImageType, MapFormDataResult} from '../../../../interfaces/form';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import SliverTopBar from '../../../../sharedComponents/sliverTopBar/sliverTopBar';
import EditForm from './form/editForm';
import Loader from '../../../onboarding/bikeAdding/loader/loader';

import styles from './style';

const isIOS = Platform.OS === 'ios';

const EditDetails = () => {
    const trans: any = I18n.t('RoutesDetails');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const mapID: string = route?.params?.mapID;
    const privateMap: string = route?.params?.private;
    const redirectToScreen: string = route?.params?.redirectTo;
    const newPrivateMapID = useAppSelector(mapIdToAddSelector);
    const mapData = useAppSelector(
        !privateMap
            ? mapDataByIDSelector(mapID)
            : privateDataByIDSelector(mapID || newPrivateMapID),
    );
    const error = useAppSelector(mapsErrorSelector);
    const isLoading = useAppSelector(loadingMapsSelector);

    const images = getImagesThumbs(mapData?.images || []);
    const [submit, setSubmit] = useState(false);

    const statusBarHeight = useStatusBarHeight();
    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;

    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const onBackHandler = useCallback(() => {
        if (redirectToScreen) {
            navigation.navigate(redirectToScreen);
            return;
        }
        navigation.goBack();
    }, [navigation, redirectToScreen]);

    useEffect(() => {
        if (submit && error?.statusCode < 400 && !isLoading) {
            onBackHandler();
        }
    }, [isLoading, error?.statusCode, submit, onBackHandler]);

    const onSubmitHandler = (
        data: MapFormDataResult,
        publish: boolean,
        imgsToAdd?: ImageType[],
        imgsToRemove?: string[],
    ) => {
        const iToRemove: string[] = [];
        images.images.forEach(i => {
            if (imgsToRemove?.includes(i)) {
                const iTD = mapData?.images?.find(im => i.includes(im.id));
                if (iTD?.id) {
                    iToRemove.push(iTD?.id);
                }
            }
        });
        const imgsToChange: ImagesMetadataType = {
            save: imgsToAdd,
            delete: iToRemove,
        };

        dispatch(
            editPrivateMapMetaData(
                data,
                imgsToChange,
                publish,
                newPrivateMapID,
            ),
        );
        setSubmit(true);
    };

    if (isLoading && submit) {
        return <Loader />;
    }

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
                    <SliverTopBar imgSrc={images?.sliverImg || ''}>
                        <View style={styles.content}>
                            {/* Bug - padding is not remove */}
                            {/* <KeyboardAvoidingView
                                style={styles.keyboard}
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                                enabled> */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.container}>
                                    <EditForm
                                        onSubmit={onSubmitHandler}
                                        mapData={mapData}
                                        imagesData={images}
                                    />
                                </View>
                            </ScrollView>
                            {/* </KeyboardAvoidingView> */}
                        </View>
                    </SliverTopBar>
                </View>
            </SafeAreaView>
        </>
    );
};

export default EditDetails;
