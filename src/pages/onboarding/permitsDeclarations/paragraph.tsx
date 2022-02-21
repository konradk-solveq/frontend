import React from 'react';
import {StyleSheet, Text, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Hyperlink from 'react-native-hyperlink';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {getFontSize, getVerticalPx} from '@helpers/layoutFoo';

interface Props {
    marginTop: any;
    font?: any;
    text: any;
    num: number;
    regulationsScreenRouteName: string;
}

const Paragraph: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();

    const {t} = useMergedTranslation('');

    const styles = StyleSheet.create({
        paragraph: {
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        regular: {
            fontFamily: 'DIN2014Narrow-Regular',
        },
        light: {
            fontFamily: 'DIN2014Narrow-Light',
        },
    });

    return (
        <Hyperlink
            linkStyle={{color: '#3587ea'}}
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
                <Text
                    style={[
                        styles.paragraph,
                        props.font === 'regular' && styles.regular,
                        props.font === 'light' && styles.light,
                        {marginTop: getVerticalPx(props.marginTop)},
                    ]}>
                    {props.text}
                </Text>
            ) : (
                <Text
                    style={[
                        styles.paragraph,
                        styles.light,
                        {marginTop: getVerticalPx(props.marginTop)},
                    ]}>
                    {props.text.map((e, i) => (
                        <Text
                            style={
                                e.bold && {fontFamily: 'DIN2014Narrow-Regular'}
                            }
                            key={'p_' + props.num + '_' + i}>
                            {e.phrase}
                        </Text>
                    ))}
                </Text>
            )}
        </Hyperlink>
    );
};

export default Paragraph;
