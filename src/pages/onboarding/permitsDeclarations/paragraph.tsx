import React from 'react';
import {StyleSheet, Text, Linking} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import {getVerticalPx} from '../../../helpers/layoutFoo';
import {BothStackRoute} from '../../../navigation/route';

interface Props {
    marginTop: any;
    font?: any;
    text: any;
    num: number;
}

const Paragraph: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();

    const trans = I18n.t('Urls');

    const styles = StyleSheet.create({
        paragraph: {
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
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
                let link = trans.find(e => e.url === url);
                if (link) {
                    return link.hyper;
                } else {
                    return url;
                }
            }}
            onPress={(url: string) => {
                if (url == 'https://www.kross.pl.rgulamin') {
                    navigation.navigate(BothStackRoute.REGULATIONS_SCREEN);
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
