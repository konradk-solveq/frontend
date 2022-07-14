import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {color, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import colors from '@theme/colors';
import {NotificationMessage} from '@components/documents';
import {notifications} from '../__mocks__/legalDocuments';

storiesOf('components/documents/NotificationMessage', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <NotificationMessage message={notifications[0].content} />
    ))
    .add('Customized', () => (
        <NotificationMessage
            message={object('Message', notifications[0].content)}
            linkColor={color('Link color', colors.link)}
            style={object('Container style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
