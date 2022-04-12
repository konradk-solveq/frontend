import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {IconButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {BackdropModal} from '@components/modals';
import React, {useCallback, useMemo} from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    ScrollView,
} from 'react-native';
import {Header2, BodyPrimary} from '@components/texts/texts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {HorizontalDivider} from '@components/divider';
import {TextIcon} from '@components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '@utils/platform';
import {languagesListT, languageT} from '@models/uiTranslation.models';
import {SvgXml} from 'react-native-svg';

interface IProps {
    visible: boolean;
    onCloseBottomModal: () => void;
    languages: languagesListT;
    selectedLanguageCode?: string;
    onLanguageSelect: (code: string) => void;
}

interface SingleLanguageIProps {
    language: languageT;
    isSelected: boolean;
    onLanguageSelect: (language: string) => void;
}

const {height: screenHeight} = Dimensions.get('window');

const ROW_HEIGHT = 48;
const BOTTOM_PADDING_HEIGHT = 24;

const SingleLanguage = ({
    language,
    isSelected,
    onLanguageSelect,
}: SingleLanguageIProps) => {
    const handleLanguagePress = useCallback(
        () => onLanguageSelect(language.code),
        [language, onLanguageSelect],
    );
    return (
        <>
            <Pressable onPress={handleLanguagePress}>
                <View style={styles.singleLanguage}>
                    <View style={styles.row}>
                        <SvgXml
                            xml={language.icon}
                            height={getFVerticalPx(16)}
                            width={getFVerticalPx(16)}
                            style={styles.flag}
                        />
                        <BodyPrimary>{language.name}</BodyPrimary>
                    </View>
                    {isSelected && (
                        <TextIcon icon={MykrossIconFont.MYKROSS_ICON_OK} />
                    )}
                </View>
            </Pressable>
            <HorizontalDivider />
        </>
    );
};

const ChangeLanguageModal = ({
    visible,
    onCloseBottomModal,
    languages,
    selectedLanguageCode,
    onLanguageSelect,
}: IProps) => {
    const {t} = useMergedTranslation('Onboarding');
    const {bottom, top} = useSafeAreaInsets();

    const modalHeight = useMemo(() => {
        const modalH =
            getFVerticalPx(
                (languages.length + 1) * ROW_HEIGHT + BOTTOM_PADDING_HEIGHT,
            ) +
            bottom +
            (isAndroid ? getFVerticalPx(50) : 0);
        const maxHeight = screenHeight / 2 - top;
        return maxHeight < modalH ? maxHeight : modalH;
    }, [languages.length, bottom, top]);

    return (
        <BackdropModal
            containerStyle={styles.modalContainer}
            visible={visible}
            height={modalHeight}>
            <View style={styles.headerContainer}>
                <Header2>{t('chooseLanguage')}</Header2>
                <View style={styles.closeButton}>
                    <IconButton
                        icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                        iconColor={colors.black}
                        onPress={onCloseBottomModal}
                    />
                </View>
            </View>
            <ScrollView>
                {languages.map(language => (
                    <SingleLanguage
                        key={language.code}
                        language={language}
                        isSelected={
                            !!selectedLanguageCode &&
                            language.code === selectedLanguageCode
                        }
                        onLanguageSelect={onLanguageSelect}
                    />
                ))}
            </ScrollView>
        </BackdropModal>
    );
};

export default ChangeLanguageModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: getFVerticalPx(16),
    },
    closeButton: {
        position: 'absolute',
        paddingTop: getFVerticalPx(5),
        left: 0,
        top: 0,
    },
    singleLanguage: {
        paddingLeft: getFHorizontalPx(16),
        paddingRight: getFHorizontalPx(20),
        paddingVertical: getFVerticalPx(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    flag: {
        marginRight: getFHorizontalPx(10),
        marginTop: getFVerticalPx(4),
    },
    addButton: {
        width: '100%',
        marginBottom: getFVerticalPx(28),
    },
});
