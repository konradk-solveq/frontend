import React, {ReactNode, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {HorizontalSpacer} from '@components/divider';
import Swipe from '@sharedComponents/navi/swipe/swipe';
import {BottomModal as BM} from '@components/modals';

interface IProps {
    show?: boolean;
    children?: ReactNode;
    canOpen?: boolean;
}

const BottomModal: React.FC<IProps> = ({
    show = false,
    children,
    canOpen = true,
}: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onSwipeFlatButton = useCallback(() => {
        if (!canOpen) {
            return false;
        }
        setIsOpen(prev => !prev);
    }, [canOpen]);

    return (
        <BM
            show={show}
            openModal={isOpen}
            autoClose
            isSwipeable
            isReactive={canOpen}
            header={
                <>
                    <SwipeButton
                        isOpen={isOpen}
                        onSwipeAction={onSwipeFlatButton}
                    />
                    <HorizontalSpacer />
                </>
            }>
            <HorizontalSpacer />
            {children}
        </BM>
    );
};

interface ISBProps {
    onSwipeAction: () => void;
    isOpen?: boolean;
}

const SwipeButton: React.FC<ISBProps> = ({
    onSwipeAction,
    isOpen = false,
}: ISBProps) => {
    return (
        <Swipe direction={!isOpen ? 4 : 8} onSwipeAction={onSwipeAction}>
            <View style={styles.flatButtonContainer}>
                <View style={styles.flatButton} />
            </View>
        </Swipe>
    );
};

const styles = StyleSheet.create({
    flatButtonContainer: {
        position: 'absolute',
        top: getFVerticalPx(0),
        left: 0,
        right: 0,
        height: getFVerticalPx(44),
        alignItems: 'center',
        zIndex: 10,
    },
    flatButton: {
        marginTop: getFVerticalPx(16),
        height: getFVerticalPx(4),
        width: getFHorizontalPx(33),
        borderRadius: getFHorizontalPx(4),
        backgroundColor: colors.greyish,
        zIndex: 10,
    },
});

export default BottomModal;
