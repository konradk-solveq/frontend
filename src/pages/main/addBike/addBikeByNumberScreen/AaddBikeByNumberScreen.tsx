import React, {useCallback, useState} from 'react';

import {useAppDispatch} from '@hooks/redux';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {setBikesListByFrameNumber} from '@storage/actions';
import {validateData} from '@utils/validation/validation';
import validationRules from '@utils/validation/validationRules';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import GenericScreen from '@pages/template/GenericScreen';
import {AddBikeByNumberContainer} from '@containers/AddBike';
import {Alert} from 'react-native';

const rules: Record<string, any[] | undefined> = {
    bikeNumber: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
};

const AddBikeByNumberScreen: React.FC = () => {
    const {t} = useMergedTranslation('AddBikeByNumberScreen');
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();

    const [isFetching, setIsFetching] = useState(false);

    const checkIsValid = useCallback(
        (fieldName: string, value?: string) => {
            const rule = rules?.[fieldName];
            const isValid = validateData(rule, value);
            return {isValid, errorMessage: t('form.errorMessage')};
        },
        [t],
    );

    const onSubmit = useCallback(
        (bikeNumber: string) => {
            /* TODO: show bike details as modal */
            const navigateToSummary = async () => {
                setIsFetching(true);
                try {
                    await dispatch(setBikesListByFrameNumber(bikeNumber));
                    navigation.navigate('BikeSummary', {
                        frameNumber: bikeNumber,
                    });
                } catch (error) {
                    /* TODO: to reafactor after error screen will be redesigned */
                    if (error.notFound) {
                        navigation.navigate('BikeData', {
                            frameNumber: bikeNumber,
                        });
                        return;
                    }
                    const errorMessage = error?.errorMessage || 'Error';
                    Alert.alert('Error', errorMessage);
                } finally {
                    setIsFetching(false);
                }
            };
            navigateToSummary();
        },
        [navigation, dispatch],
    );

    const onPressFindHandler = useCallback(() => {
        navigation.navigate('AddingInfo');
    }, [navigation]);

    return (
        <GenericScreen screenTitle={t('headerTitle')} contentBelowHeader>
            <AddBikeByNumberContainer
                onSubmit={onSubmit}
                onValidate={checkIsValid}
                onPressLink={onPressFindHandler}
                isLoading={isFetching}
            />
        </GenericScreen>
    );
};

export default AddBikeByNumberScreen;
