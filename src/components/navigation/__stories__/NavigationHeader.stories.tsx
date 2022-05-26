import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {boolean, object, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import {NavigationDecorator} from '@sb/utils/NavigationDecorator';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {NavigationHeader} from '@components/navigation';
import {IconButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {MYKROSS_ICON_NATIVE_SHARE_ICON} from '@src/theme/utils/getNativeShareIcon';

const HEADER_TITLE = 'Header title';

storiesOf('components/navigation/NavigationHeader', module)
    .addDecorator(NavigationDecorator)
    .add('Default', () => (
        <NavigationHeader
            title={HEADER_TITLE}
            rightActions={ActionButtons}
            forceBackArrow
        />
    ))
    .add('With additional buttons', () => (
        <NavigationHeader
            title={HEADER_TITLE}
            rightActions={
                <ActionButtons
                    onPressLeft={action('on-press-left-action-button-action')}
                    onPressRight={action('on-press-right-action-button-action')}
                />
            }
            forceBackArrow
        />
    ))
    .add('Customized', () => (
        <NavigationHeader
            title={text('Header title', HEADER_TITLE)}
            rightActions={
                <ActionButtons
                    onPressLeft={action('on-press-left-action-button-action')}
                    onPressRight={action('on-press-right-action-button-action')}
                />
            }
            forceBackArrow={boolean('Force back button to show', true)}
            hideBackArrow={boolean(
                'Hide back button',
                true,
            )} /* It won't work, because button is hide default. There is no other screen in navigation stack */
            onPress={action('on-press-back-button-action')}
            showCross={boolean('Change back button to Close icon', false)}
            titleStyle={object('Header title container style', {
                color: colors.red,
            })}
            style={object('NavigationHeader container style', {
                backgroundColor: colors.lightGrey,
            })}
        />
    ));

interface IProps {
    onPressLeft: (e: GestureResponderEvent) => void;
    onPressRight: (e: GestureResponderEvent) => void;
}

const ActionButtons: React.FC<IProps> = ({
    onPressLeft,
    onPressRight,
}: IProps) => (
    <>
        <IconButton
            icon={MykrossIconFont.MYKROSS_ICON_EDIT}
            iconColor={colors.black}
            style={{
                ...styles.actionButton,
                marginRight: getFHorizontalPx(5),
            }}
            onPress={onPressLeft}
        />
        <IconButton
            icon={MYKROSS_ICON_NATIVE_SHARE_ICON}
            iconColor={colors.black}
            style={styles.actionButton}
            onPress={onPressRight}
        />
    </>
);

const styles = StyleSheet.create({
    placeholderContainer: {
        backgroundColor: '#000000',
    },
    actionButton: {
        height: 'auto',
        width: 'auto',
        backgroundColor: 'transparent',
    },
});
