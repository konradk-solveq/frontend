import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text, array} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {ImagesInput} from '@components/inputs';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';

storiesOf('components/input/ImagesInput', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <View style={styles.inputContainer}>{getStory()}</View>
        </LayoutCenter>
    ))
    .add('Default', () => (
        <ImagesInput
            onAddImage={action('on-add-image')}
            onRemoveImage={action('on-remove-image')}
            images={[]}
            placeholderText={'Placeholder Text'}
        />
    ))
    .add('Customized', () => (
        <ImagesInput
            onAddImage={action('on-add-image')}
            onRemoveImage={action('on-remove-image')}
            images={array('images', [])}
            placeholderText={text('Placeholder Text', 'Placeholder Text')}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    inputContainer: {
        width: '100%',
        height: getFVerticalPx(150),
    },
});
