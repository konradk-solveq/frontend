import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {array, boolean, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {ImageSwiper} from '@components/images';
import {images} from '@components/images/__mocks__/images';
import {action} from '@storybook/addon-actions';

storiesOf('components/images/ImageSwiper', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <ImageSwiper images={images as string[]} />)
    .add('Customized', () => (
        <ImageSwiper
            images={array('Images', images as string[])}
            containerStyle={object('Container style', {})}
            imageStyle={object('Image style', {})}
            withRemoveButton={boolean('With remove btn', false)}
            onPress={action('on-press')}
            onPressRemove={action('on-press-remove')}
        />
    ));
