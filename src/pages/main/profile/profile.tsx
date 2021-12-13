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

import {useAppSelector} from '../../../hooks/redux';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
} from '../../../helpers/layoutFoo';
import {RegularStackRoute, BothStackRoute} from '../../../navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';
import AmatoryBiker from './amatoryBiker';
interface Props {
    navigation: any;
    route: any;
}

const Profile: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('MainProfile');
    // const dispatch = useAppDispatch();

    const name = useAppSelector<string>(state => state.user.userName);
    const getUserName = name ? name : trans.defaultName;
    const [userName, setUserName] = useState<string>(getUserName);

    useEffect(() => {
        if (typeof name === 'string') {
            setUserName(getUserName);
        }
    }, [name]);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            // position: 'absolute',
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
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    {/* <Text style={styles.header}>{trans.header}</Text> */}
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
                    </View>
                </ScrollView>
            </View>

            <StackHeader hideBackArrow inner={trans.header} />

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Profile;
