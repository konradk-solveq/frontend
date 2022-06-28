import React, {useCallback} from 'react';
import GenericScreen from '@pages/template/GenericScreen';
import {
    setOnboardingFinished,
    setDeepLinkActionForScreen,
} from '@storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {onboardingFinishedSelector} from '@storage/selectors';
import LocationUsageInfoContainer from '@containers/Onboarding/LocationUsageInfoContainer';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

const LocationUsageInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const onboardingFinished = useAppSelector(onboardingFinishedSelector);
    const {t} = useMergedTranslation('LocationUsage');
    const goForward = useCallback(() => {
        if (!onboardingFinished) {
            dispatch(setOnboardingFinished(true));
            dispatch(setDeepLinkActionForScreen('HomeTab'));
        }
    }, [dispatch, onboardingFinished]);

    return (
        <GenericScreen screenTitle={t('title')}>
            <LocationUsageInfoContainer
                image={require('./images/routeMap.png')}
                header={t('header')}
                info={t('info')}
                buttonText={t('button')}
                onButtonPress={goForward}
            />
        </GenericScreen>
    );
};

export default LocationUsageInfo;
