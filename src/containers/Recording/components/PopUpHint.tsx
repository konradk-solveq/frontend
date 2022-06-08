import React from 'react';
import {GestureResponderEvent, StyleSheet, View, ViewStyle} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {PopUp} from '@components/notifications';
import {HandSvg} from '@components/svg';

interface IProps {
    onPress: (e: GestureResponderEvent) => void;
    show?: boolean;
    cotainerStyle?: ViewStyle;
    style?: ViewStyle;
    testID?: string;
}

const PopUpHint: React.FC<IProps> = ({
    onPress,
    show = false,
    cotainerStyle,
    style,
    testID = 'popup-hint',
}: IProps) => {
    const {t} = useMergedTranslation('MainCounter.alerts');
    return (
        <View
            testID={testID}
            style={[styles.container, cotainerStyle]}
            pointerEvents={show ? 'auto' : 'none'}>
            <PopUp
                show={show}
                duration={250}
                onPress={onPress}
                icon={
                    <View
                        style={{
                            marginRight: getFHorizontalPx(16),
                        }}>
                        <HandSvg />
                    </View>
                }
                text={t('pressLongToFinish.message')}
                style={style}
                testID={`${testID}-popup`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        top: -getFVerticalPx(90),
        zIndex: 12,
    },
});

export default React.memo(PopUpHint);
