import React, {useMemo} from 'react';
import {
    GestureResponderEvent,
    Linking,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import ControlledCheckbox from '@sharedComponents/checkBox/ControlledCheckbox';
import {Consent} from '@models/consents.model';
import RenderHtml from 'react-native-render-html';

interface Props {
    consent: Consent;
}

const openLink = (event: GestureResponderEvent, url: string) => {
    Linking.openURL(url);
};

const SingleConsent: React.FC<Props> = ({consent}: Props) => {
    const CHECKBOX_SIZE = getHorizontalPx(26);

    const baseFontStyle = {
        textAlign: 'justify',
    };

    const renderersProps = useMemo(
        () => ({
            a: {
                onPress: openLink,
            },
        }),
        [],
    );

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
            marginBottom: getVerticalPx(11),
        },
        checkbox: {
            position: 'relative',
            width: CHECKBOX_SIZE,
            height: CHECKBOX_SIZE,
            // marginLeft: getHorizontalPx(40),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#555555',
        },
        info: {
            paddingHorizontal: 10,
            // screen width without the margins and checkbox
            maxWidth: getHorizontalPx(414 - 80 - 26),
        },
        wrong: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#d8232a',
            marginTop: getVerticalPx(11),
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.checkbox}>
                <ControlledCheckbox
                    name={`${consent.id}`}
                    disabled={consent.disabled}
                />
            </View>

            {consent.content && (
                <View style={styles.info}>
                    <Text>{consent.name}</Text>
                    <RenderHtml
                        source={{html: consent.content}}
                        contentWidth={getHorizontalPx(100)}
                        renderersProps={renderersProps}
                        baseStyle={baseFontStyle}
                    />
                </View>
            )}
        </View>
    );
};

export default SingleConsent;
