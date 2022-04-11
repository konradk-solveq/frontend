import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {number, object, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {AddBikeTile} from '@components/tiles';
import {SignpostSvg} from '@components/svg';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

storiesOf('components/tiles/AddBIkeTile', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <AddBikeTile
            onPressPrimary={action('on-press-primary-action')}
            onPressSecondary={action('on-press-secondary-action')}
        />
    ))
    .add('Customized', () => (
        <AddBikeTile
            onPressPrimary={action('on-press-primary-action')}
            onPressSecondary={action('on-press-secondary-action')}
            header={text('Tile header', '')}
            height={number('Tile height', 377)}
            image={<SignpostSvg />}
            imageContainer={object(
                'Image container style',
                styles.imageContainer,
            )}
        />
    ));

const styles = StyleSheet.create({
    imageContainer: {
        marginBottom: getFVerticalPx(26),
    },
});
