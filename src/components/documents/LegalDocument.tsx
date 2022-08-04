import {View, Linking, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Header3, Paragraph} from '@components/texts/texts';
import linkify, {
    addNotificationLinks,
    compareUrls,
} from '@utils/linking/linkify';
import Hyperlink from 'react-native-hyperlink';
import React from 'react';
import {LegalDocumentVersionType} from '@models/regulations.model';
import colors from '@theme/colors';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import {Text} from 'react-native';

interface IProps {
    message: LegalDocumentVersionType;
    style?: StyleProp<ViewStyle>;
    linkColor?: string;
}

const LegalDocument = ({message, style, linkColor = colors.link}: IProps) => {
    const content = message?.content;
    const actions = message.actions || [];
    return (
        <View key={content?.title} style={[styles.container, style]}>
            <Header3>{content?.header}</Header3>
            {content?.paragraph.map(paragraph => {
                const displayText = addNotificationLinks(
                    paragraph.text,
                    actions,
                );
                return (
                    <Hyperlink
                        key={JSON.stringify(paragraph.text)}
                        linkify={linkify}
                        linkStyle={{color: linkColor}}
                        linkText={(url: string) => {
                            const link = actions.find(action =>
                                compareUrls(url, action),
                            );
                            if (link) {
                                return link.text;
                            } else {
                                return url;
                            }
                        }}
                        onPress={(url: string) => {
                            Linking.openURL(url);
                        }}>
                        <Paragraph
                            style={{
                                fontWeight: paragraph.font,
                                marginTop: paragraph.marginTop,
                            }}>
                            {typeof displayText === 'string'
                                ? displayText
                                : displayText.map(({bold, phrase}) => (
                                    <Text style={[bold && styles.bold]}>
                                        {phrase}
                                    </Text>
                                ))}
                        </Paragraph>
                    </Hyperlink>
                );
            })}
        </View>
    );
};

export default LegalDocument;

const styles = StyleSheet.create({
    container: {
        marginTop: getFVerticalPx(16),
        width: '100%',
    },
    bold: {
        fontWeight: 'bold',
    },
});
