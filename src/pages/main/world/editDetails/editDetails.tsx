import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {ImagesMetadataType} from '@interfaces/api';
import {
    loadingMapsSelector,
    mapDataByIDSelector,
    mapIdToAddSelector,
    privateDataByIDSelector,
    mapsErrorSelector,
} from '@storage/selectors/map';
import {editPrivateMapMetaData} from '@storage/actions/maps';
import {getImagesThumbs} from '@utils/transformData';
import {ImageType, MapFormDataResult} from '@interfaces/form';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';
import {EditDetailsRouteT} from '@type/rootStack';
import {MapType} from '@models/map.model';
import WrongResponseModal from '@sharedComponents/modals/fail/failedResponseModal';

import styles from './style';
import GenericScreen from '@pages/template/GenericScreen';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import colors from '@theme/colors';
import {BodyPrimary, Header3} from '@components/texts/texts';
import EditForm, {
    RouteEditFormRef,
} from '@containers/World/EditDetailsContainer';
import {mapOptionsAndTagsSelector} from '@storage/selectors/app';
import {Loader} from '@components/loader';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

type AlertTranslationT = {
    text: string;
    approve: string;
    cancel: string;
};

const EditDetails = () => {
    const {t} = useMergedTranslation('RoutesDetails.EditScreen');

    const wasPublishedBeforeRef = useRef(false);

    const options = useAppSelector(mapOptionsAndTagsSelector);

    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const route = useRoute<EditDetailsRouteT>();
    const mapID = route?.params?.mapID;
    const privateMap = route?.params?.private;
    const publish = route?.params?.publish;
    const redirectToScreen = route?.params?.redirectTo;

    const newPrivateMapID = useAppSelector(mapIdToAddSelector);
    const mapData: MapType | undefined = useAppSelector(
        !privateMap
            ? mapDataByIDSelector(mapID)
            : privateDataByIDSelector(mapID || newPrivateMapID),
    );
    const error = useAppSelector(mapsErrorSelector);
    const isLoading = useAppSelector(loadingMapsSelector);

    const images = getImagesThumbs(mapData?.pictures);
    const [submit, setSubmit] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const [showAlert, setShowAlert] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const onBackHandler = useCallback(() => {
        if (redirectToScreen) {
            navigation.navigate(redirectToScreen);
            return;
        }
        navigation.goBack();
    }, [navigation, redirectToScreen]);

    useCustomBackNavButton(onBackHandler, true);

    const onScrollToTopHandler = () => {
        scrollViewRef.current && scrollViewRef.current?.scrollTo({y: 0});
    };

    useEffect(() => {
        if (mapData?.isPublic) {
            wasPublishedBeforeRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (submit && !isLoading) {
            if (error?.statusCode < 400) {
                onBackHandler();
                return;
            }
            setShowErrorModal(true);
            setSubmit(false);
        }
    }, [isLoading, error?.statusCode, submit, onBackHandler]);

    const onSubmitHandler = (
        data: MapFormDataResult,
        publishRoute: boolean,
        imgsToAdd?: ImageType[],
        imgsToRemove?: string[],
    ) => {
        const iToRemove: string[] = [];
        images.images.forEach(i => {
            if (imgsToRemove?.includes(i)) {
                const iTD = mapData?.pictures?.images?.find(
                    im => i.includes(im.id) && im.type !== 'map',
                );
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
                publishRoute,
                mapID || newPrivateMapID,
            ),
        );
        setSubmit(true);
        setShowAlert(false);
    };

    const formRef = useRef<RouteEditFormRef>();

    const alertContent = useMemo(
        () =>
            (publish
                ? t('alertPublish', {returnObjects: true})
                : t('alertEdit', {returnObjects: true})) as AlertTranslationT,
        [publish, t],
    );

    const alertData = useMemo(
        () => ({
            show: showAlert,
            onPress: publish ? () => setShowAlert(false) : onBackHandler,
            onCancel: onBackHandler,
            text: alertContent.text,
            pressText: alertContent.approve,
            cancelText: alertContent.cancel,
        }),
        [alertContent, onBackHandler, publish, showAlert],
    );

    if (isLoading || submit) {
        return (
            <>
                <View style={styles.loaderContainer}>
                    <Loader
                        color={colors.red}
                        androidSize={getFVerticalPx(48)}
                    />
                </View>
                <WrongResponseModal
                    showModal={showErrorModal}
                    errorMessage={error?.message}
                    onClose={() => setShowErrorModal(false)}
                />
            </>
        );
    }

    return (
        <GenericScreen
            showCross
            transculentStatusBar
            contentBelowHeader
            screenTitle={publish ? t('publishHeader') : t('header')}
            backgroundColor={colors.white}
            onArrowPress={() => setShowAlert(true)}
            navigationRightActionElement={
                <Pressable
                    onPress={() =>
                        formRef.current && formRef.current?.submit()
                    }>
                    <BodyPrimary color={colors.red}>
                        {publish ? t('publish') : t('save')}
                    </BodyPrimary>
                </Pressable>
            }>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}>
                    {publish && (
                        <Header3 style={styles.header}>
                            {t('publishDescription')}
                        </Header3>
                    )}
                    <EditForm
                        onSubmit={onSubmitHandler}
                        mapData={mapData}
                        imagesData={images}
                        alertData={alertData}
                        publish={publish}
                        options={options}
                        scrollTop={onScrollToTopHandler}
                        ref={formRef}
                    />
                </ScrollView>
            </View>
            <WrongResponseModal
                showModal={showErrorModal}
                errorMessage={error?.message}
                onClose={() => setShowErrorModal(false)}
            />
        </GenericScreen>
    );
};

export default EditDetails;
