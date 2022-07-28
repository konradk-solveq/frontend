import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {ImagesMetadataType} from '@interfaces/api';
import {setHeavyTaskProcessingState} from '@storage/actions/app';
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
import ApprovedMarker from '@components/icons/ApprovedMarker';
import {useToastContext} from '@providers/ToastProvider/ToastProvider';
import ErrorModal from '@src/components/modals/ErrorModal';

type AlertTranslationT = {
    text: string;
    approve: string;
    cancel: string;
};

const EditDetails = () => {
    const {t} = useMergedTranslation('RoutesDetails.EditScreen');
    const {t: toastsT} = useMergedTranslation('Toasts');

    const formSubmitedRef = useRef(false);

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
    const toastContext = useToastContext();

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

    /**
     * To prevent any fetching data when editing a form.
     * We should remove this after we will have a proper way to handle havy task
     * with background thread.
     */
    useEffect(() => {
        dispatch(setHeavyTaskProcessingState(true));

        return () => {
            dispatch(setHeavyTaskProcessingState(false));
        };
    }, [dispatch]);

    const onScrollToTopHandler = useCallback(() => {
        scrollViewRef.current && scrollViewRef.current?.scrollTo({y: 0});
    }, []);

    useEffect(() => {
        if (mapData?.isPublic) {
            wasPublishedBeforeRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (submit && !isLoading) {
            if (error?.statusCode < 400) {
                toastContext.addToast({
                    key: `toast-details-edit${publish ? '-publish' : ''}`,
                    title: publish
                        ? toastsT('routePublished')
                        : toastsT('routeSaved'),
                    icon: <ApprovedMarker />,
                    leaveOnScreenChange: true,
                });
                onBackHandler();
                return;
            }
            setSubmit(false);
            setShowErrorModal(true);
        }
    }, [isLoading, error?.statusCode, submit, onBackHandler]);

    const onSubmitHandler = useCallback(
        (
            data: MapFormDataResult,
            publishRoute: boolean,
            imgsToAdd?: ImageType[],
            imgsToRemove?: string[],
        ) => {
            formSubmitedRef.current = true;
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
        },
        [
            dispatch,
            images.images,
            mapData?.pictures?.images,
            mapID,
            newPrivateMapID,
        ],
    );

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

    if ((isLoading && formSubmitedRef.current) || submit) {
        return (
            <>
                <View style={styles.loaderContainer}>
                    <Loader
                        color={colors.red}
                        androidSize={getFVerticalPx(48)}
                    />
                </View>
                <ErrorModal
                    showModal={showErrorModal}
                    errorTitle={t('errorTitle')}
                    errorMessage={error?.message}
                    handleClose={() => setShowErrorModal(false)}
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
            <ErrorModal
                showModal={showErrorModal}
                errorTitle={t('errorTitle')}
                errorMessage={error?.message}
                handleClose={() => setShowErrorModal(false)}
            />
        </GenericScreen>
    );
};

export default EditDetails;
