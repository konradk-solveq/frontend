import React from 'react';
import {
    StyleSheet,
    Text,
    Linking,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import {
    getVerticalPx,
} from '../../../helpers/layoutFoo';

interface Props {
    marginTop: any;
    font?: any;
    text: any;
    num: number;
}

const Paragraph: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Regulations');

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
            linkStyle={{ color: '#3587ea' }}
            linkText={(url: string) => {
                if (url == trans.urlKross) {
                    return trans.hiperKross;
                }
                if (url == trans.urlKrossEmail) {
                    return trans.hiperKrossEmail;
                }
                if (url == trans.urlGoogle) {
                    return trans.hiperGoogle;
                }
                if (url == trans.urlAppstore) {
                    return trans.hiperAppstore;
                }
                if (url == trans.urlWithdrawalForm) {
                    return trans.hiperWithdrawalForm;
                }
                if (url == trans.urlUOKik) {
                    return trans.hiperUOKik;
                }
                if (url == trans.urlDispute) {
                    return trans.hiperDispute;
                }
                return url;
            }}
            onPress={(url: string) => {
                Linking.openURL(url);
            }}>
            {typeof props.text === 'string' ? (
                <Text
                    style={[
                        styles.paragraph,
                        props.font == 'regular' && styles.regular,
                        props.font == 'light' && styles.light,
                        { marginTop: getVerticalPx(props.marginTop) },
                    ]}>
                    {props.text}
                </Text>
            ) : (
                <Text
                    style={[
                        styles.paragraph,
                        styles.light,
                        { marginTop: getVerticalPx(props.marginTop) },
                    ]}>
                    {props.text.map((e, i) => (
                        <Text
                            style={
                                e.bold && { fontFamily: 'DIN2014Narrow-Regular' }
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
