import React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

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
}

const PopUpHint: React.FC<IProps> = ({onPress, show = false}: IProps) => {
    const {t} = useMergedTranslation('MainCounter.alerts');
    return (
        <View style={styles.container}>
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
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        top: -getFVerticalPx(118),
        zIndex: 12,
    },
});

export default React.memo(PopUpHint);
