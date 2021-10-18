import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import {setUserName} from '../../../../storage/actions/index';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';

import {
    setObjSize,
    getWidthPx,
    getHorizontalPx,
    getVerticalPx,
    getVertical,
    getCenterLeftPx,
    getPosWithMinHeight,
} from '../../../../helpers/layoutFoo';
import {validateData} from '../../../../utils/validation/validation';
import {userUserValidationRules} from '../../../../models/user.model';

import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import useStatusBarHeight from '@src/hooks/statusBarHeight';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: any;
}

const NameChange: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('NameChange');

    const name: string = useAppSelector(state => state.user.userName);

    const [inputName, setInputName] = useState('');
    const [validationStatus, setValidationStatus] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');
    const statusBarHeight = useStatusBarHeight();
    const iosOffset = isIOS ? -(statusBarHeight || 40) : 0;

    useEffect(() => {
        if (typeof name === 'string') {
            setInputName(name);
        }
    }, [name]);

    const handleSetInputName = (value: string) => {
        setForceMessageWrong('');
        setInputName(value);
    };

    const hendleValidationOk = (value: string) => {
        return validateData(userUserValidationRules.userName, value);
    };

    const hadleOnpressWithName = (inputName: string) => {
        if (inputName.length === 0) {
            dispatch(setUserName(inputName));
            navigation.goBack();
            return;
        }

        if (!validateData(userUserValidationRules.userName, inputName)) {
            setForceMessageWrong('Nazwa ma niepoprawną długość');
            setValidationStatus(false);
        }

        if (!validationStatus) {
            return;
        }
        dispatch(setUserName(inputName));
        navigation.goBack();
    };

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: headHeight,
        },
        outerArea: {
            flex: 1,
        },
        area: {
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            minHeight: getVertical(414),
        },
        title: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#313131',
        },
        logo: {
            position: 'absolute',
            left: getHorizontalPx(152),
            top: getVerticalPx(66),
            width: getHorizontalPx(110),
            height: getHorizontalPx(20),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380 - 100, 90),
        input: {
            height: 50,
            marginTop: getHorizontalPx(6),
        },
        btn: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            bottom: getVerticalPx((isIOS ? 20 : 65) + 100), // 100 - przesunięcie dla scroll o headera
        },
        keyboardContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={isIOS ? 'padding' : 'height'}
                keyboardVerticalOffset={iosOffset}
                style={styles.keyboardContainer}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.outerArea}
                    style={styles.scroll}>
                    <View style={styles.area}>
                        <Text style={styles.title}>
                            {(name || trans.defaultName) + trans.title}
                        </Text>

                        <View
                            style={[styles.inputAndPlaceholder, styles.input]}>
                            <OneLineTekst
                                placeholder={trans.placeholder}
                                onChangeText={handleSetInputName}
                                validationOk={hendleValidationOk}
                                value={inputName}
                                maxLength={20}
                                validationStatus={setValidationStatus}
                                forceMessageWrong={forceMessageWrong}
                            />
                        </View>

                        <BigRedBtn
                            style={styles.btn}
                            title={trans.btn}
                            onpress={() => hadleOnpressWithName(inputName)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <StackHeader
                onpress={() => navigation.goBack()}
                getHeight={setHeadHeight}
                inner={trans.header}
            />
        </SafeAreaView>
    );
};

export default NameChange;
