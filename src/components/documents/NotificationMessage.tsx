import {View, Linking, StyleSheet, StyleProp, ViewProps} from 'react-native';
import {Header3, Paragraph} from '@components/texts/texts';
import linkify, {addNotificationLinks} from '@utils/linking/linkify';
import Hyperlink from 'react-native-hyperlink';
import React from 'react';
import {NotificationContentType} from '@models/regulations.model';
import colors from '@theme/colors';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    message: NotificationContentType;
    style?: StyleProp<ViewProps>;
    linkColor?: string;
}

const NotificationMessage = ({
    message,
    style,
    linkColor = colors.link,
}: IProps) => {
    const displayText = addNotificationLinks(
        message.data.text,
        message?.actions || [],
    );
    return (
        <View key={message.data.title} style={[styles.container, style]}>
            <Header3>{message.data.title}</Header3>
            <Hyperlink
                key={message.id}
                linkify={linkify}
                linkStyle={{color: linkColor}}
                linkText={(url: string) => {
                    const link = message?.actions.find(e => e.value === url);
                    if (link) {
                        return link.text;
                    } else {
                        return url;
                    }
                }}
                onPress={(url: string) => {
                    Linking.openURL(url);
                }}>
                <Paragraph>{displayText}</Paragraph>
            </Hyperlink>
        </View>
    );
};

export default NotificationMessage;

const styles = StyleSheet.create({
    container: {
        marginTop: getFVerticalPx(16),
    },
});
