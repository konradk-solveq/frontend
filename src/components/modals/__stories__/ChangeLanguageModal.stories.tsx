import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {ChangeLanguageModal} from '@components/modals';
import {action} from '@storybook/addon-actions';
import {languages} from '@components/modals/__mocks__/languages';
import {SafeAreaProvider} from 'react-native-safe-area-context';

storiesOf('components/modals/ChangeLanguageModal', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <SafeAreaProvider>{getStory()}</SafeAreaProvider>
        </LayoutCenter>
    ))
    .add('Default', () => (
        <ChangeLanguageModal
            visible={true}
            onCloseBottomModal={action('on-modal-close')}
            languages={languages}
            selectedLanguageCode={languages[0].code}
            onLanguageSelect={action('on-language-select')}
        />
    ));
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
