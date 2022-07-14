import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {color, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import colors from '@theme/colors';
import {legalDocuments} from '../__mocks__/legalDocuments';
import LegalDocument from '@components/documents/LegalDocument';

storiesOf('components/documents/LegalDocument', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <LegalDocument message={legalDocuments.policy.current} />
    ))
    .add('Customized', () => (
        <LegalDocument
            message={object('Message', legalDocuments.policy.current)}
            linkColor={color('Link color', colors.link)}
            style={object('Container style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
