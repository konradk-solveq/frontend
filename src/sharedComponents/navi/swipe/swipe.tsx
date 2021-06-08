import React from 'react';
import {
    Directions,
    FlingGestureHandler,
    State,
} from 'react-native-gesture-handler';

interface IProps {
    onSwipeAction: () => void;
    direction: Directions /* 1: right, 2: left, 4: up, 8:down */;
    children: React.ReactNode;
}

const Swipe: React.FC<IProps> = ({
    onSwipeAction,
    direction,
    children,
}: IProps) => {
    return (
        <FlingGestureHandler
            direction={direction}
            onHandlerStateChange={({nativeEvent}) => {
                if (nativeEvent.state === State.ACTIVE) {
                    onSwipeAction();
                }
            }}>
            {children}
        </FlingGestureHandler>
    );
};

export default Swipe;
