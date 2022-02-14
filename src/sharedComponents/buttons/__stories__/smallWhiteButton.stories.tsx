import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import SmallWhiteBtn from '@sharedComponents/buttons/smallWhiteBtn';
import BtnWrapper from '@sb/utils/BtnWrapper';

storiesOf('SmallWhiteBtn', module)
    .addDecorator(getStory => <BtnWrapper>{getStory()}</BtnWrapper>)
    .add('Basic', () => (
        <SmallWhiteBtn
            onPress={action('clicked-small-white-btn')}
            title={text('Button text', 'Hello!')}
        />
    ));
