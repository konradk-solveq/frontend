import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AnimSvg from '../../../helpers/animSvg';

import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import BlueButton from './blueButton';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';

import {useAppSelector} from '../../../hooks/redux';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
} from '../../../helpers/layoutFoo';
import {RegularStackRoute, BothStackRoute} from '../../../navigation/route';

interface Props {
    navigation: any;
    route: any;
}

const amatour_biker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315 296">
<defs/>
<g fill="none" fill-rule="evenodd">
  <path fill="#FDF5F5" d="M151.68 0h10.64C241.12 0 305 66.26 305 148s-63.88 148-142.68 148h-10.64C72.88 296 9 229.74 9 148S72.88 0 151.68 0z" opacity=".7"/>
  <path fill="#FCDADB" d="M.62 64.86c5.56-13.76 9.96 0 17.53-8.58 7.6-8.63 6.53-21.56 17.36-7.78 5.24 6.67 9.38-18.39 20.1-16.39s-2.24 16.4 10.05 16.4 12.28-11.35 20.61 1.75 5.29 6.02 15.16 6.02 11.79 2.97 11.79 8.58c-105.18.04-92.73.17-112.6 0z">
    <animateTransform attributeName="transform" attributeType="XML" begin="0s" dur="5.7s" repeatCount="indefinite" type="translate" values="200 0 ; 0 0"/>
    <animate attributeName="opacity" begin="0s" dur="5.7s" repeatCount="indefinite" values="0 ; 1 ; 1 ; 1 ; 1 ; 1 ; 0"/>
  </path>
  <path fill="#FCDADB" d="M226 97.87c0-3.52 9.91-1.23 16.36-6.38 6.45-5.16 5.83-17.49 15.05-17.49 12.92 0 1.41 17.74 6.06 17.74 4.64 0-.16-10.36 6.57-10.36 5.25 0 9.9 12 13.04 13.5 6.87 3.27 12.92.6 12.92 3-5.21.16-4.5.16-70 0z">
    <animateTransform attributeName="transform" attributeType="XML" begin="0s" dur="3.47s" repeatCount="indefinite" type="translate" values="20 0 ; -220 0"/>
    <animate attributeName="opacity" begin="0s" dur="3.47s" repeatCount="indefinite" values="0 ; 1 ; 1 ; 1 ; 1 ; 1 ; 0"/>
  </path>
  <path fill="#F5D7D7" d="M135.02 195.2c-7.06 3.09-9.49 6.34-7.3 9.76.29.44 6.62 5.75 6.96 6.2 6.38 8.4 6.41 9.34 8.26 9.56 1.85.23 2.15.79-1.38-13.23-3.52-14 14.7-16.97 14.46-19.15-.37-3.56-5.14-5.24-14.3-5.03l-6.7 11.88z"/>
  <path fill="#555" d="M135.02 195.2c-7.06 3.09-9.49 6.34-7.3 9.76.29.44 6.62 5.75 6.96 6.2 6.38 8.4 6.41 9.34 8.26 9.56 1.85.23 2.15.79-1.38-13.23-.62-2.45-5.2-2.52-5.8-4.25-1.1-3.24-1.35-5.92-.74-8.05z"/>
  <path fill="#649ECD" d="M120.67 106.47c48.06 19.15 72.1 34.3 72.1 45.45 0 11.16-15.22 29.26-45.64 54.32l-11.71-25.1c23.93-10.4 33.03-18.5 27.3-24.26-8.62-8.65-31.6-3.14-38.24-11.42-4.42-5.53-5.7-18.52-3.8-38.98z"/>
  <g fill="#F67E83" transform="translate(26 108.55)">
    <path fill-rule="nonzero" d="M55.5 63.45a48.5 48.5 0 100 97 48.5 48.5 0 000-97zm0 1.06a47.44 47.44 0 110 94.89 47.44 47.44 0 010-94.89z"/>
    <circle cx="55" cy="111.45" r="4"/>
    <circle cx="56" cy="134.46" r="2"/>
    <path fill-rule="nonzero" d="M225.5 64.45a48.5 48.5 0 100 97 48.5 48.5 0 000-97zm0 1.06a47.44 47.44 0 110 94.89 47.44 47.44 0 010-94.89z"/>
    <circle cx="225.5" cy="112.95" r="5.5"/>
    <path fill-rule="nonzero" d="M101.07 97.72a.53.53 0 01.67-.22l.04.02 12.53 6.9 9.62 17.26c.14.25.05.57-.2.71a.53.53 0 01-.7-.17l-.01-.03-9.48-17-12.27-6.76a.52.52 0 01-.22-.67l.02-.04zm25.13 23.85a.53.53 0 01.72.06l.03.03 15.46 19.73h14.06c.28 0 .5.22.53.5v.03c0 .28-.22.51-.49.53H141.9l-15.79-20.14a.53.53 0 01.1-.74z"/>
    <path fill-rule="nonzero" d="M64.79 57.6c11.03 2.66 21.2 7.95 28.81 15.78 9.28 9.53 14.4 22.35 14.4 38.55a.53.53 0 01-1.05 0c0-15.93-5.02-28.48-14.1-37.8-7.47-7.69-17.46-12.88-28.3-15.5-18.63-4.5-41.23 5.03-52 21.6l-3.2 4.92-2.37 3.64-2.6 3.97-1.27 1.93-.69 1.04-.56.85-.53.78-.22.31-.1.15-.05.06-.02.03a.52.52 0 01-.74.1.53.53 0 01-.09-.75l.1-.15.16-.22.26-.37.32-.48.4-.6.56-.83 1.28-1.95 1.76-2.69 2.83-4.33 3.89-5.98c11-16.95 34.06-26.67 53.12-22.06zM188.31.55l.24-.02.22-.02.23-.02.21-.01.21-.01h.1l.21-.01H190.4l.18.01.17.01c1.58.13 2.43.7 2.43 1.8 0 1.14-.8 2.5-2.42 4.12l-.21.2c-.4.39-.83.78-1.31 1.2l-.27.22-.28.23-.14.11-.29.24-.3.23-.3.24-.32.24-.32.25-.33.24-.35.25-.35.26-.36.25-.18.13-.37.26-.39.26-.39.27-.4.27-.2.13-.41.28-.42.27-.43.28-.31.2 13.4 35.31 3.58 2.34 21.54 55.82 5.2 5.18c.2.2.2.5.03.7l-.03.04c-.2.2-.5.2-.72.03l-.03-.03-5.36-5.33-21.5-55.71-3.58-2.35-13.82-36.42.58-.37.42-.28.42-.27.41-.27.2-.13.4-.27.39-.26.38-.26.37-.25.36-.25.36-.25.17-.13.34-.24.33-.24.32-.24.32-.24.3-.23.3-.23.15-.11.28-.23.28-.22.13-.1.26-.23.5-.42.24-.2.23-.21.21-.2.21-.2.2-.2c1.48-1.44 2.22-2.6 2.22-3.48 0-.37-.38-.63-1.2-.73l-.13-.02h-.07l-.15-.01-.15-.01h-1l-.2.02-.22.02-.22.01-.24.03h-.12l-.24.04-.26.03-.26.03-.27.04-.28.04-.28.05-.3.05-.3.05-.3.05-.31.06-.32.06-.33.07-.34.07-.34.07-.53.12-.36.08-.37.09-.56.13-.39.1-.39.1-.6.15-.41.1-.63.17-.65.18-.44.12-.67.19-.46.13-.46.13-.48.14-.96.28-.25.08a.53.53 0 11-.3-1l.74-.23.72-.21.7-.2.7-.2.45-.13.67-.18.65-.17.42-.11.62-.17.6-.15.4-.1.58-.14.56-.13.37-.08.36-.08.35-.08.51-.1.33-.07.5-.1.3-.05.32-.06.3-.05.3-.05.28-.04.28-.04.27-.04.14-.02.26-.03.25-.03zM92 18.45L126 122.13l-1 .33L91 18.8z"/>
    <path fill-rule="nonzero" d="M29 49.45h5.2l17.6 50.57.84-.27 2.36 9.48-.77.22-2.93-8.44-3.03.98L29 49.46zm4.63.8h-3.49L48.76 101l2.28-.74-17.41-50.01zm92.87 56.2a14.5 14.5 0 100 29 14.5 14.5 0 000-29zm0 1.06a13.45 13.45 0 110 26.9 13.45 13.45 0 010-26.9z"/>
    <path fill-rule="nonzero" d="M125.84 107.45l.02.78-69.08 1.19-3.64 8.67 4.3 2.8v.2c.1 4.82-1.25 9.78-4.05 14.9l-.09.15.2.02c2.3.16 4.91.29 7.83.37l1.04.03 1.07.03h.54l1.1.03 4.07.05H76.17l1.36-.02 1.38-.01 1.41-.02 1.43-.02 1.46-.03 1.5-.02 1.5-.03 1.54-.04 1.56-.03 1.59-.04 1.61-.05 1.64-.04.83-.03 1.67-.05.85-.02 1.72-.06 1.74-.06 1.76-.06 1.8-.07 1.8-.06 1.85-.08 1.86-.07 1.9-.08 1.91-.08 1.95-.08 1.97-.1 1.99-.08 2.02-.1 1.02-.05 2.05-.1 2.12-.1.04.78-2.15.1-2.12.1-2.1.1-2.06.1-2.04.1-2.02.08-1.99.09-1.96.08-1.93.07-1.9.08-.95.04-1.86.07-.93.03-1.82.06-1.8.06-.89.03-1.76.06-1.73.05-1.7.05-1.68.05-1.65.04-1.62.04-1.6.03-1.56.04-1.54.03h-.76l-1.5.03-1.48.02-1.45.02h-.7l-1.42.02h-1.38l-1.35.01h-1.98c-7.57 0-13.77-.19-18.59-.54l-.41-.03-.62-.05.3-.53c2.92-5.09 4.36-10 4.34-14.77v-.23l-4.48-2.92 4.08-9.73 69.6-1.2zm-71.44-58l.6.51-3.06 3.71L50 56.03l-2.31 2.82-2.2 2.68-2.07 2.54-1.19 1.45-1.51 1.86-1.44 1.77-1.36 1.68-1.28 1.6-1.2 1.5-1.13 1.4-.8 1-.74.94-.48.6-.45.58-.65.83-.6.78-.38.48-.36.47-.34.44-.32.42-.3.4-.28.38-.26.35-.24.33-.22.3-.2.29-.19.26-.16.24c-.2.3-.36.54-.46.72-.96 1.74-1.34 3.84-.92 5.43.46 1.77 1.84 2.8 4.21 2.83h.64l.35.01.55.01.38.01.57.02.4.02.4.01.41.02.42.03.43.02.65.04.45.03.68.05.47.04.71.06.73.06.5.04.5.05.78.08.8.08.53.05.55.06.83.1.85.09.87.1.89.1.6.08-.1.8-.6-.08-.59-.07-.87-.1-.85-.1-.84-.1-.81-.08-.8-.09-.79-.07-.76-.08-.74-.06-.5-.05-.47-.04-.47-.03-.47-.04-.45-.03-.45-.03-.44-.03-.43-.03-.42-.03-.42-.02-.4-.02-.4-.02-.4-.01-.38-.02h-.38l-.37-.02H30.3c-2.79 0-4.53-1.28-5.1-3.44-.47-1.8-.05-4.1 1-6.01a9 9 0 01.4-.63l.15-.23.17-.26.2-.27.21-.3.11-.16.25-.33.26-.35.14-.19.29-.39.3-.4.34-.44.35-.46.56-.72.4-.52.63-.8.45-.58.95-1.2 1.03-1.3.54-.68.85-1.07 1.2-1.5.64-.79.99-1.22 1.38-1.7L40.8 66l1.96-2.4L44 62.08 45.72 60l1.79-2.18 1.4-1.7 2.42-2.94 2.54-3.1.53-.63zm178.58 9l.02 1.05c-20.97.42-35.87 5.28-44.74 14.56-6.14 6.43-10.13 12.71-12.6 19.3l-.17.44-.17.45-.1.29-.15.43-.1.3-.14.42-.05.14-.13.43-.1.28-.12.42-.08.28-.08.29-.08.28-.08.29-.08.28-.07.3-.08.28-.07.3-.1.44-.07.3-.1.46-.07.31-.06.31-.07.32-.06.33-.1.5-.06.33-.1.52-.06.35-.09.54-.1.56-.05.38-.1.59-.1.6-.08.63-.16 1.09-.17 1.15-.07.48-1.04-.14.2-1.42.13-.9.1-.64.1-.63.09-.6.12-.79.1-.56.09-.55.1-.53.09-.52.06-.34.07-.33.06-.33.07-.32.06-.32.07-.32.07-.3.07-.31.07-.3.07-.3.08-.3.1-.45.08-.29.08-.29.08-.29.08-.29.09-.28.08-.3.1-.28.08-.29.1-.28.09-.3.1-.28.09-.3.15-.44.16-.44.06-.15.16-.46.12-.3c2.52-6.72 6.59-13.12 12.83-19.65 9-9.42 23.95-14.37 44.84-14.87l.64-.01z"/>
    <path fill-rule="nonzero" d="M68.22 50.45l.78.14-10.18 59.86H55l3.16-.79z"/>
    <path fill-rule="nonzero" d="M187.27 28.45l-86.13 15.93L55 111.53l71.88 9.93L191 38.43l-3.73-9.98zm.39.96l2.86 7.91-64.1 83-69.58-9.6 44.92-65.38 85.9-15.93zM80 49.45v.77H27.8v6.23H27v-7z"/>
  </g>
  <g>
    <path fill="#F5D7D7" d="M139.33 46.64l10-27.56h17.14l2.28 2.91h-2.28c-2.42 7.2-6.35 10.01-11.81 8.42a911.51 911.51 0 01-5.74 16.23h-9.6z"/>
    <path fill="#BFA7A7" d="M149.27 26.41l5.6 4.06-.21-.06-1.27 3.68-4.12-7.68z"/>
    <path fill="#FFEECD" d="M151.91 39c-9.1-6.31-18.73 1.94-28.9 24.76-10.17 22.81-18.47 37.09-24.9 42.82l24.9.4c18.09-6.55 29.75-13.65 35-21.27 5.24-7.63 7.08-12.25 5.51-13.86L151.92 39z"/>
    <path fill="#ECD9B6" d="M149.83 41.38a396.23 396.23 0 0117.14 28.56 85.7 85.7 0 01-1.82 4.77c-2.12 5.1-6.59 11.08-13.41 17.9-.7-1.45-1.39-3-2.07-4.63-7.08-16.96-7.03-32.49.16-46.6z"/>
    <path fill="#BFA7A7" d="M149.27 19.08l18.9 2.28-2.96-3.92z"/>
    <path fill="#F5D7D7" d="M187.22 102.1c2.16 5.8 6.43 8.18 12.82 7.14 9.6-1.55 9.6 1.4 11.68 1.4s3.8-4.41-13.22-8.53c-7.07-1.36-10.83-2.93-11.28-4.73v4.73zm-27.95 140.36c-.58 7.66 1.15 11.33 5.2 11 .52-.04 8.2-3.14 8.73-3.22 10.43-1.7 11.27-1.28 12.34-2.8 1.07-1.52 1.7-1.52-12.34-4.98-14.02-3.46-8.09-20.9-10.12-21.72-3.32-1.34-7.04 2.08-11.15 10.25l7.34 11.47z"/>
    <path fill="#555" d="M159.27 242.46c-.58 7.66 1.15 11.33 5.2 11 .52-.04 8.2-3.14 8.73-3.22 10.43-1.7 11.27-1.28 12.34-2.8 1.07-1.52 1.7-1.52-12.34-4.98-2.45-.6-4.66 3.4-6.47 3.1-3.38-.53-5.87-1.57-7.46-3.1z"/>
    <path fill="#FFEECD" d="M150 39.4c18.24 21.55 36.02 42 53.33 61.36-12.1 9.76-25 9.31-42.86-10.58C148.57 76.92 145.07 60 150 39.4z"/>
    <path fill="#A3CAEA" d="M98.9 106.58C93.63 113 91 118.51 91 123.09c0 6.87 1.83 12.9 17.43 27.2 4.66 4.27 20.66 21.57 25.84 33.64 4.77 11.1 14.43 57.29 18.72 56.74 2.54-.32 16.35-.87 16.88-4.83 1.05-7.8-.05-19.68-11.6-67.22-4.82-13.88-16.84-34.56-36.04-62.04H98.9z"/>
    <path fill="#D8232A" d="M144.25 19.4l25.93-1.96C165.1 7.32 157.67 2.97 147.84 4.42c-4.97.88-6.17 5.88-3.6 14.98z"/>
    <path fill="#D8232A" fill-rule="nonzero" d="M153.5 17.47l.12.01a1 1 0 01.87 1.11l-.1.8-.07.76-.03.37-.06.71-.04.68-.02.66-.02.92v.58l.03.55c.18 3.28 1.13 4.88 2.72 4.96h.13a1 1 0 010 2c-3.76 0-5.25-3.65-4.79-10.5l.06-.75.07-.78.09-.8.05-.4a1 1 0 011-.88z"/>
  </g>
</g>
</svg>`;

const Profile: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('MainProfile');
    // const dispatch = useAppDispatch();

    const name = useAppSelector<string>(state => state.user.userName);
    const getUserName = name ? name : trans.defaultName;
    const [userName, setUserName] = useState<string>(getUserName);

    const [headHeight, setHeadHeight] = useState<number>(0);

    useEffect(() => {
        if (typeof name === 'string') {
            setUserName(getUserName);
        }
    }, [name]);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: getVerticalPx(896) - headHeight,
            top: headHeight,
        },
        wrap: {
            // position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(145),
            marginTop: getVerticalPx(60),
        },
        imgage: {
            width: getHorizontalPx(188),
            height: getHorizontalPx(190),
            left: getHorizontalPx(73),
            marginBottom: getVerticalPx(20),
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
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    {/* <Text style={styles.header}>{trans.header}</Text> */}
                    <View style={styles.wrap}>
                        <AnimSvg source={amatour_biker} style={styles.imgage} />

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

            <StackHeader
                hideBackArrow
                inner={trans.header}
                // style={styles.header}
                // titleStyle={styles.title}
                getHeight={setHeadHeight}
            />

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Profile;
