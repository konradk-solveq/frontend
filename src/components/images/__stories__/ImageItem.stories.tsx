import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {boolean, object, text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {ImageItem} from '@components/images';
import {images} from '@components/images/__mocks__/images';
import {action} from '@storybook/addon-actions';

storiesOf('components/images/ImageItem', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <ImageItem imageUri={images[0] as string} showImage />
    ))
    .add('Customized', () => (
        <ImageItem
            imageUri={text('Image uri', images[0] as string)}
            withRemoveButton={boolean('With remove btn', false)}
            onRemove={action('on-remove')}
            onPress={action('on-press')}
            style={object('Style', {})}
            showImage={boolean('Show image', true)}
        />
    ));
