import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import colors from '@theme/colors';

import {AddBikeContainer} from '@containers/Bike';

storiesOf('containers/Bike/AddBikeContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => <AddBikeContainer />);

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#ffffff',
    },
    detailsContainer: {
        borderColor: colors.red,
        borderWidth: 1,
    },
});
