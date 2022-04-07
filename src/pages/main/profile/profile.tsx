import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
} from 'react-native';

import ProfileButton from './profileButton';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import {authErrorSelector} from '@storage/selectors';

import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {RegularStackRoute, BothStackRoute} from '@navigation/route';

import {clearAuthError} from '@storage/actions';
import FailedResponseModal from '@sharedComponents/modals/fail/failedResponseModal';

import {commonStyle as comStyle} from '@helpers/commonStyle';
import ProfileSvg from './profileSvg';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

interface Props {
    navigation: any;
    route: any;
}

const Profile: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('MainProfile');
    const {t: tpa} = useMergedTranslation('Profile.auth');
    const dispatch = useAppDispatch();

    const authError = useAppSelector(authErrorSelector);

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (authError.statusCode >= 400) {
            setShowErrorMessage(true);
        }
    }, [authError.statusCode]);

    const onCloseErrorMessageModal = () => {
        dispatch(clearAuthError());
        setShowErrorMessage(false);
    };

    const styles = StyleSheet.create({
        wrap: {
            marginTop: getFVerticalPx(33),
            marginBottom: getFVerticalPx(64),
        },
        imageContainer: {
            width: '100%',
            alignItems: 'center',
            marginBottom: getFVerticalPx(24),
        },
        menuSection: {
            marginBottom: getFVerticalPx(64),
        },
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <View style={styles.imageContainer}>
                            <ProfileSvg />
                        </View>
                        
                        <View style={styles.menuSection}>
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        RegularStackRoute.NAME_CHANGE_SCREEN,
                                    )
                                }
                                title={t('accountEdit')}
                            />
                            <ProfileButton
                                onpress={() => {
                                    props.navigation.navigate(
                                        RegularStackRoute.LANGUAGE_CHANGE_SCREEN,
                                    );
                                }}
                                title={t('languages')}
                            />
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        RegularStackRoute.ABOUT_APP_SCREEN,
                                    )
                                }
                                title={t('app')}
                            />
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        BothStackRoute.REGULATIONS_SCREEN,
                                    )
                                }
                                title={t('regulations')}
                            />
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        BothStackRoute.PRIVACY_POLICY_SCREEN,
                                    )
                                }
                                title={t('privacyPolicy')}
                            />
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        RegularStackRoute.HELP_SCREEN,
                                    )
                                }
                                title={t('help')}
                            />
                            <ProfileButton
                                onpress={() =>
                                    props.navigation.navigate(
                                        RegularStackRoute.CONTACT_SCREEN,
                                    )
                                }
                                title={t('contact')}
                                hiddenBottomBorder={true}
                            />
                        </View>
                    </View>
                </ScrollView>

                <FailedResponseModal
                    testID="logout-error-message"
                    showModal={showErrorMessage}
                    errorMessage={authError.message}
                    onClose={onCloseErrorMessageModal}
                />
            </View>

            <StackHeader hideBackArrow inner={t('header')} />
        </SafeAreaView>
    );
};

export default Profile;
