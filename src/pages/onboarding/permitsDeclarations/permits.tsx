import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import Hyperlink from 'react-native-hyperlink';
import OnePermit from './onePermit';
import {OnboardingStackRoute} from '@navigation/route';
import {Header2, Header3, Paragraph} from '@components/texts/texts';
import GenericScreen from '@pages/template/GenericScreen';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {PrimaryButton} from '@components/buttons';

interface Props {
    navigation: any;
}

const Permits: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('Permits');

    const [checked, setChecked] = useState(false);
    const [wrong, setWrong] = useState(false);

    // po kliknięciu 'DALEJ', walidacja i przejście dalej
    const handlerGoForward = () => {
        if (checked) {
            props.navigation.navigate(
                OnboardingStackRoute.GET_TO_KNOW_EACH_OTHER_SCREEN,
            );
            setWrong(false);
        } else {
            setWrong(true);
        }
    };

    const navigateToDetailsHandler = useCallback(
        (url: string) => {
            if (url === t('urlRegulations')) {
                props.navigation.navigate(
                    OnboardingStackRoute.REGULATIONS_ONBOARDING_SCREEN,
                );
            }
            if (url === t('urlPrivacyPolicy')) {
                props.navigation.navigate(
                    OnboardingStackRoute.PRIVACY_POLICY_ONBOARDING_SCREEN,
                );
            }
        },
        [props.navigation, t],
    );

    return (
        <>
            <GenericScreen screenTitle={t('header')} contentBelowHeader>
                <View>
                    <ScrollView>
                        <View style={styles.wrap}>
                            <Header2 style={styles.header}>
                                {t('title')}
                            </Header2>
                            <OnePermit
                                checked={checked}
                                wrong={
                                    Boolean(
                                        t('permit.required', {
                                            returnObjects: true,
                                        }),
                                    ) && wrong
                                }
                                getCheck={() => setChecked(!checked)}
                                text={t('permit.text')}
                                onPress={navigateToDetailsHandler}
                            />

                            <Header3 style={styles.clauseTitle}>
                                {t('clauseTitle')}
                            </Header3>

                            <Hyperlink
                                linkStyle={{color: '#3587ea'}}
                                linkText={(url: string) => {
                                    if (url === t('urlRegulations')) {
                                        return t('hiperRegulations');
                                    }
                                    if (url === t('urlPrivacyPolicy')) {
                                        return t('hiperPrivacyPolicy');
                                    }
                                    return url;
                                }}
                                onPress={navigateToDetailsHandler}>
                                <Paragraph style={styles.clause}>
                                    {t('clause')}
                                </Paragraph>
                            </Hyperlink>
                        </View>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <PrimaryButton
                            text={t('btn')}
                            onPress={handlerGoForward}
                            disabled={!checked}
                        />
                    </View>
                </View>
            </GenericScreen>
        </>
    );
};

export default Permits;

const styles = StyleSheet.create({
    wrap: {
        paddingHorizontal: getFHorizontalPx(16),
    },
    header: {
        marginBottom: getFVerticalPx(24),
    },
    clauseTitle: {
        marginTop: getFVerticalPx(26),
    },
    clause: {
        marginTop: getFVerticalPx(8),
    },
    btnContainer: {
        alignItems: 'center',
        paddingBottom: getFVerticalPx(24),
        paddingTop: getFVerticalPx(16),
    },
});
