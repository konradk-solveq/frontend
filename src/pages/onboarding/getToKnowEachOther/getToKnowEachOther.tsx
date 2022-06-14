import React, {useMemo, useCallback} from 'react';
import {Pressable} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {setUserName} from '@storage/actions/index';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {validateData} from '@utils/validation/validation';
import GenericScreen from '@pages/template/GenericScreen';
import {BodyPrimary} from '@components/texts/texts';
import colors from '@theme/colors';
import UserIntroductionContainer from '@containers/Onboarding/UserIntroductionContainer';
import {UserT} from '@containers/Onboarding/type/user';
import {userRules} from '@utils/validation/validationRules';
import {onboardingFinishedSelector} from '@storage/selectors';
import {OnboardingStackRoute} from '@navigation/route';
import {useNavigation} from '@react-navigation/native';
const GetToKnowEachOther: React.FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('GetToKnowEachOther');
    const navigation = useNavigation();
    const onValidate = useCallback(
        (fieldName: string, value?: string) => {
            const rule = userRules?.[fieldName];
            const isValid = validateData(rule, value);
            return {isValid, errorMessage: t(`form.${fieldName}.errorMessage`)};
        },
        [t],
    );

    const onboardingFinished = useAppSelector<boolean>(
        onboardingFinishedSelector,
    );

    const goForward = useCallback(() => {
        if (!onboardingFinished) {
            navigation.navigate(
                OnboardingStackRoute.LOCATION_USAGE_INFO_SCREEN,
            );
        }
    }, [navigation, onboardingFinished]);

    const onSubmit = useCallback(
        (user: UserT) => {
            dispatch(setUserName(user.name));
            goForward();
        },
        [dispatch, goForward],
    );

    const handleSkip = useCallback(() => {
        dispatch(setUserName(''));
        goForward();
    }, [dispatch, goForward]);

    const skipButton = useMemo(
        () => (
            <Pressable onPress={handleSkip}>
                <BodyPrimary color={colors.red}>{t('skip')}</BodyPrimary>
            </Pressable>
        ),
        [handleSkip, t],
    );

    return (
        <GenericScreen
            contentBelowHeader
            navigationRightActionElement={skipButton}>
            <UserIntroductionContainer
                onSubmit={onSubmit}
                onValidate={onValidate}
            />
        </GenericScreen>
    );
};

export default GetToKnowEachOther;
