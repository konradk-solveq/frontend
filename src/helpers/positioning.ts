export const horizontalAnim = {
    gestureDirection: 'horizontal',
    gesturesEnabled: true,
    gestureResponseDistance: {horizontal: 20},
    cardStyleInterpolator: ({current, layouts}) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
