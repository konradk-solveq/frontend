import React from 'react';
import {StyleSheet, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Hyperlink from 'react-native-hyperlink';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {Paragraph} from '@components/texts/texts';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface Props {
    marginTop: number;
    font?: 'light' | 'regular';
    text: string
        | Array<{
              phrase: string;
              bold: string;
          }>;
    num: number;
    regulationsScreenRouteName: string;
}

const JsonParagraph: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();
    const {t} = useMergedTranslation('');

    const styles = StyleSheet.create({
        light: {
            fontFamily: 'DIN2014Narrow-Light',
        },
    });

    return (
        <Hyperlink
            linkStyle={{color: colors.red}}
            linkText={(url: string) => {
                const trans: {url: string; hyper: string}[] = t('Urls', {
                    returnObjects: true,
                });
                const link = trans.find(e => e.url === url);
                if (link) {
                    return link.hyper;
                } else {
                    return url;
                }
            }}
            onPress={(url: string) => {
                if (url === 'https://www.kross.pl.rgulamin') {
                    navigation.navigate(props.regulationsScreenRouteName);
                } else {
                    Linking.openURL(url);
                }
            }}>
            {typeof props.text === 'string' ? (
                <Paragraph
                    style={[
                        props.font === 'light' && styles.light,
                        {marginTop: getFVerticalPx(props.marginTop)},
                    ]}>
                    {props.text}
                </Paragraph>
            ) : (
                <Paragraph
                    style={[
                        styles.light,
                        {marginTop: getFVerticalPx(props.marginTop)},
                    ]}>
                    {props.text.map((e, i) => (
                        <Paragraph
                            style={!e.bold && styles.light}
                            key={'p_' + props.num + '_' + i}>
                            {e.phrase}
                        </Paragraph>
                    ))}
                </Paragraph>
            )}
        </Hyperlink>
    );
};

export default JsonParagraph;
