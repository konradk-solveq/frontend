import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {BigRedBtn} from '@sharedComponents/buttons';
import {BtnWrapper} from '../utils/BtnWrapper';

storiesOf('BigRedBtn', module)
    .addDecorator(getStory => <BtnWrapper>{getStory()}</BtnWrapper>)
    .add('Basic', () => (
        <BigRedBtn
            onPress={action('clicked-big-red-btn')}
            disabled={boolean('Button disabled', false)}
            withLoader={boolean('Button loading', false)}
            title={text('Button text', 'Hello!')}
        />
    ));
