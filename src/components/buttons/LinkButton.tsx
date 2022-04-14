import React from 'react';
import {GestureResponderEvent, Pressable, TextStyle} from 'react-native';

import colors from '@theme/colors';
import {TextLink} from '@components/texts/texts';

interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
    textColor?: string;
    disabled?: boolean;
    disabledColor?: string;
    testID?: string;
    style?: TextStyle
}

const LinkButton: React.FC<IProps> = ({
    text,
    onPress,
    textColor = colors.red,
    disabled = false,
    disabledColor = colors.lightRed,
    testID = 'link-button-test-id',
    style,
}: IProps) => {
    return (
        <Pressable onPress={onPress} testID={testID} disabled={disabled}>
            <TextLink style={style} color={!disabled ? textColor : disabledColor}>
                {text}
            </TextLink>
        </Pressable>
    );
};

export default LinkButton;
