import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {Paragraph} from '@components/texts/texts';
import {Checkbox} from '@components/inputs';

interface Props {
    // * wartości wymagane
    checked: boolean; // * zmiana wymsza zaznaczenie przez rodzica
    wrong: boolean; // * walidacja prze rodzica wyśle true wyświetli się wiadomość pod spodem, widomość pobierana z tłuaczeń
    getCheck: () => void; // * zwrotka o zaznaczeiu dla rodzica
    text: string; // * tekst zgody
    info?: string; // dodatkowe informacje
    onPress: (url: string) => void;
}

const OnePermit: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('Permits');

    return (
        <View style={styles.container}>
            <View style={styles.checkbox}>
                <Checkbox checked={props.checked} onPress={props.getCheck} />
            </View>

            <View style={styles.hyper}>
                <Hyperlink
                    linkStyle={styles.link}
                    linkText={(url: string) => {
                        if (url === t('urlRegulations')) {
                            return t('hiperRegulations');
                        }
                        if (url === t('urlPrivacyPolicy')) {
                            return t('hiperPrivacyPolicy');
                        }
                        return url;
                    }}
                    onPress={props.onPress}>
                    <Paragraph>{props.text}</Paragraph>
                </Hyperlink>
                <Text style={styles.mandatory}>{t('wrong')}</Text>

                {props.info && (
                    <Hyperlink
                        linkStyle={styles.link}
                        linkText={(url: string) => {
                            if (url === t('urlRegulations')) {
                                return t('hiperRegulations');
                            }
                            if (url === t('urlPrivacyPolicy')) {
                                return t('hiperPrivacyPolicy');
                            }
                            return url;
                        }}
                        onPress={props.onPress}>
                        <Paragraph>{props.info}</Paragraph>
                    </Hyperlink>
                )}
            </View>
        </View>
    );
};

export default OnePermit;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
    },
    link: {
        color: colors.red,
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
    checkbox: {
        marginTop: getFVerticalPx(8),
    },
    hyper: {
        marginLeft: getFHorizontalPx(16),
        marginTop: getFVerticalPx(3),
    },
    info: {
        marginTop: getFVerticalPx(25),
    },
    mandatory: {
        color: colors.red,
        marginTop: getFVerticalPx(8),
    },
});
