import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import {I18nextProvider} from 'react-i18next';
import {action} from '@storybook/addon-actions';
import {boolean, number, object, text} from '@storybook/addon-knobs';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {PopUp} from '@components/notifications';
import {HandSvg, MoneySvg} from '@src/components/svg';

storiesOf('components/notifications/Popup', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <PopUp
            show
            icon={
                <View
                    style={{
                        marginRight: getFHorizontalPx(16),
                    }}>
                    <HandSvg />
                </View>
            }
            text={'Hold for 3 seconds\nto finish'}
        />
    ))
    .add('With custom icon', () => (
        <PopUp
            show
            icon={
                <View
                    style={{
                        marginRight: getFHorizontalPx(16),
                    }}>
                    <MoneySvg />
                </View>
            }
            text={'Hold for 3 seconds\nto finish'}
        />
    ))
    .add('Customized', () => (
        <PopUp
            show={boolean('Show popup', true)}
            icon={
                <View
                    style={{
                        marginRight: getFHorizontalPx(16),
                    }}>
                    <HandSvg />
                </View>
            }
            autoHide={boolean('Turn auto hide PopUp', false)}
            delay={number('Auto hide time delay', 3000)}
            duration={number('Animation duration', 500)}
            onPress={action('on-press-action')}
            text={text('Text', 'Hello world')}
            style={object('Container style', {})}
        />
    ));
