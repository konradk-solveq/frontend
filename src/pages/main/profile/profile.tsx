import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import BlueButton from './blueButton';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import {
    authErrorSelector,
    authUserAuthenticatedStateSelector,
} from '@storage/selectors';

import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
} from '@helpers/layoutFoo';
import {RegularStackRoute, BothStackRoute} from '@navigation/route';

import {clearAuthError, logOut} from '@storage/actions';
import {BigRedBtn} from '@src/sharedComponents/buttons';
import FailedResponseModal from '@sharedComponents/modals/fail/failedResponseModal';

import {commonStyle as comStyle} from '@helpers/commonStyle';
import AmatoryBiker from './amatoryBiker';
interface Props {
    navigation: any;
    route: any;
}

const Profile: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('MainProfile');
    const profilePageTrans: any = I18n.t('Profile.auth');
    const dispatch = useAppDispatch();

    const userName =
        useAppSelector<string>(state => state.user.userName) ||
        trans.defaultName;
    const isAuthenticated = useAppSelector(authUserAuthenticatedStateSelector);
    const authError = useAppSelector(authErrorSelector);

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onLogoutPressedHandler = () => {
        dispatch(logOut());
    };

    useEffect(() => {
        if (authError.statusCode >= 400) {
            setShowErrorMessage(true);
        }
    }, [authError.statusCode]);

    const onCloseErrorMessageModal = () => {
        dispatch(clearAuthError());
        setShowErrorMessage(false);
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(145),
            marginTop: getVerticalPx(60),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            color: '#555555',
            textAlign: 'left',
            position: 'relative',
            marginBottom: getVerticalPx(4.5),
        },
        nameWrap: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        name: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(23),
            color: '#313131',
            textAlign: 'left',
            position: 'relative',
            marginTop: getVerticalPx(20),
            marginBottom: getVerticalPx(51),
        },
        logoutButton: {
            marginTop: 50,
            height: 50,
        },
        logoutText: {
            fontSize: getFontSize(19),
            paddingHorizontal: 20,
            letterSpacing: getFontSize(0.54),
        },
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <AmatoryBiker />

                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate(
                                    RegularStackRoute.NAME_CHANGE_SCREEN,
                                )
                            }>
                            <View style={styles.nameWrap}>
                                <Text style={styles.name}>{userName}</Text>
                                <Text style={styles.name}>...</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.title}>{trans.title}</Text>
                        <BlueButton
                            onpress={() =>
                                props.navigation.navigate(
                                    RegularStackRoute.ABOUT_APP_SCREEN,
                                )
                            }
                            title={trans.app}
                        />
                        <BlueButton
                            onpress={() =>
                                props.navigation.navigate(
                                    BothStackRoute.REGULATIONS_SCREEN,
                                )
                            }
                            title={trans.regulations}
                        />
                        <BlueButton
                            onpress={() =>
                                props.navigation.navigate(
                                    BothStackRoute.PRIVACY_POLICY_SCREEN,
                                )
                            }
                            title={trans.privacyPolicy}
                        />
                        <BlueButton
                            onpress={() =>
                                props.navigation.navigate(
                                    RegularStackRoute.HELP_SCREEN,
                                )
                            }
                            title={trans.help}
                        />
                        <BlueButton
                            onpress={() =>
                                props.navigation.navigate(
                                    RegularStackRoute.CONTACT_SCREEN,
                                )
                            }
                            title={trans.contact}
                        />

                        {isAuthenticated && (
                            <BigRedBtn
                                testID="logout-btn"
                                onpress={onLogoutPressedHandler}
                                title={profilePageTrans.logoutBtn}
                                style={styles.logoutButton}
                                textStyle={styles.logoutText}
                            />
                        )}
                    </View>
                </ScrollView>

                <FailedResponseModal
                    testID="logout-error-message"
                    showModal={showErrorMessage}
                    errorMessage={authError.message}
                    onClose={onCloseErrorMessageModal}
                />
            </View>

            <StackHeader hideBackArrow inner={trans.header} />

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Profile;
