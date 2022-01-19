import React, {useEffect, useState} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import GenericScreen from '@pages/template/GenericScreen';
import {getVerticalPx} from '@helpers/layoutFoo';
import I18n from 'react-native-i18n';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import fbIcon from '@assets/images/oauth/fb.png';
import styles from './style';
import OauthBtn from '@sharedComponents/buttons/oauthBtn';
import {useNavigation} from '@react-navigation/core';
import {LoginNavigationPropT} from '@type/rootStack';
import LoginForm from '@pages/auth/loginScreen/form/LoginForm';
import IconGoogle from '@sharedComponents/icons/IconGoogle';
import {LoginFormDataResult} from '@interfaces/form';
import {logIn} from '@storage/actions';
import {
    authStatusCodeSelector,
    isLodingSelector,
    authErrorMessageSelector,
} from '@storage/selectors/auth';
import WrongResponseModal from '@sharedComponents/modals/fail/failedResponseModal';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

const isIOS = Platform.OS === 'ios';

const LoginScreen: React.FC = () => {
    const trans: any = I18n.t('Login');
    const {t, i18n} = useMergedTranslation('Login');
    console.log(i18n.options);
    const isLoading = useAppSelector(isLodingSelector);
    const errorMessage = useAppSelector(authErrorMessageSelector);
    const statusCode = useAppSelector(authStatusCodeSelector);
    const dispatch = useAppDispatch();
    const [submit, setSubmit] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigation = useNavigation<LoginNavigationPropT>();
    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const name: string = useAppSelector(state => state.user.userName);
    const onSubmitHandler = (data: LoginFormDataResult) => {
        dispatch(logIn(data));
        setSubmit(true);
    };

    useEffect(() => {
        if (submit && !isLoading) {
            if (statusCode >= 400) {
                setShowErrorModal(true);
                setSubmit(false);
                return;
            }
            setSubmit(false);
        }
    }, [isLoading, navigation, statusCode, submit]);

    const handleFacebookPress = () => {};

    const handleGooglePress = () => {};

    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <GenericScreen screenTitle={trans.header}>
            <View
                style={[
                    styles.innerContainer,
                    {paddingTop: headerBackgroundHeight},
                ]}>
                <KeyboardAvoidingView
                    behavior={isIOS ? 'padding' : 'height'}
                    keyboardVerticalOffset={isIOS ? headerBackgroundHeight : 0}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.content}>
                            <Text style={styles.title}>
                                {(name || trans.defaultName) + trans.title}
                            </Text>
                            <LoginForm
                                onSubmit={onSubmitHandler}
                                scrollTop={() => {}}
                                isLoading={isLoading && submit}
                            />
                            <View style={styles.orUse}>
                                <Text style={styles.orUseText}>
                                    {trans.orUse}
                                </Text>
                            </View>
                            <View style={styles.oauthButtons}>
                                <View style={styles.oauthButton}>
                                    {/*TODO: replace png with svg icon*/}
                                    <OauthBtn
                                        testID={'FBBtn'}
                                        icon={
                                            <Image
                                                style={styles.fbIcon}
                                                source={fbIcon}
                                            />
                                        }
                                        title={'FACEBOOK'}
                                        onpress={handleFacebookPress}
                                    />
                                </View>
                                <View style={styles.oauthButton}>
                                    <OauthBtn
                                        testID={'GoogleBtn'}
                                        icon={<IconGoogle />}
                                        title={'GOOGLE'}
                                        onpress={handleGooglePress}
                                    />
                                </View>
                            </View>
                            <View style={styles.register}>
                                <Text style={styles.registerText}>
                                    {trans.noAccountYet}
                                </Text>
                                <TouchableOpacity
                                    onPress={handleRegisterPress}
                                    testID={'RegisterLink'}>
                                    <Text style={styles.registerLink}>
                                        {trans.register}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <WrongResponseModal
                testID={'LoginErrorModal'}
                showModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={() => setShowErrorModal(false)}
            />
        </GenericScreen>
    );
};

export default LoginScreen;
