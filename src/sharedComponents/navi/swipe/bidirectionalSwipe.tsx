import React from 'react';
import {
    Directions,
    FlingGestureHandler,
    State,
} from 'react-native-gesture-handler';

import Swipe from './swipe';

interface IProps {
    onFirstSwipeAction: () => void;
    onSecondSwipeAction: () => void;
    firstDirection: Directions /* 1: right, 2: left, 4: up, 8:down */;
    secondDirection: Directions /* 1: right, 2: left, 4: up, 8:down */;
    children: React.ReactNode;
}

const BidirectionalSwipe: React.FC<IProps> = ({
    onFirstSwipeAction,
    onSecondSwipeAction,
    firstDirection,
    secondDirection,
    children,
}: IProps) => {
    return (
        <Swipe onSwipeAction={onSecondSwipeAction} direction={secondDirection}>
            <FlingGestureHandler
                direction={firstDirection}
                onHandlerStateChange={({nativeEvent}) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        onFirstSwipeAction();
                    }
                }}>
                {children}
            </FlingGestureHandler>
        </Swipe>
    );
};

export default BidirectionalSwipe;
