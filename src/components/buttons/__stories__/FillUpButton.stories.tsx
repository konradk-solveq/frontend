import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {number, text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import FillUpButton from '../FillUpButton';
import colors from '@theme/colors';

storiesOf('components/buttons/FillUpButton', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <FillUpButton
            text={text('Button text', 'Zakoncz')}
            textColor={colors.red}
            onFilledAction={action('icon-btn-pressed')}
        />
    ))
    .add('Customized', () => (
        <FillUpButton
            text={text('Button text', 'Zakoncz')}
            textColor={colors.white}
            backgroundColor={colors.red}
            fillColor={colors.deepBlack}
            pressDuration={number('Press duration time', 1000)}
            onFilledAction={action('icon-btn-pressed')}
        />
    ));
