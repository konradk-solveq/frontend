import React, {useCallback, useEffect, useMemo, useState} from 'react';

import GenericScreen from '@pages/template/GenericScreen';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {Alert, ScrollView, View} from 'react-native';
import {fetchConsentsData, putConsentsData} from '@storage/actions/consents';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {
    consentsListSelector,
    errorConsentsSelector,
    loadingConsentsSelector,
} from '@storage/selectors/consents';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import styles from '@pages/main/profile/consents/style';
import {FormProvider, useForm} from 'react-hook-form';
import SingleConsent from '@pages/main/profile/consents/components/SingleConsent';
import {ConsentsFormDataResult} from '@interfaces/form';
import WrongResponseModal from '@sharedComponents/modals/fail/failedResponseModal';
import {parseInt} from 'lodash';
import {BigRedBtn} from '@sharedComponents/buttons';
import Loader from '@sharedComponents/loader/loader';
import {getAppLayoutConfig} from '@helpers/appLayoutConfig';
import SelectAllCheckbox from '@pages/main/profile/consents/components/SelectAll';

const Consents = () => {
    const {t} = useMergedTranslation('Consents');

    const consents = useAppSelector(consentsListSelector);
    const isLoading = useAppSelector(loadingConsentsSelector);
    const errorMessage = useAppSelector(errorConsentsSelector);

    const [submit, setSubmit] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);

    const defaults = useMemo(() => {
        return Object.fromEntries(
            consents.map(({id, checked}) => [`${id}`, checked]),
        );
    }, [consents]);

    const methods = useForm({
        defaultValues: defaults,
    });
    const {reset} = methods;

    const headerBackgroundHeight = getAppLayoutConfig.headerH();

    const dispatch = useAppDispatch();

    // parse {"440":true, ..., } into an array of ids
    const onSubmitHandler = (data: ConsentsFormDataResult) => {
        const consentsArray = Object.keys(data)
            .map(parseInt)
            .filter(key => data[key]);
        dispatch(putConsentsData({ids: consentsArray}));
        setSubmit(true);
    };

    // show error modal on error
    useEffect(() => {
        if (submit && !isLoading) {
            if (errorMessage) {
                setShowErrorModal(true);
                setSubmit(false);
                return;
            }
            setSubmit(false);
        }
    }, [errorMessage, isLoading, submit]);

    const getConsentsData = useCallback(async () => {
        try {
            await dispatch(fetchConsentsData());
            reset();
        } catch (error) {
            console.error('[getConsentsData]', error);
            Alert.alert('Error', error?.errorMessage || error);
        }
    }, [dispatch, reset]);

    // fetch consents on the first mount
    useEffect(() => {
        getConsentsData();
    }, [getConsentsData]);

    // reset the form to the last known data in case of an error
    useEffect(() => {
        if (errorMessage) {
            reset(defaults);
        }
    }, [errorMessage, defaults, reset]);

    useEffect(() => {
        reset(defaults);
    }, [defaults, reset]);

    return (
        <GenericScreen screenTitle={t('header')}>
            <View
                style={[
                    styles.innerContainer,
                    {
                        paddingTop: headerBackgroundHeight,
                    },
                ]}>
                {isLoading && !consents.length && !errorMessage ? (
                    <Loader
                        width={getHorizontalPx(100)}
                        height={getVerticalPx(100)}
                    />
                ) : (
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <FormProvider {...methods}>
                            <View style={styles.content}>
                                <SelectAllCheckbox />
                                {consents.map(consent => (
                                    <SingleConsent
                                        consent={consent}
                                        key={consent.id}
                                    />
                                ))}
                                <BigRedBtn
                                    testID={'ConsentsPostBtn'}
                                    title={t('button')}
                                    onpress={methods.handleSubmit(
                                        onSubmitHandler,
                                    )}
                                    style={styles.bottomBtn}
                                    disabled={isLoading && submit}
                                    withLoader={isLoading && submit}
                                />
                            </View>
                        </FormProvider>
                    </ScrollView>
                )}
                <WrongResponseModal
                    testID={'ConsentsErrorModal'}
                    showModal={showErrorModal}
                    errorMessage={errorMessage}
                    onClose={() => setShowErrorModal(false)}
                />
            </View>
        </GenericScreen>
    );
};

export default Consents;
